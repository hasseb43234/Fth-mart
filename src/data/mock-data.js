// Comprehensive Mock Data for FTH Mart Pakistani Dropshipping Marketplace
import { MARKAZ_PRODUCTS_500 } from './markaz-products.js';

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-electronics',
    slug: 'electronics',
    name: 'Electronics & Smart Tech',
    urduName: 'الیکٹرانکس اور اسمارٹ ڈیوائسز',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    itemCount: 1420,
    featured: true,
    subcategories: [
      { id: 'sub-earbuds', slug: 'wireless-earbuds', name: 'Wireless Earbuds & Audio', popular: true },
      { id: 'sub-smartwatches', slug: 'smart-watches', name: 'Smart Watches & Bands', popular: true },
      { id: 'sub-powerbanks', slug: 'power-banks', name: 'Fast Power Banks & Chargers', popular: true },
      { id: 'sub-cameras', slug: 'action-cameras', name: 'Action Cameras & Drones' },
      { id: 'sub-cables', slug: 'cables-adapters', name: 'Gaming Accessories & Cables' }
    ]
  },
  {
    id: 'cat-home',
    slug: 'home-kitchen',
    name: 'Home & Kitchen Gadgets',
    urduName: 'گھریلو اور کچن کی اشیاء',
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60',
    itemCount: 2340,
    featured: true,
    subcategories: [
      { id: 'sub-appliances', slug: 'smart-appliances', name: 'Air Fryers & Blenders', popular: true },
      { id: 'sub-cleaning', slug: 'smart-cleaning', name: 'Robotic Vacuums & Mops', popular: true },
      { id: 'sub-lighting', slug: 'led-lighting', name: 'Smart LED Lighting & Ambience' },
      { id: 'sub-organizers', slug: 'storage-organizers', name: 'Modular Storage & Organizers' },
      { id: 'sub-cookware', slug: 'non-stick-cookware', name: 'Non-Stick Cookware Sets' }
    ]
  },
  {
    id: 'cat-fashion-men',
    slug: 'mens-fashion',
    name: "Men's Fashion & Accessories",
    urduName: 'مردانہ فیشن اور گھڑیاں',
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    itemCount: 1890,
    featured: true,
    subcategories: [
      { id: 'sub-watches', slug: 'mens-luxury-watches', name: 'Chronograph & Quartz Watches', popular: true },
      { id: 'sub-wallets', slug: 'leather-wallets', name: 'Genuine Leather Wallets & Belts', popular: true },
      { id: 'sub-footwear', slug: 'casual-sneakers', name: 'Sneakers & Formal Shoes' },
      { id: 'sub-apparel', slug: 'cotton-tshirts-polos', name: 'Polos & Casual Kurtas' },
      { id: 'sub-sunglasses', slug: 'uv-sunglasses', name: 'Polarized Sunglasses' }
    ]
  },
  {
    id: 'cat-fashion-women',
    slug: 'womens-fashion',
    name: "Women's Fashion & Jewelry",
    urduName: 'خواتین کا فیشن اور جیولری',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
    itemCount: 3100,
    featured: true,
    subcategories: [
      { id: 'sub-handbags', slug: 'designer-handbags', name: 'Crossbody Bags & Clutches', popular: true },
      { id: 'sub-jewelry', slug: 'zircon-jewelry', name: 'Bridal & Zircon Jewelry Sets', popular: true },
      { id: 'sub-hijabs', slug: 'lawn-chiffon-hijabs', name: 'Chiffon & Silk Hijabs/Stoles' },
      { id: 'sub-footwear-w', slug: 'heels-khussas', name: 'Khussas & Comfort Flats' },
      { id: 'sub-lawn', slug: 'stitched-lawn-suits', name: 'Ready-to-Wear Lawn Suits' }
    ]
  },
  {
    id: 'cat-beauty',
    slug: 'beauty-personal-care',
    name: 'Beauty, Health & Care',
    urduName: 'خوبصورتی اور صحت کی دیکھ بھال',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60',
    itemCount: 1650,
    featured: true,
    subcategories: [
      { id: 'sub-trimmers', slug: 'shavers-trimmers', name: 'Pro Hair & Beard Trimmers', popular: true },
      { id: 'sub-skincare', slug: 'serums-rollers', name: 'Gua Sha & Skincare Serums', popular: true },
      { id: 'sub-haircare', slug: 'hair-stylers', name: '5-in-1 Hair Styler Blowers' },
      { id: 'sub-massagers', slug: 'body-massagers', name: 'Neck & Deep Tissue Massagers' }
    ]
  },
  {
    id: 'cat-automotive',
    slug: 'automotive-accessories',
    name: 'Automotive & Bike Gear',
    urduName: 'گاڑی اور بائیک کا سامان',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60',
    itemCount: 940,
    featured: false,
    subcategories: [
      { id: 'sub-dashcams', slug: 'car-dashcams', name: 'HD Dual Dash Cams & Reverse Cameras', popular: true },
      { id: 'sub-holders', slug: 'magsafe-car-mounts', name: 'Auto-Clamping Wireless Mounts', popular: true },
      { id: 'sub-cleaners', slug: 'cordless-car-vacuums', name: 'High Power Cordless Car Vacuums' },
      { id: 'sub-bike-gear', slug: 'bike-helmets-gloves', name: 'Rider Gloves & LED Headlights' }
    ]
  },
  {
    id: 'cat-kids',
    slug: 'kids-toys-baby',
    name: 'Kids, Toys & Baby',
    urduName: 'بچوں کے کھلونے اور سامان',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=60',
    itemCount: 1210,
    featured: false,
    subcategories: [
      { id: 'sub-rc-toys', slug: 'rc-cars-drones', name: 'Stunt RC Cars & mini Drones', popular: true },
      { id: 'sub-educational', slug: 'educational-learning', name: 'LCD Writing Tablets & Puzzles', popular: true },
      { id: 'sub-baby-gear', slug: 'baby-carriers-monitors', name: 'Baby Safety & Strollers' }
    ]
  },
  {
    id: 'cat-sports',
    slug: 'sports-fitness',
    name: 'Sports & Outdoor Fitness',
    urduName: 'کھیل اور فٹنس کا سامان',
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    itemCount: 820,
    featured: false,
    subcategories: [
      { id: 'sub-gym', slug: 'resistance-bands-weights', name: 'Home Workout Bands & Grip Sets', popular: true },
      { id: 'sub-bottles', slug: 'motivational-bottles', name: '2L Motivational Water Jugs' },
      { id: 'sub-cycling', slug: 'cycling-camping', name: 'Camping Tents & Rechargeable Torches' }
    ]
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    title: 'FTH Pro ANC Wireless Earbuds with LED Power Display & 48H Playtime',
    slug: 'fth-pro-anc-wireless-earbuds-led-display',
    brand: 'SoundPulse PK',
    categorySlug: 'electronics',
    subcategorySlug: 'wireless-earbuds',
    price: 2499,
    compareAtPrice: 4999,
    costPrice: 1150,
    supplierName: 'Shenzhen Audio Direct Dropship',
    supplierUrl: 'https://aliexpress.com/item/100500628192831.html',
    supplierCost: 1150,
    sku: 'FTH-AUD-ANC-01',
    stock: 84,
    lowStockThreshold: 15,
    rating: 4.8,
    reviewsCount: 342,
    ordersCount: 1840,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 88,
    badge: 'AliExpress Choice',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-putting-on-her-headphones-40019-large.mp4',
    attributes: [
      {
        name: 'Color',
        options: ['Midnight Black', 'Pearl White', 'Matte Navy']
      },
      {
        name: 'Edition',
        options: ['Standard ANC', 'Pro Gaming 45ms Latency']
      }
    ],
    variants: [
      { id: 'v-001-1', title: 'Midnight Black / Standard ANC', price: 2499, compareAtPrice: 4999, costPrice: 1150, stock: 42, sku: 'FTH-AUD-01-BLK', imageIndex: 0 },
      { id: 'v-001-2', title: 'Pearl White / Standard ANC', price: 2499, compareAtPrice: 4999, costPrice: 1150, stock: 28, sku: 'FTH-AUD-01-WHT', imageIndex: 1 },
      { id: 'v-001-3', title: 'Matte Navy / Standard ANC', price: 2599, compareAtPrice: 5199, costPrice: 1200, stock: 14, sku: 'FTH-AUD-01-NVY', imageIndex: 2 },
      { id: 'v-001-4', title: 'Midnight Black / Pro Gaming', price: 2899, compareAtPrice: 5699, costPrice: 1350, stock: 19, sku: 'FTH-AUD-01-GAMING', imageIndex: 3 }
    ],
    specifications: [
      { label: 'Bluetooth Version', value: 'Bluetooth 5.3 with ENC Quad Mics' },
      { label: 'Battery Capacity', value: '500mAh Charging Case + 45mAh Earbuds' },
      { label: 'Playtime', value: '8 Hours Single Charge, 48 Hours with Case' },
      { label: 'Charging Port', value: 'Fast USB Type-C (10 Mins = 2 Hours Play)' },
      { label: 'Waterproof Rating', value: 'IPX5 Sweat & Splash Proof' },
      { label: 'Warranty in Pakistan', value: '7 Days Replacement Guarantee' }
    ],
    description: `### Why Pakistani Customers Love The FTH Pro ANC Earbuds

Experience crystal-clear audio on noisy roads in Karachi, Lahore, and Islamabad with cutting-edge **Active Noise Cancellation (ANC)** and **ENC Quad Mic** call clarity.

#### Key Highlights:
- **Ultra-Clear Calls:** 4 Noise-filtering microphones ensure the receiver hears only your voice, eliminating bike/traffic wind noise.
- **Dynamic Deep Bass:** 13mm Titanium Composite drivers engineered for Pakistani music, bass drops, and gaming footsteps.
- **Smart LED Battery Indicator:** Never guess your charging case or individual earbud battery percentage.
- **Ultra-Low 45ms Latency:** Seamless audio-video sync for PUBG Mobile, Call of Duty, and Netflix streaming.
- **Pakistan COD Available:** Inspect parcel at delivery with 100% money-back buyer protection.`,
    seller: {
      name: 'FTH Official Tech Hub',
      rating: 4.9,
      positiveFeedback: '98.7%',
      followers: '32.4K',
      badge: 'FTH Top Rated Seller',
      joinedYear: '2024',
      responseTime: '< 15 mins'
    },
    reviews: [
      {
        id: 'rev-01',
        userName: 'Hamza Tariq (Lahore, DHA)',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-12',
        verifiedPurchase: true,
        variantPurchased: 'Midnight Black / Pro Gaming',
        comment: 'Delivered in Lahore in just 2 days via TCS. Sound quality is unreal for this price in Pakistan! Deep bass and mic works great even when riding my bike. 10/10 recommended!',
        images: [
          'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&auto=format&fit=crop&q=80'
        ],
        helpfulCount: 47
      },
      {
        id: 'rev-02',
        userName: 'Ayesha Malik (Karachi, Clifton)',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-08',
        verifiedPurchase: true,
        variantPurchased: 'Pearl White / Standard ANC',
        comment: 'Very sleek look, connects instantly with my iPhone 14. Battery display is so convenient. Cash on delivery was seamless.',
        images: [],
        helpfulCount: 29
      },
      {
        id: 'rev-03',
        userName: 'Bilal Khan (Islamabad, F-10)',
        userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
        rating: 4,
        date: '2026-07-28',
        verifiedPurchase: true,
        variantPurchased: 'Midnight Black',
        comment: 'Great build quality. Earbuds fit comfortably for 4-5 hours of non-stop meetings.',
        images: [],
        helpfulCount: 14
      }
    ],
    faqs: [
      {
        q: 'Does it support iPhone and Android?',
        a: 'Yes, 100% compatible with all Android devices (Samsung, Xiaomi, Vivo, Infinix, etc.) and Apple iPhones & iPads.'
      },
      {
        q: 'How long does delivery take in Pakistan?',
        a: 'Karachi, Lahore, Rawalpindi & Islamabad receive orders within 24-48 hours. Other cities take 2-4 business days via TCS or Leopards.'
      },
      {
        q: 'Can I pay via Cash on Delivery (COD)?',
        a: 'Yes, Cash on Delivery is pre-selected and available across all cities and towns in Pakistan.'
      }
    ]
  },
  {
    id: 'prod-002',
    title: 'Ultra 9 Max AMOLED Smart Watch with Bluetooth Calling & Heart Rate Tracker',
    slug: 'ultra-9-max-amoled-smart-watch-bluetooth-calling',
    brand: 'AmoledTech PK',
    categorySlug: 'electronics',
    subcategorySlug: 'smart-watches',
    price: 3899,
    compareAtPrice: 7999,
    costPrice: 1950,
    supplierName: 'Guangzhou Wearables Factory',
    supplierUrl: 'https://aliexpress.com/item/1005007198231.html',
    supplierCost: 1950,
    sku: 'FTH-WCH-ULTRA9',
    stock: 53,
    lowStockThreshold: 10,
    rating: 4.9,
    reviewsCount: 489,
    ordersCount: 2410,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 92,
    badge: 'Top 1 Best Seller',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544117518-30dd5ff7a986?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      {
        name: 'Strap Color',
        options: ['Titanium Orange', 'Midnight Black', 'Alpine Green', 'Ocean Blue']
      },
      {
        name: 'Bundle Package',
        options: ['Single Strap', 'Dual Strap + Screen Protector (+Rs 300)']
      }
    ],
    variants: [
      { id: 'v-002-1', title: 'Titanium Orange / Single Strap', price: 3899, compareAtPrice: 7999, costPrice: 1950, stock: 18, sku: 'FTH-WCH-ORG-1', imageIndex: 0 },
      { id: 'v-002-2', title: 'Midnight Black / Single Strap', price: 3899, compareAtPrice: 7999, costPrice: 1950, stock: 21, sku: 'FTH-WCH-BLK-1', imageIndex: 1 },
      { id: 'v-002-3', title: 'Alpine Green / Dual Strap Bundle', price: 4199, compareAtPrice: 8499, costPrice: 2100, stock: 14, sku: 'FTH-WCH-GRN-2', imageIndex: 2 }
    ],
    specifications: [
      { label: 'Screen Display', value: '2.02" High Definition AMOLED True Color Display' },
      { label: 'Calling Function', value: 'Bluetooth HD Calling with Speaker & Mic' },
      { label: 'Sensors', value: 'Heart Rate, SpO2 Blood Oxygen, Sleep & Step Counter' },
      { label: 'Battery Life', value: '5-7 Days Normal Use, 15 Days Standby' },
      { label: 'Compatibility', value: 'iOS (Apple Health) & Android (WearFit Pro)' }
    ],
    description: `### Flagship Style at a Fraction of the Cost

The Ultra 9 Max brings titanium alloy design, crystal-clear Bluetooth calling, and always-on AMOLED display to your wrist. Receive WhatsApp, SMS, and Call notifications directly.`,
    seller: {
      name: 'FTH Gadgets Store',
      rating: 4.8,
      positiveFeedback: '97.9%',
      followers: '19.2K',
      badge: 'Gold Dropship Partner',
      joinedYear: '2024',
      responseTime: '< 30 mins'
    },
    reviews: [
      {
        id: 'rev-04',
        userName: 'Zubair Ahmed (Rawalpindi)',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-14',
        verifiedPurchase: true,
        variantPurchased: 'Titanium Orange',
        comment: 'Display is super bright even under full sunlight in Pindi. Calling quality is crisp!',
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 38
      }
    ],
    faqs: [
      { q: 'Can I change watch faces?', a: 'Yes, over 200+ watch faces available on the companion app, plus you can upload custom photos.' }
    ]
  },
  {
    id: 'prod-003',
    title: 'Multi-Functional 4-in-1 Electric Vegetable Chopper & Meat Grinder Set',
    slug: 'multi-functional-4-in-1-electric-vegetable-chopper',
    brand: 'ChefElite Home',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'smart-appliances',
    price: 1850,
    compareAtPrice: 3499,
    costPrice: 850,
    supplierName: 'Yiwu Kitchenware Dropship Group',
    supplierUrl: 'https://aliexpress.com/item/1005005829103.html',
    supplierCost: 850,
    sku: 'FTH-KTC-CHOP-4IN1',
    stock: 120,
    lowStockThreshold: 20,
    rating: 4.7,
    reviewsCount: 512,
    ordersCount: 3200,
    freeShipping: false,
    isFlashDeal: true,
    flashDealClaimed: 76,
    badge: 'SuperDeal',
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Color', options: ['Pastel Green', 'Fresh Yellow'] }
    ],
    variants: [
      { id: 'v-003-1', title: 'Pastel Green / Standard Set', price: 1850, compareAtPrice: 3499, costPrice: 850, stock: 75, sku: 'FTH-KTC-CHOP-GRN', imageIndex: 0 },
      { id: 'v-003-2', title: 'Fresh Yellow / Standard Set', price: 1850, compareAtPrice: 3499, costPrice: 850, stock: 45, sku: 'FTH-KTC-CHOP-YLW', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Motor Power', value: '40W High Torque Pure Copper Motor' },
      { label: 'Charging', value: 'Type-C USB Rechargeable (Cordless)' },
      { label: 'Blades Material', value: 'Food Grade 304 Stainless Steel' },
      { label: 'Application', value: 'Garlic, Ginger, Chilly, Meat, Veggies slicing directly into pan' }
    ],
    description: `### Make Desi Cooking 5X Faster & Tear-Free

No more tears slicing onions or tedious chopping for ginger-garlic paste! This wireless hand-held electric food chopper feeds directly into the cooking pot or collecting bowl.`,
    seller: {
      name: 'Smart Kitchen Pakistan',
      rating: 4.7,
      positiveFeedback: '96.8%',
      followers: '14.1K',
      badge: 'Verified Home Merchant',
      joinedYear: '2024',
      responseTime: '< 1 hour'
    },
    reviews: [
      {
        id: 'rev-05',
        userName: 'Saira Bano (Faisalabad)',
        userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-11',
        verifiedPurchase: true,
        variantPurchased: 'Pastel Green',
        comment: 'Zabardast product! Made onion & ginger paste in 10 seconds without any hassle. Easy to wash under tap.',
        images: ['https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 52
      }
    ],
    faqs: [
      { q: 'Is it rechargeable?', a: 'Yes, it has a built-in battery with USB Type-C charging cable included in the box.' }
    ]
  },
  {
    id: 'prod-004',
    title: 'Luxury Men Chronograph Waterproof Quartz Watch with Date Display & Steel Mesh Strap',
    slug: 'luxury-men-chronograph-waterproof-quartz-watch',
    brand: 'Naviforce & Curren Select',
    categorySlug: 'mens-fashion',
    subcategorySlug: 'mens-luxury-watches',
    price: 3250,
    compareAtPrice: 6500,
    costPrice: 1400,
    supplierName: 'Guangzhou Watch Empire',
    supplierUrl: 'https://aliexpress.com/item/100500642918.html',
    supplierCost: 1400,
    sku: 'FTH-WCH-CHRONO-M',
    stock: 67,
    lowStockThreshold: 12,
    rating: 4.8,
    reviewsCount: 230,
    ordersCount: 1450,
    freeShipping: true,
    isFlashDeal: false,
    flashDealClaimed: 45,
    badge: 'Best Seller',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Dial Style', options: ['Black Sunray Gold', 'Midnight Blue Silver', 'All Matte Black'] }
    ],
    variants: [
      { id: 'v-004-1', title: 'Black Sunray Gold', price: 3250, compareAtPrice: 6500, costPrice: 1400, stock: 24, sku: 'FTH-WCH-BLKGLD', imageIndex: 0 },
      { id: 'v-004-2', title: 'Midnight Blue Silver', price: 3250, compareAtPrice: 6500, costPrice: 1400, stock: 28, sku: 'FTH-WCH-BLUSIL', imageIndex: 1 },
      { id: 'v-004-3', title: 'All Matte Black', price: 3450, compareAtPrice: 6900, costPrice: 1500, stock: 15, sku: 'FTH-WCH-ALLBLK', imageIndex: 2 }
    ],
    specifications: [
      { label: 'Movement', value: 'Japanese Quartz Chronograph Movement' },
      { label: 'Dial Window', value: 'Hardlex Scratch-Resistant Crystal Glass' },
      { label: 'Water Resistance', value: '30M / 3ATM Splash & Rain Proof' },
      { label: 'Packaging', value: 'Comes in Luxury FTH Mart Gift Box' }
    ],
    description: `A statement of elegance and precision designed for Pakistani corporate wear, weddings, and everyday confidence.`,
    seller: {
      name: 'FTH Luxury Horology',
      rating: 4.9,
      positiveFeedback: '99.1%',
      followers: '28.1K',
      badge: 'FTH Choice Store',
      joinedYear: '2024',
      responseTime: '< 20 mins'
    },
    reviews: [
      {
        id: 'rev-06',
        userName: 'Usman Ali (Multan)',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-04',
        verifiedPurchase: true,
        variantPurchased: 'Black Sunray Gold',
        comment: 'Received in premium packaging. Looks like a 20k watch on wrist. Superb finishing!',
        images: ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 41
      }
    ],
    faqs: []
  },
  {
    id: 'prod-005',
    title: 'Designer Quilted Crossbody Chain Bag with Gold Hardware & Dual Compartments',
    slug: 'designer-quilted-crossbody-chain-bag-gold-hardware',
    brand: 'FTH Glamour Leather',
    categorySlug: 'womens-fashion',
    subcategorySlug: 'designer-handbags',
    price: 2699,
    compareAtPrice: 5200,
    costPrice: 1200,
    supplierName: 'Guangzhou Leather Boutique',
    supplierUrl: 'https://aliexpress.com/item/100500732819.html',
    supplierCost: 1200,
    sku: 'FTH-BAG-QUILT-01',
    stock: 48,
    lowStockThreshold: 8,
    rating: 4.9,
    reviewsCount: 318,
    ordersCount: 1980,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 81,
    badge: 'Hot Trend',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Color', options: ['Classic Ivory White', 'Midnight Noir Black', 'Blush Rose Pink', 'Emerald Green'] }
    ],
    variants: [
      { id: 'v-005-1', title: 'Classic Ivory White', price: 2699, compareAtPrice: 5200, costPrice: 1200, stock: 16, sku: 'FTH-BAG-IVR', imageIndex: 0 },
      { id: 'v-005-2', title: 'Midnight Noir Black', price: 2699, compareAtPrice: 5200, costPrice: 1200, stock: 18, sku: 'FTH-BAG-BLK', imageIndex: 1 },
      { id: 'v-005-3', title: 'Blush Rose Pink', price: 2699, compareAtPrice: 5200, costPrice: 1200, stock: 14, sku: 'FTH-BAG-PNK', imageIndex: 2 }
    ],
    specifications: [
      { label: 'Material', value: 'High-Grade Vegan PU Leather (Scratch Resistant)' },
      { label: 'Strap', value: 'Convertible Heavy Gold-Tone Link Chain' },
      { label: 'Closure', value: 'Secure Magnetic Snap Flap' },
      { label: 'Dimensions', value: '22cm x 15cm x 8cm (Fits all smartphones + makeup)' }
    ],
    description: `Elevate any eastern or western outfit with this stunning quilted luxury shoulder bag. Comes with reinforced stitching and dust protection bag.`,
    seller: {
      name: 'FTH Chic Studio',
      rating: 4.9,
      positiveFeedback: '98.4%',
      followers: '21.5K',
      badge: 'Verified Fashion Hub',
      joinedYear: '2024',
      responseTime: '< 30 mins'
    },
    reviews: [
      {
        id: 'rev-07',
        userName: 'Hira Siddiqui (Karachi)',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-15',
        verifiedPurchase: true,
        variantPurchased: 'Classic Ivory White',
        comment: 'The gold hardware is so shiny and expensive looking! Perfect for weddings and university. Very fast delivery.',
        images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 33
      }
    ],
    faqs: []
  },
  {
    id: 'prod-006',
    title: '5-in-1 Hot Air Styler & Hair Dryer Multi-Head Curling Wand Set',
    slug: '5-in-1-hot-air-styler-hair-dryer-curling-wand',
    brand: 'GlowGlam Tech',
    categorySlug: 'beauty-personal-care',
    subcategorySlug: 'hair-stylers',
    price: 3499,
    compareAtPrice: 6999,
    costPrice: 1650,
    supplierName: 'Ningbo Beauty Electricals',
    supplierUrl: 'https://aliexpress.com/item/1005006912384.html',
    supplierCost: 1650,
    sku: 'FTH-STYLER-5IN1',
    stock: 92,
    lowStockThreshold: 15,
    rating: 4.8,
    reviewsCount: 620,
    ordersCount: 3890,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 95,
    badge: 'AliExpress Choice',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Color Theme', options: ['Rose Gold & Grey', 'Signature Fuchsia Pink'] }
    ],
    variants: [
      { id: 'v-006-1', title: 'Rose Gold & Grey', price: 3499, compareAtPrice: 6999, costPrice: 1650, stock: 52, sku: 'FTH-STY-GLD', imageIndex: 0 },
      { id: 'v-006-2', title: 'Signature Fuchsia Pink', price: 3499, compareAtPrice: 6999, costPrice: 1650, stock: 40, sku: 'FTH-STY-PNK', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Attachments Included', value: 'Pre-styling dryer, 2x 30mm auto-wrap curlers, Soft smoothing brush, Round volumizing brush' },
      { label: 'Heat Settings', value: '3 Temperature & Speed Levels (Cold shot for setting curls)' },
      { label: 'Voltage', value: '220V Pakistan Plug (Standard 2-Pin)' },
      { label: 'Technology', value: 'Coanda Airflow with Negative Ion Anti-Frizz protection' }
    ],
    description: `Salon-style blowouts and bouncy curls at home in minutes without extreme heat damage! Designed specifically for thick South Asian hair textures.`,
    seller: {
      name: 'FTH Beauty Store',
      rating: 4.8,
      positiveFeedback: '97.5%',
      followers: '45.8K',
      badge: 'FTH Official Store',
      joinedYear: '2024',
      responseTime: '< 20 mins'
    },
    reviews: [
      {
        id: 'rev-08',
        userName: 'Dr. Fatima Noor (Lahore, Model Town)',
        userAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-16',
        verifiedPurchase: true,
        variantPurchased: 'Signature Fuchsia Pink',
        comment: 'Best purchase of the year! Saves 45 minutes every morning before clinic. The auto-wrap curler actually works just like the 150k expensive brand.',
        images: ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 68
      }
    ],
    faqs: []
  },
  {
    id: 'prod-007',
    title: '4K Dual Dash Cam Front & Rear with Night Vision & Built-in WiFi / Parking Monitor',
    slug: '4k-dual-dash-cam-front-rear-night-vision-wifi',
    brand: 'DriveGuard Pro',
    categorySlug: 'automotive-accessories',
    subcategorySlug: 'car-dashcams',
    price: 4999,
    compareAtPrice: 9500,
    costPrice: 2400,
    supplierName: 'Shenzhen Auto Electronics Co.',
    supplierUrl: 'https://aliexpress.com/item/1005006819284.html',
    supplierCost: 2400,
    sku: 'FTH-AUTO-DASH4K',
    stock: 35,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewsCount: 194,
    ordersCount: 980,
    freeShipping: true,
    isFlashDeal: false,
    flashDealClaimed: 35,
    badge: 'Road Safety Must',
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Memory Card Bundle', options: ['Without SD Card', 'With 64GB High-Speed Class 10 SD (+Rs 800)'] }
    ],
    variants: [
      { id: 'v-007-1', title: 'Without SD Card', price: 4999, compareAtPrice: 9500, costPrice: 2400, stock: 20, sku: 'FTH-DASH-NOSD', imageIndex: 0 },
      { id: 'v-007-2', title: 'With 64GB High-Speed SD', price: 5799, compareAtPrice: 10500, costPrice: 2800, stock: 15, sku: 'FTH-DASH-64GB', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Video Resolution', value: 'Front 4K UHD (3840x2160) + Rear 1080P Full HD' },
      { label: 'Lens Angle', value: '170° Wide Angle with Sony Starvis Sensor' },
      { label: 'WiFi & App', value: 'Download accident footage directly to your smartphone' },
      { label: 'Loop Recording & G-Sensor', value: 'Auto-locks video during sudden impact or brake' }
    ],
    description: `Protect yourself against false traffic claims and accidents across Pakistani highways and city traffic. Works flawlessly under extreme Pakistani summer temperatures.`,
    seller: {
      name: 'FTH Auto Zone',
      rating: 4.9,
      positiveFeedback: '98.9%',
      followers: '15.6K',
      badge: 'Auto Specialist',
      joinedYear: '2024',
      responseTime: '< 30 mins'
    },
    reviews: [
      {
        id: 'rev-09',
        userName: 'Waqas Rasheed (Islamabad)',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-01',
        verifiedPurchase: true,
        variantPurchased: 'With 64GB High-Speed SD',
        comment: 'Crystal clear license plate visibility even at night on Kashmir Highway. App connected in seconds.',
        images: [],
        helpfulCount: 19
      }
    ],
    faqs: []
  },
  {
    id: 'prod-008',
    title: 'High-Speed Stunt 360° Rotating RC Drift Car with Gesture Sensor & LED Lights',
    slug: 'high-speed-stunt-360-rotating-rc-drift-car-gesture-sensor',
    brand: 'TurboKids Tech',
    categorySlug: 'kids-toys-baby',
    subcategorySlug: 'rc-cars-drones',
    price: 2850,
    compareAtPrice: 5500,
    costPrice: 1300,
    supplierName: 'Chenghai Toy City Export',
    supplierUrl: 'https://aliexpress.com/item/1005007481923.html',
    supplierCost: 1300,
    sku: 'FTH-TOY-STUNTRC',
    stock: 58,
    lowStockThreshold: 10,
    rating: 4.8,
    reviewsCount: 280,
    ordersCount: 1650,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 70,
    badge: 'Kids Favorite',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516981879613-9f5da904015f?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Color', options: ['Hyper Blue', 'Inferno Red'] },
      { name: 'Control Mode', options: ['Dual Mode (Remote + Hand Gesture Watch)'] }
    ],
    variants: [
      { id: 'v-008-1', title: 'Hyper Blue / Dual Mode', price: 2850, compareAtPrice: 5500, costPrice: 1300, stock: 32, sku: 'FTH-RC-BLU', imageIndex: 0 },
      { id: 'v-008-2', title: 'Inferno Red / Dual Mode', price: 2850, compareAtPrice: 5500, costPrice: 1300, stock: 26, sku: 'FTH-RC-RED', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Control Distance', value: 'Up to 50 Meters with 2.4GHz Anti-Interference' },
      { label: 'Battery', value: 'Rechargeable Li-ion (Includes USB Charger Cable)' },
      { label: 'Stunts', value: 'Double-sided driving, 360° spin flips, all-terrain bionic spine' }
    ],
    description: `Control the car with simple hand gestures! Bionic spine transforms for off-road gravel and flat tiles. Comes with LED headlights and dynamic sound effects.`,
    seller: {
      name: 'Kids World PK',
      rating: 4.8,
      positiveFeedback: '97.2%',
      followers: '12.8K',
      badge: 'Verified Toy Seller',
      joinedYear: '2024',
      responseTime: '< 1 hour'
    },
    reviews: [
      {
        id: 'rev-10',
        userName: 'Farhan Sheikh (Gujranwala)',
        userAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-09',
        verifiedPurchase: true,
        variantPurchased: 'Hyper Blue',
        comment: 'My 7 year old son is obsessed! Gesture watch control is like magic. Very sturdy plastic.',
        images: [],
        helpfulCount: 22
      }
    ],
    faqs: []
  },
  {
    id: 'prod-009',
    title: '11-Piece Complete Home Gym Resistance Bands Set with Door Anchor & Ankle Straps',
    slug: '11-piece-complete-home-gym-resistance-bands-set',
    brand: 'FitPro Arena PK',
    categorySlug: 'sports-fitness',
    subcategorySlug: 'resistance-bands-weights',
    price: 1699,
    compareAtPrice: 3200,
    costPrice: 750,
    supplierName: 'Zhejiang Sports Goods Co.',
    supplierUrl: 'https://aliexpress.com/item/1005006129841.html',
    supplierCost: 750,
    sku: 'FTH-FIT-BANDS-11',
    stock: 140,
    lowStockThreshold: 25,
    rating: 4.7,
    reviewsCount: 380,
    ordersCount: 2150,
    freeShipping: false,
    isFlashDeal: true,
    flashDealClaimed: 64,
    badge: 'Fitness Top Pick',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Resistance Level', options: ['100 LBS Total Stackable', '150 LBS Heavy Duty (+Rs 300)'] }
    ],
    variants: [
      { id: 'v-009-1', title: '100 LBS Total Stackable', price: 1699, compareAtPrice: 3200, costPrice: 750, stock: 90, sku: 'FTH-FIT-100', imageIndex: 0 },
      { id: 'v-009-2', title: '150 LBS Heavy Duty', price: 1999, compareAtPrice: 3800, costPrice: 900, stock: 50, sku: 'FTH-FIT-150', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Material', value: '100% Natural Eco-friendly Latex (Anti-snap)' },
      { label: 'Package Includes', value: '5 Stackable Bands, 2 Cushioned Foam Handles, 2 Ankle Straps, 1 Door Anchor, 1 Waterproof Travel Pouch' }
    ],
    description: `Full body workouts for chest, biceps, back, and legs from home. Ideal for Pakistani fitness enthusiasts who prefer home workouts.`,
    seller: {
      name: 'FTH Sports Direct',
      rating: 4.8,
      positiveFeedback: '98.0%',
      followers: '11.2K',
      badge: 'Fitness Official',
      joinedYear: '2024',
      responseTime: '< 15 mins'
    },
    reviews: [
      {
        id: 'rev-11',
        userName: 'Kashif Mehmood (Peshawar)',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-07',
        verifiedPurchase: true,
        variantPurchased: '150 LBS Heavy Duty',
        comment: 'Bands have strong tension and handles are comfortable. High quality door anchor.',
        images: [],
        helpfulCount: 17
      }
    ],
    faqs: []
  },
  {
    id: 'prod-010',
    title: 'Magnetic Levitation Moon Lamp with 16 Color Changing LED & Touch Control',
    slug: 'magnetic-levitation-moon-lamp-16-colors',
    brand: 'LumiArt Living',
    categorySlug: 'home-kitchen',
    subcategorySlug: 'led-lighting',
    price: 4499,
    compareAtPrice: 8500,
    costPrice: 2200,
    supplierName: 'Shenzhen 3D Lighting Tech',
    supplierUrl: 'https://aliexpress.com/item/1005006948291.html',
    supplierCost: 2200,
    sku: 'FTH-LAMP-MOON-LEV',
    stock: 28,
    lowStockThreshold: 5,
    rating: 4.9,
    reviewsCount: 165,
    ordersCount: 820,
    freeShipping: true,
    isFlashDeal: false,
    flashDealClaimed: 40,
    badge: 'Viral Aesthetic',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Base Finish', options: ['Dark Walnut Wood Grain', 'Light Nordic Oak Grain'] }
    ],
    variants: [
      { id: 'v-010-1', title: 'Dark Walnut Wood Grain', price: 4499, compareAtPrice: 8500, costPrice: 2200, stock: 15, sku: 'FTH-LAMP-WALNUT', imageIndex: 0 },
      { id: 'v-010-2', title: 'Light Nordic Oak Grain', price: 4499, compareAtPrice: 8500, costPrice: 2200, stock: 13, sku: 'FTH-LAMP-OAK', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Technology', value: 'Electromagnetic Levitation & Wireless Induction Power' },
      { label: 'Moon Surface', value: '3D Printed NASA High-Resolution Topography' },
      { label: 'Control', value: 'Touch Base + Wireless 16-Color Remote' }
    ],
    description: `Floats and spins silently in mid-air! The ultimate bedside lamp and conversation starter for your drawing room or desk.`,
    seller: {
      name: 'FTH Home Decor',
      rating: 4.9,
      positiveFeedback: '99.0%',
      followers: '18.4K',
      badge: 'Verified Decor Merchant',
      joinedYear: '2024',
      responseTime: '< 30 mins'
    },
    reviews: [
      {
        id: 'rev-12',
        userName: 'Mahnoor Khan (Karachi, DHA 6)',
        userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        date: '2026-08-13',
        verifiedPurchase: true,
        variantPurchased: 'Dark Walnut Wood Grain',
        comment: 'Looks breathtaking on my study table! Everyone who visits asks where I bought it from.',
        images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&auto=format&fit=crop&q=80'],
        helpfulCount: 36
      }
    ],
    faqs: []
  },
  {
    id: 'prod-011',
    title: 'Fast 65W GaN USB-C 3-Port Laptop & Mobile Super-Fast Charger',
    slug: 'fast-65w-gan-usbc-laptop-mobile-charger',
    brand: 'PowerCore PK',
    categorySlug: 'electronics',
    subcategorySlug: 'power-banks',
    price: 2999,
    compareAtPrice: 5800,
    costPrice: 1350,
    supplierName: 'Shenzhen GaN Power Direct',
    supplierUrl: 'https://aliexpress.com/item/100500632918.html',
    supplierCost: 1350,
    sku: 'FTH-PWR-65WGAN',
    stock: 72,
    lowStockThreshold: 12,
    rating: 4.9,
    reviewsCount: 310,
    ordersCount: 1890,
    freeShipping: true,
    isFlashDeal: true,
    flashDealClaimed: 84,
    badge: 'AliExpress Choice',
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Color', options: ['Matte Black', 'Glacier White'] }
    ],
    variants: [
      { id: 'v-011-1', title: 'Matte Black', price: 2999, compareAtPrice: 5800, costPrice: 1350, stock: 42, sku: 'FTH-GAN-BLK', imageIndex: 0 },
      { id: 'v-011-2', title: 'Glacier White', price: 2999, compareAtPrice: 5800, costPrice: 1350, stock: 30, sku: 'FTH-GAN-WHT', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Technology', value: 'Gallium Nitride (GaN III) Ultra-Compact Design' },
      { label: 'Output Ports', value: '2x USB Type-C (PD 3.0 65W) + 1x USB-A (QC 4.0 30W)' },
      { label: 'Compatibility', value: 'MacBook Pro/Air, Dell XPS, iPhone 15/14, Samsung Galaxy S24/S23 (45W Super Fast 2.0)' }
    ],
    description: `Charge your Laptop, iPhone, and Smartwatch all from one compact wall brick. Fits in your pocket without overheating.`,
    seller: {
      name: 'FTH Official Tech Hub',
      rating: 4.9,
      positiveFeedback: '98.7%',
      followers: '32.4K',
      badge: 'FTH Top Rated Seller',
      joinedYear: '2024',
      responseTime: '< 15 mins'
    },
    reviews: [],
    faqs: []
  },
  {
    id: 'prod-012',
    title: 'Professional Barber Cordless Vintage T9 Hair & Beard Trimmer with Metal Engraving',
    slug: 'professional-barber-cordless-vintage-t9-hair-trimmer',
    brand: 'BladeMaster Pro',
    categorySlug: 'beauty-personal-care',
    subcategorySlug: 'shavers-trimmers',
    price: 1450,
    compareAtPrice: 2800,
    costPrice: 620,
    supplierName: 'Wenzhou Electric Clipper Works',
    supplierUrl: 'https://aliexpress.com/item/1005005829103.html',
    supplierCost: 620,
    sku: 'FTH-TRIM-T9-BRASS',
    stock: 180,
    lowStockThreshold: 30,
    rating: 4.8,
    reviewsCount: 750,
    ordersCount: 4500,
    freeShipping: false,
    isFlashDeal: true,
    flashDealClaimed: 91,
    badge: 'SuperDeal',
    images: [
      'https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80'
    ],
    attributes: [
      { name: 'Engraving Pattern', options: ['Vintage Dragon Gold', 'Buddha Classic Bronze', 'Skull Silver'] }
    ],
    variants: [
      { id: 'v-012-1', title: 'Vintage Dragon Gold', price: 1450, compareAtPrice: 2800, costPrice: 620, stock: 95, sku: 'FTH-T9-DRG', imageIndex: 0 },
      { id: 'v-012-2', title: 'Buddha Classic Bronze', price: 1450, compareAtPrice: 2800, costPrice: 620, stock: 85, sku: 'FTH-T9-BDH', imageIndex: 1 }
    ],
    specifications: [
      { label: 'Blade', value: 'Zero-Gapped Carbon Steel T-Blade (Skin Safe)' },
      { label: 'Battery', value: '1200mAh Lithium-ion (120 Mins Continuous Run)' },
      { label: 'Comb Guides', value: 'Includes 1.5mm, 2mm, 3mm, 4mm limit combs + cleaning brush' }
    ],
    description: `The #1 best-selling trimmer in Pakistan for crisp beard lines, fades, and body grooming. Heavy metallic all-metal body feel.`,
    seller: {
      name: 'FTH Beauty Store',
      rating: 4.8,
      positiveFeedback: '97.5%',
      followers: '45.8K',
      badge: 'FTH Official Store',
      joinedYear: '2024',
      responseTime: '< 20 mins'
    },
    reviews: [],
    faqs: []
  },
  ...MARKAZ_PRODUCTS_500
];

export const INITIAL_COUPONS = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    fixedDiscount: 0,
    minSpend: 1500,
    description: '10% OFF for new FTH Mart customers on first order',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'FTHFREESHIP',
    discountPercent: 0,
    fixedDiscount: 180,
    minSpend: 2000,
    description: 'Free Shipping Voucher (Rs 180 Discount)',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'AZADI500',
    discountPercent: 0,
    fixedDiscount: 500,
    minSpend: 4000,
    description: 'Rs 500 Flat OFF on orders above Rs 4,000',
    expiry: '2026-10-31',
    active: true
  },
  {
    code: 'SUPERDEAL15',
    discountPercent: 15,
    fixedDiscount: 0,
    minSpend: 3000,
    description: '15% Mega Discount on Flash Sale purchases',
    expiry: '2026-09-30',
    active: true
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'FTH-2026-001284',
    createdAt: '2026-08-16T14:30:00.000Z',
    customer: {
      name: 'Saad Ur Rehman',
      phone: '03214892104',
      email: 'saad.rehman@gmail.com'
    },
    shippingAddress: {
      province: 'Punjab',
      city: 'Lahore',
      area: 'DHA Phase 5, Sector C',
      street: 'House 412, Street 8',
      landmark: 'Near Jalal Sons',
      phone: '03214892104'
    },
    items: [
      {
        productId: 'prod-001',
        title: 'FTH Pro ANC Wireless Earbuds with LED Power Display & 48H Playtime',
        variantTitle: 'Midnight Black / Pro Gaming',
        price: 2899,
        costPrice: 1350,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80',
        sku: 'FTH-AUD-01-GAMING'
      },
      {
        productId: 'prod-003',
        title: 'Multi-Functional 4-in-1 Electric Vegetable Chopper Set',
        variantTitle: 'Pastel Green',
        price: 1850,
        costPrice: 850,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&auto=format&fit=crop&q=80',
        sku: 'FTH-KTC-CHOP-GRN'
      }
    ],
    subtotal: 4749,
    shippingFee: 0,
    discount: 500,
    total: 4249,
    totalCost: 2200,
    grossProfit: 2049,
    paymentMethod: 'cod',
    paymentStatus: 'pending_cod',
    status: 'in_transit',
    courier: 'TCS Express',
    trackingNumber: 'TCS-PK-982147321',
    rtoRisk: 'low',
    timeline: [
      { status: 'placed', title: 'Order Placed', time: '2026-08-16T14:30:00.000Z', note: 'Customer ordered via Cash on Delivery.' },
      { status: 'confirmed', title: 'WhatsApp Confirmed', time: '2026-08-16T15:10:00.000Z', note: 'Customer verified address via FTH Mart WhatsApp desk.' },
      { status: 'packed', title: 'Packed & Barcoded', time: '2026-08-16T18:00:00.000Z', note: 'Quality checked and packed in tamper-proof bubble mailer.' },
      { status: 'shipped', title: 'Handed to TCS Logistics', time: '2026-08-17T09:30:00.000Z', note: 'Dispatched from Lahore fulfillment hub.' },
      { status: 'in_transit', title: 'In Transit — Out for Delivery Today', time: '2026-08-18T08:15:00.000Z', note: 'Rider Tariq (0300-8472910) assigned for delivery.' }
    ]
  },
  {
    id: 'FTH-2026-001280',
    createdAt: '2026-08-15T11:20:00.000Z',
    customer: {
      name: 'Zainab Mustafa',
      phone: '03339182741',
      email: 'zainab.m@yahoo.com'
    },
    shippingAddress: {
      province: 'Sindh',
      city: 'Karachi',
      area: 'Clifton Block 4',
      street: 'Apartment 3B, Sea View Towers',
      landmark: 'Near BBQ Tonight',
      phone: '03339182741'
    },
    items: [
      {
        productId: 'prod-005',
        title: 'Designer Quilted Crossbody Chain Bag with Gold Hardware',
        variantTitle: 'Classic Ivory White',
        price: 2699,
        costPrice: 1200,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&auto=format&fit=crop&q=80',
        sku: 'FTH-BAG-IVR'
      }
    ],
    subtotal: 2699,
    shippingFee: 180,
    discount: 269,
    total: 2610,
    totalCost: 1200,
    grossProfit: 1410,
    paymentMethod: 'cod',
    paymentStatus: 'collected',
    status: 'delivered',
    courier: 'Leopards Courier',
    trackingNumber: 'LEO-PK-449102847',
    rtoRisk: 'low',
    timeline: [
      { status: 'placed', title: 'Order Placed', time: '2026-08-15T11:20:00.000Z', note: 'Customer ordered via COD.' },
      { status: 'confirmed', title: 'Confirmed by Call', time: '2026-08-15T12:00:00.000Z', note: 'Verified by agent.' },
      { status: 'packed', title: 'Packed', time: '2026-08-15T15:30:00.000Z', note: 'Packed with fragile sticker.' },
      { status: 'shipped', title: 'Shipped via Leopards', time: '2026-08-16T10:00:00.000Z', note: 'Dispatched to Karachi sorting facility.' },
      { status: 'delivered', title: 'Delivered & Cash Collected', time: '2026-08-17T16:45:00.000Z', note: 'Received by customer. Cash Rs 2,610 received by rider.' }
    ]
  },
  {
    id: 'FTH-2026-001275',
    createdAt: '2026-08-14T09:15:00.000Z',
    customer: {
      name: 'Muhammad Daniyal',
      phone: '03017642918',
      email: 'daniyal.pk@outlook.com'
    },
    shippingAddress: {
      province: 'Islamabad Capital Territory',
      city: 'Islamabad',
      area: 'F-8/3',
      street: 'House 71, Street 24',
      landmark: 'Near Margalla Hotel',
      phone: '03017642918'
    },
    items: [
      {
        productId: 'prod-002',
        title: 'Ultra 9 Max AMOLED Smart Watch with Bluetooth Calling',
        variantTitle: 'Titanium Orange',
        price: 3899,
        costPrice: 1950,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80',
        sku: 'FTH-WCH-ORG-1'
      }
    ],
    subtotal: 3899,
    shippingFee: 0,
    discount: 0,
    total: 3899,
    totalCost: 1950,
    grossProfit: 1949,
    paymentMethod: 'bank_transfer',
    paymentStatus: 'paid',
    status: 'delivered',
    courier: 'Trax Logistics',
    trackingNumber: 'TRX-PK-772918401',
    rtoRisk: 'low',
    timeline: [
      { status: 'placed', title: 'Order Placed', time: '2026-08-14T09:15:00.000Z', note: 'Bank transfer receipt uploaded.' },
      { status: 'confirmed', title: 'Payment Reconciled', time: '2026-08-14T09:45:00.000Z', note: 'Meezan Bank 1Link transaction verified.' },
      { status: 'packed', title: 'Packed', time: '2026-08-14T12:00:00.000Z', note: 'Tested AMOLED display.' },
      { status: 'shipped', title: 'Shipped via Trax', time: '2026-08-14T17:00:00.000Z', note: 'Handed over for Islamabad express delivery.' },
      { status: 'delivered', title: 'Delivered', time: '2026-08-15T13:30:00.000Z', note: 'Delivered at door.' }
    ]
  }
];

export const INITIAL_ANNOUNCEMENT = '🎉 Pakistan Independence Mega Sale: Use Code "AZADI500" for Rs 500 OFF! • Cash on Delivery Nationwide • Free Delivery Over Rs 2,500';

export const HERO_SLIDES = [
  {
    id: 1,
    title: 'AliExpress Choice Deals — Delivered in 48H Nationwide',
    subtitle: 'High-Demand Dropshipping Tech & Smart Living Gadgets at Wholesale Direct Prices in PKR',
    tag: 'MEGA DEALS 2026',
    discountTag: 'UP TO 70% OFF',
    ctaText: 'Shop Flash Deals',
    ctaLink: '/c/electronics',
    bgGradient: 'from-sky-900 via-blue-900 to-slate-950',
    accentColor: '#0284C7',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Smart Home & Kitchen Innovations',
    subtitle: 'Cut cooking prep time by 70% with cordless multi-choppers, air fryer gadgets & LED lamps',
    tag: 'HOME ESSENTIALS',
    discountTag: 'STARTING AT RS 1,450',
    ctaText: 'Explore Kitchen',
    ctaLink: '/c/home-kitchen',
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
    accentColor: '#16A34A',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Luxury Chronographs & Smart AMOLED Watches',
    subtitle: 'Bluetooth Calling, Heart Rate & Titanium Straps with 7-Day Guarantee',
    tag: 'FASHION & TECH',
    discountTag: 'FREE DELIVERY',
    ctaText: 'Browse Watches',
    ctaLink: '/c/mens-fashion',
    bgGradient: 'from-amber-950 via-slate-900 to-slate-950',
    accentColor: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80'
  }
];
