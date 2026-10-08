// Shared accolades data - consumed by AccoladesPage (metro gallery + list)
// and GalleryPage (achievement timeline). Copy is verbatim from the original
// AccoladesPage; `year` / `period` were added only where the copy states one.

import pic1 from '../assets/ACCOLADES/Picture1.png';
import pic2 from '../assets/ACCOLADES/Picture2.png';
import pic3 from '../assets/ACCOLADES/Picture3.png';
import pic4 from '../assets/ACCOLADES/Picture4.png';
import pic5 from '../assets/ACCOLADES/Picture5.png';
import pic6 from '../assets/ACCOLADES/Picture6.png';
import pic7 from '../assets/ACCOLADES/Picture7.png';
import pic8 from '../assets/ACCOLADES/Picture8.png';

export const galleryItems = [
  {
    image: pic1,
    name: 'The Power of i (India)',
    description:
      'SKM Egg recognised that Shree Shivkumar has single-handedly made SKM a Category Leader in key Export Markets.',
  },
  {
    image: pic2,
    name: 'The Power of i (India)',
    description:
      'SKM Egg recognised that Shree Shivkumar has single-handedly made SKM a Category Leader in key Export Markets.',
  },
  {
    image: pic3,
    name: 'Best 5S Practice Award 2016',
    description: 'Best 5S Practice Award in 2016 provided by M/S ABK-AOTS.',
    year: 2016,
  },
  {
    image: pic4,
    name: 'Golden Trophy – APEDA 2011-2012',
    description:
      '"Golden Trophy" award provided by APEDA, Ministry of Commerce, Government of India for the year 2011-2012.',
    year: 2011,
    period: '2011-12',
  },
  {
    image: pic5,
    name: 'Golden Trophy – APEDA 2012-2013',
    description:
      '"Golden Trophy" award provided by APEDA, Ministry of Commerce, Government of India for the year 2012-2013.',
    year: 2012,
    period: '2012-13',
  },
  {
    image: pic6,
    name: 'Export Excellence Award – MEPZ 2013',
    description: 'Export Excellence Award at MEPZ, Special Economic Zone – Chennai 2013.',
    year: 2013,
  },
  {
    image: pic7,
    name: 'Padma Shree Award',
    description:
      'Shri SKM Maeilanandhan receiving Padma Shree Award from Honourable President of India, Shri Pranab Mukherjee.',
  },
  {
    image: pic8,
    name: 'Padma Shree Award',
    description:
      'Shri SKM Maeilanandhan receiving Padma Shree Award from Honourable President of India, Shri Pranab Mukherjee.',
  },
];

export const otherAwards = [
  'We have been awarded Manufacturing Excellence Silver Award in 2006 and Manufacturing Excellence Gold Award in 2007 & 2008 by Frost & Sullivan.',
  'We have been awarded State Safety Award for the year 2007 by Government of Tamil Nadu.',
  'We have been awarded Best Export Performance Awards in 100% EOU category by MEPZ (Madras Export Processing Zone) for the year 2005-06.',
  'At SKM we are proud to be the leading exporter from India and in recognition of our performance the APEDA [Govt. of India] is awarding us the Silver Trophy since 2001 onwards. We have also been recognized by other Government bodies for our achievement in various fields.',
];

// Chronological achievement timeline. Photo entries reuse galleryItems;
// entries without an image are the text-only awards from `otherAwards`.
// Entries with no year in the source copy go in `landmarkHonours`.
export const timelineEvents = [
  {
    year: '2001',
    title: 'APEDA Silver Trophy',
    description:
      'Leading exporter from India - APEDA [Govt. of India] has awarded SKM the Silver Trophy since 2001 onwards.',
  },
  {
    year: '2005-06',
    title: 'Best Export Performance – MEPZ',
    description:
      'Best Export Performance Award in the 100% EOU category by MEPZ (Madras Export Processing Zone).',
  },
  {
    year: '2006',
    title: 'Manufacturing Excellence Silver Award',
    description: 'Manufacturing Excellence Silver Award by Frost & Sullivan.',
  },
  {
    year: '2007',
    title: 'Manufacturing Excellence Gold & State Safety Award',
    description:
      'Manufacturing Excellence Gold Award by Frost & Sullivan, and the State Safety Award by Government of Tamil Nadu.',
  },
  {
    year: '2008',
    title: 'Manufacturing Excellence Gold Award',
    description: 'Manufacturing Excellence Gold Award by Frost & Sullivan.',
  },
  { year: '2011-12', ...galleryItems[3], title: 'Golden Trophy – APEDA' },
  { year: '2012-13', ...galleryItems[4], title: 'Golden Trophy – APEDA' },
  { year: '2013', ...galleryItems[5], title: 'Export Excellence Award – MEPZ' },
  { year: '2016', ...galleryItems[2], title: 'Best 5S Practice Award' },
];

export const landmarkHonours = [galleryItems[0], galleryItems[6]];
