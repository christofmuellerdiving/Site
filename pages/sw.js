const CACHE = 'sidewinder-v1';
const ASSETS = [
  '/pages/sidewinder_de.html',
  '/pages/sidewinder_manifest.json',
  '/assets/img/sidewinder-icon-192.png',
  '/assets/img/sidewinder-icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only cache same-origin and CDN font/chart requests
  const url = new URL(e.request.url);
  const cacheable = url.origin === self.location.origin
    || url.hostname === 'fonts.googleapis.com'
    || url.hostname === 'fonts.gstatic.com'
    || url.hostname === 'cdn.jsdelivr.net';

  if (!cacheable) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
