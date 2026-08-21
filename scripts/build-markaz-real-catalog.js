import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load scraped authentic Markaz CDN images
const scrapedImagesPath = path.join(__dirname, 'markaz-authentic-cdn-images.json');
const scrapedImages = JSON.parse(fs.readFileSync(scrapedImagesPath, 'utf-8'));

// 33 Official Markaz Categories with Rich Specifications
export const MARKAZ_OFFICIAL_33_CATEGORIES = [
  {
    id: 'cat-womens-unstitched',
    slug: 'womens-unstitched',
    codePrefix: 'WUN',
    name: "Women's Unstitched",
    urduName: 'خواتین کے ان سلے سوٹ',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Khaadi Look', 'Gul Ahmed Master Copy', 'Sana Safinaz Replica', 'Maria.B Edition', 'Asim Jofa Style', 'Baroque Collection', 'Sapphire Look', 'Nishat Linen Copy', 'Alkaram Print', 'Charizma Design'],
    subcategories: [
      { id: 'sub-wun-3pc', slug: '3pc-lawn-suits', name: '3-Piece Printed & Embroidered Lawn' },
      { id: 'sub-wun-2pc', slug: '2pc-summer-lawn', name: '2-Piece Shirt & Trouser Fabric' },
      { id: 'sub-wun-chiffon', slug: 'chiffon-dupatta-suits', name: 'Lawn with Pure Chiffon Dupatta' },
      { id: 'sub-wun-khaddar', slug: 'khaddar-winter-fabric', name: 'Slub Khaddar & Linen Winter Suits' }
    ],
    items: [
      { name: '3-Piece Embroidered Chiffon Dupatta Printed Lawn Suit', price: 2699, cost: 1350, fabric: 'Pure Premium Lawn with Chiffon Dupatta' },
      { name: '2-Piece Digital Printed Summer Lawn Kurti with Cambric Trouser Fabric', price: 1799, cost: 890, fabric: 'Digital Printed 80/80 Lawn' },
      { name: '3-Piece Heavy Chickenkari Embroidered Lawn Suit with Organza Border', price: 3199, cost: 1600, fabric: 'Fine Chickenkari with Laser Cutwork' },
      { name: '3-Piece Slub Khaddar Winter Suit with Woolen Shawl', price: 2799, cost: 1400, fabric: 'Heavy Slub Khaddar & Printed Wool Shawl' },
      { name: '2-Piece Swiss Voile Embroidered Luxury Summer Collection', price: 2299, cost: 1150, fabric: 'Swiss Voile with Resham Embroidery' }
    ]
  },
  {
    id: 'cat-womens-stitched',
    slug: 'womens-stitched',
    codePrefix: 'WST',
    name: "Women's Stitched Pret",
    urduName: 'خواتین کے سلے ہوئے ریڈی میڈ کپڑے',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Limelight Look', 'Zellbury Pret', 'Generation Style', 'Beechtree Edition', 'Saya Ready-to-Wear', 'Ego Modern Style', 'Bonanza Satrangi Ready', 'Orient Pret'],
    subcategories: [
      { id: 'sub-wst-kurtis', slug: 'stitched-kurtis', name: 'Ready-to-Wear 1-Piece Kurtis' },
      { id: 'sub-wst-2pc', slug: 'stitched-2pc-suits', name: 'Stitched 2-Piece Kurti & Trouser' },
      { id: 'sub-wst-frocks', slug: 'flared-frocks', name: 'Flared Long Frocks & Kurtas' },
      { id: 'sub-wst-trousers', slug: 'cambric-trousers', name: 'Lace Cambric & Tulip Trousers' }
    ],
    items: [
      { name: 'Ready-to-Wear Digital Printed Summer Kurti with Lace Neckline', price: 1499, cost: 720, fabric: '100% Stitched Soft Cambric Lawn' },
      { name: 'Stitched 2-Piece Jacquard Kurta with Straight Cut Trousers', price: 2499, cost: 1200, fabric: 'Self Weaved Jacquard with Cotton Slip' },
      { name: 'Embroidered Flared A-Line Kurti with Pearl Tassel Detailing', price: 1899, cost: 950, fabric: 'Lawn with Zari & Sequence Handwork' },
      { name: 'Solid Dyed Minimalist Co-Ord Set (Shirt + Culottes)', price: 2199, cost: 1100, fabric: 'Breathable Linen Viscose Blend' },
      { name: 'Stitched 3-Piece Festive Organza Embellished Pret Suit', price: 3899, cost: 1950, fabric: 'Pure Organza with Inner Slip & Raw Silk Pants' }
    ]
  },
  {
    id: 'cat-womens-luxury-formal',
    slug: 'womens-luxury-formal',
    codePrefix: 'WLF',
    name: "Festive & Luxury Formal",
    urduName: 'شادی بیاہ اور پارٹی ویئر ڈریسز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Maria.B Bridal', 'Baroque Luxury', 'Asim Jofa Festive', 'Suffuse Look', 'Kanwal Malik Style', 'Crimson Formal', 'Sana Safinaz Couture'],
    subcategories: [
      { id: 'sub-wlf-maxis', slug: 'party-maxis', name: 'Heavy Embroidered Organza Maxis' },
      { id: 'sub-wlf-lehengas', slug: 'bridal-lehengas', name: 'Bridal Lehengas & Gowns' },
      { id: 'sub-wlf-shawls', slug: 'velvet-shawls', name: 'Embroidered Micro Velvet Shawls' },
      { id: 'sub-wlf-chiffon', slug: 'luxury-chiffon', name: 'Hand-Embellished Pure Chiffon Suits' }
    ],
    items: [
      { name: 'Heavy Embroidered Organza Party Wear Maxi with Hand-Embellished Neckline', price: 5899, cost: 2950, fabric: 'Organza with Tilla, Zari & Sequins' },
      { name: 'Micro Velvet 9000 Heavy Zari Embroidered Bridal Shawl (Four-Side Border)', price: 3899, cost: 1950, fabric: 'Micro Velvet 9000 with Cutwork Border' },
      { name: 'Pure Chiffon 3-Piece Wedding Collection Suit with Heavy Dupatta', price: 4799, cost: 2400, fabric: 'Crinkle Chiffon with Malai Inner' },
      { name: 'Handworked Net Lehenga Choli Set with Resham Work & Cancan', price: 7499, cost: 3800, fabric: 'Bridal Net & Raw Silk Choli' },
      { name: 'Festive Silk Peshwas Dress with Embroidered Organza Dupatta', price: 4999, cost: 2500, fabric: 'Katan Silk with Organza Border' }
    ]
  },
  {
    id: 'cat-makeup-cosmetics',
    slug: 'makeup-cosmetics',
    codePrefix: 'MKP',
    name: 'Cosmetics & Makeup',
    urduName: 'میک اپ اور کاسمیٹکس پروڈکٹس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Miss Rose', 'Christine PK', 'Rivaj Cosmetics', 'Romantic May', 'Huda Beauty Look', 'MAC Replica', 'MeiNow'],
    subcategories: [
      { id: 'sub-mkp-lipsticks', slug: 'matte-lipsticks', name: '12-Shade Velvet Matte Liquid Lipsticks' },
      { id: 'sub-mkp-palettes', slug: 'eyeshadow-palettes', name: 'Glitter & Matte Eyeshadow Palettes' },
      { id: 'sub-mkp-foundation', slug: 'hd-foundations', name: 'Full Coverage HD Liquid Foundations' },
      { id: 'sub-mkp-brushes', slug: 'makeup-brush-sets', name: 'Professional 12-Piece Makeup Brush Sets' }
    ],
    items: [
      { name: '12-Shade Velvet Matte Long-Lasting Waterproof Liquid Lipstick Box Set', price: 1199, cost: 500, fabric: 'Non-Drying Transfer-Proof Matte Liquid Formula' },
      { name: '35-Color Color Pop Matte & Shimmer Eyeshadow Palette Box', price: 1499, cost: 680, fabric: 'Highly Pigmented Blendable Powder Formula' },
      { name: 'Full Coverage HD Waterproof Liquid Foundation with Pump Dispenser (SPF 20)', price: 999, cost: 420, fabric: 'Oil-Control Flawless Matte Finish Formula' },
      { name: '12-Piece Professional Makeup Brush Set in Leather Travel Roll Case', price: 1299, cost: 580, fabric: 'Ultra Soft Synthetic Bristles with Wooden Handles' },
      { name: 'Dual Ended Black Waterproof 24H Eyeliner Stamp & Pen', price: 599, cost: 240, fabric: 'Smudge-Proof Quick Drying Liquid Formula' }
    ]
  },
  {
    id: 'cat-skincare-serums',
    slug: 'skincare-serums',
    codePrefix: 'SKN',
    name: 'Skincare & Face Serums',
    urduName: 'اسکن کیئر، فیس سیرم اور رولرز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Dr. Rashel', 'Bioaqua', 'Rivaj UK', 'The Ordinary Style', 'Garnier Look', 'CeraVe Style', 'Neutrogena Look'],
    subcategories: [
      { id: 'sub-skn-serums', slug: 'vitamin-c-serums', name: 'Vitamin C & 24K Gold Face Serums' },
      { id: 'sub-skn-sunblock', slug: 'sunblock-spf60', name: 'SPF 60 Sunblock & Whitening Creams' },
      { id: 'sub-skn-facewash', slug: 'foaming-face-washes', name: 'Foaming Face Washes & Scrubs' },
      { id: 'sub-skn-tools', slug: 'jade-rollers', name: 'Natural Jade Facial Rollers & Gua Sha' }
    ],
    items: [
      { name: 'Pure Vitamin C 20% Brightening Face Serum with Hyaluronic Acid (30ml)', price: 899, cost: 380, fabric: 'Organic Anti-Aging Formula with Ascorbic Acid' },
      { name: '24K Pure Gold Foil Luxury Anti-Aging & Firming Face Serum (30ml)', price: 999, cost: 420, fabric: 'Gold Flakes with Collagen Boosting Niacinamide' },
      { name: 'Rivaj UK Sunblock SPF 60+ Non-Greasy Water Resistant Cream (100ml)', price: 799, cost: 340, fabric: 'Broad Spectrum UVA/UVB Protection Formula' },
      { name: 'Natural Rose Quartz Facial Roller with Gua Sha Scraping Massage Tool', price: 799, cost: 320, fabric: '100% Authentic Natural Jade Stone' },
      { name: 'Electric Facial Pore Vacuum Blackhead Remover with 5 Suction Probes', price: 1499, cost: 680, fabric: 'Rechargeable 3-Level Suction Blackhead Extractor' }
    ]
  },
  {
    id: 'cat-personal-care-trimmers',
    slug: 'personal-care-trimmers',
    codePrefix: 'TRM',
    name: 'Personal Care & Trimmers',
    urduName: 'مردانہ ٹرمر، شیور اور ہیئر ڈرائر',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Vintage T9', 'VGR Professional', 'Kemei', 'Dingling', 'Geepas Pro', 'CkeyiN', 'InFace'],
    subcategories: [
      { id: 'sub-trm-t9', slug: 'vintage-t9-trimmers', name: 'Vintage T9 Metal Hair & Beard Trimmers' },
      { id: 'sub-trm-vgr', slug: 'pro-clipper-sets', name: 'VGR Professional Hair Clippers' },
      { id: 'sub-trm-shavers', slug: 'rotary-shavers', name: '3-in-1 Waterproof Electric Shavers' },
      { id: 'sub-trm-stylers', slug: '5in1-hair-stylers', name: '5-in-1 Hot Air Hair Styler Dryers' }
    ],
    items: [
      { name: 'Vintage T9 Professional Cordless Metal Body Hair & Beard Trimmer (Gold Dragon)', price: 1299, cost: 580, fabric: 'Gold Engraved Metal Body with Sharp T-Blade' },
      { name: 'VGR V-030 Precision Zero-Gapped Detail Hair Trimmer with USB Fast Charge', price: 1899, cost: 900, fabric: 'Stainless Steel Blades + High Speed Turbo Motor' },
      { name: 'Kemei 3-in-1 Waterproof Rechargeable Electric Shaver & Nose Trimmer Kit', price: 2199, cost: 1050, fabric: '3D Floating Rotary Blades + IPX7 Waterproof' },
      { name: '5-in-1 Hot Air Styler Hair Dryer & Volumizer Straightener Curling Brush', price: 2999, cost: 1450, fabric: 'Negative Ion Ceramic Tourmaline Barrel' },
      { name: 'Professional Hair Straightener with Ceramic Floating Plates & LCD Display', price: 2399, cost: 1150, fabric: 'PTC Fast Heating Plates with Auto Shutoff' }
    ]
  },
  {
    id: 'cat-jewellery',
    slug: 'jewellery',
    codePrefix: 'JWL',
    name: 'Artificial & Bridal Jewellery',
    urduName: 'مصنوعی اور برائیڈل جیولری',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Hanif Jewellers Look', 'Al-Zain Style', 'Zircon Jewels PK', 'Kundan Heritage', 'Noor Jewellers Style', 'Afghani Tribal Craft'],
    subcategories: [
      { id: 'sub-jwl-bridal', slug: 'bridal-sets', name: 'Complete 24K Gold Plated Bridal Sets' },
      { id: 'sub-jwl-chokers', slug: 'kundan-chokers', name: 'Kundan & Meenakari Choker Sets' },
      { id: 'sub-jwl-earrings', slug: 'jhumkas-earrings', name: 'Traditional Jhumkas & Chandbalis' },
      { id: 'sub-jwl-bangles', slug: 'kara-bangles', name: 'Velvet & Zircon Bangle Kara Sets' }
    ],
    items: [
      { name: '24K Gold Plated Zircon Bridal Jewelry Set (Necklace + Earrings + Teeka + Jhumar)', price: 3499, cost: 1700, fabric: 'High Grade Zircon Stones with 24K Micro Gold Plating' },
      { name: 'Handcrafted Meenakari Kundan Choker Set with Pearl Mala & Matching Jhumkas', price: 2799, cost: 1350, fabric: 'Traditional Brass Base with Meenakari Enamel' },
      { name: 'Traditional Pakistani Multi-Tier Jhumka Earrings with Hanging Pearls', price: 1199, cost: 490, fabric: 'Antique Gold Polish with Lightweight Alloy' },
      { name: 'Bridal Kara Bangles Set with Cutwork Zircon & Velvet Lining (Pack of 4)', price: 1699, cost: 780, fabric: 'Gold Plated Copper with High Clarity CZ Stones' },
      { name: 'Minimalist Solitaire Zircon Pendant Necklace with Matching Stud Earrings', price: 999, cost: 420, fabric: '925 Sterling Silver Plated Anti-Tarnish Alloy' }
    ]
  },
  {
    id: 'cat-womens-handbags',
    slug: 'womens-handbags',
    codePrefix: 'WHB',
    name: "Women's Bags & Clutches",
    urduName: 'خواتین کے ہینڈ بیگز اور کلچ',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Charles & Keith Style', 'Aldo Look', 'Michael Kors Style', 'UrbanChic PK', 'Lara Leather', 'Zara Look', 'Stylo Bags'],
    subcategories: [
      { id: 'sub-whb-totes', slug: 'totes-shoulder-bags', name: 'Shoulder Totes & Crossbody Bags' },
      { id: 'sub-whb-3in1', slug: '3in1-bag-sets', name: '3-in-1 Complete Handbag Sets' },
      { id: 'sub-whb-clutches', slug: 'bridal-clutches', name: 'Bridal Velvet & Pearl Clutches' },
      { id: 'sub-whb-backpacks', slug: 'mini-backpacks', name: 'Korean Mini Backpacks & Pouches' }
    ],
    items: [
      { name: 'Structured Crossbody Handbag with Gold Turn-Lock & Metal Chain Strap', price: 2199, cost: 1050, fabric: 'Textured Saffiano Faux Leather' },
      { name: '3-in-1 Luxury Handbag Set (Large Shoulder Tote + Crossbody + Zipper Wallet)', price: 2999, cost: 1450, fabric: 'Premium Matte PU Leather with Suede Lining' },
      { name: 'Korean Minimalist Crescent Half-Moon Shoulder Handbag', price: 1699, cost: 820, fabric: 'Smooth Water-Resistant Vegan Leather' },
      { name: 'Bridal Velvet Clutch with Crystal & Pearl Brooch Embellishment', price: 2299, cost: 1100, fabric: 'Rich Micro Velvet with Heavy Metal Clasp' },
      { name: 'Quilted Flap Crossbody Bag with Gold Hardware & Lock', price: 1899, cost: 920, fabric: 'Diamond Quilted Supple Vegan Leather' }
    ]
  },
  {
    id: 'cat-womens-footwear',
    slug: 'womens-footwear',
    codePrefix: 'WFT',
    name: "Women's Shoes & Khussas",
    urduName: 'خواتین کے جوتے اور کھسے',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['Multani Khussa House', 'Stylo Look', 'Borjan Style', 'ECS Replica', 'ShoePlanet Style', 'Dazzle Footwear', 'Mochi PK'],
    subcategories: [
      { id: 'sub-wft-khussas', slug: 'traditional-khussas', name: 'Handcrafted Multani Khussas' },
      { id: 'sub-wft-kolhapuris', slug: 'kolhapuri-chappals', name: 'Tilla Kolhapuris & Flats' },
      { id: 'sub-wft-heels', slug: 'block-heels', name: 'Party Wear Block Heels & Pumps' },
      { id: 'sub-wft-slippers', slug: 'cushioned-slides', name: 'Cushioned Everyday Comfort Slides' }
    ],
    items: [
      { name: 'Handcrafted Multani Velvet Khussa with Golden Tilla & Dabka Embroidery', price: 1899, cost: 890, fabric: 'Pure Velvet Upper with Padded Leather Sole' },
      { name: 'Traditional Kolhapuri Chappal with Ghungroo & Braided Straps', price: 1299, cost: 590, fabric: 'Handmade Genuine Leather & Thread Work' },
      { name: 'Party Wear Block Heel Sandals with Transparent Strap & Crystal Buckle', price: 2499, cost: 1200, fabric: 'Synthetic Leather + Padded Insole 2.5 Inch Heel' },
      { name: 'Ultra Soft Cloud Cushioned Orthopedic Comfort Slippers', price: 999, cost: 420, fabric: 'High Density Anti-Slip EVA Foam' },
      { name: 'Bridal Gold Zari Embroidered Pointed Toe Flat Khussa', price: 1799, cost: 850, fabric: 'Raw Silk Upper with Double Cushioning' }
    ]
  },
  {
    id: 'cat-fragrances-perfumes',
    slug: 'fragrances-perfumes',
    codePrefix: 'FRG',
    name: 'Perfumes, Attar & Fragrances',
    urduName: 'خوشبو، پرفیوم اور خالص عطر',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['J. Fragrance Look', 'Saeed Ghani Style', 'Rasasi Replica', 'Lattafa Look', 'Al-Rehab Attar', 'Swiss Arabian Look'],
    subcategories: [
      { id: 'sub-frg-men', slug: 'mens-perfumes', name: 'Long-Lasting Men EDP Perfumes' },
      { id: 'sub-frg-women', slug: 'womens-perfumes', name: 'Floral & Sweet Women Perfumes' },
      { id: 'sub-frg-attar', slug: 'pure-attars', name: 'Alcohol-Free Oudh & Kasturi Attars' },
      { id: 'sub-frg-bodymists', slug: 'body-mists', name: 'Refreshing Daily Scented Body Mists' }
    ],
    items: [
      { name: 'Luxury Long-Lasting Men Eau de Parfum (100ml Spray Bottle)', price: 1899, cost: 850, fabric: 'Woody Spicy Scent Profile with 12H Longevity' },
      { name: 'Sweet Floral Romance Women Eau de Parfum (100ml Glass Bottle)', price: 1799, cost: 800, fabric: 'Jasmine, Rose & Vanilla Long-Lasting Notes' },
      { name: 'Alcohol-Free Concentrated Arabian Oudh Attar Roll-On (12ml)', price: 899, cost: 380, fabric: '100% Pure Organic Essential Oil Blend' },
      { name: 'Sparkling Vanilla Daily Refreshing Body Mist Spray (250ml)', price: 999, cost: 420, fabric: 'Moisturizing Scented Body Splash' },
      { name: 'Executive Pocket Perfume Spray Set (Pack of 4 Scent Varieties, 20ml each)', price: 1299, cost: 550, fabric: 'Compact Travel Friendly Long-Lasting EDP' }
    ]
  },
  {
    id: 'cat-mens-unstitched',
    slug: 'mens-unstitched',
    codePrefix: 'MUN',
    name: "Men's Unstitched & Boski",
    urduName: 'مردانہ ان سلے کپڑے اور بوسکی',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['Pasha Fabrics Style', 'Gohar Boski House', 'J. Fabric Look', 'Grace Fabrics Style', 'Lawrencepur Look', 'Alkaram Men Fabric'],
    subcategories: [
      { id: 'sub-mun-boski', slug: 'boski-silk-fabric', name: 'Original Chinese Boski (6, 8, 10 Pounds)' },
      { id: 'sub-mun-cotton', slug: 'egyptian-cotton', name: '100% Egyptian Giza Cotton Suit' },
      { id: 'sub-mun-washwear', slug: 'wash-and-wear', name: 'Wrinkle-Free Wash & Wear Fabric' },
      { id: 'sub-mun-karandi', slug: 'karandi-winter', name: 'Pure Karandi & Wool Blend Suits' }
    ],
    items: [
      { name: 'Unstitched Luxury Chinese Boski Silk Fabric (8 Pounds, 4.5 Meters)', price: 3999, cost: 1950, fabric: 'Original Spun Silk Chinese Boski 8lbs' },
      { name: '100% Superfine Egyptian Cotton Unstitched Suit with Collar/Cuff Buttons', price: 2899, cost: 1400, fabric: 'Long Staple Egyptian Giza Cotton' },
      { name: 'Wrinkle-Free Premium Wash & Wear Men Suit Fabric (Summer/All-Season)', price: 2199, cost: 1050, fabric: 'High Twist Microfiber Poly-Viscose' },
      { name: 'Handspun Textured Karandi Winter Suit Fabric for Men', price: 3299, cost: 1600, fabric: 'Pure Slub Karandi with Soft Finish' },
      { name: 'Traditional White Cotton Latha Fabric (Export Quality, 4.5 Meters)', price: 1899, cost: 890, fabric: 'High Density Crisp Cotton Latha' }
    ]
  },
  {
    id: 'cat-mens-stitched',
    slug: 'mens-stitched',
    codePrefix: 'MST',
    name: "Men's Stitched & Kurtas",
    urduName: 'مردانہ سلے ہوئے کرتے اور شلوار قمیض',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['J. Junaid Jamshed Look', 'MTJ Menswear', 'Edenrobe Man', 'Diners Stitched', 'Charcoal Pret', 'Cambridge Kurta'],
    subcategories: [
      { id: 'sub-mst-kurta', slug: 'stitched-kurtas', name: 'Embroidered & Solid Men Kurtas' },
      { id: 'sub-mst-suit', slug: 'shalwar-kameez-suits', name: 'Complete Stitched Shalwar Kameez Suits' },
      { id: 'sub-mst-waistcoats', slug: 'prince-waistcoats', name: 'Jamawar & Tropical Waistcoats' },
      { id: 'sub-mst-pajamas', slug: 'trouser-pajamas', name: 'Straight Trousers & Pajamas' }
    ],
    items: [
      { name: 'Stitched Wash & Wear Shalwar Kameez Suit with Embroidered Ban Collar', price: 2799, cost: 1350, fabric: 'Wrinkle-Resistant Wash & Wear Fabric' },
      { name: 'Casual Cotton Stitched Kurta with Wooden Buttons & Cuffs', price: 1699, cost: 790, fabric: '100% Breathable Combed Cotton' },
      { name: 'Festive Jamawar Prince Waistcoat with Gold Metal Buttons', price: 2999, cost: 1450, fabric: 'Self Weave Jamawar with Satin Lining' },
      { name: 'Embroidered Neckline Formal Kurta Pajama Set for Weddings/Eid', price: 3499, cost: 1700, fabric: 'Fine Jacquard Cotton Blend' },
      { name: 'Minimalist Stitched Kurta with Cuffed Sleeves & Pocket Detail', price: 1899, cost: 900, fabric: 'Dobby Weave Textured Cotton' }
    ]
  },
  {
    id: 'cat-watches',
    slug: 'watches',
    codePrefix: 'WTC',
    name: "Men's & Women's Watches",
    urduName: 'مردانہ اور زنانہ لگژری گھڑیاں',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Curren', 'Naviforce', 'Skmei', 'Poedagar', 'Oupinke', 'Megir', 'Lige', 'Chenxi', 'Hannah Martin'],
    subcategories: [
      { id: 'sub-wtc-chrono', slug: 'chronograph-watches', name: 'Chronograph & Stainless Steel Quartz' },
      { id: 'sub-wtc-automatic', slug: 'skeleton-automatic', name: 'Skeleton Automatic Mechanical Watches' },
      { id: 'sub-wtc-sports', slug: 'digital-sports', name: 'Waterproof Dual Display Sports Watches' },
      { id: 'sub-wtc-couples', slug: 'couple-watch-sets', name: 'Romantic Couple Watch Gift Sets' }
    ],
    items: [
      { name: 'Stainless Steel Quartz Chronograph Water Resistant Men Watch with Date', price: 2799, cost: 1350, fabric: 'Hardlex Crystal Glass + Steel Mesh Strap (30M Waterproof)' },
      { name: 'Luxury Skeleton Automatic Mechanical Watch with Luminous Hands', price: 4499, cost: 2200, fabric: 'Self-Winding Mechanical Movement + Transparent Caseback' },
      { name: 'Dual Display 50M Waterproof Military Digital Sports Watch', price: 1999, cost: 950, fabric: 'Shockproof Resin Case with EL Backlight' },
      { name: 'His & Hers Matching Luxury Couple Watch Set in Wooden Gift Box', price: 3899, cost: 1900, fabric: 'Two-Tone Stainless Steel with Roman Numerals' },
      { name: 'Minimalist Ultra-Thin Rose Gold Women Mesh Watch with Crystal Dial', price: 1799, cost: 850, fabric: 'Japanese Quartz Movement + Milanese Steel Strap' }
    ]
  },
  {
    id: 'cat-mens-wallets-belts',
    slug: 'mens-wallets-belts',
    codePrefix: 'MWB',
    name: "Men's Wallets & Belts",
    urduName: 'مردانہ لیدر والٹس اور بیلٹس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['UrbanCraft Leather', 'Hub Leather Style', 'Royal Leather PK', 'Montblanc Look', 'J. Leather Goods', 'Tommy Leather Style'],
    subcategories: [
      { id: 'sub-mwb-wallets', slug: 'bifold-wallets', name: 'Full-Grain Bifold Wallets' },
      { id: 'sub-mwb-cardholders', slug: 'rfid-cardholders', name: 'RFID Blocking Pop-Up Cardholders' },
      { id: 'sub-mwb-belts', slug: 'ratchet-belts', name: 'Automatic Ratchet Buckle Leather Belts' },
      { id: 'sub-mwb-giftsets', slug: 'gift-boxes', name: 'Executive 5-in-1 Gift Box Sets' }
    ],
    items: [
      { name: 'Genuine Cow Leather Bifold Wallet with RFID Blocking & Coin Pocket', price: 1299, cost: 580, fabric: '100% Full Grain Buff Calf Leather' },
      { name: 'Automatic Ratchet Buckle Full Grain Leather Belt for Men (35mm Width)', price: 1199, cost: 520, fabric: 'Top Layer Leather with Zinc Alloy Quick Release Buckle' },
      { name: '5-in-1 Executive Men Gift Box Set (Watch + Belt + Wallet + Pen + Keychain)', price: 3499, cost: 1700, fabric: 'Matching Leather Accessories in Deluxe Gift Box' },
      { name: 'Slim Carbon Fiber RFID Pop-Up Ejector Cardholder Wallet', price: 999, cost: 450, fabric: 'Aerospace Grade Carbon Fiber with Aluminum Core' },
      { name: 'Long Zipper Travel Passport & Currency Organizer Wallet', price: 1599, cost: 720, fabric: 'Oil Wax Vintage Leather with Multi-Card Slots' }
    ]
  },
  {
    id: 'cat-mobile-accessories',
    slug: 'mobile-accessories',
    codePrefix: 'MOB',
    name: 'Mobile Accessories & Gadgets',
    urduName: 'موبائل پاور بینکس، چارجرز اور کیبلز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Faster', 'Ronin', 'Joyroom', 'Baseus', 'Anker Look', 'Remax', 'Dany', 'Hoco'],
    subcategories: [
      { id: 'sub-mob-powerbanks', slug: 'power-banks', name: '20000mAh & 65W Fast Power Banks' },
      { id: 'sub-mob-chargers', slug: 'gan-chargers', name: '65W & 100W GaN Fast Wall Chargers' },
      { id: 'sub-mob-cables', slug: 'fast-cables', name: 'Braided 100W PD Type-C & iPhone Cables' },
      { id: 'sub-mob-tripods', slug: 'selfie-tripods', name: 'Bluetooth Selfie Sticks & Ring Lights' }
    ],
    items: [
      { name: '20000mAh 65W Fast Charging GaN Power Bank with Digital Percentage Display', price: 3699, cost: 1800, fabric: '65W PD Type-C + QC 3.0 Dual Fast Outputs' },
      { name: '10000mAh Magnetic MagSafe Wireless Power Bank with Ring Holder', price: 2499, cost: 1200, fabric: '15W Fast Qi Wireless with Strong Neodymium Magnets' },
      { name: '65W GaN Fast Wall Charger with 3 Ports (2 Type-C + 1 USB QC)', price: 2199, cost: 1050, fabric: 'GaN III Semiconductor Technology + Multi-Protection' },
      { name: 'Heavy Duty Braided 100W Type-C to Type-C Fast Charging Cable (2M)', price: 699, cost: 280, fabric: 'Nylon Braided with E-Marker Smart Chip' },
      { name: 'Bluetooth Extendable Tripod Selfie Stick with Wireless Remote & Fill Light', price: 1499, cost: 680, fabric: 'Stainless Steel Rod with 360° Rotatable Clamp' }
    ]
  },
  {
    id: 'cat-wireless-audio',
    slug: 'wireless-audio',
    codePrefix: 'AUD',
    name: 'Wireless Earbuds & Audio',
    urduName: 'وائرلیس ایئربڈز اور اسپیکرز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Joyroom', 'Audionic', 'Faster', 'Ronin', 'M10 Pro', 'Air31 Cyber', 'F9 TWS', 'Zero Lifestyle', 'Soundpeats'],
    subcategories: [
      { id: 'sub-aud-tws', slug: 'tws-earbuds', name: 'Digital Display TWS Earbuds' },
      { id: 'sub-aud-anc', slug: 'anc-earbuds', name: 'Active Noise Cancelling (ANC) Earphones' },
      { id: 'sub-aud-gaming', slug: 'gaming-earbuds', name: 'Low Latency RGB Gaming Earbuds' },
      { id: 'sub-aud-speakers', slug: 'bluetooth-speakers', name: 'Portable RGB Bluetooth Party Speakers' }
    ],
    items: [
      { name: 'M10 TWS Wireless Earbuds with 2000mAh Power Display Charging Case', price: 1399, cost: 650, fabric: 'Bluetooth 5.3 + Dual Mic Noise Reduction' },
      { name: 'Air31 Transparent Cyberpunk Crystal ENC Wireless Earbuds', price: 1699, cost: 800, fabric: 'Clear Acrylic Case with HiFi Stereo Bass' },
      { name: 'Active Noise Cancelling (ANC) Pro 6 Wireless Bluetooth Earphones', price: 2999, cost: 1450, fabric: '-35dB Hybrid ANC with Transparency Mode' },
      { name: 'Low Latency 40ms RGB Gaming Wireless Earbuds with Heavy Bass', price: 1899, cost: 900, fabric: 'Dual Gaming Mode with Breathing LED Light' },
      { name: 'Portable RGB Bluetooth Karaoke Speaker with Wireless Microphone', price: 3299, cost: 1600, fabric: '20W Deep Bass Subwoofer with Party Lights' }
    ]
  },
  {
    id: 'cat-smart-watches',
    slug: 'smart-watches',
    codePrefix: 'SMW',
    name: 'Smart Watches & Fitness Bands',
    urduName: 'اسمارٹ واچز اور فٹنس بینڈز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Ultra 2 Pro', 'HK9 Ultra', 'T800 Ultra', 'T900 Big', 'Zero Lifestyle', 'Kieslect', 'Mibro', 'Yolo Smart'],
    subcategories: [
      { id: 'sub-smw-amoled', slug: 'amoled-smartwatches', name: 'AMOLED Screen Calling Watches' },
      { id: 'sub-smw-ultra', slug: 'ultra-series-watches', name: 'Ultra 2 & Series 9 Smartwatches' },
      { id: 'sub-smw-straps', slug: 'straps-cases', name: 'Ocean & Trail Loop Watch Straps' },
      { id: 'sub-smw-bands', slug: 'fitness-bands', name: 'Heart Rate & Sleep Fitness Trackers' }
    ],
    items: [
      { name: 'Ultra 2 Smartwatch with 2.02" AMOLED Display & Bluetooth Calling', price: 3899, cost: 1900, fabric: 'Full Metal Zinc Case + Wireless Charging Dock' },
      { name: 'T800 Ultra Big Screen Smart Watch with 7 Free Straps & Screen Protector', price: 2199, cost: 1050, fabric: 'Heart Rate, Blood Oxygen & Multi-Sport Tracking' },
      { name: 'HK9 Pro+ AMOLED Smart Watch with ChatGPT & Gesture Control', price: 4499, cost: 2200, fabric: 'High Refresh Rate AMOLED + Dynamic Island' },
      { name: 'Waterproof Fitness Tracker Band with Step Counter & Sleep Monitor', price: 1399, cost: 650, fabric: 'IP67 Waterproof with USB Direct Plug Charge' },
      { name: 'Series 9 Smart Watch with Stainless Steel Case & Ocean Band', price: 2899, cost: 1400, fabric: 'NFC Access + Bluetooth Phone Calling' }
    ]
  },
  {
    id: 'cat-kitchen-tools',
    slug: 'kitchen-tools',
    codePrefix: 'KTL',
    name: 'Kitchen Tools & Cookware',
    urduName: 'کچن برتن، ایئر فرائر لائنرز اور کٹرز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['ChefMaster', 'DecoStyle', 'IKEA Replica', 'Prestige Look', 'SmartSpace', 'NonStick Pro'],
    subcategories: [
      { id: 'sub-ktl-airfryer', slug: 'air-fryer-accessories', name: 'Reusable Silicone Air Fryer Liners' },
      { id: 'sub-ktl-spiceracks', slug: 'spice-racks', name: '360° Rotating Spice Jar Racks' },
      { id: 'sub-ktl-slicers', slug: 'vegetable-cutters', name: '9-in-1 Multifunction Vegetable Cutters' },
      { id: 'sub-ktl-pans', slug: 'granite-cookware', name: 'Granite Die-Cast Non-Stick Pans' }
    ],
    items: [
      { name: 'Reusable Food-Grade Non-Stick Silicone Air Fryer Liners (Pack of 2 Pots)', price: 899, cost: 380, fabric: 'Heat Resistant Silicone (-40°C to 240°C)' },
      { name: '360° Rotating Multi-Tier Kitchen Spice & Seasoning Jar Organizer Rack', price: 1899, cost: 900, fabric: 'Heavy Duty Rust-Proof Carbon Steel' },
      { name: '9-in-1 Multifunction Vegetable Slicer Cutter with Drain Basket & 8 Blades', price: 1399, cost: 650, fabric: 'Food Grade ABS + Razor Sharp S/S Blades' },
      { name: '3-Piece Granite Non-Stick Frying Pan & Wok Set with Tempered Glass Lids', price: 4499, cost: 2200, fabric: 'Multi-Layer Granite Coating + Induction Base' },
      { name: 'Vacuum Food Sealer Machine for Fresh Meat & Dry Storage (with 10 Bags)', price: 2199, cost: 1050, fabric: 'High Suction Compact Sealer Machine' }
    ]
  },
  {
    id: 'cat-home-appliances',
    slug: 'home-appliances',
    codePrefix: 'HAP',
    name: 'Home Appliances & Choppers',
    urduName: 'الیکٹرک چوپر، بلینڈر اور کچن مشینز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['SilverCrest', 'KitchenChef', 'Anex Master', 'Sogo PK', 'Geepas Pro', 'Westpoint Style', 'Sonifer'],
    subcategories: [
      { id: 'sub-hap-choppers', slug: 'electric-choppers', name: '2L & 3L Stainless Steel Meat Choppers' },
      { id: 'sub-hap-blenders', slug: 'portable-blenders', name: '6-Blade Rechargeable USB Juicers' },
      { id: 'sub-hap-kettles', slug: 'electric-kettles', name: '2.0L Fast Boil Stainless Kettles' },
      { id: 'sub-hap-irons', slug: 'steam-irons', name: 'Handheld Garment Steam Irons' }
    ],
    items: [
      { name: '2L Stainless Steel Electric Meat & Vegetable Food Chopper (4-Blade Heavy Motor)', price: 2699, cost: 1300, fabric: 'Pure Copper 400W Motor + 304 Steel Bowl' },
      { name: '3L Heavy Duty Commercial Food Processor with Borosilicate Glass Bowl', price: 3499, cost: 1700, fabric: '500W Copper Motor + S/S Titanium Blades' },
      { name: 'Rechargeable USB 6-Blade Portable Mini Juicer & Smoothie Blender', price: 1499, cost: 700, fabric: 'BPA-Free Food Grade Tritan + 2000mAh Battery' },
      { name: '2.0L Cordless Fast-Boil Stainless Steel Electric Kettle with Auto Cutoff', price: 1799, cost: 850, fabric: 'Food Grade Stainless Steel with Dry-Boil Safety' },
      { name: 'Portable Handheld Foldable Garment Steam Iron for Travel & Home', price: 2399, cost: 1150, fabric: 'Ceramic Soleplate with 1000W Quick Steam' }
    ]
  },
  {
    id: 'cat-bedding-linen',
    slug: 'bedding-linen',
    codePrefix: 'BED',
    name: 'Bedding & Home Linen',
    urduName: 'بیڈ شیٹس اور ہوم ٹیکسٹائل',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['ChenOne Style', 'Gul Ahmed Home', 'Nishat Linen Bedding', 'Alkaram Home', 'HomeComfort PK', 'LinenKraft'],
    subcategories: [
      { id: 'sub-bed-kingsize', slug: 'king-bedsheets', name: 'King Size 3-Piece Printed Cotton Bed Sheets' },
      { id: 'sub-bed-fitted', slug: 'fitted-sheets', name: 'Elastic All-Around Waterproof Fitted Sheets' },
      { id: 'sub-bed-comforters', slug: 'comforter-sets', name: 'Quilted Lightweight Summer Comforters' },
      { id: 'sub-bed-pillows', slug: 'memory-pillows', name: 'Orthopedic Neck Memory Foam Pillows' }
    ],
    items: [
      { name: 'King Size 3-Piece Export Quality Cotton Printed Bed Sheet Set (1 Sheet + 2 Pillow Covers)', price: 1899, cost: 920, fabric: '100% Breathable Cotton (180 Thread Count)' },
      { name: '100% Waterproof Mattress Protector Fitted Sheet with Elastic All-Around', price: 1499, cost: 700, fabric: 'Terry Cotton Top with TPU Waterproof Membrane' },
      { name: '6-Piece Luxury Silk Embroidered Bridal Bedding & Comforter Set', price: 6999, cost: 3500, fabric: 'Katan Silk with Microfiber Filling' },
      { name: 'Ergonomic Cervical Contour Memory Foam Pillow for Neck Pain Relief', price: 1699, cost: 790, fabric: 'Slow Rebound Memory Foam with Washable Bamboo Cover' },
      { name: 'Ultra Soft Flannel Fleece Warm Blanket for AC / Mild Winter', price: 1599, cost: 750, fabric: '350 GSM Double-Sided Microfiber Flannel' }
    ]
  },
  {
    id: 'cat-home-decor',
    slug: 'home-decor',
    codePrefix: 'DEC',
    name: 'Home Decor & Lighting',
    urduName: 'ہوم ڈیکوریشن، سن سیٹ لیمپس اور فینسی لائٹس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['DecoCraft PK', 'LumaHome', 'GlowCraft', 'Vintage Art PK', 'Nordic Decor Style', 'Ambient Lights'],
    subcategories: [
      { id: 'sub-dec-lamps', slug: 'sunset-projection-lamps', name: 'RGB Sunset Ambience Projection Lamps' },
      { id: 'sub-dec-ledstrips', slug: 'smart-led-strips', name: '5M / 10M Smart RGB LED Strip Lights' },
      { id: 'sub-dec-wallart', slug: 'islamic-wall-art', name: '3D Laser Cut Acrylic Islamic Wall Art' },
      { id: 'sub-dec-clocks', slug: '3d-wall-clocks', name: 'Modern 3D DIY Frameless Wall Clocks' }
    ],
    items: [
      { name: 'Smart RGB Sunset Ambience Projection Lamp with 16 Colors & Remote Control', price: 1199, cost: 520, fabric: 'High Clarity Optical Lens + Aluminum Alloy Body' },
      { name: '5-Meter Smart RGB LED Strip Light with App Bluetooth & Music Sync', price: 1399, cost: 620, fabric: 'SMD 5050 Waterproof LEDs with 3M Adhesive' },
      { name: '3D Acrylic Mirror Finish Islamic Calligraphy Wall Art (Ayat-ul-Kursi)', price: 1899, cost: 850, fabric: 'High Gloss Laser Cut Acrylic on Wood Base' },
      { name: 'Large 3D Frameless DIY Quartz Wall Clock with Mirror Numbers', price: 999, cost: 420, fabric: 'Silent Sweep Quartz Movement with EVA Foam Backing' },
      { name: 'Nordic Minimalist Ceramic Flower Vase Set for Living Room Table Decor', price: 1499, cost: 680, fabric: 'Handcrafted Unglazed Matte Ceramic' }
    ]
  },
  {
    id: 'cat-storage-organizers',
    slug: 'storage-organizers',
    codePrefix: 'STO',
    name: 'Home Organizers & Storage',
    urduName: 'کپڑوں کے باکس اور اسٹوریج آرگنائزر',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['OrganizePro', 'SmartSpace PK', 'HomeComfort', 'BoxCraft', 'DecoStyle Space'],
    subcategories: [
      { id: 'sub-sto-wardrobe', slug: 'wardrobe-boxes', name: 'Foldable Steel Frame Clothes Storage Boxes' },
      { id: 'sub-sto-shoes', slug: 'shoe-racks', name: 'Multi-Tier Stackable Shoe Organizers' },
      { id: 'sub-sto-bathroom', slug: 'shower-caddies', name: 'Self-Adhesive Bathroom Shower Caddy Racks' },
      { id: 'sub-sto-makeup', slug: 'makeup-organizers', name: '360° Rotating Acrylic Makeup Organizers' }
    ],
    items: [
      { name: 'Foldable Wardrobe Clothes Storage Box with Heavy Steel Frame & Clear Window (66L)', price: 1299, cost: 600, fabric: 'Waterproof Oxford Cloth + Galvanized Steel Frame' },
      { name: 'Wall Mounted Self Adhesive Bathroom Shower Caddy Rack Shelf (Pack of 2)', price: 999, cost: 450, fabric: 'Rustproof Aluminum Alloy with Strong Adhesive' },
      { name: '360° Rotating Acrylic Makeup & Cosmetics Storage Carousel Stand', price: 1599, cost: 720, fabric: 'High Transparency Durable Diamond Acrylic' },
      { name: '6-Grid Wall Mounted Cereal & Dry Grain Dispenser Container', price: 2499, cost: 1200, fabric: 'Food Grade Transparent ABS Plastic' },
      { name: '4-Tier Stackable Foldable Shoe Rack Storage Organizer Shelf', price: 1199, cost: 550, fabric: 'Thickened PP Plastic with Steel Tubes' }
    ]
  },
  {
    id: 'cat-home-linen',
    slug: 'home-linen',
    codePrefix: 'HLN',
    name: 'Home Linen & Towels',
    urduName: 'تولیے، صوفہ کور اور کشن کور',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['CottonKraft PK', 'LinenStyle', 'CozyHome', 'TextileHub Faisalabad'],
    subcategories: [
      { id: 'sub-hln-sofa', slug: 'sofa-covers', name: 'Stretchable Universal 7-Seater Sofa Covers' },
      { id: 'sub-hln-towels', slug: 'bath-towels', name: '100% Pure Egyptian Cotton Bath Towels' },
      { id: 'sub-hln-cushions', slug: 'cushion-covers', name: 'Velvet Digital Printed Cushion Covers' }
    ],
    items: [
      { name: 'Universal Elastic Jacquard Stretchable 7-Seater Sofa Cover Set (3+2+1+1)', price: 4499, cost: 2200, fabric: 'High Elasticity Jacquard Spandex Blend' },
      { name: '100% Combed Cotton Heavyweight Ultra Absorbent Bath Towel (Pack of 2)', price: 1599, cost: 750, fabric: '600 GSM Egyptian Cotton Zero Twist' },
      { name: 'Set of 5 Digital Printed Luxury Velvet Square Cushion Covers (16x16 Inch)', price: 1299, cost: 580, fabric: 'Micro Velvet with Concealed Zipper' }
    ]
  },
  {
    id: 'cat-automotive-accessories',
    slug: 'automotive-accessories',
    codePrefix: 'AUT',
    name: 'Automotive Accessories',
    urduName: 'گاڑی کا سامان، ڈیش کیم اور ویکیوم',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['70mai Style', 'BlackBox Pro', 'RoadMaster', 'AutoTech PK', 'Baseus Car', 'CarLife', 'DriveSafe'],
    subcategories: [
      { id: 'sub-aut-dashcams', slug: 'car-dashcams', name: '4K Ultra HD Dual Dash Cameras' },
      { id: 'sub-aut-mounts', slug: 'car-holders', name: 'Qi Auto-Clamping Phone Mounts' },
      { id: 'sub-aut-vacuums', slug: 'car-vacuums', name: '120W Cordless Handheld Car Vacuums' },
      { id: 'sub-aut-inflators', slug: 'tyre-inflators', name: 'Digital Portable Tyre Air Compressors' }
    ],
    items: [
      { name: '4K Ultra HD Dual Lens Front & Rear Car Dash Camera with Night Vision & G-Sensor', price: 4499, cost: 2200, fabric: 'Sony Starvis Sensor + 170° Wide Angle Recording' },
      { name: '15W Fast Qi Wireless Auto-Clamping Smart Car Phone Mount with Air Vent Clip', price: 1699, cost: 780, fabric: 'Smart Infrared Sensor with 360° Swivel Ball' },
      { name: '120W High Power Cordless Handheld Car Vacuum Cleaner with Washable HEPA Filter', price: 1899, cost: 890, fabric: '6000PA Strong Suction with 2000mAh Battery' },
      { name: 'Digital Portable Tyre Inflator Air Compressor with Auto Shutoff & LED Light', price: 3299, cost: 1550, fabric: '150 PSI High Pressure Inflation with Digital Gauge' },
      { name: 'Bluetooth 5.0 FM Transmitter & Car MP3 Player with Dual Fast USB Charging', price: 1199, cost: 520, fabric: 'Handsfree Calling with Bass Boost Button' }
    ]
  },
  {
    id: 'cat-bike-gear',
    slug: 'bike-gear',
    codePrefix: 'BIK',
    name: 'Bike Gear & Accessories',
    urduName: 'موٹر بائیک کور، دستانے اور لائٹس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['RiderPro PK', 'MotorGuard', 'Bikerz Style', 'SpeedMaster', 'SafeRide PK'],
    subcategories: [
      { id: 'sub-bik-covers', slug: 'waterproof-bike-covers', name: 'Heavy Duty Waterproof Bike Covers' },
      { id: 'sub-bik-gloves', slug: 'riding-gloves', name: 'Touchscreen Thermal Riding Gloves' },
      { id: 'sub-bik-lights', slug: 'led-headlights', name: 'High Power 6-LED Auxiliary Fog Lights' },
      { id: 'sub-bik-locks', slug: 'disc-locks', name: 'Heavy Duty Alarm Disc Brake Locks' }
    ],
    items: [
      { name: 'Heavy Duty All-Weather Waterproof Motorcycle Body Cover with Lock Hole', price: 1299, cost: 580, fabric: '190T Silver Coated Polyester UV Protection' },
      { name: 'Touchscreen Thermal Winter Motorcycle Riding Gloves with Carbon Armor Knuckles', price: 1499, cost: 680, fabric: 'Hard Knuckle Armor + Non-Slip Silicone Palm' },
      { name: 'Universal 6-LED Waterproof Auxiliary Fog Headlights for Motorbikes (Pair)', price: 1599, cost: 720, fabric: 'Die-Cast Aluminum Casing with 6000K Pure White' },
      { name: '110dB Siren Security Anti-Theft Disc Brake Lock with 2 Keys', price: 1399, cost: 620, fabric: 'Heavy Stainless Steel with Shock Alarm Sensor' },
      { name: 'Waterproof Handlebar Mobile Phone Holder Pouch with Touch Window', price: 899, cost: 380, fabric: 'EVA Hard Shell with Sun Visor Clamp' }
    ]
  },
  {
    id: 'cat-kids-baby-clothing',
    slug: 'kids-baby-clothing',
    codePrefix: 'KCL',
    name: "Kids' Clothing & Frocks",
    urduName: 'بچوں کے سوٹ اور فراکس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['JuniorClub PK', 'LittleStar', 'BabyJoy', 'KidsCouture', 'Hopscotch Look', 'MinnieKids'],
    subcategories: [
      { id: 'sub-kcl-rompers', slug: 'baby-rompers', name: '100% Cotton Baby Rompers & Bodysuits' },
      { id: 'sub-kcl-girls', slug: 'girls-frocks', name: 'Stitched Girls Frocks & Party Wear' },
      { id: 'sub-kcl-boys', slug: 'boys-suits', name: 'Boys Stitched Kurta & Baba Suits' },
      { id: 'sub-kcl-winter', slug: 'kids-winter-wear', name: 'Kids Velvet & Fleece Winter Suits' }
    ],
    items: [
      { name: '100% Organic Soft Cotton Baby Romper Jumpsuit (Pack of 3 Colors)', price: 1499, cost: 680, fabric: '100% Breathable Combed Cotton with Snaps' },
      { name: 'Girls Stitched Net Party Frock Dress with Ribbon Bow & Pearl Work', price: 1899, cost: 890, fabric: 'Soft Net with Cotton Inner Lining' },
      { name: 'Boys Traditional Embroidered Kurta Shalwar Suit Set (1-8 Years)', price: 1699, cost: 780, fabric: 'Wrinkle-Free Wash & Wear Cotton' },
      { name: 'Kids Velvet Warm Winter 2-Piece Sweatshirt & Trouser Suit', price: 1999, cost: 950, fabric: 'Super Soft Micro Velvet with Warm Inner' },
      { name: 'Newborn Baby 5-Piece Welcome Gift Set (Romper + Cap + Mitten + Bib)', price: 1399, cost: 620, fabric: 'Hypoallergenic Ultra Soft Cotton' }
    ]
  },
  {
    id: 'cat-kids-accessories',
    slug: 'kids-accessories',
    codePrefix: 'KAC',
    name: "Kids' Accessories & Shoes",
    urduName: 'بچوں کے اسکول بیگز اور جوتے',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['KidsPlay PK', 'CartoonBags', 'TinySteps', 'JuniorStyle'],
    subcategories: [
      { id: 'sub-kac-shoes', slug: 'kids-shoes', name: 'LED Light-Up Shoes & Sneakers for Kids' },
      { id: 'sub-kac-bags', slug: 'school-bags', name: 'Waterproof 3D Cartoon School Backpacks' }
    ],
    items: [
      { name: 'Kids USB Rechargeable LED Light Up Glowing Casual Sneakers', price: 1899, cost: 890, fabric: 'Breathable Knitted Mesh + Rubber LED Sole' },
      { name: 'Orthopedic Spine Protection 3D Cartoon Kids School Backpack', price: 2199, cost: 1050, fabric: 'Waterproof High-Density Polyester' }
    ]
  },
  {
    id: 'cat-baby-care-gear',
    slug: 'baby-care-gear',
    codePrefix: 'BCG',
    name: 'Mother & Baby Care Gear',
    urduName: 'بے بی کیئر، کیریئر اور فیڈرز',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['SmartBaby', 'Chicco Style', 'BabyComfort', 'Mothercare Look', 'Pigeon Replica', 'CareZone'],
    subcategories: [
      { id: 'sub-bcg-carriers', slug: 'baby-carriers', name: '4-in-1 Ergonomic Hip Seat Carriers' },
      { id: 'sub-bcg-grooming', slug: 'baby-grooming', name: 'Electric Safe Baby Nail Trimmers' },
      { id: 'sub-bcg-feeders', slug: 'silicone-feeders', name: 'Silicone Fruit Teethers & Feeders' },
      { id: 'sub-bcg-pillows', slug: 'nursing-pillows', name: 'Baby Head Shaping Nursing Pillows' }
    ],
    items: [
      { name: '4-in-1 Ergonomic Breathable Baby Carrier with Detachable Hip Seat (0-36 Months)', price: 2399, cost: 1150, fabric: '100% Breathable Soft Cotton with Padded Waist' },
      { name: 'Electric Safe Baby Nail Trimmer with LED Light & 6 Grinding Heads', price: 1199, cost: 520, fabric: 'Whisper Quiet Motor + Non-Hurting Cushion Pads' },
      { name: 'Food Grade Soft Silicone Baby Fruit Teether & Pacifier Feeder Set', price: 699, cost: 280, fabric: 'BPA-Free Food Grade Silicone + PP Handle' },
      { name: 'Anti-Flat Head Baby Shaping Pillow with Breathable Velvet Cover', price: 999, cost: 420, fabric: 'Memory Foam with Soft Microfiber Cover' },
      { name: 'Portable Foldable Baby Diaper Changing Bag with Built-In Changing Mat', price: 1899, cost: 890, fabric: 'Waterproof Oxford Fabric with Thermal Pockets' }
    ]
  },
  {
    id: 'cat-stationery-office',
    slug: 'stationery-office',
    codePrefix: 'STN',
    name: 'Books & Stationery',
    urduName: 'اسٹیشنری، بکس اور آفس کا سامان',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['Deli Style', 'Piano PK', 'Dollar Look', 'ArtMaster', 'OfficeSmart', 'PaperCraft'],
    subcategories: [
      { id: 'sub-stn-printers', slug: 'thermal-printers', name: 'Mini Portable Bluetooth Thermal Printers' },
      { id: 'sub-stn-markers', slug: 'art-markers', name: '48 / 80 Color Dual Tip Art Alcohol Markers' },
      { id: 'sub-stn-diaries', slug: 'executive-diaries', name: 'Leather Executive Planners & Journals' },
      { id: 'sub-stn-calculators', slug: 'scientific-calculators', name: 'Scientific Calculators & Desk Organizers' }
    ],
    items: [
      { name: 'Mini Portable Wireless Bluetooth Thermal Pocket Printer for Notes & Photos', price: 2499, cost: 1200, fabric: 'Inkless Thermal Printing Technology + 5 Free Paper Rolls' },
      { name: '48-Color Dual Tip Alcohol Art Marker Pen Set in Zipper Storage Bag', price: 1899, cost: 890, fabric: 'Broad & Fine Dual Nibs with Quick-Drying Ink' },
      { name: 'Executive Faux Leather A5 Daily Planner & Notebook with Metal Lock', price: 1199, cost: 520, fabric: 'Thick 100 GSM Bleed-Proof Ruled Pages' },
      { name: 'Multi-Compartment Wooden Desktop Stationery & Pen Organizer Stand', price: 1399, cost: 650, fabric: 'Eco-Friendly High Density Composite Wood' },
      { name: 'Ergonomic Mesh Lumbar Support Back Cushion for Office Chairs', price: 999, cost: 420, fabric: 'Breathable Mesh with Massage Acupressure Beads' }
    ]
  },
  {
    id: 'cat-islamic-accessories',
    slug: 'islamic-accessories',
    codePrefix: 'ISL',
    name: 'Islamic Accessories & Gifts',
    urduName: 'اسلامک جائے نماز، تسبیح اور کیپس',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['Al-Haramain PK', 'Madinah Gifts', 'Barkat Islamic', 'Noor-e-Haram'],
    subcategories: [
      { id: 'sub-isl-mats', slug: 'prayer-mats', name: 'Padded Orthopedic Velvet Janamaz (Prayer Mats)' },
      { id: 'sub-isl-tasbeeh', slug: 'digital-tasbeeh', name: 'LED Digital Tally Counter Tasbeeh Beads' }
    ],
    items: [
      { name: 'Ultra Thick Memory Foam Orthopedic Padded Velvet Prayer Mat (Janamaz)', price: 1899, cost: 890, fabric: 'Embossed Floral Velvet with 20mm Foam Padded Base' },
      { name: 'Digital Finger Tally Counter Tasbeeh with LED Light Display & Reset', price: 499, cost: 190, fabric: 'Ergonomic ABS Casing with Silicone Strap' }
    ]
  },
  {
    id: 'cat-undergarments',
    slug: 'undergarments',
    codePrefix: 'UNG',
    name: "Women's Innerwear & Shapewear",
    urduName: 'خواتین کے انر ویئر اور شیپ ویئر',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['BodyComfort PK', 'LaceSecret', 'FlawlessFit', 'SilkyTouch'],
    subcategories: [
      { id: 'sub-ung-bras', slug: 'comfort-bras', name: 'Seamless Wirefree Breathable Everyday Bras' },
      { id: 'sub-ung-shapewear', slug: 'tummy-shapers', name: 'High Waist Tummy Shaper Panties' }
    ],
    items: [
      { name: 'Seamless Non-Padded Wirefree Air Breathable Everyday Comfort Bra (Pack of 3)', price: 1499, cost: 680, fabric: 'Nylon Microfiber Spandex with Breathable Mesh' },
      { name: 'High Waist Tummy Control Body Shaper Slimming Panty', price: 1199, cost: 520, fabric: 'Strong Elastic Compression Fabric with Anti-Roll Bones' }
    ]
  },
  {
    id: 'cat-mens-western',
    slug: 'mens-western',
    codePrefix: 'MWS',
    name: "Men's Western & Casual",
    urduName: 'مردانہ ٹی شرٹس، پولو اور ٹریک سوٹ',
    icon: 'Sparkles',
    itemCount: 50,
    featured: false,
    brands: ['Outfitters Style', 'Breakout Look', 'Engine Replica', 'Cougar Style', 'Levis Look', 'Polo Ralph Style'],
    subcategories: [
      { id: 'sub-mws-polo', slug: 'polo-shirts', name: 'Classic Pique Cotton Polo Shirts' },
      { id: 'sub-mws-tshirts', slug: 'graphic-tshirts', name: 'Round Neck Graphic & Solid T-Shirts' },
      { id: 'sub-mws-tracksuits', slug: 'gym-tracksuits', name: 'Fleece & Dry-Fit Tracksuit Sets' },
      { id: 'sub-mws-jeans', slug: 'denim-jeans', name: 'Stretchable Slim Fit Denim Jeans' }
    ],
    items: [
      { name: 'Classic Solid Pique Cotton Polo Shirt with Ribbed Collar', price: 1299, cost: 580, fabric: '100% Ring Spun Pique Cotton (220 GSM)' },
      { name: 'Winter Warm Fleece Tracksuit Set (Hoodie Jacket + Jogger Pants)', price: 2799, cost: 1350, fabric: 'Heavyweight Cotton Fleece with Brushed Inner' },
      { name: 'Stretchable Slim Fit Denim Jeans with 5 Pockets (Export Quality)', price: 1999, cost: 950, fabric: 'Cotton Denim with 2% Elastane Spandex' },
      { name: 'Casual Graphic Printed Crewneck T-Shirt (Pack of 2)', price: 1399, cost: 620, fabric: 'Pre-Shrunk 100% Combed Cotton' },
      { name: 'Dry-Fit Breathable Gym Workout T-Shirt & Shorts Combo', price: 1699, cost: 780, fabric: 'Moisture Wicking Polyester Spandex' }
    ]
  },
  {
    id: 'cat-branded-collections',
    slug: 'branded-collections',
    codePrefix: 'BRD',
    name: 'Branded Direct Wholesale',
    urduName: 'ڈائریکٹ فیکٹری برانڈڈ کلیکشن',
    icon: 'Sparkles',
    itemCount: 50,
    featured: true,
    brands: ['Black Camel', 'Farmland PK', 'Zero & Beyond', 'Royal Brands', 'Sourcing Elite'],
    subcategories: [
      { id: 'sub-brd-luxury', slug: 'luxury-wholesale', name: 'Factory Direct Sourced Master Collections' }
    ],
    items: [
      { name: 'Export Quality Premium Direct Factory Sourced Master Collection Suit', price: 3499, cost: 1700, fabric: 'High Grade Authentic Factory Direct Fabric' }
    ]
  }
];

// Rich attribute matrix to produce 50 distinct items per category
const EDITIONS = [
  'Pro Edition', 'Special Festive Series', 'Limited Master Series', 'Classic Series',
  'Luxury Collection', 'Standard Edition', 'Elite Series', 'Summer Special', 'Winter Edition',
  'Royal Collection', 'Signature Series', 'Exclusive Edition', 'Premium Pack', 'Export Quality',
  'Gold Edition', 'Supreme Pack', 'Heritage Series', 'Ultra Edition', 'Prime Collection', 'Mastercraft Edition',
  'Prestige Series', 'Executive Pack', 'Select Series', 'Grand Collection', 'Vanguard Series'
];

const COLORS = [
  'Midnight Black', 'Pearl White', 'Rose Gold', 'Royal Blue', 'Emerald Green',
  'Crimson Maroon', 'Pastel Pink', 'Champagne Gold', 'Space Grey', 'Mustard Yellow',
  'Deep Olive', 'Navy Blue', 'Silver Metallic', 'Mocha Brown', 'Teal Blue',
  'Ruby Red', 'Ivory Cream', 'Charcoal Grey', 'Sunset Coral', 'Lavender Mist',
  'Copper Bronze', 'Ice Blue', 'Forest Green', 'Burgundy Wine', 'Warm Beige'
];

const CITIES = [
  'Lahore Wholesale Hub',
  'Karachi Boulton Market Sourcing',
  'Faisalabad Textile Depot',
  'Sialkot Manufacturing Hub',
  'Rawalpindi Logistics Center',
  'Gujranwala Trade Market',
  'Multan Sourcing Depot',
  'Peshawar Wholesale Depot'
];

// Build fallback pool from all scraped Markaz images
const allScrapedList = Object.values(scrapedImages).flat();
console.log(`Global Markaz authentic CDN images pool: ${allScrapedList.length} items`);

const allProducts = [];
const seenTitles = new Set();
const seenSlugs = new Set();
const seenSKUs = new Set();
const seenPrimaryImages = new Set();

let globalId = 1;

for (const cat of MARKAZ_OFFICIAL_33_CATEGORIES) {
  let catProductCount = 0;
  let attempt = 0;

  // Category specific authentic Markaz CDN images
  const catImages = scrapedImages[cat.slug] || [];

  while (catProductCount < 50 && attempt < 1000) {
    attempt++;

    const itemBase = cat.items[catProductCount % cat.items.length];
    const brand = cat.brands[(catProductCount + attempt) % cat.brands.length];
    const edition = EDITIONS[(catProductCount * 3 + attempt) % EDITIONS.length];
    const color = COLORS[(catProductCount * 5 + attempt) % COLORS.length];
    const city = CITIES[(catProductCount + globalId) % CITIES.length];

    const uniqueTitle = `${brand} ${itemBase.name} (${edition} - ${color})`;

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

    const sku = `MKZ-${cat.codePrefix}-${String(catProductCount + 1).padStart(4, '0')}`;
    seenSKUs.add(sku);

    const priceDelta = ((catProductCount % 7) - 3) * 50;
    const finalPrice = Math.max(499, itemBase.price + priceDelta);
    const comparePrice = Math.round((finalPrice * (1.3 + (catProductCount % 4) * 0.05)) / 50) * 50;
    const supplierCost = Math.round(itemBase.cost + priceDelta * 0.5);

    // Pick authentic Markaz CDN image
    let primaryImg = '';
    if (catImages.length > 0) {
      primaryImg = catImages[catProductCount % catImages.length];
    } else {
      primaryImg = allScrapedList[globalId % allScrapedList.length];
    }

    let secondaryImg = catImages[(catProductCount + 1) % catImages.length] || allScrapedList[(globalId + 10) % allScrapedList.length];
    let tertiaryImg = catImages[(catProductCount + 2) % catImages.length] || allScrapedList[(globalId + 20) % allScrapedList.length];

    seenPrimaryImages.add(primaryImg);

    const product = {
      id: `mkz-p-${globalId}`,
      sku: sku,
      title: uniqueTitle,
      slug: slug,
      brand: brand,
      categorySlug: cat.slug,
      subcategorySlug: cat.subcategories[catProductCount % cat.subcategories.length].slug,
      categoryName: cat.name,
      price: finalPrice,
      compareAtPrice: comparePrice,
      supplierCost: supplierCost,
      stock: 40 + ((globalId * 17) % 200),
      ordersCount: 150 + ((globalId * 31) % 4200),
      rating: Number((4.6 + ((globalId % 5) * 0.08)).toFixed(1)),
      reviewsCount: 30 + ((globalId * 7) % 550),
      freeShipping: finalPrice >= 2500 || globalId % 3 === 0,
      isFlashDeal: globalId % 4 === 0,
      isFeatured: globalId % 5 === 0,
      badge: globalId % 3 === 0 ? 'Markaz Choice' : 'Wholesale Direct',
      supplier: {
        name: `${brand} Verified Sourcing Supplier`,
        city: city,
        dispatchHours: 24,
        rating: 4.9,
        trustScore: '99% Positive'
      },
      images: [primaryImg, secondaryImg, tertiaryImg],
      variants: [
        {
          id: `v-${globalId}-1`,
          name: `${color} / Standard Pack`,
          color: color,
          size: 'Standard',
          price: finalPrice,
          stock: 40,
          sku: `${sku}-V1`
        },
        {
          id: `v-${globalId}-2`,
          name: `${color} / Pro Luxury Pack`,
          color: color,
          size: 'Pro Edition',
          price: finalPrice + 350,
          stock: 40,
          sku: `${sku}-V2`
        }
      ],
      specifications: {
        'Brand': brand,
        'Material/Fabric': itemBase.fabric,
        'Edition': edition,
        'Sourcing Hub': city,
        'Warranty': '7-Day Return & Replacement Guarantee',
        'Payment Mode': 'Cash on Delivery (COD) Nationwide',
        'Delivery Time': '24-48 Hours via TCS / Trax Express'
      },
      description: `Authentic ${uniqueTitle} sourced directly from verified Markaz wholesale suppliers. High grade ${itemBase.fabric}, guaranteed factory wholesale pricing, fast 24-hour dispatch, and 7-day return policy with Cash on Delivery nationwide across Pakistan.`
    };

    allProducts.push(product);
    catProductCount++;
    globalId++;
  }
}

// Generate category output structures
export const INITIAL_CATEGORIES = MARKAZ_OFFICIAL_33_CATEGORIES.map(c => {
  const cImages = scrapedImages[c.slug] || [];
  const heroImg = cImages[0] || allScrapedList[0];
  return {
    id: c.id,
    slug: c.slug,
    name: c.name,
    urduName: c.urduName,
    icon: c.icon,
    image: heroImg,
    itemCount: 50,
    featured: c.featured,
    subcategories: c.subcategories
  };
});

// Export to markaz-products.js and seed-products.js
const frontendCatalogPath = path.join(__dirname, '../src/data/markaz-products.js');
const serverCatalogPath = path.join(__dirname, '../server/data/seed-products.js');

const frontendFileContent = `// Auto-generated 1,650 Authentic Markaz Products with 100% Real Markaz CDN Images
export const MARKAZ_PRODUCTS_500 = ${JSON.stringify(allProducts, null, 2)};
`;

fs.writeFileSync(frontendCatalogPath, frontendFileContent, 'utf-8');
fs.writeFileSync(serverCatalogPath, frontendFileContent, 'utf-8');

// Also update mock-data.js and server seed-data.js with new category hero images
const mockDataPath = path.join(__dirname, '../src/data/mock-data.js');
const mockDataContent = `// Mock Data for FTH Mart Pakistani Marketplace (33 Markaz Categories)
import { MARKAZ_PRODUCTS_500 } from './markaz-products.js';

export const INITIAL_CATEGORIES = ${JSON.stringify(INITIAL_CATEGORIES, null, 2)};

export const INITIAL_PRODUCTS = MARKAZ_PRODUCTS_500;

export const INITIAL_COUPONS = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    fixedDiscount: 0,
    minSpend: 1500,
    description: '10% OFF for new FTH Mart customers on first order',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'FTHFREESHIP',
    discountPercent: 0,
    fixedDiscount: 180,
    minSpend: 2000,
    description: 'Free Shipping Voucher (Rs 180 Discount)',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'AZADI500',
    discountPercent: 0,
    fixedDiscount: 500,
    minSpend: 4000,
    description: 'Rs 500 Flat OFF on orders above Rs 4,000',
    expiry: '2026-10-31',
    active: true
  }
];

export const INITIAL_ORDERS = [];

export const INITIAL_ANNOUNCEMENT = '🇵🇰 Welcome to FTH Mart — Pakistan\\'s Premier Dropshipping Marketplace • Free Delivery on orders above Rs 2,000!';

export const HERO_SLIDES = [
  {
    id: 1,
    title: "Discover Premium Pakistani Dropshipping",
    subtitle: "Direct Factory Wholesale Sourcing & Fast Delivery Nationwide across 33 Categories",
    badge: "Verified Markaz Sourcing",
    image: "${INITIAL_CATEGORIES[0]?.image || 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200'}",
    buttonText: "Shop All 33 Categories",
    buttonLink: "/categories"
  }
];
`;

fs.writeFileSync(mockDataPath, mockDataContent, 'utf-8');

const serverDataPath = path.join(__dirname, '../server/data/seed-data.js');
const serverDataContent = `// Standalone 33 categories & configuration for backend server
export const INITIAL_CATEGORIES = ${JSON.stringify(INITIAL_CATEGORIES, null, 2)};

export const INITIAL_COUPONS = [
  {
    code: 'WELCOME10',
    discountPercent: 10,
    fixedDiscount: 0,
    minSpend: 1500,
    description: '10% OFF for new FTH Mart customers on first order',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'FTHFREESHIP',
    discountPercent: 0,
    fixedDiscount: 180,
    minSpend: 2000,
    description: 'Free Shipping Voucher (Rs 180 Discount)',
    expiry: '2026-12-31',
    active: true
  },
  {
    code: 'AZADI500',
    discountPercent: 0,
    fixedDiscount: 500,
    minSpend: 4000,
    description: 'Rs 500 Flat OFF on orders above Rs 4,000',
    expiry: '2026-10-31',
    active: true
  }
];

export const INITIAL_ORDERS = [];
`;

fs.writeFileSync(serverDataPath, serverDataContent, 'utf-8');

console.log('===========================================================');
console.log(`✅ Generated Total Products: ${allProducts.length}`);
console.log(`🏷️ Total Categories: ${MARKAZ_OFFICIAL_33_CATEGORIES.length} (50 per category)`);
console.log(`🚫 Zero Duplicate Titles: ${seenTitles.size === allProducts.length}`);
console.log(`🚫 Zero Duplicate Slugs: ${seenSlugs.size === allProducts.length}`);
console.log(`🚫 Zero Duplicate SKUs: ${seenSKUs.size === allProducts.length}`);
console.log(`🖼️ Sample Real Markaz Product Image: ${allProducts[0].images[0]}`);
console.log(`📁 Frontend Catalog: ${frontendCatalogPath}`);
console.log(`📁 Server Catalog: ${serverCatalogPath}`);
console.log('===========================================================');
