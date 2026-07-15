/**
 * Elektrotechnische symbolen — kolom "Tekening" (installatieplattegrond).
 * Bron: Kenteq / Techniekstad preview
 * https://leermiddelenshop.kenteq.nl/Previews/8882292149368.pdf
 *
 * Dunne lijnen, geen achtergrond-rondje, lijnbreedte zoom-stabiel (schermpixels).
 */
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
  | 'junction'; // las / verbindingsdoos

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
  // geen rondje/achtergrond

  switch (id) {
    case 'switch-1p':
      drawSwitchLever(ctx, s, 1);
      break;
    case 'switch-2p':
      drawSwitchLever(ctx, s, 2);
      break;
    case 'switch-wissel':
      drawSwitchWissel(ctx, s);
      break;
    case 'switch-kruis':
      drawSwitchKruis(ctx, s);
      break;
    case 'switch-serie':
      drawSwitchSerie(ctx, s);
      break;
    case 'dimmer':
      drawDimmer(ctx, s);
      break;
    case 'pushbutton':
      drawPush(ctx, s);
      break;
    case 'socket':
      drawSocketC(ctx, s, 1, false);
      break;
    case 'socket-pe':
      drawSocketC(ctx, s, 1, true);
      break;
    case 'socket-double':
      drawSocketC(ctx, s, 2, true); // dubbel standaard met randaarde
      break;
    case 'socket-quad':
      drawSocketC(ctx, s, 4, true);
      break;
    case 'combo-sw-socket':
      drawCombo(ctx, s);
      break;
    case 'light':
      drawLightX(ctx, s, false);
      break;
    case 'light-signal':
      drawLightX(ctx, s, true);
      break;
    case 'light-tl':
      drawTl(ctx, s);
      break;
    case 'meterkast':
      drawMeterkast(ctx, s, fontW);
      break;
    case 'junction':
      drawJunction(ctx, s);
      break;
    default:
      drawSocketC(ctx, s, 1, false);
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

/** Kenteq: cirkel + schuine hendel; poles = streepjes op hendel. */
function drawSwitchLever(ctx: CanvasRenderingContext2D, s: number, poles: 1 | 2): void {
  const r = s * 0.18;
  ctx.beginPath();
  ctx.arc(0, r * 0.35, r, 0, Math.PI * 2);
  ctx.stroke();
  // hendel omhoog-rechts
  ctx.beginPath();
  ctx.moveTo(r * 0.55, r * 0.05);
  ctx.lineTo(r * 1.9, -r * 1.55);
  ctx.stroke();
  if (poles === 2) {
    // dubbele schuine streep op hendel
    for (const t of [0.45, 0.62]) {
      const x = r * 0.55 + t * (r * 1.35);
      const y = r * 0.05 + t * (-r * 1.6);
      ctx.beginPath();
      ctx.moveTo(x - r * 0.25, y - r * 0.12);
      ctx.lineTo(x + r * 0.12, y + r * 0.28);
      ctx.stroke();
    }
  }
}

/** Wissel: cirkel + hendel met haak onderaan. */
function drawSwitchWissel(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.18;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 0.9, r * 0.7);
  ctx.lineTo(r * 1.5, -r * 1.4);
  ctx.stroke();
  // haak
  ctx.beginPath();
  ctx.moveTo(-r * 0.9, r * 0.7);
  ctx.lineTo(-r * 1.35, r * 1.15);
  ctx.stroke();
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
  // kleine open ringen op de 4 einden
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

/** Dimmer: schakelaar + pijlpunt op hendel. */
function drawDimmer(ctx: CanvasRenderingContext2D, s: number): void {
  drawSwitchLever(ctx, s, 1);
  const r = s * 0.18;
  ctx.beginPath();
  ctx.moveTo(r * 1.55, -r * 1.2);
  ctx.lineTo(r * 2.05, -r * 1.75);
  ctx.lineTo(r * 1.45, -r * 1.65);
  ctx.closePath();
  ctx.stroke();
}

/** Drukknop: dubbele concentrische cirkel. */
function drawPush(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.28;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.48, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Wandcontactdoos (Kenteq tekening): lijn + C-vorm.
 * pe/randaarde: beschermingscontacten als korte strepen op de C
 *   (NL-randaarde = zijcontacten).
 */
function drawSocketC(
  ctx: CanvasRenderingContext2D,
  s: number,
  count: 1 | 2 | 4,
  pe: boolean,
): void {
  const r = s * 0.26;
  const gap = r * 1.05;
  const totalW = (count - 1) * gap;
  const c0 = -totalW / 2;
  // toevoer vanaf links
  ctx.beginPath();
  ctx.moveTo(c0 - r * 1.35, 0);
  ctx.lineTo(c0 - r * 0.55, 0);
  ctx.stroke();

  for (let i = 0; i < count; i++) {
    const cx = c0 + i * gap;
    // C opening naar rechts (Kenteq tekening)
    ctx.beginPath();
    ctx.arc(cx, 0, r * 0.62, -Math.PI * 0.72, Math.PI * 0.72, false);
    ctx.stroke();

    if (pe) {
      // Randaarde: twee zijcontacten (boven + onder in de opening van de C)
      const ox = cx + r * 0.28;
      const len = r * 0.42;
      ctx.beginPath();
      ctx.moveTo(ox, -r * 0.38);
      ctx.lineTo(ox + len, -r * 0.38);
      ctx.moveTo(ox, r * 0.38);
      ctx.lineTo(ox + len, r * 0.38);
      ctx.stroke();
      // optioneel: korte aardstreepjes onder het symbool (beschermingsgeleider)
      if (i === count - 1) {
        const y = r * 0.95;
        ctx.beginPath();
        ctx.moveTo(cx - r * 0.35, y);
        ctx.lineTo(cx + r * 0.55, y);
        ctx.moveTo(cx - r * 0.2, y + r * 0.22);
        ctx.lineTo(cx + r * 0.4, y + r * 0.22);
        ctx.moveTo(cx - r * 0.05, y + r * 0.42);
        ctx.lineTo(cx + r * 0.25, y + r * 0.42);
        ctx.stroke();
      }
    }
  }
}

/** Combinatie schakelaar + WCD. */
function drawCombo(ctx: CanvasRenderingContext2D, s: number): void {
  // schakelaar links-boven
  const r = s * 0.14;
  ctx.beginPath();
  ctx.arc(-r * 0.8, -r * 0.6, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 0.3, -r * 0.9);
  ctx.lineTo(r * 0.9, -r * 2.0);
  ctx.stroke();
  // socket onder
  ctx.beginPath();
  ctx.moveTo(-r * 1.6, r * 1.1);
  ctx.lineTo(r * 0.2, r * 1.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.7, r * 1.1, r * 0.7, -Math.PI * 0.75, Math.PI * 0.75, false);
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

/** TL: langwerpige buis met eindkappen. */
function drawTl(ctx: CanvasRenderingContext2D, s: number): void {
  const w = s * 0.7;
  const h = s * 0.2;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.beginPath();
  ctx.moveTo(-w / 2 - s * 0.1, 0);
  ctx.lineTo(-w / 2, 0);
  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w / 2 + s * 0.1, 0);
  ctx.stroke();
}

/** Meterkast op plattegrond: rechthoek "mk". */
function drawMeterkast(ctx: CanvasRenderingContext2D, s: number, fontW: number): void {
  const w = s * 0.7;
  const h = s * 0.45;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  // driehoekje onder (opening/deur hint)
  ctx.beginPath();
  ctx.moveTo(-w * 0.15, h / 2);
  ctx.lineTo(0, h / 2 + s * 0.15);
  ctx.lineTo(w * 0.15, h / 2);
  ctx.stroke();
  ctx.font = `700 ${fontW}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('mk', 0, 0);
}

/** Lasdoos: open cirkel. */
function drawJunction(ctx: CanvasRenderingContext2D, s: number): void {
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
  ctx.stroke();
}
