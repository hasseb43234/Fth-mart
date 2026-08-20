import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  ChevronDown,
  Sparkles,
  Zap,
  Tag,
  Truck,
  ShieldCheck,
  TrendingUp,
  X,
  ExternalLink,
  Store,
  ArrowRight
} from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const user = useStore((state) => state.user);
  const switchRole = useStore((state) => state.switchRole);
  const categories = useStore((state) => state.categories);
  const products = useStore((state) => state.products);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);
  const announcementText = useStore((state) => state.announcementText);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(categories[0] || null);

  const searchRef = useRef(null);
  const accountRef = useRef(null);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = searchTerm.trim()
    ? products
        .filter((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categorySlug.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearchFocused(false);
    navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}${selectedCat !== 'all' ? `&category=${selectedCat}` : ''}`);
  };

  const hotSearches = [
    'Wireless Earbuds',
    'AMOLED Smart Watch',
    'Electric Chopper',
    'Leather Wallet',
    'Hot Air Styler',
    'Dash Cam 4K'
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ebebeb] transition-all">
      {/* Top App / Announcement Bar */}
      <div className="bg-[#000000] text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px] tracking-[-0.017em]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              🇵🇰 Pakistan Official Dropshipping Storefront
            </span>
            <span className="text-[#332f2d]">|</span>
            <span className="text-slate-300 text-[11px] truncate max-w-lg">
              {announcementText}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <Link to="/track" className="hover:text-white transition-colors flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-sky-400" /> Track Order
            </Link>
            <Link to="/help" className="hover:text-white transition-colors">
              Help Center
            </Link>
            <div className="flex items-center gap-1 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Buyer Protection
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Refero Pill-Shaped Search */}
      <div className="max-w-[1200px] mx-auto px-4 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <img
              src="/logo.jpg"
              alt="FTH Mart"
              className="h-10 sm:h-11 w-auto object-contain rounded-xl group-hover:scale-102 transition-transform"
            />
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight-display text-[#0F4C81] flex items-center gap-1 leading-none">
                FTH<span className="text-emerald-600">Mart</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-[#787574] uppercase">
                Fresh • Trust • Home
              </span>
            </div>
          </Link>

          {/* Refero Pill Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-xl relative hidden md:block">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center rounded-full border border-[#000000]/10 bg-white p-1 pl-4 shadow-sm hover:shadow-pill focus-within:shadow-elevated transition-all"
            >
              <Search className="w-4 h-4 text-[#787574] mr-2 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="What are you shopping for today?"
                className="w-full text-xs sm:text-sm text-black placeholder-[#787574] bg-transparent focus:outline-none tracking-tight-body"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="p-1 text-[#787574] hover:text-black mr-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Refero Violet Circular Submit Button */}
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#5433eb] hover:bg-[#4524db] text-white flex items-center justify-center flex-shrink-0 shadow-violet-glow transition-all active:scale-95"
                title="Search"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Live Search Suggestions Dropdown */}
            {isSearchFocused && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-[28px] shadow-elevated border border-[#ebebeb] p-5 z-50 animate-in fade-in">
                {!searchTerm.trim() ? (
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-black mb-3">
                      <TrendingUp className="w-3.5 h-3.5 text-[#5433eb]" /> Hot Searches in Pakistan
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotSearches.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => {
                            setSearchTerm(term);
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
                      Suggested Products ({searchSuggestions.length})
                    </div>
                    {searchSuggestions.length > 0 ? (
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
                              <div className="flex items-center gap-2 text-xs">
                                <span className="font-bold text-black">
                                  {formatPKR(prod.price)}
                                </span>
                                <span className="text-[10px] text-[#787574]">
                                  {prod.ordersCount}+ sold
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-xs text-[#787574] py-3 text-center">
                        No direct matches found. Press Enter to search all catalogues.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Actions: Account, Wishlist, Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Account Popover */}
            <div ref={accountRef} className="relative">
              <button
                onClick={() => setIsAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#f2f4f5] transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-full bg-[#f2f4f5] flex items-center justify-center text-black">
                  <User className="w-4 h-4" />
                </div>
                <div className="hidden xl:block">
                  <p className="text-[10px] text-[#787574] leading-tight">
                    {user ? `Hi, ${user.name.split(' ')[0]}` : 'Sign In'}
                  </p>
                  <p className="text-xs font-semibold text-black flex items-center gap-0.5 leading-tight tracking-tight-meta">
                    Account <ChevronDown className="w-3 h-3 text-[#787574]" />
                  </p>
                </div>
              </button>

              {/* Popover Menu */}
              {isAccountOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-[28px] shadow-elevated border border-[#ebebeb] p-3.5 z-50 animate-in fade-in">
                  <div className="p-2 border-b border-[#ebebeb]">
                    <p className="text-xs font-bold text-black">{user?.name || 'Guest User'}</p>
                    <p className="text-[11px] text-[#787574] truncate">{user?.phone || user?.email || '03XXXXXXXXX'}</p>
                    <span className="inline-block mt-1 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#f2f4f5] text-black">
                      {user?.role === 'admin' ? '⚡ Administrator' : '🛍️ Customer Account'}
                    </span>
                  </div>

                  <div className="py-2 space-y-1 text-xs">
                    <Link
                      to="/account/orders"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 rounded-full text-black hover:bg-[#f2f4f5] font-medium transition-colors"
                    >
                      <span>My Orders</span>
                      <span className="text-[10px] bg-[#f2f4f5] text-[#787574] px-2 py-0.5 rounded-full">All tabs</span>
                    </Link>
                    <Link
                      to="/account/wishlist"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2 rounded-full text-black hover:bg-[#f2f4f5] font-medium transition-colors"
                    >
                      <span>Wishlist</span>
                      <span className="text-[10px] bg-rose-50 text-rose-600 font-bold px-2 py-0.5 rounded-full">{wishlist.length}</span>
                    </Link>
                    <Link
                      to="/account/addresses"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center px-3.5 py-2 rounded-full text-black hover:bg-[#f2f4f5] font-medium transition-colors"
                    >
                      Delivery Addresses
                    </Link>
                    <Link
                      to="/account/coupons"
                      onClick={() => setIsAccountOpen(false)}
                      className="flex items-center px-3.5 py-2 rounded-full text-black hover:bg-[#f2f4f5] font-medium transition-colors"
                    >
                      Coupons & Vouchers
                    </Link>
                  </div>

                  {/* Switch to Admin Toggle */}
                  <div className="pt-2 border-t border-[#ebebeb] space-y-1.5">
                    <button
                      onClick={() => {
                        const newRole = user?.role === 'admin' ? 'customer' : 'admin';
                        switchRole(newRole);
                        setIsAccountOpen(false);
                        if (newRole === 'admin') navigate('/admin');
                        else navigate('/');
                      }}
                      className="w-full text-xs text-left px-3.5 py-2 rounded-full font-bold bg-[#f2f4f5] text-black hover:bg-[#e4e7e9] flex items-center justify-between transition-colors"
                    >
                      <span>{user?.role === 'admin' ? 'Customer Store' : 'Admin Panel'}</span>
                      <Store className="w-3.5 h-3.5 text-black" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/account/wishlist"
              className="p-2.5 rounded-full hover:bg-[#f2f4f5] text-black relative hidden sm:flex items-center justify-center transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-5 h-5 text-black hover:text-rose-600 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-rose-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Button with Pill Shape */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="flex items-center gap-2 bg-[#000000] hover:bg-[#222222] text-white px-4 py-2.5 rounded-full shadow-sm transition-all active:scale-95"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-[#5433eb] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold hidden sm:inline-block tracking-tight-meta">Cart</span>
            </button>
          </div>
        </div>
      </div>

      {/* Refero Category Pills Bar */}
      <div className="bg-white border-t border-[#ebebeb]/60 py-2.5 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2.5">
          {/* Mega Menu Toggle Chip */}
          <div
            className="relative flex-shrink-0"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f2f4f5] hover:bg-[#e4e7e9] text-black rounded-full text-xs font-semibold shadow-pill transition-colors">
              <Menu className="w-3.5 h-3.5" />
              <span>All Categories</span>
              <ChevronDown className="w-3 h-3 text-[#787574]" />
            </button>

            {/* Mega Flyout */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-[680px] bg-white rounded-[28px] shadow-elevated border border-[#ebebeb] flex z-50 animate-in fade-in overflow-hidden">
                <div className="w-56 bg-[#f2f4f5] p-2 space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onClick={() => {
                        navigate(`/c/${cat.slug}`);
                        setIsMegaMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-full text-xs flex items-center justify-between transition-colors ${
                        hoveredCategory?.id === cat.id
                          ? 'bg-[#5433eb] text-white font-bold shadow-violet-glow'
                          : 'text-black hover:bg-white font-medium'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <ChevronDown className="-rotate-90 w-3 h-3" />
                    </button>
                  ))}
                </div>

                <div className="flex-1 p-6 bg-white">
                  {hoveredCategory && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#ebebeb] pb-2">
                        <h4 className="font-bold text-sm text-black">
                          {hoveredCategory.name}
                        </h4>
                        <Link
                          to={`/c/${hoveredCategory.slug}`}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="text-xs text-[#5433eb] hover:underline font-semibold"
                        >
                          View All ({hoveredCategory.itemCount} Items) →
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        {hoveredCategory.subcategories?.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/c/${hoveredCategory.slug}?sub=${sub.slug}`}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="p-3 rounded-2xl bg-[#f2f4f5] hover:bg-[#e4e7e9] transition-all flex items-center justify-between"
                          >
                            <span className="text-xs font-semibold text-black">
                              {sub.name}
                            </span>
                            {sub.popular && (
                              <span className="text-[9px] bg-[#5433eb] text-white font-bold px-2 py-0.5 rounded-full">
                                HOT
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Quick Category Chips */}
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/c/${cat.slug}`}
              className="flex items-center gap-2 bg-white hover:bg-[#f2f4f5] text-black px-4 py-2 rounded-full text-xs font-semibold border border-[#ebebeb] shadow-pill hover:shadow-pillow transition-all whitespace-nowrap tracking-tight-meta flex-shrink-0"
            >
              <img src={cat.image} alt={cat.name} className="w-4 h-4 rounded-full object-cover" />
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};
