/**
 * Elektrische symbolen — AREI-stijl (situatieschema / installatieplan).
 * Bron: https://www.gamma.be/nl/doe-het-zelf/a/symbolen-elektriciteit
 *
 * Vereenvoudigde lijntekeningen van de officiële symbolen (geen eendraadsschema-varianten).
 */
export type ElectraSymbolId =
  // D. Contactdozen
  | 'socket' // contactdoos algemeen
  | 'socket-multi' // meervoudige (3)
  | 'socket-pe' // met beschermingsgeleider
  | 'socket-child' // met kinderbescherming + PE
  | 'socket-switched' // met 2-polige schakelaar
  // C. Schakelaars
  | 'switch' // schakelaar algemeen / 1-polig
  | 'switch-2p' // tweepolig
  | 'switch-3p' // driepolig
  | 'switch-changeover' // eenpolige omschakelaar
  | 'switch-intermediate' // wisselschakelaar
  | 'switch-cross' // kruisschakelaar
  | 'dimmer'
  | 'pushbutton' // drukknop
  | 'pushbutton-light' // drukknop met verklikkerlamp
  // E. Verlichting e.a.
  | 'light' // lichtpunt / aansluitpunt verlichting
  | 'light-wall' // wandarmatuur (zelfde X + muurstreep)
  | 'fluorescent' // fluorescentie-armatuur
  | 'panel' // verdeelkast / bord
  | 'junction' // verbindings-/aftakdoos
  | 'bell' // bel
  | 'earth'; // aarding

/** Teken AREI-symbool; size ≈ bounding box. */
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
  const lw = Math.max(1.1, (opts?.strokeScale ?? 1) * (s / 16));

  ctx.save();
  ctx.translate(x, y);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = lw;
  ctx.strokeStyle = selected ? '#ffd166' : '#e8eef7';
  ctx.fillStyle = selected ? 'rgba(255,209,102,0.12)' : 'rgba(15,20,25,0.55)';

  // zacht hit-vlak
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.52, 0, Math.PI * 2);
  ctx.fill();

  switch (id) {
    case 'socket':
      drawSocket(ctx, s, 'plain');
      break;
    case 'socket-multi':
      drawSocket(ctx, s, 'multi');
      break;
    case 'socket-pe':
      drawSocket(ctx, s, 'pe');
      break;
    case 'socket-child':
      drawSocket(ctx, s, 'child');
      break;
    case 'socket-switched':
      drawSocket(ctx, s, 'switched');
      break;
    case 'switch':
      drawSwitch(ctx, s, 1);
      break;
    case 'switch-2p':
      drawSwitch(ctx, s, 2);
      break;
    case 'switch-3p':
      drawSwitch(ctx, s, 3);
      break;
    case 'switch-changeover':
      drawChangeover(ctx, s);
      break;
    case 'switch-intermediate':
      drawIntermediate(ctx, s);
      break;
    case 'switch-cross':
      drawCrossSwitch(ctx, s);
      break;
    case 'dimmer':
      drawDimmer(ctx, s);
      break;
    case 'pushbutton':
      drawPush(ctx, s, false);
      break;
    case 'pushbutton-light':
      drawPush(ctx, s, true);
      break;
    case 'light':
      drawLight(ctx, s, false);
      break;
    case 'light-wall':
      drawLight(ctx, s, true);
      break;
    case 'fluorescent':
      drawFluorescent(ctx, s);
      break;
    case 'panel':
      drawPanel(ctx, s);
      break;
    case 'junction':
      drawJunction(ctx, s);
      break;
    case 'bell':
      drawBell(ctx, s);
      break;
    case 'earth':
      drawEarth(ctx, s);
      break;
    default:
      drawSocket(ctx, s, 'plain');
  }

  if (selected) {
    ctx.strokeStyle = '#ffd166';
    ctx.lineWidth = lw * 0.75;
    ctx.setLineDash([s * 0.12, s * 0.08]);
    ctx.beginPath();
    ctx.arc(0, 0, s * 0.58, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  ctx.restore();
}

/**
 * D. Contactdoos — AREI: halfcirkel (opening naar beneden) + toevoerleiding L-vorm.
 * multi: + superscript 3; pe: + aardmarkering; child: gevulde boog; switched: + schakelaar.
 */
function drawSocket(
  ctx: CanvasRenderingContext2D,
  s: number,
  kind: 'plain' | 'multi' | 'pe' | 'child' | 'switched',
): void {
  const r = s * 0.28;
  // L-toevoer: horizontaal links + verticaal omlaag naar boog
  ctx.beginPath();
  ctx.moveTo(-r * 1.35, -r * 0.85);
  ctx.lineTo(-r * 0.05, -r * 0.85);
  ctx.lineTo(-r * 0.05, -r * 0.15);
  ctx.stroke();

  // halfcirkel (opening naar beneden) — AREI contactdoos
  ctx.beginPath();
  ctx.arc(0, 0, r, Math.PI * 1.05, Math.PI * -0.05, false);
  ctx.stroke();

  if (kind === 'child') {
    // gevulde onderboog (kinderbescherming)
    ctx.beginPath();
    ctx.arc(0, 0, r * 0.55, 0.15 * Math.PI, 0.85 * Math.PI, false);
    ctx.fillStyle = ctx.strokeStyle as string;
    ctx.fill();
  }

  if (kind === 'pe' || kind === 'child') {
    // aardmarkering onder boog (horiz. streepjes)
    const y = r * 0.55;
    ctx.beginPath();
    ctx.moveTo(-r * 0.45, y);
    ctx.lineTo(r * 0.45, y);
    ctx.moveTo(-r * 0.3, y + r * 0.22);
    ctx.lineTo(r * 0.3, y + r * 0.22);
    ctx.moveTo(-r * 0.15, y + r * 0.42);
    ctx.lineTo(r * 0.15, y + r * 0.42);
    ctx.stroke();
  }

  if (kind === 'multi') {
    ctx.font = `700 ${s * 0.28}px system-ui,sans-serif`;
    ctx.fillStyle = ctx.strokeStyle as string;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'bottom';
    ctx.fillText('3', r * 0.75, -r * 0.35);
  }

  if (kind === 'switched') {
    // kleine schakelaar-arm op de toevoer
    ctx.beginPath();
    ctx.arc(-r * 0.75, -r * 0.85, r * 0.22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-r * 0.75, -r * 0.85);
    ctx.lineTo(-r * 1.15, -r * 1.25);
    ctx.stroke();
  }
}

/**
 * C. Schakelaar — cirkel + schuine lijn; 2p/3p: schuine strepen op de lijn.
 */
function drawSwitch(ctx: CanvasRenderingContext2D, s: number, poles: 1 | 2 | 3): void {
  const r = s * 0.26;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  // schuine bedieningslijn door cirkel
  ctx.beginPath();
  ctx.moveTo(-r * 0.9, r * 0.85);
  ctx.lineTo(r * 1.15, -r * 0.95);
  ctx.stroke();
  if (poles >= 2) {
    // dwarse strepen op de lijn (2- of 3-polig)
    for (let i = 0; i < poles; i++) {
      const t = 0.35 + i * 0.18;
      const x = -r * 0.9 + t * (r * 2.05);
      const y = r * 0.85 + t * (-r * 1.8);
      const dx = 0.12 * r;
      const dy = 0.18 * r;
      ctx.beginPath();
      ctx.moveTo(x - dy, y - dx);
      ctx.lineTo(x + dy, y + dx);
      ctx.stroke();
    }
  }
}

/** Eenpolige omschakelaar: cirkel + V-vormige armen. */
function drawChangeover(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.26;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(-r * 0.9, -r * 1.0);
  ctx.moveTo(0, 0);
  ctx.lineTo(r * 0.9, -r * 1.0);
  ctx.moveTo(0, 0);
  ctx.lineTo(0, r * 1.05);
  ctx.stroke();
}

/** Wisselschakelaar: cirkel + lijn met knooppunten. */
function drawIntermediate(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.24;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 1.2, r * 0.7);
  ctx.lineTo(r * 1.15, -r * 0.85);
  ctx.stroke();
  // kleine open cirkels op uiteinden
  ctx.beginPath();
  ctx.arc(-r * 1.2, r * 0.7, r * 0.22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 1.15, -r * 0.85, r * 0.22, 0, Math.PI * 2);
  ctx.stroke();
}

/** Kruisschakelaar: X in cirkel. */
function drawCrossSwitch(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.28;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-r * 0.7, -r * 0.7);
  ctx.lineTo(r * 0.7, r * 0.7);
  ctx.moveTo(r * 0.7, -r * 0.7);
  ctx.lineTo(-r * 0.7, r * 0.7);
  ctx.stroke();
}

/** Dimmer: schakelaar + pijltje op de arm. */
function drawDimmer(ctx: CanvasRenderingContext2D, s: number): void {
  drawSwitch(ctx, s, 1);
  const r = s * 0.26;
  ctx.beginPath();
  ctx.moveTo(r * 0.55, -r * 0.55);
  ctx.lineTo(r * 1.05, -r * 1.05);
  ctx.lineTo(r * 0.7, -r * 1.05);
  ctx.moveTo(r * 1.05, -r * 1.05);
  ctx.lineTo(r * 1.05, -r * 0.7);
  ctx.stroke();
}

/** Drukknop: dubbele concentrische cirkel; met lamp: + kruis. */
function drawPush(ctx: CanvasRenderingContext2D, s: number, withLight: boolean): void {
  const r = s * 0.28;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.55, 0, Math.PI * 2);
  ctx.stroke();
  if (withLight) {
    ctx.beginPath();
    ctx.moveTo(-r * 0.35, -r * 0.35);
    ctx.lineTo(r * 0.35, r * 0.35);
    ctx.moveTo(r * 0.35, -r * 0.35);
    ctx.lineTo(-r * 0.35, r * 0.35);
    ctx.stroke();
  }
}

/**
 * E. Lichtpunt — lijn + X (aansluitpunt verlichtingstoestel).
 */
function drawLight(ctx: CanvasRenderingContext2D, s: number, wall: boolean): void {
  const arm = s * 0.32;
  ctx.beginPath();
  ctx.moveTo(-arm * 1.1, 0);
  ctx.lineTo(arm * 0.15, 0);
  ctx.stroke();
  // X
  const x0 = arm * 0.15;
  const k = arm * 0.45;
  ctx.beginPath();
  ctx.moveTo(x0 - k * 0.5, -k * 0.5);
  ctx.lineTo(x0 + k * 0.5, k * 0.5);
  ctx.moveTo(x0 + k * 0.5, -k * 0.5);
  ctx.lineTo(x0 - k * 0.5, k * 0.5);
  ctx.stroke();
  if (wall) {
    ctx.beginPath();
    ctx.moveTo(-arm * 1.1, -arm * 0.55);
    ctx.lineTo(-arm * 1.1, arm * 0.55);
    // muurtanden
    for (let i = -2; i <= 2; i++) {
      const yy = i * arm * 0.22;
      ctx.moveTo(-arm * 1.1, yy);
      ctx.lineTo(-arm * 1.35, yy + arm * 0.12);
    }
    ctx.stroke();
  }
}

/** Fluorescentie-armatuur: langwerpige open rechthoek. */
function drawFluorescent(ctx: CanvasRenderingContext2D, s: number): void {
  const w = s * 0.7;
  const h = s * 0.22;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  ctx.beginPath();
  ctx.moveTo(-w / 2 - s * 0.12, 0);
  ctx.lineTo(-w / 2, 0);
  ctx.stroke();
}

/** Verdeelkast / bord: rechthoek. */
function drawPanel(ctx: CanvasRenderingContext2D, s: number): void {
  const w = s * 0.55;
  const h = s * 0.38;
  ctx.strokeRect(-w / 2, -h / 2, w, h);
  // kleine pootjes (aansluitingen)
  ctx.beginPath();
  ctx.moveTo(-w * 0.25, h / 2);
  ctx.lineTo(-w * 0.25, h / 2 + s * 0.12);
  ctx.moveTo(w * 0.25, h / 2);
  ctx.lineTo(w * 0.25, h / 2 + s * 0.12);
  ctx.stroke();
}

/** Verbindings-/aftakdoos: cirkel met middenpunt. */
function drawJunction(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.28;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = ctx.strokeStyle as string;
  ctx.fill();
}

/** Bel: lijn + belvorm (D-achtig). */
function drawBell(ctx: CanvasRenderingContext2D, s: number): void {
  const r = s * 0.28;
  ctx.beginPath();
  ctx.moveTo(-r * 1.1, 0);
  ctx.lineTo(-r * 0.2, 0);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.15, 0, r * 0.55, -Math.PI * 0.55, Math.PI * 0.55, false);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(r * 0.15, -r * 0.55);
  ctx.lineTo(r * 0.15, r * 0.55);
  ctx.stroke();
}

/** Aarding: verticale lijn + 3 horizontale. */
function drawEarth(ctx: CanvasRenderingContext2D, s: number): void {
  const u = s * 0.22;
  ctx.beginPath();
  ctx.moveTo(0, -u * 1.4);
  ctx.lineTo(0, u * 0.2);
  ctx.moveTo(-u * 0.9, u * 0.2);
  ctx.lineTo(u * 0.9, u * 0.2);
  ctx.moveTo(-u * 0.6, u * 0.55);
  ctx.lineTo(u * 0.6, u * 0.55);
  ctx.moveTo(-u * 0.3, u * 0.9);
  ctx.lineTo(u * 0.3, u * 0.9);
  ctx.stroke();
}
