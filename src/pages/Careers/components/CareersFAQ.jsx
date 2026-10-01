import { useState } from 'react';
import { careersFaqs } from '../../../data/careersContent';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

// No shared accordion component exists in the project, so this is a small
// disclosure list (button + region, aria-expanded).
export default function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section aria-labelledby="faq-title" className="w-full bg-white py-[70px] lg:py-[100px]">
      <div className="mx-auto max-w-[860px] px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        <SectionHeading id="faq-title" label="FAQ" title="Frequently Asked Questions" />
        <div className="flex flex-col border-t border-[#e5e5e5]">
          {careersFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="border-b border-[#e5e5e5]">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left font-heading font-bold text-[17px] text-heading cursor-pointer hover:text-brand-650 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm"
                  >
                    {faq.q}
                    <CareerIcon name="chevron" className={`w-5 h-5 flex-shrink-0 text-brand-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`} hidden={!isOpen}>
                  <p className="font-body text-[15px] text-surface-500 leading-[26px] m-0 pb-5 pr-9">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
