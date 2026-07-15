/**
 * Installatie-componenten — 3 categorieën.
 * Fase 2: catalogus + plaatsen op plattegrond.
 */

export type InstallCategory = 'electric' | 'water' | 'drain';

export type InstallComponentDef = {
  id: string;
  category: InstallCategory;
  labelNl: string;
  /** Korte code op tekening */
  code: string;
  /** Kleur (stroke/fill accent) */
  color: string;
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

/** Catalogus per categorie (uitbreidbaar). */
export const INSTALL_CATALOG: InstallComponentDef[] = [
  // Elektrisch
  {
    id: 'el-socket',
    category: 'electric',
    labelNl: 'Wandcontactdoos',
    code: 'WCD',
    color: '#ffd166',
  },
  {
    id: 'el-switch',
    category: 'electric',
    labelNl: 'Schakelaar',
    code: 'SCH',
    color: '#ffd166',
  },
  {
    id: 'el-light',
    category: 'electric',
    labelNl: 'Lichtpunt',
    code: 'LP',
    color: '#ffd166',
  },
  {
    id: 'el-panel',
    category: 'electric',
    labelNl: 'Groepenkast',
    code: 'GK',
    color: '#ff9f43',
  },
  {
    id: 'el-data',
    category: 'electric',
    labelNl: 'Data / UTP',
    code: 'DATA',
    color: '#6cb6ff',
  },
  // Water
  {
    id: 'wa-cold',
    category: 'water',
    labelNl: 'Koudwaterpunt',
    code: 'KW',
    color: '#6cb6ff',
  },
  {
    id: 'wa-hot',
    category: 'water',
    labelNl: 'Warmwaterpunt',
    code: 'WW',
    color: '#ff6b6b',
  },
  {
    id: 'wa-mixer',
    category: 'water',
    labelNl: 'Mengpunt',
    code: 'MP',
    color: '#c8a2ff',
  },
  {
    id: 'wa-boiler',
    category: 'water',
    labelNl: 'Boiler / geiser',
    code: 'BLR',
    color: '#ff8fab',
  },
  // Afvoer
  {
    id: 'dr-floor',
    category: 'drain',
    labelNl: 'Vloerput',
    code: 'VP',
    color: '#8b9bb0',
  },
  {
    id: 'dr-sink',
    category: 'drain',
    labelNl: 'Sifon / wastafel-afvoer',
    code: 'SIF',
    color: '#8b9bb0',
  },
  {
    id: 'dr-toilet',
    category: 'drain',
    labelNl: 'Toilet-aansluiting',
    code: 'WC',
    color: '#a0aec0',
  },
  {
    id: 'dr-stack',
    category: 'drain',
    labelNl: 'Standleiding',
    code: 'SL',
    color: '#718096',
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
  /** Optioneel gekoppeld aan loop-id */
  loopId: string | null;
  note: string;
};

let placeSeq = 1;
export function newPlaceId(): string {
  return `I${placeSeq++}`;
}
