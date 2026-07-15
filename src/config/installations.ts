/**
 * Installatie-componenten — Elektra (NL installatieplattegrond).
 */
import type { ElectraSymbolId } from '../canvas/symbols';

export type InstallCategory = 'electric' | 'water' | 'drain';

/** Submenu binnen Elektra. */
export type ElectraGroup = 'switchgear' | 'supply' | 'cables' | 'standard';

export type InstallComponentDef = {
  id: string;
  category: InstallCategory;
  group?: ElectraGroup;
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

export const ELECTRA_GROUP_META: { id: ElectraGroup; labelNl: string }[] = [
  { id: 'switchgear', labelNl: 'Schakelmateriaal' },
  { id: 'supply', labelNl: 'Voedingen' },
  { id: 'cables', labelNl: 'Leidingen' },
  { id: 'standard', labelNl: 'Standaard' },
];

export const INSTALL_CATALOG: InstallComponentDef[] = [
  // —— altijd zichtbaar (primary) ——
  {
    id: 'el-socket-pe',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Enkele WCD randaarde',
    code: 'WCD',
    color: '#e8eef7',
    symbol: 'socket-pe',
  },
  {
    id: 'el-socket-2',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Dubbele WCD randaarde',
    code: 'WCD2',
    color: '#e8eef7',
    symbol: 'socket-double',
  },
  {
    id: 'el-centraal',
    category: 'electric',
    group: 'standard',
    labelNl: 'Centraaldoos',
    code: 'CD',
    color: '#e8eef7',
    symbol: 'centraal',
  },
  {
    id: 'el-light',
    category: 'electric',
    group: 'standard',
    labelNl: 'Lamp / lichtpunt',
    code: 'LP',
    color: '#e8eef7',
    symbol: 'light',
  },
  {
    id: 'el-switch-w',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Wisselschakelaar',
    code: 'SW',
    color: '#e8eef7',
    symbol: 'switch-wissel',
  },
  {
    id: 'el-switch',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Schakelaar (1-polig)',
    code: 'S',
    color: '#e8eef7',
    symbol: 'switch-1p',
  },

  // —— Schakelmateriaal (overig) ——
  {
    id: 'el-switch-2',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Tweepolige schakelaar',
    code: 'S2',
    color: '#e8eef7',
    symbol: 'switch-2p',
  },
  {
    id: 'el-switch-x',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Kruisschakelaar',
    code: 'SX',
    color: '#e8eef7',
    symbol: 'switch-kruis',
  },
  {
    id: 'el-switch-ser',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Serieschakelaar',
    code: 'SS',
    color: '#e8eef7',
    symbol: 'switch-serie',
  },
  {
    id: 'el-dimmer',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Dimmer',
    code: 'DIM',
    color: '#e8eef7',
    symbol: 'dimmer',
  },
  {
    id: 'el-push',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Drukknop',
    code: 'DK',
    color: '#e8eef7',
    symbol: 'pushbutton',
  },
  {
    id: 'el-combo',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Schakelaar + WCD',
    code: 'S+W',
    color: '#e8eef7',
    symbol: 'combo-sw-socket',
  },
  {
    id: 'el-socket',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'WCD zonder aarding',
    code: 'WCD0',
    color: '#e8eef7',
    symbol: 'socket',
  },
  {
    id: 'el-socket-4',
    category: 'electric',
    group: 'switchgear',
    labelNl: 'Viervoudige WCD randaarde',
    code: 'WCD4',
    color: '#e8eef7',
    symbol: 'socket-quad',
  },

  // —— Voedingen ——
  {
    id: 'el-mk',
    category: 'electric',
    group: 'supply',
    labelNl: 'Meterkast',
    code: 'MK',
    color: '#ffd166',
    symbol: 'meterkast',
  },
  {
    id: 'el-centraal-light',
    category: 'electric',
    group: 'supply',
    labelNl: 'Centraaldoos met lichtpunt',
    code: 'CD+L',
    color: '#e8eef7',
    symbol: 'centraal-light',
  },

  // —— Leidingen ——
  {
    id: 'el-cable-empty',
    category: 'electric',
    group: 'cables',
    labelNl: 'Loze leiding',
    code: 'LL',
    color: '#e8eef7',
    symbol: 'cable-empty',
  },
  {
    id: 'el-cable-wired',
    category: 'electric',
    group: 'cables',
    labelNl: 'Bedrade leiding',
    code: 'BL',
    color: '#e8eef7',
    symbol: 'cable-wired',
  },
  {
    id: 'el-cable-earth',
    category: 'electric',
    group: 'cables',
    labelNl: 'Leiding met aarding',
    code: 'LA',
    color: '#e8eef7',
    symbol: 'cable-earth',
  },

  // —— Standaard (overig) ——
  {
    id: 'el-light-sig',
    category: 'electric',
    group: 'standard',
    labelNl: 'Lichtpunt signalering',
    code: 'LS',
    color: '#e8eef7',
    symbol: 'light-signal',
  },
  {
    id: 'el-tl',
    category: 'electric',
    group: 'standard',
    labelNl: 'TL-verlichting',
    code: 'TL',
    color: '#e8eef7',
    symbol: 'light-tl',
  },
  {
    id: 'el-junction',
    category: 'electric',
    group: 'standard',
    labelNl: 'Lasdoos',
    code: 'LD',
    color: '#e8eef7',
    symbol: 'junction',
  },
];

/** Altijd zichtbaar in Electra-balk. */
export const ELECTRA_PRIMARY_IDS: string[] = [
  'el-socket-pe', // enkele WCD randaarde
  'el-socket-2', // dubbele WCD randaarde
  'el-centraal', // centraaldoos
  'el-light', // lamp
  'el-switch-w', // wissel
  'el-switch', // schakelaar
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

/** Items in een Electra-groep, exclusief primary-pins. */
export function electraGroupItems(group: ElectraGroup): InstallComponentDef[] {
  const p = new Set(ELECTRA_PRIMARY_IDS);
  return INSTALL_CATALOG.filter(
    (c) => c.category === 'electric' && c.group === group && !p.has(c.id),
  );
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
