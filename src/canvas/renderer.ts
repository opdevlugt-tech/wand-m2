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
  isCanonicalAngle,
  interiorBisectorRad,
  interiorExterior,
  interiorExteriorAt,
  polygonWindingSign,
  relativeTurnDeg,
  wallPiecesWithDoors,
  wallSegments,
  findPartnerWall,
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
    areaText: string;
    ok: boolean;
    warn: string | null;
  }[];
  /** Geplaatste installatie-symbolen */
  installations?: {
    x: number;
    y: number;
    code: string;
    color: string;
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

  // Outer overall length × width around everything
  drawOverallDimensions(ctx, model, opts.pxPerMeter);

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

  // Room area badges at centroids (m² midden in ruimte)
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
      drawRoomAreaBadge(ctx, cx, cy, b.label, b.areaText, b.ok, b.warn);
    }
  }

  // Installatie-componenten
  if (opts.installations?.length) {
    for (const inst of opts.installations) {
      drawInstallSymbol(ctx, inst.x, inst.y, inst.code, inst.color);
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
    // length label on full wall (mid of original) — exterior side
    drawLengthLabel(ctx, s.a, s.b, opts.pxPerMeter, false, selected, wind);

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
    drawVertex(ctx, vertices[i], color, isSel ? 5 : 2.5);
  }
  // area is shown via room badges — skip big centroid badge (clutter)
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
  ctx.font = `600 ${lw(9)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pad = lw(3);
  const h = lw(13);
  ctx.fillStyle = 'rgba(15,20,25,0.85)';
  ctx.fillRect(x - tw / 2 - pad, y - h / 2, tw + pad * 2, h);
  ctx.fillStyle = color ?? COLORS.draft;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

/** Clear m² + name in the middle of a room (compact). */
function drawRoomAreaBadge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  name: string,
  areaText: string,
  ok: boolean,
  warn: string | null,
): void {
  const nameFont = `500 ${lw(8)}px system-ui, sans-serif`;
  const areaFont = `600 ${lw(10)}px system-ui, sans-serif`;
  ctx.font = nameFont;
  const nameW = ctx.measureText(name).width;
  ctx.font = areaFont;
  const areaW = ctx.measureText(areaText).width;
  const warnFont = `500 ${lw(8)}px system-ui, sans-serif`;
  let warnW = 0;
  if (warn) {
    ctx.font = warnFont;
    warnW = ctx.measureText(warn).width;
  }
  const contentW = Math.max(nameW, areaW, warnW);
  const padX = lw(6);
  const padY = lw(4);
  const lineH = lw(11);
  const lines = warn ? 3 : 2;
  const boxW = contentW + padX * 2;
  const boxH = lineH * lines + padY * 2;
  const left = x - boxW / 2;
  const top = y - boxH / 2;

  ctx.fillStyle = ok ? 'rgba(15, 20, 25, 0.82)' : 'rgba(40, 16, 16, 0.88)';
  ctx.strokeStyle = ok ? 'rgba(61, 214, 140, 0.4)' : 'rgba(255, 107, 107, 0.55)';
  ctx.lineWidth = lw(1);
  const r = lw(4);
  ctx.beginPath();
  ctx.moveTo(left + r, top);
  ctx.arcTo(left + boxW, top, left + boxW, top + boxH, r);
  ctx.arcTo(left + boxW, top + boxH, left, top + boxH, r);
  ctx.arcTo(left, top + boxH, left, top, r);
  ctx.arcTo(left, top, left + boxW, top, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  let yy = top + padY + lineH / 2;
  ctx.font = nameFont;
  ctx.fillStyle = '#a8b4c4';
  ctx.fillText(name, x, yy);
  yy += lineH;
  ctx.font = areaFont;
  ctx.fillStyle = ok ? COLORS.first : '#ff8a8a';
  ctx.fillText(areaText, x, yy);
  if (warn) {
    yy += lineH;
    ctx.font = warnFont;
    ctx.fillStyle = '#ffb020';
    ctx.fillText(warn, x, yy);
  }
}

function drawInstallSymbol(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  code: string,
  color: string,
): void {
  const r = lw(9);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(15,20,25,0.9)';
  ctx.fill();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw(1.5);
  ctx.stroke();
  ctx.font = `700 ${lw(7)}px system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(code, x, y);
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
  /** polygon winding (+1 CCW / -1 CW); null = open chain → offset “above” wall */
  wind: number | null = null,
): void {
  const m = lengthM(a, b, pxPerMeter);
  if (m < 0.04 && !live) return;

  const wallPx = dist(a, b);
  // Too short on screen → skip (unless selected/live)
  if (!live && !selected && wallPx * drawScale < 22) return;

  const text = formatMeters(m);
  const fontPx = live || selected ? 10 : 9;
  ctx.font = `${selected || live ? 600 : 500} ${lw(fontPx)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  // Hide if label wider than wall (clutter) unless selected
  if (!live && !selected && tw > wallPx * 0.92) return;

  // Exterior offset: left of a→b for CCW (wind>0), right for CW
  const ang = angleOf(a, b);
  const side = wind === null ? 1 : wind >= 0 ? 1 : -1;
  const off = lw(live || selected ? 12 : 10) * side;
  const nx = Math.sin(ang) * off;
  const ny = -Math.cos(ang) * off;

  // Dim line parallel to wall
  const a2 = { x: a.x + nx, y: a.y + ny };
  const b2 = { x: b.x + nx, y: b.y + ny };
  const tick = lw(4) * side;
  const tx = Math.sin(ang) * tick;
  const ty = -Math.cos(ang) * tick;

  ctx.strokeStyle = selected
    ? 'rgba(255, 209, 102, 0.75)'
    : live
      ? 'rgba(108, 182, 255, 0.7)'
      : 'rgba(139, 156, 179, 0.55)';
  ctx.lineWidth = lw(1);
  ctx.setLineDash([]);
  // extension ticks from wall to dim line
  ctx.beginPath();
  ctx.moveTo(a.x + tx * 0.2, a.y + ty * 0.2);
  ctx.lineTo(a2.x + tx, a2.y + ty);
  ctx.moveTo(b.x + tx * 0.2, b.y + ty * 0.2);
  ctx.lineTo(b2.x + tx, b2.y + ty);
  // dim line
  ctx.moveTo(a2.x, a2.y);
  ctx.lineTo(b2.x, b2.y);
  ctx.stroke();

  // label slightly further out
  const c = mid(a2, b2);
  const labelOff = lw(7) * side;
  const x = c.x + Math.sin(ang) * labelOff;
  const y = c.y - Math.cos(ang) * labelOff;
  const pad = lw(2.5);
  const h = lw(fontPx + 4);
  ctx.fillStyle = selected
    ? COLORS.labelSelectedBg
    : 'rgba(15, 20, 25, 0.82)';
  ctx.fillRect(x - tw / 2 - pad, y - h / 2, tw + pad * 2, h);
  ctx.fillStyle = live
    ? COLORS.draft
    : selected
      ? COLORS.labelSelected
      : '#a8b4c4';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

/**
 * One outer total width + one outer total height (envelope of exterior).
 * No duplicate rings.
 */
function drawOverallDimensions(
  ctx: CanvasRenderingContext2D,
  model: DrawingModel,
  pxPerMeter: number,
): void {
  const exterior = listExteriorSegments(model);
  if (exterior.length < 1) return;

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const s of exterior) {
    minX = Math.min(minX, s.a.x, s.b.x);
    minY = Math.min(minY, s.a.y, s.b.y);
    maxX = Math.max(maxX, s.a.x, s.b.x);
    maxY = Math.max(maxY, s.a.y, s.b.y);
  }
  for (const v of model.vertices ?? []) {
    minX = Math.min(minX, v.x);
    minY = Math.min(minY, v.y);
    maxX = Math.max(maxX, v.x);
    maxY = Math.max(maxY, v.y);
  }
  if (!(maxX > minX + 2) || !(maxY > minY + 2)) return;

  const gap = lw(32);
  const col = 'rgba(108, 182, 255, 0.8)';
  const txtCol = '#9ad4ff';

  // Bottom: one total width
  drawOneHorizDim(ctx, minX, maxX, maxY + gap, pxPerMeter, col, txtCol, 'totaal');
  // Left: one total height/depth
  drawOneVertDim(ctx, minY, maxY, minX - gap, pxPerMeter, col, txtCol, 'totaal');
}

/** Exterior wall segments = not shared with another room. */
function listExteriorSegments(model: DrawingModel): { a: Point; b: Point }[] {
  const out: { a: Point; b: Point }[] = [];
  const loops = model.loops ?? [];
  for (let li = 0; li < loops.length; li++) {
    const segs = wallSegments(loops[li].vertices, true);
    for (let wi = 0; wi < segs.length; wi++) {
      if (findPartnerWall(loops, li, wi)) continue;
      out.push(segs[wi]);
    }
  }
  for (const s of wallSegments(model.vertices ?? [], false)) {
    out.push(s);
  }
  return out;
}

function drawOneHorizDim(
  ctx: CanvasRenderingContext2D,
  x0: number,
  x1: number,
  yDim: number,
  pxPerMeter: number,
  col: string,
  txtCol: string,
  tag?: string,
): void {
  const tick = lw(5);
  ctx.strokeStyle = col;
  ctx.lineWidth = lw(1.1);
  ctx.beginPath();
  ctx.moveTo(x0, yDim - tick);
  ctx.lineTo(x0, yDim + tick);
  ctx.moveTo(x1, yDim - tick);
  ctx.lineTo(x1, yDim + tick);
  ctx.moveTo(x0, yDim);
  ctx.lineTo(x1, yDim);
  ctx.stroke();
  const label = tag
    ? `${tag} ${formatMeters((x1 - x0) / pxPerMeter)}`
    : formatMeters((x1 - x0) / pxPerMeter);
  drawDimText(ctx, (x0 + x1) / 2, yDim + lw(11), label, txtCol);
}

function drawOneVertDim(
  ctx: CanvasRenderingContext2D,
  y0: number,
  y1: number,
  xDim: number,
  pxPerMeter: number,
  col: string,
  txtCol: string,
  tag?: string,
): void {
  const tick = lw(5);
  ctx.strokeStyle = col;
  ctx.lineWidth = lw(1.1);
  ctx.beginPath();
  ctx.moveTo(xDim - tick, y0);
  ctx.lineTo(xDim + tick, y0);
  ctx.moveTo(xDim - tick, y1);
  ctx.lineTo(xDim + tick, y1);
  ctx.moveTo(xDim, y0);
  ctx.lineTo(xDim, y1);
  ctx.stroke();
  const label = tag
    ? `${tag} ${formatMeters((y1 - y0) / pxPerMeter)}`
    : formatMeters((y1 - y0) / pxPerMeter);
  drawDimText(ctx, xDim - lw(14), (y0 + y1) / 2, label, txtCol);
}

function drawDimText(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  color: string,
): void {
  ctx.font = `600 ${lw(10)}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pad = lw(3);
  const hh = lw(14);
  ctx.fillStyle = 'rgba(15, 20, 25, 0.88)';
  ctx.fillRect(x - tw / 2 - pad, y - hh / 2, tw + pad * 2, hh);
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}
