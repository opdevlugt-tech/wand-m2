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
};

export function bootInstallPanel(root: HTMLElement, api: InstallPanelApi): void {
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
    return;
  }

  let activeCat: InstallCategory = 'electric';

  function refreshLibrary(): void {
    const lib = readLibrary();
    planLibrary!.innerHTML = '';
    if (!lib.length) {
      planLibrary!.innerHTML = '<li class="plan-empty">Nog geen plannen opgeslagen.</li>';
      return;
    }
    for (const p of lib) {
      const li = document.createElement('li');
      li.className = 'plan-item';
      const rooms = p.model.loops?.length ?? 0;
      const inst = p.installations?.length ?? 0;
      const when = new Date(p.savedAt).toLocaleString('nl-NL', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      li.innerHTML = `
        <button type="button" class="plan-open btn" data-id="${p.id}">
          <strong>${escapeHtml(p.name)}</strong>
          <span>${rooms} kamer(s) · ${inst} install. · ${when}</span>
        </button>
        <button type="button" class="plan-del btn btn-danger" data-id="${p.id}" title="Verwijderen">×</button>
      `;
      planLibrary!.appendChild(li);
    }
    planLibrary!.querySelectorAll('.plan-open').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id!;
        const plan = readLibrary().find((x) => x.id === id);
        if (plan) {
          api.openPlan(plan);
          api.setActivePlanMeta(plan.id, plan.name);
          planName!.value = plan.name;
          refreshPlaced();
          refreshActiveLabel();
        }
      });
    });
    planLibrary!.querySelectorAll('.plan-del').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = (btn as HTMLElement).dataset.id!;
        if (!confirm('Plan uit bibliotheek verwijderen?')) return;
        deletePlan(id);
        const meta = api.getActivePlanMeta();
        if (meta.id === id) api.setActivePlanMeta(null, '');
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
        <button type="button" class="btn btn-primary catalog-add" data-def="${c.id}">+</button>
      `;
      installCatalog!.appendChild(li);
    }
    installCatalog!.querySelectorAll('.catalog-add').forEach((btn) => {
      btn.addEventListener('click', () => {
        const defId = (btn as HTMLElement).dataset.def!;
        placeComponent(defId);
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
    const next = [...api.getInstallations(), item];
    api.setInstallations(next);
    api.onChange();
    refreshPlaced();
  }

  function refreshPlaced(): void {
    const items = api.getInstallations();
    installPlaced!.innerHTML = '';
    if (!items.length) {
      installPlaced!.innerHTML = '<li class="plan-empty">Nog geen componenten geplaatst.</li>';
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
          <span>${cat} · (${p.x.toFixed(0)}, ${p.y.toFixed(0)})</span>
        </span>
        <button type="button" class="btn btn-danger placed-del" data-id="${p.id}">×</button>
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
    installActivePlan!.textContent = meta.name
      ? `${meta.name}${meta.id ? ` (${meta.id})` : ''}`
      : '— huidig plan (niet in bibliotheek) —';
  }

  installCats!.querySelectorAll('.install-cat').forEach((btn) => {
    btn.addEventListener('click', () => {
      installCats!.querySelectorAll('.install-cat').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = (btn as HTMLElement).dataset.cat as InstallCategory;
      refreshCatalog();
    });
  });

  planSaveLib!.addEventListener('click', () => {
    const meta = api.getActivePlanMeta();
    const name = planName!.value.trim() || meta.name || 'Plan';
    const doc = createPlanDoc(
      name,
      api.getModel(),
      api.getPxPerMeter(),
      api.getInstallations(),
      meta.id ?? undefined,
    );
    upsertPlan(doc);
    api.setActivePlanMeta(doc.id, doc.name);
    planName!.value = doc.name;
    refreshLibrary();
    refreshActiveLabel();
  });

  // public refresh hooks via custom events
  root.addEventListener('install-refresh', () => {
    refreshLibrary();
    refreshPlaced();
    refreshActiveLabel();
  });

  refreshLibrary();
  refreshCatalog();
  refreshPlaced();
  refreshActiveLabel();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
