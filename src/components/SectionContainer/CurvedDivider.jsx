/**
 * Curved section boundary — replaces a flat 1px border between two stacked
 * sections so the page reads as chapters rather than a stack of rectangles.
 * A single same-tone wave (matching the section below) reads as too subtle
 * a gradient at low height, so this draws the curve as a filled shape that
 * sits ON the preceding section's background (`bg`) using the following
 * section's color (`fill`) plus a thin brand-tinted edge line along the
 * curve itself — enough definition to read as a deliberate shape without
 * introducing a loud color band.
 */
export default function CurvedDivider({ flip = false, bg = '#fff', fill = '#ececec', className = '' }) {
  return (
    <div
      aria-hidden
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${flip ? '-scale-y-100' : ''} ${className}`}
      style={{ backgroundColor: bg }}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[36px] sm:h-[52px] lg:h-[64px] block"
      >
        <path
          d="M0,55 C240,15 480,15 720,45 C960,75 1200,75 1440,40 L1440,120 L0,120 Z"
          fill={fill}
        />
        <path
          d="M0,55 C240,15 480,15 720,45 C960,75 1200,75 1440,40"
          fill="none"
          stroke="#e40a18"
          strokeOpacity="0.18"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
