/**
 * Electra-palette: meestgebruikte knoppen + rest in dropdown.
 */
import {
  electraPrimary,
  electraSecondary,
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
  const secondary = electraSecondary();

  palette.innerHTML = '';

  const primaryRow = document.createElement('div');
  primaryRow.className = 'symbol-primary';
  palette.appendChild(primaryRow);

  for (const def of primary) {
    primaryRow.appendChild(makeSymbolBtn(def.id, def.labelNl, def.code, def.symbol));
  }

  // Dropdown voor overige
  const moreWrap = document.createElement('div');
  moreWrap.className = 'symbol-more';
  const moreLabel = document.createElement('span');
  moreLabel.className = 'symbol-more-label';
  moreLabel.textContent = 'Meer';
  const sel = document.createElement('select');
  sel.className = 'symbol-select';
  sel.id = 'electra-more';
  sel.setAttribute('aria-label', 'Overige electra-symbolen');
  const opt0 = document.createElement('option');
  opt0.value = '';
  opt0.textContent = '— overig —';
  sel.appendChild(opt0);
  for (const def of secondary) {
    const o = document.createElement('option');
    o.value = def.id;
    o.textContent = `${def.code} · ${def.labelNl}`;
    sel.appendChild(o);
  }
  moreWrap.appendChild(moreLabel);
  moreWrap.appendChild(sel);
  palette.appendChild(moreWrap);

  function setActiveVisual(id: string | null): void {
    active = id;
    primaryRow.querySelectorAll('.symbol-btn').forEach((el) => {
      el.classList.toggle('active', (el as HTMLElement).dataset.def === id);
    });
    const inSecondary = id && secondary.some((d) => d.id === id);
    sel.value = inSecondary ? id! : '';
    moreWrap.classList.toggle('active', !!inSecondary);
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
    c.width = 44;
    c.height = 44;
    c.className = 'symbol-canvas';
    btn.appendChild(c);
    const lab = document.createElement('span');
    lab.className = 'symbol-lab';
    lab.textContent = code;
    btn.appendChild(lab);
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 44, 44);
      drawElectraSymbol(ctx, symbol, 22, 20, 28, { viewScale: 1 });
    }
    btn.addEventListener('click', () => {
      selectTool(id);
    });
    return btn;
  }

  sel.addEventListener('change', () => {
    const id = sel.value || null;
    if (!id) {
      if (secondary.some((d) => d.id === active)) {
        setActiveVisual(null);
        api.onSelectTool(null);
      }
      return;
    }
    // select from dropdown: always activate (no toggle-off via select)
    active = id;
    primaryRow.querySelectorAll('.symbol-btn').forEach((el) => el.classList.remove('active'));
    moreWrap.classList.add('active');
    api.onSelectTool(id);
  });

  planSave?.addEventListener('click', () => {
    const name = planName?.value.trim();
    if (name) api.setActivePlanMeta(api.getActivePlanMeta().id, name);
    api.onSave();
  });

  return {
    setActiveTool: (id) => {
      setActiveVisual(id);
    },
  };
}
