import type { Point, Segment } from './types';

const TAU = Math.PI * 2;

export function dist(a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.hypot(dx, dy);
}

export function mid(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function sub(a: Point, b: Point): Point {
  return { x: a.x - b.x, y: a.y - b.y };
}

export function add(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function scale(p: Point, s: number): Point {
  return { x: p.x * s, y: p.y * s };
}

/** Direction angle of segment a→b in radians (−π, π]. */
export function angleOf(a: Point, b: Point): number {
  return Math.atan2(b.y - a.y, b.x - a.x);
}

export function normalizeAngle(rad: number): number {
  let a = rad % TAU;
  if (a <= -Math.PI) a += TAU;
  if (a > Math.PI) a -= TAU;
  return a;
}

/**
 * Snap absolute world direction to a grid of `stepDeg` (default 45°).
 * Used for the first wall.
 */
export function snapWorldAngle(desiredRad: number, stepDeg = 45): number {
  const step = (stepDeg * Math.PI) / 180;
  return Math.round(desiredRad / step) * step;
}

/**
 * Snap direction relative to previous segment direction onto stepDeg grid
 * (0, ±45, ±90, …). Returns absolute direction in radians.
 */
export function snapAngleRelative(
  prevDirRad: number,
  desiredDirRad: number,
  stepDeg = 45,
): number {
  const step = (stepDeg * Math.PI) / 180;
  const rel = normalizeAngle(desiredDirRad - prevDirRad);
  const snappedRel = Math.round(rel / step) * step;
  return prevDirRad + snappedRel;
}

export function pointFromPolar(origin: Point, dirRad: number, length: number): Point {
  return {
    x: origin.x + Math.cos(dirRad) * length,
    y: origin.y + Math.sin(dirRad) * length,
  };
}

export function nearPoint(p: Point, target: Point, radiusPx: number): boolean {
  return dist(p, target) <= radiusPx;
}

/** Cross product z-component of (b-a) × (c-a). */
function cross(a: Point, b: Point, c: Point): number {
  return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

function onSegment(a: Point, b: Point, p: Point, eps: number): boolean {
  return (
    Math.min(a.x, b.x) - eps <= p.x &&
    p.x <= Math.max(a.x, b.x) + eps &&
    Math.min(a.y, b.y) - eps <= p.y &&
    p.y <= Math.max(a.y, b.y) + eps
  );
}

/**
 * Proper intersection of two segments (shared endpoints do not count).
 */
export function segmentsIntersect(s1: Segment, s2: Segment, eps = 1e-6): boolean {
  const { a, b } = s1;
  const { a: c, b: d } = s2;

  // Shared endpoint → not a crossing
  if (
    dist(a, c) < eps ||
    dist(a, d) < eps ||
    dist(b, c) < eps ||
    dist(b, d) < eps
  ) {
    return false;
  }

  const d1 = cross(c, d, a);
  const d2 = cross(c, d, b);
  const d3 = cross(a, b, c);
  const d4 = cross(a, b, d);

  if (
    ((d1 > eps && d2 < -eps) || (d1 < -eps && d2 > eps)) &&
    ((d3 > eps && d4 < -eps) || (d3 < -eps && d4 > eps))
  ) {
    return true;
  }

  // Colinear overlap counts as intersection (bad walls)
  if (Math.abs(d1) <= eps && onSegment(c, d, a, eps)) return true;
  if (Math.abs(d2) <= eps && onSegment(c, d, b, eps)) return true;
  if (Math.abs(d3) <= eps && onSegment(a, b, c, eps)) return true;
  if (Math.abs(d4) <= eps && onSegment(a, b, d, eps)) return true;

  return false;
}

/** Build segments from open vertex chain (no close edge). */
export function chainSegments(vertices: Point[]): Segment[] {
  const segs: Segment[] = [];
  for (let i = 0; i < vertices.length - 1; i++) {
    segs.push({ a: vertices[i], b: vertices[i + 1] });
  }
  return segs;
}

/** Open chain segments, or full loop including last→first when closed. */
export function wallSegments(vertices: Point[], closed: boolean): Segment[] {
  const segs = chainSegments(vertices);
  if (closed && vertices.length >= 3) {
    segs.push({ a: vertices[vertices.length - 1], b: vertices[0] });
  }
  return segs;
}

/** Shortest distance from point p to segment a–b. */
export function distPointToSegment(p: Point, a: Point, b: Point): number {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 < 1e-12) return dist(p, a);
  let t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2;
  t = Math.max(0, Math.min(1, t));
  return dist(p, { x: a.x + t * abx, y: a.y + t * aby });
}

/** Parameter t∈[0,1] of closest point on segment a→b. */
export function projectTOnSegment(p: Point, a: Point, b: Point): number {
  const abx = b.x - a.x;
  const aby = b.y - a.y;
  const len2 = abx * abx + aby * aby;
  if (len2 < 1e-12) return 0;
  const t = ((p.x - a.x) * abx + (p.y - a.y) * aby) / len2;
  return Math.max(0, Math.min(1, t));
}

export function pointOnSegment(a: Point, b: Point, t: number): Point {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

export type DoorGeom = {
  a: Point;
  b: Point;
  /** Left edge of opening (from wall start). */
  openA: Point;
  /** Right edge of opening. */
  openB: Point;
  center: Point;
  dir: number;
  halfWidthPx: number;
  wallLenPx: number;
};

/**
 * Compute door opening geometry on wall a→b.
 * Returns null if door is wider than wall (minus margins).
 */
export function doorGeometry(
  a: Point,
  b: Point,
  t: number,
  widthM: number,
  pxPerMeter: number,
): DoorGeom | null {
  const wallLenPx = dist(a, b);
  if (wallLenPx < 2 || widthM <= 0 || pxPerMeter <= 0) return null;
  const halfWidthPx = (widthM * pxPerMeter) / 2;
  const margin = 4;
  if (halfWidthPx * 2 + margin * 2 > wallLenPx) return null;

  let tCenter = Math.max(0, Math.min(1, t));
  const halfT = halfWidthPx / wallLenPx;
  // Keep door fully on wall
  tCenter = Math.max(halfT + margin / wallLenPx, Math.min(1 - halfT - margin / wallLenPx, tCenter));

  const openA = pointOnSegment(a, b, tCenter - halfT);
  const openB = pointOnSegment(a, b, tCenter + halfT);
  const center = pointOnSegment(a, b, tCenter);
  return {
    a,
    b,
    openA,
    openB,
    center,
    dir: angleOf(a, b),
    halfWidthPx: dist(openA, openB) / 2,
    wallLenPx,
  };
}

/**
 * Wall pieces left after cutting door openings (same wallIndex).
 * Returns list of [start,end] segments to stroke.
 */
export function wallPiecesWithDoors(
  a: Point,
  b: Point,
  doors: { t: number; widthM: number }[],
  pxPerMeter: number,
): Segment[] {
  const L = dist(a, b);
  if (L < 1e-6) return [];
  if (!doors.length) return [{ a, b }];

  type Interval = { t0: number; t1: number };
  const cuts: Interval[] = [];
  for (const d of doors) {
    const g = doorGeometry(a, b, d.t, d.widthM, pxPerMeter);
    if (!g) continue;
    const t0 = dist(a, g.openA) / L;
    const t1 = dist(a, g.openB) / L;
    cuts.push({ t0: Math.min(t0, t1), t1: Math.max(t0, t1) });
  }
  if (!cuts.length) return [{ a, b }];
  cuts.sort((x, y) => x.t0 - y.t0);

  // Merge overlapping
  const merged: Interval[] = [];
  for (const c of cuts) {
    const last = merged[merged.length - 1];
    if (!last || c.t0 > last.t1 + 1e-6) merged.push({ ...c });
    else last.t1 = Math.max(last.t1, c.t1);
  }

  const pieces: Segment[] = [];
  let cursor = 0;
  for (const m of merged) {
    if (m.t0 - cursor > 1e-4) {
      pieces.push({ a: pointOnSegment(a, b, cursor), b: pointOnSegment(a, b, m.t0) });
    }
    cursor = m.t1;
  }
  if (1 - cursor > 1e-4) {
    pieces.push({ a: pointOnSegment(a, b, cursor), b: pointOnSegment(a, b, 1) });
  }
  return pieces;
}

export function hitTestDoor(
  p: Point,
  vertices: Point[],
  doors: { id: string; wallIndex: number; t: number; widthM: number }[],
  pxPerMeter: number,
  maxDistPx: number,
): string | null {
  const segs = wallSegments(vertices, true);
  let bestId: string | null = null;
  let bestD = maxDistPx;
  for (const d of doors) {
    const seg = segs[d.wallIndex];
    if (!seg) continue;
    const g = doorGeometry(seg.a, seg.b, d.t, d.widthM, pxPerMeter);
    if (!g) continue;
    // Distance to opening segment or to center
    const dOpen = distPointToSegment(p, g.openA, g.openB);
    const dCenter = dist(p, g.center);
    const dd = Math.min(dOpen, dCenter);
    if (dd <= bestD) {
      bestD = dd;
      bestId = d.id;
    }
  }
  return bestId;
}

/**
 * Hit-test wall index under point. Returns index into wallSegments(...), or null.
 */
export function hitTestWall(
  p: Point,
  vertices: Point[],
  closed: boolean,
  maxDistPx: number,
): number | null {
  const segs = wallSegments(vertices, closed);
  let best: number | null = null;
  let bestD = maxDistPx;
  for (let i = 0; i < segs.length; i++) {
    const d = distPointToSegment(p, segs[i].a, segs[i].b);
    if (d <= bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/**
 * px/m such that a wall of `pixelLength` equals `meters`.
 * Clamped to a practical range for canvas drawing.
 */
export function scaleFromTypedLength(
  pixelLength: number,
  meters: number,
  minPpm = 5,
  maxPpm = 2000,
): number | null {
  if (!(pixelLength > 0) || !(meters > 0) || !Number.isFinite(meters)) return null;
  const ppm = pixelLength / meters;
  if (!Number.isFinite(ppm)) return null;
  return Math.min(maxPpm, Math.max(minPpm, ppm));
}

/**
 * True if adding segment last→end would properly intersect existing chain.
 * When closing, end should be the first vertex; still checks non-adjacent edges.
 */
export function wouldIntersect(
  vertices: Point[],
  end: Point,
  closing: boolean,
  eps = 1e-6,
): boolean {
  if (vertices.length < 1) return false;
  const start = vertices[vertices.length - 1];
  const candidate: Segment = { a: start, b: end };
  const existing = chainSegments(vertices);

  for (let i = 0; i < existing.length; i++) {
    // Adjacent to candidate: last existing segment shares `start` — skip
    if (i === existing.length - 1) continue;
    // When closing, also skip first segment (shares first vertex with end)
    if (closing && i === 0) continue;
    if (segmentsIntersect(candidate, existing[i], eps)) return true;
  }
  return false;
}

/**
 * Polygon area in m² via shoelace.
 * vertices: ordered corners, not repeating first. Need ≥3.
 */
export function polygonAreaM2(vertices: Point[], pxPerMeter: number): number {
  if (vertices.length < 3 || pxPerMeter <= 0) return 0;
  let sum = 0;
  const n = vertices.length;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
  }
  const areaPx2 = Math.abs(sum) / 2;
  return areaPx2 / (pxPerMeter * pxPerMeter);
}

export function lengthM(a: Point, b: Point, pxPerMeter: number): number {
  if (pxPerMeter <= 0) return 0;
  return dist(a, b) / pxPerMeter;
}

export function formatMeters(m: number, digits = 2): string {
  return `${m.toFixed(digits)} m`;
}

export function formatArea(m2: number, digits = 2): string {
  return `${m2.toFixed(digits)} m²`;
}

/**
 * Resize wall `wallIndex` to `lengthPx` by moving the end vertex along the wall direction
 * (start vertex stays put). Works for open chain and closed polygon.
 */
export function setSegmentLengthPx(
  vertices: Point[],
  wallIndex: number,
  lengthPx: number,
  closed: boolean,
): Point[] | null {
  const n = vertices.length;
  if (n < 2 || lengthPx < 1) return null;
  const maxWall = closed ? n : n - 1;
  if (wallIndex < 0 || wallIndex >= maxWall) return null;

  const i = wallIndex;
  const j = closed ? (i + 1) % n : i + 1;
  const a = vertices[i];
  const b = vertices[j];
  const d = dist(a, b);
  if (d < 1e-9) return null;

  const ux = (b.x - a.x) / d;
  const uy = (b.y - a.y) / d;
  const newB = { x: a.x + ux * lengthPx, y: a.y + uy * lengthPx };
  const out = vertices.map((p) => ({ ...p }));
  out[j] = newB;
  return out;
}

export function totalLoopsAreaM2(
  loops: { vertices: Point[] }[],
  pxPerMeter: number,
): number {
  return loops.reduce((sum, loop) => sum + polygonAreaM2(loop.vertices, pxPerMeter), 0);
}

export function formatDegrees(deg: number, digits = 1): string {
  return `${deg.toFixed(digits)}°`;
}

/**
 * Smaller angle between wall directions at B (path A–B–C), degrees in (0, 180].
 * Not the same as room interior when interior is reflex (>180°).
 */
export function cornerAngleDeg(a: Point, b: Point, c: Point): number {
  const v1x = a.x - b.x;
  const v1y = a.y - b.y;
  const v2x = c.x - b.x;
  const v2y = c.y - b.y;
  const n1 = Math.hypot(v1x, v1y);
  const n2 = Math.hypot(v2x, v2y);
  if (n1 < 1e-9 || n2 < 1e-9) return 0;
  const cos = Math.max(-1, Math.min(1, (v1x * v2x + v1y * v2y) / (n1 * n2)));
  return (Math.acos(cos) * 180) / Math.PI;
}

/** Signed turn of path prev→corner→next, radians (−π, π]. + = left in math coords. */
export function signedTurnRad(prev: Point, corner: Point, next: Point): number {
  const inDir = angleOf(prev, corner);
  const outDir = angleOf(corner, next);
  return normalizeAngle(outDir - inDir);
}

/** Shoelace sign: +1 CCW, −1 CW (math y-up; canvas y-down is visually flipped). */
export function polygonWindingSign(vertices: Point[]): number {
  let sum = 0;
  const n = vertices.length;
  if (n < 3) return 1;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    sum += vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y;
  }
  return sum < 0 ? -1 : 1;
}

export type InteriorExterior = {
  /** Room interior angle (0, 360) */
  interiorDeg: number;
  /** Complement 360 − interior */
  exteriorDeg: number;
  /** Smaller wall wedge (0, 180] */
  wallWedgeDeg: number;
};

/**
 * Interior = angle inside the shape given windingSign.
 * exterior = 360 − interior.
 * For open chains pass windingSign of the intended room (default +1) or estimate later.
 */
export function interiorExterior(
  prev: Point,
  corner: Point,
  next: Point,
  windingSign: number,
): InteriorExterior {
  const turn = signedTurnRad(prev, corner, next);
  const w = windingSign >= 0 ? 1 : -1;
  let interior = Math.PI - w * turn;
  if (interior <= 1e-9) interior += Math.PI * 2;
  if (interior > Math.PI * 2 + 1e-9) interior -= Math.PI * 2;
  // clamp numerical noise into (0, 360]
  let interiorDeg = (interior * 180) / Math.PI;
  if (interiorDeg < 0) interiorDeg += 360;
  if (interiorDeg > 360) interiorDeg -= 360;
  if (interiorDeg < 0.05) interiorDeg = 360;
  const exteriorDeg = 360 - interiorDeg;
  return {
    interiorDeg,
    exteriorDeg,
    wallWedgeDeg: cornerAngleDeg(prev, corner, next),
  };
}

export function interiorExteriorAt(
  vertices: Point[],
  cornerIndex: number,
  closed: boolean,
): InteriorExterior | null {
  const nb = cornerNeighbors(vertices, cornerIndex, closed);
  if (!nb) return null;
  const wind = closed ? polygonWindingSign(vertices) : estimateOpenWinding(vertices);
  return interiorExterior(nb.prev, nb.corner, nb.next, wind);
}

/** Rough winding from open chain turns (sign of total turn). */
export function estimateOpenWinding(vertices: Point[]): number {
  if (vertices.length < 3) return 1;
  let sum = 0;
  for (let i = 1; i < vertices.length - 1; i++) {
    sum += signedTurnRad(vertices[i - 1], vertices[i], vertices[i + 1]);
  }
  return sum < 0 ? -1 : 1;
}

/** Allowed interior angles: 45°-raster (45, 90, 135, …). 135 = “effect van 45°”. */
export const CANONICAL_INTERIORS = [45, 90, 135, 180, 225, 270, 315] as const;

/** True if angle is on the 45° grid (incl. 45 / 90 / 135). */
export function isCanonicalAngle(deg: number, step = 45, tol = 1.5): boolean {
  const m = ((deg % step) + step) % step;
  return m <= tol || step - m <= tol;
}

export function nearestCanonicalAngle(
  deg: number,
  options: number[] = [...CANONICAL_INTERIORS],
): number {
  // normalize to [0, 360)
  let d = deg % 360;
  if (d < 0) d += 360;
  let best = options[0] ?? 90;
  let bestD = Infinity;
  for (const o of options) {
    const dist = Math.min(Math.abs(d - o), 360 - Math.abs(d - o));
    if (dist < bestD) {
      bestD = dist;
      best = o;
    }
  }
  return best;
}

/** Neighbours of corner index (open or closed). null if corner has no angle. */
export function cornerNeighbors(
  vertices: Point[],
  cornerIndex: number,
  closed: boolean,
): { prev: Point; corner: Point; next: Point; prevIdx: number; nextIdx: number } | null {
  const n = vertices.length;
  if (n < 3) return null;
  if (!closed && (cornerIndex <= 0 || cornerIndex >= n - 1)) return null;
  if (closed && (cornerIndex < 0 || cornerIndex >= n)) return null;
  const prevIdx = closed ? (cornerIndex - 1 + n) % n : cornerIndex - 1;
  const nextIdx = closed ? (cornerIndex + 1) % n : cornerIndex + 1;
  return {
    prev: vertices[prevIdx],
    corner: vertices[cornerIndex],
    next: vertices[nextIdx],
    prevIdx,
    nextIdx,
  };
}

export function cornerAngleAt(
  vertices: Point[],
  cornerIndex: number,
  closed: boolean,
): number | null {
  const ie = interiorExteriorAt(vertices, cornerIndex, closed);
  return ie ? ie.interiorDeg : null;
}

/**
 * Set interior angle by rotating corner→next around corner (length preserved).
 */
export function moveNextForInteriorAngle(
  vertices: Point[],
  cornerIndex: number,
  targetInteriorDeg: number,
  closed: boolean,
): Point[] | null {
  const n = vertices.length;
  if (n < 3) return null;
  const nb = cornerNeighbors(vertices, cornerIndex, closed);
  if (!nb) return null;

  const wind = closed ? polygonWindingSign(vertices) : estimateOpenWinding(vertices);
  const w = wind >= 0 ? 1 : -1;
  const len = dist(nb.corner, nb.next);
  if (len < 1e-6) return null;

  let tDeg = targetInteriorDeg;
  if (!Number.isFinite(tDeg)) return null;
  // allow 0..360 exclusive extremes slightly
  tDeg = Math.max(1, Math.min(359, tDeg));

  const inDir = angleOf(nb.prev, nb.corner);
  const turn = w * (Math.PI - (tDeg * Math.PI) / 180);
  const newOut = inDir + turn;

  const out = vertices.map((p) => ({ ...p }));
  out[nb.nextIdx] = pointFromPolar(nb.corner, newOut, len);
  return out;
}

/** @deprecated alias — target is interior degrees */
export function moveNextForCornerAngle(
  vertices: Point[],
  cornerIndex: number,
  targetDeg: number,
  closed: boolean,
): Point[] | null {
  return moveNextForInteriorAngle(vertices, cornerIndex, targetDeg, closed);
}

export function snapCornerToCanonical(
  vertices: Point[],
  cornerIndex: number,
  closed: boolean,
  options: number[] = [45, 90, 135, 180, 225, 270, 315],
): Point[] | null {
  const cur = cornerAngleAt(vertices, cornerIndex, closed);
  if (cur === null) return null;
  const target = nearestCanonicalAngle(cur, options);
  return moveNextForInteriorAngle(vertices, cornerIndex, target, closed);
}

/** Unit directions from corner along walls; mid-angle of interior wedge for labels/arcs. */
export function interiorBisectorRad(
  prev: Point,
  corner: Point,
  next: Point,
  windingSign: number,
): { startRad: number; endRad: number; midRad: number; sweepRad: number } {
  const a0 = angleOf(corner, prev);
  const a1 = angleOf(corner, next);
  const w = windingSign >= 0 ? 1 : -1;
  // Sweep from a0 to a1 in the interior direction
  let sweep = normalizeAngle(a1 - a0);
  // Interior corresponds to going from wall-to-prev to wall-to-next along the interior
  // For path interior: from direction to prev, we need sweep matching interior angle
  const ie = interiorExterior(prev, corner, next, w);
  const interiorRad = (ie.interiorDeg * Math.PI) / 180;
  // Choose orientation of sweep from a0 that matches interior size
  // Two ways: a0 → a1 short or long
  let s = sweep;
  if (Math.abs(Math.abs(s) - interiorRad) > 0.15) {
    // flip: go the long way
    s = s > 0 ? s - Math.PI * 2 : s + Math.PI * 2;
  }
  // If still wrong magnitude, force sweep magnitude to interior with sign of s
  if (Math.abs(Math.abs(s) - interiorRad) > 0.2) {
    s = Math.sign(s || w) * interiorRad;
  }
  const mid = a0 + s / 2;
  return { startRad: a0, endRad: a0 + s, midRad: mid, sweepRad: s };
}

/** Relative direction of draft vs previous wall, degrees (−180, 180]. */
export function relativeTurnDeg(prevA: Point, prevB: Point, draftEnd: Point): number {
  const prevDir = angleOf(prevA, prevB);
  const draftDir = angleOf(prevB, draftEnd);
  return (normalizeAngle(draftDir - prevDir) * 180) / Math.PI;
}

export function hitTestVertex(
  p: Point,
  vertices: Point[],
  radiusPx: number,
): number | null {
  let best: number | null = null;
  let bestD = radiusPx;
  for (let i = 0; i < vertices.length; i++) {
    const d = dist(p, vertices[i]);
    if (d <= bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** Indices of corners whose interior is not on the 45° grid. */
export function listNonCanonicalCorners(
  vertices: Point[],
  closed: boolean,
  tol = 1.5,
): number[] {
  if (!closed || vertices.length < 3) return [];
  const odd: number[] = [];
  for (let i = 0; i < vertices.length; i++) {
    const d = cornerAngleAt(vertices, i, true);
    if (d !== null && !isCanonicalAngle(d, 45, tol)) odd.push(i);
  }
  return odd;
}

function closedSelfIntersects(vertices: Point[]): boolean {
  const segs = wallSegments(vertices, true);
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      if (j === i + 1) continue;
      if (i === 0 && j === segs.length - 1) continue;
      if (segmentsIntersect(segs[i], segs[j])) return true;
    }
  }
  return false;
}

/** Public self-intersect check for open or closed polylines. */
export function polygonSelfIntersects(vertices: Point[], closed: boolean): boolean {
  if (closed) return closedSelfIntersects(vertices);
  const segs = wallSegments(vertices, false);
  for (let i = 0; i < segs.length; i++) {
    for (let j = i + 1; j < segs.length; j++) {
      if (j === i + 1) continue;
      if (segmentsIntersect(segs[i], segs[j])) return true;
    }
  }
  return false;
}

/**
 * Put residual meetfout at `absorbIndex`: snap other corners to 45° grid
 * while leaving absorb free so the odd angle visibly "moves" there.
 * Always starts from a fresh copy of `vertices` (for live hover previews).
 */
export function absorbErrorAtCorner(
  vertices: Point[],
  absorbIndex: number,
  passes = 8,
): Point[] {
  const n = vertices.length;
  if (n < 3 || absorbIndex < 0 || absorbIndex >= n) {
    return vertices.map((p) => ({ ...p }));
  }

  let v = vertices.map((p) => ({ ...p }));

  // Snap every corner except absorb — residual accumulates at absorb
  for (let pass = 0; pass < passes; pass++) {
    let changed = false;
    // Alternate direction so error migrates consistently
    const order =
      pass % 2 === 0
        ? [...Array(n).keys()]
        : [...Array(n).keys()].reverse();
    for (const i of order) {
      if (i === absorbIndex) continue;
      const cur = cornerAngleAt(v, i, true);
      if (cur === null) continue;
      const target = nearestCanonicalAngle(cur);
      if (Math.abs(cur - target) < 0.75) continue;
      const next = moveNextForInteriorAngle(v, i, target, true);
      if (next && !closedSelfIntersects(next)) {
        // Measure how much moved — require some motion
        const dMove = dist(next[(i + 1) % n], v[(i + 1) % n]);
        if (dMove > 0.05) {
          v = next;
          changed = true;
        }
      }
    }
    if (!changed) break;
  }

  // If absorb became canonical but others still odd, force residual onto absorb:
  // compute ideal targets for others and set absorb to remaining interior sum.
  const absorbAng = cornerAngleAt(v, absorbIndex, true);
  const othersOdd = listNonCanonicalCorners(v, true).filter((i) => i !== absorbIndex);
  if (othersOdd.length === 0 && absorbAng !== null && isCanonicalAngle(absorbAng)) {
    // Shape fully snapped — synthesize a visible residual by nudging absorb vertex
    // using original absorb angle vs nearest, so user still sees a difference vs other picks
    const origAng = cornerAngleAt(vertices, absorbIndex, true);
    if (origAng !== null && !isCanonicalAngle(origAng)) {
      const forced = moveNextForInteriorAngle(v, absorbIndex, origAng, true);
      if (forced && !closedSelfIntersects(forced)) v = forced;
    }
  } else if (othersOdd.length > 0) {
    // Extra pass prioritizing corners farthest from absorb
    for (let k = 0; k < n; k++) {
      const i = (absorbIndex + 1 + k) % n;
      if (i === absorbIndex) continue;
      const cur = cornerAngleAt(v, i, true);
      if (cur === null) continue;
      const target = nearestCanonicalAngle(cur);
      if (Math.abs(cur - target) < 0.75) continue;
      const next = moveNextForInteriorAngle(v, i, target, true);
      if (next && !closedSelfIntersects(next)) v = next;
    }
  }

  return v;
}

// ─── Partition / split loop ─────────────────────────────────────────

export type PartitionCandidate = {
  id: string;
  wallA: number;
  tA: number;
  wallB: number;
  tB: number;
  a: Point;
  b: Point;
};

/** Ray-cast point-in-polygon (boundary counts as inside). */
export function pointInPolygon(p: Point, vertices: Point[]): boolean {
  const n = vertices.length;
  if (n < 3) return false;
  // On edge?
  for (let i = 0; i < n; i++) {
    const a = vertices[i];
    const b = vertices[(i + 1) % n];
    if (distPointToSegment(p, a, b) < 1e-6) return true;
  }
  let inside = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = vertices[i].x;
    const yi = vertices[i].y;
    const xj = vertices[j].x;
    const yj = vertices[j].y;
    const intersect =
      yi > p.y !== yj > p.y &&
      p.x < ((xj - xi) * (p.y - yi)) / (yj - yi + 1e-15) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

/** True if open segment a–b lies inside polygon (samples + no edge crossings). */
export function chordInsidePolygon(a: Point, b: Point, vertices: Point[]): boolean {
  const len = dist(a, b);
  if (len < 8) return false;
  // Inset endpoints so T-junctions on boundary edges are not false crossings
  const ux = (b.x - a.x) / len;
  const uy = (b.y - a.y) / len;
  const inset = Math.min(3, len * 0.08);
  const a2 = { x: a.x + ux * inset, y: a.y + uy * inset };
  const b2 = { x: b.x - ux * inset, y: b.y - uy * inset };
  const segs = wallSegments(vertices, true);
  for (const s of segs) {
    if (segmentsIntersect({ a: a2, b: b2 }, s)) return false;
  }
  for (let k = 1; k <= 4; k++) {
    const t = k / 5;
    const p = pointOnSegment(a, b, t);
    if (!pointInPolygon(p, vertices)) return false;
  }
  return true;
}

function wallsAdjacent(i: number, j: number, n: number): boolean {
  if (i === j) return true;
  if ((i + 1) % n === j || (j + 1) % n === i) return true;
  return false;
}

/**
 * Candidate partition walls: midpoints and thirds between non-adjacent walls,
 * plus non-adjacent vertex diagonals.
 */
export function listPartitionCandidates(vertices: Point[]): PartitionCandidate[] {
  const n = vertices.length;
  if (n < 4) return []; // triangle can't split usefully with wall-to-wall mid
  const out: PartitionCandidate[] = [];
  const seen = new Set<string>();

  const push = (wallA: number, tA: number, wallB: number, tB: number): void => {
    if (wallsAdjacent(wallA, wallB, n)) return;
    const a = pointOnSegment(vertices[wallA], vertices[(wallA + 1) % n], tA);
    const b = pointOnSegment(vertices[wallB], vertices[(wallB + 1) % n], tB);
    if (!chordInsidePolygon(a, b, vertices)) return;
    // canonical id order
    let wa = wallA;
    let ta = tA;
    let wb = wallB;
    let tb = tB;
    let pa = a;
    let pb = b;
    if (wa > wb || (wa === wb && ta > tb)) {
      [wa, wb] = [wb, wa];
      [ta, tb] = [tb, ta];
      [pa, pb] = [pb, pa];
    }
    const id = `${wa}:${ta.toFixed(2)}-${wb}:${tb.toFixed(2)}`;
    if (seen.has(id)) return;
    seen.add(id);
    out.push({ id, wallA: wa, tA: ta, wallB: wb, tB: tb, a: pa, b: pb });
  };

  const ts = [0.5, 0.33, 0.67];
  for (let i = 0; i < n; i++) {
    for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue; // adjacent via wrap
      for (const ta of ts) {
        for (const tb of ts) {
          // prefer mids first — still add all unique valid
          push(i, ta, j, tb);
        }
      }
    }
  }

  // Cap to keep UI usable: sort by length descending (major splits first), take top 12
  out.sort((x, y) => dist(y.a, y.b) - dist(x.a, x.b));
  // Prefer pure mid-mid higher
  out.sort((x, y) => {
    const score = (c: PartitionCandidate) =>
      (Math.abs(c.tA - 0.5) < 0.01 && Math.abs(c.tB - 0.5) < 0.01 ? 1000 : 0) + dist(c.a, c.b);
    return score(y) - score(x);
  });
  return out.slice(0, 12);
}

/**
 * Split closed polygon by a chord on two boundary walls into two closed loops.
 * Doors are not remapped — caller should reattach or drop.
 */
export function splitPolygonByPartition(
  vertices: Point[],
  wallA: number,
  tA: number,
  wallB: number,
  tB: number,
): { loopA: Point[]; loopB: Point[] } | null {
  const n = vertices.length;
  if (n < 3 || wallA === wallB) return null;
  if (!chordInsidePolygon(
    pointOnSegment(vertices[wallA], vertices[(wallA + 1) % n], tA),
    pointOnSegment(vertices[wallB], vertices[(wallB + 1) % n], tB),
    vertices,
  )) {
    // still allow if near-valid
  }

  type Mark = { which: 'A' | 'B'; t: number };
  const onWall: Mark[][] = Array.from({ length: n }, () => []);
  onWall[wallA].push({ which: 'A', t: tA });
  onWall[wallB].push({ which: 'B', t: tB });
  for (const list of onWall) list.sort((x, y) => x.t - y.t);

  const ring: Point[] = [];
  let iA = -1;
  let iB = -1;

  for (let wi = 0; wi < n; wi++) {
    const vStart = vertices[wi];
    const vEnd = vertices[(wi + 1) % n];
    // vertex at start of wall
    const vi = ring.length;
    ring.push({ ...vStart });
    for (const m of onWall[wi]) {
      if (m.t <= 1e-6) {
        if (m.which === 'A') iA = vi;
        else iB = vi;
      } else if (m.t >= 1 - 1e-6) {
        // maps to next vertex — mark after loop when we know index
        // store deferred
      } else {
        const p = pointOnSegment(vStart, vEnd, m.t);
        const idx = ring.length;
        ring.push(p);
        if (m.which === 'A') iA = idx;
        else iB = idx;
      }
    }
  }

  // Resolve t≈1 marks: point is next wall's start vertex
  for (let wi = 0; wi < n; wi++) {
    for (const m of onWall[wi]) {
      if (m.t >= 1 - 1e-6) {
        const nextVi = (wi + 1) % n;
        // find ring index of vertices[nextVi] — it was pushed as start of wall nextVi
        // ring order: for wall k we push vertices[k] then edge points
        // index of vertices[k] = count of points before wall k
        let idx = 0;
        for (let k = 0; k < nextVi; k++) {
          idx += 1; // vertex
          for (const mm of onWall[k]) {
            if (mm.t > 1e-6 && mm.t < 1 - 1e-6) idx += 1;
          }
        }
        if (m.which === 'A') iA = idx;
        else iB = idx;
      }
    }
  }

  if (iA < 0 || iB < 0 || iA === iB) return null;
  const m = ring.length;
  const walk = (from: number, to: number): Point[] => {
    const pts: Point[] = [];
    let i = from;
    for (let guard = 0; guard < m + 2; guard++) {
      pts.push({ ...ring[i] });
      if (i === to) break;
      i = (i + 1) % m;
    }
    return pts;
  };

  const loopA = walk(iA, iB);
  const loopB = walk(iB, iA);
  if (loopA.length < 3 || loopB.length < 3) return null;
  if (polygonSelfIntersects(loopA, true) || polygonSelfIntersects(loopB, true)) return null;
  return { loopA, loopB };
}

/** Map a boundary point to nearest wall index + t. */
export function pointToWallParam(
  vertices: Point[],
  p: Point,
): { wallIndex: number; t: number } | null {
  const segs = wallSegments(vertices, true);
  let best: { wallIndex: number; t: number; d: number } | null = null;
  for (let i = 0; i < segs.length; i++) {
    const d = distPointToSegment(p, segs[i].a, segs[i].b);
    const t = projectTOnSegment(p, segs[i].a, segs[i].b);
    if (!best || d < best.d) best = { wallIndex: i, t, d };
  }
  if (!best || best.d > 2) return null;
  return { wallIndex: best.wallIndex, t: best.t };
}

/**
 * Chord from intersecting a horizontal (axis='y') or vertical (axis='x') line
 * through the polygon. Uses the two extreme intersection points.
 */
export function axisCutChord(
  vertices: Point[],
  axis: 'x' | 'y',
  value: number,
): PartitionCandidate | null {
  const segs = wallSegments(vertices, true);
  const hits: { p: Point; wall: number; t: number }[] = [];
  for (let i = 0; i < segs.length; i++) {
    const { a, b } = segs[i];
    if (axis === 'x') {
      const dx = b.x - a.x;
      if (Math.abs(dx) < 1e-9) continue;
      const t = (value - a.x) / dx;
      if (t < -1e-6 || t > 1 + 1e-6) continue;
      const tc = Math.max(0, Math.min(1, t));
      const p = pointOnSegment(a, b, tc);
      if (Math.abs(p.x - value) > 0.5) continue;
      hits.push({ p, wall: i, t: tc });
    } else {
      const dy = b.y - a.y;
      if (Math.abs(dy) < 1e-9) continue;
      const t = (value - a.y) / dy;
      if (t < -1e-6 || t > 1 + 1e-6) continue;
      const tc = Math.max(0, Math.min(1, t));
      const p = pointOnSegment(a, b, tc);
      if (Math.abs(p.y - value) > 0.5) continue;
      hits.push({ p, wall: i, t: tc });
    }
  }
  if (hits.length < 2) return null;
  // Dedup near points
  const uniq: typeof hits = [];
  for (const h of hits) {
    if (uniq.some((u) => dist(u.p, h.p) < 1.5)) continue;
    uniq.push(h);
  }
  if (uniq.length < 2) return null;
  // Outer pair along the other axis
  uniq.sort((u, v) => (axis === 'x' ? u.p.y - v.p.y : u.p.x - v.p.x));
  const h0 = uniq[0];
  const h1 = uniq[uniq.length - 1];
  if (h0.wall === h1.wall) return null;
  if (!chordInsidePolygon(h0.p, h1.p, vertices)) return null;
  return {
    id: `axis-${axis}-${value.toFixed(1)}`,
    wallA: h0.wall,
    tA: h0.t,
    wallB: h1.wall,
    tB: h1.t,
    a: h0.p,
    b: h1.p,
  };
}

export type EqualDivisionPlan = {
  parts: 2 | 3 | 4;
  axis: 'x' | 'y';
  cuts: PartitionCandidate[];
};

/**
 * Equal strip division into 2/3/4 parts along the longer bbox axis (or forced axis).
 */
export function planEqualDivision(
  vertices: Point[],
  parts: 2 | 3 | 4,
  axisPrefer?: 'x' | 'y' | 'auto',
): EqualDivisionPlan | null {
  if (vertices.length < 3 || parts < 2) return null;
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of vertices) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const w = maxX - minX;
  const h = maxY - minY;
  if (w < 20 && h < 20) return null;

  const tryAxis = (axis: 'x' | 'y'): PartitionCandidate[] | null => {
    const min = axis === 'x' ? minX : minY;
    const max = axis === 'x' ? maxX : maxY;
    const span = max - min;
    if (span < 30) return null;
    const cuts: PartitionCandidate[] = [];
    for (let i = 1; i < parts; i++) {
      const value = min + (span * i) / parts;
      const c = axisCutChord(vertices, axis, value);
      if (!c) return null;
      cuts.push(c);
    }
    return cuts;
  };

  const prefer =
    axisPrefer === 'x' || axisPrefer === 'y'
      ? axisPrefer
      : w >= h
        ? 'x'
        : 'y';
  const alt = prefer === 'x' ? 'y' : 'x';

  let cuts = tryAxis(prefer);
  let axis: 'x' | 'y' = prefer;
  if (!cuts) {
    cuts = tryAxis(alt);
    axis = alt;
  }
  if (!cuts || cuts.length !== parts - 1) return null;
  return { parts, axis, cuts };
}

/**
 * Sequentially apply cuts: first cut splits original, next cuts apply to the
 * piece still containing the remaining cut lines (the “remainder” side).
 * Returns N polygons or null.
 */
export function splitIntoEqualParts(
  vertices: Point[],
  parts: 2 | 3 | 4,
  axisPrefer?: 'x' | 'y' | 'auto',
): Point[][] | null {
  const plan = planEqualDivision(vertices, parts, axisPrefer);
  if (!plan) return null;

  // Sort cuts by axis position
  const sorted = [...plan.cuts].sort((a, b) => {
    const va = plan.axis === 'x' ? (a.a.x + a.b.x) / 2 : (a.a.y + a.b.y) / 2;
    const vb = plan.axis === 'x' ? (b.a.x + b.b.x) / 2 : (b.a.y + b.b.y) / 2;
    return va - vb;
  });

  const results: Point[][] = [];
  let remainder = vertices.map((p) => ({ ...p }));

  for (let i = 0; i < sorted.length; i++) {
    // Re-project cut onto current remainder
    const mid =
      plan.axis === 'x'
        ? (sorted[i].a.x + sorted[i].b.x) / 2
        : (sorted[i].a.y + sorted[i].b.y) / 2;
    const cut = axisCutChord(remainder, plan.axis, mid);
    if (!cut) return null;
    const split = splitPolygonByPartition(
      remainder,
      cut.wallA,
      cut.tA,
      cut.wallB,
      cut.tB,
    );
    if (!split) return null;

    // Which piece is the "low" side (strip) vs remainder?
    const cA = centroidOf(split.loopA);
    const cB = centroidOf(split.loopB);
    const valA = plan.axis === 'x' ? cA.x : cA.y;
    const valB = plan.axis === 'x' ? cB.x : cB.y;
    if (valA <= valB) {
      results.push(split.loopA);
      remainder = split.loopB;
    } else {
      results.push(split.loopB);
      remainder = split.loopA;
    }
  }
  results.push(remainder);
  if (results.length !== parts) return null;
  return results;
}

function centroidOf(verts: Point[]): Point {
  let x = 0;
  let y = 0;
  for (const p of verts) {
    x += p.x;
    y += p.y;
  }
  const n = Math.max(1, verts.length);
  return { x: x / n, y: y / n };
}
