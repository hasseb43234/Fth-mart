import https from 'https';
import fs from 'fs';

const categoriesToFetch = [
  'Cosmetics',
  "Women's Unstitched",
  "Women's Stitched",
  "Kids Clothing",
  "Jewellery",
  "Electronics",
  "Women's Handbags",
  "Shoes",
  "Perfumes",
  "Men's Unstitched",
  "Men's Stitched",
  "Bedding",
  "Home Decor",
  "Kitchen",
  "Auto",
  "Watches",
  "Toys",
  "Sports"
];

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Testing category fetch...');
  for (const cat of categoriesToFetch.slice(0, 3)) {
    const encoded = encodeURIComponent(cat);
    const url = `https://www.markaz.app/shop/home-page/${encoded}`;
    try {
      const html = await fetchUrl(url);
      const markazImages = html.match(/https:\/\/static\.markaz\.app\/pakistan\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi) || [];
      const titles = html.match(/class="[^"]*font-semibold[^"]*"[^>]*>([^<]+)<\//gi) || [];
      console.log(`Category [${cat}]: ${markazImages.length} real Markaz images, ${titles.length} title matches`);
      if (markazImages.length > 0) {
        console.log('Sample image:', markazImages[0]);
      }
    } catch (err) {
      console.error(`Error for [${cat}]:`, err.message);
    }
  }
}

run();
