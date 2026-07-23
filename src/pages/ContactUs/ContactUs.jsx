import { useEffect, useRef, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import ContactHero from './sections/ContactHero';
import OfficeAddresses from './sections/OfficeAddresses';
import EnquiryCategories from './sections/EnquiryCategories';
import RegionalRouting from './sections/RegionalRouting';
import EnquiryModal from './sections/EnquiryModal';

export default function ContactUs({ onPageChange, prefill, onModalVisibilityChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('general');
  // Tracks the last handled Careers intentId (a stable string, not an object
  // reference) — a new intentId reliably reopens the modal even after a
  // manual close, while re-renders with the same intentId never reopen it.
  const handledIntentIdRef = useRef(null);

  useEffect(() => {
    if (prefill?.enquiryType === 'job' && prefill.intentId !== handledIntentIdRef.current) {
      handledIntentIdRef.current = prefill.intentId;
      setEnquiryType('job');
      setIsModalOpen(true);
    }
  }, [prefill]);

  useEffect(() => {
    onModalVisibilityChange?.(isModalOpen);
  }, [isModalOpen, onModalVisibilityChange]);

  // Guarantees the sticky bar is never left suppressed if this page unmounts
  // (navigation away) while the modal is still open.
  useEffect(() => () => onModalVisibilityChange?.(false), [onModalVisibilityChange]);

  const handleOpenEnquiry = (type) => {
    setEnquiryType(type);
    setIsModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col relative">
      <SEO 
        title="Contact SKM Egg Products | Get Egg Powder & Liquid Egg Enquiry"
        description="Contact SKM Egg Products for egg powder and liquid egg product enquiries. Reach our corporate headquarters or egg processing factory in Erode, Tamil Nadu. Sales, careers, and vendor enquiries welcome."
        keywords="contact egg powder supplier, egg powder enquiry, egg product supplier contact, buy egg powder India, egg exporter contact, SKM egg products contact, egg powder quote, liquid egg enquiry, wholesale egg powder contact, egg product sample request"
        canonical="https://www.skmegg.com/contact-us"
      />
      <ContactHero />
      <OfficeAddresses />
      <EnquiryCategories onOpenEnquiry={handleOpenEnquiry} onPageChange={onPageChange} />
      <RegionalRouting onPageChange={onPageChange} />
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseEnquiry} 
        enquiryType={enquiryType} 
      />
    </div>
  );
}
