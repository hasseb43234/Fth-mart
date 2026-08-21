import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import {
  ArrowRight,
  Sparkles,
  Grid,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Package,
  Star,
  Zap,
  Truck
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';

export const CategoriesHub = () => {
  const categories = useStore((state) => state.categories);
  const products = useStore((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredCategories = categories.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      cat.name.toLowerCase().includes(q) ||
      cat.subcategories?.some((s) => s.name.toLowerCase().includes(q))
    );
  });

  // Featured Lead Category
  const featuredCategory = categories[0] || {
    name: 'Smart Electronics & Audio',
    slug: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80',
    itemCount: 42,
    subcategories: []
  };

  return (
    <div className="min-h-screen bg-[#f2f4f5] pb-28 pt-8">
      <div className="max-w-[1300px] mx-auto px-4 space-y-10">
        {/* Awwwards Editorial Header */}
        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-pillow border border-[#ebebeb]/60 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#5433eb] bg-[#c0b5f3]/20 px-3 py-1 rounded-full shadow-pill">
                  [{String(categories.length).padStart(2, '0')}] Curated Collections
                </span>
                <span className="text-[11px] text-[#787574] font-medium">• Nationwide Dropshipping</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight-display">
                Explore All Categories
              </h1>
              <p className="text-xs sm:text-sm text-[#787574] tracking-tight-body leading-relaxed">
                Browse factory-direct catalogues across smart gadgets, kitchen innovations, lifestyle fashion, and automotive gear with Cash on Delivery in Pakistan.
              </p>
            </div>

            {/* Quick Search */}
            <div className="w-full md:w-80">
              <div className="relative">
                <Search className="w-4 h-4 text-[#787574] absolute left-4 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search collections or subcategories..."
                  className="w-full text-xs pl-11 pr-4 py-3 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white focus:border-[#5433eb] shadow-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Category Quick Chips */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-[#ebebeb]">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                selectedFilter === 'all'
                  ? 'bg-black text-white shadow-pill'
                  : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
              }`}
            >
              All ({categories.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedFilter === cat.slug
                    ? 'bg-[#5433eb] text-white shadow-violet-glow'
                    : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout (Awwwards Style) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* 1. Large Hero Bento Card (Spans 8 columns) */}
          <div className="md:col-span-12 lg:col-span-8 group">
            <Link
              to={`/c/${featuredCategory.slug}`}
              className="relative block h-[380px] sm:h-[460px] rounded-[32px] overflow-hidden shadow-pillow hover:shadow-elevated transition-all duration-500 bg-black border border-[#ebebeb]/60"
            >
              <img
                src={featuredCategory.image}
                alt={featuredCategory.name}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

              <div className="absolute inset-0 p-8 sm:p-12 flex flex-col justify-between text-white z-10">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/20">
                    Featured Collection
                  </span>
                  <span className="text-xs font-bold bg-[#5433eb] text-white px-3 py-1 rounded-full shadow-violet-glow">
                    {featuredCategory.itemCount || 30}+ Items
                  </span>
                </div>

                <div className="space-y-3 max-w-lg">
                  <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight-display leading-tight">
                    {featuredCategory.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed tracking-tight-body">
                    High-demand dropshipping electronics including ANC earbuds, smart wearables, fast wireless chargers, and smart home lighting.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-full shadow-pill group-hover:bg-[#5433eb] group-hover:text-white transition-all">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* 2. Side Bento Spotlight Card (Spans 4 columns) */}
          <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">
            {categories.slice(1, 3).map((cat) => (
              <Link
                key={cat.id}
                to={`/c/${cat.slug}`}
                className="relative flex-1 min-h-[200px] rounded-[32px] overflow-hidden shadow-pillow hover:shadow-elevated transition-all duration-500 bg-black group border border-[#ebebeb]/60 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80';
                  }}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
                      Catalogue
                    </span>
                    <span className="text-[10px] text-slate-300 font-bold">
                      {cat.itemCount || 20}+ items
                    </span>
                  </div>

                  <div>
                    <h4 className="text-lg font-bold text-white tracking-tight-display group-hover:text-white transition-colors">
                      {cat.name}
                    </h4>
                    <span className="text-[11px] text-slate-300 font-medium flex items-center gap-1 mt-1 group-hover:translate-x-1 transition-transform">
                      View items <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Detailed Category Cards Grid (4 Columns) */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
            <h2 className="text-xl font-bold text-black tracking-tight-display flex items-center gap-2">
              <Grid className="w-5 h-5 text-[#5433eb]" /> All Catalogues ({filteredCategories.length})
            </h2>
            <span className="text-xs text-[#787574]">Click any category to browse with filters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white rounded-[28px] p-5 shadow-pillow hover:shadow-elevated transition-all duration-300 flex flex-col justify-between group border border-[#ebebeb]/60"
              >
                <div className="space-y-4">
                  {/* Image Container with 20px inner radius */}
                  <Link to={`/c/${cat.slug}`} className="block aspect-[4/3] rounded-[20px] overflow-hidden bg-[#f2f4f5] relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {cat.itemCount || 18}+ items
                    </span>
                  </Link>

                  {/* Title */}
                  <div>
                    <Link to={`/c/${cat.slug}`}>
                      <h3 className="text-base font-bold text-black group-hover:text-[#5433eb] transition-colors tracking-tight-body">
                        {cat.name}
                      </h3>
                    </Link>
                  </div>

                  {/* Subcategories Pills */}
                  {cat.subcategories?.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-[#ebebeb]">
                      <span className="text-[10px] uppercase font-bold text-[#787574] tracking-wider block">
                        Popular Subcategories
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.subcategories.slice(0, 4).map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/c/${cat.slug}?sub=${sub.slug}`}
                            className="text-[10px] bg-[#f2f4f5] hover:bg-[#5433eb] hover:text-white text-black font-semibold px-2.5 py-1 rounded-full transition-colors tracking-tight-meta"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[#ebebeb] mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Cash on Delivery
                  </span>
                  <Link
                    to={`/c/${cat.slug}`}
                    className="w-8 h-8 rounded-full bg-[#f2f4f5] hover:bg-[#5433eb] text-black hover:text-white flex items-center justify-center transition-all shadow-pill"
                    title="View Collection"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
