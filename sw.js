const CACHE_NAME = 'affari-tuoi-v11';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/audio/final_sting.mp3',
  './assets/audio/gennarino.mp3',
  './assets/audio/gennarino-bark.mp3',
  './assets/audio/jingle_black.mp3',
  './assets/audio/jingle_blue.mp3',
  './assets/audio/jingle_red.mp3',
  './assets/audio/offer_sting.mp3',
  './assets/audio/phone_ring_old.mp3',
  './assets/img/gennarino.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];
 
// Installazione: mette in cache tutti gli asset
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});
 
// Attivazione: elimina le cache vecchie
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});
 
// Fetch: prima dalla cache, poi dalla rete
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
