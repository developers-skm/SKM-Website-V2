import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { makeContainerVariants, makeItemVariants } from '../../../utils/animationVariants';

// Import certificate images
import BRC from '../../../assets/4. QUALITY/Certificates/BRC FOOD_524x600px.png';
import EIC from '../../../assets/4. QUALITY/Certificates/EIC_524x600px.png';
import ERC from '../../../assets/4. QUALITY/Certificates/ERC_524x600px.png';
import FSSAI from '../../../assets/4. QUALITY/Certificates/FSSAI_524x600px.png';
import HALAL from '../../../assets/4. QUALITY/Certificates/HALAL_524x600px.png';
import ISO22000 from '../../../assets/4. QUALITY/Certificates/ISO 22000_524x600px.png';
import KOSHER from '../../../assets/4. QUALITY/Certificates/KOSHER_524x600px.png';
import NABL from '../../../assets/4. QUALITY/Certificates/NABL 17025_524x600px.png';

const certificates = [
  {
    id: 'brc',
    name: 'BRC Food',
    image: BRC,
    description: 'BRC Global Standard for Food Safety – ensuring highest food safety and quality management practices globally recognized by retailers and manufacturers.',
  },
  {
    id: 'eic',
    name: 'EIC',
    image: EIC,
    description: 'Export Inspection Council certification confirming compliance with Indian export standards and international food safety requirements for egg products.',
  },
  {
    id: 'erc',
    name: 'ERC',
    image: ERC,
    description: 'European Registration Compliance – confirming our establishment meets European Union norms for egg processing and export.',
  },
  {
    id: 'fssai',
    name: 'FSSAI',
    image: FSSAI,
    description: 'Food Safety and Standards Authority of India certification ensuring compliance with Indian food safety laws and hygiene standards.',
  },
  {
    id: 'halal',
    name: 'HALAL',
    image: HALAL,
    description: 'Halal certification confirming our products meet strict Islamic dietary laws and hygiene requirements, enabling access to global Halal markets.',
  },
  {
    id: 'iso22000',
    name: 'ISO 22000',
    image: ISO22000,
    description: 'ISO 22000 Food Safety Management System certification – internationally recognized standard for food safety management across the entire food supply chain.',
  },
  {
    id: 'kosher',
    name: 'KOSHER',
    image: KOSHER,
    description: 'Kosher certification ensuring our egg products meet Jewish dietary laws, enabling export to global Kosher-certified markets and distributors.',
  },
  {
    id: 'nabl',
    name: 'NABL ISO/IEC 17025',
    image: NABL,
    description: "National Accreditation Board for Testing and Calibration Laboratories accreditation per ISO/IEC 17025 – confirming our laboratory's technical competence and testing accuracy since 2006.",
  },
];

// Certificate cards that behave like a dealt hand in Indian Rummy. In a loop:
//   1. collect - the cards are gathered, one by one, into a single pile
//   2. shuffle - cards in the pile swap places, one pair at a time
//   3. deal    - the cards are placed back into the grid one by one, in a new order
// Hovering a card (while the grid is at rest) holds it up and pauses the loop.
function CardDeck({ items }) {
  const n = items.length;
  const wrapRef = useRef(null);
  const [width, setWidth] = useState(1100);
  const [phase, setPhase] = useState('rest'); // rest | pile | shuffle | deal
  const [slotOf, setSlotOf] = useState(() => Object.fromEntries(items.map((c, i) => [c.id, i])));
  const [pileZ, setPileZ] = useState(() => Object.fromEntries(items.map((c, i) => [c.id, i])));
  const [lifted, setLifted] = useState(null);
  const [hovered, setHovered] = useState(null);
  const hoverRef = useRef(null);
  const slotRef = useRef(slotOf);
  const pileRef = useRef(pileZ);

  useEffect(() => {
    hoverRef.current = hovered;
  }, [hovered]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // The loop.
  useEffect(() => {
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const SWAPS = 5;

    const cycle = () => {
      if (hoverRef.current !== null) {
        later(cycle, 600);
        return;
      }
      // 1. collect
      setHovered(null);
      setPhase('pile');
      const collectMs = n * 110 + 700;

      // 2. shuffle: swap two cards of the pile at a time
      for (let k = 0; k < SWAPS; k += 1) {
        later(() => {
          setPhase('shuffle');
          const ids = Object.keys(pileRef.current);
          const a = ids[Math.floor(Math.random() * ids.length)];
          let b = ids[Math.floor(Math.random() * ids.length)];
          while (b === a) b = ids[Math.floor(Math.random() * ids.length)];
          setLifted(a);
          later(() => {
            const z = { ...pileRef.current };
            [z[a], z[b]] = [z[b], z[a]];
            pileRef.current = z;
            setPileZ(z);
          }, 330);
          later(() => setLifted(null), 620);
        }, collectMs + k * 760);
      }

      // 3. deal into a new order, one card at a time
      later(() => {
        const ids = Object.keys(slotRef.current);
        const slots = ids.map((_, i) => i);
        for (let i = slots.length - 1; i > 0; i -= 1) {
          const j = Math.floor(Math.random() * (i + 1));
          [slots[i], slots[j]] = [slots[j], slots[i]];
        }
        const next = Object.fromEntries(ids.map((id, i) => [id, slots[i]]));
        slotRef.current = next;
        setSlotOf(next);
        setPhase('deal');
      }, collectMs + SWAPS * 760 + 200);

      later(() => setPhase('rest'), collectMs + SWAPS * 760 + 200 + n * 140 + 900);
      later(cycle, collectMs + SWAPS * 760 + 200 + n * 140 + 900 + 3500);
    };

    later(cycle, 1500);
    return () => timers.forEach(clearTimeout);
  }, [n]);

  // Grid geometry (matches the previous 2 / 3 / 4 column grid)
  const cols = width < 600 ? 2 : width < 980 ? 3 : 4;
  const gap = width < 980 ? 20 : 24;
  const rows = Math.ceil(n / cols);
  const cw = (width - (cols - 1) * gap) / cols;
  const imgW = Math.min(180, cw - 48);
  const ch = Math.round((imgW * 600) / 524 + 90);
  const height = rows * ch + (rows - 1) * gap;
  const slotPos = (slot) => ({ x: (slot % cols) * (cw + gap), y: Math.floor(slot / cols) * (ch + gap) });
  const pile = { x: (width - cw) / 2, y: (height - ch) / 2 };

  return (
    <div ref={wrapRef} className="relative w-full" style={{ height }}>
      {items.map((cert) => {
        const slot = slotOf[cert.id];
        const inPile = phase === 'pile' || phase === 'shuffle';
        const jitter = ((pileZ[cert.id] % 3) - 1) * 3;
        const isLifted = lifted === cert.id;
        const isHover = hovered === cert.id && phase === 'rest';
        const target = inPile
          ? {
              x: pile.x + pileZ[cert.id] * 1.5 + (isLifted ? (slot % 2 ? 90 : -90) : 0),
              y: pile.y - pileZ[cert.id] * 1.5 - (isLifted ? 18 : 0),
              rotate: isLifted ? (slot % 2 ? 9 : -9) : jitter,
              scale: isLifted ? 1.06 : 0.94,
            }
          : { ...slotPos(slot), y: slotPos(slot).y - (isHover ? 10 : 0), rotate: 0, scale: isHover ? 1.03 : 1 };
        const delay = phase === 'pile' ? slot * 0.11 : phase === 'deal' ? slot * 0.14 : 0;
        const z = inPile ? pileZ[cert.id] + 1 : phase === 'deal' ? 20 - slot : isHover ? 30 : 1;
        return (
          <motion.div
            key={cert.id}
            initial={false}
            animate={target}
            transition={{
              type: 'spring',
              stiffness: phase === 'shuffle' ? 260 : 120,
              damping: phase === 'shuffle' ? 22 : 18,
              delay,
            }}
            onHoverStart={() => setHovered(cert.id)}
            onHoverEnd={() => setHovered(null)}
            className="absolute left-0 top-0 bg-white border border-[#eee] rounded-[10px] overflow-hidden"
            style={{
              width: cw,
              height: ch,
              zIndex: z,
              boxShadow: inPile || isHover ? '0 14px 34px rgba(0,72,88,0.22)' : '5px 3px 40px rgba(0,72,88,0.08)',
            }}
          >
            <div
              className="relative p-6 pb-4 flex items-center justify-center"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img
                src={cert.image}
                alt={cert.name}
                className="w-full max-w-[180px] h-auto object-contain select-none pointer-events-none"
                loading="lazy"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
            <div className="relative px-5 pb-4 text-center">
              <p className="font-heading font-bold text-[12px] text-surface-700 uppercase tracking-wider m-0">
                {cert.name}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Certifications() {
  const reduceMotion = useReducedMotion();

  const containerVariants = makeContainerVariants(0.08);
  const itemVariants = makeItemVariants({ y: 25, stiffness: 80 });

  return (
    <div id="quality-certifications" className="w-full bg-page pt-[100px] sm:pt-[110px] lg:pt-[120px] pb-[40px] lg:pb-[60px] overflow-hidden">
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mx-auto max-w-[1440px] w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-14"
      >
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-4">
          <motion.span
            variants={itemVariants}
            className="section-label justify-center"
          >
            Certifications
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="font-heading font-bold text-[38px] sm:text-[46px] lg:text-[52px] text-heading leading-[1.1] tracking-tight m-0"
          >
            Our{' '}
            Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-body text-[16px] text-surface-500 max-w-2xl leading-[30px] m-0"
          >
            Internationally recognized certifications that validate our commitment to food safety, quality, and compliance across global markets.
          </motion.p>
        </div>

        {/* Certificates - card deck: collect, shuffle, deal (static grid for reduced motion) */}
        {reduceMotion ? (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6"
          >
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative bg-white border border-[#eee] rounded-[10px] overflow-hidden shadow-[5px_3px_40px_rgba(0,72,88,0.06)] hover:shadow-[5px_3px_40px_rgba(0,72,88,0.14)] hover:border-brand-600/30 transition-all duration-300 group"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
  
                {/* Certificate Image */}
                <div
                  className="relative p-6 pb-4 flex items-center justify-center"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full max-w-[180px] h-auto object-contain select-none pointer-events-none transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>
  
                {/* Cert Name */}
                <div className="relative px-5 pb-4 text-center">
                  <p className="font-heading font-bold text-[12px] text-surface-700 uppercase tracking-wider m-0">
                    {cert.name}
                  </p>
                </div>
  
              </motion.div>
            ))}
          </motion.div>
  
        ) : (
          <motion.div variants={itemVariants}>
            <CardDeck items={certificates} />
          </motion.div>
        )}

        {/* Info bar */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center text-center"
        >
          <span className="font-body text-[12px] font-semibold text-brand-600">
            {certificates.length} Active Certifications &amp; Accreditations
          </span>
        </motion.div>
      </motion.section>
    </div>
  );
}
