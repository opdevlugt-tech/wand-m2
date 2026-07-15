/**
 * Lichte 3D-weergave: extrudeer plattegrond-lussen tot wanden.
 * Geen Three.js — pure canvas + perspectiefcamera (yaw/pitch/zoom).
 *
 * Coördinaten: plan (x,y) → 3D (x, 0, y) met y-up; muurhoogte default 2.5 m.
 */
import type { DrawingModel, Point } from './geometry/types';

export type View3dOptions = {
  pxPerMeter: number;
  wallHeightM?: number;
  /** yaw rad (horizontaal), pitch rad (verticaal, beperkt) */
  yaw: number;
  pitch: number;
  distance: number;
};

type Vec3 = { x: number; y: number; z: number };
type Face = { pts: Vec3[]; fill: string; stroke: string; zAvg: number };

const DEFAULT_H = 2.5;

function toMeters(p: Point, ppm: number): { x: number; z: number } {
  return { x: p.x / ppm, z: p.y / ppm };
}

function rotateY(v: Vec3, yaw: number): Vec3 {
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
}

function rotateX(v: Vec3, pitch: number): Vec3 {
  const c = Math.cos(pitch);
  const s = Math.sin(pitch);
  return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
}

function project(
  v: Vec3,
  cx: number,
  cy: number,
  scale: number,
): { x: number; y: number } {
  const f = 4;
  const d = f / Math.max(0.4, f + v.z);
  return {
    x: cx + v.x * scale * d,
    y: cy - v.y * scale * d,
  };
}

function modelCenter(model: DrawingModel, ppm: number): { x: number; z: number } {
  const all: Point[] = [];
  for (const L of model.loops) all.push(...L.vertices);
  if (!all.length) return { x: 0, z: 0 };
  let sx = 0;
  let sz = 0;
  for (const p of all) {
    const m = toMeters(p, ppm);
    sx += m.x;
    sz += m.z;
  }
  return { x: sx / all.length, z: sz / all.length };
}

function boundsRadius(model: DrawingModel, ppm: number, center: { x: number; z: number }): number {
  let r = 1;
  for (const L of model.loops) {
    for (const p of L.vertices) {
      const m = toMeters(p, ppm);
      const d = Math.hypot(m.x - center.x, m.z - center.z);
      if (d > r) r = d;
    }
  }
  return r;
}

function camTransform(v: Vec3, opts: View3dOptions): Vec3 {
  let t = rotateY(v, opts.yaw);
  t = rotateX(t, opts.pitch);
  return { x: t.x, y: t.y, z: t.z + opts.distance };
}

function avgZ(pts: Vec3[], opts: View3dOptions): number {
  let s = 0;
  for (const p of pts) s += camTransform(p, opts).z;
  return s / pts.length;
}

/**
 * Teken 3D-scene op canvas.
 * Return false als er geen gesloten lussen zijn.
 */
export function drawView3d(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  model: DrawingModel,
  opts: View3dOptions,
): boolean {
  const ppm = opts.pxPerMeter > 0 ? opts.pxPerMeter : 50;
  const wallH = opts.wallHeightM ?? DEFAULT_H;
  const loops = model.loops.filter((L) => L.vertices.length >= 3);

  ctx.fillStyle = '#0b0e12';
  ctx.fillRect(0, 0, w, h);

  if (!loops.length) {
    ctx.fillStyle = '#8b9bb0';
    ctx.font = '600 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Teken eerst een gesloten plattegrond', w / 2, h / 2);
    return false;
  }

  const center = modelCenter(model, ppm);
  const rad = boundsRadius(model, ppm, center);
  const scale = Math.min(w, h) / (rad * 3.2 + 2);
  const faces: Face[] = [];

  for (const L of loops) {
    const n = L.vertices.length;
    const floor: Vec3[] = [];
    for (const p of L.vertices) {
      const m = toMeters(p, ppm);
      floor.push({ x: m.x - center.x, y: 0, z: m.z - center.z });
    }
    faces.push({
      pts: floor,
      fill: 'rgba(40, 70, 55, 0.85)',
      stroke: '#3a5a48',
      zAvg: avgZ(floor, opts),
    });
    const ceil = floor.map((v) => ({ ...v, y: wallH }));
    faces.push({
      pts: ceil,
      fill: 'rgba(30, 40, 55, 0.35)',
      stroke: 'rgba(80, 100, 120, 0.4)',
      zAvg: avgZ(ceil, opts),
    });
    for (let i = 0; i < n; i++) {
      const a = floor[i];
      const b = floor[(i + 1) % n];
      const wall: Vec3[] = [
        a,
        b,
        { x: b.x, y: wallH, z: b.z },
        { x: a.x, y: wallH, z: a.z },
      ];
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const len = Math.hypot(dx, dz) || 1;
      const shade = 0.45 + 0.35 * Math.abs(dz / len);
      const g = Math.round(70 + shade * 90);
      faces.push({
        pts: wall,
        fill: `rgb(${g - 15},${g},${g + 20})`,
        stroke: '#1a2530',
        zAvg: avgZ(wall, opts),
      });
    }
  }

  faces.sort((a, b) => b.zAvg - a.zAvg);

  const cx = w / 2;
  const cy = h * 0.55;

  for (const f of faces) {
    const proj = f.pts.map((v) => project(camTransform(v, opts), cx, cy, scale));
    ctx.beginPath();
    ctx.moveTo(proj[0].x, proj[0].y);
    for (let i = 1; i < proj.length; i++) ctx.lineTo(proj[i].x, proj[i].y);
    ctx.closePath();
    ctx.fillStyle = f.fill;
    ctx.fill();
    ctx.strokeStyle = f.stroke;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.fillStyle = '#6a7a8c';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(
    `Muurhoogte ${wallH.toFixed(1)} m · sleep draaien · scroll zoom · Esc sluiten`,
    12,
    h - 14,
  );

  return true;
}

export function defaultView3dCamera(
  model: DrawingModel,
  ppm: number,
): Pick<View3dOptions, 'yaw' | 'pitch' | 'distance'> {
  const c = modelCenter(model, ppm);
  const r = boundsRadius(model, ppm, c);
  return {
    yaw: -0.7,
    pitch: 0.55,
    distance: Math.max(4, r * 2.4),
  };
}
