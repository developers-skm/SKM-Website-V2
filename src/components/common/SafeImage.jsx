import { useState, useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';

// Wraps a plain <img> with resilience against the intermittent "image just
// doesn't load" failures reported on the homepage — a slow/dropped network
// request or a transient CDN hiccup, not a missing file. On error, retries
// the same src once (cache-busted) before falling back to a quiet neutral
// placeholder instead of the browser's broken-image icon, so a section
// never shows a broken visual. `as` lets callers render framer-motion's
// `motion.img` here for entrance/crossfade animations while keeping the
// same retry/fallback behavior — pass `motion.img` as `as`.
const SafeImage = forwardRef(function SafeImage(
  { src, alt, as: Component = 'img', className = '', onError, ...rest },
  ref
) {
  const [failed, setFailed] = useState(false);
  const retriedRef = useRef(false);

  const handleError = (event) => {
    if (!retriedRef.current) {
      retriedRef.current = true;
      // Cache-bust so a genuinely transient failure (dropped packet, cold
      // CDN edge) gets a real second attempt rather than re-hitting the
      // browser's cached failure for the same URL.
      event.currentTarget.src = `${src}${src.includes('?') ? '&' : '?'}retry=1`;
      return;
    }
    setFailed(true);
    onError?.(event);
  };

  if (failed) {
    return (
      <div
        ref={ref}
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-surface-100 text-surface-400 ${className}`}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z" />
          <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      </div>
    );
  }

  return (
    <Component
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
    />
  );
});

SafeImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  className: PropTypes.string,
  onError: PropTypes.func,
};

export default SafeImage;
