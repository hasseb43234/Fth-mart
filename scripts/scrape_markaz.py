import urllib.request
import urllib.parse
import re
import json
import time
import os

CATEGORIES = [
  {"slug": "womens-unstitched", "names": ["Women's Unstitched", "Lawn suits", "3-Piece Lawn"]},
  {"slug": "womens-stitched", "names": ["Women's Stitched", "Stitched Kurti", "Pret"]},
  {"slug": "womens-luxury-formal", "names": ["Bridal", "Wedding", "Organza Maxi", "Velvet Shawl"]},
  {"slug": "abayas-hijabs", "names": ["Abaya", "Hijab", "Kaftan", "Modest"]},
  {"slug": "womens-handbags", "names": ["Women's Handbags", "Tote Bag", "Clutch", "Shoulder Bag"]},
  {"slug": "womens-footwear", "names": ["Khussa", "Kolhapuri", "Heels", "Women Shoes"]},
  {"slug": "jewellery", "names": ["Jewellery", "Bridal Set", "Kundan", "Jhumka"]},
  {"slug": "mens-unstitched", "names": ["Men's Unstitched", "Boski", "Men Cotton", "Latha"]},
  {"slug": "mens-stitched", "names": ["Men's Stitched", "Men Kurta", "Shalwar Kameez", "Waistcoat"]},
  {"slug": "mens-western", "names": ["Polo Shirt", "Men T-Shirt", "Tracksuit", "Jeans"]},
  {"slug": "mens-footwear", "names": ["Peshawari Chappal", "Shoes", "Loafers", "Sneakers"]},
  {"slug": "mens-wallets-belts", "names": ["Leather Wallet", "Men Belt", "Cardholder", "Gift Set"]},
  {"slug": "watches", "names": ["Watches", "Men Watch", "Chronograph", "Couple Watch"]},
  {"slug": "smart-watches", "names": ["Smart Watch", "Ultra 2", "T800 Ultra", "Fitness Band"]},
  {"slug": "wireless-audio", "names": ["Wireless Earbuds", "Air31", "M10 Earbuds", "Bluetooth Speaker"]},
  {"slug": "mobile-accessories", "names": ["Mobile Accessories", "Power Bank", "Fast Charger", "Type-C"]},
  {"slug": "home-appliances", "names": ["Electric Chopper", "Portable Blender", "Kettle", "Steam Iron"]},
  {"slug": "kitchen-tools", "names": ["Kitchen", "Air Fryer", "Spice Rack", "Vegetable Cutter"]},
  {"slug": "bedding-linen", "names": ["Bedding", "Bed Sheets", "Comforter", "Pillow"]},
  {"slug": "home-decor", "names": ["Home Decor", "Sunset Lamp", "LED Strip", "Wall Art"]},
  {"slug": "storage-organizers", "names": ["Storage", "Shoe Rack", "Shower Caddy", "Organizer"]},
  {"slug": "personal-care-trimmers", "names": ["Vintage T9", "Hair Trimmer", "Shaver", "Hair Styler"]},
  {"slug": "skincare-serums", "names": ["Skincare", "Face Serum", "Vitamin C", "Sunblock"]},
  {"slug": "makeup-cosmetics", "names": ["Cosmetics", "Matte Lipstick", "Eyeshadow", "Makeup"]},
  {"slug": "fragrances-perfumes", "names": ["Perfumes", "Men Perfume", "Attar", "Body Mist"]},
  {"slug": "automotive-accessories", "names": ["Auto", "Dash Cam", "Car Vacuum", "Car Mount"]},
  {"slug": "bike-gear", "names": ["Bike", "Bike Cover", "Riding Gloves", "Motorcycle"]},
  {"slug": "kids-baby-clothing", "names": ["Kids Clothing", "Baby Romper", "Girls Frock", "Boys Kurta"]},
  {"slug": "toys-rc-vehicles", "names": ["Toys", "RC Car", "Drone", "LCD Tablet"]},
  {"slug": "baby-care-gear", "names": ["Baby", "Baby Carrier", "Teether", "Diaper Bag"]},
  {"slug": "sports-gym-equipment", "names": ["Sports", "Resistance Bands", "Water Jug", "Ab Roller"]},
  {"slug": "stationery-office", "names": ["Books & Stationery", "Thermal Printer", "Markers", "Notebook"]},
  {"slug": "health-wellness", "names": ["Health", "Massage Gun", "Blood Pressure", "Oximeter"]}
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
}

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=8) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        return ""

cdn_pattern = re.compile(r'https://static\.markaz\.app/pakistan/thumbnails/products/[^\s"\'\\]+\.(?:jpg|jpeg|png|webp)', re.IGNORECASE)

scraped_data = {}
all_collected_images = set()

print(f"Starting extraction for {len(CATEGORIES)} categories directly from Markaz App CDN...", flush=True)

for idx, cat in enumerate(CATEGORIES, 1):
    slug = cat["slug"]
    found_images = set()
    
    for name in cat["names"]:
        encoded = urllib.parse.quote(name)
        # Try both home-page and search endpoints
        for endpoint in [f"https://www.markaz.app/shop/home-page/{encoded}", f"https://www.markaz.app/shop/search?q={encoded}"]:
            html = fetch_url(endpoint)
            matches = cdn_pattern.findall(html)
            for m in matches:
                found_images.add(m)
                all_collected_images.add(m)
            time.sleep(0.1)
            
    print(f"[{idx}/{len(CATEGORIES)}] {slug}: {len(found_images)} authentic Markaz CDN images found", flush=True)
    scraped_data[slug] = list(found_images)

print(f"\n=======================================================", flush=True)
print(f"Total Unique Authentic Markaz CDN Images: {len(all_collected_images)}", flush=True)
print(f"=======================================================", flush=True)

output_path = os.path.join(os.path.dirname(__file__), "markaz-scraped-images.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(scraped_data, f, indent=2)

print(f"Saved to {output_path}", flush=True)
