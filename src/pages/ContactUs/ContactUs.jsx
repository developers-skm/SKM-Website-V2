import { useEffect, useState } from 'react';
import SEO from '../../components/SEO/SEO';
import ContactHero from './sections/ContactHero';
import OfficeAddresses from './sections/OfficeAddresses';
import EnquiryCategories from './sections/EnquiryCategories';
import RegionalRouting from './sections/RegionalRouting';
import EnquiryModal from './sections/EnquiryModal';
import CurvedDivider from '../../components/SectionContainer/CurvedDivider';

export default function ContactUs({ onPageChange, onModalVisibilityChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiryType, setEnquiryType] = useState('general');

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
      <CurvedDivider bg="#fff" fill="#ececec" />
      <EnquiryCategories onOpenEnquiry={handleOpenEnquiry} onPageChange={onPageChange} />
      <CurvedDivider bg="#ececec" fill="#fff" />
      <RegionalRouting onPageChange={onPageChange} />
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={handleCloseEnquiry} 
        enquiryType={enquiryType} 
      />
    </div>
  );
}
