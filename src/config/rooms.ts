/**
 * Kamerregels — pas hier aan zonder de rest van de app te doorzoeken.
 * Eenheden: m² (binnenmaat), m (deur).
 */
export type RoomTypeDef = {
  id: string;
  /** Korte code in UI */
  code: string;
  labelNl: string;
  labelEn: string;
  /** Minimale netto vloeroppervlakte (m²). 0 = geen minimum. */
  minAreaM2: number;
  /** Eigen toegangsdeur verplicht? */
  requireDoor: boolean;
};

export const ROOM_CONFIG = {
  /** Standaard deurbreedte bij nieuwe deuren / splits */
  defaultDoorWidthM: 0.9,

  /** Min. aantal deuren per kamer als requireDoor true */
  minDoorsPerRoom: 1,

  types: [
    {
      id: 'single',
      code: '1p',
      labelNl: '1-persoons',
      labelEn: 'Single',
      minAreaM2: 3.5,
      requireDoor: true,
    },
    {
      id: 'double',
      code: '2p',
      labelNl: '2-persoons',
      labelEn: 'Double',
      minAreaM2: 7,
      requireDoor: true,
    },
    {
      id: 'other',
      code: '—',
      labelNl: 'Overig / gang',
      labelEn: 'Other / hall',
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
