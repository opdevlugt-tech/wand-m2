/**
 * Installatie-componenten — Elektra volgens Kenteq "Tekening"-symbolen.
 * Bron: https://leermiddelenshop.kenteq.nl/Previews/8882292149368.pdf
 */
import type { ElectraSymbolId } from '../canvas/symbols';

export type InstallCategory = 'electric' | 'water' | 'drain';

export type InstallComponentDef = {
  id: string;
  category: InstallCategory;
  labelNl: string;
  code: string;
  color: string;
  symbol: ElectraSymbolId;
};

export const INSTALL_CATEGORIES = [
  { id: 'electric' as const, labelNl: 'Elektrische installatie', short: 'Elektra' },
  { id: 'water' as const, labelNl: 'Waterinstallatie', short: 'Water' },
  { id: 'drain' as const, labelNl: 'Afvoerinstallatie', short: 'Afvoer' },
];

export const INSTALL_CATALOG: InstallComponentDef[] = [
  {
    id: 'el-socket-pe',
    category: 'electric',
    labelNl: 'Wandcontactdoos met aarding',
    code: 'WCD⊥',
    color: '#e8eef7',
    symbol: 'socket-pe',
  },
  {
    id: 'el-socket',
    category: 'electric',
    labelNl: 'Wandcontactdoos',
    code: 'WCD',
    color: '#e8eef7',
    symbol: 'socket',
  },
  {
    id: 'el-socket-2',
    category: 'electric',
    labelNl: 'Dubbele wandcontactdoos',
    code: 'WCD2',
    color: '#e8eef7',
    symbol: 'socket-double',
  },
  {
    id: 'el-socket-4',
    category: 'electric',
    labelNl: 'Viervoudige contactdoos',
    code: 'WCD4',
    color: '#e8eef7',
    symbol: 'socket-quad',
  },
  {
    id: 'el-switch',
    category: 'electric',
    labelNl: 'Éénpolige schakelaar',
    code: 'S1',
    color: '#e8eef7',
    symbol: 'switch-1p',
  },
  {
    id: 'el-switch-2',
    category: 'electric',
    labelNl: 'Tweepolige schakelaar',
    code: 'S2',
    color: '#e8eef7',
    symbol: 'switch-2p',
  },
  {
    id: 'el-switch-w',
    category: 'electric',
    labelNl: 'Wisselschakelaar',
    code: 'SW',
    color: '#e8eef7',
    symbol: 'switch-wissel',
  },
  {
    id: 'el-switch-x',
    category: 'electric',
    labelNl: 'Kruisschakelaar',
    code: 'SX',
    color: '#e8eef7',
    symbol: 'switch-kruis',
  },
  {
    id: 'el-switch-ser',
    category: 'electric',
    labelNl: 'Serieschakelaar',
    code: 'SS',
    color: '#e8eef7',
    symbol: 'switch-serie',
  },
  {
    id: 'el-dimmer',
    category: 'electric',
    labelNl: 'Dimmer',
    code: 'DIM',
    color: '#e8eef7',
    symbol: 'dimmer',
  },
  {
    id: 'el-push',
    category: 'electric',
    labelNl: 'Drukknop',
    code: 'DK',
    color: '#e8eef7',
    symbol: 'pushbutton',
  },
  {
    id: 'el-combo',
    category: 'electric',
    labelNl: 'Schakelaar + WCD combinatie',
    code: 'S+W',
    color: '#e8eef7',
    symbol: 'combo-sw-socket',
  },
  {
    id: 'el-light',
    category: 'electric',
    labelNl: 'Lichtpunt',
    code: 'LP',
    color: '#e8eef7',
    symbol: 'light',
  },
  {
    id: 'el-light-sig',
    category: 'electric',
    labelNl: 'Lichtpunt signalering',
    code: 'LS',
    color: '#e8eef7',
    symbol: 'light-signal',
  },
  {
    id: 'el-tl',
    category: 'electric',
    labelNl: 'TL-verlichting',
    code: 'TL',
    color: '#e8eef7',
    symbol: 'light-tl',
  },
  {
    id: 'el-mk',
    category: 'electric',
    labelNl: 'Meterkast',
    code: 'MK',
    color: '#ffd166',
    symbol: 'meterkast',
  },
  {
    id: 'el-junction',
    category: 'electric',
    labelNl: 'Lasdoos / verbindingsdoos',
    code: 'LD',
    color: '#e8eef7',
    symbol: 'junction',
  },
];

/** Meest gebruikt op plattegrond — vaste knoppen. */
export const ELECTRA_PRIMARY_IDS: string[] = [
  'el-socket-pe',
  'el-socket',
  'el-socket-2',
  'el-switch',
  'el-switch-w',
  'el-light',
  'el-push',
  'el-mk',
];

export function catalogByCategory(cat: InstallCategory): InstallComponentDef[] {
  return INSTALL_CATALOG.filter((c) => c.category === cat);
}

export function getInstallDef(id: string): InstallComponentDef | undefined {
  return INSTALL_CATALOG.find((c) => c.id === id);
}

export function electraPrimary(): InstallComponentDef[] {
  return ELECTRA_PRIMARY_IDS.map((id) => getInstallDef(id)).filter(
    (d): d is InstallComponentDef => !!d,
  );
}

export function electraSecondary(): InstallComponentDef[] {
  const p = new Set(ELECTRA_PRIMARY_IDS);
  return catalogByCategory('electric').filter((c) => !p.has(c.id));
}

export type PlacedInstall = {
  id: string;
  defId: string;
  x: number;
  y: number;
  loopId: string | null;
  note: string;
  rot?: number;
};

let placeSeq = 1;
export function newPlaceId(): string {
  return `I${placeSeq++}`;
}

export const INSTALL_HIT_R = 14;
