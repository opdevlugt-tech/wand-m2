/**
 * Electra-palette in Installaties-HUD (NL-norm pictogrammen).
 */
import { catalogByCategory } from './config/installations';
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
  const items = catalogByCategory('electric');

  palette.innerHTML = '';
  for (const def of items) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'symbol-btn';
    btn.dataset.def = def.id;
    btn.title = def.labelNl;
    btn.setAttribute('aria-label', def.labelNl);
    const c = document.createElement('canvas');
    c.width = 44;
    c.height = 44;
    c.className = 'symbol-canvas';
    btn.appendChild(c);
    const lab = document.createElement('span');
    lab.className = 'symbol-lab';
    lab.textContent = def.code;
    btn.appendChild(lab);
    palette.appendChild(btn);

    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 44, 44);
      drawElectraSymbol(ctx, def.symbol, 22, 20, 28);
    }

    btn.addEventListener('click', () => {
      const next = active === def.id ? null : def.id;
      active = next;
      palette.querySelectorAll('.symbol-btn').forEach((el) => {
        el.classList.toggle('active', (el as HTMLElement).dataset.def === active);
      });
      api.onSelectTool(active);
    });
  }

  planSave?.addEventListener('click', () => {
    const name = planName?.value.trim();
    if (name) api.setActivePlanMeta(api.getActivePlanMeta().id, name);
    api.onSave();
  });

  return {
    setActiveTool: (id) => {
      active = id;
      palette.querySelectorAll('.symbol-btn').forEach((el) => {
        el.classList.toggle('active', (el as HTMLElement).dataset.def === active);
      });
    },
  };
}
