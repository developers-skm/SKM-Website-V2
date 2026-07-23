// The 28 export markets SKM ships to — single source of truth shared by the
// homepage GlobalMarkets map and the Get Quote flow's destination-country step.

const exportMarkets = [
  { name: 'Japan', id: 392, code: 'jp', flag: '🇯🇵', coordinates: [138.25, 36.20] },
  { name: 'Thailand', id: 764, code: 'th', flag: '🇹🇭', coordinates: [100.99, 15.87] },
  { name: 'Vietnam', id: 704, code: 'vn', flag: '🇻🇳', coordinates: [108.28, 14.06] },
  { name: 'Russia', id: 643, code: 'ru', flag: '🇷🇺', coordinates: [105.32, 61.52] },
  { name: 'Indonesia', id: 360, code: 'id', flag: '🇮🇩', coordinates: [113.92, -0.79] },
  { name: 'Malaysia', id: 458, code: 'my', flag: '🇲🇾', coordinates: [109.70, 4.21] },
  { name: 'South Korea', id: 410, code: 'kr', flag: '🇰🇷', coordinates: [127.77, 35.91] },
  { name: 'UAE', id: 784, code: 'ae', flag: '🇦🇪', coordinates: [53.85, 23.42] },
  { name: 'Saudi Arabia', id: 682, code: 'sa', flag: '🇸🇦', coordinates: [45.08, 23.89] },
  { name: 'Netherlands', id: 528, code: 'nl', flag: '🇳🇱', coordinates: [5.29, 52.13] },
  { name: 'Germany', id: 276, code: 'de', flag: '🇩🇪', coordinates: [10.45, 51.17] },
  { name: 'Philippines', id: 608, code: 'ph', flag: '🇵🇭', coordinates: [121.77, 12.88] },
  { name: 'Taiwan', id: 158, code: 'tw', flag: '🇹🇼', coordinates: [120.96, 23.70] },
  { name: 'Nigeria', id: 566, code: 'ng', flag: '🇳🇬', coordinates: [8.68, 9.08] },
  { name: 'Ghana', id: 288, code: 'gh', flag: '🇬🇭', coordinates: [-1.02, 7.95] },
  { name: 'Sweden', id: 752, code: 'se', flag: '🇸🇪', coordinates: [18.64, 60.13] },
  { name: 'Belgium', id: 56, code: 'be', flag: '🇧🇪', coordinates: [4.47, 50.50] },
  { name: 'Colombia', id: 170, code: 'co', flag: '🇨🇴', coordinates: [-74.30, 4.57] },
  { name: 'Denmark', id: 208, code: 'dk', flag: '🇩🇰', coordinates: [9.50, 56.26] },
  { name: 'Egypt', id: 818, code: 'eg', flag: '🇪🇬', coordinates: [30.80, 26.82] },
  { name: 'UK', id: 826, code: 'gb', flag: '🇬🇧', coordinates: [-3.44, 55.38] },
  { name: 'Italy', id: 380, code: 'it', flag: '🇮🇹', coordinates: [12.57, 41.87] },
  { name: 'Oman', id: 512, code: 'om', flag: '🇴🇲', coordinates: [55.98, 21.47] },
  { name: 'Angola', id: 24, code: 'ao', flag: '🇦🇴', coordinates: [17.87, -11.20] },
  { name: 'Uganda', id: 800, code: 'ug', flag: '🇺🇬', coordinates: [32.29, 1.37] },
  { name: 'Australia', id: 36, code: 'au', flag: '🇦🇺', coordinates: [133.78, -25.27] },
  { name: 'Iran', id: 364, code: 'ir', flag: '🇮🇷', coordinates: [53.69, 32.43] },
  { name: 'Qatar', id: 634, code: 'qa', flag: '🇶🇦', coordinates: [51.18, 25.35] },
];

export default exportMarkets;
