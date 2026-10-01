import { useState } from 'react';
import { careersFaqs } from '../../../data/careersContent';
import { Container, Section } from './layout';
import SectionHeading from './SectionHeading';
import CareerIcon from './careerIcons';

// Minimal accordion disclosure list with thin separators and smooth transition.
export default function CareersFAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <Section tone="white" labelledBy="faq-title" className="border-b border-[#eae6e0]">
      <Container size="narrow" className="flex flex-col gap-10 lg:gap-12">
        <SectionHeading id="faq-title" label="FAQ" title="Frequently Asked Questions" text="Everything you need to know about applying and working at SKM." />
        <div className="flex flex-col border-t border-[#eae6e0]">
          {careersFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.q} className="border-b border-[#eae6e0]">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-btn-${index}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left font-heading font-bold text-[18px] sm:text-[19px] text-heading cursor-pointer hover:text-brand-650 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 rounded-sm min-h-[52px]"
                  >
                    {faq.q}
                    <CareerIcon
                      name="chevron"
                      className={`w-5 h-5 flex-shrink-0 text-brand-600 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-btn-${index}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="font-body text-[16px] text-surface-600 leading-[1.7] m-0 pb-6 pr-8" inert={!isOpen ? true : undefined}>
                      {faq.a}
                    </p>
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

