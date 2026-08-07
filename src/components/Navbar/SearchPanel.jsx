import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { searchableNavItems } from './navigationData';
import { SearchIcon } from './icons';

// Local, client-side navigation search over the overlay's own nav items —
// no backend service. Filters by label substring match, case-insensitive.
export default function SearchPanel({ onNavigate, inputRef }) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return searchableNavItems.filter((item) => item.label.toLowerCase().includes(q));
  }, [query]);

  const handleSelect = (route, prefillData) => {
    onNavigate(route, prefillData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-xl mx-auto"
    >
      <div className="flex items-center gap-3 border-b-2 border-brand-600 pb-3">
        <SearchIcon className="w-5 h-5 text-brand-600 flex-shrink-0" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search the website…"
          aria-label="Search website"
          className="flex-grow bg-transparent border-none outline-none text-[20px] md:text-[24px] font-heading font-semibold text-surface-800 dark:text-surface-100 placeholder-surface-400 dark:placeholder-surface-500"
        />
      </div>

      <div className="mt-6">
        {query.trim() === '' ? (
          <p className="text-surface-500 dark:text-surface-400 text-[14px] font-body">
            Start typing to search pages across the site.
          </p>
        ) : results.length === 0 ? (
          <p className="text-surface-500 dark:text-surface-400 text-[14px] font-body">
            No matches for &ldquo;{query}&rdquo;. Try a different term, such as a product or page name.
          </p>
        ) : (
          <ul className="list-none m-0 p-0 flex flex-col gap-1">
            {results.map((item) => (
              <li key={`${item.route}-${item.label}`}>
                <button
                  type="button"
                  onClick={() => handleSelect(item.route, item.careersIntent ? { enquiryType: 'job', intentId: crypto.randomUUID() } : undefined)}
                  className="w-full text-left flex items-center min-h-[44px] px-3 py-2 rounded-lg font-body text-[16px] font-semibold text-surface-800 dark:text-surface-100 hover:bg-brand-600/8 hover:text-brand-600 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}
