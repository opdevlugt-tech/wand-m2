/**
 * Installatie-componenten — start: Elektrische installatie (NL-norm pictogrammen).
 * Water/afvoer later per categorie.
 */
import type { ElectraSymbolId } from '../canvas/symbols';

export type InstallCategory = 'electric' | 'water' | 'drain';

export type InstallComponentDef = {
  id: string;
  category: InstallCategory;
  labelNl: string;
  /** Korte code in lijsten */
  code: string;
  color: string;
  /** Electra: welk NEN-achtig pictogram */
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

/** Catalogus — Electra eerst volledig; water/afvoer placeholders. */
export const INSTALL_CATALOG: InstallComponentDef[] = [
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
    labelNl: 'Wandcontactdoos dubbel',
    code: 'WCD2',
    color: '#e8eef7',
    symbol: 'socket-double',
  },
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
    labelNl: 'Schakelaar (wissel/dubbel)',
    code: 'S2',
    color: '#e8eef7',
    symbol: 'switch-double',
  },
  {
    id: 'el-light',
    category: 'electric',
    labelNl: 'Lichtpunt plafond',
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
    id: 'el-panel',
    category: 'electric',
    labelNl: 'Groepenkast',
    code: 'GK',
    color: '#ffd166',
    symbol: 'panel',
  },
  {
    id: 'el-data',
    category: 'electric',
    labelNl: 'Data-aansluiting',
    code: 'DATA',
    color: '#6cb6ff',
    symbol: 'data',
  },
  {
    id: 'el-thermo',
    category: 'electric',
    labelNl: 'Ruimtethermostaat',
    code: 'RT',
    color: '#e8eef7',
    symbol: 'thermostat',
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
  /** Rotatie in graden (toekomst) */
  rot?: number;
};

let placeSeq = 1;
export function newPlaceId(): string {
  return `I${placeSeq++}`;
}

export const INSTALL_HIT_R = 14;
