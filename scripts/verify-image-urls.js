import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, 'markaz-authentic-cdn-images.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

async function checkUrl(url) {
  return new Promise((resolve) => {
    try {
      const req = https.request(url, { method: 'HEAD', timeout: 5000 }, (res) => {
        resolve({ url, status: res.statusCode });
      });
      req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
      req.on('error', (e) => resolve({ url, status: e.message }));
      req.end();
    } catch (e) {
      resolve({ url, status: e.message });
    }
  });
}

async function verify() {
  console.log('Testing category hero images from scraped JSON...');
  for (const [slug, imgs] of Object.entries(data)) {
    if (imgs && imgs.length > 0) {
      const hero = imgs[0];
      const res = await checkUrl(hero);
      console.log(`[${slug}] ${res.status}: ${hero.substring(0, 80)}...`);
    } else {
      console.log(`[${slug}] NO IMAGES`);
    }
  }
}

verify();
