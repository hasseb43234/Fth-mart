import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Authentic Pakistani Brands and Sourcing Names from Markaz App
const WOMEN_BRANDS = [
  'Khaadi Replica', 'Gul Ahmed Master Copy', 'Sana Safinaz Style', 'Maria.B Edition',
  'Asim Jofa Look', 'Baroque Collection', 'Sapphire Style', 'Nishat Linen Copy',
  'Limelight Look', 'Zellbury Edition', 'Bonanza Satrangi Look', 'Alkaram Print',
  'Charizma Design', 'Cross Stitch Style', 'J. Junaid Jamshed Look', 'MTJ Replica',
  'Edenrobe Style', 'Beechtree Edition', 'Saya Collection', 'Ego Modern Style'
];

const ELECTRONICS_BRANDS = [
  'Joyroom', 'Audionic', 'Faster', 'Ronin', 'Zero Lifestyle', 'Dany', 'SoundPulse',
  'M10 Pro', 'M19 Pro', 'F9 TWS', 'Air31 Cyber', 'HK9 Ultra', 'T800 Ultra', 'NovaFit',
  'Baseus', 'Anker Look', 'Remax', 'Hoco', 'Kieslect', 'Mibro'
];

const KITCHEN_BRANDS = [
  'SilverCrest', 'KitchenChef', 'Anex Master', 'Sogo PK', 'Geepas Pro', 'Westpoint Style',
  'Sonifer', 'SmartSpace', 'HomeComfort', 'ChefMaster', 'DecoStyle', 'IKEA Look'
];

const BEAUTY_BRANDS = [
  'Rivaj UK', 'Miss Rose', 'Christine PK', 'Bioaqua', 'Dr. Rashel', 'Romantic May',
  'VGR Professional', 'Kemei', 'Dingling', 'Vintage T9', 'CkeyiN', 'InFace'
];

const MENS_BRANDS = [
  'Curren', 'Naviforce', 'Skmei', 'Poedagar', 'Oupinke', 'Megir', 'UrbanCraft Leather',
  'Hub Leather Style', 'J. Fragrance Look', 'Royal Leather PK', 'Montblanc Style'
];

const AUTO_BRANDS = [
  '70mai Style', 'BlackBox Pro', 'RoadMaster', 'AutoTech PK', 'Baseus Car', 'CarLife', 'DriveSafe'
];

const KIDS_BRANDS = [
  'SmartBaby', 'ToyLand', 'RC Power', 'PlayLearn', 'KidZone PK', 'WonderKids', 'LittleStar'
];

// Product Blueprints for each category
const BLUEPRINTS = [
  // 1. Women's Fashion & Suits (100 distinct items)
  {
    categorySlug: 'womens-fashion',
    categoryName: "Women's Fashion & Clothing",
    subcategorySlug: 'stitched-lawn-suits',
    brands: WOMEN_BRANDS,
    items: [
      { name: '3-Piece Embroidered Chiffon Dupatta Lawn Suit', price: 2899, cost: 1450, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Lawn with Chiffon Dupatta' },
      { name: '2-Piece Digital Printed Kurti with Cambric Trousers', price: 1899, cost: 950, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', fabric: 'Digital Printed Premium Lawn' },
      { name: 'Heavy Embroidered Organza Party Wear Maxi with Silk Inner', price: 5499, cost: 2750, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80', fabric: 'Organza & Raw Silk' },
      { name: 'Velvet Embroidered Bridal Shawl with Four-Side Zari Border', price: 3499, cost: 1750, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&auto=format&fit=crop&q=80', fabric: 'Micro Velvet 9000' },
      { name: 'Luxury Chickenkari Stitched Summer Kurta with Lace Embellishments', price: 2199, cost: 1100, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', fabric: 'Handcrafted Chickenkari Lawn' },
      { name: '3-Piece Unstitched Jacquard Festive Collection with Organza Patch', price: 3299, cost: 1650, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Self Jacquard Weave' },
      { name: 'Digital Printed Linen 3-Piece Winter Collection Suit', price: 2399, cost: 1200, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', fabric: 'Warm Twill Linen' },
      { name: 'Front Open Embroidered Abaya Gown with Matching Sheila Hijab', price: 3899, cost: 1950, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', fabric: 'Korean Nida Fabric' },
      { name: 'Silk Stitched Formal Kurti with Hand Cutwork Neckline', price: 2499, cost: 1250, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', fabric: 'Shamooz Silk' },
      { name: '3-Piece Khaddar Winter Suit with Wool Shawl Dupatta', price: 2799, cost: 1400, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Heavy Slub Khaddar' }
    ]
  },
  // 2. Women's Bags & Jewelry (70 distinct items)
  {
    categorySlug: 'womens-fashion',
    categoryName: "Women's Fashion & Accessories",
    subcategorySlug: 'designer-handbags',
    brands: ['Charles & Keith Style', 'Aldo Look', 'Michael Kors Style', 'UrbanChic PK', 'Lara Leather', 'Zara Look'],
    items: [
      { name: 'Structured Crossbody Handbag with Gold Turn-Lock', price: 2199, cost: 1100, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', fabric: 'Textured PU Leather' },
      { name: '3-in-1 Luxury Handbag Set (Tote + Crossbody + Pouch)', price: 2999, cost: 1500, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', fabric: 'Saffiano Leather Finish' },
      { name: 'Korean Crescent Half-Moon Shoulder Bag', price: 1699, cost: 850, img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80', fabric: 'Smooth Matte Vegan Leather' },
      { name: 'Bridal Velvet Clutch with Crystal & Pearl Brooch', price: 2299, cost: 1150, img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80', fabric: 'Rich Velvet with Metal Frame' },
      { name: '24K Gold Plated Zircon Bridal Jewelry Set (Necklace + Earrings + Teeka)', price: 3499, cost: 1750, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80', fabric: 'High Grade Zircon & Gold Plating' },
      { name: 'Kundan Choker Set with Pearl Mala & Matching Jhumkas', price: 2799, cost: 1400, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80', fabric: 'Handmade Meenakari Kundan' }
    ]
  },
  // 3. Smart Electronics & Audio (80 distinct items)
  {
    categorySlug: 'electronics',
    categoryName: 'Electronics & Smart Tech',
    subcategorySlug: 'wireless-earbuds',
    brands: ELECTRONICS_BRANDS,
    items: [
      { name: 'M10 TWS Wireless Earbuds with 2000mAh Power Display Case', price: 1399, cost: 650, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', fabric: 'Bluetooth 5.3 + LED Screen' },
      { name: 'Air31 Transparent Cyberpunk Crystal Wireless Earbuds', price: 1699, cost: 800, img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=80', fabric: 'ENC Noise Reduction + HiFi Stereo' },
      { name: 'ANC Active Noise Cancelling Wireless Bluetooth Earphones', price: 2999, cost: 1450, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', fabric: '-35dB Hybrid ANC + 48H Battery' },
      { name: 'Low Latency 40ms RGB Gaming Wireless Earbuds', price: 1899, cost: 900, img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80', fabric: 'Dual Gaming Mode + Bass Boost' },
      { name: 'Ultra 2 Smartwatch with AMOLED Display & Bluetooth Calling', price: 3899, cost: 1900, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', fabric: '2.02" HD AMOLED + Metal Body' },
      { name: 'T800 Ultra Big Screen Smart Watch with Wireless Charger', price: 1999, cost: 950, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', fabric: 'Heart Rate + Sports Tracking' },
      { name: '20000mAh 65W Fast Charging GaN Power Bank with LED Meter', price: 3699, cost: 1800, img: 'https://images.unsplash.com/photo-1609592424307-e8982c5fbe60?w=600&auto=format&fit=crop&q=80', fabric: 'Dual PD Type-C + USB-A QC3.0' },
      { name: '10000mAh Magnetic MagSafe Wireless Power Bank', price: 2499, cost: 1200, img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80', fabric: '15W Qi Wireless + Strong Magnets' }
    ]
  },
  // 4. Home & Kitchen Gadgets (80 distinct items)
  {
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Gadgets',
    subcategorySlug: 'smart-appliances',
    brands: KITCHEN_BRANDS,
    items: [
      { name: '2L Stainless Steel Electric Meat & Vegetable Food Chopper', price: 2699, cost: 1300, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Copper Motor + 4 S/S Blades' },
      { name: 'Rechargeable USB 6-Blade Portable Mini Juicer Blender', price: 1499, cost: 700, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80', fabric: 'BPA-Free Tritan Bottle' },
      { name: 'Silicone Reusable Non-Stick Air Fryer Liners (Pack of 2)', price: 899, cost: 380, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade Heat Resistant Silicone' },
      { name: '360 Rotating Multi-Tier Kitchen Spice & Condiment Rack', price: 1899, cost: 900, img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80', fabric: 'Rust-Proof Carbon Steel' },
      { name: 'Automatic Electric Cordless Kettle 2.0L Fast Boil', price: 1799, cost: 850, img: 'https://images.unsplash.com/photo-1594213114663-d94db9b17126?w=600&auto=format&fit=crop&q=80', fabric: 'Stainless Steel 304 Interior' },
      { name: 'Multifunctional 9-in-1 Vegetable Slicer Cutter with Drain Basket', price: 1399, cost: 650, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade ABS + S/S Blades' }
    ]
  },
  // 5. Beauty, Health & Personal Care (60 distinct items)
  {
    categorySlug: 'beauty-personal-care',
    categoryName: 'Beauty, Health & Personal Care',
    subcategorySlug: 'shavers-trimmers',
    brands: BEAUTY_BRANDS,
    items: [
      { name: 'Vintage T9 Professional Cordless Metal Hair & Beard Trimmer', price: 1299, cost: 580, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80', fabric: 'Gold Engraved Metal Body + T-Blade' },
      { name: '5-in-1 Hot Air Styler Hair Dryer & Volumizer Brush', price: 2999, cost: 1450, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80', fabric: 'Negative Ion Ceramic Coating' },
      { name: 'Vitamin C Brightening Face Serum with Hyaluronic Acid 30ml', price: 899, cost: 380, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80', fabric: 'Organic Anti-Aging Formula' },
      { name: '12-Shade Velvet Matte Waterproof Long-Lasting Lipstick Set', price: 1199, cost: 500, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80', fabric: 'Non-Drying Matte Liquid Formula' },
      { name: 'Electric Facial Pore Vacuum Blackhead Remover with 5 Probes', price: 1499, cost: 680, img: 'https://images.unsplash.com/photo-1512290900672-1f02e6a39e80?w=600&auto=format&fit=crop&q=80', fabric: 'Rechargeable Suction Tool' }
    ]
  },
  // 6. Men's Fashion & Leather (50 distinct items)
  {
    categorySlug: 'mens-fashion',
    categoryName: "Men's Fashion & Accessories",
    subcategorySlug: 'leather-wallets',
    brands: MENS_BRANDS,
    items: [
      { name: 'Genuine Cow Leather Bifold Wallet with RFID Blocking', price: 1299, cost: 580, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80', fabric: '100% Full Grain Leather' },
      { name: 'Automatic Ratchet Buckle Leather Belt for Men', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', fabric: 'Top Layer Leather + Zinc Alloy Buckle' },
      { name: 'Stainless Steel Quartz Chronograph Water Resistant Watch', price: 2799, cost: 1350, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', fabric: 'Hardlex Glass + Steel Mesh Strap' },
      { name: '5-in-1 Luxury Men Gift Set (Watch + Belt + Wallet + Pen + Keychain)', price: 3499, cost: 1700, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', fabric: 'Gift Box Packaging' }
    ]
  },
  // 7. Automotive & Bike Gear (30 distinct items)
  {
    categorySlug: 'automotive-accessories',
    categoryName: 'Automotive & Bike Gear',
    subcategorySlug: 'car-dashcams',
    brands: AUTO_BRANDS,
    items: [
      { name: '4K Ultra HD Dual Lens Front & Rear Car Dash Camera with Night Vision', price: 4499, cost: 2200, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80', fabric: 'Sony Sensor + 170 Wide Angle' },
      { name: '15W Fast Qi Auto-Clamping Smart Car Phone Mount', price: 1699, cost: 780, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80', fabric: 'Infrared Sensor + AC Vent Mount' },
      { name: 'High Power 120W Cordless Handheld Car Vacuum Cleaner', price: 1899, cost: 890, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80', fabric: 'HEPA Washable Filter' }
    ]
  },
  // 8. Kids, Toys & Baby (30 distinct items)
  {
    categorySlug: 'kids-toys-baby',
    categoryName: 'Kids, Toys & Baby',
    subcategorySlug: 'rc-cars-drones',
    brands: KIDS_BRANDS,
    items: [
      { name: '8.5-Inch LCD Writing Tablet & Doodle Drawing Board for Kids', price: 699, cost: 280, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80', fabric: 'Eye-Protection LCD Screen' },
      { name: '4WD 2.4GHz High Speed RC Monster Rock Crawler Stunt Car', price: 2799, cost: 1350, img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80', fabric: 'Shockproof Off-Road Suspension' },
      { name: '4-in-1 Ergonomic Breathable Baby Carrier with Hip Seat', price: 2399, cost: 1150, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80', fabric: '100% Soft Breathable Cotton' }
    ]
  }
];

// Color & Attribute sets to create 100% unique variations
const EDITIONS = [
  'Pro Edition', 'Special Festive Edition', 'Limited Master Series', 'Classic Series',
  'Luxury Collection', 'Standard Edition', 'Elite Series', 'Summer Special', 'Winter Edition',
  'Royal Collection', 'Signature Series', 'Exclusive Edition', 'Premium Pack', 'Export Quality'
];

const COLORS = [
  'Midnight Black', 'Pearl White', 'Rose Gold', 'Royal Blue', 'Emerald Green',
  'Crimson Maroon', 'Pastel Pink', 'Champagne Gold', 'Space Grey', 'Mustard Yellow',
  'Deep Olive', 'Navy Blue', 'Silver Metallic', 'Mocha Brown', 'Teal Blue'
];

const CITIES = ['Lahore Hub', 'Karachi Hub', 'Faisalabad Direct', 'Sialkot Sourcing', 'Rawalpindi Hub', 'Gujranwala Depot'];

const products = [];
const seenTitles = new Set();
const seenSlugs = new Set();

let idCounter = 1;
const TARGET_COUNT = 500;

while (products.length < TARGET_COUNT) {
  for (const bp of BLUEPRINTS) {
    if (products.length >= TARGET_COUNT) break;

    for (const item of bp.items) {
      if (products.length >= TARGET_COUNT) break;

      const brand = bp.brands[(idCounter - 1) % bp.brands.length];
      const edition = EDITIONS[(idCounter - 1) % EDITIONS.length];
      const color = COLORS[(idCounter - 1) % COLORS.length];
      const city = CITIES[(idCounter - 1) % CITIES.length];

      // Formulate unique title
      const uniqueTitle = `${brand} ${item.name} (${edition} - ${color})`;

      if (seenTitles.has(uniqueTitle)) {
        continue;
      }
      seenTitles.add(uniqueTitle);

      const cleanSlug = uniqueTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') + `-${idCounter}`;

      seenSlugs.add(cleanSlug);

      const priceVariation = ((idCounter % 7) - 3) * 50;
      const basePrice = Math.max(499, item.price + priceVariation);
      const comparePrice = Math.round(basePrice * 1.35 / 50) * 50;
      const supplierCost = Math.round(item.cost + priceVariation * 0.5);

      const product = {
        id: `mkz-prod-${idCounter}`,
        sku: `MKZ-${bp.categorySlug.substring(0, 3).toUpperCase()}-${String(idCounter).padStart(4, '0')}`,
        title: uniqueTitle,
        slug: cleanSlug,
        brand: brand,
        categorySlug: bp.categorySlug,
        subcategorySlug: bp.subcategorySlug,
        categoryName: bp.categoryName,
        price: basePrice,
        compareAtPrice: comparePrice,
        supplierCost: supplierCost,
        stock: 45 + (idCounter % 150),
        ordersCount: 120 + (idCounter * 7) % 2400,
        rating: Number((4.6 + ((idCounter % 5) * 0.08)).toFixed(1)),
        reviewsCount: 35 + (idCounter * 3) % 450,
        freeShipping: basePrice >= 2500 || idCounter % 3 === 0,
        isFlashDeal: idCounter % 4 === 0,
        isFeatured: idCounter % 5 === 0,
        badge: idCounter % 3 === 0 ? 'Markaz Choice' : 'Wholesale Direct',
        supplier: {
          name: `${brand} Verified Supplier`,
          city: city,
          dispatchHours: 24,
          rating: 4.9,
          trustScore: '99% Positive'
        },
        images: [
          item.img,
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
        ],
        variants: [
          {
            id: `v-${idCounter}-1`,
            name: `${color} / Standard`,
            color: color,
            size: 'Standard',
            price: basePrice,
            stock: 35,
            sku: `MKZ-V-${idCounter}-1`
          },
          {
            id: `v-${idCounter}-2`,
            name: `${color} / Pro Luxury Edition`,
            color: color,
            size: 'Pro Edition',
            price: basePrice + 350,
            stock: 35,
            sku: `MKZ-V-${idCounter}-2`
          }
        ],
        specifications: {
          'Brand': brand,
          'Material/Fabric': item.fabric,
          'Edition': edition,
          'Sourcing Hub': city,
          'Warranty': '7-Day Return & Replacement Warranty',
          'Payment': 'Cash on Delivery (COD) Nationwide',
          'Delivery': '24-48 Hours via TCS / Trax Express'
        },
        description: `Authentic wholesale ${uniqueTitle} sourced directly from verified Markaz suppliers. Features ${item.fabric} with guaranteed export quality, 24-hour dispatch, and 7-day buyer return warranty with Cash on Delivery nationwide across Pakistan.`
      };

      products.push(product);
      idCounter++;
    }
  }
}

// Write to both frontend and server data directories
const outputPath1 = path.join(__dirname, '../src/data/markaz-products.js');
const outputPath2 = path.join(__dirname, '../server/data/seed-products.js');
const fileContent = `// Auto-generated 500 Completely Unique Markaz Dropshipping Products Catalogue
export const MARKAZ_PRODUCTS_500 = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(outputPath1, fileContent, 'utf-8');
fs.writeFileSync(outputPath2, fileContent, 'utf-8');

console.log(`=================================================`);
console.log(`✅ Generated ${products.length} 100% UNIQUE Markaz products!`);
console.log(`🚫 Zero Duplicate Titles: ${seenTitles.size === products.length}`);
console.log(`🚫 Zero Duplicate Slugs: ${seenSlugs.size === products.length}`);
console.log(`📁 Saved to: ${outputPath1}`);
console.log(`📁 Saved to: ${outputPath2}`);
console.log(`=================================================`);
