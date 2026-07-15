import type { Point } from './types';

/** Screen = world * scale + origin. Geometry stays in world px; zoom is visual only. */
export type ViewTransform = {
  scale: number;
  ox: number;
  oy: number;
};

export const DEFAULT_VIEW: ViewTransform = { scale: 1, ox: 0, oy: 0 };

export function screenToWorld(sx: number, sy: number, v: ViewTransform): Point {
  return {
    x: (sx - v.ox) / v.scale,
    y: (sy - v.oy) / v.scale,
  };
}

export function worldToScreen(wx: number, wy: number, v: ViewTransform): Point {
  return {
    x: wx * v.scale + v.ox,
    y: wy * v.scale + v.oy,
  };
}

/** Zoom around a screen point (css px), clamp scale. */
export function zoomAt(
  v: ViewTransform,
  screenX: number,
  screenY: number,
  factor: number,
  min = 0.25,
  max = 6,
): ViewTransform {
  const next = Math.min(max, Math.max(min, v.scale * factor));
  if (next === v.scale) return v;
  const w = screenToWorld(screenX, screenY, v);
  return {
    scale: next,
    ox: screenX - w.x * next,
    oy: screenY - w.y * next,
  };
}

export function panBy(v: ViewTransform, dx: number, dy: number): ViewTransform {
  return { ...v, ox: v.ox + dx, oy: v.oy + dy };
}

/** Fit all points in view with padding (css px). */
export function fitViewToPoints(
  points: Point[],
  cssW: number,
  cssH: number,
  padding = 48,
  minScale = 0.2,
  maxScale = 8,
): ViewTransform {
  if (!points.length || cssW < 10 || cssH < 10) return { ...DEFAULT_VIEW };
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  const bw = Math.max(40, maxX - minX);
  const bh = Math.max(40, maxY - minY);
  const sx = (cssW - padding * 2) / bw;
  const sy = (cssH - padding * 2) / bh;
  const scale = Math.min(maxScale, Math.max(minScale, Math.min(sx, sy)));
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return {
    scale,
    ox: cssW / 2 - cx * scale,
    oy: cssH / 2 - cy * scale,
  };
}

/** Smoother zoom factor from wheel delta (trackpad-friendly). */
export function wheelZoomFactor(deltaY: number, deltaMode: number): number {
  // deltaMode: 0=pixel, 1=line, 2=page
  let dy = deltaY;
  if (deltaMode === 1) dy *= 16;
  if (deltaMode === 2) dy *= 400;
  // exponential: ~1.08 per 100px
  const t = Math.max(-400, Math.min(400, dy));
  return Math.exp(-t * 0.0015);
}
