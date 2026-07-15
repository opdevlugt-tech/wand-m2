import type { DrawingModel, Point } from '../geometry/types';
import {
  angleOf,
  dist,
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
  wallSegments,
} from '../geometry/math';

export type RenderOptions = {
  pxPerMeter: number;
  hitRadius: number;
  rejectFlash: boolean;
  selectedWallIndex: number | null;
  selectedVertexIndex: number | null;
  /** Highlight corner from popup */
  popupCornerIndex: number | null;
  /** Original shape while previewing meetfout-verplaatsing (dashed ghost) */
  ghostVertices?: Point[] | null;
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

  const { vertices, draftEnd, status } = model;
  const closed = status === 'closed';
  const wind = closed ? polygonWindingSign(vertices) : estimateOpenWinding(vertices);

  if (closed && vertices.length >= 3) {
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < vertices.length; i++) {
      ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = COLORS.fill;
    ctx.fill();
  }

  const segs = wallSegments(vertices, closed);
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    const selected = opts.selectedWallIndex === i;
    strokeSeg(ctx, s.a, s.b, selected ? COLORS.selected : COLORS.wall, selected ? 4.5 : 3);
    drawLengthLabel(ctx, s.a, s.b, opts.pxPerMeter, false, selected);
  }

  // Ghost: oorspronkelijke vorm tijdens live verplaats-preview
  if (opts.ghostVertices && opts.ghostVertices.length >= 2) {
    const gClosed = opts.ghostVertices.length >= 3;
    const gSegs = wallSegments(opts.ghostVertices, gClosed);
    for (const s of gSegs) {
      strokeSeg(ctx, s.a, s.b, 'rgba(255, 176, 32, 0.45)', 2, true);
    }
    for (const p of opts.ghostVertices) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 176, 32, 0.5)';
      ctx.fill();
    }
  }

  // Corner wedges — alleen binnenhoeken (binnen de lus)
  if (vertices.length >= 3) {
    const indices: number[] = [];
    if (closed) {
      for (let i = 0; i < vertices.length; i++) indices.push(i);
    } else {
      for (let i = 1; i < vertices.length - 1; i++) indices.push(i);
    }
    for (const i of indices) {
      const ie = interiorExteriorAt(vertices, i, closed);
      if (!ie) continue;
      const nb = {
        prev: vertices[closed ? (i - 1 + vertices.length) % vertices.length : i - 1],
        corner: vertices[i],
        next: vertices[closed ? (i + 1) % vertices.length : i + 1],
      };
      const hi =
        opts.selectedVertexIndex === i || opts.popupCornerIndex === i;
      drawInteriorCorner(ctx, nb.prev, nb.corner, nb.next, wind, ie.interiorDeg, hi);
    }
  }

  // draft
  if (draftEnd && vertices.length > 0) {
    const last = vertices[vertices.length - 1];
    const closing =
      vertices.length >= 3 && nearPoint(draftEnd, vertices[0], opts.hitRadius * 1.5);
    const color = opts.rejectFlash ? COLORS.draftBad : closing ? COLORS.first : COLORS.draft;
    strokeSeg(ctx, last, draftEnd, color, 2, true);
    if (dist(last, draftEnd) > 4) {
      drawLengthLabel(ctx, last, draftEnd, opts.pxPerMeter, true);
    }
    if (vertices.length >= 2 && dist(last, draftEnd) > 8) {
      if (closing) {
        const prev = vertices[vertices.length - 2];
        const ieLast = interiorExterior(prev, last, vertices[0], wind);
        drawInteriorCorner(ctx, prev, last, vertices[0], wind, ieLast.interiorDeg, true);
        if (vertices.length >= 2) {
          const ieStart = interiorExterior(last, vertices[0], vertices[1], wind);
          drawInteriorCorner(ctx, last, vertices[0], vertices[1], wind, ieStart.interiorDeg, true);
        }
      } else {
        const prev = vertices[vertices.length - 2];
        const ie = interiorExterior(prev, last, draftEnd, wind);
        drawInteriorCorner(ctx, prev, last, draftEnd, wind, ie.interiorDeg, true);
        const turn = relativeTurnDeg(prev, last, draftEnd);
        const m = mid(last, draftEnd);
        drawTinyTag(ctx, m.x, m.y - 18, `Δ ${formatDegrees(turn, 0)}`);
      }
    }
    if (closing) {
      ctx.beginPath();
      ctx.arc(vertices[0].x, vertices[0].y, opts.hitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = COLORS.first;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  for (let i = 0; i < vertices.length; i++) {
    const p = vertices[i];
    const isFirst = i === 0;
    const isLast = i === vertices.length - 1;
    const isSel = opts.selectedVertexIndex === i || opts.popupCornerIndex === i;
    const color = isSel ? COLORS.vertexSel : isFirst ? COLORS.first : COLORS.vertex;
    drawVertex(ctx, p, color, isSel ? 7 : isFirst || isLast ? 6 : 4);
  }

  if (closed && vertices.length >= 3) {
    const area = polygonAreaM2(vertices, opts.pxPerMeter);
    const c = centroid(vertices);
    drawBadge(ctx, c.x, c.y, formatArea(area));
  }
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
