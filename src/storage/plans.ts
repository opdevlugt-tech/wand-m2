import type { DrawingModel } from '../geometry/types';
import type { InstallRun, PlacedInstall } from '../config/installations';

export const LIBRARY_KEY = 'wand-m2-library';
export const AUTOSAVE_KEY = 'wand-m2-autosave';

export type PlanDocument = {
  v: 1;
  id: string;
  name: string;
  savedAt: string;
  pxPerMeter: number;
  model: DrawingModel;
  installations: PlacedInstall[];
  /** Getekende leidingen (polyline, m) */
  runs?: InstallRun[];
};

function uid(): string {
  return `P${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

export function emptyModel(): DrawingModel {
  return {
    loops: [],
    status: 'idle',
    vertices: [],
    draftEnd: null,
    partitionPath: null,
    partitionLoopIndex: null,
  };
}

export function readLibrary(): PlanDocument[] {
  try {
    const raw = localStorage.getItem(LIBRARY_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw) as PlanDocument[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function writeLibrary(plans: PlanDocument[]): void {
  localStorage.setItem(LIBRARY_KEY, JSON.stringify(plans));
}

export function upsertPlan(plan: PlanDocument): PlanDocument[] {
  const lib = readLibrary();
  const i = lib.findIndex((p) => p.id === plan.id);
  if (i >= 0) lib[i] = plan;
  else lib.unshift(plan);
  writeLibrary(lib);
  return lib;
}

export function deletePlan(id: string): PlanDocument[] {
  const lib = readLibrary().filter((p) => p.id !== id);
  writeLibrary(lib);
  return lib;
}

export function createPlanDoc(
  name: string,
  model: DrawingModel,
  pxPerMeter: number,
  installations: PlacedInstall[] = [],
  existingId?: string,
  runs: InstallRun[] = [],
): PlanDocument {
  return {
    v: 1,
    id: existingId ?? uid(),
    name: name.trim() || 'Naamloos plan',
    savedAt: new Date().toISOString(),
    pxPerMeter,
    model: JSON.parse(JSON.stringify(model)) as DrawingModel,
    installations: JSON.parse(JSON.stringify(installations)) as PlacedInstall[],
    runs: JSON.parse(JSON.stringify(runs)) as InstallRun[],
  };
}

export function parsePlanPayload(data: unknown): PlanDocument | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  // New library shape
  if (d.v === 1 && d.model && typeof d.model === 'object') {
    const model = d.model as DrawingModel;
    if (!Array.isArray(model.loops)) return null;
    return {
      v: 1,
      id: typeof d.id === 'string' ? d.id : uid(),
      name: typeof d.name === 'string' ? d.name : 'Geïmporteerd',
      savedAt: typeof d.savedAt === 'string' ? d.savedAt : new Date().toISOString(),
      pxPerMeter: typeof d.pxPerMeter === 'number' ? d.pxPerMeter : 50,
      model,
      installations: Array.isArray(d.installations)
        ? (d.installations as PlacedInstall[])
        : [],
      runs: Array.isArray(d.runs) ? (d.runs as InstallRun[]) : [],
    };
  }
  // Legacy save: { pxPerMeter, model }
  if (d.model && typeof d.model === 'object') {
    const model = d.model as DrawingModel;
    if (!Array.isArray(model.loops)) return null;
    return createPlanDoc(
      'Geïmporteerd',
      model,
      typeof d.pxPerMeter === 'number' ? d.pxPerMeter : 50,
      [],
      undefined,
      [],
    );
  }
  return null;
}
