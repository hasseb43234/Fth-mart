import fs from 'fs';

const filePath = 'C:/Users/Dell/.gemini/antigravity/brain/6ce75b99-4625-4d95-b9a9-770ecc50f01b/.system_generated/steps/910/content.md';
if (fs.existsSync(filePath)) {
  const text = fs.readFileSync(filePath, 'utf-8');
  const urls = text.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi) || [];
  console.log('Image URLs found:', urls.length);
  const unique = [...new Set(urls)];
  console.log('Unique image URLs:', unique.length);
  console.log('Sample:', unique.slice(0, 15));
  
  // Also look for API calls or json data
  const jsonBlocks = text.match(/"product[^"]*":/gi) || [];
  console.log('Product matches in text:', jsonBlocks.length);
} else {
  console.log('File does not exist');
}
