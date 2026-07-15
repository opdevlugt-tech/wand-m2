/**
 * Installatie-componenten — Elektra volgens AREI / Gamma-symbolen.
 * Bron: https://www.gamma.be/nl/doe-het-zelf/a/symbolen-elektriciteit
 * Water/afvoer later.
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

export const INSTALL_CATEGORIES: {
  id: InstallCategory;
  labelNl: string;
  short: string;
}[] = [
  { id: 'electric', labelNl: 'Elektrische installatie', short: 'Elektra' },
  { id: 'water', labelNl: 'Waterinstallatie', short: 'Water' },
  { id: 'drain', labelNl: 'Afvoerinstallatie', short: 'Afvoer' },
];

/** Electra-catalogus (situatieschema-symbolen). */
export const INSTALL_CATALOG: InstallComponentDef[] = [
  // Contactdozen (D)
  {
    id: 'el-socket',
    category: 'electric',
    labelNl: 'Contactdoos',
    code: 'CD',
    color: '#e8eef7',
    symbol: 'socket',
  },
  {
    id: 'el-socket-3',
    category: 'electric',
    labelNl: 'Contactdoos meervoudig (3)',
    code: 'CD3',
    color: '#e8eef7',
    symbol: 'socket-multi',
  },
  {
    id: 'el-socket-pe',
    category: 'electric',
    labelNl: 'Contactdoos met aarding',
    code: 'CD⊥',
    color: '#e8eef7',
    symbol: 'socket-pe',
  },
  {
    id: 'el-socket-child',
    category: 'electric',
    labelNl: 'Contactdoos kinderbeveiliging',
    code: 'CDK',
    color: '#e8eef7',
    symbol: 'socket-child',
  },
  {
    id: 'el-socket-sw',
    category: 'electric',
    labelNl: 'Contactdoos met schakelaar',
    code: 'CDS',
    color: '#e8eef7',
    symbol: 'socket-switched',
  },
  // Schakelaars (C)
  {
    id: 'el-switch',
    category: 'electric',
    labelNl: 'Schakelaar (1-polig)',
    code: 'S1',
    color: '#e8eef7',
    symbol: 'switch',
  },
  {
    id: 'el-switch-2',
    category: 'electric',
    labelNl: 'Schakelaar 2-polig',
    code: 'S2',
    color: '#e8eef7',
    symbol: 'switch-2p',
  },
  {
    id: 'el-switch-3',
    category: 'electric',
    labelNl: 'Schakelaar 3-polig',
    code: 'S3',
    color: '#e8eef7',
    symbol: 'switch-3p',
  },
  {
    id: 'el-switch-co',
    category: 'electric',
    labelNl: 'Omschakelaar',
    code: 'SO',
    color: '#e8eef7',
    symbol: 'switch-changeover',
  },
  {
    id: 'el-switch-w',
    category: 'electric',
    labelNl: 'Wisselschakelaar',
    code: 'SW',
    color: '#e8eef7',
    symbol: 'switch-intermediate',
  },
  {
    id: 'el-switch-x',
    category: 'electric',
    labelNl: 'Kruisschakelaar',
    code: 'SX',
    color: '#e8eef7',
    symbol: 'switch-cross',
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
    id: 'el-push-l',
    category: 'electric',
    labelNl: 'Drukknop met lamp',
    code: 'DKL',
    color: '#e8eef7',
    symbol: 'pushbutton-light',
  },
  // Verlichting / toestellen (E)
  {
    id: 'el-light',
    category: 'electric',
    labelNl: 'Lichtpunt',
    code: 'LP',
    color: '#e8eef7',
    symbol: 'light',
  },
  {
    id: 'el-light-wall',
    category: 'electric',
    labelNl: 'Wandlichtpunt',
    code: 'WL',
    color: '#e8eef7',
    symbol: 'light-wall',
  },
  {
    id: 'el-fluo',
    category: 'electric',
    labelNl: 'Fluorescentie-armatuur',
    code: 'FL',
    color: '#e8eef7',
    symbol: 'fluorescent',
  },
  {
    id: 'el-panel',
    category: 'electric',
    labelNl: 'Verdeelkast / bord',
    code: 'VK',
    color: '#ffd166',
    symbol: 'panel',
  },
  {
    id: 'el-junction',
    category: 'electric',
    labelNl: 'Verbindingsdoos',
    code: 'VD',
    color: '#e8eef7',
    symbol: 'junction',
  },
  {
    id: 'el-bell',
    category: 'electric',
    labelNl: 'Bel',
    code: 'BEL',
    color: '#e8eef7',
    symbol: 'bell',
  },
  {
    id: 'el-earth',
    category: 'electric',
    labelNl: 'Aarding',
    code: '⊥',
    color: '#3dd68c',
    symbol: 'earth',
  },
];

export function catalogByCategory(cat: InstallCategory): InstallComponentDef[] {
  return INSTALL_CATALOG.filter((c) => c.category === cat);
}

export function getInstallDef(id: string): InstallComponentDef | undefined {
  return INSTALL_CATALOG.find((c) => c.id === id);
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
