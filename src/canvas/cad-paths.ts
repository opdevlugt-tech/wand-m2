/**
 * FIA Electrical CAD Blocks — geëxtraheerde vectorpaden uit DWG→DXF.
 * Bron: First In Architecture free CAD blocks (refs/cad-symbols).
 */
import fiaPaths from '../assets/fia-paths.json';

export type CadPart =
  | ['L', number, number, number, number]
  | ['C', number, number, number]
  | ['A', number, number, number, number, number]
  | ['P', boolean, [number, number][]];

export type FiaSymbolId = keyof typeof fiaPaths;

const PATHS = fiaPaths as unknown as Record<string, CadPart[]>;

export function hasFiaSymbol(id: string): boolean {
  return id in PATHS;
}

/** Teken genormaliseerd CAD-symbool (bbox ≈ 1) op size. */
export function drawFiaSymbol(
  ctx: CanvasRenderingContext2D,
  id: string,
  size: number,
): void {
  const parts = PATHS[id];
  if (!parts) return;
  const s = size;
  for (const p of parts) {
    const k = p[0];
    if (k === 'L') {
      const [, x1, y1, x2, y2] = p as ['L', number, number, number, number];
      ctx.beginPath();
      // CAD y↑ → canvas y↓: flip y
      ctx.moveTo(x1 * s, -y1 * s);
      ctx.lineTo(x2 * s, -y2 * s);
      ctx.stroke();
    } else if (k === 'C') {
      const [, cx, cy, r] = p as ['C', number, number, number];
      ctx.beginPath();
      ctx.arc(cx * s, -cy * s, r * s, 0, Math.PI * 2);
      ctx.stroke();
    } else if (k === 'A') {
      const [, cx, cy, r, a0, a1] = p as [
        'A',
        number,
        number,
        number,
        number,
        number,
      ];
      // DXF angles: degrees CCW from +x; after y-flip, negate angles & swap direction
      ctx.beginPath();
      const start = (-a0 * Math.PI) / 180;
      const end = (-a1 * Math.PI) / 180;
      ctx.arc(cx * s, -cy * s, r * s, start, end, true);
      ctx.stroke();
    } else if (k === 'P') {
      const [, closed, pts] = p as ['P', boolean, [number, number][]];
      if (!pts.length) continue;
      ctx.beginPath();
      ctx.moveTo(pts[0][0] * s, -pts[0][1] * s);
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i][0] * s, -pts[i][1] * s);
      }
      if (closed) ctx.closePath();
      ctx.stroke();
    }
  }
}
