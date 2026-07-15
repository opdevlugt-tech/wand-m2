/**
 * Kamerregels & labels — pas hier aan zonder de rest van de app te doorzoeken.
 * Eenheden: m² (binnenmaat), m (deur).
 */
export type RoomTypeDef = {
  id: string;
  /** Korte code in UI / badge */
  code: string;
  labelNl: string;
  labelEn: string;
  /** Minimale netto vloeroppervlakte (m²). 0 = geen minimum. */
  minAreaM2: number;
  /** Eigen toegangsdeur verplicht? */
  requireDoor: boolean;
};

/** Snelkeuze ruimte-ID’s (ook als vrije tekst te overschrijven). */
export const ROOM_NAME_PRESETS_NL = [
  'Slaapkamer',
  'Slaapkamer 1p',
  'Slaapkamer 2p',
  'Gang',
  'Badkamer',
  'Toilet',
  'Woonkamer',
  'Keuken',
  'Berging',
  'Kantoor',
  'Techniek',
  'Entree',
  'Balkon',
  'Overig',
] as const;

export const ROOM_CONFIG = {
  defaultDoorWidthM: 0.9,
  tileSizeM: 0.3,
  majorGridM: 1,
  minDoorsPerRoom: 1,

  types: [
    {
      id: 'bedroom1',
      code: '1p',
      labelNl: 'Slaapkamer 1p',
      labelEn: 'Bedroom 1p',
      minAreaM2: 3.5,
      requireDoor: true,
    },
    {
      id: 'bedroom2',
      code: '2p',
      labelNl: 'Slaapkamer 2p',
      labelEn: 'Bedroom 2p',
      minAreaM2: 7,
      requireDoor: true,
    },
    {
      id: 'hall',
      code: 'GANG',
      labelNl: 'Gang',
      labelEn: 'Hall',
      minAreaM2: 0,
      requireDoor: false,
    },
    {
      id: 'bath',
      code: 'BAD',
      labelNl: 'Badkamer',
      labelEn: 'Bathroom',
      minAreaM2: 0,
      requireDoor: true,
    },
    {
      id: 'toilet',
      code: 'WC',
      labelNl: 'Toilet',
      labelEn: 'Toilet',
      minAreaM2: 0,
      requireDoor: true,
    },
    {
      id: 'living',
      code: 'WOON',
      labelNl: 'Woonkamer',
      labelEn: 'Living',
      minAreaM2: 0,
      requireDoor: false,
    },
    {
      id: 'kitchen',
      code: 'KEU',
      labelNl: 'Keuken',
      labelEn: 'Kitchen',
      minAreaM2: 0,
      requireDoor: false,
    },
    {
      id: 'storage',
      code: 'BERG',
      labelNl: 'Berging',
      labelEn: 'Storage',
      minAreaM2: 0,
      requireDoor: false,
    },
    {
      id: 'office',
      code: 'KANT',
      labelNl: 'Kantoor',
      labelEn: 'Office',
      minAreaM2: 0,
      requireDoor: true,
    },
    {
      id: 'other',
      code: '—',
      labelNl: 'Overig',
      labelEn: 'Other',
      minAreaM2: 0,
      requireDoor: false,
    },
  ] as RoomTypeDef[],

  defaultTypeId: 'other' as string,
};

export function getRoomType(id: string | null | undefined): RoomTypeDef {
  const found = ROOM_CONFIG.types.find((t) => t.id === id);
  return found ?? ROOM_CONFIG.types.find((t) => t.id === ROOM_CONFIG.defaultTypeId)!;
}

/** Display name: free text wins, else type label. */
export function roomDisplayName(
  name: string | null | undefined,
  roomTypeId: string | null | undefined,
  lang: 'nl' | 'en' = 'nl',
): string {
  const trimmed = (name ?? '').trim();
  if (trimmed) return trimmed;
  const t = getRoomType(roomTypeId);
  return lang === 'en' ? t.labelEn : t.labelNl;
}
