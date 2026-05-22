const CACHE = 'qadaya-v1';
const ASSETS = [
  '/', '/index.html', '/manifest.json', '/icon.svg',
  'https://cdn.jsdelivr.net/gh/Flasha-0/flasha-design-system@main/flasha-styles.css',
  'https://cdn.jsdelivr.net/gh/Flasha-0/flasha-design-system@main/flasha-scripts.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
});

self.addEventListener('fetch', e => {
  const { request } = e;
  if (request.method !== 'GET') return;
  e.respondWith(
    caches.match(request).then(cached => cached || fetch(request).then(response => {
      return caches.open(CACHE).then(cache => {
        if (request.url.startsWith('http')) cache.put(request, response.clone());
        return response;
      });
    }))
  );
});
