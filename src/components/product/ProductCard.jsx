import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const ProductCard = ({ product, layout = 'grid' }) => {
  const navigate = useNavigate();
  const addToCart = useStore((state) => state.addToCart);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));

  const discountPercent =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  const handleCardClick = (e) => {
    // If user clicked a button or interactive child that stopped propagation, do nothing
    if (e.target.closest('button') || e.target.closest('a')) {
      return;
    }
    navigate(`/p/${product.slug}`);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.variants?.[0] || null, 1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-[28px] p-4 shadow-pillow hover:shadow-elevated transition-all duration-300 flex flex-col sm:flex-row gap-5 group cursor-pointer"
      >
        <Link to={`/p/${product.slug}`} className="relative sm:w-52 aspect-square flex-shrink-0 overflow-hidden rounded-[20px] bg-[#f2f4f5]">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80'}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          {discountPercent > 0 && (
            <span className="absolute top-3 left-3 bg-[#5433eb] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-violet-glow">
              -{discountPercent}%
            </span>
          )}
          {product.badge && (
            <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-black text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-pill uppercase tracking-wider">
              {product.badge}
            </span>
          )}
        </Link>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold text-[#787574] tracking-[-0.017em] uppercase">
                {product.brand}
              </span>
              <button
                onClick={handleWishlistClick}
                className="p-2 rounded-full hover:bg-[#f2f4f5] text-[#787574] hover:text-rose-600 transition-colors"
                title="Save to Wishlist"
              >
                <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <Link to={`/p/${product.slug}`}>
              <h3 className="text-sm sm:text-base font-semibold text-black group-hover:text-[#5433eb] transition-colors line-clamp-2 mt-1 tracking-[-0.031em]">
                {product.title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400 text-xs font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                <span className="text-black font-bold">{product.rating}</span>
              </div>
              <span className="text-xs text-[#787574]">
                ({product.reviewsCount || 0})
              </span>
              <span className="text-xs text-[#acb0aa]">•</span>
              <span className="text-xs font-medium text-emerald-600">
                {product.ordersCount || 0}+ orders in Pakistan
              </span>
            </div>

            <p className="text-xs text-[#787574] line-clamp-2 mt-2 leading-relaxed hidden sm:block">
              {product.description?.replace(/###|#|\*\*/g, '').substring(0, 140)}...
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#ebebeb] mt-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-black tracking-[-0.031em]">
                  {formatPKR(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xs text-[#787574] line-through">
                    {formatPKR(product.compareAtPrice)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold block">
                {product.freeShipping ? '🚚 Free Nationwide Delivery' : '📦 Cash on Delivery'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/p/${product.slug}`}
                className="px-4 py-2 bg-[#f2f4f5] hover:bg-[#e4e7e9] text-black rounded-full text-xs font-semibold transition-colors"
              >
                Details
              </Link>
              <button
                onClick={handleQuickAdd}
                className="px-5 py-2 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-violet-glow"
              >
                <ShoppingCart className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout: Floating 28px Card
  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-[28px] p-3 shadow-pillow hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group overflow-hidden relative cursor-pointer"
    >
      {/* Top Image Stage with 20px inner radius creating subtle white border frame */}
      <div>
        <Link to={`/p/${product.slug}`} className="relative block aspect-square overflow-hidden rounded-[20px] bg-[#f2f4f5]">
          <img
            src={product.images?.[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80'}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&auto=format&fit=crop&q=80';
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Discount Badge */}
          {discountPercent > 0 && (
            <div className="absolute top-2.5 left-2.5 bg-[#5433eb] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-violet-glow">
              -{discountPercent}%
            </div>
          )}

          {/* Choice / Brand Tag */}
          {product.badge && (
            <div className="absolute bottom-2.5 left-2.5 bg-white/90 backdrop-blur-xs text-black text-[9px] font-bold px-2.5 py-0.5 rounded-full shadow-pill uppercase tracking-wider">
              {product.badge}
            </div>
          )}

          {/* Floating Wishlist Button */}
          <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleWishlistClick}
              className={`p-2 rounded-full backdrop-blur-md shadow-pill transition-all ${
                isInWishlist
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-[#332f2d] hover:bg-rose-50 hover:text-rose-600'
              }`}
              title="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-white' : ''}`} />
            </button>
          </div>
        </Link>

        {/* Card Body with Refero GT-Standard Typography */}
        <div className="px-1.5 pt-3 pb-1 space-y-2">
          {/* Brand & Star Rating Row */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[#787574] truncate tracking-[-0.017em] uppercase">
              {product.brand}
            </span>
            <div className="flex items-center text-amber-400 font-bold gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="text-black font-semibold text-[11px]">{product.rating}</span>
              <span className="text-[#787574] font-normal text-[10px]">({product.reviewsCount || 0})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link to={`/p/${product.slug}`}>
            <h3 className="text-xs sm:text-[13px] font-semibold text-black group-hover:text-[#5433eb] transition-colors line-clamp-2 leading-snug tracking-[-0.031em]">
              {product.title}
            </h3>
          </Link>

          {/* Flash Deal Indicator */}
          {product.isFlashDeal && (
            <div className="pt-0.5 space-y-1">
              <div className="flex items-center justify-between text-[10px] text-[#ef4444] font-bold">
                <span className="flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-[#ef4444]" /> Flash Deal
                </span>
                <span>{product.flashDealClaimed || 75}% Claimed</span>
              </div>
              <div className="w-full h-1.5 bg-red-50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full"
                  style={{ width: `${product.flashDealClaimed || 75}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pricing & Add to Cart */}
      <div className="px-1.5 pt-2 border-t border-[#ebebeb]/80 flex items-center justify-between mt-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm sm:text-base font-bold text-black tracking-[-0.031em]">
              {formatPKR(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-[11px] text-[#787574] line-through">
                {formatPKR(product.compareAtPrice)}
              </span>
            )}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold block">
            {product.freeShipping ? 'Free Delivery' : '+ Rs 180 TCS COD'}
          </span>
        </div>

        <button
          onClick={handleQuickAdd}
          className="w-9 h-9 rounded-full bg-[#f2f4f5] hover:bg-[#5433eb] text-black hover:text-white transition-all duration-200 flex items-center justify-center shadow-pill hover:shadow-violet-glow"
          title="Add to Cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
