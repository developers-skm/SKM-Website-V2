import PageWrapper from '../../components/PageWrapper/PageWrapper';
import InternalLink from '../../components/common/InternalLink';
import { globalEvents } from '../../data/globalEvents';
import { describeDate, imageVariant, locationText } from '../../components/GlobalEvents/journeyUtils';

const link =
  'inline-flex min-h-[40px] items-center gap-2 font-body text-[13px] font-semibold text-brand-600 no-underline hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm';

// /events/<slug> - one event, built from src/data/globalEvents.js.
export default function EventDetailPage({ slug, onPageChange }) {
  const ev = globalEvents.find((e) => e.slug === slug);

  if (!ev) {
    return (
      <PageWrapper seo={{ title: 'Event not found | SKM Egg Products', description: 'This event could not be found.', canonical: 'https://www.skmegg.com/events' }}>
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center gap-5 px-4 pb-24 pt-[160px] text-center">
          <h1 className="m-0 font-heading text-[32px] font-bold text-heading">Event not found</h1>
          <InternalLink route="events" onPageChange={onPageChange} className={link}>View all events →</InternalLink>
        </div>
      </PageWrapper>
    );
  }

  const date = describeDate(ev);
  const place = locationText(ev);
  const meta = [date?.short, place, ev.venue, ev.booth].filter(Boolean);
  const hero = ev.image || ev.gallery?.[0];

  return (
    <PageWrapper
      seo={{
        title: `${ev.title} | SKM Egg Products`,
        description: ev.caption || `${ev.title} - SKM Egg Products at an international food ingredients event.`,
        keywords: `SKM Egg Products, ${ev.title}, ${ev.country} food exhibition`,
        canonical: `https://www.skmegg.com/events/${ev.slug}`,
      }}
    >
      <div className="w-full bg-page pb-20 pt-[110px] sm:pt-[130px] lg:pb-28 lg:pt-[100px]">
        <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <InternalLink route="global_reach" onPageChange={onPageChange} className={link}>← Back to Global Reach</InternalLink>
            <InternalLink route="events" onPageChange={onPageChange} className={link}>All events</InternalLink>
          </div>

          <header className="flex flex-col gap-4">
            <span className="section-label">Event</span>
            <h1 className="m-0 font-heading text-[clamp(2.2rem,4.5vw,3.75rem)] font-bold leading-[1.05] tracking-tight text-heading">{ev.title}</h1>
            {meta.length > 0 && (
              <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-surface-500">
                {meta.map((m) => <span key={m}>{m}</span>)}
              </p>
            )}
          </header>

          {hero && (
            <img
              src={imageVariant(hero, 1200)}
              alt={ev.title}
              className="aspect-[16/9] w-full rounded-[20px] object-cover shadow-[5px_3px_40px_rgba(0,72,88,0.1)]"
            />
          )}

          {ev.caption && <p className="m-0 max-w-[62ch] font-body text-[17px] leading-[30px] text-surface-600">{ev.caption}</p>}

          {ev.gallery?.length > 1 && (
            <section aria-label={`${ev.title} photographs`} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
              {ev.gallery.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt={`${ev.title} - photo ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full rounded-[14px] object-cover"
                />
              ))}
            </section>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
