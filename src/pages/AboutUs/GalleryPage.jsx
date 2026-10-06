import { useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper/PageWrapper';
import MomentsHero from '../../components/Gallery/MomentsHero';
import YearNav from '../../components/Gallery/YearNav';
import YearSection from '../../components/Gallery/YearSection';
import MomentsLightbox from '../../components/Gallery/MomentsLightbox';
import { buildTimeline, availableFilters } from '../../components/Gallery/momentsUtils';
import { moments } from '../../data/galleryMoments';

// All content lives in src/data/galleryMoments.js — this page only renders it.
export default function GalleryPage({ onPageChange }) {
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const trackRef = useRef(null);

  const filters = useMemo(() => availableFilters(moments), []);
  const { groups, flat } = useMemo(() => buildTimeline(moments, filter), [filter]);

  // Hero collage: photos flagged `hero: true`, otherwise the newest three.
  const heroPhotos = useMemo(() => {
    const all = buildTimeline(moments).flat;
    const flagged = all.filter((m) => m.hero);
    return (flagged.length ? flagged : all).slice(0, 3);
  }, []);

  const open = (moment) => setOpenIndex(flat.findIndex((m) => m.id === moment.id));

  return (
    <PageWrapper
      seo={{
        title: 'Gallery | Moments That Define Our Journey | SKM Egg Products',
        description:
          'Milestones, celebrations, recognitions and memorable moments from the SKM Egg Products journey — events, honours and awards in chronological order.',
        keywords:
          'SKM Egg Products gallery, SKM awards, APEDA golden trophy, Padma Shree, Fi Asia, Gulfood Manufacturing, SKM events',
        canonical: 'https://www.skmegg.com/gallery',
      }}
      onPageChange={onPageChange}
    >
      <div className="w-full overflow-x-clip bg-page">
        <MomentsHero photos={heroPhotos} />

        {/* Year navigator: docks to the top of the screen (+ secondary type filter) */}
        <YearNav groups={groups} filters={filters} filter={filter} onFilter={setFilter} trackRef={trackRef} />

        <main ref={trackRef} className="mx-auto w-full max-w-[1320px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-32">
          {groups.map((g) => (
            <YearSection key={`${filter}-${g.id}`} group={g} onOpen={open} />
          ))}
        </main>
      </div>

      <AnimatePresence>
        {openIndex !== null && openIndex >= 0 && (
          <MomentsLightbox
            key="viewer"
            items={flat}
            index={openIndex}
            onIndex={setOpenIndex}
            onClose={() => setOpenIndex(null)}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
