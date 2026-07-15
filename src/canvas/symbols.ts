/**
 * Elektrotechnische symbolen — installatieplattegrond.
 *
 * - WCD randaarde: NL-vorm (elektraklus referenties)
 * - Schakelaar / lamp / CU e.a.: vector uit FIA CAD DWG (First In Architecture)
 *   geëxtraheerd via LibreDWG dwg2dxf + clustering
 */
import { drawFiaSymbol } from './cad-paths';

export type ElectraSymbolId =
  | 'switch-1p' // éénpolige schakelaar
  | 'switch-2p' // tweepolige schakelaar
  | 'switch-wissel' // wisselschakelaar
  | 'switch-kruis' // kruisschakelaar
  | 'switch-serie' // serieschakelaar
  | 'dimmer'
  | 'pushbutton' // drukknop
  | 'socket' // wandcontactdoos
  | 'socket-pe' // WCD met beschermingscontact
  | 'socket-double' // dubbele WCD
  | 'socket-quad' // viervoudige
  | 'combo-sw-socket' // schakelaar + WCD combinatie
  | 'light' // lichtpunt (X)
  | 'light-signal' // lichtpunt signalering (⊗)
  | 'light-tl' // TL-armatuur
  | 'meterkast' // meterkast / mk op plattegrond
  | 'junction' // las / verbindingsdoos
  | 'centraal' // centraaldoos
  | 'centraal-light' // centraaldoos met lichtpunt
  | 'cable-empty' // loze leiding
  | 'cable-wired' // bedrade leiding
  | 'cable-earth'; // leiding met aarding

/** Map naar FIA CAD-paden waar beschikbaar. */
const FIA_MAP: Partial<Record<ElectraSymbolId, string>> = {
  'switch-1p': 'switch_1g',
  'switch-2p': 'switch_2g',
  'switch-wissel': 'switch_2way',
  pushbutton: 'push',
  light: 'light_pendant',
  'light-tl': 'light_tl',
  meterkast: 'cu',
  // NL WCD blijft handgetekend (randaarde) — FIA is UK switched socket
};

export function drawElectraSymbol(
  ctx: CanvasRenderingContext2D,
  id: ElectraSymbolId,
  x: number,
  y: number,
  size: number,
  opts?: { selected?: boolean; viewScale?: number; rotDeg?: number },
): void {
  const s = size;
  const selected = opts?.selected ?? false;
  const vs = Math.max(0.05, opts?.viewScale ?? 1);
  const lw = 1.25 / vs; // ~1.25 schermpx
  const rot = ((opts?.rotDeg ?? 0) * Math.PI) / 180;
  const fontW = 8 / vs;

  ctx.save();
  ctx.translate(x, y);
  if (rot) ctx.rotate(rot);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lw;
  ctx.strokeStyle = selected ? '#ffd166' : '#e8eef7';
  ctx.fillStyle = selected ? '#ffd166' : '#e8eef7';
  ctx.font = `600 ${fontW}px system-ui, sans-serif`;

  const fia = FIA_MAP[id];
  if (fia) {
    drawFiaSymbol(ctx, fia, s * 0.95);
  } else {
    switch (id) {
      case 'switch-kruis':
        drawSwitchKruis(ctx, s);
        break;
      case 'switch-serie':
        drawSwitchSerie(ctx, s);
        break;
      case 'dimmer':
        drawDimmer(ctx, s);
        break;
      case 'socket':
        drawSocketC(ctx, s, 1, false);
        break;
      case 'socket-pe':
        drawSocketC(ctx, s, 1, true);
        break;
      case 'socket-double':
        drawSocketC(ctx, s, 2, true);
        break;
      case 'socket-quad':
        drawSocketC(ctx, s, 4, true);
        break;
      case 'combo-sw-socket':
        drawCombo(ctx, s);
        break;
      case 'light-signal':
        drawLightX(ctx, s, true);
        break;
      case 'junction':
        drawJunction(ctx, s);
        break;
      case 'centraal':
        drawCentraal(ctx, s, false);
        break;
      case 'centraal-light':
        drawCentraal(ctx, s, true);
        break;
      case 'cable-empty':
        drawCable(ctx, s, 'empty');
        break;
      case 'cable-wired':
        drawCable(ctx, s, 'wired');
        break;
      case 'cable-earth':
        drawCable(ctx, s, 'earth');
        break;
      default:
        drawSocketC(ctx, s, 1, true);
    }
  }

  if (selected) {
    const h = s * 0.52;
    const t = s * 0.16;
    ctx.lineWidth = lw * 0.85;
    ctx.strokeStyle = '#ffd166';
    ctx.beginPath();
    ctx.moveTo(-h, -h + t);
    ctx.lineTo(-h, -h);
    ctx.lineTo(-h + t, -h);
    ctx.moveTo(h - t, -h);
    ctx.lineTo(h, -h);
    ctx.lineTo(h, -h + t);
    ctx.moveTo(h, h - t);
    ctx.lineTo(h, h);
    ctx.lineTo(h - t, h);
    ctx.moveTo(-h + t, h);
    ctx.lineTo(-h, h);
    ctx.lineTo(-h, h - t);
    ctx.stroke();
  }

  ctx.restore();
}

/** Kruis: X met open einden (kruisschakelaar tekening). */
function drawSwitchKruis(ctx: CanvasRenderingContext2D, s: number): void {
  const a = s * 0.32;
  ctx.beginPath();
  ctx.moveTo(-a, -a);
  ctx.lineTo(a, a);
  ctx.moveTo(a, -a);
  ctx.lineTo(-a, a);
  ctx.stroke();
  for (const [x, y] of [
    [-a, -a],
    [a, a],
    [a, -a],
    [-a, a],
  ] as const) {
    ctx.beginPath();
    ctx.arc(x, y, s * 0.07, 0, Math.PI * 2);
    ctx.stroke();
  }
}

/** Serie: V met cirkel op de punt. */
function drawSwitchSerie(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.16;
  ctx.beginPath();
  ctx.arc(0, r * 0.9, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 1.6, -r * 1.2);
  ctx.lineTo(0, r * 0.2);
  ctx.lineTo(r * 1.6, -r * 1.2);
  ctx.stroke();
}

/** Dimmer: schakelaar-achtig + pijlpunt. */
function drawDimmer(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.18;
  ctx.beginPath();
  ctx.arc(0, r * 0.35, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(r * 0.55, r * 0.05);
  ctx.lineTo(r * 1.9, -r * 1.55);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(r * 1.55, -r * 1.2);
  ctx.lineTo(r * 2.05, -r * 1.75);
  ctx.lineTo(r * 1.45, -r * 1.65);
  ctx.closePath();
  ctx.stroke();
}

/**
 * Wandcontactdoos (NL installatieplattegrond).
 * Bron: elektraklus WCD-enkel-randaarde.png / WCD-dubbel-randaarde.png
 *
 *   zonder aarding:  │ + ∩   (steel + boog met piek op diameter-lijn)
 *   met randaarde:   │ + ─ + ∩  (balk = raaklijn/piek van 1e boog)
 *   meervoudig: één steel/balk, ∩-bogen gestapeld (poten omlaag)
 *
 * Geometrie (canvas y↓):
 *   - Steel alleen BOVEN de balk
 *   - Middelpunt van boog i ONDER de piek: cy = yPeak + r
 *   - Bovenste halfcirkel t.o.v. dat middelpunt = ∩ onder de balk
 *   - arc(π → 0, counterclockwise=false) = met de klok mee door NOORDEN
 *
 * Fout-modus die we eerder hadden: cy op de balk → boog ging DOOR de steel.
 */
function drawSocketC(
  ctx: CanvasRenderingContext2D,
  s: number,
  count: 1 | 2 | 4,
  pe: boolean,
): void {
  const r = s * 0.34;
  const stemH = s * 0.36;
  const gap = r * 0.22;
  // elke ∩ is r diep (piek → poten); gaps tussen poten en volgende piek
  const arcsH = count * r + Math.max(0, count - 1) * gap;
  const totalH = stemH + arcsH;
  const yTop = -totalH / 2;
  const yBar = yTop + stemH;

  // verticale steel: alleen BOVEN de balk
  ctx.beginPath();
  ctx.moveTo(0, yTop);
  ctx.lineTo(0, yBar);
  ctx.stroke();

  if (pe) {
    // randaarde = horizontale balk door de piek van de eerste boog
    const barW = r * 1.05; // ≈ diameter, zoals elektraklus-ref
    ctx.beginPath();
    ctx.moveTo(-barW, yBar);
    ctx.lineTo(barW, yBar);
    ctx.stroke();
  }

  // ∩-bogen: piek raakt yPeak, poten omlaag
  for (let i = 0; i < count; i++) {
    const yPeak = yBar + i * (r + gap);
    const cy = yPeak + r; // middelpunt onder de piek
    ctx.beginPath();
    // π (links) → 0 (rechts), met de klok mee door bovenkant = ∩
    ctx.arc(0, cy, r, Math.PI, 0, false);
    ctx.stroke();
  }
}

/** Combinatie schakelaar + WCD randaarde (schakelaar boven, WCD eronder). */
function drawCombo(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.14;
  // schakelaar (cirkel + hendel) boven
  ctx.beginPath();
  ctx.arc(0, -r * 2.2, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(r * 0.4, -r * 2.5);
  ctx.lineTo(r * 1.6, -r * 3.4);
  ctx.stroke();
  // WCD randaarde eronder — zelfde ∩-geometrie als drawSocketC
  const yBar = r * 0.1;
  const rr = r * 1.35;
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.1);
  ctx.lineTo(0, yBar);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 1.5, yBar);
  ctx.lineTo(r * 1.5, yBar);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, yBar + rr, rr, Math.PI, 0, false);
  ctx.stroke();
}

/** Lichtpunt: lijn + X (Kenteq tekening). */
function drawLightX(ctx: CanvasRenderingContext2D, s: number, signal: boolean): void {
  const a = s * 0.28;
  ctx.beginPath();
  ctx.moveTo(-a * 1.3, 0);
  ctx.lineTo(-a * 0.15, 0);
  ctx.stroke();
  if (signal) {
    ctx.beginPath();
    ctx.arc(a * 0.35, 0, a * 0.7, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.beginPath();
  ctx.moveTo(-a * 0.05, -a * 0.55);
  ctx.lineTo(a * 0.75, a * 0.55);
  ctx.moveTo(a * 0.75, -a * 0.55);
  ctx.lineTo(-a * 0.05, a * 0.55);
  ctx.stroke();
}

/** Lasdoos: open cirkel. */
function drawJunction(ctx: CanvasRenderingContext2D, s: number): void {
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
  ctx.stroke();
}

/** Centraaldoos: vierkant; optioneel + lichtpunt-X (Kenteq/elektra-info). */
function drawCentraal(ctx: CanvasRenderingContext2D, s: number, withLight: boolean): void {
  const a = s * 0.28;
  ctx.strokeRect(-a, -a, a * 2, a * 2);
  if (withLight) {
    const x = a * 0.55;
    ctx.beginPath();
    ctx.moveTo(-x, -x);
    ctx.lineTo(x, x);
    ctx.moveTo(x, -x);
    ctx.lineTo(-x, x);
    ctx.stroke();
  }
}

/** Leiding-markering op plattegrond (eenvoudig). */
function drawCable(
  ctx: CanvasRenderingContext2D,
  s: number,
  kind: 'empty' | 'wired' | 'earth',
): void {
  const L = s * 0.55;
  ctx.beginPath();
  ctx.moveTo(-L, 0);
  ctx.lineTo(L, 0);
  ctx.stroke();
  // eindpunt
  ctx.beginPath();
  ctx.arc(L, 0, s * 0.08, 0, Math.PI * 2);
  ctx.stroke();
  if (kind === 'empty') {
    // loze: stippellijn hint
    ctx.setLineDash([s * 0.08, s * 0.08]);
    ctx.beginPath();
    ctx.moveTo(-L * 0.6, 0);
    ctx.lineTo(L * 0.6, 0);
    ctx.stroke();
    ctx.setLineDash([]);
  } else if (kind === 'wired') {
    // 3 aders als streepjes
    for (const t of [-0.25, 0, 0.25]) {
      const x = t * L;
      ctx.beginPath();
      ctx.moveTo(x, -s * 0.14);
      ctx.lineTo(x, s * 0.14);
      ctx.stroke();
    }
  } else {
    // earth: PE-markering (⊥)
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.18);
    ctx.lineTo(0, s * 0.12);
    ctx.moveTo(-s * 0.16, s * 0.12);
    ctx.lineTo(s * 0.16, s * 0.12);
    ctx.moveTo(-s * 0.1, s * 0.2);
    ctx.lineTo(s * 0.1, s * 0.2);
    ctx.stroke();
  }
}
