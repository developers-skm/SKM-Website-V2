export function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || import.meta.env.MODE === 'test') return;

  // The worker serves .js/.css cache-first, which keeps dev (vite) on stale
  // modules - e.g. old src/data/*.js. Never run it in dev; drop any leftover.
  if (import.meta.env.DEV) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      if (!regs.length) return;
      Promise.all(regs.map((r) => r.unregister()))
        .then(() => caches.keys())
        .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        .then(() => window.location.reload());
    });
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[SKM SW] Registered with scope:', registration.scope);
      })
      .catch((error) => {
        console.warn('[SKM SW] Registration failed:', error);
      });
  });
}
