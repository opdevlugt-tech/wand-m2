/**
 * Bestellijst + leiding-lengte (puur, unit-testbaar).
 */
import { dist } from '../geometry/math';
import type { Point } from '../geometry/types';
import { getInstallDef, type InstallRun, type PlacedInstall } from '../config/installations';

export type BomUnit = 'st' | 'm';

export type BomLine = {
  defId: string;
  label: string;
  code: string;
  qty: number;
  unit: BomUnit;
};

/** Totale lengte polyline in meters. */
export function polylineLengthM(points: Point[], pxPerMeter: number): number {
  if (points.length < 2 || pxPerMeter <= 0) return 0;
  let px = 0;
  for (let i = 1; i < points.length; i++) px += dist(points[i - 1], points[i]);
  return px / pxPerMeter;
}

/** Afstand punt → polyline (min over segmenten). */
export function distPointToPolyline(p: Point, points: Point[]): number {
  if (points.length === 0) return Infinity;
  if (points.length === 1) return dist(p, points[0]);
  let best = Infinity;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const d = distPointToSeg(p, a, b);
    if (d < best) best = d;
  }
  return best;
}

function distPointToSeg(p: Point, a: Point, b: Point): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len2 = dx * dx + dy * dy;
  if (len2 < 1e-12) return dist(p, a);
  let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  return dist(p, { x: a.x + t * dx, y: a.y + t * dy });
}

/**
 * Aggregeer geplaatste componenten (stuks) + leidingen (meters).
 * Leiding-catalogus-items die per ongeluk als punt staan, tellen als 1 st.
 */
export function buildBom(
  installations: PlacedInstall[],
  runs: InstallRun[],
  pxPerMeter: number,
): BomLine[] {
  const map = new Map<string, BomLine>();

  const bump = (defId: string, qty: number, unit: BomUnit) => {
    const def = getInstallDef(defId);
    const label = def?.labelNl ?? defId;
    const code = def?.code ?? defId;
    const cur = map.get(defId);
    if (cur) {
      if (cur.unit !== unit) {
        // voorkeur meters als mix (zou niet moeten)
        if (unit === 'm') {
          cur.unit = 'm';
          cur.qty = qty;
        } else {
          cur.qty += qty;
        }
      } else {
        cur.qty += qty;
      }
    } else {
      map.set(defId, { defId, label, code, qty, unit });
    }
  };

  for (const it of installations) {
    bump(it.defId, 1, 'st');
  }
  for (const run of runs) {
    const m = polylineLengthM(run.points, pxPerMeter);
    if (m > 0) bump(run.defId, m, 'm');
  }

  return [...map.values()].sort((a, b) => {
    if (a.unit !== b.unit) return a.unit === 'st' ? -1 : 1;
    return a.label.localeCompare(b.label, 'nl');
  });
}

/** NL-notatie: stuks geheel, meters 1 decimaal met komma. */
export function formatBomQty(line: BomLine): string {
  if (line.unit === 'st') {
    return `${Math.round(line.qty)} st`;
  }
  const v = Math.round(line.qty * 10) / 10;
  const s = Number.isInteger(v) ? String(v) : v.toFixed(1).replace('.', ',');
  return `${s} m`;
}
