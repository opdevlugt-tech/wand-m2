export type Lang = 'nl' | 'en' | 'es' | 'pl' | 'ru';

export type LangMeta = {
  code: Lang;
  flag: string;
  name: string;
};

export const LANGS: LangMeta[] = [
  { code: 'nl', flag: '🇳🇱', name: 'Nederlands' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'pl', flag: '🇵🇱', name: 'Polski' },
  { code: 'ru', flag: '🇷🇺', name: 'Русский' },
];

export type Dict = {
  pageTitle: string;
  statusEmpty: string;
  statusDrawing: string;
  statusOpen: (walls: number) => string;
  statusWallSelected: string;
  statusCorner: (deg: string) => string;
  statusClosed: (area: string) => string;
  statusClosedWall: (area: string) => string;
  statusClosedCorner: (area: string, deg: string) => string;
  statusClosedOdd: (area: string, odds: string) => string;
  statusMeetfoutAt: (n: number) => string;
  statusDoor: (w: string) => string;
  statusIdle: string;
  statusPartitionDraw: string;
  wallM: string;
  doorM: string;
  addDoor: string;
  removeDoor: string;
  doorHingeL: string;
  doorHingeR: string;
  doorSwing: string;
  statusDoorDetail: (w: string, hinge: string, swing: string) => string;
  splitLoop: string;
  splitKicker: string;
  splitTitle: string;
  splitLead: (n: number) => string;
  splitLeadEqual: string;
  splitApply: string;
  splitCancel: string;
  splitNone: string;
  splitByN: (n: number) => string;
  splitFlipAxis: string;
  splitFree: string;
  statusSplit: (n: number) => string;
  statusSplitParts: (n: number) => string;
  interiorDeg: string;
  snapTitle: string;
  snapBtn: string;
  pxPerM: string;
  undo: string;
  reset: string;
  dragTitle: string;
  meetfoutKicker: string;
  meetfoutTitle: string;
  meetfoutLead: (n: number) => string;
  ignore: string;
  confirm: string;
  relocate: string;
  relocateHint: string;
  back: string;
  applyHere: string;
  cornerN: (n: number) => string;
  residual: string;
  hoverCorner: (n: number) => string;
  hint: string;
};

export const translations: Record<Lang, Dict> = {
  nl: {
    pageTitle: 'Wand-m²',
    statusEmpty: 'Teken wanden · sluit lus · daarna nieuwe lus of maten per lijn',
    statusDrawing: 'Bezig… snapt 45° · dicht bij start = lus sluiten',
    statusOpen: (walls) => `Open lus · ${walls} muur(en) · sluit of teken verder`,
    statusWallSelected: 'Muur geselecteerd · typ lengte (m) om maat aan te passen',
    statusCorner: (deg) => `Binnenhoek ${deg}`,
    statusClosed: (area) => `Gesloten · ${area} · teken nieuwe lus of klik lijn`,
    statusClosedWall: (area) => `${area} · typ muurlengte (m) om lijn aan te passen`,
    statusClosedCorner: (area, deg) => `Gesloten · ${area} · binnenhoek ${deg}`,
    statusClosedOdd: (area, odds) => `Gesloten · ${area} · afwijkend: ${odds}`,
    statusMeetfoutAt: (n) => `Meetfout bij hoek ${n} · overige naar 45°/90°/135°`,
    statusDoor: (w) => `Deur ${w} · sleep om te verplaatsen · typ breedte`,
    statusIdle: 'Klaar. Selecteer kamer · type · Deel… of ✂ Teken.',
    statusPartitionDraw:
      '✂ Deel kamer: 1) klik op wand 2) sleep rechte/45°/90° naar overkant 3) klik op die wand → 2 kamers. Esc = stop.',
    wallM: 'Muur (m)',
    doorM: 'Deur (m)',
    addDoor: '+ Deur',
    removeDoor: 'Deur weg',
    doorHingeL: 'L',
    doorHingeR: 'R',
    doorSwing: '↺',
    statusDoorDetail: (w, hinge, swing) =>
      `Deur ${w} · scharnier ${hinge} · ${swing} · sleep om te verplaatsen`,
    splitLoop: 'Deel…',
    splitKicker: 'Scheidingswand',
    splitTitle: 'Deel de lus',
    splitLead: (n) => `${n} vrije optie(s)`,
    splitLeadEqual: '÷2/÷3/÷4 = gelijke banen. Of kies vrije positie. Of sluit en gebruik ✂ Scheiding voor hoeken/schuin. Geen auto-deuren.',
    splitApply: 'Deel hier',
    splitCancel: 'Annuleren',
    splitNone: 'Geen geldige scheiding voor deze vorm.',
    splitByN: (n) => `Delen door ${n}`,
    splitFlipAxis: 'Wissel horizontaal/verticaal',
    splitFree: 'Of snelle positie (recht):',
    statusSplit: (n) => `Vrije scheiding: optie ${n}`,
    statusSplitParts: (n) => `Delen door ${n} · gelijke banen`,
    interiorDeg: 'Binnenhoek (°)',
    snapTitle: 'Zet binnenhoek op 45° / 90° / 135° (45°-raster)',
    snapBtn: '→45/90/135',
    pxPerM: 'px/m',
    undo: 'Undo',
    reset: 'Reset',
    dragTitle: 'Sleep om te verplaatsen',
    meetfoutKicker: 'Mogelijke meetfout',
    meetfoutTitle: 'Hoeken kloppen niet na sluiten',
    meetfoutLead: (n) =>
      `${n} binnenhoek(en) wijken af van 45°/90°/135° (rood). 135° = 45°-raster. Hover hoeknummer voor live vorm.`,
    ignore: 'Negeren',
    confirm: 'Bevestigen',
    relocate: 'Verplaatsen…',
    relocateHint:
      'Kies hoeknummer (hover = live vorm). Oranje stippellijn = origineel. Restfout naar gekozen hoek.',
    back: 'Terug',
    applyHere: 'Corrigeer hier',
    cornerN: (n) => `Hoek ${n}`,
    residual: 'restfout',
    hoverCorner: (n) => `Hover: live vorm met restfout bij hoek ${n}`,
    hint:
      '✂ Scheiding: rechte/45°/90° (snapt). Deel… = ÷2/3/4. Sleep muren. +Deur handmatig. Tegel 0,3 m.',
  },
  en: {
    pageTitle: 'Wall-m²',
    statusEmpty: 'Draw walls · close loop · then new loop or edit line lengths',
    statusDrawing: 'Drawing… snaps 45° · near start = close loop',
    statusOpen: (walls) => `Open loop · ${walls} wall(s)`,
    statusWallSelected: 'Wall selected · type length (m) to resize',
    statusCorner: (deg) => `Interior angle ${deg}`,
    statusClosed: (area) => `Closed · ${area} · draw new loop or tap a line`,
    statusClosedWall: (area) => `${area} · type wall length (m) to resize line`,
    statusClosedCorner: (area, deg) => `Closed · ${area} · interior ${deg}`,
    statusClosedOdd: (area, odds) => `Closed · ${area} · off-grid: ${odds}`,
    statusMeetfoutAt: (n) => `Error at corner ${n} · rest → 45°/90°/135°`,
        statusDoor: (w) => `Door ${w} · drag · type width`,
        statusIdle: 'Ready. Select room · type · Split… or ✂ Draw.',
        statusPartitionDraw:
          'Partition: 1st click on outer wall · corners inside · last click on other wall. Esc = cancel.',
        wallM: 'Wall (m)',
    doorM: 'Door (m)',
    addDoor: '+ Door',
    removeDoor: 'Remove door',
    doorHingeL: 'L',
    doorHingeR: 'R',
    doorSwing: '↺',
    statusDoorDetail: (w, hinge, swing) =>
      `Door ${w} · hinge ${hinge} · ${swing} · drag to move`,
    splitLoop: 'Split…',
    splitKicker: 'Partition wall',
    splitTitle: 'Split the loop',
    splitLead: (n) => `${n} free option(s)`,
    splitLeadEqual: 'Pick ÷2 / ÷3 / ÷4 (equal strips). Hover = preview. ↻ = flip axis.',
    splitApply: 'Split here',
    splitCancel: 'Cancel',
    splitNone: 'No valid partition for this shape.',
    splitByN: (n) => `Divide by ${n}`,
    splitFlipAxis: 'Toggle horizontal/vertical',
    splitFree: 'Or free position:',
    statusSplit: (n) => `Free partition: option ${n}`,
    statusSplitParts: (n) => `Divide by ${n} · equal strips`,
    interiorDeg: 'Interior (°)',
    snapTitle: 'Snap interior to 45° / 90° / 135°',
    snapBtn: '→45/90/135',
    pxPerM: 'px/m',
    undo: 'Undo',
    reset: 'Reset',
    dragTitle: 'Drag to move',
    meetfoutKicker: 'Possible measurement error',
    meetfoutTitle: 'Angles do not match after closing',
    meetfoutLead: (n) =>
      `${n} interior angle(s) off 45°/90°/135° (red). 135° is on the 45° grid. Hover a corner number for live shape.`,
    ignore: 'Ignore',
    confirm: 'Confirm',
    relocate: 'Move…',
    relocateHint:
      'Pick corner number (hover = live shape). Orange dashed = original. Residual goes to selected corner.',
    back: 'Back',
    applyHere: 'Fix here',
    cornerN: (n) => `Corner ${n}`,
    residual: 'residual',
    hoverCorner: (n) => `Hover: live shape with residual at corner ${n}`,
    hint:
      'Multiple loops. Select wall → + Door. Drag door, type width. Line lengths. Languages: flags.',
  },
  es: {
    pageTitle: 'Pared-m²',
    statusEmpty: 'Dibuja paredes · cierra en el punto de inicio',
    statusDrawing: 'Dibujando… ajuste 45° · cerca del inicio = cierre libre',
    statusOpen: (walls) => `Cadena abierta · ${walls} pared(es)`,
    statusWallSelected: 'Pared seleccionada · escribe longitud (m)',
    statusCorner: (deg) => `Ángulo interior ${deg}`,
    statusClosed: (area) => `Cerrado · ${area}`,
    statusClosedWall: (area) => `Cerrado · ${area} · escribe longitud (m)`,
    statusClosedCorner: (area, deg) => `Cerrado · ${area} · interior ${deg}`,
    statusClosedOdd: (area, odds) => `Cerrado · ${area} · fuera de rejilla: ${odds}`,
    statusMeetfoutAt: (n) => `Error en esquina ${n} · resto → 45°/90°/135°`,
    statusDoor: (w) => `Puerta ${w} · arrastra · escribe ancho`,
    statusIdle: 'Listo.',
    statusPartitionDraw: 'Tabique libre: muro → esquinas → muro. Esc = cancelar.',
    wallM: 'Pared (m)',
    doorM: 'Puerta (m)',
    addDoor: '+ Puerta',
    removeDoor: 'Quitar puerta',
    doorHingeL: 'L',
    doorHingeR: 'R',
    doorSwing: '↺',
    statusDoorDetail: (w, hinge, swing) =>
      `Puerta ${w} · bisagra ${hinge} · ${swing}`,
    splitLoop: 'Dividir…',
    splitKicker: 'Tabique',
    splitTitle: 'Dividir el bucle',
    splitLead: (n) => `${n} opción(es) libres`,
    splitLeadEqual: 'Elige ÷2 / ÷3 / ÷4. Hover = vista. ↻ = eje.',
    splitApply: 'Dividir aquí',
    splitCancel: 'Cancelar',
    splitNone: 'Sin partición válida.',
    splitByN: (n) => `Dividir en ${n}`,
    splitFlipAxis: 'Cambiar eje',
    splitFree: 'O posición libre:',
    statusSplit: (n) => `Libre: opción ${n}`,
    statusSplitParts: (n) => `Dividir en ${n}`,
    interiorDeg: 'Interior (°)',
    snapTitle: 'Ajustar interior a 45° / 90° / 135°',
    snapBtn: '→45/90/135',
    pxPerM: 'px/m',
    undo: 'Deshacer',
    reset: 'Reiniciar',
    dragTitle: 'Arrastra para mover',
    meetfoutKicker: 'Posible error de medida',
    meetfoutTitle: 'Los ángulos no coinciden al cerrar',
    meetfoutLead: (n) =>
      `${n} ángulo(s) fuera de 45°/90°/135° (rojo). 135° es válido (rejilla 45°). Pasa el ratón por el número.`,
    ignore: 'Ignorar',
    confirm: 'Confirmar',
    relocate: 'Mover…',
    relocateHint:
      'Elige número de esquina (hover = forma en vivo). Naranja discontinua = original.',
    back: 'Atrás',
    applyHere: 'Corregir aquí',
    cornerN: (n) => `Esquina ${n}`,
    residual: 'resto',
    hoverCorner: (n) => `Hover: forma en vivo con resto en esquina ${n}`,
    hint:
      'Verde = ok (45/90/135°), rojo = error. Popup a la izquierda (arrastrable). Idioma: banderas.',
  },
  pl: {
    pageTitle: 'Ściana-m²',
    statusEmpty: 'Rysuj ściany · zamknij w punkcie startu',
    statusDrawing: 'Rysowanie… snap 45° · blisko startu = swobodne zamknięcie',
    statusOpen: (walls) => `Otwarty łańcuch · ${walls} ścian(y)`,
    statusWallSelected: 'Wybrana ściana · wpisz długość (m)',
    statusCorner: (deg) => `Kąt wewnętrzny ${deg}`,
    statusClosed: (area) => `Zamknięte · ${area}`,
    statusClosedWall: (area) => `Zamknięte · ${area} · wpisz długość (m)`,
    statusClosedCorner: (area, deg) => `Zamknięte · ${area} · kąt ${deg}`,
    statusClosedOdd: (area, odds) => `Zamknięte · ${area} · poza siatką: ${odds}`,
    statusMeetfoutAt: (n) => `Błąd przy rogu ${n} · reszta → 45°/90°/135°`,
    statusDoor: (w) => `Drzwi ${w} · przeciągnij · wpisz szerokość`,
    statusIdle: 'Gotowe.',
    statusPartitionDraw: 'Ściana: mur → narożniki → mur. Esc = stop.',
    wallM: 'Ściana (m)',
    doorM: 'Drzwi (m)',
    addDoor: '+ Drzwi',
    removeDoor: 'Usuń drzwi',
    doorHingeL: 'L',
    doorHingeR: 'R',
    doorSwing: '↺',
    statusDoorDetail: (w, hinge, swing) =>
      `Drzwi ${w} · zawias ${hinge} · ${swing}`,
    splitLoop: 'Podziel…',
    splitKicker: 'Ściana działowa',
    splitTitle: 'Podziel pętlę',
    splitLead: (n) => `${n} wolnych opcji`,
    splitLeadEqual: 'Wybierz ÷2 / ÷3 / ÷4. Hover = podgląd. ↻ = oś.',
    splitApply: 'Podziel tu',
    splitCancel: 'Anuluj',
    splitNone: 'Brak poprawnej ściany.',
    splitByN: (n) => `Podziel na ${n}`,
    splitFlipAxis: 'Zmień oś',
    splitFree: 'Lub wolna pozycja:',
    statusSplit: (n) => `Wolna: opcja ${n}`,
    statusSplitParts: (n) => `Podziel na ${n}`,
    interiorDeg: 'Kąt wewn. (°)',
    snapTitle: 'Ustaw kąt na 45° / 90° / 135°',
    snapBtn: '→45/90/135',
    pxPerM: 'px/m',
    undo: 'Cofnij',
    reset: 'Reset',
    dragTitle: 'Przeciągnij, aby przenieść',
    meetfoutKicker: 'Możliwy błąd pomiaru',
    meetfoutTitle: 'Kąty nie pasują po zamknięciu',
    meetfoutLead: (n) =>
      `${n} kąt(ów) poza 45°/90°/135° (czerwony). 135° na siatce 45°. Najedź na numer rogu.`,
    ignore: 'Ignoruj',
    confirm: 'Potwierdź',
    relocate: 'Przenieś…',
    relocateHint:
      'Wybierz numer rogu (hover = żywy kształt). Pomarańczowa linia = oryginał.',
    back: 'Wstecz',
    applyHere: 'Popraw tutaj',
    cornerN: (n) => `Róg ${n}`,
    residual: 'reszta',
    hoverCorner: (n) => `Hover: kształt z resztą w rogu ${n}`,
    hint:
      'Zielony = ok (45/90/135°), czerwony = błąd. Popup po lewej (przeciągalny). Język: flagi.',
  },
  ru: {
    pageTitle: 'Стена-м²',
    statusEmpty: 'Рисуйте стены · замкните в начальной точке',
    statusDrawing: 'Рисование… шаг 45° · у старта = свободное замыкание',
    statusOpen: (walls) => `Открытая цепь · ${walls} стен(ы)`,
    statusWallSelected: 'Стена выбрана · введите длину (м)',
    statusCorner: (deg) => `Внутренний угол ${deg}`,
    statusClosed: (area) => `Замкнуто · ${area}`,
    statusClosedWall: (area) => `Замкнуто · ${area} · введите длину (м)`,
    statusClosedCorner: (area, deg) => `Замкнуто · ${area} · угол ${deg}`,
    statusClosedOdd: (area, odds) => `Замкнуто · ${area} · вне сетки: ${odds}`,
    statusMeetfoutAt: (n) => `Ошибка в углу ${n} · остальные → 45°/90°/135°`,
    statusDoor: (w) => `Дверь ${w} · перетащите · ширина`,
    statusIdle: 'Готово.',
    statusPartitionDraw: 'Перегородка: стена → углы → стена. Esc = отмена.',
    wallM: 'Стена (м)',
    doorM: 'Дверь (м)',
    addDoor: '+ Дверь',
    removeDoor: 'Убрать дверь',
    doorHingeL: 'L',
    doorHingeR: 'R',
    doorSwing: '↺',
    statusDoorDetail: (w, hinge, swing) =>
      `Дверь ${w} · петля ${hinge} · ${swing}`,
    splitLoop: 'Разделить…',
    splitKicker: 'Перегородка',
    splitTitle: 'Разделить контур',
    splitLead: (n) => `${n} свободных вариантов`,
    splitLeadEqual: 'Выберите ÷2 / ÷3 / ÷4. Hover = превью. ↻ = ось.',
    splitApply: 'Разделить',
    splitCancel: 'Отмена',
    splitNone: 'Нет допустимой перегородки.',
    splitByN: (n) => `На ${n} части`,
    splitFlipAxis: 'Сменить ось',
    splitFree: 'Или свободная позиция:',
    statusSplit: (n) => `Свободно: вариант ${n}`,
    statusSplitParts: (n) => `Деление на ${n}`,
    interiorDeg: 'Угол (°)',
    snapTitle: 'Привязать угол к 45° / 90° / 135°',
    snapBtn: '→45/90/135',
    pxPerM: 'px/m',
    undo: 'Отмена',
    reset: 'Сброс',
    dragTitle: 'Перетащите, чтобы переместить',
    meetfoutKicker: 'Возможная ошибка измерения',
    meetfoutTitle: 'Углы не совпадают после замыкания',
    meetfoutLead: (n) =>
      `${n} угол(ов) вне 45°/90°/135° (красный). 135° — на сетке 45°. Наведите на номер угла.`,
    ignore: 'Игнорировать',
    confirm: 'Подтвердить',
    relocate: 'Перенести…',
    relocateHint:
      'Выберите номер угла (hover = живая форма). Оранжевый пунктир = оригинал.',
    back: 'Назад',
    applyHere: 'Исправить здесь',
    cornerN: (n) => `Угол ${n}`,
    residual: 'остаток',
    hoverCorner: (n) => `Hover: форма с остатком в углу ${n}`,
    hint:
      'Зелёный = ок (45/90/135°), красный = ошибка. Окно слева (перетаскивается). Язык: флаги.',
  },
};

const STORAGE_KEY = 'wand-m2-lang';

export function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved && translations[saved]) return saved;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || 'nl').slice(0, 2).toLowerCase();
  if (nav === 'nl' || nav === 'en' || nav === 'es' || nav === 'pl' || nav === 'ru') {
    return nav;
  }
  return 'nl';
}

export function setStoredLang(lang: Lang): void {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

export function t(lang: Lang): Dict {
  return translations[lang] ?? translations.nl;
}
