// Layout primitives shared by every Careers page so width and vertical rhythm
// stay consistent: 1240px content width, 20/32/40px side padding, and
// 48 → 64 → 80px section spacing (mobile → tablet → desktop).

const WIDTHS = {
  default: 'max-w-[1240px]',
  narrow: 'max-w-[1080px]',
  form: 'max-w-[860px]',
};

export function Container({ size = 'default', className = '', children }) {
  return <div className={`mx-auto w-full ${WIDTHS[size]} px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

const TONES = {
  white: 'bg-white',
  page: 'bg-[#fbfaf8]',
  tint: 'bg-[#f4f2ee]',
};

export function Section({ tone = 'white', id, labelledBy, className = '', children, ...rest }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`w-full ${TONES[tone]} py-12 sm:py-16 lg:py-20 ${className}`} {...rest}>
      {children}
    </section>
  );
}
