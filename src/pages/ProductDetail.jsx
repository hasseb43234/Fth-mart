import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Rating } from '../components/ui/Rating';
import {
  Heart,
  ShoppingCart,
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Share2,
  ChevronRight,
  Minus,
  Plus,
  Star,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  Clock,
  Sparkles,
  Calculator,
  TrendingUp,
  Store,
  MapPin,
  Award
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';
import { PAKISTAN_LOCATIONS } from '../data/pk-locations';
import { MARKAZ_PRODUCTS_500 } from '../data/markaz-products.js';
import { ProductCard } from '../components/product/ProductCard';

export const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const addRecentlyViewed = useStore((state) => state.addRecentlyViewed);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);
  const addToast = useStore((state) => state.addToast);

  // Robust product lookup by slug or ID across store & catalog
  const product = useMemo(() => {
    return (
      products.find((p) => p.slug === productSlug || p.id === productSlug) ||
      MARKAZ_PRODUCTS_500.find((p) => p.slug === productSlug || p.id === productSlug) ||
      products[0] ||
      MARKAZ_PRODUCTS_500[0]
    );
  }, [products, productSlug]);

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [isCopied, setIsCopied] = useState(false);

  // Markaz Reseller Profit Calculator State
  const [resellerPrice, setResellerPrice] = useState(
    product ? Math.round(product.price * 1.35) : 2500
  );

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      setSelectedImageIdx(0);
      setSelectedVariant(product.variants?.[0] || null);
      setResellerPrice(Math.round(product.price * 1.35));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product, addRecentlyViewed]);

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-black">Product Not Found</h2>
        <Link to="/" className="text-xs text-[#5433eb] font-semibold mt-2 inline-block">
          Return to FTH Mart Home →
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price || product.price;
  const comparePrice = selectedVariant?.compareAtPrice || product.compareAtPrice;
  const discountPercent =
    comparePrice && comparePrice > currentPrice
      ? Math.round(((comparePrice - currentPrice) / comparePrice) * 100)
      : 0;

  const supplierCost = product.supplierCost || Math.round(currentPrice * 0.55);
  const calculatedResellerProfit = Math.max(0, resellerPrice - currentPrice);

  // Related products from same category
  const relatedProducts = (products.length > 0 ? products : MARKAZ_PRODUCTS_500)
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
    addToast?.({
      title: 'Added to Cart',
      message: `${product.title} has been added to your bag.`,
      type: 'success'
    });
  };

  const handleBuyNow = () => {
    addToCart(product, selectedVariant, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
      addToast?.({
        title: 'Link Copied',
        message: 'Product link copied to clipboard.',
        type: 'success'
      });
    }
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Assalam o Alaikum! I want to order this product from FTH Mart (Markaz Sourcing):\n\n*Product:* ${product.title}\n*SKU:* ${product.sku}\n*Price:* ${formatPKR(currentPrice)}\n*Quantity:* ${quantity}\n*Variant:* ${selectedVariant?.name || 'Standard'}\n*Delivery City:* ${selectedCity}\n*Payment:* Cash on Delivery (COD)\n\nPlease confirm my order!`
    );
    window.open(`https://wa.me/923001234567?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8 bg-[#f2f4f5] pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#787574] tracking-tight-meta">
        <Link to="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <Link to="/categories" className="hover:text-black transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <Link to={`/c/${product.categorySlug}`} className="hover:text-black capitalize transition-colors">
          {product.categoryName || product.categorySlug?.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <span className="font-semibold text-black truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main 2-Column Product Gallery & Details Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Gallery */}
        <div className="lg:col-span-6 bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60 space-y-4">
          <div className="relative aspect-square rounded-[20px] overflow-hidden bg-[#f2f4f5] border border-[#ebebeb]/60">
            <img
              src={product.images?.[selectedImageIdx] || 'https://placehold.co/600'}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#5433eb] text-white text-xs font-bold px-3 py-1 rounded-full shadow-violet-glow">
                -{discountPercent}% OFF
              </span>
            )}
            <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full shadow-pill uppercase tracking-wider flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Markaz Verified Product
            </span>
          </div>

          {/* Thumbnail Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIdx(idx)}
                className={`w-16 h-16 rounded-[16px] overflow-hidden flex-shrink-0 border-2 transition-all ${
                  selectedImageIdx === idx
                    ? 'border-[#5433eb] shadow-violet-glow scale-102'
                    : 'border-transparent opacity-70 hover:opacity-100 bg-[#f2f4f5]'
                }`}
              >
                <img src={img} alt="Thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Product Buy Box */}
        <div className="lg:col-span-6 bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Brand, SKU & Share */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#787574] uppercase tracking-[-0.017em]">
                {product.brand} • SKU: <span className="font-mono text-black font-bold">{product.sku}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-[#f2f4f5] text-[#787574] hover:text-black transition-colors"
                  title="Share Product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 rounded-full hover:bg-[#f2f4f5] text-[#787574] hover:text-rose-600 transition-colors"
                  title="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight-display leading-snug">
              {product.title}
            </h1>

            {/* Rating and Orders */}
            <div className="flex items-center gap-3 text-xs border-b border-[#ebebeb] pb-4">
              <div className="flex items-center text-amber-400 font-bold gap-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-black">{product.rating}</span>
              </div>
              <span className="text-[#787574]">({product.reviewsCount || 142} reviews)</span>
              <span className="text-[#acb0aa]">•</span>
              <span className="text-emerald-600 font-semibold">
                {product.ordersCount || 350}+ orders in Pakistan
              </span>
            </div>

            {/* Wholesale & Retail Pricing Box */}
            <div className="bg-[#f2f4f5] rounded-[20px] p-4 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#787574] block mb-0.5 font-medium">Wholesale Price (Markaz Direct)</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight-display">
                    {formatPKR(currentPrice)}
                  </span>
                  {comparePrice && (
                    <span className="text-sm text-[#787574] line-through font-medium">
                      {formatPKR(comparePrice)}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-[#5433eb] bg-white px-2.5 py-0.5 rounded-full shadow-pill">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#787574] uppercase font-bold block">Estimated Margin</span>
                <span className="text-xs font-black text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-200 inline-block mt-0.5">
                  +{Math.round(((currentPrice - supplierCost) / currentPrice) * 100)}% Profit
                </span>
              </div>
            </div>

            {/* Markaz Reseller Profit Calculator Card */}
            <div className="bg-gradient-to-br from-violet-50 to-purple-50/50 rounded-[20px] p-4 border border-violet-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#5433eb] flex items-center gap-1.5">
                  <Calculator className="w-4 h-4" /> Markaz Reseller Profit Calculator
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Apna Profit: {formatPKR(calculatedResellerProfit)}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <label className="text-[10px] font-semibold text-[#787574] block mb-1">
                    Customer Selling Price (PKR):
                  </label>
                  <input
                    type="number"
                    value={resellerPrice}
                    onChange={(e) => setResellerPrice(Number(e.target.value))}
                    className="w-full text-xs font-bold text-black bg-white border border-violet-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#5433eb]"
                  />
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#787574] block mb-1">Your Net Profit:</span>
                  <span className="text-sm font-black text-emerald-600 font-mono">
                    +{formatPKR(calculatedResellerProfit)}
                  </span>
                </div>
              </div>
            </div>

            {/* Variants Selector */}
            {product.variants?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-black tracking-tight-body">
                  Select Option: <strong className="text-[#5433eb]">{selectedVariant?.name || selectedVariant?.title}</strong>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                        selectedVariant?.id === v.id
                          ? 'bg-[#5433eb] text-white shadow-violet-glow'
                          : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
                      }`}
                    >
                      {v.name || v.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs font-semibold text-black">Quantity:</span>
              <div className="flex items-center bg-[#f2f4f5] rounded-full p-1 border border-[#ebebeb]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-pill hover:bg-slate-50 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center text-xs font-bold text-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-pill hover:bg-slate-50 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-[#787574]">
                ({product.stock || 85} units available in wholesale stock)
              </span>
            </div>

            {/* Pakistan Shipping & Courier */}
            <div className="border-t border-[#ebebeb] pt-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-black flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#5433eb]" /> Delivery Destination:
                </span>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="text-xs font-bold text-[#5433eb] bg-[#f2f4f5] rounded-full px-3 py-1 focus:outline-none cursor-pointer"
                >
                  {PAKISTAN_LOCATIONS.popularCities.map((city) => (
                    <option key={city} value={city}>{city}, Pakistan</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-[#787574] leading-relaxed">
                Est. Delivery to <strong>{selectedCity}</strong>: 24–48 hours via TCS / Trax COD.
                {currentPrice >= 2500 ? (
                  <span className="text-emerald-600 font-bold ml-1">Eligible for Free Shipping!</span>
                ) : (
                  <span className="text-[#787574] ml-1">Standard courier fee: Rs 180.</span>
                )}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-6 border-t border-[#ebebeb]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-black hover:bg-[#222222] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full text-xs sm:text-sm font-semibold transition-all shadow-violet-glow flex items-center justify-center gap-2 active:scale-95"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>Buy Now (Cash on Delivery)</span>
              </button>
            </div>

            {/* 1-Click WhatsApp Order Placement */}
            <button
              onClick={handleWhatsAppOrder}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp (Cash on Delivery)</span>
            </button>

            <div className="flex items-center justify-center gap-6 text-[11px] text-[#787574] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Replacement
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-sky-600" /> Easy Returns
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-600" /> 24H Dispatch
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Supplier Hub & Specifications Card */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-6">
        <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-[#5433eb]" />
            <h2 className="text-lg font-bold text-black tracking-tight-display">
              Markaz Supplier &amp; Wholesale Specifications
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> Verified Markaz Supplier
          </span>
        </div>

        {/* Specifications Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#f2f4f5] rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider">Product Information</h3>
            <div className="space-y-1 text-xs text-[#787574]">
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>Brand:</span>
                <span className="font-semibold text-black">{product.brand}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>SKU Code:</span>
                <span className="font-mono font-semibold text-black">{product.sku}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>Category:</span>
                <span className="font-semibold text-black capitalize">{product.categorySlug?.replace('-', ' ')}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Stock Status:</span>
                <span className="font-bold text-emerald-600">In Stock ({product.stock} units)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f2f4f5] rounded-2xl p-4 space-y-2">
            <h3 className="text-xs font-bold text-black uppercase tracking-wider">Logistics &amp; Warranty</h3>
            <div className="space-y-1 text-xs text-[#787574]">
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>Supplier Location:</span>
                <span className="font-semibold text-black flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#5433eb]" /> {product.supplier?.city || 'Lahore Hub, Pakistan'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>Dispatch Time:</span>
                <span className="font-semibold text-black">Within 24 Hours</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#ebebeb]">
                <span>Warranty:</span>
                <span className="font-semibold text-black">7-Day Return &amp; Replacement</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Payment Mode:</span>
                <span className="font-bold text-black">Cash on Delivery (COD) Nationwide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="pt-2">
          <h3 className="text-sm font-bold text-black mb-2">Description</h3>
          <p className="text-xs text-[#787574] leading-relaxed">
            {product.description ||
              `Experience premium quality with the ${product.title}. Sourced directly from verified Markaz wholesale suppliers with nationwide Cash on Delivery across Pakistan.`}
          </p>
        </div>
      </div>

      {/* Related Products from Markaz */}
      {relatedProducts.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-black tracking-tight-display">
              More from {product.categoryName || product.categorySlug?.replace('-', ' ')}
            </h2>
            <Link
              to={`/c/${product.categorySlug}`}
              className="text-xs font-bold text-[#5433eb] hover:underline"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
