import { useState } from 'react';
import { careersFaqs } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

// No shared accordion exists in the project, so this is a small disclosure
// list (button + region, aria-expanded). The height animates via a
// grid-template-rows transition and is disabled for reduced motion.
export default function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <Section tone="page" labelledBy="faq-title" className="border-t border-[#eee]">
      <Container size="narrow" className="flex flex-col gap-8 lg:gap-10">
        <SectionHeading id="faq-title" label="FAQ" title="Frequently Asked Questions" />
        <div className="flex flex-col border-t border-[#ddd]">
          {careersFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="border-b border-[#ddd]">
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
                    <CareerIcon name="chevron" className={`w-5 h-5 flex-shrink-0 text-brand-600 transition-transform duration-300 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-[16px] text-surface-500 leading-[1.7] m-0 pb-5 pr-9" inert={!isOpen ? true : undefined}>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
