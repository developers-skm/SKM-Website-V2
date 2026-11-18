import { useEffect, useMemo } from 'react';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'skm_recently_viewed_v1';
const MAX_STORED = 5;
export const MAX_SHOWN = 2;
// Entries vanish automatically after this long.
export const TTL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

function read() {
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(raw)) return [];
    const now = Date.now();
    return raw.filter(
      (e) => e && typeof e.id === 'string' && typeof e.t === 'number' && now - e.t < TTL_MS && getProductById(e.id),
    );
  } catch {
    return [];
  }
}

function write(entries) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* storage blocked/full - feature just stays empty */
  }
}

export function recordProductView(productId) {
  if (!productId) return;
  const rest = read().filter((e) => e.id !== productId);
  write([{ id: productId, t: Date.now() }, ...rest].slice(0, MAX_STORED));
}

// Returns the last MAX_SHOWN other products the visitor viewed (newest first,
// excluding the current one) and records the current product as viewed.
export function useRecentlyViewed(productId) {
  // Read BEFORE the effect records this visit, so the current page is never
  // listed against itself.
  const products = useMemo(() => {
    if (!productId) return [];
    return read()
      .filter((e) => e.id !== productId)
      .slice(0, MAX_SHOWN)
      .map((e) => getProductById(e.id));
  }, [productId]);

  useEffect(() => {
    recordProductView(productId);
  }, [productId]);

  return products;
}
