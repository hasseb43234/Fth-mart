import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { ProductCard } from '../components/product/ProductCard';
import {
  Search,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Zap,
  Tag,
  Star,
  Sparkles,
  Truck,
  ShieldCheck,
  RotateCcw,
  Clock,
  TrendingUp,
  X,
  Smartphone
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';

export const Home = () => {
  const navigate = useNavigate();
  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);
  const coupons = useStore((state) => state.coupons);
  const applyCoupon = useStore((state) => state.applyCoupon);

  const [heroSearch, setHeroSearch] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 48, seconds: 20 });

  const searchContainerRef = useRef(null);
  const flashDealsRailRef = useRef(null);
  const electronicsRailRef = useRef(null);
  const homeRailRef = useRef(null);
  const fashionRailRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Live countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (!heroSearch.trim()) return;
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
  };

  const scrollRail = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const hotSearches = [
    'Wireless Earbuds',
    'AMOLED Smart Watch',
    'Electric Chopper',
    'Leather Wallet',
    'Hot Air Styler',
    'Dash Cam 4K'
  ];

  const searchSuggestions = heroSearch.trim()
    ? products
        .filter((p) =>
          p.title.toLowerCase().includes(heroSearch.toLowerCase()) ||
          p.brand.toLowerCase().includes(heroSearch.toLowerCase()) ||
          p.categorySlug.toLowerCase().includes(heroSearch.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const flashDeals = products.filter((p) => p.isFlashDeal || p.price < 3500);
  const electronicsProducts = products.filter((p) => p.categorySlug === 'electronics');
  const homeProducts = products.filter((p) => p.categorySlug === 'home-kitchen');
  const fashionProducts = products.filter((p) => p.categorySlug === 'fashion-apparel');
  const beautyProducts = products.filter((p) => p.categorySlug === 'beauty-personal-care');

  return (
    <div className="space-y-16 lg:space-y-24 pb-28 bg-[#ffffff]">
      {/* 1. EXACT REFERO HERO COMPOSITION (Matching User Screenshot) */}
      <section className="relative z-30 pt-6 sm:pt-10 pb-12 overflow-visible bg-white">
        <div className="max-w-[1300px] mx-auto px-4 relative overflow-visible">
          {/* Floating Constellation Stage */}
          <div className="relative min-h-[320px] sm:min-h-[420px] lg:min-h-[460px] flex items-center justify-center overflow-visible">
            
            {/* 1. Far Left Card: White Cotton Poplin Shirt (Tilted -6deg) */}
            <div className="absolute left-[2%] sm:left-[4%] lg:left-[6%] top-[10%] sm:top-[12%] animate-float-1 z-10 hidden sm:block">
              <Link
                to="/c/fashion-apparel"
                className="bg-white rounded-[24px] p-3 shadow-pillow hover:shadow-elevated transition-all duration-300 block w-40 sm:w-44 -rotate-6 hover:rotate-0 hover:scale-105 border border-[#ebebeb]/80"
              >
                <div className="aspect-[4/5] rounded-[18px] overflow-hidden bg-[#f2f4f5] mb-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500&auto=format&fit=crop&q=80"
                    alt="Jo Shirt in Cotton Poplin"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5 px-1">
                  <h4 className="text-[11px] font-bold text-black truncate tracking-tight-body">
                    Jo Shirt In Cotton Poplin
                  </h4>
                  <div className="flex items-center text-amber-400 text-[10px] gap-0.5">
                    {'★★★★★'}
                    <span className="text-[#787574] text-[9px] ml-1">(12)</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* 2. Left-Mid Spotlight Card: Skincare OSEA Card */}
            <div className="absolute left-[16%] sm:left-[17%] lg:left-[19%] top-[25%] sm:top-[22%] animate-float-3 z-10 hidden md:block">
              <Link
                to="/c/beauty-personal-care"
                className="bg-[#d4b59e] rounded-[24px] overflow-hidden shadow-pillow hover:shadow-elevated transition-all duration-300 block w-28 sm:w-32 aspect-square relative group hover:scale-105"
              >
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80"
                  alt="Skincare Glow"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <span className="text-white font-serif tracking-widest text-sm sm:text-base font-semibold drop-shadow-sm">
                    OSEA
                  </span>
                </div>
              </Link>
            </div>

            {/* 3. Center-Left Prominent 3D Cutout: Cyan Blue Crescent Handbag */}
            <div className="absolute left-[26%] sm:left-[28%] lg:left-[30%] top-[4%] sm:top-[6%] animate-float-2 z-20">
              <Link to="/c/fashion-apparel" className="block relative group hover:scale-105 transition-transform duration-300">
                <div className="w-36 sm:w-48 lg:w-56 aspect-square relative flex items-center justify-center drop-shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&auto=format&fit=crop&q=80"
                    alt="Blue Crescent Handbag"
                    className="w-full h-full object-contain filter contrast-105 hover:rotate-1 transition-transform"
                  />
                </div>
              </Link>
            </div>

            {/* 4. Center-Top Floating White Velcro Sneakers */}
            <div className="absolute left-[44%] sm:left-[43%] lg:left-[44%] top-[0%] sm:top-[2%] animate-float-4 z-10 hidden sm:block">
              <Link to="/c/fashion-apparel" className="block hover:scale-105 transition-transform duration-300">
                <div className="w-32 sm:w-40 lg:w-44 aspect-square flex items-center justify-center drop-shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop&q=80"
                    alt="White Retro Sneakers"
                    className="w-full h-full object-contain hover:-rotate-2 transition-transform"
                  />
                </div>
              </Link>
            </div>

            {/* 5. Center-Right Prominent 3D Cutout: Vintage Yellow Sunglasses with Green Lenses */}
            <div className="absolute right-[22%] sm:right-[26%] lg:right-[28%] top-[14%] sm:top-[16%] animate-float-1 z-20">
              <Link to="/c/fashion-apparel" className="block relative group hover:scale-105 transition-transform duration-300">
                <div className="w-36 sm:w-48 lg:w-56 aspect-[4/3] relative flex items-center justify-center drop-shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80"
                    alt="Vintage Yellow Sunglasses"
                    className="w-full h-full object-contain filter hover:-rotate-1 transition-transform"
                  />
                </div>
              </Link>
            </div>

            {/* 6. Right Card: The Perfect Weekday Navy Tote Bag */}
            <div className="absolute right-[8%] sm:right-[10%] lg:right-[12%] top-[6%] sm:top-[8%] animate-float-3 z-10 hidden sm:block">
              <Link
                to="/c/fashion-apparel"
                className="bg-white rounded-[24px] p-3 shadow-pillow hover:shadow-elevated transition-all duration-300 block w-36 sm:w-44 rotate-3 hover:rotate-0 hover:scale-105 border border-[#ebebeb]/80"
              >
                <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-[#f2f4f5] mb-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80"
                    alt="The Perfect Weekday Tote"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-0.5 px-1">
                  <h4 className="text-[11px] font-bold text-black truncate tracking-tight-body">
                    The Perfect Weekday Tote
                  </h4>
                  <div className="flex items-center text-amber-400 text-[10px] gap-0.5">
                    {'★★★★★'}
                    <span className="text-[#787574] text-[9px] ml-1">(9)</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* 7. Far Right Tilted Card: Patterned Blanket / Home Item */}
            <div className="absolute right-[0%] sm:right-[2%] lg:right-[3%] top-[24%] sm:top-[26%] animate-float-2 z-10 hidden md:block">
              <Link
                to="/c/home-kitchen"
                className="bg-white rounded-[24px] overflow-hidden shadow-pillow hover:shadow-elevated transition-all duration-300 block w-28 sm:w-32 aspect-[3/4] rotate-6 hover:rotate-0 hover:scale-105 border border-[#ebebeb]"
              >
                <img
                  src="https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500&auto=format&fit=crop&q=80"
                  alt="Home Patterned Blanket"
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            {/* Exact Centerpiece: Centered Purple 'shop' / 'fth mart' Logo */}
            <div className="relative z-30 pt-36 sm:pt-48 lg:pt-56 text-center space-y-6 max-w-xl mx-auto overflow-visible">
              <div className="flex items-center justify-center select-none">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#5433eb] tracking-tight-display lowercase drop-shadow-xs">
                  shop
                </h1>
              </div>

              {/* Exact Centered Pill Search Input with Violet Submit Button */}
              <div ref={searchContainerRef} className="relative max-w-lg mx-auto px-2 z-50">
                <form
                  onSubmit={handleHeroSearchSubmit}
                  className="flex items-center rounded-full bg-white border border-[#000000]/10 p-1.5 pl-6 shadow-pillow hover:shadow-elevated focus-within:shadow-elevated transition-all"
                >
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    placeholder="What are you shopping for today?"
                    className="w-full text-xs sm:text-sm text-black placeholder-[#787574] bg-transparent focus:outline-none tracking-tight-body font-normal text-center sm:text-left"
                  />

                  {heroSearch && (
                    <button
                      type="button"
                      onClick={() => setHeroSearch('')}
                      className="p-1 text-[#787574] hover:text-black mr-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-[#5433eb] hover:bg-[#4524db] text-white flex items-center justify-center flex-shrink-0 shadow-violet-glow transition-all active:scale-95 ml-2"
                    title="Search Products"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Autocomplete Dropdown */}
                {isSearchFocused && (
                  <div className="absolute left-2 right-2 top-full mt-3 bg-white rounded-[28px] shadow-elevated border border-[#ebebeb] p-5 z-[100] animate-in fade-in text-left">
                    {!heroSearch.trim() ? (
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-black mb-3">
                          <TrendingUp className="w-3.5 h-3.5 text-[#5433eb]" /> Hot Searches
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hotSearches.map((term) => (
                            <button
                              key={term}
                              type="button"
                              onClick={() => {
                                setHeroSearch(term);
                                setIsSearchFocused(false);
                                navigate(`/search?q=${encodeURIComponent(term)}`);
                              }}
                              className="text-xs bg-[#f2f4f5] hover:bg-[#5433eb] hover:text-white text-black px-4 py-2 rounded-full transition-colors font-medium tracking-tight-meta"
                            >
                              {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-xs font-semibold text-[#787574] mb-2.5">
                          Suggested Items ({searchSuggestions.length})
                        </div>
                        <div className="space-y-1.5">
                          {searchSuggestions.map((prod) => (
                            <Link
                              key={prod.id}
                              to={`/p/${prod.slug}`}
                              onClick={() => setIsSearchFocused(false)}
                              className="flex items-center gap-3 p-2 rounded-2xl hover:bg-[#f2f4f5] transition-colors group"
                            >
                              <img
                                src={prod.images?.[0] || 'https://placehold.co/80'}
                                alt={prod.title}
                                className="w-10 h-10 object-cover rounded-xl bg-slate-100"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-black group-hover:text-[#5433eb] truncate tracking-tight-body">
                                  {prod.title}
                                </p>
                                <span className="text-xs font-bold text-black">
                                  {formatPKR(prod.price)}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Big Save Dropship Voucher Strip */}
      <section className="max-w-[1200px] mx-auto px-4 relative z-10">
        <div className="bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#f2f4f5] text-black flex items-center justify-center font-bold text-lg shadow-pill">
                🎟️
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-black tracking-tight-display">
                  Big Save Dropship Vouchers
                </h3>
                <p className="text-xs text-[#787574] tracking-tight-body">
                  Tap any voucher to collect directly into your cart
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {coupons.map((coupon) => (
                <button
                  key={coupon.code}
                  onClick={() => applyCoupon(coupon.code)}
                  className="flex items-center gap-2 bg-[#f2f4f5] hover:bg-[#e4e7e9] px-4 py-2 rounded-full text-xs font-semibold text-black transition-all shadow-pill active:scale-95"
                >
                  <Tag className="w-3.5 h-3.5 text-[#5433eb]" />
                  <span>{coupon.code}</span>
                  <span className="bg-[#5433eb] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-violet-glow">
                    {coupon.discountPercent > 0 ? `${coupon.discountPercent}% OFF` : `Rs ${coupon.fixedDiscount} OFF`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Showcase Grid */}
      <section className="max-w-[1200px] mx-auto px-4 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#5433eb]" />
            <h2 className="text-2xl font-bold text-black tracking-tight-display">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-[#5433eb] hover:underline flex items-center gap-1"
          >
            View All Categories ({categories.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/c/${cat.slug}`}
              className="group bg-white rounded-[24px] p-4 shadow-pillow hover:shadow-elevated transition-all border border-[#ebebeb] flex flex-col justify-between overflow-hidden hover:scale-[1.02]"
            >
              <div className="aspect-[4/3] rounded-[18px] overflow-hidden bg-[#f2f4f5] mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-black group-hover:text-[#5433eb] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#787574] mt-0.5">
                  {cat.subcategories?.length || 0} Subcategories
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Sections (If products exist) */}
      {products.length > 0 ? (
        <>
          {/* Flash Deals */}
          {flashDeals.length > 0 && (
            <section className="max-w-[1200px] mx-auto px-4 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-semibold text-black tracking-tight-display">Flash Deals</span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">Up to 70% OFF</span>
                </div>
              </div>
              <div className="flex items-stretch gap-4 overflow-x-auto no-scrollbar pb-2">
                {flashDeals.map((p) => (
                  <div key={p.id} className="w-[260px] sm:w-[280px] flex-shrink-0">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Full Discovery Feed */}
          <section className="max-w-[1200px] mx-auto px-4">
            <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-6">
              <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
                <h2 className="text-xl font-semibold text-black tracking-tight-display">
                  Explore Products
                </h2>
                <span className="text-xs text-[#787574]">{products.length} items</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
};
