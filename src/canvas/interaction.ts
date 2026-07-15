import type { Door, DrawingModel, Loop, Point, Selection } from '../geometry/types';
import {
  absorbErrorAtCorner,
  angleOf,
  cornerAngleAt,
  dist,
  doorGeometry,
  hitTestDoor,
  hitTestVertex,
  hitTestWall,
  interiorExteriorAt,
  type InteriorExterior,
  listNonCanonicalCorners,
  listPartitionCandidates,
  type PartitionCandidate,
  planEqualDivision,
  type EqualDivisionPlan,
  splitIntoEqualParts,
  moveNextForCornerAngle,
  nearPoint,
  pointFromPolar,
  polygonSelfIntersects,
  projectTOnSegment,
  relativeTurnDeg,
  setSegmentLengthPx,
  snapAngleRelative,
  snapCornerToCanonical,
  snapWorldAngle,
  splitPolygonByPartition,
  wallSegments,
  wouldIntersect,
} from '../geometry/math';

export type InteractionConfig = {
  hitRadius: number;
  closeRadius: number;
  minLengthPx: number;
  getPxPerMeter: () => number;
  /** View transform for screen↔world (zoom/pan). Defaults to identity. */
  getView?: () => { scale: number; ox: number; oy: number };
  onChange: () => void;
  onReject: () => void;
  onWallSelected?: (sel: Selection, focusInput: boolean) => void;
  onVertexSelected?: (sel: Selection, focusAngle: boolean) => void;
  onDoorSelected?: (sel: Selection, focusInput: boolean) => void;
  onCloseMeetfout?: (
    loopIndex: number,
    odd: { index: number; angles: InteriorExterior }[],
  ) => void;
};

let loopSeq = 1;
let doorSeq = 1;
function newLoopId(): string {
  return `L${loopSeq++}`;
}
function newDoorId(): string {
  return `D${doorSeq++}`;
}
const DEFAULT_DOOR_M = 0.9;

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
  private dragDoor: { loopIndex: number; doorId: string } | null = null;

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

  private emitSelection(focusWall = false, focusAngle = false, focusDoor = false): void {
    if (this.selection.kind === 'wall') {
      this.cfg.onWallSelected?.(this.selection, focusWall);
      this.cfg.onVertexSelected?.({ kind: 'none' }, false);
      this.cfg.onDoorSelected?.({ kind: 'none' }, false);
    } else if (this.selection.kind === 'vertex') {
      this.cfg.onVertexSelected?.(this.selection, focusAngle);
      this.cfg.onWallSelected?.({ kind: 'none' }, false);
      this.cfg.onDoorSelected?.({ kind: 'none' }, false);
    } else if (this.selection.kind === 'door') {
      this.cfg.onDoorSelected?.(this.selection, focusDoor);
      this.cfg.onWallSelected?.({ kind: 'none' }, false);
      this.cfg.onVertexSelected?.({ kind: 'none' }, false);
    } else {
      this.cfg.onWallSelected?.({ kind: 'none' }, false);
      this.cfg.onVertexSelected?.({ kind: 'none' }, false);
      this.cfg.onDoorSelected?.({ kind: 'none' }, false);
    }
  }

  private setSelection(
    sel: Selection,
    focusWall = false,
    focusAngle = false,
    focusDoor = false,
  ): void {
    this.selection = sel;
    this.emitSelection(focusWall, focusAngle, focusDoor);
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
    if (this.selection.kind === 'none' || this.selection.kind === 'door') return null;
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

  private writeLoop(loopIndex: number, patch: Partial<Loop>): void {
    const loops = this.model.loops.map((L, i) =>
      i === loopIndex ? { ...L, ...patch } : L,
    );
    this.model = { ...this.model, loops };
  }

  getSelectedDoor(): Door | null {
    if (this.selection.kind !== 'door') return null;
    const sel = this.selection;
    const loop = this.model.loops[sel.loopIndex];
    return loop?.doors.find((d) => d.id === sel.doorId) ?? null;
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

  /**
   * Add door on selected wall (closed loop only). Optional click point sets position.
   */
  addDoorOnSelectedWall(atPoint?: Point, widthM = DEFAULT_DOOR_M): boolean {
    if (this.selection.kind !== 'wall' || this.selection.loopIndex === null) return false;
    const li = this.selection.loopIndex;
    const loop = this.model.loops[li];
    if (!loop) return false;
    const segs = wallSegments(loop.vertices, true);
    const seg = segs[this.selection.wallIndex];
    if (!seg) return false;

    const t = atPoint ? projectTOnSegment(atPoint, seg.a, seg.b) : 0.5;
    const ppm = this.cfg.getPxPerMeter();
    const g = doorGeometry(seg.a, seg.b, t, widthM, ppm);
    if (!g) {
      this.cfg.onReject();
      return false;
    }

    const door: Door = {
      id: newDoorId(),
      wallIndex: this.selection.wallIndex,
      t,
      widthM,
      hinge: 'L',
      swing: 1,
    };
    const doors = [...(loop.doors ?? []), door];
    this.writeLoop(li, { doors });
    this.setSelection({ kind: 'door', loopIndex: li, doorId: door.id }, false, false, true);
    this.cfg.onChange();
    return true;
  }

  applyDoorWidthM(meters: number): boolean {
    if (this.selection.kind !== 'door') return false;
    const sel = this.selection;
    if (!(meters > 0.2) || !Number.isFinite(meters)) return false;
    const li = sel.loopIndex;
    const loop = this.model.loops[li];
    if (!loop) return false;
    const d = loop.doors.find((x) => x.id === sel.doorId);
    if (!d) return false;
    const segs = wallSegments(loop.vertices, true);
    const seg = segs[d.wallIndex];
    if (!seg) return false;
    const g = doorGeometry(seg.a, seg.b, d.t, meters, this.cfg.getPxPerMeter());
    if (!g) {
      this.cfg.onReject();
      return false;
    }
    const doors = loop.doors.map((x) =>
      x.id === d.id ? { ...x, widthM: meters } : x,
    );
    this.writeLoop(li, { doors });
    this.cfg.onChange();
    this.emitSelection(false, false, false);
    return true;
  }

  removeSelectedDoor(): boolean {
    if (this.selection.kind !== 'door') return false;
    const sel = this.selection;
    const li = sel.loopIndex;
    const doorId = sel.doorId;
    const loop = this.model.loops[li];
    if (!loop) return false;
    this.writeLoop(li, { doors: loop.doors.filter((d) => d.id !== doorId) });
    this.setSelection({ kind: 'none' });
    this.cfg.onChange();
    return true;
  }

  setSelectedDoorHinge(hinge: 'L' | 'R'): boolean {
    return this.patchSelectedDoor({ hinge });
  }

  flipSelectedDoorSwing(): boolean {
    const d = this.getSelectedDoor();
    if (!d) return false;
    return this.patchSelectedDoor({ swing: d.swing === 1 ? -1 : 1 });
  }

  private patchSelectedDoor(patch: Partial<Door>): boolean {
    if (this.selection.kind !== 'door') return false;
    const sel = this.selection;
    const loop = this.model.loops[sel.loopIndex];
    if (!loop) return false;
    if (!loop.doors.some((x) => x.id === sel.doorId)) return false;
    const doors = loop.doors.map((x) =>
      x.id === sel.doorId ? { ...x, hinge: x.hinge ?? 'L', swing: x.swing ?? 1, ...patch } : x,
    );
    this.writeLoop(sel.loopIndex, { doors });
    this.cfg.onChange();
    this.emitSelection(false, false, false);
    return true;
  }

  /** Loop index under current selection (committed only). */
  selectedLoopIndex(): number | null {
    if (this.selection.kind === 'none') return null;
    if (this.selection.kind === 'door') return this.selection.loopIndex;
    return this.selection.loopIndex;
  }

  getPartitionCandidates(loopIndex: number): PartitionCandidate[] {
    const loop = this.model.loops[loopIndex];
    if (!loop || loop.vertices.length < 4) return [];
    return listPartitionCandidates(loop.vertices);
  }

  getEqualDivisionPlan(
    loopIndex: number,
    parts: 2 | 3 | 4,
    axis: 'x' | 'y' | 'auto' = 'auto',
  ): EqualDivisionPlan | null {
    const loop = this.model.loops[loopIndex];
    if (!loop) return null;
    return planEqualDivision(loop.vertices, parts, axis);
  }

  /**
   * Split loop into two by partition candidate. Adds a door on the shared wall of each room.
   */
  splitLoopWithPartition(loopIndex: number, c: PartitionCandidate): boolean {
    const loop = this.model.loops[loopIndex];
    if (!loop) return false;
    const split = splitPolygonByPartition(
      loop.vertices,
      c.wallA,
      c.tA,
      c.wallB,
      c.tB,
    );
    if (!split) {
      this.cfg.onReject();
      return false;
    }

    const loopA: Loop = {
      id: newLoopId(),
      vertices: split.loopA,
      doors: this.doorOnPartitionWall(split.loopA),
    };
    const loopB: Loop = {
      id: newLoopId(),
      vertices: split.loopB,
      doors: this.doorOnPartitionWall(split.loopB),
    };
    const loops = [
      ...this.model.loops.slice(0, loopIndex),
      loopA,
      loopB,
      ...this.model.loops.slice(loopIndex + 1),
    ];
    this.model = { ...this.model, loops };
    this.meetfoutLoopIndex = null;
    this.setSelection({ kind: 'wall', loopIndex, wallIndex: 0 }, true, false);
    this.cfg.onChange();
    return true;
  }

  /** Split into 2 / 3 / 4 equal strips along long axis. */
  splitLoopEqualParts(
    loopIndex: number,
    parts: 2 | 3 | 4,
    axis: 'x' | 'y' | 'auto' = 'auto',
  ): boolean {
    const loop = this.model.loops[loopIndex];
    if (!loop) return false;
    const pieces = splitIntoEqualParts(loop.vertices, parts, axis);
    if (!pieces || pieces.length !== parts) {
      this.cfg.onReject();
      return false;
    }
    const newLoops: Loop[] = pieces.map((verts) => ({
      id: newLoopId(),
      vertices: verts,
      doors: this.doorOnPartitionWall(verts),
    }));
    // Only first/last get outer walls without shared door both sides - each strip gets door on one partition edge
    // doorOnPartitionWall puts door on last→first which is the cut for sequential remainders - good enough
    const loops = [
      ...this.model.loops.slice(0, loopIndex),
      ...newLoops,
      ...this.model.loops.slice(loopIndex + 1),
    ];
    this.model = { ...this.model, loops };
    this.meetfoutLoopIndex = null;
    this.setSelection({ kind: 'wall', loopIndex, wallIndex: 0 }, true, false);
    this.cfg.onChange();
    return true;
  }

  private doorOnPartitionWall(verts: Point[]): Door[] {
    const wi = verts.length - 1;
    if (wi < 0) return [];
    const segs = wallSegments(verts, true);
    const seg = segs[wi];
    if (!seg) return [];
    const widthM = DEFAULT_DOOR_M;
    const g = doorGeometry(seg.a, seg.b, 0.5, widthM, this.cfg.getPxPerMeter());
    if (!g) return [];
    return [
      {
        id: newDoorId(),
        wallIndex: wi,
        t: 0.5,
        widthM,
        hinge: 'L',
        swing: 1,
      },
    ];
  }

  private moveDoorToPoint(loopIndex: number, doorId: string, p: Point): boolean {
    const loop = this.model.loops[loopIndex];
    if (!loop) return false;
    const d = loop.doors.find((x) => x.id === doorId);
    if (!d) return false;
    const segs = wallSegments(loop.vertices, true);
    const seg = segs[d.wallIndex];
    if (!seg) return false;
    const L = dist(seg.a, seg.b);
    if (L < 1) return false;
    const ppm = this.cfg.getPxPerMeter();
    const half = (d.widthM * ppm) / 2;
    const margin = 4;
    const halfT = Math.min(0.45, (half + margin) / L);
    let t = projectTOnSegment(p, seg.a, seg.b);
    t = Math.max(halfT, Math.min(1 - halfT, t));
    this.writeLoop(loopIndex, {
      doors: loop.doors.map((x) => (x.id === doorId ? { ...x, t } : x)),
    });
    return true;
  }

  reset(): void {
    this.model = { loops: [], status: 'idle', vertices: [], draftEnd: null };
    this.selection = { kind: 'none' };
    this.meetfoutLoopIndex = null;
    this.active = false;
    this.pointerId = null;
    this.dragDoor = null;
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
    const sx = e.clientX - rect.left;
    const sy = e.clientY - rect.top;
    const v = this.cfg.getView?.() ?? { scale: 1, ox: 0, oy: 0 };
    return {
      x: (sx - v.ox) / v.scale,
      y: (sy - v.oy) / v.scale,
    };
  }

  private worldHitRadius(): number {
    const scale = this.cfg.getView?.().scale ?? 1;
    return this.cfg.hitRadius / Math.max(0.25, scale);
  }

  private worldCloseRadius(): number {
    const scale = this.cfg.getView?.().scale ?? 1;
    return this.cfg.closeRadius / Math.max(0.25, scale);
  }

  /** Hit-test committed loops then active chain. */
  private hitTestAll(p: Point): Selection {
    const ppm = this.cfg.getPxPerMeter();
    const hit = this.worldHitRadius();
    for (let li = this.model.loops.length - 1; li >= 0; li--) {
      const loop = this.model.loops[li];
      const doors = loop.doors ?? [];
      // Generous door hit so drag is easy
      const doorId = hitTestDoor(p, loop.vertices, doors, ppm, hit * 1.8);
      if (doorId) {
        return { kind: 'door', loopIndex: li, doorId };
      }
      const vHit = hitTestVertex(p, loop.vertices, hit);
      if (vHit !== null) {
        return { kind: 'vertex', loopIndex: li, vertexIndex: vHit };
      }
      const wHit = hitTestWall(p, loop.vertices, true, hit);
      if (wHit !== null) {
        return { kind: 'wall', loopIndex: li, wallIndex: wHit };
      }
    }
    if (this.model.vertices.length >= 2) {
      const vHit = hitTestVertex(p, this.model.vertices, hit);
      if (vHit !== null && vHit > 0 && vHit < this.model.vertices.length - 1) {
        return { kind: 'vertex', loopIndex: null, vertexIndex: vHit };
      }
      const wHit = hitTestWall(p, this.model.vertices, false, hit);
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
      if (nearPoint(p, last, this.worldHitRadius() * 1.6)) {
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

    if (hit.kind === 'door') {
      this.setSelection(hit, false, false, true);
      this.dragDoor = { loopIndex: hit.loopIndex, doorId: hit.doorId };
      this.active = true;
      this.pointerId = e.pointerId;
      this.canvas.setPointerCapture(e.pointerId);
      this.cfg.onChange();
      return;
    }

    // Selected door: drag along its wall when grabbing that wall
    if (
      this.selection.kind === 'door' &&
      hit.kind === 'wall' &&
      hit.loopIndex === this.selection.loopIndex
    ) {
      const sel = this.selection;
      const loop = this.model.loops[sel.loopIndex];
      const door = loop?.doors.find((d) => d.id === sel.doorId);
      if (door && door.wallIndex === hit.wallIndex) {
        this.dragDoor = { loopIndex: sel.loopIndex, doorId: sel.doorId };
        this.moveDoorToPoint(sel.loopIndex, sel.doorId, p);
        this.active = true;
        this.pointerId = e.pointerId;
        this.canvas.setPointerCapture(e.pointerId);
        this.cfg.onChange();
        return;
      }
    }

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
    const p = this.localPoint(e);

    if (this.dragDoor) {
      if (this.moveDoorToPoint(this.dragDoor.loopIndex, this.dragDoor.doorId, p)) {
        this.cfg.onChange();
      }
      return;
    }

    if (this.model.vertices.length === 0) return;
    const snapped = this.snapDraft(p);
    this.model = { ...this.model, draftEnd: snapped };
    this.cfg.onChange();
  };

  private onUp = (e: PointerEvent): void => {
    if (!this.active || (this.pointerId !== null && e.pointerId !== this.pointerId)) {
      return;
    }
    this.active = false;
    this.pointerId = null;

    if (this.dragDoor) {
      this.dragDoor = null;
      this.cfg.onChange();
      return;
    }

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
      vertices.length >= 3 && nearPoint(draftEnd, vertices[0], this.worldCloseRadius());

    if (canClose) {
      if (wouldIntersect(vertices, vertices[0], true)) {
        this.cfg.onReject();
        this.finishCancelDraft();
        return;
      }
      const loopVerts = [...vertices];
      const loop: Loop = { id: newLoopId(), vertices: loopVerts, doors: [] };
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

    if (vertices.length >= 3 && nearPoint(raw, vertices[0], this.worldCloseRadius())) {
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
