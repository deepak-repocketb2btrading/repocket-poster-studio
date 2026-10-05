# RePocket Poster Studio

Turn a pasted B2B stock list into polished stock posters for WhatsApp Status, Instagram, LinkedIn and more.

**Live:** https://deepak-repocketb2btrading.github.io/repocket-poster-studio/

## What it does

- Paste a stock list exactly as a supplier sent it (WhatsApp, Excel, email). Models, storage, grade, region, battery, SIM, colour, price and quantity are detected automatically.
- 14 templates, including the default Premium look: warehouse backdrop with liquid glass cards.
- Official colours per model, phone illustrations or real product photos.
- Long lists split into a set of posters (4 per poster by default), with a download arrow on each poster and Download all as a ZIP.
- Guided tour and hover tips for the team.

## Install it as an app

It's a Progressive Web App: it installs from the browser, gets its own home-screen icon, opens full screen and works offline.

- **Android (Chrome, Edge, Samsung Internet):** open the live link and tap **Install** when the app offers it, or use the browser menu → *Install app*.
- **iPhone / iPad:** open the live link, tap **Share** → **Add to Home Screen** → **Add**. Notifications need iOS 16.4 or later and work once the app is on the Home Screen.
- **Computer (Chrome / Edge):** click **Install app** in the sidebar, or the install icon in the address bar.

## Privacy

There is no server and no login. Everything you make is stored only in your own browser on your own device (localStorage and IndexedDB). Use **Brand & settings → Download backup** to move your posters to another browser or computer.

## Updating the site

The app itself is a single file, `index.html`. `manifest.webmanifest`, `sw.js` (offline support and notifications) and `icons/` make it installable. Replace the files with a new build and push to `main`; GitHub Pages republishes automatically within a minute or two.
