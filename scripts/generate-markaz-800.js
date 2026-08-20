import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getProductImageGallery } from './generate-unique-galleries.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 8 Distinct Categories Definition
const CATEGORY_SCHEMAS = [
  {
    categorySlug: 'womens-fashion',
    categoryName: "Women's Fashion & Clothing",
    codePrefix: 'WOM',
    brands: [
      'Khaadi Replica', 'Gul Ahmed Master Copy', 'Sana Safinaz Style', 'Maria.B Edition',
      'Asim Jofa Look', 'Baroque Collection', 'Sapphire Style', 'Nishat Linen Copy',
      'Limelight Look', 'Zellbury Edition', 'Bonanza Satrangi Look', 'Alkaram Print',
      'Charizma Design', 'Cross Stitch Style', 'J. Junaid Jamshed Look', 'MTJ Replica',
      'Edenrobe Style', 'Beechtree Edition', 'Saya Collection', 'Ego Modern Style',
      'Rang Ja Style', 'Taana Baana Look', 'Orient Classic', 'Motifz Luxury',
      'Charles & Keith Style', 'Aldo Look', 'Michael Kors Style', 'UrbanChic PK',
      'Lara Leather', 'Zara Look', 'Stylo Style', 'Borjan Look'
    ],
    subcategories: [
      { slug: 'stitched-lawn-suits', name: 'Stitched Lawn Suits' },
      { slug: 'unstitched-fabric', name: 'Unstitched Luxury Fabric' },
      { slug: 'designer-handbags', name: 'Designer Handbags & Clutches' },
      { slug: 'bridal-jewelry', name: 'Bridal & Party Jewelry' },
      { slug: 'abayas-hijabs', name: 'Abayas & Stoles' },
      { slug: 'shawls-dupattas', name: 'Velvet Shawls & Dupattas' }
    ],
    items: [
      { name: '3-Piece Embroidered Chiffon Dupatta Printed Lawn Suit', sub: 'stitched-lawn-suits', price: 2899, cost: 1450, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Lawn with Chiffon Dupatta' },
      { name: '2-Piece Digital Printed Summer Lawn Kurti with Trousers', sub: 'stitched-lawn-suits', price: 1899, cost: 950, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', fabric: 'Digital Printed Premium Lawn' },
      { name: 'Heavy Embroidered Organza Party Wear Maxi with Silk Slip', sub: 'unstitched-fabric', price: 5499, cost: 2750, img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80', fabric: 'Organza & Raw Silk' },
      { name: 'Velvet Embroidered Bridal Shawl with Four-Side Zari Border', sub: 'shawls-dupattas', price: 3499, cost: 1750, img: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&auto=format&fit=crop&q=80', fabric: 'Micro Velvet 9000' },
      { name: 'Handcrafted Chickenkari Stitched Summer Kurta with Lace Work', sub: 'stitched-lawn-suits', price: 2199, cost: 1100, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Chickenkari Lawn' },
      { name: '3-Piece Unstitched Jacquard Festive Collection with Organza Patch', sub: 'unstitched-fabric', price: 3299, cost: 1650, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Self Jacquard Weave' },
      { name: 'Digital Printed Warm Linen 3-Piece Winter Suit', sub: 'unstitched-fabric', price: 2399, cost: 1200, img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80', fabric: 'Warm Twill Linen' },
      { name: 'Front Open Embroidered Abaya Gown with Matching Sheila Hijab', sub: 'abayas-hijabs', price: 3899, cost: 1950, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', fabric: 'Korean Nida Fabric' },
      { name: 'Shamooz Silk Stitched Formal Kurti with Cutwork Neckline', sub: 'stitched-lawn-suits', price: 2499, cost: 1250, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', fabric: 'Shamooz Silk' },
      { name: '3-Piece Slub Khaddar Winter Suit with Wool Shawl Dupatta', sub: 'unstitched-fabric', price: 2799, cost: 1400, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Heavy Slub Khaddar' },
      { name: 'Structured Crossbody Handbag with Gold Turn-Lock', sub: 'designer-handbags', price: 2199, cost: 1100, img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80', fabric: 'Textured Saffiano PU Leather' },
      { name: '3-in-1 Luxury Handbag Set (Large Tote + Crossbody + Pouch)', sub: 'designer-handbags', price: 2999, cost: 1500, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', fabric: 'Matte Faux Leather' },
      { name: 'Korean Crescent Half-Moon Shoulder Handbag', sub: 'designer-handbags', price: 1699, cost: 850, img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80', fabric: 'Smooth Vegan Leather' },
      { name: 'Bridal Velvet Clutch with Crystal & Pearl Brooch', sub: 'designer-handbags', price: 2299, cost: 1150, img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&auto=format&fit=crop&q=80', fabric: 'Rich Velvet with Metal Frame' },
      { name: '24K Gold Plated Zircon Bridal Jewelry Set (Necklace + Earrings + Teeka)', sub: 'bridal-jewelry', price: 3499, cost: 1750, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80', fabric: 'High Grade Zircon & Gold Plating' },
      { name: 'Handcrafted Meenakari Kundan Choker with Pearl Mala', sub: 'bridal-jewelry', price: 2799, cost: 1400, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80', fabric: 'Traditional Kundan with Meenakari' }
    ]
  },
  {
    categorySlug: 'mens-fashion',
    categoryName: "Men's Fashion & Accessories",
    codePrefix: 'MEN',
    brands: [
      'Curren', 'Naviforce', 'Skmei', 'Poedagar', 'Oupinke', 'Megir', 'UrbanCraft Leather',
      'Hub Leather Style', 'J. Fragrance Look', 'Royal Leather PK', 'Montblanc Style',
      'MTJ Menswear', 'Edenrobe Man', 'Diners Classic', 'Cambridge Look', 'Charcoal Style',
      'Oxford Look', 'Royal Tag Style', 'Lawrencepur Look', 'Alkaram Men'
    ],
    subcategories: [
      { slug: 'leather-wallets', name: 'Leather Wallets & Cardholders' },
      { slug: 'luxury-watches', name: 'Luxury Chronograph Watches' },
      { slug: 'formal-belts', name: 'Automatic Buckle Belts' },
      { slug: 'casual-kurtas', name: 'Stitched Men Kurtas & Boski' },
      { slug: 'shoes-footwear', name: 'Peshawari Chappals & Loafers' }
    ],
    items: [
      { name: 'Genuine Cow Leather Bifold Wallet with RFID Blocking', sub: 'leather-wallets', price: 1299, cost: 580, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80', fabric: '100% Full Grain Leather' },
      { name: 'Automatic Ratchet Buckle Full Grain Leather Belt for Men', sub: 'formal-belts', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', fabric: 'Top Layer Leather + Zinc Alloy Buckle' },
      { name: 'Stainless Steel Quartz Chronograph Water Resistant Watch', sub: 'luxury-watches', price: 2799, cost: 1350, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', fabric: 'Hardlex Glass + Steel Mesh Strap' },
      { name: '5-in-1 Luxury Men Gift Box Set (Watch + Belt + Wallet + Pen + Keychain)', sub: 'leather-wallets', price: 3499, cost: 1700, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', fabric: 'Full Executive Gift Box Set' },
      { name: 'Wash & Wear Premium Stitched Kurta Pajama Suit for Men', sub: 'casual-kurtas', price: 2499, cost: 1200, img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&auto=format&fit=crop&q=80', fabric: 'Premium Wrinkle-Free Wash & Wear' },
      { name: 'Handcrafted Traditional Kaptaan Peshawari Chappal with Double Tyre Sole', sub: 'shoes-footwear', price: 2899, cost: 1400, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Cowhide Leather + Rubber Tyre Sole' },
      { name: 'Dual Display Military Digital & Analog Sports Watch', sub: 'luxury-watches', price: 2199, cost: 1050, img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', fabric: 'Shockproof Resin + Mineral Glass' },
      { name: 'Unstitched Luxury Boski Silk Fabric (4.5 Meters)', sub: 'casual-kurtas', price: 3999, cost: 1950, img: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80', fabric: 'Original Chinese Boski 8 Pounds' },
      { name: 'Slim Carbon Fiber RFID Pop-Up Cardholder Wallet', sub: 'leather-wallets', price: 999, cost: 450, img: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&auto=format&fit=crop&q=80', fabric: 'Aerospace Carbon Fiber + Aluminum' },
      { name: 'Formal Penny Loafers Slip-On Dress Shoes for Men', sub: 'shoes-footwear', price: 3299, cost: 1600, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', fabric: 'Supple PU Leather + Padded Insole' }
    ]
  },
  {
    categorySlug: 'electronics',
    categoryName: 'Electronics & Smart Tech',
    codePrefix: 'ELE',
    brands: [
      'Joyroom', 'Audionic', 'Faster', 'Ronin', 'Zero Lifestyle', 'Dany', 'SoundPulse',
      'M10 Pro', 'M19 Pro', 'F9-5 TWS', 'Air31 Cyber', 'HK9 Ultra', 'T800 Ultra', 'T900 Big',
      'Baseus', 'Anker Look', 'Remax', 'Hoco', 'Kieslect', 'Mibro', 'Soundpeats'
    ],
    subcategories: [
      { slug: 'wireless-earbuds', name: 'Wireless Earbuds & Audio' },
      { slug: 'smart-watches', name: 'Smart Watches & Bands' },
      { slug: 'power-banks', name: 'Fast Power Banks & GaN Chargers' },
      { slug: 'action-cameras', name: 'Action Cameras & Drones' },
      { slug: 'cables-adapters', name: 'Gaming Cables & Fast Hubs' }
    ],
    items: [
      { name: 'M10 TWS Wireless Earbuds with 2000mAh Power Display Case', sub: 'wireless-earbuds', price: 1399, cost: 650, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', fabric: 'Bluetooth 5.3 + Digital Battery Display' },
      { name: 'Air31 Transparent Cyberpunk Crystal Wireless Earbuds', sub: 'wireless-earbuds', price: 1699, cost: 800, img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&auto=format&fit=crop&q=80', fabric: 'ENC Dual Mic + Transparent Shell' },
      { name: 'Active Noise Cancelling (ANC) Pro 6 Wireless Earphones', sub: 'wireless-earbuds', price: 2999, cost: 1450, img: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80', fabric: '-35dB Active Noise Cancellation' },
      { name: 'Low Latency 40ms RGB Gaming Wireless Bluetooth Earbuds', sub: 'wireless-earbuds', price: 1899, cost: 900, img: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=600&auto=format&fit=crop&q=80', fabric: 'Game/Music Dual Mode + Breathing RGB' },
      { name: 'Ultra 2 Smartwatch with AMOLED Display & Bluetooth Calling', sub: 'smart-watches', price: 3899, cost: 1900, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80', fabric: '2.02" High Definition AMOLED + Zinc Body' },
      { name: 'T800 Ultra Big Screen Smart Watch with Wireless Dock', sub: 'smart-watches', price: 1999, cost: 950, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', fabric: 'Heart Rate, SpO2 & Wireless Charging' },
      { name: 'HK9 Pro+ AMOLED Smart Watch with Gesture Control', sub: 'smart-watches', price: 4499, cost: 2200, img: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80', fabric: 'SF32LB551 Chip + 2.04 AMOLED Display' },
      { name: '20000mAh 65W Fast Charging GaN Power Bank with LED Meter', sub: 'power-banks', price: 3699, cost: 1800, img: 'https://images.unsplash.com/photo-1609592424307-e8982c5fbe60?w=600&auto=format&fit=crop&q=80', fabric: '65W PD Type-C + QC 3.0 Dual Ports' },
      { name: '10000mAh Magnetic MagSafe Wireless Power Bank', sub: 'power-banks', price: 2499, cost: 1200, img: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?w=600&auto=format&fit=crop&q=80', fabric: '15W Fast Qi Magnetic Wireless' },
      { name: '4K Ultra HD Waterproof Action Camera with Dual Screen & WiFi', sub: 'action-cameras', price: 5999, cost: 2950, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80', fabric: '170 Wide Angle Lens + 30M Waterproof Case' },
      { name: '65W GaN Fast Wall Charger with 3 Ports (2 Type-C + 1 USB)', sub: 'power-banks', price: 2199, cost: 1050, img: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&auto=format&fit=crop&q=80', fabric: 'GaN III Semiconductor Technology' },
      { name: 'Portable RGB Bluetooth Karaoke Speaker with Wireless Microphone', sub: 'wireless-earbuds', price: 3299, cost: 1600, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80', fabric: '20W Heavy Bass + RGB Party Lights' }
    ]
  },
  {
    categorySlug: 'home-kitchen',
    categoryName: 'Home & Kitchen Gadgets',
    codePrefix: 'HOM',
    brands: [
      'SilverCrest', 'KitchenChef', 'Anex Master', 'Sogo PK', 'Geepas Pro', 'Westpoint Style',
      'Sonifer', 'SmartSpace', 'HomeComfort', 'ChefMaster', 'DecoStyle', 'IKEA Look',
      'Prestige Look', 'Black+Decker Look', 'Philips Look', 'Braun Look'
    ],
    subcategories: [
      { slug: 'smart-appliances', name: 'Electric Choppers & Blenders' },
      { slug: 'storage-organizers', name: 'Kitchen Organizers & Racks' },
      { slug: 'smart-cleaning', name: 'Smart Cleaners & Mops' },
      { slug: 'led-lighting', name: 'Smart LED Ambience Lighting' },
      { slug: 'non-stick-cookware', name: 'Non-Stick Pots & Pans' }
    ],
    items: [
      { name: '2L Stainless Steel Electric Meat & Vegetable Food Chopper (4-Blade)', sub: 'smart-appliances', price: 2699, cost: 1300, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', fabric: 'Pure Copper Motor + 4 S/S Blades' },
      { name: '3L Heavy Duty Commercial Food Processor with Glass Bowl', sub: 'smart-appliances', price: 3499, cost: 1700, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', fabric: 'Thick Borosilicate Glass + 500W Motor' },
      { name: 'Rechargeable USB 6-Blade Portable Mini Juicer & Smoothie Blender', sub: 'smart-appliances', price: 1499, cost: 700, img: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=600&auto=format&fit=crop&q=80', fabric: 'BPA-Free Tritan Bottle + 2000mAh Battery' },
      { name: 'Reusable Food-Grade Non-Stick Silicone Air Fryer Liners (Pack of 2)', sub: 'smart-appliances', price: 899, cost: 380, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', fabric: 'Heat Resistant Silicone (-40°C to 240°C)' },
      { name: '360 Rotating Multi-Tier Kitchen Spice & Seasoning Jar Rack', sub: 'storage-organizers', price: 1899, cost: 900, img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80', fabric: 'Rust-Proof Carbon Steel Turntable' },
      { name: '2.0L Cordless Electric Fast-Boil Stainless Steel Kettle with Auto-Cut', sub: 'smart-appliances', price: 1799, cost: 850, img: 'https://images.unsplash.com/photo-1594213114663-d94db9b17126?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade 304 Stainless Steel' },
      { name: '9-in-1 Multifunction Vegetable Slicer Cutter with Drain Basket', sub: 'smart-appliances', price: 1399, cost: 650, img: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade ABS + S/S Blades' },
      { name: 'Wall Mounted Self Adhesive Bathroom Shower Caddy Rack (Pack of 2)', sub: 'storage-organizers', price: 999, cost: 450, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80', fabric: 'Rustproof Aluminum Alloy' },
      { name: 'Foldable Wardrobe Clothes Storage Organizer Box with Steel Frame', sub: 'storage-organizers', price: 1299, cost: 600, img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600&auto=format&fit=crop&q=80', fabric: 'Waterproof Oxford Cloth + Galvanized Frame' },
      { name: 'Smart RGB Sunset Ambience Projection Lamp with Remote Control', sub: 'led-lighting', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&auto=format&fit=crop&q=80', fabric: 'Optical Crystal Lens + Aluminum Base' },
      { name: 'Automatic USB Rechargeable Drinking Water Bottle Pump Dispenser', sub: 'smart-appliances', price: 899, cost: 390, img: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade Silicone Hose + ABS Body' },
      { name: '3-Piece Granite Non-Stick Frying Pan & Wok Set with Glass Lids', sub: 'non-stick-cookware', price: 4499, cost: 2200, img: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=80', fabric: 'Multi-Layer Granite Coating + Die-Cast Base' }
    ]
  },
  {
    categorySlug: 'beauty-personal-care',
    categoryName: 'Beauty, Health & Personal Care',
    codePrefix: 'BEA',
    brands: [
      'Rivaj UK', 'Miss Rose', 'Christine PK', 'Bioaqua', 'Dr. Rashel', 'Romantic May',
      'VGR Professional', 'Kemei', 'Dingling', 'Vintage T9', 'CkeyiN', 'InFace',
      'The Ordinary Look', 'CeraVe Style', 'Garnier Look', 'Neutrogena Style', 'Huda Beauty Look'
    ],
    subcategories: [
      { slug: 'shavers-trimmers', name: 'Men Trimmers & Shavers' },
      { slug: 'skincare-cosmetics', name: 'Face Serums & Skincare' },
      { slug: 'hair-styling', name: 'Hair Dryers & 5-in-1 Stylers' },
      { slug: 'body-care', name: 'Makeup & Facial Tools' }
    ],
    items: [
      { name: 'Vintage T9 Professional Cordless Metal Hair & Beard Trimmer', sub: 'shavers-trimmers', price: 1299, cost: 580, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80', fabric: 'Gold Engraved Metal Body + T-Blade' },
      { name: 'VGR V-030 Precision Zero-Gapped Detail Hair Trimmer', sub: 'shavers-trimmers', price: 1899, cost: 900, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80', fabric: 'Stainless Steel Blades + Turbo Motor' },
      { name: 'Kemei 3-in-1 Waterproof Electric Shaver & Nose Trimmer Kit', sub: 'shavers-trimmers', price: 2199, cost: 1050, img: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop&q=80', fabric: 'Floating 3D Rotary Heads + IPX7 Waterproof' },
      { name: '5-in-1 Hot Air Styler Hair Dryer & Volumizer Brush', sub: 'hair-styling', price: 2999, cost: 1450, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80', fabric: 'Negative Ion Ceramic Tourmaline' },
      { name: '24K Gold Foil Anti-Aging Skin Firming Serum (30ml)', sub: 'skincare-cosmetics', price: 899, cost: 380, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80', fabric: 'Pure 24K Gold Flakes + Hyaluronic Acid' },
      { name: 'Pure Vitamin C 20% Brightening Face Serum with Hyaluronic Acid', sub: 'skincare-cosmetics', price: 999, cost: 420, img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80', fabric: 'Organic Ascorbic Acid + Vitamin E' },
      { name: '12-Shade Velvet Matte Long-Lasting Waterproof Liquid Lipstick Set', sub: 'skincare-cosmetics', price: 1199, cost: 500, img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600&auto=format&fit=crop&q=80', fabric: 'Non-Drying Matte Liquid Formula' },
      { name: 'Electric Facial Pore Vacuum Blackhead Remover with 5 Probes', sub: 'body-care', price: 1499, cost: 680, img: 'https://images.unsplash.com/photo-1512290900672-1f02e6a39e80?w=600&auto=format&fit=crop&q=80', fabric: 'Rechargeable 3-Level Powerful Suction' },
      { name: 'Rose Quartz Natural Jade Facial Roller & Gua Sha Massage Tool', sub: 'body-care', price: 799, cost: 320, img: 'https://images.unsplash.com/photo-1512290900672-1f02e6a39e80?w=600&auto=format&fit=crop&q=80', fabric: '100% Authentic Natural Jade Stone' },
      { name: 'Professional Hair Straightener with Ceramic Floating Plates', sub: 'hair-styling', price: 2399, cost: 1150, img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop&q=80', fabric: 'PTC Fast Heating + LCD Temperature Control' }
    ]
  },
  {
    categorySlug: 'automotive-accessories',
    categoryName: 'Automotive & Bike Gear',
    codePrefix: 'AUT',
    brands: [
      '70mai Style', 'BlackBox Pro', 'RoadMaster', 'AutoTech PK', 'Baseus Car', 'CarLife',
      'DriveSafe', 'Anytek', 'Pioneer Look', 'Motul Look', 'Total Car PK', 'SpeedX'
    ],
    subcategories: [
      { slug: 'car-dashcams', name: 'Car Dash Cameras & GPS' },
      { slug: 'car-electronics', name: 'Car Phone Mounts & Chargers' },
      { slug: 'car-cleaning', name: 'Car Vacuums & Detailing' },
      { slug: 'interior-care', name: 'Seat Cushions & Air Fresheners' },
      { slug: 'bike-gear', name: 'Bike Covers & Riding Gloves' }
    ],
    items: [
      { name: '4K Ultra HD Dual Lens Front & Rear Car Dash Camera with Night Vision', sub: 'car-dashcams', price: 4499, cost: 2200, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80', fabric: 'Sony Starvis Sensor + 170° Wide Angle' },
      { name: '15W Fast Qi Wireless Auto-Clamping Smart Car Phone Mount', sub: 'car-electronics', price: 1699, cost: 780, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80', fabric: 'Smart Infrared Sensor + 360° Rotation' },
      { name: '120W High Power Cordless Handheld Car Vacuum Cleaner', sub: 'car-cleaning', price: 1899, cost: 890, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80', fabric: 'Washable HEPA Filter + 6000PA Suction' },
      { name: 'Digital Portable Tyre Inflator Air Compressor with Auto Shutoff & LED', sub: 'car-electronics', price: 3299, cost: 1550, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&auto=format&fit=crop&q=80', fabric: '150 PSI Fast Inflation + Preset Pressure' },
      { name: 'Bluetooth 5.0 FM Transmitter & Car MP3 Player with Dual Fast USB Ports', sub: 'car-electronics', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80', fabric: 'Handsfree Calling + Bass Boost Button' },
      { name: '7-Inch Touchscreen HD Car MP5 Player with Apple CarPlay & Android Auto', sub: 'car-electronics', price: 6499, cost: 3200, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80', fabric: 'HD Capacitive Touchscreen + Bluetooth' },
      { name: '360° Wide Angle Frameless Blind Spot Mirrors for Cars (Pack of 2)', sub: 'interior-care', price: 499, cost: 190, img: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&auto=format&fit=crop&q=80', fabric: 'HD Glass Convex Lens + 3M Adhesive' },
      { name: 'Ergonomic Memory Foam Breathable Car Seat Headrest & Neck Cushion', sub: 'interior-care', price: 1399, cost: 650, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80', fabric: 'Slow Rebound Memory Foam + Breathable Fabric' },
      { name: 'Heavy Duty Waterproof All-Weather Motorcycle Body Cover with Lock Hole', sub: 'bike-gear', price: 1299, cost: 580, img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=600&auto=format&fit=crop&q=80', fabric: '190T Silver Coated Polyester' },
      { name: 'Touchscreen Thermal Winter Motorcycle Riding Gloves with Carbon Knuckles', sub: 'bike-gear', price: 1499, cost: 680, img: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80', fabric: 'Hard Knuckle Armor + Anti-Slip Palm' }
    ]
  },
  {
    categorySlug: 'kids-toys-baby',
    categoryName: 'Kids, Toys & Baby',
    codePrefix: 'KID',
    brands: [
      'SmartBaby', 'ToyLand', 'RC Power', 'PlayLearn', 'KidZone PK', 'WonderKids',
      'LittleStar', 'Lego Replica', 'Fisher Look', 'Chicco Style', 'BabyComfort', 'FunTime'
    ],
    subcategories: [
      { slug: 'educational-toys', name: 'Learning Tablets & Flash Cards' },
      { slug: 'rc-cars-drones', name: 'RC Monster Stunt Cars & Drones' },
      { slug: 'baby-care-gear', name: 'Baby Carriers & Grooming' },
      { slug: 'plush-action-toys', name: 'Plush & Montessori Toys' }
    ],
    items: [
      { name: '8.5-Inch LCD Writing Tablet & Doodle Drawing Board for Kids', sub: 'educational-toys', price: 699, cost: 280, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80', fabric: 'Eye-Protection LCD Screen + Stylus' },
      { name: '12-Inch Ultra-Thin LCD Digital Writing & Painting Pad with Lock Screen', sub: 'educational-toys', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80', fabric: 'Colorful Pressure Sensitive Screen' },
      { name: '4WD 2.4GHz High Speed RC Monster Rock Crawler Stunt Car (360 Flips)', sub: 'rc-cars-drones', price: 2799, cost: 1350, img: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=600&auto=format&fit=crop&q=80', fabric: 'Shockproof Off-Road Alloy Chassis' },
      { name: 'Mini Gesture-Sensing Hand Control UFO Drone with Obstacle Avoidance', sub: 'rc-cars-drones', price: 2199, cost: 1050, img: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop&q=80', fabric: 'Infrared Sensors + Flexible Mesh Frame' },
      { name: '4-in-1 Ergonomic Breathable Baby Carrier with Detachable Hip Seat', sub: 'baby-care-gear', price: 2399, cost: 1150, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80', fabric: '100% Breathable Soft Cotton' },
      { name: 'Interactive Talking Flash Cards for Toddlers Early Learning (224 Words)', sub: 'educational-toys', price: 1299, cost: 590, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80', fabric: 'Rechargeable Card Reader + Double-Sided Cards' },
      { name: 'Electric Safe Baby Nail Trimmer with LED Light & 6 Grinding Heads', sub: 'baby-care-gear', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&auto=format&fit=crop&q=80', fabric: 'Whisper Quiet Motor + Cushioned Pads' },
      { name: 'Montessori Wooden Geometric Shape & Color Sorting Stack Puzzle', sub: 'plush-action-toys', price: 999, cost: 420, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80', fabric: 'Non-Toxic Water Paint + Smooth Natural Beech Wood' },
      { name: 'Dancing & Talking Cactus Plush Toy with 120 Songs & Voice Repeat', sub: 'plush-action-toys', price: 1099, cost: 480, img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&auto=format&fit=crop&q=80', fabric: 'Soft Knitted Plush Fabric' },
      { name: '72-Piece 3D Magnetic Building Blocks & Tiles Creative STEM Toy Set', sub: 'educational-toys', price: 2999, cost: 1450, img: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&auto=format&fit=crop&q=80', fabric: 'Food Grade ABS + Strong Rare Earth Magnets' }
    ]
  },
  {
    categorySlug: 'sports-fitness',
    categoryName: 'Sports & Outdoor Fitness',
    codePrefix: 'SPO',
    brands: [
      'IronGym', 'FlexFit', 'ProSport PK', 'CampMaster', 'HydraPeak', 'PowerGrip',
      'FitZone PK', 'Decathlon Look', 'Nike Look', 'Adidas Look', 'MuscleTech Style', 'ApexSports'
    ],
    subcategories: [
      { slug: 'resistance-bands-weights', name: 'Workout Bands & Grippers' },
      { slug: 'motivational-bottles', name: 'Hydration Jugs & Shakers' },
      { slug: 'cycling-camping', name: 'Camping Tents & Torches' },
      { slug: 'yoga-fitness', name: 'Yoga Mats & Exercise Rollers' }
    ],
    items: [
      { name: '11-Piece Heavy Duty Workout Resistance Bands Set (Up to 150 lbs)', sub: 'resistance-bands-weights', price: 1899, cost: 890, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', fabric: '100% Natural Latex + Steel Carabiners' },
      { name: '2L Motivational Time Marker Gradient Water Jug with Straw & Handle', sub: 'motivational-bottles', price: 1199, cost: 520, img: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80', fabric: 'BPA-Free Food Grade Tritan Plastic' },
      { name: '5-60kg Adjustable Heavy Duty Hand Grip Strengthener & Forearm Exerciser', sub: 'resistance-bands-weights', price: 699, cost: 290, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', fabric: 'Stainless Steel Spring + Ergonomic Rubber Grip' },
      { name: 'Non-Slip 10mm Extra Thick High-Density Yoga & Workout Mat with Strap', sub: 'yoga-fitness', price: 1699, cost: 790, img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80', fabric: 'Eco-Friendly High Density NBR Foam' },
      { name: 'Automatic Rebound Ab Roller Wheel with Dual Elbow Support Pads', sub: 'yoga-fitness', price: 2499, cost: 1200, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', fabric: 'Multi-Layer Soundproof TPR + Steel Spring' },
      { name: 'Digital Speed Jump Rope with Calorie Counter & Weighted Cordless Balls', sub: 'yoga-fitness', price: 1099, cost: 480, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', fabric: 'PVC Coated Steel Wire + Non-Slip Handle' },
      { name: 'Waterproof 4-Person Instant Automatic Pop-Up Camping Tent with UV Protection', sub: 'cycling-camping', price: 5499, cost: 2700, img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80', fabric: '210D Oxford PU 3000mm Waterproof Fabric' },
      { name: 'Rechargeable Tactical High-Lumen LED Torch with Power Bank & Zoom', sub: 'cycling-camping', price: 1599, cost: 720, img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80', fabric: 'Aircraft Grade Aluminum Alloy Body' },
      { name: 'Breathable Weightlifting Gym Gloves with Integrated Wrist Wrap Support', sub: 'resistance-bands-weights', price: 999, cost: 440, img: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', fabric: 'Microfiber + Anti-Slip Silicone Gel Pad' },
      { name: 'Stainless Steel Insulated Protein Shaker Bottle with Whisk Ball (750ml)', sub: 'motivational-bottles', price: 1499, cost: 680, img: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600&auto=format&fit=crop&q=80', fabric: 'Double Wall 304 Stainless Steel' }
    ]
  }
];

// Rich attribute sets to generate 100 uniquely specified items per category
const ATTRIBUTES = [
  { ed: 'Pro Series', col: 'Midnight Black' },
  { ed: 'Limited Festive Edition', col: 'Pearl White' },
  { ed: 'Master Craft Series', col: 'Royal Blue' },
  { ed: 'Elite Collection', col: 'Rose Gold' },
  { ed: 'Special Export Quality', col: 'Emerald Green' },
  { ed: 'Signature Series', col: 'Space Grey' },
  { ed: 'Luxury Gold Pack', col: 'Champagne Gold' },
  { ed: 'Summer Special Edition', col: 'Pastel Pink' },
  { ed: 'Winter Warm Collection', col: 'Crimson Maroon' },
  { ed: 'Royal Velvet Edition', col: 'Deep Olive' },
  { ed: 'Urban Lifestyle Series', col: 'Navy Blue' },
  { ed: 'Classic Heritage Pack', col: 'Mocha Brown' },
  { ed: 'Platinum Heavy Edition', col: 'Silver Metallic' },
  { ed: 'Exclusive Designer Edition', col: 'Mustard Yellow' },
  { ed: 'Supreme Performance Series', col: 'Teal Blue' }
];

const CITIES = [
  'Lahore Hub, Pakistan',
  'Karachi Wholesale Center',
  'Faisalabad Textile Depot',
  'Sialkot Export Zone',
  'Rawalpindi Logistics Hub',
  'Gujranwala Trade Market',
  'Multan Sourcing Depot',
  'Peshawar Sourcing Center'
];

const allProducts = [];
const seenTitles = new Set();
const seenSlugs = new Set();
const seenSKUs = new Set();

let globalId = 1;

// Loop through each of the 8 categories and generate EXACTLY 100 UNIQUE products
for (const cat of CATEGORY_SCHEMAS) {
  let catCount = 0;
  let attempt = 0;

  while (catCount < 100 && attempt < 1000) {
    attempt++;

    const itemTemplate = cat.items[catCount % cat.items.length];
    const brand = cat.brands[(catCount + attempt) % cat.brands.length];
    const attr = ATTRIBUTES[(catCount * 3 + attempt) % ATTRIBUTES.length];
    const city = CITIES[(catCount + globalId) % CITIES.length];

    // Build unique title
    const uniqueTitle = `${brand} ${itemTemplate.name} (${attr.ed} - ${attr.col})`;

    if (seenTitles.has(uniqueTitle)) {
      continue;
    }
    seenTitles.add(uniqueTitle);

    const slug = uniqueTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + `-${globalId}`;

    if (seenSlugs.has(slug)) {
      continue;
    }
    seenSlugs.add(slug);

    const sku = `MKZ-${cat.codePrefix}-${String(catCount + 1).padStart(4, '0')}`;
    seenSKUs.add(sku);

    const priceDelta = ((catCount % 7) - 3) * 50;
    const finalPrice = Math.max(499, itemTemplate.price + priceDelta);
    const comparePrice = Math.round((finalPrice * (1.3 + (catCount % 4) * 0.05)) / 50) * 50;
    const supplierCost = Math.round(itemTemplate.cost + priceDelta * 0.5);

    const product = {
      id: `mkz-p-${globalId}`,
      sku: sku,
      title: uniqueTitle,
      slug: slug,
      brand: brand,
      categorySlug: cat.categorySlug,
      subcategorySlug: itemTemplate.sub,
      categoryName: cat.categoryName,
      price: finalPrice,
      compareAtPrice: comparePrice,
      supplierCost: supplierCost,
      stock: 35 + ((globalId * 13) % 220),
      ordersCount: 110 + ((globalId * 29) % 3500),
      rating: Number((4.6 + ((globalId % 5) * 0.08)).toFixed(1)),
      reviewsCount: 25 + ((globalId * 7) % 520),
      freeShipping: finalPrice >= 2500 || globalId % 3 === 0,
      isFlashDeal: globalId % 4 === 0,
      isFeatured: globalId % 5 === 0,
      badge: globalId % 3 === 0 ? 'Markaz Choice' : 'Wholesale Direct',
      supplier: {
        name: `${brand} Verified Supplier`,
        city: city,
        dispatchHours: 24,
        rating: 4.9,
        trustScore: '99% Positive'
      },
      images: getProductImageGallery(cat.categorySlug, catCount, globalId),
      variants: [
        {
          id: `v-${globalId}-1`,
          name: `${attr.col} / Standard Pack`,
          color: attr.col,
          size: 'Standard',
          price: finalPrice,
          stock: 35,
          sku: `${sku}-V1`
        },
        {
          id: `v-${globalId}-2`,
          name: `${attr.col} / Pro Luxury Pack`,
          color: attr.col,
          size: 'Pro Edition',
          price: finalPrice + 350,
          stock: 35,
          sku: `${sku}-V2`
        }
      ],
      specifications: {
        'Brand': brand,
        'Material/Fabric': itemTemplate.fabric,
        'Edition': attr.ed,
        'Sourcing Hub': city,
        'Warranty': '7-Day Return & Replacement Warranty',
        'Payment Mode': 'Cash on Delivery (COD) Nationwide',
        'Delivery Time': '24-48 Hours via TCS / Trax Express'
      },
      description: `Authentic wholesale ${uniqueTitle} sourced directly from verified Markaz wholesale suppliers. Manufactured with high quality ${itemTemplate.fabric}, complete with nationwide Cash on Delivery (COD) and 7-day money-back/replacement guarantee across Pakistan.`
    };

    allProducts.push(product);
    catCount++;
    globalId++;
  }
}

// Write to frontend data file
const frontendPath = path.join(__dirname, '../src/data/markaz-products.js');
const serverPath = path.join(__dirname, '../server/data/seed-products.js');

const exportContent = `// Auto-generated 800 (100 per Category) Completely Unique Markaz Dropshipping Catalog
export const MARKAZ_PRODUCTS_500 = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(frontendPath, exportContent, 'utf-8');
fs.writeFileSync(serverPath, exportContent, 'utf-8');

console.log('===========================================================');
console.log(`✅ Total Products Generated: ${allProducts.length}`);
console.log(`🏷️ Categories Count: ${CATEGORY_SCHEMAS.length} (100 per category)`);
console.log(`🚫 Zero Duplicate Titles: ${seenTitles.size === allProducts.length}`);
console.log(`🚫 Zero Duplicate Slugs: ${seenSlugs.size === allProducts.length}`);
console.log(`🚫 Zero Duplicate SKUs: ${seenSKUs.size === allProducts.length}`);
console.log(`📁 Frontend: ${frontendPath}`);
console.log(`📁 Server: ${serverPath}`);
console.log('===========================================================');
