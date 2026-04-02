const CACHE_NAME = 'gasa-tech-v1.1'; // Increment this when you update your CSS or HTML
const ASSETS = [
  '/',
  'index.html',
  'about.html',
  'services.html',
  'portfolio.html',
  'pricing.html',
  'privacy.html', // Added the new privacy page
  'contact.html',
  'favicon.png',
  'manifest.json'
];

// 1. Install Service Worker & Cache Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching System Files');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Forces the waiting service worker to become the active one
});

// 2. Activate & Cleanup Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting Obsolete Cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Immediately take control of all open tabs
});

// 3. Network-First / Cache-Fallback Strategy
// This ensures users get the latest content if online, but the cached version if offline.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
