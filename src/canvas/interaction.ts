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
  pointInPolygon,
  pointToWallParam,
  pointOnSegment,
  rayHitPolygonBoundary,
  splitIntoEqualParts,
  splitPolygonByPath,
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
  findPartnerWall,
  translateWallBy,
  projectOntoNormal,
  mergePolygonsAtSharedWall,
  type SharedWallRef,
} from '../geometry/math';
import { ROOM_CONFIG } from '../config/rooms';

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
const DEFAULT_DOOR_M = ROOM_CONFIG.defaultDoorWidthM;

export class DrawingController {
  model: DrawingModel = {
    loops: [],
    status: 'idle',
    vertices: [],
    draftEnd: null,
    partitionPath: null,
    partitionLoopIndex: null,
  };
  selection: Selection = { kind: 'none' };
  /** Loop index for meetfout absorb ops (committed loop). */
  meetfoutLoopIndex: number | null = null;

  private pointerId: number | null = null;
  private active = false;
  private dragDoor: { loopIndex: number; doorId: string } | null = null;
  private dragWall: {
    loopIndex: number;
    wallIndex: number;
    partner: SharedWallRef | null;
    last: Point;
  } | null = null;

  /** Snapshots for Undo = last real action */
  private history: Array<{
    model: DrawingModel;
    selection: Selection;
    meetfoutLoopIndex: number | null;
  }> = [];
  private readonly maxHistory = 60;
  private historyLocked = false;

  constructor(
    private canvas: HTMLCanvasElement,
    private cfg: InteractionConfig,
  ) {
    this.bind();
  }

  private cloneModel(m: DrawingModel): DrawingModel {
    return JSON.parse(JSON.stringify(m)) as DrawingModel;
  }

  private cloneSelection(s: Selection): Selection {
    return JSON.parse(JSON.stringify(s)) as Selection;
  }

  /** Call before a user-facing mutation (not every drag-frame). */
  private pushHistory(): void {
    if (this.historyLocked) return;
    this.history.push({
      model: this.cloneModel(this.model),
      selection: this.cloneSelection(this.selection),
      meetfoutLoopIndex: this.meetfoutLoopIndex,
    });
    if (this.history.length > this.maxHistory) this.history.shift();
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

  private writeVerts(
    vertices: Point[],
    loopIndex: number | null,
    recordHistory = false,
  ): void {
    if (recordHistory) this.pushHistory();
    if (loopIndex === null) {
      this.model = { ...this.model, vertices, draftEnd: null };
    } else {
      const loops = this.model.loops.map((L, i) =>
        i === loopIndex ? { ...L, vertices } : L,
      );
      this.model = { ...this.model, loops };
    }
  }

  private writeLoop(
    loopIndex: number,
    patch: Partial<Loop>,
    recordHistory = false,
  ): void {
    if (recordHistory) this.pushHistory();
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
    this.writeVerts(next, li, true);
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
    this.writeVerts(next, this.selection.loopIndex, true);
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
    this.writeVerts(next, this.selection.loopIndex, true);
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
    this.writeVerts(next, this.selection.loopIndex, true);
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
    this.writeLoop(li, { doors }, true);
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
    this.writeLoop(li, { doors }, true);
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
    this.writeLoop(li, { doors: loop.doors.filter((d) => d.id !== doorId) }, true);
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

  setSelectedRoomType(typeId: string): boolean {
    const li = this.selectedLoopIndex();
    if (li === null) return false;
    this.writeLoop(li, { roomTypeId: typeId }, true);
    this.cfg.onChange();
    return true;
  }

  setSelectedRoomName(name: string | null): boolean {
    const li = this.selectedLoopIndex();
    if (li === null) return false;
    const trimmed = (name ?? '').trim();
    this.writeLoop(li, { name: trimmed.length ? trimmed : null }, true);
    this.cfg.onChange();
    return true;
  }

  /** Start free partition drawing on selected (or given) loop. */
  beginPartitionDraw(loopIndex?: number): boolean {
    const li = loopIndex ?? this.selectedLoopIndex();
    if (li === null) return false;
    const loop = this.model.loops[li];
    if (!loop || loop.vertices.length < 3) return false;
    this.model = {
      ...this.model,
      status: 'partition',
      partitionPath: [],
      partitionLoopIndex: li,
      draftEnd: null,
      vertices: [],
    };
    this.setSelection({ kind: 'none' });
    this.cfg.onChange();
    return true;
  }

  cancelPartitionDraw(): void {
    this.model = {
      ...this.model,
      status: 'idle',
      partitionPath: null,
      partitionLoopIndex: null,
      draftEnd: null,
    };
    
    this.cfg.onChange();
  }

  /**
   * Delete last line / selected door / open-chain segment /
   * or merge rooms by removing a shared partition wall.
   */
  deleteLine(): boolean {
    // Partition draft: remove last corner / cancel
    if (this.model.status === 'partition') {
      const path = this.model.partitionPath ?? [];
      this.pushHistory();
      if (path.length <= 1) {
        this.model = {
          ...this.model,
          status: 'idle',
          partitionPath: null,
          partitionLoopIndex: null,
          draftEnd: null,
        };
        
        this.cfg.onChange();
        return true;
      }
      this.model = {
        ...this.model,
        partitionPath: path.slice(0, -1),
        draftEnd: null,
      };
      this.cfg.onChange();
      return true;
    }

    // Door
    if (this.selection.kind === 'door') {
      return this.removeSelectedDoor();
    }

    // Open chain: remove last wall segment
    if (
      this.model.vertices.length > 0 ||
      this.model.status === 'drawing' ||
      this.model.status === 'open'
    ) {
      this.pushHistory();
      const vertices = this.model.vertices.slice(0, -1);
      if (vertices.length <= 1) {
        this.model = {
          ...this.model,
          status: 'idle',
          vertices: [],
          draftEnd: null,
        };
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
      return true;
    }

    // Shared partition wall → merge rooms back into one
    if (this.selection.kind === 'wall' && this.selection.loopIndex !== null) {
      return this.deleteSharedWall(
        this.selection.loopIndex,
        this.selection.wallIndex,
      );
    }

    return false;
  }

  /** Remove shared wall between two rooms (merge). */
  deleteSharedWall(loopIndex: number, wallIndex: number): boolean {
    const partner = findPartnerWall(this.model.loops, loopIndex, wallIndex);
    if (!partner) {
      this.cfg.onReject();
      return false;
    }
    const A = this.model.loops[loopIndex];
    const B = this.model.loops[partner.partnerLoopIndex];
    if (!A || !B) return false;
    const merged = mergePolygonsAtSharedWall(
      A.vertices,
      wallIndex,
      B.vertices,
      partner.partnerWallIndex,
    );
    if (!merged) {
      this.cfg.onReject();
      return false;
    }
    const lo = Math.min(loopIndex, partner.partnerLoopIndex);
    const hi = Math.max(loopIndex, partner.partnerLoopIndex);
    const newLoop: Loop = {
      id: newLoopId(),
      vertices: merged,
      doors: [],
      roomTypeId: A.roomTypeId ?? ROOM_CONFIG.defaultTypeId,
      name: A.name ?? B.name,
    };
    this.pushHistory();
    const next = [
      ...this.model.loops.slice(0, lo),
      newLoop,
      ...this.model.loops.slice(lo + 1, hi),
      ...this.model.loops.slice(hi + 1),
    ];
    this.model = { ...this.model, loops: next };
    this.setSelection({ kind: 'wall', loopIndex: lo, wallIndex: 0 }, true, false);
    this.cfg.onChange();
    return true;
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
    this.writeLoop(sel.loopIndex, { doors }, true);
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
   * Split loop into two by partition candidate. No automatic doors — user adds them.
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
      doors: [],
      roomTypeId: ROOM_CONFIG.defaultTypeId,
      name: null,
    };
    const loopB: Loop = {
      id: newLoopId(),
      vertices: split.loopB,
      doors: [],
      roomTypeId: ROOM_CONFIG.defaultTypeId,
      name: null,
    };
    const loops = [
      ...this.model.loops.slice(0, loopIndex),
      loopA,
      loopB,
      ...this.model.loops.slice(loopIndex + 1),
    ];
    this.pushHistory();
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
      doors: [],
      roomTypeId: ROOM_CONFIG.defaultTypeId,
      name: null,
    }));
    // No auto-doors: user places access doors after splitting
    const loops = [
      ...this.model.loops.slice(0, loopIndex),
      ...newLoops,
      ...this.model.loops.slice(loopIndex + 1),
    ];
    this.pushHistory();
    this.model = { ...this.model, loops };
    this.meetfoutLoopIndex = null;
    this.setSelection({ kind: 'wall', loopIndex, wallIndex: 0 }, true, false);
    this.cfg.onChange();
    return true;
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
    this.pushHistory();
    this.model = {
      loops: [],
      status: 'idle',
      vertices: [],
      draftEnd: null,
      partitionPath: null,
      partitionLoopIndex: null,
    };
    this.selection = { kind: 'none' };
    this.meetfoutLoopIndex = null;
    this.active = false;
    this.pointerId = null;
    this.dragDoor = null;
    this.dragWall = null;
    
    this.emitSelection();
    this.cfg.onChange();
  }

  /**
   * Undo last user action (split, muur, deur, tekenen, …).
   * Not the same as “delete last vertex only”.
   */
  undo(): boolean {
    const prev = this.history.pop();
    if (!prev) {
      this.cfg.onReject();
      return false;
    }
    this.historyLocked = true;
    this.model = prev.model;
    this.selection = prev.selection;
    this.meetfoutLoopIndex = prev.meetfoutLoopIndex;
    this.historyLocked = false;
    this.active = false;
    this.pointerId = null;
    this.dragDoor = null;
    this.dragWall = null;
    
    this.emitSelection();
    this.cfg.onChange();
    return true;
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

    // Free partition drawing
    if (status === 'partition' && this.model.partitionLoopIndex !== null) {
      this.handlePartitionClick(p);
      return;
    }

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
      this.pushHistory();
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
      const d = this.getSelectedDoor();
      if (d && d.wallIndex === hit.wallIndex) {
        this.dragDoor = {
          loopIndex: this.selection.loopIndex,
          doorId: this.selection.doorId,
        };
        this.active = true;
        this.pointerId = e.pointerId;
        this.canvas.setPointerCapture(e.pointerId);
        return;
      }
    }

    if (hit.kind === 'wall' && hit.loopIndex !== null) {
      this.pushHistory();
      this.setSelection(hit, true, false);
      this.dragWall = {
        loopIndex: hit.loopIndex,
        wallIndex: hit.wallIndex,
        partner: findPartnerWall(this.model.loops, hit.loopIndex, hit.wallIndex),
        last: p,
      };
      this.active = true;
      this.pointerId = e.pointerId;
      this.canvas.setPointerCapture(e.pointerId);
      this.cfg.onChange();
      return;
    }

    if (hit.kind === 'wall') {
      this.setSelection(hit, true, false);
      this.cfg.onChange();
      return;
    }

    if (hit.kind === 'vertex') {
      this.setSelection(hit, false, true);
      this.cfg.onChange();
      return;
    }

    // Empty click: start new chain if idle
    if (status === 'idle' || (status === 'open' && vertices.length === 0)) {
      this.pushHistory();
      this.model = {
        ...this.model,
        status: 'drawing',
        vertices: [{ ...p }],
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
    const p = this.localPoint(e);

    if (this.dragDoor) {
      if (this.moveDoorToPoint(this.dragDoor.loopIndex, this.dragDoor.doorId, p)) {
        this.cfg.onChange();
      }
      return;
    }

    if (this.dragWall) {
      this.moveDraggedWall(p);
      return;
    }

    // Live draft for free partition (corners / schuine wanden)
    if (
      this.model.status === 'partition' &&
      this.model.partitionPath &&
      this.model.partitionPath.length > 0
    ) {
      const draft = this.snapPartitionDraft(p);
      this.model = { ...this.model, draftEnd: draft };
      this.cfg.onChange();
      return;
    }

    if (!this.active || e.pointerId !== this.pointerId) return;
    if (this.model.status !== 'drawing') return;
    if (this.model.vertices.length === 0) return;
    const snapped = this.snapDraft(p);
    this.model = { ...this.model, draftEnd: snapped };
    this.cfg.onChange();
  };

  /** Snap partition draft: 0/45/90°, lock onto opposite walls; don't stick to start wall. */
  private snapPartitionDraft(raw: Point): Point {
    const li = this.model.partitionLoopIndex;
    const path = this.model.partitionPath;
    if (li === null || !path?.length) return raw;
    const loop = this.model.loops[li];
    if (!loop) return raw;

    const start = path[0];
    const last = path[path.length - 1];
    const magnet = Math.max(18, this.worldHitRadius() * 1.8);
    const startWall = pointToWallParam(loop.vertices, start, 12);

    const desired = angleOf(last, raw);
    const len = Math.max(dist(last, raw), 1);
    let dir: number;
    if (path.length >= 2) {
      const prev = path[path.length - 2];
      dir = snapAngleRelative(angleOf(prev, last), desired, 45);
    } else {
      dir = snapWorldAngle(desired, 45);
    }

    // Ray to next wall(s) along snapped direction — primary way to end on a wall
    const ray = rayHitPolygonBoundary(last, dir, loop.vertices, 10, 20000);
    if (ray && dist(ray.point, start) > magnet) {
      const along = dist(last, raw);
      // Stick when cursor is near or past the hit
      if (along >= ray.dist - magnet) {
        return { ...ray.point };
      }
    }

    // Direct magnet only if clearly on a *different* wall (not start wall / near start)
    const onWall = pointToWallParam(loop.vertices, raw, magnet);
    if (onWall) {
      const segs = wallSegments(loop.vertices, true);
      const pt = pointOnSegment(segs[onWall.wallIndex].a, segs[onWall.wallIndex].b, onWall.t);
      const farFromStart = dist(pt, start) > magnet * 1.25;
      const differentWall =
        !startWall ||
        onWall.wallIndex !== startWall.wallIndex ||
        Math.abs(onWall.t - startWall.t) > 0.08;
      if (farFromStart && differentWall) {
        return pt;
      }
    }

    // Free 45°/90° segment inside the room
    return pointFromPolar(last, dir, len);
  }

  private snapPointToLoopWall(
    loopVerts: Point[],
    p: Point,
    magnet: number,
  ): Point | null {
    const on = pointToWallParam(loopVerts, p, magnet);
    if (!on) return null;
    const segs = wallSegments(loopVerts, true);
    return pointOnSegment(segs[on.wallIndex].a, segs[on.wallIndex].b, on.t);
  }

  /** True if point lies on a wall other than the partition start (or far along same wall). */
  private isPartitionEndOnWall(
    loopVerts: Point[],
    p: Point,
    start: Point,
    magnet: number,
  ): Point | null {
    const on = pointToWallParam(loopVerts, p, magnet);
    if (!on) return null;
    const segs = wallSegments(loopVerts, true);
    const pt = pointOnSegment(segs[on.wallIndex].a, segs[on.wallIndex].b, on.t);
    if (dist(pt, start) < Math.max(16, magnet * 0.75)) return null;
    const startOn = pointToWallParam(loopVerts, start, 12);
    if (
      startOn &&
      startOn.wallIndex === on.wallIndex &&
      Math.abs(startOn.t - on.t) < 0.05
    ) {
      return null;
    }
    return pt;
  }

  private commitPartitionPath(loopIndex: number, fullPath: Point[]): boolean {
    const loop = this.model.loops[loopIndex];
    if (!loop || fullPath.length < 2) return false;
    // Ensure endpoints project onto walls with generous tolerance
    const a = this.snapPointToLoopWall(loop.vertices, fullPath[0], 40);
    const b = this.snapPointToLoopWall(
      loop.vertices,
      fullPath[fullPath.length - 1],
      40,
    );
    if (!a || !b) return false;
    const path = [a, ...fullPath.slice(1, -1), b];
    const result = splitPolygonByPath(loop.vertices, path);
    if (!result) return false;
    if (result.loopA.length < 3 || result.loopB.length < 3) return false;

    this.pushHistory();
    const loopA: Loop = {
      id: newLoopId(),
      vertices: result.loopA,
      doors: [],
      roomTypeId: loop.roomTypeId ?? ROOM_CONFIG.defaultTypeId,
      name: null,
    };
    const loopB: Loop = {
      id: newLoopId(),
      vertices: result.loopB,
      doors: [],
      roomTypeId: ROOM_CONFIG.defaultTypeId,
      name: null,
    };
    const loops = [
      ...this.model.loops.slice(0, loopIndex),
      loopA,
      loopB,
      ...this.model.loops.slice(loopIndex + 1),
    ];
    this.model = {
      ...this.model,
      loops,
      status: 'idle',
      partitionPath: null,
      partitionLoopIndex: null,
      draftEnd: null,
    };
    this.setSelection({ kind: 'wall', loopIndex, wallIndex: 0 }, true, false);
    this.cfg.onChange();
    return true;
  }

  private moveDraggedWall(p: Point): void {
    if (!this.dragWall) return;
    const { loopIndex, wallIndex, partner, last } = this.dragWall;
    const loop = this.model.loops[loopIndex];
    if (!loop) return;
    const segs = wallSegments(loop.vertices, true);
    const seg = segs[wallIndex];
    if (!seg) return;

    const rawDx = p.x - last.x;
    const rawDy = p.y - last.y;
    const { dx, dy } = projectOntoNormal(rawDx, rawDy, seg.a, seg.b);
    if (Math.hypot(dx, dy) < 0.2) return;

    const nextVerts = translateWallBy(loop.vertices, wallIndex, dx, dy);
    if (!nextVerts) {
      this.cfg.onReject();
      return;
    }

    let loops = this.model.loops.map((L, i) =>
      i === loopIndex ? { ...L, vertices: nextVerts } : L,
    );

    if (partner) {
      const pLoop = loops[partner.partnerLoopIndex];
      if (pLoop) {
        const pNext = translateWallBy(
          pLoop.vertices,
          partner.partnerWallIndex,
          dx,
          dy,
        );
        if (!pNext) {
          this.cfg.onReject();
          return;
        }
        loops = loops.map((L, i) =>
          i === partner.partnerLoopIndex ? { ...L, vertices: pNext } : L,
        );
      }
    }

    this.model = { ...this.model, loops };
    this.dragWall = { ...this.dragWall, last: p };
    this.cfg.onChange();
  }

  private onUp = (e: PointerEvent): void => {
    if (this.dragDoor) {
      this.dragDoor = null;
      this.active = false;
      this.pointerId = null;
      this.cfg.onChange();
      return;
    }
    if (this.dragWall) {
      this.dragWall = null;
      this.active = false;
      this.pointerId = null;
      this.cfg.onChange();
      return;
    }

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
      this.model = {
        ...this.model,
        status: 'idle',
        vertices: [],
        draftEnd: null,
      };
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
      const loop: Loop = {
        id: newLoopId(),
        vertices: loopVerts,
        doors: [],
        roomTypeId: ROOM_CONFIG.defaultTypeId,
        name: null,
      };
      const loops = [...this.model.loops, loop];
      const loopIndex = loops.length - 1;
      this.pushHistory();
      this.model = {
        loops,
        status: 'idle',
        vertices: [],
        draftEnd: null,
        partitionPath: null,
        partitionLoopIndex: null,
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
    this.pushHistory();
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

  private handlePartitionClick(p: Point): void {
    const li = this.model.partitionLoopIndex;
    if (li === null) return;
    const loop = this.model.loops[li];
    if (!loop) return;
    const path = [...(this.model.partitionPath ?? [])];
    const magnet = Math.max(22, this.worldHitRadius() * 2);

    // Start: must begin on an existing wall of this room
    if (path.length === 0) {
      const start = this.snapPointToLoopWall(loop.vertices, p, magnet);
      if (!start) {
        this.cfg.onReject();
        return;
      }
      this.model = {
        ...this.model,
        partitionPath: [start],
        draftEnd: null,
      };
      this.cfg.onChange();
      return;
    }

    const start = path[0];
    const snapped = this.snapPartitionDraft(p);

    // Finish if draft locked onto a different existing wall
    const endPt =
      this.isPartitionEndOnWall(loop.vertices, snapped, start, magnet + 6) ??
      this.isPartitionEndOnWall(loop.vertices, p, start, magnet);

    if (endPt) {
      const full = [...path, endPt];
      if (!this.commitPartitionPath(li, full)) {
        this.cfg.onReject();
      }
      return;
    }

    // Intermediate corner: must be inside room
    const inside =
      pointInPolygon(snapped, loop.vertices) || pointInPolygon(p, loop.vertices);
    if (!inside) {
      this.cfg.onReject();
      return;
    }
    // Don't place a "corner" still stuck on the start wall
    if (dist(snapped, start) < 12) {
      this.cfg.onReject();
      return;
    }
    path.push({ ...snapped });
    this.model = { ...this.model, partitionPath: path, draftEnd: null };
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
