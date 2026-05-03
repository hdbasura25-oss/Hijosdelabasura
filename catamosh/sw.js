const CACHE_NAME = 'catamosh-v2';
const urlsToCache = [
  '/Hijosdelabasura/catamosh/',
  '/Hijosdelabasura/catamosh/index.html',
  '/Hijosdelabasura/catamosh/manifest.json',
  '/Hijosdelabasura/catamosh/voices.mp3',
  '/Hijosdelabasura/catamosh/audio_es.mp3',
  '/Hijosdelabasura/catamosh/audio_en.mp3',
  '/Hijosdelabasura/catamosh/icon-192.png',
  '/Hijosdelabasura/catamosh/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
