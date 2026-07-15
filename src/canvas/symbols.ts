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
 * Wandcontactdoos (NL installatieplattegrond).
 * Bron: elektraklus WCD-enkel-randaarde.png / WCD-dubbel-randaarde.png
 *
 *   zonder aarding:  │ + ∩   (steel + boog opening omlaag)
 *   met randaarde:   │ + ─ + ∩  (extra horizontale balk)
 *   meervoudig: meerdere ∩ onder elkaar
 *
 * Canvas y↓: ∩ = arc van π→0 met de klok mee (door de BOVENKANT).
 */
function drawSocketC(
  ctx: CanvasRenderingContext2D,
  s: number,
  count: 1 | 2 | 4,
  pe: boolean,
): void {
  const r = s * 0.32;
  const stemH = s * 0.42;
  // top of first arc (where stem meets bar/arc)
  const y0 = 0;

  // verticale steel omhoog vanaf boogtop
  ctx.beginPath();
  ctx.moveTo(0, y0 - stemH);
  ctx.lineTo(0, y0);
  ctx.stroke();

  if (pe) {
    // randaarde = horizontale balk door top van de boog
    const barW = r * 1.15;
    ctx.beginPath();
    ctx.moveTo(-barW, y0);
    ctx.lineTo(barW, y0);
    ctx.stroke();
  }

  // ∩ halfcirkels (opening naar BENEDEN) — zoals de referentie-PNG
  for (let i = 0; i < count; i++) {
    const cy = y0 + i * (r * 1.2);
    ctx.beginPath();
    // π (links) → 0 (rechts) clockwise = door bovenkant = ∩
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
  // WCD randaarde eronder
  ctx.beginPath();
  ctx.moveTo(0, -r * 1.1);
  ctx.lineTo(0, r * 0.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 1.5, r * 0.1);
  ctx.lineTo(r * 1.5, r * 0.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, r * 0.15, r * 1.35, Math.PI, 0, false);
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
