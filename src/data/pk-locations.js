// Complete Pakistan Provinces, Major Cities, and Popular Areas Dataset
export const PAKISTAN_LOCATIONS = {
  popularCities: [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Gujranwala',
    'Hyderabad',
    'Bahawalpur',
    'Sargodha',
    'Abbottabad',
    'Sukkur',
    'Sahiwal'
  ],
  provinces: [
    { id: 'punjab', name: 'Punjab' },
    { id: 'sindh', name: 'Sindh' },
    { id: 'kpk', name: 'Khyber Pakhtunkhwa (KPK)' },
    { id: 'balochistan', name: 'Balochistan' },
    { id: 'ict', name: 'Islamabad Capital Territory' },
    { id: 'ajk', name: 'Azad Jammu & Kashmir' },
    { id: 'gb', name: 'Gilgit-Baltistan' }
  ],
  cities: {
    punjab: [
      { id: 'lahore', name: 'Lahore', tier: 1, deliveryDays: '1-2 days' },
      { id: 'faisalabad', name: 'Faisalabad', tier: 1, deliveryDays: '2-3 days' },
      { id: 'rawalpindi', name: 'Rawalpindi', tier: 1, deliveryDays: '1-2 days' },
      { id: 'gujranwala', name: 'Gujranwala', tier: 1, deliveryDays: '2-3 days' },
      { id: 'multan', name: 'Multan', tier: 1, deliveryDays: '2-3 days' },
      { id: 'sialkot', name: 'Sialkot', tier: 2, deliveryDays: '2-3 days' },
      { id: 'bahawalpur', name: 'Bahawalpur', tier: 2, deliveryDays: '2-4 days' },
      { id: 'sargodha', name: 'Sargodha', tier: 2, deliveryDays: '2-4 days' },
      { id: 'sheikhupura', name: 'Sheikhupura', tier: 2, deliveryDays: '2-3 days' },
      { id: 'jhang', name: 'Jhang', tier: 2, deliveryDays: '3-4 days' },
      { id: 'rahim-yar-khan', name: 'Rahim Yar Khan', tier: 2, deliveryDays: '3-4 days' },
      { id: 'gujrat', name: 'Gujrat', tier: 2, deliveryDays: '2-3 days' },
      { id: 'kasur', name: 'Kasur', tier: 2, deliveryDays: '2-3 days' },
      { id: 'sahiwal', name: 'Sahiwal', tier: 2, deliveryDays: '2-3 days' },
      { id: 'okara', name: 'Okara', tier: 2, deliveryDays: '2-3 days' },
      { id: 'dera-ghazi-khan', name: 'Dera Ghazi Khan', tier: 2, deliveryDays: '3-4 days' },
      { id: 'chiniot', name: 'Chiniot', tier: 2, deliveryDays: '3-4 days' },
      { id: 'kamoke', name: 'Kamoke', tier: 3, deliveryDays: '3-4 days' },
      { id: 'hafizabad', name: 'Hafizabad', tier: 3, deliveryDays: '3-4 days' },
      { id: 'sadiqabad', name: 'Sadiqabad', tier: 3, deliveryDays: '3-4 days' },
      { id: 'burewala', name: 'Burewala', tier: 3, deliveryDays: '3-4 days' },
      { id: 'khanewal', name: 'Khanewal', tier: 3, deliveryDays: '3-4 days' },
      { id: 'muzaffargarh', name: 'Muzaffargarh', tier: 3, deliveryDays: '3-4 days' },
      { id: 'mandibahauddin', name: 'Mandi Bahauddin', tier: 3, deliveryDays: '3-4 days' },
      { id: 'vehari', name: 'Vehari', tier: 3, deliveryDays: '3-4 days' },
      { id: 'daska', name: 'Daska', tier: 3, deliveryDays: '2-3 days' },
      { id: 'pakpattan', name: 'Pakpattan', tier: 3, deliveryDays: '3-4 days' },
      { id: 'bahawalnagar', name: 'Bahawalnagar', tier: 3, deliveryDays: '3-4 days' },
      { id: 'toba-tek-singh', name: 'Toba Tek Singh', tier: 3, deliveryDays: '3-4 days' },
      { id: 'jhelum', name: 'Jhelum', tier: 2, deliveryDays: '2-3 days' },
      { id: 'chakwal', name: 'Chakwal', tier: 3, deliveryDays: '3-4 days' },
      { id: 'attock', name: 'Attock', tier: 3, deliveryDays: '3-4 days' },
      { id: 'mianwali', name: 'Mianwali', tier: 3, deliveryDays: '3-4 days' }
    ],
    sindh: [
      { id: 'karachi', name: 'Karachi', tier: 1, deliveryDays: '1-2 days' },
      { id: 'hyderabad', name: 'Hyderabad', tier: 1, deliveryDays: '2-3 days' },
      { id: 'sukkur', name: 'Sukkur', tier: 2, deliveryDays: '2-4 days' },
      { id: 'larkana', name: 'Larkana', tier: 2, deliveryDays: '3-4 days' },
      { id: 'nawabshah', name: 'Nawabshah (Shaheed Benazirabad)', tier: 2, deliveryDays: '3-4 days' },
      { id: 'mirpur-khas', name: 'Mirpur Khas', tier: 2, deliveryDays: '3-4 days' },
      { id: 'jacobabad', name: 'Jacobabad', tier: 3, deliveryDays: '3-5 days' },
      { id: 'shikarpur', name: 'Shikarpur', tier: 3, deliveryDays: '3-5 days' },
      { id: 'khairpur', name: 'Khairpur', tier: 3, deliveryDays: '3-4 days' },
      { id: 'dadu', name: 'Dadu', tier: 3, deliveryDays: '3-5 days' },
      { id: 'tando-adam', name: 'Tando Adam', tier: 3, deliveryDays: '3-4 days' },
      { id: 'tando-allahyar', name: 'Tando Allahyar', tier: 3, deliveryDays: '3-4 days' },
      { id: 'ghotki', name: 'Ghotki', tier: 3, deliveryDays: '3-5 days' },
      { id: 'badin', name: 'Badin', tier: 3, deliveryDays: '3-5 days' },
      { id: 'thatta', name: 'Thatta', tier: 3, deliveryDays: '3-4 days' }
    ],
    kpk: [
      { id: 'peshawar', name: 'Peshawar', tier: 1, deliveryDays: '1-3 days' },
      { id: 'mardan', name: 'Mardan', tier: 2, deliveryDays: '2-3 days' },
      { id: 'abbottabad', name: 'Abbottabad', tier: 2, deliveryDays: '2-3 days' },
      { id: 'mingora', name: 'Mingora (Swat)', tier: 2, deliveryDays: '3-4 days' },
      { id: 'kohat', name: 'Kohat', tier: 2, deliveryDays: '2-4 days' },
      { id: 'dera-ismail-khan', name: 'Dera Ismail Khan', tier: 2, deliveryDays: '3-4 days' },
      { id: 'swabi', name: 'Swabi', tier: 3, deliveryDays: '2-3 days' },
      { id: 'nowshera', name: 'Nowshera', tier: 2, deliveryDays: '2-3 days' },
      { id: 'charsadda', name: 'Charsadda', tier: 3, deliveryDays: '2-3 days' },
      { id: 'mansehra', name: 'Mansehra', tier: 3, deliveryDays: '3-4 days' },
      { id: 'bannu', name: 'Bannu', tier: 3, deliveryDays: '3-5 days' },
      { id: 'haripur', name: 'Haripur', tier: 3, deliveryDays: '2-3 days' }
    ],
    balochistan: [
      { id: 'quetta', name: 'Quetta', tier: 1, deliveryDays: '2-4 days' },
      { id: 'turbat', name: 'Turbat', tier: 3, deliveryDays: '4-6 days' },
      { id: 'khuzdar', name: 'Khuzdar', tier: 3, deliveryDays: '4-6 days' },
      { id: 'hub', name: 'Hub', tier: 2, deliveryDays: '2-3 days' },
      { id: 'chaman', name: 'Chaman', tier: 3, deliveryDays: '4-6 days' },
      { id: 'gwadar', name: 'Gwadar', tier: 3, deliveryDays: '4-6 days' },
      { id: 'sibi', name: 'Sibi', tier: 3, deliveryDays: '3-5 days' },
      { id: 'loralai', name: 'Loralai', tier: 3, deliveryDays: '4-6 days' }
    ],
    ict: [
      { id: 'islamabad', name: 'Islamabad', tier: 1, deliveryDays: '1-2 days' }
    ],
    ajk: [
      { id: 'muzaffarabad', name: 'Muzaffarabad', tier: 2, deliveryDays: '2-4 days' },
      { id: 'mirpur-ajk', name: 'Mirpur (AJK)', tier: 2, deliveryDays: '2-3 days' },
      { id: 'rawalakot', name: 'Rawalakot', tier: 3, deliveryDays: '3-5 days' },
      { id: 'kotli', name: 'Kotli', tier: 3, deliveryDays: '3-5 days' },
      { id: 'bhimber', name: 'Bhimber', tier: 3, deliveryDays: '3-4 days' }
    ],
    gb: [
      { id: 'gilgit', name: 'Gilgit', tier: 3, deliveryDays: '3-6 days' },
      { id: 'skardu', name: 'Skardu', tier: 3, deliveryDays: '4-7 days' },
      { id: 'hunza', name: 'Hunza', tier: 3, deliveryDays: '4-7 days' }
    ]
  },
  popularAreas: {
    karachi: [
      'DHA Phase 1-8', 'Clifton Blocks 1-9', 'Gulshan-e-Iqbal', 'Gulistan-e-Jauhar',
      'PECHS (Blocks 1-6)', 'North Nazimabad', 'Nazimabad', 'Bahria Town Karachi',
      'Federal B Area', 'Malir Cantt', 'KDA Scheme 1', 'Defence View',
      'Saddar / Saddar Downtown', 'Buffer Zone', 'Tariq Road Area', 'Gulberg'
    ],
    lahore: [
      'DHA Phase 1-9 & Phase 11 (Prism)', 'Gulberg (I, II, III, IV, V)', 'Bahria Town (Sector A-F)',
      'Model Town', 'Johar Town (Phase 1 & 2)', 'Faisal Town', 'Garden Town',
      'Wapda Town', 'Cantt & Cavalry Ground', 'Valencia Town', 'Lake City',
      'Askari (1-11)', 'Shadman', 'Allama Iqbal Town', 'Mall Road & Old City'
    ],
    islamabad: [
      'F-6 / F-7 / F-8 / F-10 / F-11', 'E-7 / E-11', 'G-6 / G-7 / G-8 / G-9 / G-10 / G-11 / G-13',
      'DHA Phase 1 & 2', 'Bahria Town Phase 1-8', 'Gulberg Greens',
      'PWD Housing Scheme', 'Bani Gala', 'I-8 / I-9 / I-10', 'Soan Gardens'
    ],
    rawalpindi: [
      'Saddar Cantt', 'Satellite Town', 'Bahria Town Phase 1-8', 'Chaklala Scheme 3',
      'Askari (7, 10, 13, 14)', 'Westridge', 'Gulraiz Housing Scheme', 'Adyala Road'
    ],
    faisalabad: [
      'D Ground Peoples Colony', 'Kohinoor City', 'Madina Town', 'Gulberg Colony',
      'Susan Road', 'Eden Valley', 'Canal Road Housing Societies', 'Jinnah Colony'
    ],
    multan: [
      'Cantt Multan', 'Gulgasht Colony', 'MDA Officers Colony', 'Model Town Multan',
      'Wapda Town Multan', 'Shah Rukn-e-Alam Colony', 'Bosan Road Areas'
    ],
    peshawar: [
      'University Town', 'Hayatabad (Phase 1-7)', 'Cantt Peshawar', 'Warsak Road',
      'Gulbahar', 'Dalazak Road', 'Saddar Bazar'
    ],
    quetta: [
      'Cantt Quetta', 'Model Town Quetta', 'Samungli Road', 'Zarghoon Road',
      'Jinnah Town', 'Shahbaz Town', 'Chaman Phatak Area'
    ]
  },
  couriers: [
    {
      id: 'tcs',
      name: 'TCS Express',
      badge: 'Fastest Delivery',
      baseRate: 180,
      expressRate: 280,
      logo: '🚚 TCS',
      trackingPrefix: 'TCS',
      description: 'Nationwide express shipping with live tracking & SMS notifications'
    },
    {
      id: 'leopards',
      name: 'Leopards Courier',
      badge: 'Best COD Network',
      baseRate: 160,
      expressRate: 260,
      logo: '🐆 Leopards',
      trackingPrefix: 'LEO',
      description: 'Extensive delivery reach across all tier 2 & tier 3 cities in Pakistan'
    },
    {
      id: 'trax',
      name: 'Trax Logistics',
      badge: 'High Speed COD',
      baseRate: 170,
      expressRate: 270,
      logo: '⚡ Trax',
      trackingPrefix: 'TRX',
      description: 'Same-day dispatch in Lahore, Karachi & Islamabad with automated OTP delivery'
    },
    {
      id: 'postex',
      name: 'PostEx',
      badge: 'Cashless COD & Instant Pay',
      baseRate: 150,
      expressRate: 250,
      logo: '📦 PostEx',
      trackingPrefix: 'PST',
      description: 'Modern digital logistics with doorstep card/QR payment on delivery'
    }
  ]
};
