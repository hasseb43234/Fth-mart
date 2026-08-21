import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKAZ_CATEGORY_PATHS = [
  { slug: 'womens-unstitched', paths: ["/shop/home-page/Women's%20Unstitched", "/shop/search?q=Lawn%20suits"] },
  { slug: 'womens-stitched', paths: ["/shop/home-page/Women's%20Stitched", "/shop/search?q=Stitched%20Kurti"] },
  { slug: 'womens-luxury-formal', paths: ["/shop/home-page/Festive%20Collection", "/shop/search?q=Bridal%20Maxi"] },
  { slug: 'makeup-cosmetics', paths: ["/shop/home-page/Cosmetics", "/shop/search?q=Lipstick"] },
  { slug: 'skincare-serums', paths: ["/shop/home-page/Cosmetics/Skin%20Care", "/shop/search?q=Face%20Serum"] },
  { slug: 'personal-care-trimmers', paths: ["/shop/home-page/Cosmetics/Shavers%20%26%20Trimmers", "/shop/search?q=Trimmer"] },
  { slug: 'jewellery', paths: ["/shop/home-page/Jewellery", "/shop/search?q=Jewellery%20Set"] },
  { slug: 'womens-handbags', paths: ["/shop/home-page/Bags", "/shop/search?q=Handbags"] },
  { slug: 'womens-footwear', paths: ["/shop/home-page/Shoes", "/shop/search?q=Khussa"] },
  { slug: 'fragrances-perfumes', paths: ["/shop/home-page/Perfumes", "/shop/search?q=Perfume"] },
  { slug: 'mens-unstitched', paths: ["/shop/home-page/Men's%20Unstitched", "/shop/search?q=Boski"] },
  { slug: 'mens-stitched', paths: ["/shop/home-page/Men's%20Stitched", "/shop/search?q=Men%20Kurta"] },
  { slug: 'watches', paths: ["/shop/home-page/Fashion%20Accessories/Men%E2%80%99s%20Watches", "/shop/search?q=Watches"] },
  { slug: 'mens-wallets-belts', paths: ["/shop/home-page/Fashion%20Accessories/Men%E2%80%99s%20Wallets", "/shop/search?q=Leather%20Wallet"] },
  { slug: 'mobile-accessories', paths: ["/shop/home-page/Electronic%20Accessories", "/shop/search?q=Power%20Bank"] },
  { slug: 'wireless-audio', paths: ["/shop/home-page/Electronic%20Accessories/Headphones%20%26%20Headsets", "/shop/search?q=Wireless%20Earbuds"] },
  { slug: 'smart-watches', paths: ["/shop/home-page/Electronic%20Accessories/Smart%20Watches", "/shop/search?q=Smart%20Watch"] },
  { slug: 'kitchen-tools', paths: ["/shop/home-page/Kitchenware", "/shop/search?q=Air%20Fryer"] },
  { slug: 'home-appliances', paths: ["/shop/home-page/Kitchenware/Kitchen%20Appliances", "/shop/search?q=Electric%20Chopper"] },
  { slug: 'bedding-linen', paths: ["/shop/home-page/Bedding", "/shop/search?q=Bedsheet"] },
  { slug: 'home-decor', paths: ["/shop/home-page/Home%20Decor", "/shop/search?q=Sunset%20Lamp"] },
  { slug: 'storage-organizers', paths: ["/shop/home-page/Home%20Essentials", "/shop/search?q=Storage%20Box"] },
  { slug: 'home-linen', paths: ["/shop/home-page/Home%20Linen", "/shop/search?q=Towel"] },
  { slug: 'automotive-accessories', paths: ["/shop/home-page/Auto%20%26%20Bike%20Accessories/Car%20Accessories", "/shop/search?q=Dash%20Cam"] },
  { slug: 'bike-gear', paths: ["/shop/home-page/Auto%20%26%20Bike%20Accessories/Bike%20Accessories", "/shop/search?q=Bike%20Cover"] },
  { slug: 'kids-baby-clothing', paths: ["/shop/home-page/Kids%20Clothing", "/shop/search?q=Baby%20Romper"] },
  { slug: 'kids-accessories', paths: ["/shop/home-page/Kids%20Accessories", "/shop/search?q=Kids%20Shoes"] },
  { slug: 'baby-care-gear', paths: ["/shop/home-page/Mother%20%26%20Baby", "/shop/search?q=Baby%20Carrier"] },
  { slug: 'toys-rc-vehicles', paths: ["/shop/search?q=RC%20Car", "/shop/search?q=Toys"] },
  { slug: 'sports-gym-equipment', paths: ["/shop/search?q=Resistance%20Bands", "/shop/search?q=Water%20Bottle"] },
  { slug: 'stationery-office', paths: ["/shop/home-page/Books%20%26%20Stationery", "/shop/search?q=Printer"] },
  { slug: 'islamic-accessories', paths: ["/shop/home-page/Islamic%20Accessories", "/shop/search?q=Prayer%20Mat"] },
  { slug: 'health-wellness', paths: ["/shop/search?q=Massage%20Gun", "/shop/search?q=Blood%20Pressure"] }
];

function fetchHtml(pathname) {
  return new Promise((resolve) => {
    const url = `https://www.markaz.app${pathname}`;
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      timeout: 8000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('timeout', () => { req.destroy(); resolve(''); });
    req.on('error', () => resolve(''));
  });
}

async function run() {
  console.log(`Extracting authentic Markaz CDN images across all 33 categories...`);
  const results = {};
  let totalImgs = 0;

  for (let i = 0; i < MARKAZ_CATEGORY_PATHS.length; i++) {
    const item = MARKAZ_CATEGORY_PATHS[i];
    const cdnSet = new Set();

    for (const p of item.paths) {
      const html = await fetchHtml(p);
      const regex = /https:\/\/static\.markaz\.app\/pakistan\/thumbnails\/products\/[^"'\s\\]+\.(?:jpg|jpeg|png|webp)/g;
      const matches = html.match(regex) || [];
      matches.forEach(img => cdnSet.add(img));
    }

    const uniqueList = Array.from(cdnSet);
    results[item.slug] = uniqueList;
    totalImgs += uniqueList.length;
    console.log(`[${i + 1}/33] ${item.slug}: ${uniqueList.length} authentic Markaz CDN images found`);
  }

  console.log(`\n========================================`);
  console.log(`Total Authentic Markaz CDN Images Collected: ${totalImgs}`);
  console.log(`========================================`);

  const outPath = path.join(__dirname, 'markaz-authentic-cdn-images.json');
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Saved authentic Markaz image map to ${outPath}`);
}

run();
