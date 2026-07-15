import type { DrawingModel, Loop, Point, Selection } from '../geometry/types';
import {
  absorbErrorAtCorner,
  angleOf,
  cornerAngleAt,
  dist,
  hitTestVertex,
  hitTestWall,
  interiorExteriorAt,
  type InteriorExterior,
  listNonCanonicalCorners,
  moveNextForCornerAngle,
  nearPoint,
  pointFromPolar,
  polygonSelfIntersects,
  relativeTurnDeg,
  setSegmentLengthPx,
  snapAngleRelative,
  snapCornerToCanonical,
  snapWorldAngle,
  wallSegments,
  wouldIntersect,
} from '../geometry/math';

export type InteractionConfig = {
  hitRadius: number;
  closeRadius: number;
  minLengthPx: number;
  getPxPerMeter: () => number;
  onChange: () => void;
  onReject: () => void;
  onWallSelected?: (sel: Selection, focusInput: boolean) => void;
  onVertexSelected?: (sel: Selection, focusAngle: boolean) => void;
  onCloseMeetfout?: (
    loopIndex: number,
    odd: { index: number; angles: InteriorExterior }[],
  ) => void;
};

let loopSeq = 1;
function newLoopId(): string {
  return `L${loopSeq++}`;
}

export class DrawingController {
  model: DrawingModel = {
    loops: [],
    status: 'idle',
    vertices: [],
    draftEnd: null,
  };
  selection: Selection = { kind: 'none' };
  /** Loop index for meetfout absorb ops (committed loop). */
  meetfoutLoopIndex: number | null = null;

  private pointerId: number | null = null;
  private active = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private cfg: InteractionConfig,
  ) {
    this.bind();
  }

  private bind(): void {
    this.canvas.addEventListener('pointerdown', this.onDown);
    this.canvas.addEventListener('pointermove', this.onMove);
    this.canvas.addEventListener('pointerup', this.onUp);
    this.canvas.addEventListener('pointercancel', this.onUp);
  }

  destroy(): void {
    this.canvas.removeEventListener('pointerdown', this.onDown);
    this.canvas.removeEventListener('pointermove', this.onMove);
    this.canvas.removeEventListener('pointerup', this.onUp);
    this.canvas.removeEventListener('pointercancel', this.onUp);
  }

  private emitSelection(focusWall = false, focusAngle = false): void {
    if (this.selection.kind === 'wall') {
      this.cfg.onWallSelected?.(this.selection, focusWall);
      this.cfg.onVertexSelected?.({ kind: 'none' }, false);
    } else if (this.selection.kind === 'vertex') {
      this.cfg.onVertexSelected?.(this.selection, focusAngle);
      this.cfg.onWallSelected?.({ kind: 'none' }, false);
    } else {
      this.cfg.onWallSelected?.({ kind: 'none' }, false);
      this.cfg.onVertexSelected?.({ kind: 'none' }, false);
    }
  }

  private setSelection(sel: Selection, focusWall = false, focusAngle = false): void {
    this.selection = sel;
    this.emitSelection(focusWall, focusAngle);
  }

  /** Back-compat helpers for app.ts */
  get selectedWallIndex(): number | null {
    return this.selection.kind === 'wall' ? this.selection.wallIndex : null;
  }
  set selectedWallIndex(v: number | null) {
    if (v === null) {
      if (this.selection.kind === 'wall') this.selection = { kind: 'none' };
    } else {
      const loopIndex =
        this.selection.kind === 'wall' || this.selection.kind === 'vertex'
          ? this.selection.loopIndex
          : this.model.loops.length
            ? this.model.loops.length - 1
            : null;
      this.selection = { kind: 'wall', loopIndex, wallIndex: v };
    }
  }
  get selectedVertexIndex(): number | null {
    return this.selection.kind === 'vertex' ? this.selection.vertexIndex : null;
  }
  set selectedVertexIndex(v: number | null) {
    if (v === null) {
      if (this.selection.kind === 'vertex') this.selection = { kind: 'none' };
    } else {
      const loopIndex =
        this.selection.kind === 'wall' || this.selection.kind === 'vertex'
          ? this.selection.loopIndex
          : this.model.loops.length
            ? this.model.loops.length - 1
            : null;
      this.selection = { kind: 'vertex', loopIndex, vertexIndex: v };
    }
  }

  focusCorner(index: number, focusAngle = true): void {
    const loopIndex =
      this.meetfoutLoopIndex ??
      (this.model.loops.length ? this.model.loops.length - 1 : null);
    this.setSelection({ kind: 'vertex', loopIndex, vertexIndex: index }, false, focusAngle);
    this.cfg.onChange();
  }

  private vertsForSelection(): { vertices: Point[]; closed: boolean } | null {
    if (this.selection.kind === 'none') return null;
    if (this.selection.loopIndex === null) {
      return { vertices: this.model.vertices, closed: false };
    }
    const loop = this.model.loops[this.selection.loopIndex];
    if (!loop) return null;
    return { vertices: loop.vertices, closed: true };
  }

  private writeVerts(vertices: Point[], loopIndex: number | null): void {
    if (loopIndex === null) {
      this.model = { ...this.model, vertices, draftEnd: null };
    } else {
      const loops = this.model.loops.map((L, i) =>
        i === loopIndex ? { ...L, vertices } : L,
      );
      this.model = { ...this.model, loops };
    }
  }

  absorbMeetfoutAt(absorbIndex: number): boolean {
    const li = this.meetfoutLoopIndex;
    if (li === null) return false;
    const loop = this.model.loops[li];
    if (!loop) return false;
    const next = absorbErrorAtCorner(loop.vertices, absorbIndex);
    if (polygonSelfIntersects(next, true)) {
      this.cfg.onReject();
      return false;
    }
    this.writeVerts(next, li);
    this.setSelection({ kind: 'vertex', loopIndex: li, vertexIndex: absorbIndex }, false, false);
    this.cfg.onChange();
    return true;
  }

  getSelectedSegment(): { a: Point; b: Point } | null {
    if (this.selection.kind !== 'wall') return null;
    const ctx = this.vertsForSelection();
    if (!ctx) return null;
    const segs = wallSegments(ctx.vertices, ctx.closed);
    return segs[this.selection.wallIndex] ?? null;
  }

  getSelectedCornerAngle(): number | null {
    if (this.selection.kind !== 'vertex') return null;
    const ctx = this.vertsForSelection();
    if (!ctx) return null;
    return cornerAngleAt(ctx.vertices, this.selection.vertexIndex, ctx.closed);
  }

  getDraftTurnDeg(): number | null {
    const { vertices, draftEnd } = this.model;
    if (!draftEnd || vertices.length < 2) return null;
    return relativeTurnDeg(vertices[vertices.length - 2], vertices[vertices.length - 1], draftEnd);
  }

  applyCornerAngle(targetDeg: number): boolean {
    if (this.selection.kind !== 'vertex') return false;
    const ctx = this.vertsForSelection();
    if (!ctx) return false;
    const next = moveNextForCornerAngle(
      ctx.vertices,
      this.selection.vertexIndex,
      targetDeg,
      ctx.closed,
    );
    if (!next) return false;
    if (polygonSelfIntersects(next, ctx.closed)) {
      this.cfg.onReject();
      return false;
    }
    this.writeVerts(next, this.selection.loopIndex);
    this.cfg.onChange();
    this.emitSelection(false, false);
    return true;
  }

  snapSelectedCornerCanonical(): boolean {
    if (this.selection.kind !== 'vertex') return false;
    const ctx = this.vertsForSelection();
    if (!ctx) return false;
    const next = snapCornerToCanonical(ctx.vertices, this.selection.vertexIndex, ctx.closed);
    if (!next) return false;
    if (polygonSelfIntersects(next, ctx.closed)) {
      this.cfg.onReject();
      return false;
    }
    this.writeVerts(next, this.selection.loopIndex);
    this.cfg.onChange();
    this.emitSelection(false, false);
    return true;
  }

  /**
   * Set selected wall length in meters (geometry resize, not global scale).
   */
  applyWallLengthM(meters: number): boolean {
    if (this.selection.kind !== 'wall') return false;
    if (!(meters > 0) || !Number.isFinite(meters)) return false;
    const ctx = this.vertsForSelection();
    if (!ctx) return false;
    const ppm = this.cfg.getPxPerMeter();
    const lengthPx = meters * ppm;
    const next = setSegmentLengthPx(ctx.vertices, this.selection.wallIndex, lengthPx, ctx.closed);
    if (!next) return false;
    if (polygonSelfIntersects(next, ctx.closed)) {
      this.cfg.onReject();
      return false;
    }
    this.writeVerts(next, this.selection.loopIndex);
    this.cfg.onChange();
    this.emitSelection(false, false);
    return true;
  }

  reset(): void {
    this.model = { loops: [], status: 'idle', vertices: [], draftEnd: null };
    this.selection = { kind: 'none' };
    this.meetfoutLoopIndex = null;
    this.active = false;
    this.pointerId = null;
    this.emitSelection();
    this.cfg.onChange();
  }

  undo(): void {
    if (this.model.status === 'drawing' || this.model.vertices.length > 0) {
      const vertices = this.model.vertices.slice(0, -1);
      if (vertices.length <= 1) {
        this.model = { ...this.model, status: 'idle', vertices: [], draftEnd: null };
        this.setSelection({ kind: 'none' });
      } else {
        this.model = {
          ...this.model,
          status: 'open',
          vertices,
          draftEnd: null,
        };
        this.setSelection({
          kind: 'wall',
          loopIndex: null,
          wallIndex: vertices.length - 2,
        });
      }
      this.cfg.onChange();
      return;
    }
    if (this.model.loops.length > 0) {
      const loops = this.model.loops.slice(0, -1);
      this.model = { ...this.model, loops };
      this.setSelection({ kind: 'none' });
      this.meetfoutLoopIndex = null;
      this.cfg.onChange();
    }
  }

  private localPoint(e: PointerEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  /** Hit-test committed loops then active chain. */
  private hitTestAll(p: Point): Selection {
    // Loops (closed)
    for (let li = this.model.loops.length - 1; li >= 0; li--) {
      const verts = this.model.loops[li].vertices;
      const vHit = hitTestVertex(p, verts, this.cfg.hitRadius);
      if (vHit !== null) {
        return { kind: 'vertex', loopIndex: li, vertexIndex: vHit };
      }
      const wHit = hitTestWall(p, verts, true, this.cfg.hitRadius);
      if (wHit !== null) {
        return { kind: 'wall', loopIndex: li, wallIndex: wHit };
      }
    }
    // Active open chain
    if (this.model.vertices.length >= 2) {
      const vHit = hitTestVertex(p, this.model.vertices, this.cfg.hitRadius);
      if (vHit !== null && vHit > 0 && vHit < this.model.vertices.length - 1) {
        return { kind: 'vertex', loopIndex: null, vertexIndex: vHit };
      }
      const wHit = hitTestWall(p, this.model.vertices, false, this.cfg.hitRadius);
      if (wHit !== null) {
        return { kind: 'wall', loopIndex: null, wallIndex: wHit };
      }
    }
    return { kind: 'none' };
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    const p = this.localPoint(e);
    const { vertices, status } = this.model;

    // Continue active chain from last endpoint
    if ((status === 'open' || status === 'drawing') && vertices.length > 0) {
      const last = vertices[vertices.length - 1];
      if (nearPoint(p, last, this.cfg.hitRadius * 1.6)) {
        this.model = { ...this.model, status: 'drawing', draftEnd: p };
        this.active = true;
        this.pointerId = e.pointerId;
        this.canvas.setPointerCapture(e.pointerId);
        this.cfg.onChange();
        return;
      }
    }

    // Select existing geometry
    const hit = this.hitTestAll(p);
    if (hit.kind !== 'none') {
      const focusWall = hit.kind === 'wall';
      const focusAngle = hit.kind === 'vertex';
      this.setSelection(hit, focusWall, focusAngle);
      this.cfg.onChange();
      return;
    }

    // Start a new loop on empty space (idle or after previous loop closed)
    if (status === 'idle' || (status === 'open' && vertices.length === 0)) {
      this.model = {
        ...this.model,
        status: 'drawing',
        vertices: [p],
        draftEnd: p,
      };
      this.setSelection({ kind: 'none' });
      this.active = true;
      this.pointerId = e.pointerId;
      this.canvas.setPointerCapture(e.pointerId);
      this.cfg.onChange();
    }
  };

  private onMove = (e: PointerEvent): void => {
    if (!this.active || e.pointerId !== this.pointerId) return;
    if (this.model.vertices.length === 0) return;
    const raw = this.localPoint(e);
    const snapped = this.snapDraft(raw);
    this.model = { ...this.model, draftEnd: snapped };
    this.cfg.onChange();
  };

  private onUp = (e: PointerEvent): void => {
    if (!this.active || (this.pointerId !== null && e.pointerId !== this.pointerId)) {
      return;
    }
    this.active = false;
    this.pointerId = null;

    const { vertices, draftEnd } = this.model;
    if (!draftEnd || vertices.length === 0) {
      this.finishCancelDraft();
      return;
    }

    const last = vertices[vertices.length - 1];
    const len = dist(last, draftEnd);

    if (vertices.length === 1 && len < this.cfg.minLengthPx) {
      this.model = { ...this.model, status: 'idle', vertices: [], draftEnd: null };
      this.cfg.onChange();
      return;
    }

    if (len < this.cfg.minLengthPx) {
      this.finishCancelDraft();
      return;
    }

    const canClose =
      vertices.length >= 3 && nearPoint(draftEnd, vertices[0], this.cfg.closeRadius);

    if (canClose) {
      if (wouldIntersect(vertices, vertices[0], true)) {
        this.cfg.onReject();
        this.finishCancelDraft();
        return;
      }
      const loopVerts = [...vertices];
      const loop: Loop = { id: newLoopId(), vertices: loopVerts };
      const loops = [...this.model.loops, loop];
      const loopIndex = loops.length - 1;
      this.model = {
        loops,
        status: 'idle',
        vertices: [],
        draftEnd: null,
      };
      this.meetfoutLoopIndex = loopIndex;
      this.setSelection({ kind: 'wall', loopIndex, wallIndex: 0 }, true, false);
      this.cfg.onChange();

      const oddIdx = listNonCanonicalCorners(loopVerts, true);
      if (oddIdx.length > 0 && this.cfg.onCloseMeetfout) {
        const odd = oddIdx
          .map((index) => {
            const angles = interiorExteriorAt(loopVerts, index, true);
            return angles ? { index, angles } : null;
          })
          .filter((x): x is { index: number; angles: InteriorExterior } => x !== null);
        if (odd.length) this.cfg.onCloseMeetfout(loopIndex, odd);
      }
      return;
    }

    if (wouldIntersect(vertices, draftEnd, false)) {
      this.cfg.onReject();
      this.finishCancelDraft();
      return;
    }

    const nextVerts = [...vertices, draftEnd];
    this.model = {
      ...this.model,
      status: 'open',
      vertices: nextVerts,
      draftEnd: null,
    };
    this.setSelection(
      { kind: 'wall', loopIndex: null, wallIndex: nextVerts.length - 2 },
      true,
      false,
    );
    this.cfg.onChange();
  };

  private finishCancelDraft(): void {
    const { vertices } = this.model;
    if (vertices.length <= 1) {
      this.model = { ...this.model, status: 'idle', vertices: [], draftEnd: null };
      this.setSelection({ kind: 'none' });
    } else {
      this.model = { ...this.model, status: 'open', draftEnd: null };
    }
    this.cfg.onChange();
  }

  private snapDraft(raw: Point): Point {
    const { vertices } = this.model;
    const origin = vertices[vertices.length - 1];

    if (vertices.length >= 3 && nearPoint(raw, vertices[0], this.cfg.closeRadius)) {
      return { ...vertices[0] };
    }

    const len = dist(origin, raw);
    if (len < 1) return { ...raw };

    const desired = angleOf(origin, raw);
    let dir: number;
    if (vertices.length === 1) {
      dir = snapWorldAngle(desired, 45);
    } else {
      const prevA = vertices[vertices.length - 2];
      const prevB = vertices[vertices.length - 1];
      dir = snapAngleRelative(angleOf(prevA, prevB), desired, 45);
    }
    return pointFromPolar(origin, dir, len);
  }
}
