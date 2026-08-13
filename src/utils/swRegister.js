export function registerServiceWorker() {
  if ('serviceWorker' in navigator && import.meta.env.MODE !== 'test') {
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
}
