import type { DrawingModel, Point } from './geometry/types';
import {
  absorbErrorAtCorner,
  cornerAngleAt,
  dist,
  formatArea,
  formatDegrees,
  isCanonicalAngle,
  lengthM,
  listNonCanonicalCorners,
  polygonAreaM2,
  scaleFromTypedLength,
  type InteriorExterior,
} from './geometry/math';
import { DrawingController } from './canvas/interaction';
import { drawScene, resizeCanvas } from './canvas/renderer';
import { detectLang, LANGS, setStoredLang, t, type Lang } from './i18n';

const HIT = 16;
const CLOSE = 22;
const MIN_LEN = 10;

type OddCorner = { index: number; angles: InteriorExterior };

type PopupState = {
  odd: OddCorner[];
  mode: 'review' | 'relocate';
  absorbIndex: number | null;
} | null;

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
  let popupState: PopupState = null;
  let relocateBase: Point[] | null = null;
  let relocatePreview: Point[] | null = null;

  const getPxPerMeter = () => {
    const v = Number(pxInput.value);
    return Number.isFinite(v) && v >= 5 ? v : 50;
  };

  function applyStaticI18n(): void {
    tr = t(lang);
    document.documentElement.lang = lang;
    document.title = tr.pageTitle;
    logo!.textContent = tr.pageTitle;
    labelWall!.textContent = tr.wallM;
    labelAngle!.textContent = tr.interiorDeg;
    labelPpm!.textContent = tr.pxPerM;
    snapAngleBtn!.textContent = tr.snapBtn;
    snapAngleBtn!.title = tr.snapTitle;
    undoBtn!.textContent = tr.undo;
    resetBtn!.textContent = tr.reset;
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
      const verts = relocatePreview ?? controller.model.vertices;
      refreshOddListFromVertices(verts, popupState.absorbIndex);
      if (popupState.mode === 'relocate') {
        renderCornerPicks(controller.model.vertices.length, popupState.absorbIndex ?? 0);
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
    onWallSelected: (_index, focusInput) => {
      if (popupState) return;
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      if (focusInput && !wallLengthInput.disabled) {
        requestAnimationFrame(() => {
          wallLengthInput.focus();
          wallLengthInput.select();
        });
      }
    },
    onVertexSelected: (_index, focusAngle) => {
      if (popupState) return;
      syncLengthFieldFromSelection();
      syncAngleFieldFromSelection();
      if (focusAngle && !angleInput.disabled) {
        requestAnimationFrame(() => {
          angleInput.focus();
          angleInput.select();
        });
      }
    },
    onCloseMeetfout: (odd) => {
      showMeetfoutPopup(odd);
    },
  });

  function displayModel(): DrawingModel {
    if (relocatePreview && controller.model.status === 'closed') {
      return { ...controller.model, vertices: relocatePreview, draftEnd: null };
    }
    return controller.model;
  }

  function paint(): void {
    const model = displayModel();
    drawScene(ctx!, cssW, cssH, model, {
      pxPerMeter: getPxPerMeter(),
      hitRadius: HIT,
      rejectFlash,
      selectedWallIndex: controller.selectedWallIndex,
      selectedVertexIndex: controller.selectedVertexIndex,
      popupCornerIndex:
        popupState?.mode === 'relocate'
          ? popupState.absorbIndex
          : (popupState?.odd[0]?.index ?? null),
      ghostVertices:
        popupState?.mode === 'relocate' && relocatePreview && relocateBase
          ? relocateBase
          : null,
    });
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

  function showMeetfoutPopup(odd: OddCorner[]): void {
    relocateBase = controller.model.vertices.map((p) => ({ ...p }));
    relocatePreview = null;
    popupState = { odd, mode: 'review', absorbIndex: null };
    popupLead!.textContent = tr.meetfoutLead(odd.length);
    refreshOddListFromVertices(controller.model.vertices, null);
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
      relocateBase = controller.model.vertices.map((p) => ({ ...p }));
    }
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
    const n = controller.model.vertices.length;
    if (!relocateBase) {
      relocateBase = controller.model.vertices.map((p) => ({ ...p }));
    }
    const defaultAbs = popupState.odd[0]?.index ?? Math.max(0, n - 1);
    popupState = { ...popupState, mode: 'relocate', absorbIndex: defaultAbs };
    mainActions!.classList.add('hidden');
    relocatePanel!.classList.remove('hidden');
    renderCornerPicks(n, defaultAbs);
    setRelocatePreview(defaultAbs);
    btnRelocateApply!.disabled = false;
  }

  function renderCornerPicks(n: number, selected: number): void {
    const oddSet = new Set(
      listNonCanonicalCorners(relocateBase ?? controller.model.vertices, true),
    );
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
    const seg = controller.getSelectedSegment();
    if (!seg) return;
    const meters = Number(wallLengthInput!.value.replace(',', '.'));
    const pxLen = dist(seg.a, seg.b);
    const ppm = scaleFromTypedLength(pxLen, meters);
    if (ppm === null) {
      syncLengthFieldFromSelection();
      return;
    }
    pxInput!.value =
      ppm >= 20 ? String(Math.round(ppm * 10) / 10) : String(Math.round(ppm * 100) / 100);
    updateHud(controller.model);
    paint();
    syncingLengthField = true;
    wallLengthInput!.value = meters.toFixed(2);
    syncingLengthField = false;
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
    const hasWall = controller.selectedWallIndex !== null;
    const hasVert = controller.selectedVertexIndex !== null;
    const closed = model.status === 'closed';

    if (closed && model.vertices.length >= 3) {
      const a = polygonAreaM2(model.vertices, ppm);
      const text = formatArea(a);
      areaBadge!.textContent = text;
      areaBadge!.classList.remove('hidden');

      if (hasVert) {
        const deg = controller.getSelectedCornerAngle();
        statusEl!.textContent =
          deg !== null
            ? tr.statusClosedCorner(text, formatDegrees(deg))
            : tr.statusClosed(text);
      } else if (hasWall) {
        statusEl!.textContent = tr.statusClosedWall(text);
      } else {
        const odd: string[] = [];
        for (let i = 0; i < model.vertices.length; i++) {
          const d = cornerAngleAt(model.vertices, i, true);
          if (d !== null && !isCanonicalAngle(d)) odd.push(`#${i + 1} ${formatDegrees(d)}`);
        }
        statusEl!.textContent =
          odd.length > 0 ? tr.statusClosedOdd(text, odd.join(', ')) : tr.statusClosed(text);
      }
      return;
    }

    areaBadge!.classList.add('hidden');
    if (model.status === 'empty') {
      statusEl!.textContent = tr.statusEmpty;
    } else if (model.status === 'drawing') {
      statusEl!.textContent = tr.statusDrawing;
    } else if (hasVert) {
      const deg = controller.getSelectedCornerAngle();
      statusEl!.textContent =
        deg !== null ? tr.statusCorner(formatDegrees(deg)) : tr.statusCorner('—');
    } else if (hasWall) {
      statusEl!.textContent = tr.statusWallSelected;
    } else {
      statusEl!.textContent = tr.statusOpen(Math.max(0, model.vertices.length - 1));
    }
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
    refreshOddListFromVertices(controller.model.vertices);
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
    controller.undo();
    syncLengthFieldFromSelection();
    syncAngleFieldFromSelection();
  });
  resetBtn.addEventListener('click', () => {
    if (popupState) dismissPopup();
    controller.reset();
    syncLengthFieldFromSelection();
    syncAngleFieldFromSelection();
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

  window.addEventListener('resize', layout);
  setupPopupDrag();
  setupLangPicker();
  applyStaticI18n();
  layout();
  updateHud(controller.model);
  syncLengthFieldFromSelection();
  syncAngleFieldFromSelection();
}
