# Wand-m² — Fase 1 afgerond · Fase 2 start

**Live:** https://opdevlugt-tech.github.io/wand-m2/  
**Repo:** `C:\Projects\wand-m2`  
**Stack:** Vite 6 + TypeScript + canvas · Vitest 35 · PWA + gh-pages  
**Laatste UI-pass:** gestroomlijnde HUD (2 rijen, gelabelde groepen)

---

## Fase 1 — wat er staat (product)

| Feature | Status |
|---------|--------|
| Wanden tekenen, 45/90-snap, lus sluiten | ✅ |
| Multi-kamer: ✂ Scheiding + Deel… ÷2/3/4 | ✅ (flow OK) |
| Deuren (0,9 m op 1 m OK), L/R, swing | ✅ |
| Kamer type + naam + m²-badge (compact) | ✅ |
| Muurmaten + 1× totaal L×B | ✅ |
| Zoom/pan/Fit, undo-stack, Opslaan/Laden JSON | ✅ |
| i18n 5 talen, PWA, QR/share | ✅ |
| HUD gestroomlijnd (Muur / Deur / Kamer / Zoom) | ✅ |

**Niet in scope fase 1 (bewust open):**
- PNG/PDF export
- CAD-rail sleep zonder loze ruimte edge cases
- Multi-bedrijf / accounts
- Offline conflict-merge bij concurrent edits

---

## Bediening (na UI-pass)

1. **Teken** wanden → sluit lus  
2. **Muur** selecteren → lengte / hoek / +Deur  
3. **Kamer** → type/naam · ✂ Scheiding of Deel… · Weg = merge  
4. **Opslaan** als je klaar bent  

Footer-hint volgt dezelfde flow.

---

## Fase 2 — in gang

### Klaar in deze ronde
- **PNG-export** (knop PNG)
- **Tab Installaties**: bibliotheek opgeslagen tekeningen + componenten
- Catalogus **3 categorieën**: Elektra · Water · Afvoer (plaatsen in kamer-midden)
- Symbolen op plattegrond

### Volgende (per categorie uitwerken)
1. **Elektra** — slepen/plaatsen op klik, wall-snap, aantallen
2. **Water** — leiding-logica / koppeling aan ruimtes
3. **Afvoer** — valhoogte / putten

Zie ook eerdere P0: demo-plan, dogfood.

---

## Technische ankers

- Geometry: `src/geometry/math.ts`  
- Interactie: `src/canvas/interaction.ts`  
- Render: `src/canvas/renderer.ts`  
- UI: `index.html` + `src/app.ts` + `src/style.css`  
- Config kamers: `src/config/rooms.ts`  
- Tests: `tests/geometry.test.ts` (35)

**Deploy:** `BASE=/wand-m2/ vite build` → `gh-pages -d dist`

---

## Werkafspraak fase 2

- Eén focus per sessie + **Klaar als**  
- Zichtbaar verschil bij UX  
- Na wijziging: `vitest` + `tsc` + build/deploy  
- Geen half-edits laten liggen

*Document bijgewerkt bij start fase 2 — HUD streamlijn + compact m².*
