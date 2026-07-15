/**
 * 3D walkthrough — Three.js WebGL.
 * Plan (x_px, y_px) → world meters (x, 0, z) with z = y_px/ppm, Y-up.
 */
import * as THREE from 'three';
import type { DrawingModel, Point } from './geometry/types';

export type View3dCamera = {
  eyeX: number;
  eyeY: number;
  eyeZ: number;
  /** yaw: 0 looks +Z; + turns right */
  yaw: number;
  /** pitch: + looks up */
  pitch: number;
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
const WALL_THICK = 0.12;

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

/** Start in first room centroid at eye height. */
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
  // look toward mid of longest wall from center (stable indoor start)
  let bestLen = -1;
  let lookX = cx;
  let lookZ = cz + 1;
  for (let i = 0; i < n; i++) {
    const a = toMeters(L.vertices[i], ppm);
    const b = toMeters(L.vertices[(i + 1) % n], ppm);
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    if (len > bestLen) {
      bestLen = len;
      lookX = (a.x + b.x) / 2;
      lookZ = (a.z + b.z) / 2;
    }
  }
  const yaw = Math.atan2(lookX - cx, lookZ - cz);
  return { eyeX: cx, eyeY: EYE_H, eyeZ: cz, yaw, pitch: 0, fovDeg: 75 };
}

export function moveCamera(
  cam: View3dCamera,
  forward: number,
  right: number,
  up: number,
): View3dCamera {
  // yaw 0 = +Z forward
  const fx = Math.sin(cam.yaw);
  const fz = Math.cos(cam.yaw);
  const rx = Math.cos(cam.yaw);
  const rz = -Math.sin(cam.yaw);
  return {
    ...cam,
    eyeX: cam.eyeX + fx * forward + rx * right,
    eyeZ: cam.eyeZ + fz * forward + rz * right,
    eyeY: Math.max(0.3, Math.min(8, cam.eyeY + up)),
  };
}

export function lookCamera(cam: View3dCamera, dYaw: number, dPitch: number): View3dCamera {
  return {
    ...cam,
    yaw: cam.yaw + dYaw,
    pitch: Math.max(-1.2, Math.min(1.2, cam.pitch + dPitch)),
  };
}

function applyCamera(cam: View3dCamera, threeCam: THREE.PerspectiveCamera): void {
  threeCam.position.set(cam.eyeX, cam.eyeY, cam.eyeZ);
  threeCam.fov = cam.fovDeg;
  threeCam.near = 0.05;
  threeCam.far = 300;
  const cp = Math.cos(cam.pitch);
  const lookX = cam.eyeX + Math.sin(cam.yaw) * cp;
  const lookY = cam.eyeY + Math.sin(cam.pitch);
  const lookZ = cam.eyeZ + Math.cos(cam.yaw) * cp;
  threeCam.lookAt(lookX, lookY, lookZ);
  threeCam.updateProjectionMatrix();
}

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
    return { t0: Math.max(0, d.t - half), t1: Math.min(1, d.t + half) };
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
    if (g.t0 > cursor + 0.002) segs.push({ a: at(cursor), b: at(g.t0) });
    cursor = g.t1;
  }
  if (cursor < 0.998) segs.push({ a: at(cursor), b: at(1) });
  return segs;
}

/** Wall box: length along X, then rotate Y so +X aligns with (dx,dz). */
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
  if (len < 0.03) return;
  const geom = new THREE.BoxGeometry(len, wallH, WALL_THICK);
  const mesh = new THREE.Mesh(geom, material);
  mesh.position.set((a.x + b.x) / 2, wallH / 2, (a.z + b.z) / 2);
  // align local +X with (dx, 0, dz)
  mesh.rotation.y = Math.atan2(-dz, dx);
  group.add(mesh);
}

/**
 * Floor mesh from polygon — BufferGeometry, no Shape mirror bugs.
 * Assumes simple polygon (no holes); fans from centroid.
 */
function addFloor(group: THREE.Group, pts: Vec3[], color: THREE.Color): void {
  if (pts.length < 3) return;
  let cx = 0;
  let cz = 0;
  for (const p of pts) {
    cx += p.x;
    cz += p.z;
  }
  cx /= pts.length;
  cz /= pts.length;

  const positions: number[] = [];
  const normals: number[] = [];
  const indices: number[] = [];
  // vertex 0 = centroid
  positions.push(cx, 0.01, cz);
  normals.push(0, 1, 0);
  for (const p of pts) {
    positions.push(p.x, 0.01, p.z);
    normals.push(0, 1, 0);
  }
  // close ring: also need last→first
  for (let i = 0; i < pts.length; i++) {
    const a = 1 + i;
    const b = 1 + ((i + 1) % pts.length);
    // CCW when viewed from +Y if plan winding is CCW; DoubleSide floor if wrong
    indices.push(0, a, b);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  geom.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.9,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  group.add(new THREE.Mesh(geom, mat));
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

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0x6a849c,
    roughness: 0.85,
    metalness: 0.05,
    side: THREE.DoubleSide,
  });

  for (let li = 0; li < loops.length; li++) {
    const L = loops[li];
    const floorPts: Vec3[] = L.vertices.map((p) => {
      const m = toMeters(p, ppm);
      return { x: m.x, y: 0, z: m.z };
    });

    const tint = 45 + (li % 3) * 12;
    addFloor(group, floorPts, new THREE.Color(`rgb(${tint},${tint + 35},${tint + 18})`));

    const n = floorPts.length;
    for (let i = 0; i < n; i++) {
      const a = floorPts[i];
      const b = floorPts[(i + 1) % n];
      const doors = (L.doors ?? []).filter((d) => d.wallIndex === i);
      if (doors.length === 0) {
        addWallSegment(group, a, b, wallH, wallMat);
      } else {
        for (const s of doorCuts(a, b, doors)) {
          addWallSegment(group, s.a, s.b, wallH, wallMat);
        }
      }
    }
  }

  // thin ground grid helper outside building (orientation check)
  const grid = new THREE.GridHelper(40, 40, 0x2a3848, 0x1a2430);
  grid.position.y = 0;
  group.add(grid);

  return { group, hasGeometry: true };
}

/**
 * WebGL walkthrough. Keeps one renderer for the canvas lifetime —
 * do NOT dispose() the GL context between open/close (breaks re-open).
 */
export class View3dEngine {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private building: THREE.Group | null = null;
  private hasGeometry = false;
  private alive = true;

  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setClearColor(0x0a121c, 1);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a121c);
    this.scene.fog = new THREE.Fog(0x0a121c, 25, 80);

    this.camera = new THREE.PerspectiveCamera(75, 1, 0.05, 300);

    this.scene.add(new THREE.AmbientLight(0x90a0b8, 0.65));
    const sun = new THREE.DirectionalLight(0xffffff, 0.9);
    sun.position.set(8, 14, 6);
    this.scene.add(sun);
    const fill = new THREE.DirectionalLight(0x88a0c0, 0.35);
    fill.position.set(-6, 8, -4);
    this.scene.add(fill);
    // soft top light indoors
    const hemi = new THREE.HemisphereLight(0xc0d0e8, 0x2a3028, 0.35);
    this.scene.add(hemi);
  }

  rebuild(model: DrawingModel, opts: Pick<View3dOptions, 'pxPerMeter' | 'wallHeightM'>): boolean {
    if (!this.alive) return false;
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
    if (!this.alive) return false;
    const width = Math.max(1, Math.floor(w));
    const height = Math.max(1, Math.floor(h));
    // updateStyle=true keeps CSS size in sync with buffer
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / Math.max(1, height);
    applyCamera(cam, this.camera);
    this.renderer.render(this.scene, this.camera);
    return this.hasGeometry;
  }

  /** Clear geometry only — keep WebGL context for re-open. */
  clearBuilding(): void {
    if (this.building) {
      this.scene.remove(this.building);
      disposeObject(this.building);
      this.building = null;
    }
    this.hasGeometry = false;
  }

  /** Full teardown (page unload). Prefer clearBuilding() on overlay close. */
  dispose(): void {
    this.clearBuilding();
    this.alive = false;
    this.renderer.dispose();
  }
}
