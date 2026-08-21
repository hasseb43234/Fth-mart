import https from 'https';

async function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function inspect() {
  const html = await fetchUrl('https://www.markaz.app/shop/home-page/Cosmetics');
  
  // Check for Next.js flight data or __NEXT_DATA__
  const nextDataMatch = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/);
  if (nextDataMatch) {
    console.log('Found __NEXT_DATA__!');
    const parsed = JSON.parse(nextDataMatch[1]);
    console.log('Next data keys:', Object.keys(parsed));
  } else {
    console.log('__NEXT_DATA__ not found. Checking for embedded self.__next_f or JSON payload...');
    const fMatches = html.match(/self\.__next_f\.push\(\[1,"([\s\S]*?)"\]\)/g) || [];
    console.log('next_f chunks found:', fMatches.length);
    
    // Look for product objects inside the chunks
    const priceMatches = html.match(/Rs\.?\s*\d[\d,]*/gi) || [];
    console.log('Price strings found:', priceMatches.slice(0, 10));
  }
}

inspect();
