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
