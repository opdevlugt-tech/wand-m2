# Electra-symbolbronnen (CAD / vector) voor wand-m2

Doel: bestanden waarmee we symbolen **kunnen uitlezen** (SVG/DXF/DWG),
niet alleen gescande PDF-pagina’s.

## Wat lokaal staat

| Pad | Type | Bruikbaarheid |
|-----|------|----------------|
| `FIA Electrical Symbols CAD Blocks 01.dwg` | DWG 2010 | **Ja** – vrije plan-symbolen (UK/architectuur: switches, sockets, lights). Download: First In Architecture. |
| `fia-electrical.zip` | zip met die DWG | idem |
| `electricalsymbols/` | SVG (IEC 60617) | **Ja, vector** – maar **schema** (schakelingen), niet plattegrond-WCD. Repo: https://github.com/chille/electricalsymbols |
| `nl-png/` | PNG referentie | NL WCD randaarde pixel-refs (elektraklus) |

## Beste bronnen om mee te werken

### 1. Plan-symbolen (plattegrond) — dit hebben we nodig
- **First In Architecture – Electrical CAD Blocks**  
  https://www.firstinarchitecture.co.uk/cad-blocks-electrical-symbols/  
  → lokaal: `FIA Electrical Symbols CAD Blocks 01.dwg`  
  Inhoud: sockets, light switches, lights, data, CU, etc. (Brits plan-gebruik; vorm ligt dicht bij NL-installatietekening).

- **CAD-block Electric Symbols**  
  https://cad-block.com/595-electric-symbols.html  
  Free DWG: switches, sockets, floor sockets, TV/tel, …  
  (site wil vaak captcha; handmatig downloaden als de automatiek faalt)

- **DWGmodels Electrical Symbols**  
  https://dwgmodels.com/173-electrical-symbols.html

### 2. Schema-symbolen (IEC) — bruikbaar vector, andere context
- **chille/electricalsymbols** (SVG, IEC 60617)  
  https://github.com/chille/electricalsymbols  
  → lokaal gecloned onder `electricalsymbols/`  
  Handig voor: schakelaars NO/NC, PE, motoren, TL-achtige lamp — **niet** voor WCD-op-plattegrond.

### 3. NL-referentie (pixels, wel correcte WCD-vorm)
- elektraklus:  
  https://home.hccnet.nl/t.pop/overig-html/symbolen.html  
  PNG’s: `WCD-enkel-randaarde.png`, `WCD-dubbel-randaarde.png`  
  → lokaal onder `nl-png/`

## Wat *niet* handig is (voor code)
- Kenteq PDF-preview: raster + watermerk, geen vector-export.
- Google Images / gescande tabellen: geen schone pad-data.

## Volgende stap (aanbevolen)
1. **FIA DWG** openen in AutoCAD / LibreCAD / FreeCAD en exporteren naar **DXF R12** of per-symbool **SVG**.
2. Of: jij levert een **DXF/SVG zip** van de NL-set die jullie standaard gebruiken (Kenteq-officieel of eigen bibliotheek).
3. Daarna: symbolen 1:1 in `src/canvas/symbols.ts` of als SVG-assets inladen.

## Licentie / gebruik
- FIA: check site-voorwaarden (typisch free for personal/educational use).
- chille/electricalsymbols: zie repo LICENSE.
- Niet 1:1 commercieel doorverkopen zonder bron te checken.

## Pipeline (gedaan)

1. Download FIA DWG
2. `libredwg/dwg2dxf.exe` → `fia-electrical.dxf`
3. Python+ezdxf cluster labels ↔ geometry → `fia-symbols.json`
4. Slim map → `src/assets/fia-paths.json`
5. Renderer: `src/canvas/cad-paths.ts` + FIA_MAP in `symbols.ts`

WCD randaarde blijft NL-handgetekend (FIA = UK switched socket).
