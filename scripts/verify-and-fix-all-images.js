import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const markazCatalogPath = path.join(__dirname, '../src/data/markaz-products.js');
const mockDataPath = path.join(__dirname, '../src/data/mock-data.js');
const serverSeedProductsPath = path.join(__dirname, '../server/data/seed-products.js');
const serverSeedDataPath = path.join(__dirname, '../server/data/seed-data.js');

// Load Markaz products and categories
import { MARKAZ_PRODUCTS_500 } from '../src/data/markaz-products.js';
import { INITIAL_CATEGORIES } from '../src/data/mock-data.js';

// Reliable verified high-resolution product photography fallbacks for any missing/broken image
const CATEGORY_FALLBACK_IMAGES = {
  'womens-unstitched': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
  'womens-stitched': 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80',
  'womens-luxury-formal': 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80',
  'makeup-cosmetics': 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80',
  'skincare-serums': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
  'personal-care-trimmers': 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80',
  'jewellery': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80',
  'womens-handbags': 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80',
  'womens-footwear': 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80',
  'fragrances-perfumes': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80',
  'mens-unstitched': 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
  'mens-stitched': 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&auto=format&fit=crop&q=80',
  'watches': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
  'mens-wallets-belts': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80',
  'mobile-accessories': 'https://images.unsplash.com/photo-1609592424307-e8982c5fbe60?w=600&auto=format&fit=crop&q=80',
  'wireless-audio': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80',
  'smart-watches': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80',
  'kitchen-tools': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80',
  'home-appliances': 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80',
  'bedding-linen': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80',
  'home-decor': 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80',
  'storage-organizers': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80',
  'home-linen': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
  'automotive-accessories': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80',
  'bike-gear': 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80',
  'kids-baby-clothing': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80',
  'kids-accessories': 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=600&auto=format&fit=crop&q=80',
  'baby-care-gear': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80',
  'stationery-office': 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80',
  'islamic-accessories': 'https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&auto=format&fit=crop&q=80',
  'undergarments': 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
  'mens-western': 'https://images.unsplash.com/photo-1520975916090-3105956dac38?w=600&auto=format&fit=crop&q=80',
  'branded-collections': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&auto=format&fit=crop&q=80'
};

async function testUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return new Promise((resolve) => {
    try {
      const req = https.request(url, {
        method: 'HEAD',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 4000
      }, (res) => {
        resolve(res.statusCode === 200 || res.statusCode === 301 || res.statusCode === 302);
      });
      req.on('timeout', () => { req.destroy(); resolve(false); });
      req.on('error', () => resolve(false));
      req.end();
    } catch (e) {
      resolve(false);
    }
  });
}

async function run() {
  console.log('Testing and verifying all category hero images...');
  const updatedCategories = [];

  for (const cat of INITIAL_CATEGORIES) {
    let hero = cat.image;
    const ok = await testUrl(hero);
    if (!ok || !hero) {
      hero = CATEGORY_FALLBACK_IMAGES[cat.slug] || CATEGORY_FALLBACK_IMAGES['womens-unstitched'];
      console.log(`[Category Fix] ${cat.name} -> replaced with reliable high-res image`);
    } else {
      console.log(`[Category OK] ${cat.name} -> 200 OK`);
    }
    updatedCategories.push({
      ...cat,
      image: hero
    });
  }

  // Update Category mock-data and server seed-data
  const mockDataContent = `// Mock Data for FTH Mart Pakistani Marketplace (33 Markaz Categories)
import { MARKAZ_PRODUCTS_500 } from './markaz-products.js';

export const INITIAL_CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};

export const INITIAL_PRODUCTS = MARKAZ_PRODUCTS_500;

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

export const INITIAL_ANNOUNCEMENT = '🇵🇰 Welcome to FTH Mart — Pakistan\\'s Premier Dropshipping Marketplace • Free Delivery on orders above Rs 2,000!';

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Discover Premium Pakistani Dropshipping",
    subtitle: "Direct Factory Wholesale Sourcing & Fast Delivery Nationwide across 33 Categories",
    badge: "Verified Markaz Sourcing",
    image: "${updatedCategories[0]?.image}",
    buttonText: "Shop All 33 Categories",
    buttonLink: "/categories"
  }
];
`;
  fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');

  const serverDataContent = `// Standalone 33 categories & configuration for backend server
export const INITIAL_CATEGORIES = ${JSON.stringify(updatedCategories, null, 2)};

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
`;
  fs.writeFileSync(serverSeedDataPath, serverDataContent, 'utf-8');

  console.log('✅ Finished verifying and securing all category images!');
}

run();
