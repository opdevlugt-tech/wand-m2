/**
 * Installaties-tab: bibliotheek + catalogus + geplaatste componenten.
 */
import {
  INSTALL_CATEGORIES,
  catalogByCategory,
  getInstallDef,
  newPlaceId,
  type InstallCategory,
  type PlacedInstall,
} from './config/installations';
import {
  createPlanDoc,
  deletePlan,
  readLibrary,
  upsertPlan,
  type PlanDocument,
} from './storage/plans';
import type { DrawingModel } from './geometry/types';

export type InstallPanelApi = {
  getModel: () => DrawingModel;
  getPxPerMeter: () => number;
  getInstallations: () => PlacedInstall[];
  setInstallations: (items: PlacedInstall[]) => void;
  openPlan: (plan: PlanDocument) => void;
  getActivePlanMeta: () => { id: string | null; name: string };
  setActivePlanMeta: (id: string | null, name: string) => void;
  getSelectedLoopCentroid: () => { x: number; y: number; loopId: string | null } | null;
  getPlanCentroid: () => { x: number; y: number };
  onChange: () => void;
  /** Prompt for plan name when saving from panel */
  getPlanNameInput?: () => string;
};

export type InstallPanelHandle = {
  /** Full UI refresh (library + placed + label) */
  refreshAll: () => void;
  /** After tab1 Opslaan: library already updated — just re-render list */
  refreshLibrary: () => void;
};

export function bootInstallPanel(
  root: HTMLElement,
  api: InstallPanelApi,
): InstallPanelHandle {
  const planName = root.querySelector<HTMLInputElement>('#plan-name');
  const planSaveLib = root.querySelector<HTMLButtonElement>('#plan-save-lib');
  const planLibrary = root.querySelector<HTMLElement>('#plan-library');
  const installCats = root.querySelector<HTMLElement>('#install-cats');
  const installCatalog = root.querySelector<HTMLElement>('#install-catalog');
  const installPlaced = root.querySelector<HTMLElement>('#install-placed');
  const installActivePlan = root.querySelector<HTMLElement>('#install-active-plan');
  if (
    !planName ||
    !planSaveLib ||
    !planLibrary ||
    !installCats ||
    !installCatalog ||
    !installPlaced ||
    !installActivePlan
  ) {
    console.warn('install panel missing nodes');
    return { refreshAll: () => {}, refreshLibrary: () => {} };
  }

  let activeCat: InstallCategory = 'electric';

  function refreshLibrary(): void {
    const lib = readLibrary();
    planLibrary!.innerHTML = '';

    // Always show current unsaved/working plan at top if it has geometry
    const model = api.getModel();
    const roomsNow = model.loops?.length ?? 0;
    const vertsNow = model.vertices?.length ?? 0;
    const hasWork = roomsNow > 0 || vertsNow > 0;
    const meta = api.getActivePlanMeta();

    if (hasWork) {
      const li = document.createElement('li');
      li.className = 'plan-item plan-item-current';
      const inLib = meta.id && lib.some((p) => p.id === meta.id);
      li.innerHTML = `
        <div class="plan-open plan-current-card">
          <strong>${escapeHtml(meta.name || 'Huidig plan')}</strong>
          <span>${roomsNow} kamer(s) · ${api.getInstallations().length} install.${
            inLib ? ' · in bibliotheek' : ' · nog niet in lijst — klik Opslaan'
          }</span>
        </div>
      `;
      planLibrary!.appendChild(li);
    }

    if (!lib.length && !hasWork) {
      planLibrary!.innerHTML =
        '<li class="plan-empty">Nog geen plannen. Teken op Plattegrond en druk <strong>Opslaan</strong>.</li>';
      return;
    }

    if (!lib.length && hasWork) {
      const tip = document.createElement('li');
      tip.className = 'plan-empty';
      tip.textContent =
        'Bibliotheek leeg — druk Opslaan op Plattegrond om hier te bewaren.';
      planLibrary!.appendChild(tip);
      return;
    }

    for (const p of lib) {
      const li = document.createElement('li');
      li.className = 'plan-item';
      if (meta.id === p.id) li.classList.add('plan-item-active');
      const rooms = p.model.loops?.length ?? 0;
      const inst = p.installations?.length ?? 0;
      const when = new Date(p.savedAt).toLocaleString('nl-NL', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      li.innerHTML = `
        <button type="button" class="plan-open btn" data-id="${escapeAttr(p.id)}">
          <strong>${escapeHtml(p.name)}</strong>
          <span>${rooms} kamer(s) · ${inst} install. · ${when}</span>
        </button>
        <button type="button" class="plan-del btn btn-danger" data-id="${escapeAttr(p.id)}" title="Verwijderen">×</button>
      `;
      planLibrary!.appendChild(li);
    }

    planLibrary!.querySelectorAll('.plan-open[data-id]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id!;
        const plan = readLibrary().find((x) => x.id === id);
        if (!plan) return;
        api.openPlan(plan);
        planName!.value = plan.name;
        refreshPlaced();
        refreshActiveLabel();
        refreshLibrary();
      });
    });
    planLibrary!.querySelectorAll('.plan-del').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = (btn as HTMLElement).dataset.id!;
        if (!confirm('Plan uit bibliotheek verwijderen?')) return;
        deletePlan(id);
        const m = api.getActivePlanMeta();
        if (m.id === id) api.setActivePlanMeta(null, '');
        refreshLibrary();
        refreshActiveLabel();
      });
    });
  }

  function refreshCatalog(): void {
    const items = catalogByCategory(activeCat);
    installCatalog!.innerHTML = '';
    for (const c of items) {
      const li = document.createElement('li');
      li.className = 'catalog-item';
      li.innerHTML = `
        <span class="catalog-code" style="border-color:${c.color};color:${c.color}">${c.code}</span>
        <span class="catalog-label">${escapeHtml(c.labelNl)}</span>
        <button type="button" class="btn btn-primary catalog-add" data-def="${escapeAttr(c.id)}">+</button>
      `;
      installCatalog!.appendChild(li);
    }
    installCatalog!.querySelectorAll('.catalog-add').forEach((btn) => {
      btn.addEventListener('click', () => {
        placeComponent((btn as HTMLElement).dataset.def!);
      });
    });
  }

  function placeComponent(defId: string): void {
    const def = getInstallDef(defId);
    if (!def) return;
    const sel = api.getSelectedLoopCentroid();
    const pos = sel ?? api.getPlanCentroid();
    const item: PlacedInstall = {
      id: newPlaceId(),
      defId,
      x: pos.x,
      y: pos.y,
      loopId: sel?.loopId ?? null,
      note: '',
    };
    api.setInstallations([...api.getInstallations(), item]);
    api.onChange();
    refreshPlaced();
  }

  function refreshPlaced(): void {
    const items = api.getInstallations();
    installPlaced!.innerHTML = '';
    if (!items.length) {
      installPlaced!.innerHTML =
        '<li class="plan-empty">Nog geen componenten. Kies hierboven en druk +.</li>';
      return;
    }
    for (const p of items) {
      const def = getInstallDef(p.defId);
      const li = document.createElement('li');
      li.className = 'placed-item';
      const cat =
        INSTALL_CATEGORIES.find((c) => c.id === def?.category)?.short ?? '?';
      li.innerHTML = `
        <span class="catalog-code" style="border-color:${def?.color ?? '#888'};color:${def?.color ?? '#888'}">${def?.code ?? '?'}</span>
        <span class="placed-meta">
          <strong>${escapeHtml(def?.labelNl ?? p.defId)}</strong>
          <span>${cat}</span>
        </span>
        <button type="button" class="btn btn-danger placed-del" data-id="${escapeAttr(p.id)}">×</button>
      `;
      installPlaced!.appendChild(li);
    }
    installPlaced!.querySelectorAll('.placed-del').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id!;
        api.setInstallations(api.getInstallations().filter((x) => x.id !== id));
        api.onChange();
        refreshPlaced();
      });
    });
  }

  function refreshActiveLabel(): void {
    const meta = api.getActivePlanMeta();
    const rooms = api.getModel().loops?.length ?? 0;
    installActivePlan!.textContent = meta.name
      ? `${meta.name}${meta.id ? '' : ' (niet opgeslagen)'}`
      : rooms
        ? 'Huidig plan (druk Opslaan om in bibliotheek te zetten)'
        : '— geen plan —';
    if (meta.name && planName && !planName.value) planName.value = meta.name;
  }

  function refreshAll(): void {
    refreshLibrary();
    refreshPlaced();
    refreshActiveLabel();
  }

  installCats!.querySelectorAll('.install-cat').forEach((btn) => {
    btn.addEventListener('click', () => {
      installCats!.querySelectorAll('.install-cat').forEach((b) =>
        b.classList.remove('active'),
      );
      btn.classList.add('active');
      activeCat = (btn as HTMLElement).dataset.cat as InstallCategory;
      refreshCatalog();
    });
  });

  planSaveLib!.addEventListener('click', () => {
    const meta = api.getActivePlanMeta();
    const name =
      planName!.value.trim() || meta.name || defaultPlanName();
    const doc = createPlanDoc(
      name,
      api.getModel(),
      api.getPxPerMeter(),
      api.getInstallations(),
      meta.id ?? undefined,
      [],
    );
    upsertPlan(doc);
    api.setActivePlanMeta(doc.id, doc.name);
    planName!.value = doc.name;
    refreshAll();
    api.onChange();
  });

  refreshCatalog();
  refreshAll();

  return { refreshAll, refreshLibrary };
}

function defaultPlanName(): string {
  const d = new Date();
  return `Plan ${d.toLocaleDateString('nl-NL')} ${d.toLocaleTimeString('nl-NL', {
    hour: '2-digit',
    minute: '2-digit',
  })}`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(s: string): string {
  return escapeHtml(s).replace(/'/g, '&#39;');
}
