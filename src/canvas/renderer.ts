import type { DrawingModel, Point } from '../geometry/types';
import {
  angleOf,
  dist,
  doorGeometry,
  estimateOpenWinding,
  formatDegrees,
  formatMeters,
  lengthM,
  mid,
  nearPoint,
  polygonAreaM2,
  formatArea,
  isCanonicalAngle,
  interiorBisectorRad,
  interiorExterior,
  interiorExteriorAt,
  polygonWindingSign,
  relativeTurnDeg,
  wallPiecesWithDoors,
  wallSegments,
} from '../geometry/math';
import { ROOM_CONFIG } from '../config/rooms';

export type RenderOptions = {
  pxPerMeter: number;
  hitRadius: number;
  rejectFlash: boolean;
  /** null loopIndex = active chain */
  selectedLoopIndex: number | null;
  selectedWallIndex: number | null;
  selectedVertexIndex: number | null;
  selectedDoorId: string | null;
  popupCornerIndex: number | null;
  /** Original vertices before absorb (or null) */
  ghostVertices: Point[] | null;
  ghostLoopIndex: number | null;
  partitionOptions?: { a: Point; b: Point; label: string }[];
  partitionHoverIndex?: number | null;
  /** Free partition draft path */
  partitionPath?: Point[] | null;
  view?: { scale: number; ox: number; oy: number };
  /** Room badges: per loop issues */
  roomBadges?: {
    loopIndex: number;
    label: string;
    ok: boolean;
    warn: string | null;
  }[];
};

/** Screen-constant line width under zoom */
let drawScale = 1;
function lw(w: number): number {
  return w / Math.max(0.25, drawScale);
}

const COLORS = {
  bg: '#0f1419',
  grid: '#1c2430',
  gridMajor: '#243040',
  wall: '#e8eef7',
  selected: '#ffd166',
  draft: '#6cb6ff',
  draftBad: '#ff6b6b',
  vertex: '#6cb6ff',
  first: '#3dd68c',
  vertexSel: '#ffd166',
  fill: 'rgba(61, 214, 140, 0.18)',
  label: '#c5d0de',
  labelBg: 'rgba(15, 20, 25, 0.75)',
  labelSelected: '#1a1408',
  labelSelectedBg: 'rgba(255, 209, 102, 0.95)',
  interior: '#3dd68c',
  interiorFill: 'rgba(61, 214, 140, 0.22)',
  exterior: '#8b9cb3',
  exteriorFill: 'rgba(139, 156, 179, 0.12)',
  /** Niet-kloppende hoek (niet 45/90/135-raster) */
  angleBad: '#ff4d4d',
  angleBadBg: 'rgba(90, 20, 20, 0.92)',
  angleBadFill: 'rgba(255, 77, 77, 0.22)',
  angleBadStroke: '#ff4d4d',
  popupHi: 'rgba(255, 209, 102, 0.28)',
  door: '#6cb6ff',
  doorSel: '#ffd166',
  doorSwing: 'rgba(108, 182, 255, 0.35)',
  partition: '#c792ea',
  partitionHover: '#ffd166',
};

export function resizeCanvas(
  canvas: HTMLCanvasElement,
  cssWidth: number,
  cssHeight: number,
): { dpr: number } {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.floor(cssWidth * dpr));
  canvas.height = Math.max(1, Math.floor(cssHeight * dpr));
  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  const ctx = canvas.getContext('2d');
  if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { dpr };
}

export function drawScene(
  ctx: CanvasRenderingContext2D,
  cssW: number,
  cssH: number,
  model: DrawingModel,
  opts: RenderOptions,
): void {
  const view = opts.view ?? { scale: 1, ox: 0, oy: 0 };
  drawScale = view.scale;

  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, cssW, cssH);

  ctx.save();
  ctx.translate(view.ox, view.oy);
  ctx.scale(view.scale, view.scale);

  const x0 = -view.ox / view.scale;
  const y0 = -view.oy / view.scale;
  const x1 = (cssW - view.ox) / view.scale;
  const y1 = (cssH - view.oy) / view.scale;
  drawGridWorld(ctx, x0, y0, x1, y1, opts.pxPerMeter);

  const loops = model.loops ?? [];
  const activeVerts = model.vertices ?? [];
  const draftEnd = model.draftEnd;
  const fills = [
    'rgba(61, 214, 140, 0.16)',
    'rgba(108, 182, 255, 0.14)',
    'rgba(255, 209, 102, 0.12)',
    'rgba(200, 150, 255, 0.12)',
  ];

  // Committed loops
  for (let li = 0; li < loops.length; li++) {
    const verts = loops[li].vertices;
    const doors = loops[li].doors ?? [];
    drawClosedLoop(ctx, verts, opts, li, fills[li % fills.length], doors);
  }

  // Ghost original during relocate preview
  if (opts.ghostVertices && opts.ghostVertices.length >= 2) {
    const gSegs = wallSegments(opts.ghostVertices, true);
    for (const s of gSegs) {
      strokeSeg(ctx, s.a, s.b, 'rgba(255, 176, 32, 0.45)', 2, true);
    }
  }

  // Active open chain
  const windActive = estimateOpenWinding(activeVerts);
  const segs = wallSegments(activeVerts, false);
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const selected =
      opts.selectedLoopIndex === null && opts.selectedWallIndex === i;
    strokeSeg(ctx, s.a, s.b, selected ? COLORS.selected : COLORS.wall, selected ? 4.5 : 3);
    drawLengthLabel(ctx, s.a, s.b, opts.pxPerMeter, false, selected);
  }

  if (activeVerts.length >= 3) {
    for (let i = 1; i < activeVerts.length - 1; i++) {
      const ie = interiorExteriorAt(activeVerts, i, false);
      if (!ie) continue;
      const hi =
        opts.selectedLoopIndex === null &&
        (opts.selectedVertexIndex === i || opts.popupCornerIndex === i);
      drawInteriorCorner(
        ctx,
        activeVerts[i - 1],
        activeVerts[i],
        activeVerts[i + 1],
        windActive,
        ie.interiorDeg,
        hi,
      );
    }
  }

  // draft
  if (draftEnd && activeVerts.length > 0) {
    const last = activeVerts[activeVerts.length - 1];
    const hitWorld = opts.hitRadius / Math.max(0.25, view.scale);
    const closing =
      activeVerts.length >= 3 && nearPoint(draftEnd, activeVerts[0], hitWorld * 1.5);
    const color = opts.rejectFlash ? COLORS.draftBad : closing ? COLORS.first : COLORS.draft;
    strokeSeg(ctx, last, draftEnd, color, 2, true);
    if (dist(last, draftEnd) > 4) {
      drawLengthLabel(ctx, last, draftEnd, opts.pxPerMeter, true);
    }
    if (activeVerts.length >= 2 && dist(last, draftEnd) > 8) {
      if (closing) {
        const prev = activeVerts[activeVerts.length - 2];
        const ieLast = interiorExterior(prev, last, activeVerts[0], windActive);
        drawInteriorCorner(ctx, prev, last, activeVerts[0], windActive, ieLast.interiorDeg, true);
        if (activeVerts.length >= 2) {
          const ieStart = interiorExterior(last, activeVerts[0], activeVerts[1], windActive);
          drawInteriorCorner(
            ctx,
            last,
            activeVerts[0],
            activeVerts[1],
            windActive,
            ieStart.interiorDeg,
            true,
          );
        }
      } else {
        const prev = activeVerts[activeVerts.length - 2];
        const ie = interiorExterior(prev, last, draftEnd, windActive);
        drawInteriorCorner(ctx, prev, last, draftEnd, windActive, ie.interiorDeg, true);
        const turn = relativeTurnDeg(prev, last, draftEnd);
        const m = mid(last, draftEnd);
        drawTinyTag(ctx, m.x, m.y - 18, `Δ ${formatDegrees(turn, 0)}`);
      }
    }
    if (closing) {
      ctx.beginPath();
      ctx.arc(activeVerts[0].x, activeVerts[0].y, hitWorld, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.first;
      ctx.lineWidth = lw(2);
      ctx.stroke();
    }
  }

  for (let i = 0; i < activeVerts.length; i++) {
    const p = activeVerts[i];
    const isFirst = i === 0;
    const isLast = i === activeVerts.length - 1;
    const isSel =
      opts.selectedLoopIndex === null &&
      (opts.selectedVertexIndex === i || opts.popupCornerIndex === i);
    const color = isSel ? COLORS.vertexSel : isFirst ? COLORS.first : COLORS.vertex;
    drawVertex(ctx, p, color, isSel ? 5 : isFirst || isLast ? 4 : 2.5);
  }

  // Partition option previews
  const parts = opts.partitionOptions ?? [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    const hi = opts.partitionHoverIndex === i;
    strokeSeg(ctx, p.a, p.b, hi ? '#ffd166' : 'rgba(200, 150, 255, 0.75)', hi ? 4 : 2.5, true);
    const m = mid(p.a, p.b);
    drawTinyTag(ctx, m.x, m.y, p.label);
    if (hi) {
      drawVertex(ctx, p.a, COLORS.doorSel, 5);
      drawVertex(ctx, p.b, COLORS.doorSel, 5);
    }
  }

  // Partition free path draft
  if (opts.partitionPath && opts.partitionPath.length) {
    const path = opts.partitionPath;
    for (let i = 0; i < path.length - 1; i++) {
      strokeSeg(ctx, path[i], path[i + 1], COLORS.partitionHover, 3);
    }
    for (const p of path) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, lw(5), 0, Math.PI * 2);
      ctx.fillStyle = COLORS.partitionHover;
      ctx.fill();
    }
    if (model.draftEnd && path.length) {
      strokeSeg(ctx, path[path.length - 1], model.draftEnd, COLORS.partition, 2, true);
    }
  }

  // Room badges at centroids
  if (opts.roomBadges) {
    for (const b of opts.roomBadges) {
      const L = model.loops[b.loopIndex];
      if (!L?.vertices.length) continue;
      let cx = 0;
      let cy = 0;
      for (const p of L.vertices) {
        cx += p.x;
        cy += p.y;
      }
      cx /= L.vertices.length;
      cy /= L.vertices.length;
      drawTinyTag(ctx, cx, cy, b.label, b.ok ? undefined : '#ff6b6b');
      if (b.warn) drawTinyTag(ctx, cx, cy + lw(16), b.warn, '#ffb020');
    }
  }

  ctx.restore();
}

function drawClosedLoop(
  ctx: CanvasRenderingContext2D,
  vertices: Point[],
  opts: RenderOptions,
  loopIndex: number,
  fillColor: string,
  doors: { id: string; wallIndex: number; t: number; widthM: number; hinge?: 'L' | 'R'; swing?: 1 | -1 }[] = [],
): void {
  if (vertices.length < 3) return;
  const wind = polygonWindingSign(vertices);

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();

  const segs = wallSegments(vertices, true);
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const selected =
      opts.selectedLoopIndex === loopIndex && opts.selectedWallIndex === i;
    // Detect shared partition wall for color
    // cheap: purple tint when selected is enough; partition drag already works
    const wallDoors = doors.filter((d) => d.wallIndex === i);
    const pieces = wallPiecesWithDoors(s.a, s.b, wallDoors, opts.pxPerMeter);
    for (const piece of pieces) {
      strokeSeg(
        ctx,
        piece.a,
        piece.b,
        selected ? COLORS.selected : COLORS.wall,
        selected ? 4.5 : 3,
      );
    }
    // length label on full wall (mid of original)
    drawLengthLabel(ctx, s.a, s.b, opts.pxPerMeter, false, selected);

    for (const d of wallDoors) {
      const g = doorGeometry(s.a, s.b, d.t, d.widthM, opts.pxPerMeter);
      if (!g) continue;
      const isSel = opts.selectedDoorId === d.id;
      const hinge = d.hinge ?? 'L';
      const swing = (d.swing ?? 1) as 1 | -1;
      drawDoor(ctx, g, isSel, hinge, swing);
    }
  }

  for (let i = 0; i < vertices.length; i++) {
    const ie = interiorExteriorAt(vertices, i, true);
    if (!ie) continue;
    const hi =
      opts.selectedLoopIndex === loopIndex &&
      (opts.selectedVertexIndex === i || opts.popupCornerIndex === i);
    const prev = vertices[(i - 1 + vertices.length) % vertices.length];
    const next = vertices[(i + 1) % vertices.length];
    drawInteriorCorner(ctx, prev, vertices[i], next, wind, ie.interiorDeg, hi);
  }

  for (let i = 0; i < vertices.length; i++) {
    const isSel =
      opts.selectedLoopIndex === loopIndex &&
      (opts.selectedVertexIndex === i || opts.popupCornerIndex === i);
    const color = isSel ? COLORS.vertexSel : i === 0 ? COLORS.first : COLORS.vertex;
    drawVertex(ctx, vertices[i], color, isSel ? 7 : 5);
  }

  const area = polygonAreaM2(vertices, opts.pxPerMeter);
  const c = centroid(vertices);
  drawBadge(ctx, c.x, c.y, formatArea(area));
}

function drawDoor(
  ctx: CanvasRenderingContext2D,
  g: {
    openA: Point;
    openB: Point;
    center: Point;
    dir: number;
    halfWidthPx: number;
  },
  selected: boolean,
  hinge: 'L' | 'R',
  swing: 1 | -1,
): void {
  const color = selected ? COLORS.doorSel : COLORS.door;
  // jamb ticks
  const nx = Math.cos(g.dir + Math.PI / 2);
  const ny = Math.sin(g.dir + Math.PI / 2);
  const jam = 6;
  for (const p of [g.openA, g.openB]) {
    strokeSeg(
      ctx,
      { x: p.x - nx * jam, y: p.y - ny * jam },
      { x: p.x + nx * jam, y: p.y + ny * jam },
      color,
      selected ? 3 : 2,
    );
  }
  // thin opening guide
  strokeSeg(ctx, g.openA, g.openB, color, 1.5, true);

  // L = hinge at openA (start of opening along wall dir), R = openB
  const hingePt = hinge === 'L' ? g.openA : g.openB;
  const leafClosed = hinge === 'L' ? g.openB : g.openA;
  const r = dist(g.openA, g.openB);

  // Direction of leaf when closed (from hinge along opening)
  const closedDir = angleOf(hingePt, leafClosed);
  // Swing: +1 = CCW 90° from closed dir, -1 = CW 90°
  const openDir = closedDir + swing * (Math.PI / 2);

  // Arc from closed to open
  const a0 = closedDir;
  const a1 = openDir;
  const ccw = swing > 0;
  ctx.beginPath();
  if (ccw) {
    ctx.arc(hingePt.x, hingePt.y, r, a0, a1, false);
  } else {
    ctx.arc(hingePt.x, hingePt.y, r, a0, a1, true);
  }
  ctx.strokeStyle = selected ? COLORS.doorSel : COLORS.doorSwing;
  ctx.lineWidth = selected ? lw(2) : lw(1.5);
  ctx.setLineDash([lw(4), lw(3)]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Open leaf
  const leafEnd = {
    x: hingePt.x + Math.cos(openDir) * r,
    y: hingePt.y + Math.sin(openDir) * r,
  };
  strokeSeg(ctx, hingePt, leafEnd, color, selected ? 2.5 : 1.8);

  // Hinge marker (small filled circle)
  ctx.beginPath();
  ctx.arc(hingePt.x, hingePt.y, lw(3.5), 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();

  const tag =
    selected
      ? `deur ${hinge === 'L' ? 'L' : 'R'}${swing > 0 ? '↺' : '↻'}`
      : 'deur';
  drawTinyTag(ctx, g.center.x, g.center.y - lw(12), tag);
}

function drawInteriorCorner(
  ctx: CanvasRenderingContext2D,
  prev: Point,
  corner: Point,
  next: Point,
  wind: number,
  interiorDeg: number,
  emphasize: boolean,
): void {
  const bad = !isCanonicalAngle(interiorDeg);
  // Subtieler: kleine boog; chip alleen bij selectie of fout
  const rIn = emphasize ? 16 : bad ? 12 : 8;
  const bi = interiorBisectorRad(prev, corner, next, wind);

  ctx.beginPath();
  ctx.moveTo(corner.x, corner.y);
  ctx.arc(corner.x, corner.y, rIn, bi.startRad, bi.endRad, bi.sweepRad < 0);
  ctx.closePath();
  ctx.fillStyle = bad
    ? COLORS.angleBadFill
    : emphasize
      ? COLORS.popupHi
      : 'rgba(61, 214, 140, 0.10)';
  ctx.fill();
  if (bad || emphasize) {
    ctx.strokeStyle = bad ? COLORS.angleBadStroke : COLORS.interior;
    ctx.lineWidth = bad ? lw(1.5) : lw(1);
    ctx.stroke();
  }

  if (bad || emphasize) {
    const midIn = {
      x: corner.x + Math.cos(bi.midRad) * (rIn + 8),
      y: corner.y + Math.sin(bi.midRad) * (rIn + 8),
    };
    drawAngleChip(
      ctx,
      midIn.x,
      midIn.y,
      formatDegrees(interiorDeg, bad || emphasize ? 1 : 0),
      true,
      bad,
    );
  }
}

function drawAngleChip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  interior: boolean,
  bad: boolean,
): void {
  ctx.font = bad
    ? `700 ${lw(11)}px system-ui, sans-serif`
    : `600 ${lw(10)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pad = lw(4);
  ctx.fillStyle = bad ? COLORS.angleBadBg : COLORS.labelBg;
  ctx.fillRect(x - tw / 2 - pad, y - lw(8), tw + pad * 2, lw(16));
  ctx.fillStyle = bad ? COLORS.angleBad : interior ? COLORS.interior : COLORS.exterior;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawTinyTag(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color?: string,
): void {
  ctx.font = `600 ${lw(10)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pad = lw(4);
  ctx.fillStyle = 'rgba(15,20,25,0.85)';
  ctx.fillRect(x - tw / 2 - pad, y - lw(8), tw + pad * 2, lw(16));
  ctx.fillStyle = color ?? COLORS.draft;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawGridWorld(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  pxPerMeter: number,
): void {
  // Tegelraster: minor = tile (0.3 m), major = 1 m
  const tileM = ROOM_CONFIG.tileSizeM ?? 0.3;
  const majorM = ROOM_CONFIG.majorGridM ?? 1;
  const step = pxPerMeter * tileM;
  const majorStep = pxPerMeter * majorM;
  if (step < 2) {
    // too dense when zoomed out — only major
    const startX = Math.floor(x0 / majorStep) * majorStep;
    const startY = Math.floor(y0 / majorStep) * majorStep;
    ctx.lineWidth = lw(1);
    ctx.strokeStyle = COLORS.gridMajor;
    for (let x = startX; x <= x1; x += majorStep) {
      ctx.beginPath();
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y1);
      ctx.stroke();
    }
    for (let y = startY; y <= y1; y += majorStep) {
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
    }
    return;
  }

  const startX = Math.floor(x0 / step) * step;
  const startY = Math.floor(y0 / step) * step;
  ctx.lineWidth = lw(1);
  for (let x = startX; x <= x1; x += step) {
    const major = Math.abs(Math.round(x / majorStep) * majorStep - x) < step * 0.25;
    ctx.strokeStyle = major ? COLORS.gridMajor : COLORS.grid;
    ctx.lineWidth = major ? lw(1.25) : lw(0.75);
    ctx.beginPath();
    ctx.moveTo(x, y0);
    ctx.lineTo(x, y1);
    ctx.stroke();
  }
  for (let y = startY; y <= y1; y += step) {
    const major = Math.abs(Math.round(y / majorStep) * majorStep - y) < step * 0.25;
    ctx.strokeStyle = major ? COLORS.gridMajor : COLORS.grid;
    ctx.lineWidth = major ? lw(1.25) : lw(0.75);
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
  }
}

function strokeSeg(
  ctx: CanvasRenderingContext2D,
  a: Point,
  b: Point,
  color: string,
  width: number,
  dashed = false,
): void {
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw(width);
  ctx.lineCap = 'round';
  ctx.setLineDash(dashed ? [lw(8), lw(6)] : []);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawVertex(
  ctx: CanvasRenderingContext2D,
  p: Point,
  color: string,
  r: number,
): void {
  ctx.beginPath();
  ctx.arc(p.x, p.y, lw(r), 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = COLORS.bg;
  ctx.lineWidth = lw(1.5);
  ctx.stroke();
}

function drawLengthLabel(
  ctx: CanvasRenderingContext2D,
  a: Point,
  b: Point,
  pxPerMeter: number,
  live = false,
  selected = false,
): void {
  const m = lengthM(a, b, pxPerMeter);
  if (m < 0.05 && !live) return;
  const c = mid(a, b);
  const ang = angleOf(a, b);
  const ox = Math.sin(ang) * 14;
  const oy = -Math.cos(ang) * 14;
  const text = formatMeters(m);
  ctx.font =
    live || selected
      ? `600 ${lw(12)}px system-ui, sans-serif`
      : `500 ${lw(12)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pad = lw(4);
  const x = c.x + ox;
  const y = c.y + oy;
  ctx.fillStyle = selected ? COLORS.labelSelectedBg : COLORS.labelBg;
  ctx.fillRect(x - tw / 2 - pad, y - lw(9), tw + pad * 2, lw(18));
  ctx.fillStyle = live ? COLORS.draft : selected ? COLORS.labelSelected : COLORS.label;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string): void {
  ctx.font = `700 ${lw(16)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const padX = lw(12);
  ctx.fillStyle = 'rgba(15, 20, 25, 0.85)';
  ctx.strokeStyle = COLORS.first;
  ctx.lineWidth = lw(1.5);
  const w = tw + padX * 2;
  const h = lw(28);
  roundRect(ctx, x - w / 2, y - h / 2, w, h, 8);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = COLORS.first;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function centroid(verts: Point[]): Point {
  let x = 0;
  let y = 0;
  for (const v of verts) {
    x += v.x;
    y += v.y;
  }
  return { x: x / verts.length, y: y / verts.length };
}
