/**
 * 3D walkthrough: plattegrond → Three.js WebGL scene, free camera (ooghoogte).
 * World: meters, Y-up. Plan (px) → (x, 0, z) met z = plan-y.
 */
import * as THREE from 'three';
import type { DrawingModel, Point } from './geometry/types';

export type View3dCamera = {
  /** Camera eye in meters (absolute, plan origin) */
  eyeX: number;
  eyeY: number;
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
};

type Vec3 = { x: number; y: number; z: number };

const DEFAULT_H = 2.5;
const EYE_H = 1.65;
const WALL_THICK = 0.1;

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

export function moveCamera(
  cam: View3dCamera,
  forward: number,
  right: number,
  up: number,
): View3dCamera {
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

function applyCamera(cam: View3dCamera, threeCam: THREE.PerspectiveCamera): void {
  threeCam.position.set(cam.eyeX, cam.eyeY, cam.eyeZ);
  threeCam.fov = cam.fovDeg;
  threeCam.near = 0.08;
  threeCam.far = 200;
  const lookX = cam.eyeX + Math.sin(cam.yaw) * Math.cos(cam.pitch);
  const lookY = cam.eyeY + Math.sin(cam.pitch);
  const lookZ = cam.eyeZ + Math.cos(cam.yaw) * Math.cos(cam.pitch);
  threeCam.lookAt(lookX, lookY, lookZ);
  threeCam.updateProjectionMatrix();
}

/** Solid wall pieces after cutting door openings (full height open). */
function doorCuts(
  a: Vec3,
  b: Vec3,
  doors: { t: number; widthM: number }[],
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

function addWallSegment(
  group: THREE.Group,
  a: Vec3,
  b: Vec3,
  wallH: number,
  material: THREE.Material,
): void {
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz);
  if (len < 0.02) return;
  const geom = new THREE.BoxGeometry(len, wallH, WALL_THICK);
  const mesh = new THREE.Mesh(geom, material);
  mesh.position.set((a.x + b.x) / 2, wallH / 2, (a.z + b.z) / 2);
  mesh.rotation.y = Math.atan2(dx, dz);
  group.add(mesh);
}

function disposeObject(obj: THREE.Object3D): void {
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.dispose();
      const mats = Array.isArray(child.material) ? child.material : [child.material];
      for (const m of mats) m.dispose();
    }
  });
}

function buildSceneGroup(
  model: DrawingModel,
  ppm: number,
  wallH: number,
): { group: THREE.Group; hasGeometry: boolean } {
  const group = new THREE.Group();
  const loops = model.loops.filter((L) => L.vertices.length >= 3);
  if (!loops.length) return { group, hasGeometry: false };

  for (let li = 0; li < loops.length; li++) {
    const L = loops[li];
    const floorPts: Vec3[] = L.vertices.map((p) => {
      const m = toMeters(p, ppm);
      return { x: m.x, y: 0, z: m.z };
    });

    const shape = new THREE.Shape();
    shape.moveTo(floorPts[0].x, floorPts[0].z);
    for (let i = 1; i < floorPts.length; i++) shape.lineTo(floorPts[i].x, floorPts[i].z);
    shape.closePath();
    const floorGeom = new THREE.ShapeGeometry(shape);
    floorGeom.rotateX(-Math.PI / 2);
    const tint = 40 + (li % 3) * 8;
    const floorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(`rgb(${tint},${tint + 30},${tint + 15})`),
      roughness: 0.92,
      metalness: 0.02,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const floorMesh = new THREE.Mesh(floorGeom, floorMat);
    floorMesh.position.y = 0.002;
    group.add(floorMesh);

    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x4a6278),
      roughness: 0.88,
      metalness: 0.04,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    const n = L.vertices.length;
    for (let i = 0; i < n; i++) {
      const a = floorPts[i];
      const b = floorPts[(i + 1) % n];
      const doors = (L.doors ?? []).filter((d) => d.wallIndex === i);
      if (doors.length === 0) {
        addWallSegment(group, a, b, wallH, wallMat);
      } else {
        for (const s of doorCuts(a, b, doors)) addWallSegment(group, s.a, s.b, wallH, wallMat);
      }
    }
  }

  return { group, hasGeometry: true };
}

/** Three.js WebGL walkthrough bound to an existing canvas element. */
export class View3dEngine {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private building: THREE.Group | null = null;
  private hasGeometry = false;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a121c);
    this.scene.fog = new THREE.Fog(0x0a121c, 30, 120);

    this.camera = new THREE.PerspectiveCamera(75, 1, 0.08, 200);

    const ambient = new THREE.AmbientLight(0x607090, 0.55);
    this.scene.add(ambient);
    const sun = new THREE.DirectionalLight(0xd8e4f0, 0.85);
    sun.position.set(6, 12, 4);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x8090a8, 0.25);
    fill.position.set(-4, 6, -6);
    this.scene.add(fill);
  }

  /** Rebuild floor/wall geometry from the current model. */
  rebuild(model: DrawingModel, opts: Pick<View3dOptions, 'pxPerMeter' | 'wallHeightM'>): boolean {
    if (this.building) {
      this.scene.remove(this.building);
      disposeObject(this.building);
      this.building = null;
    }
    const ppm = opts.pxPerMeter > 0 ? opts.pxPerMeter : 50;
    const wallH = opts.wallHeightM ?? DEFAULT_H;
    const { group, hasGeometry } = buildSceneGroup(model, ppm, wallH);
    this.building = group;
    this.hasGeometry = hasGeometry;
    if (hasGeometry) this.scene.add(group);
    return hasGeometry;
  }

  render(w: number, h: number, cam: View3dCamera): boolean {
    const width = Math.max(1, Math.floor(w));
    const height = Math.max(1, Math.floor(h));
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    applyCamera(cam, this.camera);
    this.renderer.render(this.scene, this.camera);
    return this.hasGeometry;
  }

  /** Release GPU resources; call when overlay closes. */
  dispose(): void {
    if (this.building) {
      this.scene.remove(this.building);
      disposeObject(this.building);
      this.building = null;
    }
    this.hasGeometry = false;
    this.renderer.dispose();
  }
}