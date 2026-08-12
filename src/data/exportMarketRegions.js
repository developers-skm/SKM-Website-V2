// Continent classification of the real 28 export markets in
// exportMarkets.js — pure grouping of existing data for display purposes
// (the homepage regional index), not new destinations.
import exportMarkets from './exportMarkets';

const REGION_ORDER = ['Asia', 'Middle East', 'Europe', 'Africa', 'Americas', 'Oceania'];
const REGION_BY_COUNTRY = {
  Japan: 'Asia', Thailand: 'Asia', Vietnam: 'Asia', Indonesia: 'Asia', Malaysia: 'Asia',
  'South Korea': 'Asia', Philippines: 'Asia', Taiwan: 'Asia',
  UAE: 'Middle East', 'Saudi Arabia': 'Middle East', Oman: 'Middle East', Iran: 'Middle East', Qatar: 'Middle East',
  Russia: 'Europe', Netherlands: 'Europe', Germany: 'Europe', Sweden: 'Europe', Belgium: 'Europe', Denmark: 'Europe', UK: 'Europe', Italy: 'Europe',
  Nigeria: 'Africa', Ghana: 'Africa', Egypt: 'Africa', Angola: 'Africa', Uganda: 'Africa',
  Colombia: 'Americas',
  Australia: 'Oceania',
};

const marketsByRegion = REGION_ORDER
  .map((region) => ({
    region,
    markets: exportMarkets.filter((m) => REGION_BY_COUNTRY[m.name] === region),
  }))
  .filter((g) => g.markets.length > 0);

export default marketsByRegion;
