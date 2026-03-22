// Self-destructing Service Worker to clean up old PWA caches from GitHub Pages
self.addEventListener('install', (e) => {
  // Force this new service worker to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    // Delete all existing caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Unregister the service worker completely
      self.registration.unregister();
    })
  );
});