/* RePocket Poster Studio service worker: offline app shell + notification clicks */
const VERSION = 'rps-20261005232349';
const RUNTIME = 'rps-runtime';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('rps-') && k !== VERSION && k !== RUNTIME).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // the app page: always try the network first so updates arrive, fall back to the saved copy offline
  if (req.mode === 'navigate') {
    // no-cache: check with the server every time (cheap when nothing changed), so a new version shows up straight away
    e.respondWith(fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' })
      .then(r => { if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); } return r; })
      .catch(() => caches.match('./index.html').then(r => r || caches.match('./'))));
    return;
  }

  // icons, manifest: saved copy first
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return r;
    })));
    return;
  }

  // fonts and the ZIP library: keep a copy so they work offline
  if (/(^|\.)fonts\.(googleapis|gstatic)\.com$|(^|\.)cdnjs\.cloudflare\.com$/.test(url.hostname)) {
    e.respondWith(caches.open(RUNTIME).then(c => c.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') c.put(req, r.clone());
      return r;
    }))));
  }
});

// tapping a notification brings the app to the front
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) if ('focus' in c) return c.focus();
    return self.clients.openWindow(target);
  }));
});
