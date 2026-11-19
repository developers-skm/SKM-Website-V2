import React, { useEffect, useRef, useState } from 'react';

// Google Maps embeds (no API key needed). Two stacked iframes crossfade so the
// map appears to zoom out, slide to the other place, then zoom in.
const overviewUrl = (a, b) =>
  `https://maps.google.com/maps?ll=${(a[0] + b[0]) / 2},${(a[1] + b[1]) / 2}&z=11&t=m&output=embed`;

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

export default function OfficeMap({ locations, activeType }) {
  const initial = locations.find((l) => l.type === activeType) || locations[0];
  const [srcs, setSrcs] = useState([initial.mapEmbedUrl, '']);
  const [front, setFront] = useState(0);
  const frontRef = useRef(0);
  const currentType = useRef(initial.type);
  const token = useRef(0);
  const pending = useRef(null);

  // Load `url` into the hidden layer, fade it in once loaded.
  const show = (url) =>
    new Promise((resolve) => {
      const back = 1 - frontRef.current;
      const done = () => {
        if (!pending.current) return;
        pending.current = null;
        frontRef.current = back;
        setFront(back);
        resolve();
      };
      pending.current = { back, done };
      setSrcs((s) => {
        const n = [...s];
        n[back] = url;
        return n;
      });
      setTimeout(done, 4000); // fallback if onLoad never fires
    });

  useEffect(() => {
    if (activeType === currentType.current) return;
    const dest = locations.find((l) => l.type === activeType);
    const from = locations.find((l) => l.type === currentType.current);
    if (!dest || !from) return;
    currentType.current = activeType;
    const my = ++token.current;
    (async () => {
      pending.current = null;
      await show(overviewUrl(from.coords, dest.coords)); // zoom out
      if (my !== token.current) return;
      await wait(700);
      if (my !== token.current) return;
      await show(dest.mapEmbedUrl); // zoom in on destination
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeType]);

  return (
    <>
      {[0, 1].map((i) =>
        srcs[i] ? (
          <iframe
            key={i}
            src={srcs[i]}
            onLoad={() => pending.current && pending.current.back === i && pending.current.done()}
            className={`absolute inset-0 w-full h-full border-0 rounded-2xl transition-opacity duration-700 ${
              front === i ? 'opacity-100 z-[1]' : 'opacity-0 z-0 pointer-events-none'
            }`}
            allowFullScreen=""
            referrerPolicy="no-referrer-when-downgrade"
            title={`SKM locations Google Map ${i + 1}`}
          />
        ) : null
      )}
    </>
  );
}
