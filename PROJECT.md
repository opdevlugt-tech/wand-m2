# Wand-m² — projectkaart

**Pad:** `C:\Projects\wand-m2`  
**Live:** https://opdevlugt-tech.github.io/wand-m2/  
**Repo branch:** `master` @ `73ca182` (sync origin)

## Doel

Visueel m² + plattegrond (wanden, multi-kamer, deuren) en installaties (Electra pins/leidingen/BOM) tekenen op desktop én mobiel (PWA). Delen via GitHub Pages.

## Stack

- Vite 6 + TypeScript + Canvas 2D + Three.js (3D walk)
- Vitest · PWA (manifest + SW) · gh-pages base `/wand-m2/`

## Run / test / build

```bash
cd C:\Projects\wand-m2
npm install
npm run dev              # lokaal
npm test                 # vitest (41)
npm run build            # tsc + vite; base default /wand-m2/
npm run build:pages      # zelfde + cross-env BASE (optioneel)
# deploy: gh-pages -d dist -t
```

## Status

| Fase | Inhoud | Status |
|------|--------|--------|
| **Fase 1** | Wanden, snap, multi-kamer, deuren, i18n, PWA, HUD | ✅ afgerond |
| **Fase 2** | PNG-export, tab Installaties (Electra), leidingen m, DV, BOM, 3D walk | 🟡 deels live; doorontwikkeling |
| **Volgende (FASE2)** | Water/afvoer · leiding wall-snap · BOM CSV · dogfood | open |

Detail product: `FASE2.md` · README: collega-share + PWA-stappen.

## Techniek (ankers)

- Geometry: `src/geometry/` · canvas: `src/canvas/` · app: `src/app.ts`
- Install/BOM: `src/install/`, `src/config/installations.ts`
- 3D: `src/view3d.ts` · tests: `tests/` (geometry 35 + bom 6)

## Open risico’s

- Untracked debug: `refs/debug/`, `refs/wcd-symbols/`, `scripts/chrome-dump*.mjs` — **niet committen**
- Grote JS-chunk (~630 kB) door Three.js — later code-split overwegen
- `cross-env` in `build:pages` maar niet in package.json deps (default `build` is OK via vite `BASE` default)
- FASE2.md testcount verouderd (35 → nu 41)
- Vault card `AgentVault/projects/wand-m2.md` was nog P0-plan-status (verversen bij focus)

## COS

Zie `.grok/Agents.md` · geen parallel multi-window op 1 bug · 1× `npm run dev`.
