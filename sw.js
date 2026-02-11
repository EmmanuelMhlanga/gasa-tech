const CACHE_NAME = 'gasa-tech-v1';
const ASSETS = [
  '/',
  'index.html',
  'about.html',
  'services.html',
  'portfolio.html',
  'pricing.html',
  'contact.html',
  'style.css',
  'script.js',
  'manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Intercept Requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
