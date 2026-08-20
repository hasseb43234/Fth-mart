// Standalone categories & configuration for backend server

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-electronics',
    slug: 'electronics',
    name: 'Electronics & Smart Tech',
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Home',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
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
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=60',
    itemCount: 100,
    featured: false,
    subcategories: [
      { id: 'sub-gym', slug: 'resistance-bands-weights', name: 'Home Workout Bands & Grip Sets', popular: true },
      { id: 'sub-bottles', slug: 'motivational-bottles', name: '2L Motivational Water Jugs' },
      { id: 'sub-cycling', slug: 'cycling-camping', name: 'Camping Tents & Rechargeable Torches' }
    ]
  }
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
  }
];

export const INITIAL_ORDERS = [];
