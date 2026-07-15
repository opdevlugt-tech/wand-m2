import type { DrawingModel, Point } from '../geometry/types';
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
  relativeTurnDeg,
  segmentsIntersect,
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
  onWallSelected?: (index: number | null, focusInput: boolean) => void;
  onVertexSelected?: (index: number | null, focusAngle: boolean) => void;
  /**
   * Only after closing the loop, if one or more corners are off the 45° grid
   * (meetfout). Not fired per wall.
   */
  onCloseMeetfout?: (
    odd: { index: number; angles: InteriorExterior }[],
  ) => void;
};

export class DrawingController {
  model: DrawingModel = { status: 'empty', vertices: [], draftEnd: null };
  selectedWallIndex: number | null = null;
  selectedVertexIndex: number | null = null;
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

  private isClosed(): boolean {
    return this.model.status === 'closed';
  }

  private selectWall(index: number | null, focusInput = false): void {
    this.selectedWallIndex = index;
    if (index !== null) {
      this.selectedVertexIndex = null;
      this.cfg.onVertexSelected?.(null, false);
    }
    this.cfg.onWallSelected?.(index, focusInput);
  }

  private selectVertex(index: number | null, focusAngle = false): void {
    this.selectedVertexIndex = index;
    if (index !== null) {
      this.selectedWallIndex = null;
      this.cfg.onWallSelected?.(null, false);
    }
    this.cfg.onVertexSelected?.(index, focusAngle);
  }

  /** Public: focus a corner (popup “Verplaatsen”). */
  focusCorner(index: number, focusAngle = true): void {
    this.selectVertex(index, focusAngle);
    this.cfg.onChange();
  }

  /**
   * Put residual meetfout at absorbIndex: snap other corners to 45° grid.
   */
  absorbMeetfoutAt(absorbIndex: number): boolean {
    if (!this.isClosed()) return false;
    const next = absorbErrorAtCorner(this.model.vertices, absorbIndex);
    if (polylineSelfIntersects(next, true)) {
      this.cfg.onReject();
      return false;
    }
    this.model = { ...this.model, vertices: next, draftEnd: null };
    this.selectVertex(absorbIndex, false);
    this.cfg.onChange();
    return true;
  }

  getSelectedSegment(): { a: Point; b: Point } | null {
    if (this.selectedWallIndex === null) return null;
    const segs = wallSegments(this.model.vertices, this.isClosed());
    return segs[this.selectedWallIndex] ?? null;
  }

  getSelectedCornerAngle(): number | null {
    if (this.selectedVertexIndex === null) return null;
    return cornerAngleAt(this.model.vertices, this.selectedVertexIndex, this.isClosed());
  }

  getDraftTurnDeg(): number | null {
    const { vertices, draftEnd } = this.model;
    if (!draftEnd || vertices.length < 2) return null;
    const a = vertices[vertices.length - 2];
    const b = vertices[vertices.length - 1];
    return relativeTurnDeg(a, b, draftEnd);
  }

  applyCornerAngle(targetDeg: number): boolean {
    if (this.selectedVertexIndex === null) return false;
    const next = moveNextForCornerAngle(
      this.model.vertices,
      this.selectedVertexIndex,
      targetDeg,
      this.isClosed(),
    );
    if (!next) return false;
    if (polylineSelfIntersects(next, this.isClosed())) {
      this.cfg.onReject();
      return false;
    }
    this.model = { ...this.model, vertices: next, draftEnd: null };
    this.cfg.onChange();
    this.cfg.onVertexSelected?.(this.selectedVertexIndex, false);
    return true;
  }

  snapSelectedCornerCanonical(): boolean {
    if (this.selectedVertexIndex === null) return false;
    const next = snapCornerToCanonical(
      this.model.vertices,
      this.selectedVertexIndex,
      this.isClosed(),
    );
    if (!next) return false;
    if (polylineSelfIntersects(next, this.isClosed())) {
      this.cfg.onReject();
      return false;
    }
    this.model = { ...this.model, vertices: next, draftEnd: null };
    this.cfg.onChange();
    this.cfg.onVertexSelected?.(this.selectedVertexIndex, false);
    return true;
  }

  reset(): void {
    this.model = { status: 'empty', vertices: [], draftEnd: null };
    this.selectedWallIndex = null;
    this.selectedVertexIndex = null;
    this.active = false;
    this.pointerId = null;
    this.cfg.onWallSelected?.(null, false);
    this.cfg.onVertexSelected?.(null, false);
    this.cfg.onChange();
  }

  undo(): void {
    if (this.model.status === 'closed') {
      this.model = {
        status: this.model.vertices.length >= 2 ? 'open' : 'empty',
        vertices: [...this.model.vertices],
        draftEnd: null,
      };
      this.selectedWallIndex = null;
      this.selectedVertexIndex = null;
      this.cfg.onWallSelected?.(null, false);
      this.cfg.onVertexSelected?.(null, false);
      this.cfg.onChange();
      return;
    }
    if (this.model.vertices.length === 0) return;
    const vertices = this.model.vertices.slice(0, -1);
    if (vertices.length <= 1) {
      this.model = { status: 'empty', vertices: [], draftEnd: null };
      this.selectedWallIndex = null;
      this.selectedVertexIndex = null;
    } else {
      this.model = { status: 'open', vertices, draftEnd: null };
      this.selectedWallIndex = vertices.length - 2;
      this.selectedVertexIndex = null;
    }
    this.cfg.onWallSelected?.(this.selectedWallIndex, false);
    this.cfg.onVertexSelected?.(null, false);
    this.cfg.onChange();
  }

  private localPoint(e: PointerEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  private onDown = (e: PointerEvent): void => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    const p = this.localPoint(e);
    const { vertices, status } = this.model;

    if (status === 'closed') {
      const vHit = hitTestVertex(p, vertices, this.cfg.hitRadius);
      if (vHit !== null) {
        this.selectVertex(vHit, true);
        this.cfg.onChange();
        return;
      }
      const hit = hitTestWall(p, vertices, true, this.cfg.hitRadius);
      this.selectWall(hit, hit !== null);
      this.cfg.onChange();
      return;
    }

    if (status === 'empty') {
      this.model = {
        status: 'drawing',
        vertices: [p],
        draftEnd: p,
      };
      this.selectWall(null, false);
      this.selectVertex(null, false);
      this.active = true;
      this.pointerId = e.pointerId;
      this.canvas.setPointerCapture(e.pointerId);
      this.cfg.onChange();
      return;
    }

    const last = vertices[vertices.length - 1];
    if (nearPoint(p, last, this.cfg.hitRadius * 1.6)) {
      this.model = {
        ...this.model,
        status: 'drawing',
        draftEnd: p,
      };
      this.active = true;
      this.pointerId = e.pointerId;
      this.canvas.setPointerCapture(e.pointerId);
      this.cfg.onChange();
      return;
    }

    // Interior corners (open): angle edit
    const vHit = hitTestVertex(p, vertices, this.cfg.hitRadius);
    if (vHit !== null && vHit > 0 && vHit < vertices.length - 1) {
      this.selectVertex(vHit, true);
      this.cfg.onChange();
      return;
    }

    const hit = hitTestWall(p, vertices, false, this.cfg.hitRadius);
    this.selectWall(hit, hit !== null);
    this.cfg.onChange();
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
      this.model = { status: 'empty', vertices: [], draftEnd: null };
      this.selectWall(null, false);
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
      this.model = {
        status: 'closed',
        vertices: [...vertices],
        draftEnd: null,
      };
      this.selectVertex(null, false);
      this.cfg.onChange();
      // Alleen popup bij afwijkende hoeken na sluiten (meetfout)
      const oddIdx = listNonCanonicalCorners(this.model.vertices, true);
      if (oddIdx.length > 0 && this.cfg.onCloseMeetfout) {
        const odd = oddIdx
          .map((index) => {
            const angles = interiorExteriorAt(this.model.vertices, index, true);
            return angles ? { index, angles } : null;
          })
          .filter((x): x is { index: number; angles: InteriorExterior } => x !== null);
        if (odd.length) this.cfg.onCloseMeetfout(odd);
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
      status: 'open',
      vertices: nextVerts,
      draftEnd: null,
    };
    this.selectWall(nextVerts.length - 2, true);
    this.cfg.onChange();
    // Geen popup per muur — alleen bij sluiten + meetfout
  };

  private finishCancelDraft(): void {
    const { vertices } = this.model;
    if (vertices.length <= 1) {
      this.model = { status: 'empty', vertices: [], draftEnd: null };
      this.selectWall(null, false);
    } else {
      this.model = { status: 'open', vertices, draftEnd: null };
    }
    this.cfg.onChange();
  }

  private snapDraft(raw: Point): Point {
    const { vertices } = this.model;
    const origin = vertices[vertices.length - 1];

    // Close magnet: free angle to start (niet-45°/90° sluiting door meetfout)
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
      const prevDir = angleOf(prevA, prevB);
      dir = snapAngleRelative(prevDir, desired, 45);
    }

    return pointFromPolar(origin, dir, len);
  }
}

function polylineSelfIntersects(vertices: Point[], closed: boolean): boolean {
  const segs = wallSegments(vertices, closed);
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      if (j === i + 1) continue;
      if (closed && i === 0 && j === segs.length - 1) continue;
      if (segmentsIntersect(segs[i], segs[j])) return true;
    }
  }
  return false;
}
