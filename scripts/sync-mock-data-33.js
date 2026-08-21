import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { MARKAZ_33_CATEGORIES } from './generate-markaz-33-categories.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesFormatted = MARKAZ_33_CATEGORIES.map(c => ({
  id: c.id,
  slug: c.slug,
  name: c.name,
  urduName: c.urduName,
  icon: c.icon,
  image: c.image,
  itemCount: 50,
  featured: c.featured,
  subcategories: c.subcategories
}));

// 1. Update src/data/mock-data.js
const mockDataPath = path.join(__dirname, '../src/data/mock-data.js');
const mockDataContent = `// Mock Data for FTH Mart Pakistani Marketplace (33 Markaz Categories)
import { MARKAZ_PRODUCTS_500 } from './markaz-products.js';

export const INITIAL_CATEGORIES = ${JSON.stringify(categoriesFormatted, null, 2)};

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
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80",
    buttonText: "Shop All 33 Categories",
    buttonLink: "/categories"
  }
];
`;

fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');

// 2. Update server/data/seed-data.js
const serverDataPath = path.join(__dirname, '../server/data/seed-data.js');
const serverDataContent = `// Standalone 33 categories & configuration for backend server
export const INITIAL_CATEGORIES = ${JSON.stringify(categoriesFormatted, null, 2)};

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

fs.writeFileSync(serverDataPath, serverDataContent, 'utf-8');

console.log('✅ Successfully updated mock-data.js and seed-data.js with 33 Markaz categories!');
