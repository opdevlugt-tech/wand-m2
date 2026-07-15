import type { DrawingModel, Point } from './geometry/types';
import {
  absorbErrorAtCorner,
  cornerAngleAt,
  evaluateRoom,
  formatArea,
  formatDegrees,
  isCanonicalAngle,
  lengthM,
  listNonCanonicalCorners,
  polygonAreaM2,
  totalLoopsAreaM2,
  type InteriorExterior,
  type PartitionCandidate,
} from './geometry/math';
import { DrawingController } from './canvas/interaction';
import { drawScene, resizeCanvas } from './canvas/renderer';
import { detectLang, LANGS, setStoredLang, t, type Lang } from './i18n';
import {
  DEFAULT_VIEW,
  fitViewToPoints,
  type ViewTransform,
  wheelZoomFactor,
  zoomAt,
} from './geometry/view';
import { ROOM_CONFIG, ROOM_NAME_PRESETS_NL, getRoomType, roomDisplayName } from './config/rooms';

const HIT = 16;
const CLOSE = 22;
const MIN_LEN = 10;

type OddCorner = { index: number; angles: InteriorExterior };

type PopupState = {
  odd: OddCorner[];
  mode: 'review' | 'relocate';
  absorbIndex: number | null;
} | null;

type SplitState = {
  loopIndex: number;
  parts: 2 | 3 | 4;
  axis: 'x' | 'y' | 'auto';
  /** Preview cuts for equal division */
  cuts: PartitionCandidate[];
  /** Optional freeform candidates (mode free) */
  freeCandidates: PartitionCandidate[];
  mode: 'equal' | 'free';
  freeHover: number | null;
};

export function boot(root: HTMLElement): void {
  const canvas = root.querySelector<HTMLCanvasElement>('#canvas');
  const statusEl = root.querySelector<HTMLElement>('#status');
  const areaBadge = root.querySelector<HTMLElement>('#area-badge');
  const pxInput = root.querySelector<HTMLInputElement>('#px-per-m');
  const wallLengthInput = root.querySelector<HTMLInputElement>('#wall-length');
  const lengthField = root.querySelector<HTMLElement>('#length-field');
  const angleInput = root.querySelector<HTMLInputElement>('#corner-angle');
  const angleField = root.querySelector<HTMLElement>('#angle-field');
  const snapAngleBtn = root.querySelector<HTMLButtonElement>('#snap-angle');
  const addDoorBtn = root.querySelector<HTMLButtonElement>('#add-door');
  const doorWidthInput = root.querySelector<HTMLInputElement>('#door-width');
  const doorField = root.querySelector<HTMLElement>('#door-field');
  const removeDoorBtn = root.querySelector<HTMLButtonElement>('#remove-door');
  const doorHingeLBtn = root.querySelector<HTMLButtonElement>('#door-hinge-l');
  const doorHingeRBtn = root.querySelector<HTMLButtonElement>('#door-hinge-r');
  const doorSwingBtn = root.querySelector<HTMLButtonElement>('#door-swing');
  const labelDoor = root.querySelector<HTMLElement>('#label-door');
  const splitLoopBtn = root.querySelector<HTMLButtonElement>('#split-loop');
  const partitionDrawBtn = root.querySelector<HTMLButtonElement>('#partition-draw');
  const roomTypeSelect = root.querySelector<HTMLSelectElement>('#room-type');
  const roomTypeField = root.querySelector<HTMLElement>('#room-type-field');
  const labelRoomType = root.querySelector<HTMLElement>('#label-room-type');
  const roomNameInput = root.querySelector<HTMLInputElement>('#room-name');
  const roomNameField = root.querySelector<HTMLElement>('#room-name-field');
  const labelRoomName = root.querySelector<HTMLElement>('#label-room-name');
  const roomNamePresets = root.querySelector<HTMLDataListElement>('#room-name-presets');
  const splitPopup = root.querySelector<HTMLElement>('#split-popup');
  const splitKicker = root.querySelector<HTMLElement>('#split-kicker');
  const splitTitle = root.querySelector<HTMLElement>('#split-popup-title');
  const splitLead = root.querySelector<HTMLElement>('#split-popup-lead');
  const splitPicks = root.querySelector<HTMLElement>('#split-option-picks');
  const splitCancel = root.querySelector<HTMLButtonElement>('#split-cancel');
  const splitApply = root.querySelector<HTMLButtonElement>('#split-apply');
  const zoomInBtn = root.querySelector<HTMLButtonElement>('#zoom-in');
  const zoomOutBtn = root.querySelector<HTMLButtonElement>('#zoom-out');
  const zoomResetBtn = root.querySelector<HTMLButtonElement>('#zoom-reset');
  const undoBtn = root.querySelector<HTMLButtonElement>('#undo');
  const resetBtn = root.querySelector<HTMLButtonElement>('#reset');
  const stage = root.querySelector<HTMLElement>('.stage');
  const popup = root.querySelector<HTMLElement>('#angle-popup');
  const popupLead = root.querySelector<HTMLElement>('#angle-popup-lead');
  const oddList = root.querySelector<HTMLElement>('#popup-odd-list');
  const mainActions = root.querySelector<HTMLElement>('#popup-main-actions');
  const relocatePanel = root.querySelector<HTMLElement>('#popup-relocate-panel');
  const cornerPicks = root.querySelector<HTMLElement>('#popup-corner-picks');
  const btnIgnore = root.querySelector<HTMLButtonElement>('#angle-ignore');
  const btnConfirm = root.querySelector<HTMLButtonElement>('#angle-confirm');
  const btnRelocate = root.querySelector<HTMLButtonElement>('#angle-relocate');
  const btnRelocateCancel = root.querySelector<HTMLButtonElement>('#angle-relocate-cancel');
  const btnRelocateApply = root.querySelector<HTMLButtonElement>('#angle-relocate-apply');
  const popupDragHandle = root.querySelector<HTMLElement>('#popup-drag-handle');
  const langPicker = root.querySelector<HTMLElement>('#lang-picker');
  const labelWall = root.querySelector<HTMLElement>('#label-wall');
  const labelAngle = root.querySelector<HTMLElement>('#label-angle');
  const labelPpm = root.querySelector<HTMLElement>('#label-ppm');
  const logo = root.querySelector<HTMLElement>('#logo');
  const popupKicker = root.querySelector<HTMLElement>('#popup-kicker');
  const popupTitle = root.querySelector<HTMLElement>('#angle-popup-title');
  const relocateHint = root.querySelector<HTMLElement>('#popup-relocate-hint');
  const footerHint = root.querySelector<HTMLElement>('#footer-hint');

  if (
    !canvas ||
    !statusEl ||
    !areaBadge ||
    !pxInput ||
    !wallLengthInput ||
    !lengthField ||
    !angleInput ||
    !angleField ||
    !snapAngleBtn ||
    !addDoorBtn ||
    !doorWidthInput ||
    !doorField ||
    !removeDoorBtn ||
    !doorHingeLBtn ||
    !doorHingeRBtn ||
    !doorSwingBtn ||
    !labelDoor ||
    !splitLoopBtn ||
    !partitionDrawBtn ||
    !roomTypeSelect ||
    !roomTypeField ||
    !labelRoomType ||
    !roomNameInput ||
    !roomNameField ||
    !labelRoomName ||
    !roomNamePresets ||
    !splitPopup ||
    !splitKicker ||
    !splitTitle ||
    !splitLead ||
    !splitPicks ||
    !splitCancel ||
    !splitApply ||
    !zoomInBtn ||
    !zoomOutBtn ||
    !zoomResetBtn ||
    !undoBtn ||
    !resetBtn ||
    !stage ||
    !popup ||
    !popupLead ||
    !oddList ||
    !mainActions ||
    !relocatePanel ||
    !cornerPicks ||
    !btnIgnore ||
    !btnConfirm ||
    !btnRelocate ||
    !btnRelocateCancel ||
    !btnRelocateApply ||
    !popupDragHandle ||
    !langPicker ||
    !labelWall ||
    !labelAngle ||
    !labelPpm ||
    !logo ||
    !popupKicker ||
    !popupTitle ||
    !relocateHint ||
    !footerHint
  ) {
    throw new Error('HUD/canvas elements missing');
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D context unavailable');

  let lang: Lang = detectLang();
  let tr = t(lang);

  let cssW = 0;
  let cssH = 0;
  let rejectFlash = false;
  let rejectTimer: number | null = null;
  let syncingLengthField = false;
  let syncingAngleField = false;
  let syncingDoorField = false;
  let popupState: PopupState = null;
  let relocateBase: Point[] | null = null;
  let relocatePreview: Point[] | null = null;
  let splitState: SplitState | null = null;
  let view: ViewTransform = { ...DEFAULT_VIEW };
  let panDrag: { x: number; y: number; ox: number; oy: number } | null = null;

  const getPxPerMeter = () => {
    const v = Number(pxInput.value);
    return Number.isFinite(v) && v >= 5 ? v : 50;
  };

  const getView = () => view;

  function syncZoomLabel(): void {
    zoomResetBtn!.textContent = `${Math.round(view.scale * 100)}%`;
    zoomResetBtn!.title = 'Dubbelklik canvas of Fit = passend maken';
  }

  function fitView(): void {
    const pts: Point[] = [];
    for (const L of controller.model.loops) pts.push(...L.vertices);
    pts.push(...controller.model.vertices);
    if (controller.model.draftEnd) pts.push(controller.model.draftEnd);
    if (!pts.length) {
      view = { ...DEFAULT_VIEW };
    } else {
      view = fitViewToPoints(pts, cssW, cssH, 56);
    }
    syncZoomLabel();
    paint();
  }

  function applyStaticI18n(): void {
    tr = t(lang);
    document.documentElement.lang = lang;
    document.title = tr.pageTitle;
    logo!.textContent = tr.pageTitle;
    labelWall!.textContent = tr.wallM;
    labelAngle!.textContent = tr.interiorDeg;
    labelDoor!.textContent = tr.doorM;
    labelPpm!.textContent = tr.pxPerM;
    snapAngleBtn!.textContent = tr.snapBtn;
    snapAngleBtn!.title = tr.snapTitle;
    addDoorBtn!.textContent = tr.addDoor;
    removeDoorBtn!.textContent = tr.removeDoor;
    doorHingeLBtn!.textContent = tr.doorHingeL;
    doorHingeLBtn!.title = 'Scharnier links (L)';
    doorHingeRBtn!.textContent = tr.doorHingeR;
    doorHingeRBtn!.title = 'Scharnier rechts (R)';
    doorSwingBtn!.textContent = tr.doorSwing;
    doorSwingBtn!.title = 'Draairichting omdraaien';
    splitLoopBtn!.textContent = tr.splitLoop;
    partitionDrawBtn!.textContent =
      controller.model.status === 'partition' ? 'Esc stop' : '✂ Scheiding';
    partitionDrawBtn!.title =
      'Vrije scheidingswand met hoeken: muur → hoeken (45°) → muur. Geen auto-deuren.';
    undoBtn!.textContent = tr.undo;
    undoBtn!.title = 'Laatste handeling ongedaan (Ctrl+Z)';
    resetBtn!.textContent = tr.reset;
    if (labelRoomType) labelRoomType.textContent = 'Type';
    if (labelRoomName) labelRoomName.textContent = 'Ruimte';
    if (roomNameInput) roomNameInput.placeholder = 'bijv. Slaapkamer';
    popupDragHandle!.title = tr.dragTitle;
    popupKicker!.textContent = tr.meetfoutKicker;
    popupTitle!.textContent = tr.meetfoutTitle;
    relocateHint!.textContent = tr.relocateHint;
    btnIgnore!.textContent = tr.ignore;
    btnConfirm!.textContent = tr.confirm;
    btnRelocate!.textContent = tr.relocate;
    btnRelocateCancel!.textContent = tr.back;
    btnRelocateApply!.textContent = tr.applyHere;
    footerHint!.textContent = tr.hint;
    langPicker!.querySelectorAll('.lang-btn').forEach((btn) => {
      const code = (btn as HTMLElement).dataset.lang as Lang;
      btn.classList.toggle('active', code === lang);
    });
    if (popupState && !popup!.classList.contains('hidden')) {
      popupLead!.textContent = tr.meetfoutLead(popupState.odd.length);
      const li = controller.meetfoutLoopIndex;
      const verts =
        relocatePreview ??
        (li !== null ? controller.model.loops[li]?.vertices : null) ??
        [];
      refreshOddListFromVertices(verts, popupState.absorbIndex);
      if (popupState.mode === 'relocate' && verts.length >= 3) {
        renderCornerPicks(verts.length, popupState.absorbIndex ?? 0);
      }
    }
    updateHud(controller.model);
  }

  function setupLangPicker(): void {
    langPicker!.innerHTML = '';
    for (const meta of LANGS) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang-btn' + (meta.code === lang ? ' active' : '');
      btn.dataset.lang = meta.code;
      btn.textContent = meta.flag;
      btn.title = meta.name;
      btn.setAttribute('aria-label', meta.name);
      btn.addEventListener('click', () => {
        if (lang === meta.code) return;
        lang = meta.code;
        setStoredLang(lang);
        applyStaticI18n();
      });
      langPicker!.appendChild(btn);
    }
  }

  const controller = new DrawingController(canvas, {
    hitRadius: HIT,
    closeRadius: CLOSE,
    minLengthPx: MIN_LEN,
    getPxPerMeter,
    getView,
    onChange: () => {
      updateHud(controller.model);
      paint();
    },
    onReject: () => {
      rejectFlash = true;
      paint();
      if (rejectTimer) window.clearTimeout(rejectTimer);
      rejectTimer = window.setTimeout(() => {
        rejectFlash = false;
        paint();
      }, 280);
    },
    onWallSelected: (_sel, focusInput) => {
      if (popupState) return;
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      syncDoorFieldFromSelection();
      if (focusInput && !wallLengthInput.disabled) {
        requestAnimationFrame(() => {
          wallLengthInput.focus();
          wallLengthInput.select();
        });
      }
    },
    onVertexSelected: (_sel, focusAngle) => {
      if (popupState) return;
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      syncDoorFieldFromSelection();
      if (focusAngle && !angleInput.disabled) {
        requestAnimationFrame(() => {
          angleInput.focus();
          angleInput.select();
        });
      }
    },
    onDoorSelected: (_sel, focusInput) => {
      if (popupState) return;
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      syncDoorFieldFromSelection();
      if (focusInput && !doorWidthInput.disabled) {
        requestAnimationFrame(() => {
          doorWidthInput.focus();
          doorWidthInput.select();
        });
      }
    },
    onCloseMeetfout: (loopIndex, odd) => {
      showMeetfoutPopup(loopIndex, odd);
    },
  });

  function displayModel(): DrawingModel {
    const model = controller.model;
    if (
      relocatePreview &&
      controller.meetfoutLoopIndex !== null &&
      model.loops[controller.meetfoutLoopIndex]
    ) {
      const li = controller.meetfoutLoopIndex;
      const loops = model.loops.map((L, i) =>
        i === li ? { ...L, vertices: relocatePreview! } : L,
      );
      return { ...model, loops };
    }
    return model;
  }

  function paint(): void {
    const model = displayModel();
    const sel = controller.selection;
    drawScene(ctx!, cssW, cssH, model, {
      pxPerMeter: getPxPerMeter(),
      hitRadius: HIT,
      rejectFlash,
      selectedLoopIndex:
        sel.kind === 'wall' || sel.kind === 'vertex'
          ? sel.loopIndex
          : sel.kind === 'door'
            ? sel.loopIndex
            : null,
      selectedWallIndex: sel.kind === 'wall' ? sel.wallIndex : null,
      selectedVertexIndex: sel.kind === 'vertex' ? sel.vertexIndex : null,
      selectedDoorId: sel.kind === 'door' ? sel.doorId : null,
      popupCornerIndex:
        popupState?.mode === 'relocate'
          ? popupState.absorbIndex
          : (popupState?.odd[0]?.index ?? null),
      ghostVertices:
        popupState?.mode === 'relocate' && relocatePreview && relocateBase
          ? relocateBase
          : null,
      ghostLoopIndex: controller.meetfoutLoopIndex,
      partitionOptions: splitState
        ? (splitState.mode === 'equal'
            ? splitState.cuts
            : splitState.freeCandidates
          ).map((c, i) => ({
            a: c.a,
            b: c.b,
            label:
              splitState!.mode === 'equal'
                ? `÷${splitState!.parts}`
                : String(i + 1),
          }))
        : undefined,
      partitionHoverIndex:
        splitState?.mode === 'free' ? splitState.freeHover : null,
      partitionPath: controller.model.partitionPath,
      roomBadges: buildRoomBadges(model),
      view,
    });
  }

  function buildRoomBadges(model: DrawingModel) {
    const ppm = getPxPerMeter();
    return model.loops.map((L, i) => {
      const rt = getRoomType(L.roomTypeId);
      const area = polygonAreaM2(L.vertices, ppm);
      const doors = L.doors?.length ?? 0;
      const { underMinArea, missingDoor } = evaluateRoom(
        area,
        doors,
        rt.minAreaM2,
        rt.requireDoor,
        ROOM_CONFIG.minDoorsPerRoom,
      );
      const ok = !underMinArea && !missingDoor;
      let warn: string | null = null;
      if (underMinArea) warn = `<${rt.minAreaM2} m²`;
      else if (missingDoor) warn = 'geen deur';
      const title = roomDisplayName(L.name, L.roomTypeId, lang === 'en' ? 'en' : 'nl');
      return {
        loopIndex: i,
        label: `${title} · ${area.toFixed(1)} m²`,
        ok,
        warn,
      };
    });
  }

  function fillRoomTypeOptions(): void {
    roomTypeSelect!.innerHTML = '';
    for (const t of ROOM_CONFIG.types) {
      const opt = document.createElement('option');
      opt.value = t.id;
      const min =
        t.minAreaM2 > 0 ? ` (≥${String(t.minAreaM2).replace('.', ',')} m²)` : '';
      opt.textContent = `${t.labelNl}${min}`;
      roomTypeSelect!.appendChild(opt);
    }
  }

  function fillRoomNamePresets(): void {
    roomNamePresets!.innerHTML = '';
    for (const n of ROOM_NAME_PRESETS_NL) {
      const opt = document.createElement('option');
      opt.value = n;
      roomNamePresets!.appendChild(opt);
    }
  }

  function refreshOddListFromVertices(verts: Point[], absorbIndex: number | null = null): void {
    const n = verts.length;
    const rows: string[] = [];
    for (let index = 0; index < n; index++) {
      const deg = cornerAngleAt(verts, index, true);
      const odd = deg !== null && !isCanonicalAngle(deg);
      const isAbs = absorbIndex === index;
      const cls =
        'popup-angle-row interior' +
        (odd ? ' is-odd' : '') +
        (isAbs ? ' is-absorb' : '');
      const tag = `${tr.cornerN(index + 1)}${isAbs ? ` · ${tr.residual}` : ''}`;
      rows.push(
        `<div class="${cls}"><span class="tag">${tag}</span><strong>${deg !== null ? formatDegrees(deg) : '—'}</strong></div>`,
      );
    }
    oddList!.innerHTML = rows.join('');
  }

  function showMeetfoutPopup(loopIndex: number, odd: OddCorner[]): void {
    const loop = controller.model.loops[loopIndex];
    relocateBase = loop ? loop.vertices.map((p) => ({ ...p })) : null;
    relocatePreview = null;
    controller.meetfoutLoopIndex = loopIndex;
    popupState = { odd, mode: 'review', absorbIndex: null };
    popupLead!.textContent = tr.meetfoutLead(odd.length);
    refreshOddListFromVertices(loop?.vertices ?? [], null);
    mainActions!.classList.remove('hidden');
    relocatePanel!.classList.add('hidden');
    resetPopupPosition();
    popup!.classList.remove('hidden');
    if (odd[0]) controller.focusCorner(odd[0].index, false);
    paint();
  }

  function resetPopupPosition(): void {
    popup!.classList.remove('popup-dragged');
    popup!.style.left = '16px';
    popup!.style.top = '50%';
    popup!.style.right = 'auto';
    popup!.style.bottom = 'auto';
    popup!.style.transform = 'translateY(-50%)';
  }

  function setupPopupDrag(): void {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let origLeft = 0;
    let origTop = 0;
    let activePointer: number | null = null;

    const onDown = (e: PointerEvent): void => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const stageRect = stage!.getBoundingClientRect();
      const popRect = popup!.getBoundingClientRect();
      origLeft = popRect.left - stageRect.left;
      origTop = popRect.top - stageRect.top;
      popup!.classList.add('popup-dragged');
      popup!.style.transform = 'none';
      popup!.style.left = `${origLeft}px`;
      popup!.style.top = `${origTop}px`;
      popup!.style.right = 'auto';
      startX = e.clientX;
      startY = e.clientY;
      dragging = true;
      activePointer = e.pointerId;
      popupDragHandle!.setPointerCapture(e.pointerId);
      e.preventDefault();
    };

    const onMove = (e: PointerEvent): void => {
      if (!dragging || (activePointer !== null && e.pointerId !== activePointer)) return;
      const stageRect = stage!.getBoundingClientRect();
      const w = popup!.offsetWidth;
      const h = popup!.offsetHeight;
      let nextL = origLeft + (e.clientX - startX);
      let nextT = origTop + (e.clientY - startY);
      const maxL = Math.max(4, stageRect.width - w - 4);
      const maxT = Math.max(4, stageRect.height - h - 4);
      nextL = Math.min(maxL, Math.max(4, nextL));
      nextT = Math.min(maxT, Math.max(4, nextT));
      popup!.style.left = `${nextL}px`;
      popup!.style.top = `${nextT}px`;
    };

    const onUp = (e: PointerEvent): void => {
      if (!dragging) return;
      if (activePointer !== null && e.pointerId !== activePointer) return;
      dragging = false;
      activePointer = null;
      try {
        popupDragHandle!.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    };

    popupDragHandle!.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  }

  function setRelocatePreview(absorbIndex: number): void {
    if (!relocateBase) {
      const li = controller.meetfoutLoopIndex;
      const loop = li !== null ? controller.model.loops[li] : null;
      relocateBase = loop ? loop.vertices.map((p) => ({ ...p })) : null;
    }
    if (!relocateBase) return;
    relocatePreview = absorbErrorAtCorner(relocateBase, absorbIndex);
    if (popupState) {
      popupState = { ...popupState, absorbIndex, mode: 'relocate' };
    }
    refreshOddListFromVertices(relocatePreview, absorbIndex);
    controller.selectedVertexIndex = absorbIndex;
    controller.selectedWallIndex = null;
    paint();
  }

  function enterRelocateMode(): void {
    if (!popupState) return;
    const li = controller.meetfoutLoopIndex;
    const n =
      li !== null && controller.model.loops[li]
        ? controller.model.loops[li].vertices.length
        : 0;
    if (n < 3) return;
    if (!relocateBase) {
      relocateBase = controller.model.loops[li!].vertices.map((p) => ({ ...p }));
    }
    const defaultAbs = popupState.odd[0]?.index ?? 0;
    popupState = { ...popupState, mode: 'relocate', absorbIndex: defaultAbs };
    mainActions!.classList.add('hidden');
    relocatePanel!.classList.remove('hidden');
    renderCornerPicks(n, defaultAbs);
    setRelocatePreview(defaultAbs);
    btnRelocateApply!.disabled = false;
  }

  function renderCornerPicks(n: number, selected: number): void {
    const base =
      relocateBase ??
      (controller.meetfoutLoopIndex !== null
        ? controller.model.loops[controller.meetfoutLoopIndex]?.vertices
        : null) ??
      [];
    const oddSet = new Set(listNonCanonicalCorners(base, true));
    cornerPicks!.innerHTML = '';
    for (let i = 0; i < n; i++) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'corner-pick' + (i === selected ? ' active' : '') + (oddSet.has(i) ? ' odd' : '');
      btn.textContent = String(i + 1);
      btn.title = tr.hoverCorner(i + 1);
      btn.addEventListener('pointerenter', () => {
        if (!popupState || popupState.mode !== 'relocate') return;
        setRelocatePreview(i);
        cornerPicks!.querySelectorAll('.corner-pick').forEach((el, idx) => {
          el.classList.toggle('active', idx === i);
        });
      });
      btn.addEventListener('click', () => {
        if (!popupState) return;
        setRelocatePreview(i);
        cornerPicks!.querySelectorAll('.corner-pick').forEach((el, idx) => {
          el.classList.toggle('active', idx === i);
        });
        btnRelocateApply!.disabled = false;
      });
      cornerPicks!.appendChild(btn);
    }
  }

  function clearRelocatePreview(): void {
    relocateBase = null;
    relocatePreview = null;
  }

  function dismissPopup(): void {
    popup!.classList.add('hidden');
    mainActions!.classList.remove('hidden');
    relocatePanel!.classList.add('hidden');
    popupState = null;
    clearRelocatePreview();
    syncLengthFieldFromSelection();
    syncAngleFieldFromSelection();
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  }

  function syncDoorFieldFromSelection(): void {
    const door = controller.getSelectedDoor();
    syncingDoorField = true;
    const wallOnLoop =
      controller.selection.kind === 'wall' && controller.selection.loopIndex !== null;
    addDoorBtn!.disabled = !wallOnLoop;
    const li = controller.selectedLoopIndex();
    splitLoopBtn!.disabled = li === null || (controller.model.loops[li]?.vertices.length ?? 0) < 3;
    partitionDrawBtn!.disabled =
      li === null || (controller.model.loops[li]?.vertices.length ?? 0) < 3;
    const hasRoom = li !== null;
    roomTypeSelect!.disabled = !hasRoom;
    roomNameInput!.disabled = !hasRoom;
    if (hasRoom) {
      const L = controller.model.loops[li!];
      roomTypeSelect!.value = L.roomTypeId ?? ROOM_CONFIG.defaultTypeId;
      roomNameInput!.value = L.name ?? '';
      roomTypeField!.classList.add('active');
      roomNameField!.classList.add('active');
    } else {
      roomTypeField!.classList.remove('active');
      roomNameField!.classList.remove('active');
      roomNameInput!.value = '';
    }
    if (!door) {
      doorWidthInput!.value = '';
      doorWidthInput!.disabled = true;
      removeDoorBtn!.disabled = true;
      doorHingeLBtn!.disabled = true;
      doorHingeRBtn!.disabled = true;
      doorSwingBtn!.disabled = true;
      doorField!.classList.remove('active');
    } else {
      doorWidthInput!.disabled = false;
      removeDoorBtn!.disabled = false;
      doorHingeLBtn!.disabled = false;
      doorHingeRBtn!.disabled = false;
      doorSwingBtn!.disabled = false;
      doorWidthInput!.value = door.widthM.toFixed(2);
      doorField!.classList.add('active');
      doorHingeLBtn!.classList.toggle('active', (door.hinge ?? 'L') === 'L');
      doorHingeRBtn!.classList.toggle('active', (door.hinge ?? 'L') === 'R');
    }
    syncingDoorField = false;
  }

  function openSplitPanel(): void {
    if (popupState) return;
    const li = controller.selectedLoopIndex();
    if (li === null) return;
    const plan = controller.getEqualDivisionPlan(li, 2, 'auto');
    const free = controller.getPartitionCandidates(li);
    if (!plan && free.length === 0) {
      statusEl!.textContent = tr.splitNone;
      return;
    }
    splitState = {
      loopIndex: li,
      parts: 2,
      axis: plan?.axis ?? 'auto',
      cuts: plan?.cuts ?? [],
      freeCandidates: free,
      mode: plan ? 'equal' : 'free',
      freeHover: free.length ? 0 : null,
    };
    splitKicker!.textContent = tr.splitKicker;
    splitTitle!.textContent = tr.splitTitle;
    splitCancel!.textContent = tr.splitCancel;
    splitApply!.textContent = tr.splitApply;
    splitApply!.disabled = false;
    renderSplitPicks();
    splitPopup!.classList.remove('hidden');
    splitPopup!.classList.remove('popup-dragged');
    splitPopup!.style.left = '16px';
    splitPopup!.style.top = '50%';
    splitPopup!.style.transform = 'translateY(-50%)';
    statusEl!.textContent = tr.statusSplitParts(2);
    paint();
  }

  function setEqualParts(parts: 2 | 3 | 4): void {
    if (!splitState) return;
    const plan = controller.getEqualDivisionPlan(splitState.loopIndex, parts, 'auto');
    if (!plan) {
      statusEl!.textContent = tr.splitNone;
      return;
    }
    splitState = {
      ...splitState,
      parts,
      axis: plan.axis,
      cuts: plan.cuts,
      mode: 'equal',
      freeHover: null,
    };
    splitApply!.disabled = false;
    statusEl!.textContent = tr.statusSplitParts(parts);
    renderSplitPicks();
    paint();
  }

  function toggleSplitAxis(): void {
    if (!splitState || splitState.mode !== 'equal') return;
    const next: 'x' | 'y' = splitState.axis === 'x' ? 'y' : 'x';
    const plan = controller.getEqualDivisionPlan(
      splitState.loopIndex,
      splitState.parts,
      next,
    );
    if (!plan) {
      statusEl!.textContent = tr.splitNone;
      return;
    }
    splitState = {
      ...splitState,
      axis: plan.axis,
      cuts: plan.cuts,
    };
    renderSplitPicks();
    paint();
  }

  function renderSplitPicks(): void {
    if (!splitState) return;
    splitLead!.textContent = tr.splitLeadEqual;
    splitPicks!.innerHTML = '';

    // ÷2 ÷3 ÷4
    for (const p of [2, 3, 4] as const) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className =
        'corner-pick' +
        (splitState.mode === 'equal' && splitState.parts === p ? ' active' : '');
      btn.textContent = `÷${p}`;
      btn.title = tr.splitByN(p);
      btn.addEventListener('click', () => setEqualParts(p));
      btn.addEventListener('pointerenter', () => {
        if (!splitState) return;
        const plan = controller.getEqualDivisionPlan(splitState.loopIndex, p, 'auto');
        if (!plan) return;
        splitState = {
          ...splitState,
          parts: p,
          axis: plan.axis,
          cuts: plan.cuts,
          mode: 'equal',
        };
        statusEl!.textContent = tr.statusSplitParts(p);
        renderSplitPicks();
        paint();
      });
      splitPicks!.appendChild(btn);
    }

    // axis toggle
    const axisBtn = document.createElement('button');
    axisBtn.type = 'button';
    axisBtn.className = 'corner-pick';
    axisBtn.textContent =
      splitState.axis === 'x' ? '↕' : splitState.axis === 'y' ? '↔' : '↻';
    axisBtn.title = tr.splitFlipAxis;
    axisBtn.addEventListener('click', () => toggleSplitAxis());
    splitPicks!.appendChild(axisBtn);

    // freeform positions
    if (splitState.freeCandidates.length > 0) {
      const freelabel = document.createElement('span');
      freelabel.className = 'popup-hint';
      freelabel.style.flexBasis = '100%';
      freelabel.textContent = tr.splitFree;
      splitPicks!.appendChild(freelabel);
      splitState.freeCandidates.forEach((c, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className =
          'corner-pick' +
          (splitState!.mode === 'free' && splitState!.freeHover === i ? ' active' : '');
        btn.textContent = String(i + 1);
        btn.title = `${c.wallA + 1}↔${c.wallB + 1}`;
        btn.addEventListener('pointerenter', () => {
          if (!splitState) return;
          splitState = { ...splitState, mode: 'free', freeHover: i };
          statusEl!.textContent = tr.statusSplit(i + 1);
          renderSplitPicks();
          paint();
        });
        btn.addEventListener('click', () => {
          if (!splitState) return;
          splitState = { ...splitState, mode: 'free', freeHover: i };
          splitApply!.disabled = false;
          renderSplitPicks();
          paint();
        });
        splitPicks!.appendChild(btn);
      });
    }
  }

  function closeSplitPanel(): void {
    splitPopup!.classList.add('hidden');
    splitState = null;
    paint();
  }

  function applySplit(): void {
    if (!splitState) return;
    const li = splitState.loopIndex;
    if (splitState.mode === 'equal') {
      const parts = splitState.parts;
      const axis = splitState.axis === 'auto' ? 'auto' : splitState.axis;
      closeSplitPanel();
      if (!controller.splitLoopEqualParts(li, parts, axis)) return;
    } else {
      const i = splitState.freeHover;
      if (i === null) return;
      const c = splitState.freeCandidates[i];
      if (!c) return;
      closeSplitPanel();
      if (!controller.splitLoopWithPartition(li, c)) return;
    }
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  }

  function applyTypedDoorWidth(): void {
    if (syncingDoorField) return;
    if (controller.selection.kind !== 'door') return;
    const meters = Number(doorWidthInput!.value.replace(',', '.'));
    if (!controller.applyDoorWidthM(meters)) {
      syncDoorFieldFromSelection();
      return;
    }
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  }

  function syncLengthFieldFromSelection(): void {
    const seg = controller.getSelectedSegment();
    syncingLengthField = true;
    if (!seg) {
      wallLengthInput!.value = '';
      wallLengthInput!.disabled = true;
      lengthField!.classList.remove('active');
    } else {
      const m = lengthM(seg.a, seg.b, getPxPerMeter());
      wallLengthInput!.disabled = false;
      wallLengthInput!.value = m.toFixed(2);
      lengthField!.classList.add('active');
    }
    syncingLengthField = false;
  }

  function syncAngleFieldFromSelection(): void {
    const deg = controller.getSelectedCornerAngle();
    syncingAngleField = true;
    if (deg === null) {
      angleInput!.value = '';
      angleInput!.disabled = true;
      snapAngleBtn!.disabled = true;
      angleField!.classList.remove('active', 'warn');
    } else {
      angleInput!.disabled = false;
      snapAngleBtn!.disabled = false;
      angleInput!.value = deg.toFixed(1);
      angleField!.classList.add('active');
      angleField!.classList.toggle('warn', !isCanonicalAngle(deg));
    }
    syncingAngleField = false;
  }

  function applyTypedLength(): void {
    if (syncingLengthField) return;
    if (controller.selection.kind !== 'wall') return;
    const meters = Number(wallLengthInput!.value.replace(',', '.'));
    if (!controller.applyWallLengthM(meters)) {
      syncLengthFieldFromSelection();
      return;
    }
    syncLengthFieldFromSelection();
    updateHud(controller.model);
    paint();
  }

  function applyTypedAngle(): void {
    if (syncingAngleField) return;
    const deg = Number(angleInput!.value.replace(',', '.'));
    if (!Number.isFinite(deg)) {
      syncAngleFieldFromSelection();
      return;
    }
    if (!controller.applyCornerAngle(deg)) {
      syncAngleFieldFromSelection();
      return;
    }
    syncAngleFieldFromSelection();
    updateHud(controller.model);
    paint();
  }

  function updateHud(model: DrawingModel): void {
    const ppm = getPxPerMeter();
    const hasWall = controller.selection.kind === 'wall';
    const hasVert = controller.selection.kind === 'vertex';
    const hasDoor = controller.selection.kind === 'door';
    const nLoops = model.loops.length;
    const totalArea = totalLoopsAreaM2(model.loops, ppm);

    if (nLoops > 0) {
      const text = formatArea(totalArea);
      areaBadge!.textContent =
        nLoops === 1 ? text : `${nLoops}× · ${text}`;
      areaBadge!.classList.remove('hidden');
    } else {
      areaBadge!.classList.add('hidden');
    }

    if (hasDoor) {
      const d = controller.getSelectedDoor();
      if (d) {
        const hinge = (d.hinge ?? 'L') === 'L' ? 'L' : 'R';
        const swing = (d.swing ?? 1) > 0 ? '↺' : '↻';
        statusEl!.textContent = tr.statusDoorDetail(
          `${d.widthM.toFixed(2)} m`,
          hinge,
          swing,
        );
      } else {
        statusEl!.textContent = tr.statusDoor('—');
      }
      return;
    }
    if (hasVert) {
      const deg = controller.getSelectedCornerAngle();
      statusEl!.textContent =
        deg !== null
          ? tr.statusCorner(formatDegrees(deg)) +
            (nLoops ? ` · ${formatArea(totalArea)}` : '')
          : tr.statusCorner('—');
      return;
    }
    if (hasWall) {
      statusEl!.textContent =
        nLoops > 0
          ? tr.statusClosedWall(formatArea(totalArea))
          : tr.statusWallSelected;
      return;
    }
    if (model.status === 'drawing') {
      statusEl!.textContent = tr.statusDrawing;
      return;
    }
    if (model.vertices.length >= 2) {
      statusEl!.textContent = tr.statusOpen(model.vertices.length - 1);
      return;
    }
    if (nLoops > 0) {
      statusEl!.textContent = tr.statusClosed(formatArea(totalArea));
      return;
    }
    statusEl!.textContent = tr.statusEmpty;
  }

  function layout(): void {
    const rect = stage!.getBoundingClientRect();
    cssW = Math.max(320, Math.floor(rect.width));
    cssH = Math.max(320, Math.floor(rect.height));
    resizeCanvas(canvas!, cssW, cssH);
    paint();
  }

  btnIgnore.addEventListener('click', () => dismissPopup());
  btnConfirm.addEventListener('click', () => dismissPopup());
  btnRelocate.addEventListener('click', () => enterRelocateMode());
  btnRelocateCancel.addEventListener('click', () => {
    if (!popupState) return;
    relocatePreview = null;
    popupState = { ...popupState, mode: 'review', absorbIndex: null };
    mainActions!.classList.remove('hidden');
    relocatePanel!.classList.add('hidden');
    const li = controller.meetfoutLoopIndex;
    const verts =
      li !== null ? controller.model.loops[li]?.vertices ?? [] : [];
    refreshOddListFromVertices(verts);
    paint();
  });
  btnRelocateApply.addEventListener('click', () => {
    const idx = popupState?.absorbIndex;
    if (idx === null || idx === undefined) return;
    const ok = controller.absorbMeetfoutAt(idx);
    dismissPopup();
    if (ok) {
      statusEl!.textContent = tr.statusMeetfoutAt(idx + 1);
    }
  });

  undoBtn.addEventListener('click', () => {
    if (popupState) dismissPopup();
    if (splitState) closeSplitPanel();
    controller.undo();
    syncLengthFieldFromSelection();
    syncAngleFieldFromSelection();
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  resetBtn.addEventListener('click', () => {
    if (popupState) dismissPopup();
    if (splitState) closeSplitPanel();
    controller.reset();
    syncLengthFieldFromSelection();
    syncAngleFieldFromSelection();
    syncDoorFieldFromSelection();
  });
  pxInput.addEventListener('change', () => {
    syncLengthFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  pxInput.addEventListener('input', () => {
    syncLengthFieldFromSelection();
    updateHud(controller.model);
    paint();
  });

  wallLengthInput.addEventListener('change', () => applyTypedLength());
  wallLengthInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyTypedLength();
      wallLengthInput.blur();
    }
  });

  angleInput.addEventListener('change', () => applyTypedAngle());
  angleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyTypedAngle();
      angleInput.blur();
    }
  });
  snapAngleBtn.addEventListener('click', () => {
    if (!controller.snapSelectedCornerCanonical()) return;
    syncAngleFieldFromSelection();
    updateHud(controller.model);
    paint();
  });

  addDoorBtn.addEventListener('click', () => {
    if (!controller.addDoorOnSelectedWall()) return;
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  removeDoorBtn.addEventListener('click', () => {
    if (!controller.removeSelectedDoor()) return;
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  doorHingeLBtn.addEventListener('click', () => {
    if (!controller.setSelectedDoorHinge('L')) return;
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  doorHingeRBtn.addEventListener('click', () => {
    if (!controller.setSelectedDoorHinge('R')) return;
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  doorSwingBtn.addEventListener('click', () => {
    if (!controller.flipSelectedDoorSwing()) return;
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  splitLoopBtn.addEventListener('click', () => openSplitPanel());
  partitionDrawBtn.addEventListener('click', () => {
    if (controller.model.status === 'partition') {
      controller.cancelPartitionDraw();
      statusEl!.textContent = tr.statusIdle;
      paint();
      return;
    }
    if (!controller.beginPartitionDraw()) return;
    statusEl!.textContent = tr.statusPartitionDraw;
    paint();
  });
  roomTypeSelect.addEventListener('change', () => {
    const v = roomTypeSelect.value;
    if (!controller.setSelectedRoomType(v)) return;
    // Sync name from type label if empty
    const li = controller.selectedLoopIndex();
    if (li !== null) {
      const L = controller.model.loops[li];
      if (!L.name) {
        const rt = getRoomType(v);
        controller.setSelectedRoomName(rt.labelNl);
        roomNameInput!.value = rt.labelNl;
      }
    }
    syncDoorFieldFromSelection();
    updateHud(controller.model);
    paint();
  });
  roomNameInput.addEventListener('change', () => {
    if (!controller.setSelectedRoomName(roomNameInput.value)) return;
    updateHud(controller.model);
    paint();
  });
  roomNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      roomNameInput.blur();
    }
  });
  splitCancel.addEventListener('click', () => {
    closeSplitPanel();
    updateHud(controller.model);
  });
  splitApply.addEventListener('click', () => applySplit());

  function applyZoom(factor: number, sx?: number, sy?: number): void {
    const cx = sx ?? cssW / 2;
    const cy = sy ?? cssH / 2;
    view = zoomAt(view, cx, cy, factor);
    syncZoomLabel();
    paint();
  }

  zoomInBtn.addEventListener('click', () => applyZoom(1.25));
  zoomOutBtn.addEventListener('click', () => applyZoom(1 / 1.25));
  zoomResetBtn.addEventListener('click', () => fitView());

  canvas.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      const sx = e.clientX - rect.left;
      const sy = e.clientY - rect.top;
      const factor = wheelZoomFactor(e.deltaY, e.deltaMode);
      applyZoom(factor, sx, sy);
    },
    { passive: false },
  );

  canvas.addEventListener('dblclick', (e) => {
    e.preventDefault();
    fitView();
  });

  // Middle mouse or Space+drag or Alt+drag = pan
  let spacePan = false;
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !e.repeat) {
      spacePan = true;
      canvas.style.cursor = 'grab';
    }
    if (e.key === 'Escape' && controller.model.status === 'partition') {
      controller.cancelPartitionDraw();
      updateHud(controller.model);
      paint();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z') && !e.shiftKey) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }
      e.preventDefault();
      if (popupState) dismissPopup();
      if (splitState) closeSplitPanel();
      controller.undo();
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      syncDoorFieldFromSelection();
      updateHud(controller.model);
      paint();
    }
    if (e.key === 'Delete' || e.key === 'Backspace') {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }
      e.preventDefault();
      if (controller.deleteLine()) {
        syncDoorFieldFromSelection();
        updateHud(controller.model);
        paint();
      }
    }
  });
  window.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
      spacePan = false;
      canvas.style.cursor = '';
    }
  });

  canvas.addEventListener('pointerdown', (e) => {
    if (e.button === 1 || (e.button === 0 && (e.altKey || spacePan))) {
      e.preventDefault();
      panDrag = { x: e.clientX, y: e.clientY, ox: view.ox, oy: view.oy };
      canvas.style.cursor = 'grabbing';
      canvas.setPointerCapture(e.pointerId);
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!panDrag) return;
    view = {
      scale: view.scale,
      ox: panDrag.ox + (e.clientX - panDrag.x),
      oy: panDrag.oy + (e.clientY - panDrag.y),
    };
    paint();
  });
  canvas.addEventListener('pointerup', (e) => {
    if (panDrag) {
      panDrag = null;
      canvas.style.cursor = spacePan ? 'grab' : '';
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
  });
  canvas.addEventListener('contextmenu', (e) => e.preventDefault());

  // Pinch zoom (two pointers)
  const pinch = new Map<number, { x: number; y: number }>();
  let pinchState: { dist: number; scale: number; cx: number; cy: number } | null = null;
  canvas.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch') {
      pinch.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pinch.size === 2) {
        const pts = [...pinch.values()];
        const dx = pts[0].x - pts[1].x;
        const dy = pts[0].y - pts[1].y;
        const rect = canvas.getBoundingClientRect();
        pinchState = {
          dist: Math.hypot(dx, dy) || 1,
          scale: view.scale,
          cx: (pts[0].x + pts[1].x) / 2 - rect.left,
          cy: (pts[0].y + pts[1].y) / 2 - rect.top,
        };
      }
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    if (!pinch.has(e.pointerId)) return;
    pinch.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pinch.size === 2 && pinchState) {
      const pts = [...pinch.values()];
      const dx = pts[0].x - pts[1].x;
      const dy = pts[0].y - pts[1].y;
      const d = Math.hypot(dx, dy) || 1;
      const factor = d / pinchState.dist;
      const next = Math.min(8, Math.max(0.2, pinchState.scale * factor));
      const w = {
        x: (pinchState.cx - view.ox) / view.scale,
        y: (pinchState.cy - view.oy) / view.scale,
      };
      view = {
        scale: next,
        ox: pinchState.cx - w.x * next,
        oy: pinchState.cy - w.y * next,
      };
      syncZoomLabel();
      paint();
    }
  });
  canvas.addEventListener('pointerup', (e) => {
    pinch.delete(e.pointerId);
    if (pinch.size < 2) pinchState = null;
  });
  canvas.addEventListener('pointercancel', (e) => {
    pinch.delete(e.pointerId);
    if (pinch.size < 2) pinchState = null;
  });

  doorWidthInput.addEventListener('change', () => applyTypedDoorWidth());
  doorWidthInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyTypedDoorWidth();
      doorWidthInput.blur();
    }
  });

  window.addEventListener('resize', layout);
  setupPopupDrag();
  setupLangPicker();
  fillRoomTypeOptions();
  fillRoomNamePresets();
  applyStaticI18n();
  syncZoomLabel();
  layout();
  updateHud(controller.model);
  syncLengthFieldFromSelection();
  syncAngleFieldFromSelection();
  syncDoorFieldFromSelection();
}
