/**
 * 3D walkthrough: plattegrond → wanden, free camera (ooghoogte).
 * World: meters, y-up. Plan (px) → (x,m z) met z = plan-y.
 */
import type { DrawingModel, Point } from './geometry/types';

export type View3dCamera = {
  /** Camera eye in meters (absolute, plan origin) */
  eyeX: number;
  eyeY: number; // height above floor
  eyeZ: number;
  /** Look yaw (rad): 0 = +Z, positive → turn right (clockwise from above) */
  yaw: number;
  /** Look pitch (rad): positive = look up */
  pitch: number;
  /** Vertical FOV in degrees */
  fovDeg: number;
};

export type View3dOptions = {
  pxPerMeter: number;
  wallHeightM?: number;
  camera: View3dCamera;
  /** Hide ceiling for indoor look (default true) */
  hideCeiling?: boolean;
  /** Wall opacity 0–1 (default 0.92) */
  wallAlpha?: number;
};

type Vec3 = { x: number; y: number; z: number };
type Face = {
  pts: Vec3[];
  fill: string;
  stroke: string;
  zAvg: number;
  alpha: number;
};

const DEFAULT_H = 2.5;
const EYE_H = 1.65;

function toMeters(p: Point, ppm: number): { x: number; z: number } {
  return { x: p.x / ppm, z: p.y / ppm };
}

export function modelCenterM(model: DrawingModel, ppm: number): { x: number; z: number } {
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

export function modelBoundsM(
  model: DrawingModel,
  ppm: number,
): { minX: number; maxX: number; minZ: number; maxZ: number; r: number } {
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const L of model.loops) {
    for (const p of L.vertices) {
      const m = toMeters(p, ppm);
      if (m.x < minX) minX = m.x;
      if (m.x > maxX) maxX = m.x;
      if (m.z < minZ) minZ = m.z;
      if (m.z > maxZ) maxZ = m.z;
    }
  }
  if (!Number.isFinite(minX)) {
    return { minX: 0, maxX: 1, minZ: 0, maxZ: 1, r: 1 };
  }
  const r = Math.max(maxX - minX, maxZ - minZ, 1) * 0.5;
  return { minX, maxX, minZ, maxZ, r: Math.hypot(r, r) || 1 };
}

/** Start inside first room at eye height, looking along longest axis. */
export function defaultWalkCamera(model: DrawingModel, ppm: number): View3dCamera {
  const loops = model.loops.filter((L) => L.vertices.length >= 3);
  if (!loops.length) {
    return { eyeX: 0, eyeY: EYE_H, eyeZ: 0, yaw: 0, pitch: 0, fovDeg: 75 };
  }
  // first loop centroid
  const L = loops[0];
  let sx = 0;
  let sz = 0;
  for (const p of L.vertices) {
    const m = toMeters(p, ppm);
    sx += m.x;
    sz += m.z;
  }
  const n = L.vertices.length;
  const cx = sx / n;
  const cz = sz / n;
  // face along first wall direction
  const a = toMeters(L.vertices[0], ppm);
  const b = toMeters(L.vertices[1 % n], ppm);
  const yaw = Math.atan2(b.x - a.x, b.z - a.z);
  return {
    eyeX: cx,
    eyeY: EYE_H,
    eyeZ: cz,
    yaw,
    pitch: 0,
    fovDeg: 75,
  };
}

/** Orbit-style start: outside, looking at center (still free eye camera). */
export function defaultOrbitCamera(model: DrawingModel, ppm: number): View3dCamera {
  const c = modelCenterM(model, ppm);
  const b = modelBoundsM(model, ppm);
  const dist = Math.max(3, b.r * 1.8);
  const yaw = -0.6;
  // place camera outside center
  const eyeX = c.x - Math.sin(yaw) * dist;
  const eyeZ = c.z - Math.cos(yaw) * dist;
  return {
    eyeX,
    eyeY: Math.max(2.2, b.r * 0.35),
    eyeZ,
    yaw,
    pitch: -0.35,
    fovDeg: 60,
  };
}

function worldToCam(p: Vec3, cam: View3dCamera): Vec3 {
  // translate
  let x = p.x - cam.eyeX;
  let y = p.y - cam.eyeY;
  let z = p.z - cam.eyeZ;
  // rotate Y by -yaw
  const cy = Math.cos(-cam.yaw);
  const sy = Math.sin(-cam.yaw);
  const x1 = x * cy + z * sy;
  const z1 = -x * sy + z * cy;
  // rotate X by -pitch
  const cp = Math.cos(-cam.pitch);
  const sp = Math.sin(-cam.pitch);
  const y1 = y * cp - z1 * sp;
  const z2 = y * sp + z1 * cp;
  return { x: x1, y: y1, z: z2 };
}

function project(
  cam: Vec3,
  w: number,
  h: number,
  fovDeg: number,
): { x: number; y: number; z: number } | null {
  // camera looks toward +Z in cam space after our transform? 
  // After -yaw/-pitch, forward is +Z in standard view matrix if we use z forward.
  // Our z2: looking forward along original look dir → positive z in front.
  if (cam.z <= 0.05) return null; // behind / too near
  const fov = (fovDeg * Math.PI) / 180;
  const f = 1 / Math.tan(fov / 2);
  const aspect = w / Math.max(1, h);
  const nx = (cam.x * f) / (aspect * cam.z);
  const ny = (cam.y * f) / cam.z;
  return {
    x: w * 0.5 + nx * (h * 0.5),
    y: h * 0.5 - ny * (h * 0.5),
    z: cam.z,
  };
}

function faceAvgZ(pts: Vec3[], cam: View3dCamera): number {
  let s = 0;
  let n = 0;
  for (const p of pts) {
    const c = worldToCam(p, cam);
    if (c.z > 0.05) {
      s += c.z;
      n++;
    }
  }
  return n ? s / n : 9999;
}

/**
 * Move camera on XZ plane relative to look direction.
 * forward/right in meters; also dy for height.
 */
export function moveCamera(
  cam: View3dCamera,
  forward: number,
  right: number,
  up: number,
): View3dCamera {
  // yaw 0 = +Z; forward along (sin yaw, cos yaw)
  const fx = Math.sin(cam.yaw);
  const fz = Math.cos(cam.yaw);
  const rx = Math.cos(cam.yaw);
  const rz = -Math.sin(cam.yaw);
  return {
    ...cam,
    eyeX: cam.eyeX + fx * forward + rx * right,
    eyeZ: cam.eyeZ + fz * forward + rz * right,
    eyeY: Math.max(0.15, Math.min(12, cam.eyeY + up)),
  };
}

export function lookCamera(cam: View3dCamera, dYaw: number, dPitch: number): View3dCamera {
  const pitch = Math.max(-1.35, Math.min(1.35, cam.pitch + dPitch));
  return { ...cam, yaw: cam.yaw + dYaw, pitch };
}

export function drawView3d(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  model: DrawingModel,
  opts: View3dOptions,
): boolean {
  const ppm = opts.pxPerMeter > 0 ? opts.pxPerMeter : 50;
  const wallH = opts.wallHeightM ?? DEFAULT_H;
  const cam = opts.camera;
  const hideCeil = opts.hideCeiling !== false;
  const wallAlpha = opts.wallAlpha ?? 0.88;
  const loops = model.loops.filter((L) => L.vertices.length >= 3);

  // sky / floor gradient bg
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#0a121c');
  g.addColorStop(0.45, '#101820');
  g.addColorStop(1, '#0c1014');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  if (!loops.length) {
    ctx.fillStyle = '#8b9bb0';
    ctx.font = '600 14px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Teken eerst een gesloten plattegrond', w / 2, h / 2);
    return false;
  }

  const faces: Face[] = [];

  for (let li = 0; li < loops.length; li++) {
    const L = loops[li];
    const n = L.vertices.length;
    const floor: Vec3[] = [];
    for (const p of L.vertices) {
      const m = toMeters(p, ppm);
      floor.push({ x: m.x, y: 0, z: m.z });
    }
    // floor tint alternate slightly per room
    const tint = 40 + (li % 3) * 8;
    faces.push({
      pts: floor,
      fill: `rgba(${tint},${tint + 30},${tint + 15},0.92)`,
      stroke: '#2a4a38',
      zAvg: faceAvgZ(floor, cam),
      alpha: 1,
    });

    if (!hideCeil) {
      const ceil = floor.map((v) => ({ ...v, y: wallH }));
      faces.push({
        pts: ceil,
        fill: 'rgba(35, 45, 60, 0.45)',
        stroke: 'rgba(70, 90, 110, 0.35)',
        zAvg: faceAvgZ(ceil, cam),
        alpha: 0.45,
      });
    }

    for (let i = 0; i < n; i++) {
      const a = floor[i];
      const b = floor[(i + 1) % n];
      // door cut: simple skip middle of door walls
      const doors = L.doors ?? [];
      const doorOnWall = doors.filter((d) => d.wallIndex === i);
      if (doorOnWall.length === 0) {
        pushWall(faces, a, b, wallH, cam, wallAlpha);
      } else {
        // sort doors by t, cut wall into solid segments leaving gaps
        const segs = doorCuts(a, b, doorOnWall, ppm);
        for (const s of segs) pushWall(faces, s.a, s.b, wallH, cam, wallAlpha);
        // door frame residual (low wall under opening? skip — open doorway)
      }
    }
  }

  // painter's algorithm far → near
  faces.sort((a, b) => b.zAvg - a.zAvg);

  for (const f of faces) {
    const proj: { x: number; y: number; z: number }[] = [];
    let any = false;
    for (const p of f.pts) {
      const c = worldToCam(p, cam);
      const pr = project(c, w, h, cam.fovDeg);
      if (pr) {
        proj.push(pr);
        any = true;
      } else {
        // clip behind: push far-off screen marker to keep shape roughly
        proj.push({ x: w / 2, y: h / 2, z: 0.01 });
      }
    }
    if (!any || proj.length < 3) continue;
    // skip if all behind-ish
    if (proj.every((p) => p.z < 0.08)) continue;

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

  // crosshair
  ctx.strokeStyle = 'rgba(255,255,255,0.25)';
  ctx.beginPath();
  ctx.moveTo(w / 2 - 8, h / 2);
  ctx.lineTo(w / 2 + 8, h / 2);
  ctx.moveTo(w / 2, h / 2 - 8);
  ctx.lineTo(w / 2, h / 2 + 8);
  ctx.stroke();

  // HUD
  ctx.fillStyle = '#9aabbd';
  ctx.font = '600 11px system-ui, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(
    `WASD lopen · muis kijken · Q/E omhoog/omlaag · scroll FOV · oog ${cam.eyeY.toFixed(2)} m`,
    12,
    h - 14,
  );
  ctx.fillText(
    `pos ${cam.eyeX.toFixed(1)}, ${cam.eyeZ.toFixed(1)} m · FOV ${Math.round(cam.fovDeg)}°`,
    12,
    h - 30,
  );

  return true;
}

function pushWall(
  faces: Face[],
  a: Vec3,
  b: Vec3,
  wallH: number,
  cam: View3dCamera,
  alpha: number,
): void {
  const wall: Vec3[] = [
    a,
    b,
    { x: b.x, y: wallH, z: b.z },
    { x: a.x, y: wallH, z: a.z },
  ];
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz) || 1;
  const shade = 0.4 + 0.4 * Math.abs(dz / len);
  const g = Math.round(55 + shade * 100);
  const r = Math.round(g - 10);
  const bl = Math.round(g + 25);
  faces.push({
    pts: wall,
    fill: `rgba(${r},${g},${bl},${alpha})`,
    stroke: 'rgba(20,30,40,0.7)',
    zAvg: faceAvgZ(wall, cam),
    alpha,
  });
}

/** Solid wall pieces after cutting door openings (full height open). */
function doorCuts(
  a: Vec3,
  b: Vec3,
  doors: { t: number; widthM: number }[],
  _ppm: number,
): { a: Vec3; b: Vec3 }[] {
  const wallLen = Math.hypot(b.x - a.x, b.z - a.z);
  if (wallLen < 1e-6) return [];
  const ux = (b.x - a.x) / wallLen;
  const uz = (b.z - a.z) / wallLen;
  type Gap = { t0: number; t1: number };
  const gaps: Gap[] = doors.map((d) => {
    const half = d.widthM / 2 / wallLen;
    return {
      t0: Math.max(0, d.t - half),
      t1: Math.min(1, d.t + half),
    };
  });
  gaps.sort((g, h) => g.t0 - h.t0);
  // merge
  const merged: Gap[] = [];
  for (const g of gaps) {
    const last = merged[merged.length - 1];
    if (last && g.t0 <= last.t1) last.t1 = Math.max(last.t1, g.t1);
    else merged.push({ ...g });
  }
  const segs: { a: Vec3; b: Vec3 }[] = [];
  let cursor = 0;
  const at = (t: number): Vec3 => ({
    x: a.x + ux * wallLen * t,
    y: 0,
    z: a.z + uz * wallLen * t,
  });
  for (const g of merged) {
    if (g.t0 > cursor + 0.001) segs.push({ a: at(cursor), b: at(g.t0) });
    cursor = g.t1;
  }
  if (cursor < 0.999) segs.push({ a: at(cursor), b: at(1) });
  return segs;
}
