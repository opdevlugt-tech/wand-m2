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
  ghostVertices?: Point[] | null;
  ghostLoopIndex?: number | null;
};

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
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.fillStyle = COLORS.bg;
  ctx.fillRect(0, 0, cssW, cssH);

  drawGrid(ctx, cssW, cssH, opts.pxPerMeter);

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
    const closing =
      activeVerts.length >= 3 && nearPoint(draftEnd, activeVerts[0], opts.hitRadius * 1.5);
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
      ctx.arc(activeVerts[0].x, activeVerts[0].y, opts.hitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.first;
      ctx.lineWidth = 2;
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
    drawVertex(ctx, p, color, isSel ? 7 : isFirst || isLast ? 6 : 4);
  }
}

function drawClosedLoop(
  ctx: CanvasRenderingContext2D,
  vertices: Point[],
  opts: RenderOptions,
  loopIndex: number,
  fillColor: string,
  doors: { id: string; wallIndex: number; t: number; widthM: number }[] = [],
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
      drawDoor(ctx, g, isSel, wind);
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
  wind: number,
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

  // swing arc (architectural) into interior side
  const side = wind >= 0 ? 1 : -1;
  const hinge = g.openA;
  const r = dist(g.openA, g.openB);
  const start = g.dir;
  const end = g.dir + side * (Math.PI / 2);
  ctx.beginPath();
  ctx.arc(hinge.x, hinge.y, r, Math.min(start, end), Math.max(start, end));
  ctx.strokeStyle = selected ? COLORS.doorSel : COLORS.doorSwing;
  ctx.lineWidth = selected ? 2 : 1.5;
  ctx.setLineDash([4, 3]);
  ctx.stroke();
  ctx.setLineDash([]);

  // leaf line closed position = along wall; open leaf at 90°
  const leafEnd = {
    x: hinge.x + Math.cos(end) * r,
    y: hinge.y + Math.sin(end) * r,
  };
  strokeSeg(ctx, hinge, leafEnd, color, selected ? 2.5 : 1.8);

  // width label near center
  drawTinyTag(
    ctx,
    g.center.x,
    g.center.y - 12,
    selected ? 'deur ✓' : 'deur',
  );
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
  const rIn = emphasize ? 28 : 22;
  const bi = interiorBisectorRad(prev, corner, next, wind);
  const bad = !isCanonicalAngle(interiorDeg);

  // Binnenhoek-boog: groen ok · rood niet-kloppend (45/90/135 ok)
  ctx.beginPath();
  ctx.moveTo(corner.x, corner.y);
  ctx.arc(corner.x, corner.y, rIn, bi.startRad, bi.endRad, bi.sweepRad < 0);
  ctx.closePath();
  ctx.fillStyle = bad
    ? COLORS.angleBadFill
    : emphasize
      ? COLORS.popupHi
      : COLORS.interiorFill;
  ctx.fill();
  ctx.strokeStyle = bad ? COLORS.angleBadStroke : COLORS.interior;
  ctx.lineWidth = bad ? 2 : 1.5;
  ctx.stroke();

  const midIn = {
    x: corner.x + Math.cos(bi.midRad) * (rIn + 10),
    y: corner.y + Math.sin(bi.midRad) * (rIn + 10),
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

function drawAngleChip(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  text: string,
  interior: boolean,
  bad: boolean,
): void {
  ctx.font = bad ? '700 11px system-ui, sans-serif' : '600 10px system-ui, sans-serif';
  const tw = ctx.measureText(text).width;
  const pad = 4;
  ctx.fillStyle = bad ? COLORS.angleBadBg : COLORS.labelBg;
  ctx.fillRect(x - tw / 2 - pad, y - 8, tw + pad * 2, 16);
  ctx.fillStyle = bad ? COLORS.angleBad : interior ? COLORS.interior : COLORS.exterior;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawTinyTag(ctx: CanvasRenderingContext2D, x: number, y: number, text: string): void {
  ctx.font = '600 10px system-ui, sans-serif';
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = COLORS.labelBg;
  ctx.fillRect(x - tw / 2 - 3, y - 7, tw + 6, 14);
  ctx.fillStyle = COLORS.draft;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawGrid(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pxPerMeter: number,
): void {
  const step = pxPerMeter;
  ctx.lineWidth = 1;
  for (let x = 0; x <= w; x += step / 2) {
    const major = Math.round(x / step) * step === x;
    ctx.strokeStyle = major ? COLORS.gridMajor : COLORS.grid;
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, h);
    ctx.stroke();
  }
  for (let y = 0; y <= h; y += step / 2) {
    const major = Math.round(y / step) * step === y;
    ctx.strokeStyle = major ? COLORS.gridMajor : COLORS.grid;
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(w, y + 0.5);
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
  ctx.lineWidth = width;
  ctx.lineCap = 'round';
  ctx.setLineDash(dashed ? [8, 6] : []);
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
  ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.strokeStyle = COLORS.bg;
  ctx.lineWidth = 1.5;
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
  ctx.font = live || selected ? '600 12px system-ui, sans-serif' : '500 12px system-ui, sans-serif';
  const tw = ctx.measureText(text).width;
  const pad = 4;
  const x = c.x + ox;
  const y = c.y + oy;
  ctx.fillStyle = selected ? COLORS.labelSelectedBg : COLORS.labelBg;
  ctx.fillRect(x - tw / 2 - pad, y - 9, tw + pad * 2, 18);
  ctx.fillStyle = live ? COLORS.draft : selected ? COLORS.labelSelected : COLORS.label;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function drawBadge(ctx: CanvasRenderingContext2D, x: number, y: number, text: string): void {
  ctx.font = '700 16px system-ui, sans-serif';
  const tw = ctx.measureText(text).width;
  const padX = 12;
  ctx.fillStyle = 'rgba(15, 20, 25, 0.85)';
  ctx.strokeStyle = COLORS.first;
  ctx.lineWidth = 1.5;
  const w = tw + padX * 2;
  const h = 28;
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
