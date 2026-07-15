# Wand-m²

Visueel m² berekenen door wanden te tekenen. Werkt op desktop en **mobiel** (PWA: openen in browser of “Zet op beginscherm”).

## Live (delen met collega’s)

Na deploy: **https://opdevlugt-tech.github.io/wand-m2/**

1. Open de link op de telefoon  
2. **iPhone (Safari):** Deel → *Zet op beginscherm*  
3. **Android (Chrome):** Menu ⋮ → *App installeren* / *Toevoegen aan startscherm*

Geen account nodig. Data blijft op het apparaat (localStorage voor taal).

## Lokaal ontwikkelen

```bash
cd C:\Projects\wand-m2
npm install
npm run dev
```

Tests / build:

```bash
npm test
npm run build          # base = /wand-m2/ (GitHub Pages)
BASE=/ npm run build   # base = / (eigen server root)
```

## Functies

- Wanden tekenen met 45°/90°/135° snap  
- Live + vaste lengtes (m), schaal px/m of lengte intypen  
- Lus sluiten → m²  
- Meetfout-popup (rood = afwijkende hoek), restfout verplaatsen met live hover  
- Talen: 🇳🇱 🇬🇧 🇪🇸 🇵🇱 🇷🇺  

## Stack

Vite + TypeScript + Canvas 2D + PWA (manifest + service worker).
