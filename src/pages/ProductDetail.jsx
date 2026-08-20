import React, { useState, useEffect } from 'react';
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
  Sparkles
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';
import { PAKISTAN_LOCATIONS } from '../data/pk-locations';

export const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist);
  const addRecentlyViewed = useStore((state) => state.addRecentlyViewed);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);

  const product = products.find((p) => p.slug === productSlug) || products[0];

  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCity, setSelectedCity] = useState('Lahore');
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
      setSelectedImageIdx(0);
      setSelectedVariant(product.variants?.[0] || null);
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

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, quantity);
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
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8 bg-[#f2f4f5] pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#787574] tracking-tight-meta">
        <Link to="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <Link to={`/c/${product.categorySlug}`} className="hover:text-black capitalize transition-colors">
          {product.categorySlug?.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <span className="font-semibold text-black truncate max-w-xs">{product.title}</span>
      </nav>

      {/* Main 2-Column Product Gallery & Details Stage with Refero 28px Pillow Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Gallery with 28px Radius */}
        <div className="lg:col-span-6 bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60 space-y-4">
          {/* Main Hero Image with 20px inner radius creating subtle white border frame */}
          <div className="relative aspect-square rounded-[20px] overflow-hidden bg-[#f2f4f5] border border-[#ebebeb]/60">
            <img
              src={product.images?.[selectedImageIdx] || 'https://placehold.co/600'}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-[#5433eb] text-white text-xs font-bold px-3 py-1 rounded-full shadow-violet-glow">
                -{discountPercent}% OFF
              </span>
            )}
            {product.badge && (
              <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-pill uppercase tracking-wider">
                {product.badge}
              </span>
            )}
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

        {/* Right Product Buy Box with 28px Radius */}
        <div className="lg:col-span-6 bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Brand, SKU & Share */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#787574] uppercase tracking-[-0.017em]">
                {product.brand} • SKU: {product.sku}
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
              <span className="text-[#787574]">({product.reviewsCount || 0} reviews)</span>
              <span className="text-[#acb0aa]">•</span>
              <span className="text-emerald-600 font-semibold">
                {product.ordersCount || 0}+ orders placed in Pakistan
              </span>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#f2f4f5] rounded-[20px] p-4 flex items-baseline gap-3">
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

            {/* Variants Selector */}
            {product.variants?.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs font-semibold text-black tracking-tight-body">
                  Select Option / Color: <strong className="text-[#5433eb]">{selectedVariant?.title}</strong>
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
                      {v.title}
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
                ({product.stock} units available)
              </span>
            </div>

            {/* Pakistan Shipping Estimator */}
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
                Est. Delivery to <strong>{selectedCity}</strong>: 24–48 hours via TCS Express COD.
                {currentPrice >= 2500 ? (
                  <span className="text-emerald-600 font-bold ml-1">Eligible for 100% Free Shipping!</span>
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

            <div className="flex items-center justify-center gap-6 text-[11px] text-[#787574] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 7-Day Replacement
              </span>
              <span className="flex items-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-sky-600" /> Easy Returns
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Verified
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Customer Reviews, Q&A with 28px Radius */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-6">
        {/* Tab Headers */}
        <div className="flex items-center gap-2 border-b border-[#ebebeb] pb-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Product Specifications' },
            { id: 'reviews', label: `Customer Reviews (${product.reviews?.length || 0})` },
            { id: 'faq', label: 'Questions & Answers (3)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-black tracking-tight-display">
              Technical Specifications & Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(product.specs || {}).map(([key, val]) => (
                <div key={key} className="p-3 bg-[#f2f4f5] rounded-[16px] flex justify-between">
                  <span className="text-[#787574] font-medium">{key}</span>
                  <span className="font-bold text-black">{val}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#ebebeb] text-xs text-[#787574] leading-relaxed">
              <h4 className="font-bold text-black text-xs mb-1">Description</h4>
              <p>{product.description}</p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
              <div>
                <h3 className="font-bold text-base text-black">Verified Buyer Reviews</h3>
                <p className="text-xs text-[#787574]">100% verified dropshipping customers in Pakistan</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-black">{product.rating}</span>
                <span className="text-xs text-[#787574]"> / 5.0</span>
              </div>
            </div>

            <div className="space-y-3">
              {(product.reviews || []).map((rev) => (
                <div key={rev.id} className="p-4 bg-[#f2f4f5] rounded-[20px] space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-black">{rev.userName}</span>
                      <span className="text-[10px] text-emerald-600 font-semibold ml-2">✓ Verified Purchase</span>
                    </div>
                    <Rating rating={rev.rating} size="sm" showValue={false} />
                  </div>
                  <p className="text-xs text-[#332f2d] leading-relaxed">"{rev.comment}"</p>
                  <span className="text-[10px] text-[#787574] block">{rev.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="space-y-3">
            <div className="p-4 bg-[#f2f4f5] rounded-[20px] space-y-1">
              <p className="text-xs font-bold text-black">Q: Is Cash on Delivery available for this item in Faisalabad?</p>
              <p className="text-xs text-[#787574]">A: Yes! Cash on delivery is available nationwide for all Pakistani cities via TCS Express.</p>
            </div>
            <div className="p-4 bg-[#f2f4f5] rounded-[20px] space-y-1">
              <p className="text-xs font-bold text-black">Q: What is the warranty / replacement policy?</p>
              <p className="text-xs text-[#787574]">A: We provide a 7-day replacement guarantee if the product arrives damaged or defective.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
