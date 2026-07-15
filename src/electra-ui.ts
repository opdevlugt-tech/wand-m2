/**
 * Electra-palette: vaste favorieten + 4 groepen (dropdowns).
 * Groepen: Schakelmateriaal · Voedingen · Leidingen · Standaard
 */
import {
  ELECTRA_GROUP_META,
  electraGroupItems,
  electraPrimary,
  type ElectraGroup,
} from './config/installations';
import { drawElectraSymbol } from './canvas/symbols';

export type ElectraUiApi = {
  getActivePlanMeta: () => { id: string | null; name: string };
  setActivePlanMeta: (id: string | null, name: string) => void;
  onSelectTool: (defId: string | null) => void;
  onSave: () => void;
};

export function bootElectraPalette(
  root: HTMLElement,
  api: ElectraUiApi,
): { setActiveTool: (id: string | null) => void } {
  const palette = root.querySelector<HTMLElement>('#electra-palette');
  const planSave = root.querySelector<HTMLButtonElement>('#plan-save-lib');
  const planName = root.querySelector<HTMLInputElement>('#plan-name');
  if (!palette) return { setActiveTool: () => {} };

  let active: string | null = null;
  const primary = electraPrimary();
  const groupItems = Object.fromEntries(
    ELECTRA_GROUP_META.map((g) => [g.id, electraGroupItems(g.id)]),
  ) as Record<ElectraGroup, ReturnType<typeof electraGroupItems>>;

  palette.innerHTML = '';

  const primaryRow = document.createElement('div');
  primaryRow.className = 'symbol-primary';
  palette.appendChild(primaryRow);

  for (const def of primary) {
    primaryRow.appendChild(makeSymbolBtn(def.id, def.labelNl, def.code, def.symbol));
  }

  const groupsRow = document.createElement('div');
  groupsRow.className = 'symbol-groups';
  palette.appendChild(groupsRow);

  const selects: { group: ElectraGroup; sel: HTMLSelectElement; wrap: HTMLElement }[] = [];

  for (const meta of ELECTRA_GROUP_META) {
    const items = groupItems[meta.id];
    if (!items.length) continue;
    const wrap = document.createElement('div');
    wrap.className = 'symbol-more';
    wrap.dataset.group = meta.id;
    const lab = document.createElement('span');
    lab.className = 'symbol-more-label';
    lab.textContent = meta.labelNl;
    const sel = document.createElement('select');
    sel.className = 'symbol-select';
    sel.setAttribute('aria-label', meta.labelNl);
    const opt0 = document.createElement('option');
    opt0.value = '';
    opt0.textContent = `— ${meta.labelNl} —`;
    sel.appendChild(opt0);
    for (const def of items) {
      const o = document.createElement('option');
      o.value = def.id;
      o.textContent = `${def.code} · ${def.labelNl}`;
      sel.appendChild(o);
    }
    wrap.appendChild(lab);
    wrap.appendChild(sel);
    groupsRow.appendChild(wrap);
    selects.push({ group: meta.id, sel, wrap });

    sel.addEventListener('change', () => {
      const id = sel.value || null;
      // clear other selects
      for (const s of selects) {
        if (s.sel !== sel) {
          s.sel.value = '';
          s.wrap.classList.remove('active');
        }
      }
      if (!id) {
        if (active && !primary.some((p) => p.id === active)) {
          setActiveVisual(null);
          api.onSelectTool(null);
        }
        return;
      }
      active = id;
      primaryRow.querySelectorAll('.symbol-btn').forEach((el) => el.classList.remove('active'));
      wrap.classList.add('active');
      api.onSelectTool(id);
    });
  }

  function setActiveVisual(id: string | null): void {
    active = id;
    primaryRow.querySelectorAll('.symbol-btn').forEach((el) => {
      el.classList.toggle('active', (el as HTMLElement).dataset.def === id);
    });
    for (const s of selects) {
      const inGroup = id && groupItems[s.group].some((d) => d.id === id);
      s.sel.value = inGroup ? id! : '';
      s.wrap.classList.toggle('active', !!inGroup);
    }
  }

  function selectTool(id: string | null): void {
    const next = active === id ? null : id;
    setActiveVisual(next);
    api.onSelectTool(next);
  }

  function makeSymbolBtn(
    id: string,
    label: string,
    code: string,
    symbol: Parameters<typeof drawElectraSymbol>[1],
  ): HTMLButtonElement {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'symbol-btn';
    btn.dataset.def = id;
    btn.title = label;
    btn.setAttribute('aria-label', label);
    const c = document.createElement('canvas');
    c.width = 32;
    c.height = 32;
    c.className = 'symbol-canvas';
    btn.appendChild(c);
    const lab = document.createElement('span');
    lab.className = 'symbol-lab';
    lab.textContent = code;
    btn.appendChild(lab);
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 32, 32);
      drawElectraSymbol(ctx, symbol, 16, 15, 22, { viewScale: 1 });
    }
    btn.addEventListener('click', () => selectTool(id));
    return btn;
  }

  planSave?.addEventListener('click', () => {
    const name = planName?.value.trim();
    if (name) api.setActivePlanMeta(api.getActivePlanMeta().id, name);
    api.onSave();
  });

  return {
    setActiveTool: (id) => setActiveVisual(id),
  };
}
