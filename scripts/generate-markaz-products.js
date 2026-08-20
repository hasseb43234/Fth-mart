import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category configurations with templates for generating 500 realistic Markaz dropshipping products
const categoryTemplates = [
  {
    categorySlug: 'electronics',
    subcategorySlug: 'wireless-earbuds',
    categoryName: 'Electronics & Smart Tech',
    brands: ['SoundPulse', 'Audionic', 'Faster', 'Ronin', 'Zero Lifestyle', 'Dany', 'M10 Pro', 'Joyroom'],
    items: [
      { name: 'TWS Wireless Earbuds with LED Battery Display', priceRange: [1499, 2899], costRatio: 0.55, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80' },
      { name: 'Active Noise Cancelling (ANC) Pro Earbuds', priceRange: [2999, 5499], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=80' },
      { name: 'Gaming Low Latency 45ms Earbuds with RGB Light', priceRange: [1899, 3299], costRatio: 0.54, img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80' },
      { name: 'Transparent Cyberpunk Style Wireless Earbuds', priceRange: [1799, 2999], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80' },
      { name: 'Neckband Wireless Bluetooth Earphones with Magnetic Buds', priceRange: [1299, 2499], costRatio: 0.56, img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'electronics',
    subcategorySlug: 'smart-watches',
    categoryName: 'Electronics & Smart Tech',
    brands: ['NovaFit', 'Yolo', 'Dany', 'Zero Lifestyle', 'Kieslect', 'Hoco', 'Mibro', 'HK9 Ultra'],
    items: [
      { name: 'Ultra 2 Smartwatch with AMOLED Display & Bluetooth Calling', priceRange: [3899, 6999], costRatio: 0.53, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80' },
      { name: 'Fit Pro Waterproof Fitness Tracker with Heart Rate Monitor', priceRange: [1999, 3499], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80' },
      { name: 'Series 9 Smartwatch with 7 Interchangeable Straps & Case', priceRange: [3299, 4999], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80' },
      { name: 'Military Rugged Smart Watch with Compass & Flashlight', priceRange: [4299, 7499], costRatio: 0.55, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'electronics',
    subcategorySlug: 'power-banks',
    categoryName: 'Electronics & Smart Tech',
    brands: ['Faster', 'Ronin', 'Joyroom', 'Baseus', 'Anker', 'Dany', 'Remax'],
    items: [
      { name: '20000mAh 65W Fast Charging Power Bank with Digital Display', priceRange: [3499, 5899], costRatio: 0.58, img: 'https://images.unsplash.com/photo-1609592424307-e8982c5fbe60?w=600&auto=format&fit=crop&q=80' },
      { name: '10000mAh Magnetic MagSafe Wireless Power Bank', priceRange: [2499, 3999], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80' },
      { name: '30000mAh Heavy Duty Power Station with Dual Torch & 4 Cables', priceRange: [4899, 7999], costRatio: 0.60, img: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=600&auto=format&fit=crop&q=80' },
      { name: '65W GaN Fast Charger with 3 Ports USB-C & USB-A', priceRange: [2199, 3499], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'home-kitchen',
    subcategorySlug: 'smart-appliances',
    categoryName: 'Home & Kitchen Gadgets',
    brands: ['KitchenChef', 'SilverCrest', 'Anex', 'Sogo', 'Geepas', 'Westpoint', 'Sonifer'],
    items: [
      { name: '2L Stainless Steel Electric Meat & Vegetable Food Chopper', priceRange: [2499, 3899], costRatio: 0.55, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80' },
      { name: 'Portable Rechargeable USB Mini Juicer & Smoothie Blender', priceRange: [1299, 2199], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80' },
      { name: 'Electric Kettle 2.0L Cordless Auto Cut Stainless Steel', priceRange: [1699, 2799], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1594213114663-d94db9b17126?w=600&auto=format&fit=crop&q=80' },
      { name: 'Mini Handheld Electric Whisk & Coffee Milk Frother', priceRange: [599, 1199], costRatio: 0.45, img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80' },
      { name: 'Silicone Reusable Air Fryer Pot Liners (Pack of 2)', priceRange: [799, 1499], costRatio: 0.40, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'home-kitchen',
    subcategorySlug: 'storage-organizers',
    categoryName: 'Home & Kitchen Gadgets',
    brands: ['HomeComfort', 'SmartSpace', 'DecoStyle', 'IKEA Replica', 'OrganizePro'],
    items: [
      { name: '360 Rotating Multi-Layer Spice Rack Organizer with Jars', priceRange: [1899, 3299], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80' },
      { name: 'Wall Mounted Self Adhesive Bathroom Shower Caddy (Pack of 2)', priceRange: [899, 1599], costRatio: 0.42, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80' },
      { name: 'Foldable Fabric Wardrobe Clothes Storage Box with Steel Frame', priceRange: [1199, 2199], costRatio: 0.45, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80' },
      { name: 'Cereal Dispenser Wall Mounted Dry Food Storage Container 6-Grid', priceRange: [2499, 3999], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'womens-fashion',
    subcategorySlug: 'stitched-lawn-suits',
    categoryName: "Women's Fashion & Clothing",
    brands: ['Khaadi Replica', 'Gul Ahmed Master Copy', 'Limelight Style', 'Sana Safinaz Copy', 'Alkaram Print', 'Bonanza Copy', 'Zellbury Look'],
    items: [
      { name: '3-Piece Embroidered Chiffon Dupatta Printed Lawn Suit', priceRange: [2499, 4499], costRatio: 0.55, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80' },
      { name: '2-Piece Digital Printed Summer Lawn Kurti with Trousers', priceRange: [1699, 2799], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80' },
      { name: 'Ready-to-Wear Premium Jacquard Stitched 1-Piece Kurti', priceRange: [1299, 2199], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80' },
      { name: 'Heavy Embroidered Organza Party Wear Maxi Dress with Silk Slip', priceRange: [4499, 8999], costRatio: 0.58, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80' },
      { name: 'Velvet Embroidered Shawl with Tassel Borders for Winter/Weddings', priceRange: [2999, 5499], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'womens-fashion',
    subcategorySlug: 'designer-handbags',
    categoryName: "Women's Fashion & Bags",
    brands: ['Charles & Keith Replica', 'Michael Kors Style', 'Aldo Copy', 'UrbanChic', 'Lara Leather', 'Zara Look'],
    items: [
      { name: 'Premium Leather Structured Crossbody Tote Bag with Gold Chain', priceRange: [1899, 3499], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80' },
      { name: '3-Piece Handbag Set (Large Shoulder Bag + Crossbody + Wallet)', priceRange: [2499, 4199], costRatio: 0.54, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80' },
      { name: 'Korean Minimalist Crescent Half-Moon Shoulder Handbag', priceRange: [1499, 2699], costRatio: 0.46, img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80' },
      { name: 'Bridal Velvet Clutch with Pearl & Zircon Rhinestone Embellishments', priceRange: [1999, 3599], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'beauty-personal-care',
    subcategorySlug: 'skincare-cosmetics',
    categoryName: 'Beauty, Health & Care',
    brands: ['Rivaj UK', 'The Ordinary Copy', 'Miss Rose', 'Christine Cosmetics', 'Bioaqua', 'CeraVe Style', 'Dr. Rashel'],
    items: [
      { name: 'Vitamin C + Hyaluronic Acid Brightening Facial Serum 30ml', priceRange: [899, 1699], costRatio: 0.40, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80' },
      { name: 'Matte Liquid Lipstick Set of 12 Waterproof Long Lasting Shades', priceRange: [1199, 2199], costRatio: 0.45, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80' },
      { name: '5-in-1 Hot Air Hair Styler Brush with Blower & Curler Attachments', priceRange: [2899, 4999], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' },
      { name: 'Sunblock Cream SPF 60 PA+++ Non-Greasy Waterproof 100ml', priceRange: [699, 1299], costRatio: 0.38, img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80' },
      { name: 'Professional 24-Piece Makeup Brush Set with Leather Travel Case', priceRange: [1499, 2799], costRatio: 0.46, img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'beauty-personal-care',
    subcategorySlug: 'shavers-trimmers',
    categoryName: 'Beauty, Health & Care',
    brands: ['VGR', 'Kemei', 'Dingling', 'Vintage T9', 'Geepas', 'Braun Look', 'Philips Copy'],
    items: [
      { name: 'Vintage T9 Professional Metal Body Cordless Hair & Beard Trimmer', priceRange: [1199, 2199], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1621607512214-68297480165e?w=600&auto=format&fit=crop&q=80' },
      { name: '5-in-1 Waterproof Electric Rotary Shaver for Men with Grooming Kit', priceRange: [2499, 4199], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&auto=format&fit=crop&q=80' },
      { name: 'Rechargeable Facial Hair Epilator & Eyebrow Precision Trimmer', priceRange: [799, 1499], costRatio: 0.42, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'mens-fashion',
    subcategorySlug: 'leather-wallets',
    categoryName: "Men's Fashion & Accessories",
    brands: ['J. Junaid Jamshed Look', 'UrbanCraft', 'Hub Leather Copy', 'Montblanc Replica', 'Boggi Style', 'Royal Crest'],
    items: [
      { name: 'Genuine Cow Leather RFID Blocking Bi-Fold Wallet in Gift Box', priceRange: [1299, 2499], costRatio: 0.45, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80' },
      { name: 'Men Reversible Automatic Buckle Leather Belt for Formal & Casual', priceRange: [999, 1899], costRatio: 0.44, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80' },
      { name: 'Complete Men Gift Set (Leather Wallet + Belt + Watch + Pen + Keychain)', priceRange: [2799, 4899], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'mens-fashion',
    subcategorySlug: 'mens-luxury-watches',
    categoryName: "Men's Fashion & Accessories",
    brands: ['Curren', 'Naviforce', 'Skmei', 'Poedagar', 'Oupinke', 'Megir', 'Lige'],
    items: [
      { name: 'Stainless Steel Quartz Chronograph Waterproof Watch with Date', priceRange: [2199, 3999], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&auto=format&fit=crop&q=80' },
      { name: 'Luxury Skeleton Automatic Mechanical Watch with Leather Strap', priceRange: [3899, 6999], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80' },
      { name: 'Digital Sports Military Watch 50M Waterproof with Dual Display', priceRange: [1499, 2699], costRatio: 0.46, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'automotive-accessories',
    subcategorySlug: 'car-dashcams',
    categoryName: 'Automotive & Bike Gear',
    brands: ['70mai Style', 'Anytek', 'BlackBox Pro', 'Dany Car', 'Vantrue Copy', 'RoadMaster'],
    items: [
      { name: '4K Ultra HD Dual Lens Front & Rear Car Dash Camera with Night Vision', priceRange: [4499, 7999], costRatio: 0.55, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80' },
      { name: 'Wireless Auto-Clamping Smart Car Mobile Holder with 15W Qi Fast Charger', priceRange: [1699, 2999], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80' },
      { name: 'High Power 120W Portable Handheld Cordless Car Vacuum Cleaner', priceRange: [1899, 3299], costRatio: 0.50, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80' },
      { name: 'Digital Portable Tyre Inflator Air Compressor with Auto Shutoff & LED', priceRange: [3299, 5499], costRatio: 0.54, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80' }
    ]
  },
  {
    categorySlug: 'kids-toys-baby',
    subcategorySlug: 'rc-cars-drones',
    categoryName: 'Kids, Toys & Baby',
    brands: ['SmartBaby', 'ToyLand', 'RC Power', 'PlayLearn', 'KidZone'],
    items: [
      { name: '8.5-Inch LCD Writing Tablet & Drawing Board for Kids', priceRange: [599, 1199], costRatio: 0.40, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80' },
      { name: 'High Speed 4WD 2.4GHz Rock Crawler RC Monster Stunt Car', priceRange: [2499, 4499], costRatio: 0.52, img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80' },
      { name: '4-in-1 Ergonomic Breathable Baby Carrier with Hip Seat', priceRange: [2199, 3899], costRatio: 0.48, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80' },
      { name: 'Interactive Talking Flash Cards for Toddler Early Learning English/Urdu', priceRange: [1199, 2199], costRatio: 0.42, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80' }
    ]
  }
];

// Color variations
const colors = ['Black', 'White', 'Midnight Blue', 'Emerald Green', 'Space Grey', 'Rose Gold', 'Crimson Red', 'Beige Gold'];
const sizes = ['Standard', 'Small (S)', 'Medium (M)', 'Large (L)', 'XL', '2L Capacity', '3L Capacity', 'Pack of 1', 'Pack of 2', 'Pack of 3'];

const totalTarget = 500;
const products = [];

let idCounter = 1;

while (products.length < totalTarget) {
  for (const cat of categoryTemplates) {
    if (products.length >= totalTarget) break;

    for (const item of cat.items) {
      if (products.length >= totalTarget) break;

      const brand = cat.brands[Math.floor(Math.random() * cat.brands.length)];
      const minPrice = item.priceRange[0];
      const maxPrice = item.priceRange[1];
      const step = 50;
      const randomPrice = Math.floor((minPrice + Math.random() * (maxPrice - minPrice)) / step) * step;
      const compareAtPrice = Math.round(randomPrice * (1.2 + Math.random() * 0.3) / 50) * step;
      const supplierCost = Math.round(randomPrice * item.costRatio / 10) * 10;
      
      const isVariant = Math.random() > 0.4;
      const selectedColor = colors[Math.floor(Math.random() * colors.length)];
      const suffix = isVariant ? ` - ${selectedColor}` : '';
      const finalTitle = `${brand} ${item.name}${suffix}`;
      const slug = finalTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${idCounter}`;
      
      const rating = Number((4.5 + Math.random() * 0.5).toFixed(1));
      const reviewsCount = Math.floor(25 + Math.random() * 850);
      const ordersCount = Math.floor(reviewsCount * (2.5 + Math.random() * 3));
      const stock = Math.floor(15 + Math.random() * 240);

      const product = {
        id: `mkz-prod-${idCounter}`,
        sku: `MKZ-${cat.categorySlug.substring(0, 3).toUpperCase()}-${String(idCounter).padStart(4, '0')}`,
        title: finalTitle,
        slug: slug,
        brand: brand,
        categorySlug: cat.categorySlug,
        subcategorySlug: cat.subcategorySlug,
        categoryName: cat.categoryName,
        price: randomPrice,
        compareAtPrice: compareAtPrice,
        supplierCost: supplierCost,
        stock: stock,
        ordersCount: ordersCount,
        rating: rating,
        reviewsCount: reviewsCount,
        freeShipping: randomPrice >= 2500 || Math.random() > 0.6,
        isFlashDeal: Math.random() > 0.75,
        isFeatured: Math.random() > 0.8,
        supplier: {
          name: `${brand} Official Pakistan Hub`,
          city: ['Lahore', 'Karachi', 'Rawalpindi', 'Faisalabad', 'Sialkot', 'Gujranwala'][Math.floor(Math.random() * 6)],
          dispatchHours: 24,
          rating: Number((4.6 + Math.random() * 0.4).toFixed(1)),
          trustScore: '98% Positive'
        },
        images: [
          item.img,
          'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80',
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
        ],
        variants: [
          {
            id: `v-${idCounter}-1`,
            name: 'Standard Edition',
            color: selectedColor,
            size: 'Standard',
            price: randomPrice,
            stock: Math.floor(stock / 2),
            sku: `MKZ-V-${idCounter}-1`
          },
          {
            id: `v-${idCounter}-2`,
            name: 'Pro Edition / Bundle',
            color: colors[(colors.indexOf(selectedColor) + 1) % colors.length],
            size: 'Pro',
            price: randomPrice + 350,
            stock: Math.floor(stock / 2),
            sku: `MKZ-V-${idCounter}-2`
          }
        ],
        specifications: {
          'Brand': brand,
          'Origin': 'Factory Direct / Markaz Verified Supplier',
          'Warranty': '7-Day Return & Replacement Warranty',
          'Payment': 'Cash on Delivery (COD) / Online',
          'Delivery': '2-4 Working Days via TCS / Trax'
        },
        description: `Experience exceptional quality with the ${finalTitle}. Factory-direct wholesale product verified by Markaz & FTH Mart. Tested for durability, certified performance, and backed by a 7-day buyer return warranty with Cash on Delivery nationwide across Pakistan.`
      };

      products.push(product);
      idCounter++;
    }
  }
}

// Generate the output file
const outputPath = path.join(__dirname, '../src/data/markaz-products.js');
const fileContent = `// Auto-generated 500 Markaz Dropshipping Products Catalogue
export const MARKAZ_PRODUCTS_500 = ${JSON.stringify(products, null, 2)};
`;

fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated ${products.length} Markaz products at ${outputPath}`);
