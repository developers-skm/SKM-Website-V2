import { lazy } from 'react';

const RELOAD_KEY = 'skm-chunk-reload';

// After a deploy, a tab (or the service worker cache) can still hold an old
// index.html that points at hashed chunks which no longer exist, so the
// dynamic import fails and the error boundary shows "Something went wrong"
// until the user refreshes. Retry once, then hard-reload once to pick up the
// fresh index.html; the sessionStorage flag prevents a reload loop.
export default function lazyWithRetry(factory) {
  return lazy(async () => {
    try {
      const mod = await factory();
      try { sessionStorage.removeItem(RELOAD_KEY); } catch { /* ignore */ }
      return mod;
    } catch (firstError) {
      try {
        return await factory();
      } catch (error) {
        let alreadyReloaded = true;
        try {
          alreadyReloaded = sessionStorage.getItem(RELOAD_KEY) === '1';
          if (!alreadyReloaded) sessionStorage.setItem(RELOAD_KEY, '1');
        } catch { /* storage unavailable: don't risk a reload loop */ }

        if (!alreadyReloaded && navigator.onLine) {
          window.location.reload();
          // Keep Suspense showing the loader while the page reloads.
          return new Promise(() => {});
        }
        throw error || firstError;
      }
    }
  });
}
