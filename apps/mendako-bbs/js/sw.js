const CACHE_NAME = 'mendako-v1';
const urlsToCache = [
  '/mendako-bbs/',
  '/mendako-bbs/index.html',
  '/mendako-bbs/js/bbs.js',
  '/mendako-bbs/js/lib/crypto-js.min.js',
  'https://shimataiyaki.github.io/style.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
