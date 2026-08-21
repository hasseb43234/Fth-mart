import https from 'https';
import fs from 'fs';

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function dumpRsc() {
  const html = await fetchUrl('https://www.markaz.app/shop/home-page/Electronics');
  fs.writeFileSync('C:/Users/Dell/fth-mart/scripts/markaz-electronics.html', html, 'utf-8');
  
  // Extract all static.markaz.app image URLs
  const regex = /https:\/\/static\.markaz\.app\/pakistan\/thumbnails\/products\/[^"'\s\\]+\.(?:jpg|jpeg|png|webp)/g;
  const matches = html.match(regex) || [];
  const uniqueImages = [...new Set(matches)];
  console.log(`Extracted ${uniqueImages.length} unique Markaz CDN product images from Electronics!`);
  console.log('First 5 images:', uniqueImages.slice(0, 5));
}

dumpRsc();
