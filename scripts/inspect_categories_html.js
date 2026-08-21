import fs from 'fs';

const html = fs.readFileSync('C:/Users/Dell/.gemini/antigravity/brain/6ce75b99-4625-4d95-b9a9-770ecc50f01b/.system_generated/steps/906/content.md', 'utf-8');

// Look for category links like /shop/home-page/... or /category/...
const links = html.match(/\/shop\/home-page\/[^\s"'<>\\]+/g) || [];
const uniqueLinks = [...new Set(links)];
console.log('Category links found on Markaz categories page:', uniqueLinks.length);
console.log('Links:', uniqueLinks);

// Look for category icons
const icons = html.match(/\/categoryIcons\/\d+\.webp/g) || [];
const uniqueIcons = [...new Set(icons)];
console.log('Category icons found:', uniqueIcons.length);
console.log('Icons:', uniqueIcons);

// Look for all static.markaz.app URLs
const cdnImgs = html.match(/https:\/\/static\.markaz\.app\/pakistan\/thumbnails\/products\/[^\s"'<>\\]+\.(?:jpg|jpeg|png|webp)/g) || [];
console.log('Total CDN product images on categories page:', [...new Set(cdnImgs)].length);
