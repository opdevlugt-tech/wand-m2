/**
 * Elektrische installatie-symbolen — vereenvoudigde NEN 5152 / NL-bouwtekening stijl.
 * Pictogrammen voor installatieplattegronden (niet bedradingsschema).
 */
export type ElectraSymbolId =
  | 'socket'
  | 'socket-double'
  | 'switch'
  | 'switch-double'
  | 'light'
  | 'light-wall'
  | 'panel'
  | 'data'
  | 'thermostat';

/** Teken symbool in world-ruimte; size ≈ diameter in world px. */
export function drawElectraSymbol(
  ctx: CanvasRenderingContext2D,
  id: ElectraSymbolId,
  x: number,
  y: number,
  size: number,
  opts?: { selected?: boolean; strokeScale?: number },
): void {
  const s = size;
  const selected = opts?.selected ?? false;
  const lw = Math.max(1, (opts?.strokeScale ?? 1) * (s / 14));

  ctx.save();
  ctx.translate(x, y);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lw;
  ctx.strokeStyle = selected ? '#ffd166' : '#e8eef7';
  ctx.fillStyle = selected ? 'rgba(255,209,102,0.15)' : 'rgba(15,20,25,0.75)';

  // hit disc background
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.55, 0, Math.PI * 2);
  ctx.fill();

  switch (id) {
    case 'socket':
      drawSocket(ctx, s, false);
      break;
    case 'socket-double':
      drawSocket(ctx, s, true);
      break;
    case 'switch':
      drawSwitch(ctx, s, false);
      break;
    case 'switch-double':
      drawSwitch(ctx, s, true);
      break;
    case 'light':
      drawLight(ctx, s, false);
      break;
    case 'light-wall':
      drawLight(ctx, s, true);
      break;
    case 'panel':
      drawPanel(ctx, s);
      break;
    case 'data':
      drawData(ctx, s);
      break;
    case 'thermostat':
      drawThermostat(ctx, s);
      break;
    default:
      drawSocket(ctx, s, false);
  }

  if (selected) {
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = lw * 0.8;
    ctx.setLineDash([s * 0.15, s * 0.1]);
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

/** Enkelvoudige / dubbele wandcontactdoos (twee horizontale streepjes in cirkel). */
function drawSocket(ctx: CanvasRenderingContext2D, s: number, dubbel: boolean): void {
  const r = s * 0.38;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  // contact strepen
  const w = r * 0.55;
  ctx.beginPath();
  ctx.moveTo(-w, -r * 0.15);
  ctx.lineTo(w, -r * 0.15);
  if (dubbel) {
    ctx.moveTo(-w, r * 0.2);
    ctx.lineTo(w, r * 0.2);
  } else {
    ctx.moveTo(-w * 0.5, r * 0.25);
    ctx.lineTo(w * 0.5, r * 0.25);
  }
  ctx.stroke();
  // aardpen midden (punt)
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2);
  ctx.fillStyle = ctx.strokeStyle as string;
  ctx.fill();
}

/** Schakelaar: cirkel + schuine bedieningslijn (NEN-achtig). */
function drawSwitch(ctx: CanvasRenderingContext2D, s: number, dubbel: boolean): void {
  const r = s * 0.36;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  // schuine schakelaar-arm
  ctx.beginPath();
  ctx.moveTo(-r * 0.15, r * 0.45);
  ctx.lineTo(r * 0.55, -r * 0.35);
  ctx.stroke();
  if (dubbel) {
    ctx.beginPath();
    ctx.moveTo(-r * 0.35, r * 0.45);
    ctx.lineTo(r * 0.35, -r * 0.55);
    ctx.stroke();
  }
}

/** Lichtpunt plafond (cirkel + kruis) of wandlamp. */
function drawLight(ctx: CanvasRenderingContext2D, s: number, wall: boolean): void {
  const r = s * 0.36;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  // kruis
  ctx.beginPath();
  ctx.moveTo(-r * 0.55, 0);
  ctx.lineTo(r * 0.55, 0);
  ctx.moveTo(0, -r * 0.55);
  ctx.lineTo(0, r * 0.55);
  ctx.stroke();
  if (wall) {
    // muur-haken onder
    ctx.beginPath();
    ctx.moveTo(-r * 0.7, r * 0.75);
    ctx.lineTo(r * 0.7, r * 0.75);
    ctx.stroke();
  }
}

/** Groepenkast / meterkast: rechthoek met strepen. */
function drawPanel(ctx: CanvasRenderingContext2D, s: number): void {
  const w = s * 0.55;
  const h = s * 0.7;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  // 3 groepen-strepen
  for (let i = 0; i < 3; i++) {
    const yy = -h * 0.25 + i * (h * 0.25);
    ctx.beginPath();
    ctx.moveTo(-w * 0.3, yy);
    ctx.lineTo(w * 0.3, yy);
    ctx.stroke();
  }
}

/** Data-aansluiting: ruit / diamant. */
function drawData(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.32;
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r, 0);
  ctx.lineTo(0, r);
  ctx.lineTo(-r, 0);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.25, 0, Math.PI * 2);
  ctx.stroke();
}

/** Thermostaat: cirkel + T. */
function drawThermostat(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.36;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.font = `700 ${s * 0.45}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = ctx.strokeStyle as string;
  ctx.fillText('θ', 0, s * 0.02);
}
