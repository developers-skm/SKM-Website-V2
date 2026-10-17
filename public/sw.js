const CACHE_NAME = 'skm-offline-v2';

// A missing hashed asset is rewritten to index.html (200, text/html) by the
// host. Caching that under a .js/.css URL poisons the cache and breaks the
// page until it is cleared, so never store HTML for asset requests.
function isCacheable(response) {
  if (!response || response.status !== 200) return false;
  const type = response.headers.get('content-type') || '';
  return !type.includes('text/html');
}

// Critical core assets cached on service worker installation
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/images/offline-cracked-wifi-egg.png',
  '/site.webmanifest',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS);
    }).then(() => {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Navigation requests (HTML pages) -> Network first, fallback to cached index.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If response is valid, update index.html cache asynchronously
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('/index.html', copy));
          }
          return response;
        })
        .catch(() => {
          // When network fetch fails (offline), serve cached index.html
          return caches.match('/index.html').then((response) => {
            return response || caches.match('/');
          });
        })
    );
    return;
  }

  // 2. Static image & asset requests -> Cache first, fallback to network
  if (
    url.pathname.includes('/images/') ||
    url.pathname.includes('/assets/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Asynchronously update cache in background
          fetch(request).then((networkResponse) => {
            if (isCacheable(networkResponse)) {
              caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
            }
          }).catch(() => {/* Ignore background revalidation failure */});
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (isCacheable(networkResponse)) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Default network-only fallback
  event.respondWith(
    fetch(request).catch(() => {
      return caches.match(request);
    })
  );
});
