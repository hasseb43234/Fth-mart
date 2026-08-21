import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 6000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });

    req.on('timeout', () => {
      req.destroy();
      resolve('');
    });

    req.on('error', () => resolve(''));
  });
}

// 33 Target Category Queries on Markaz
const SEARCH_TARGETS = [
  { slug: 'womens-unstitched', queries: ['Women\'s Unstitched', 'Lawn suits', '3-Piece Lawn', 'Embroidered Lawn', 'Summer Lawn', 'Swiss Lawn', 'Chickenkari', 'Khaddar Suit'] },
  { slug: 'womens-stitched', queries: ['Women\'s Stitched', 'Stitched Kurti', 'Ready to wear', 'Pret', 'Stitched 2pc', 'Embroidered Kurti', 'Co Ord Set', 'Frock Suit'] },
  { slug: 'womens-luxury-formal', queries: ['Bridal Maxi', 'Organza Maxi', 'Velvet Shawl', 'Party Wear Dress', 'Chiffon Formal', 'Lehenga', 'Peshwas', 'Net Maxi'] },
  { slug: 'abayas-hijabs', queries: ['Abaya', 'Hijab', 'Kaftan', 'Dubai Abaya', 'Georgette Hijab', 'Chiffon Stole', 'Butterfly Abaya', 'Modest Wear'] },
  { slug: 'womens-handbags', queries: ['Women\'s Handbags', 'Tote Bag', 'Clutch', 'Shoulder Bag', 'Crossbody Bag', 'Bridal Clutch', '3in1 Bag', 'Backpack Women'] },
  { slug: 'womens-footwear', queries: ['Khussa', 'Kolhapuri', 'Heels', 'Women Shoes', 'Pumps', 'Flats', 'Bridal Khussa', 'Slides Women'] },
  { slug: 'jewellery', queries: ['Jewellery', 'Bridal Set', 'Kundan Set', 'Jhumka', 'Bangles', 'Choker Set', 'Earrings', 'Zircon Necklace'] },
  { slug: 'mens-unstitched', queries: ['Men\'s Unstitched', 'Boski', 'Men Cotton Fabric', 'Latha', 'Karandi Men', 'Wash and Wear Men', 'Pasha Fabric', 'Giza Cotton'] },
  { slug: 'mens-stitched', queries: ['Men\'s Stitched', 'Men Kurta', 'Shalwar Kameez', 'Waistcoat', 'Men Stitched Suit', 'Kurta Pajama', 'Prince Coat', 'Black Kurta'] },
  { slug: 'mens-western', queries: ['Polo Shirt', 'Men T-Shirt', 'Tracksuit', 'Men Jeans', 'Hoodie Men', 'Gym Shirt', 'Denim Jeans', 'Shorts Men'] },
  { slug: 'mens-footwear', queries: ['Peshawari Chappal', 'Loafers', 'Men Sneakers', 'Oxford Shoes', 'Kaptaan Chappal', 'Casual Shoes Men', 'Sandals Men', 'Formal Shoes'] },
  { slug: 'mens-wallets-belts', queries: ['Leather Wallet', 'Men Belt', 'Cardholder', 'Gift Box Men', 'RFID Wallet', 'Ratchet Belt', 'Executive Gift Set', 'Bifold Wallet'] },
  { slug: 'watches', queries: ['Watches', 'Men Watch', 'Chronograph Watch', 'Women Watch', 'Couple Watch', 'Quartz Watch', 'Automatic Watch', 'Steel Watch'] },
  { slug: 'smart-watches', queries: ['Smart Watch', 'Ultra 2 Smartwatch', 'T800 Ultra', 'Fitness Band', 'AMOLED Watch', 'Series 9 Watch', 'HK9 Ultra', 'Smartwatch Calling'] },
  { slug: 'wireless-audio', queries: ['Wireless Earbuds', 'Air31 Earbuds', 'M10 Earbuds', 'Bluetooth Speaker', 'Gaming Earbuds', 'ANC Earbuds', 'Headphones', 'Neckband'] },
  { slug: 'mobile-accessories', queries: ['Power Bank', 'Fast Charger', 'Type-C Cable', 'Phone Mount', 'GaN Charger', 'Selfie Stick', 'MagSafe Charger', 'Tripod Stand'] },
  { slug: 'home-appliances', queries: ['Electric Chopper', 'Portable Blender', 'Electric Kettle', 'Hand Blender', 'Steam Iron', 'Meat Chopper', 'Juicer Blender', 'Food Processor'] },
  { slug: 'kitchen-tools', queries: ['Air Fryer Liner', 'Spice Rack', 'Vegetable Cutter', 'Non Stick Pan', 'Silicone Pot', 'Knife Set', 'Kitchen Organizer', 'Vacuum Sealer'] },
  { slug: 'bedding-linen', queries: ['Bed Sheets', 'Bedsheet King', 'Comforter', 'Mattress Protector', 'Fitted Sheet', 'Pillow Memory Foam', 'Fleece Blanket', 'Cotton Bedsheet'] },
  { slug: 'home-decor', queries: ['Sunset Lamp', 'LED Strip Light', 'Wall Art', 'Wall Clock', '3D Acrylic Art', 'RGB Light', 'Ceramic Vase', 'Table Lamp'] },
  { slug: 'storage-organizers', queries: ['Storage Box', 'Shoe Rack', 'Shower Caddy', 'Makeup Organizer', 'Clothes Box 66L', 'Bathroom Shelf', 'Rotating Makeup', 'Wardrobe Organizer'] },
  { slug: 'personal-care-trimmers', queries: ['Vintage T9 Trimmer', 'Hair Trimmer', 'Electric Shaver', 'Hair Styler', '5in1 Hair Dryer', 'Beard Trimmer', 'Hair Straightener', 'Nose Trimmer'] },
  { slug: 'skincare-serums', queries: ['Face Serum', 'Vitamin C Serum', 'Sunblock', 'Jade Roller', '24K Gold Serum', 'Face Wash', 'Blackhead Remover', 'Hyaluronic Acid'] },
  { slug: 'makeup-cosmetics', queries: ['Cosmetics', 'Matte Lipstick', 'Eyeshadow Palette', 'Makeup Brushes', 'Foundation', 'Eyeliner', 'Blush Palette', 'Lip Gloss Set'] },
  { slug: 'fragrances-perfumes', queries: ['Perfumes', 'Men Perfume', 'Attar', 'Body Mist', 'Oudh Attar', 'Women Perfume', 'EDP Spray', 'Pocket Perfume'] },
  { slug: 'automotive-accessories', queries: ['Dash Cam', 'Car Vacuum', 'Car Mount', 'Tyre Inflator', '4K Dash Cam', 'Car Charger', 'Car Air Compressor', 'Car Seat Cushion'] },
  { slug: 'bike-gear', queries: ['Bike Cover', 'Riding Gloves', 'Bike LED Light', 'Helmet', 'Motorcycle Cover', 'Disc Brake Lock', 'Thermal Gloves', 'Bike Phone Holder'] },
  { slug: 'kids-baby-clothing', queries: ['Kids Clothing', 'Baby Romper', 'Girls Frock', 'Boys Kurta', 'Baby Suit', 'Kids Velvet Suit', 'Baba Suit', 'Newborn Gift Set'] },
  { slug: 'toys-rc-vehicles', queries: ['RC Car', 'Drone', 'LCD Writing Tablet', 'Dancing Cactus', 'Monster Truck', 'UFO Drone', 'Magnetic Tiles', 'Plush Toy'] },
  { slug: 'baby-care-gear', queries: ['Baby Carrier', 'Baby Nail Trimmer', 'Teether', 'Diaper Bag', 'Baby Feeder', 'Hip Seat Carrier', 'Baby Pillow', 'Pacifier'] },
  { slug: 'sports-gym-equipment', queries: ['Resistance Bands', 'Water Jug 2L', 'Hand Grip', 'Ab Roller', 'Workout Bands 150lbs', 'Jump Rope', 'Yoga Mat', 'Shaker Bottle'] },
  { slug: 'stationery-office', queries: ['Stationery', 'Thermal Printer', 'Art Markers', 'Notebook', 'Pocket Printer', 'Alcohol Markers', 'Desk Organizer', 'Executive Diary'] },
  { slug: 'health-wellness', queries: ['Massage Gun', 'Blood Pressure Monitor', 'Posture Corrector', 'Oximeter', 'Fascia Gun', 'Digital BP Machine', 'Heating Bag', 'Pulse Monitor'] }
];

async function scrapeCategory(target) {
  const cdnSet = new Set();

  for (const q of target.queries) {
    const urls = [
      `https://www.markaz.app/shop/home-page/${encodeURIComponent(q)}`,
      `https://www.markaz.app/shop/search?q=${encodeURIComponent(q)}`
    ];

    const results = await Promise.all(urls.map(u => fetchUrl(u)));
    for (const html of results) {
      if (!html) continue;
      const matches = html.match(/https:\/\/static\.markaz\.app\/pakistan\/thumbnails\/products\/[^"'\s\\]+\.(?:jpg|jpeg|png|webp)/g) || [];
      matches.forEach(img => cdnSet.add(img));
    }
  }

  return { slug: target.slug, images: Array.from(cdnSet) };
}

async function run() {
  console.log(`Starting parallel scrape for ${SEARCH_TARGETS.length} categories on Markaz...`);
  const results = await Promise.all(SEARCH_TARGETS.map(target => scrapeCategory(target)));

  const cdnPoolBySlug = {};
  let totalMarkazImages = 0;

  for (const r of results) {
    cdnPoolBySlug[r.slug] = r.images;
    totalMarkazImages += r.images.length;
    console.log(`[${r.slug}]: ${r.images.length} Markaz CDN images found`);
  }

  console.log(`\n🎉 Total Authentic Markaz CDN Images Collected: ${totalMarkazImages}`);
  const outputPath = path.join(__dirname, 'markaz-scraped-images.json');
  fs.writeFileSync(outputPath, JSON.stringify(cdnPoolBySlug, null, 2), 'utf-8');
  console.log(`Saved to ${outputPath}`);
}

run();
