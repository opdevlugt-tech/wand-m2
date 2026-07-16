# Wand-m² — COS agents (project)

Workspace: `C:\Projects\wand-m2`  
Vault: `C:\Users\casper\AgentVault\` · contract: `HOW-WE-WORK.md`

## Rollen

| Rol | Venster | Doet |
|-----|---------|------|
| **Planner** | Grok chat | Spec, keuzes, aanpak — weinig tools |
| **Operator** | Hermes (grok-4.5 SuperGrok) | Audit, git, vault, tests/build, light 1–2 files, dispatch |
| **Builder** | Cursor Composer 2.5 / grok-CLI `grok-composer-2.5-fast` | Multi-file features, 3D/refactors, PR-werk |

## Hard rules

1. **1 spoor per taak** — nooit parallel Hermes + Composer op dezelfde bug.
2. Start met `Focus · Klaar-als · Project: C:\Projects\wand-m2`.
3. Multi-file / pro 3D → **builder** (Composer of grok-CLI); Hermes verifieert test/build.
4. Zware code via Hermes-dispatch:
   ```text
   grok --no-auto-update --always-approve -m grok-composer-2.5-fast \
     -p "<taak + DoD>" --cwd C:/Projects/wand-m2
   ```
   Zonder `--always-approve` voor read-only review.

## Stable-ops

- **Eén** `npm run dev` (poort check vóór start; geen tweede stack).
- Geen chrome-debug profiles / dumps in git (`refs/debug/`, chrome dumps).
- Na code-wijziging: `npm test` + `npm run build` (Pages base default `/wand-m2/`).
- Live: https://opdevlugt-tech.github.io/wand-m2/

## Scope-notities

- Plattegrond ≠ installs: install-paint alleen bij `appMode=install`.
- 3D overlay: query op `document`, niet alleen `#app`.
- Referentie-symbolen (WCD e.d.): pixel-match t.o.v. `refs/` PNG, niet gokken.
