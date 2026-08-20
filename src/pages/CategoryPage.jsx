import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { ProductCard } from '../components/product/ProductCard';
import {
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  ChevronRight,
  Star,
  Check,
  X,
  Truck
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';
import { Drawer } from '../components/ui/Drawer';

export const CategoryPage = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useStore((state) => state.categories);
  const products = useStore((state) => state.products);

  const subcategoryParam = searchParams.get('sub') || 'all';

  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [minRating, setMinRating] = useState(Number(searchParams.get('rating')) || 0);
  const [freeShippingOnly, setFreeShippingOnly] = useState(searchParams.get('freeShipping') === 'true');
  const [inStockOnly, setInStockOnly] = useState(searchParams.get('inStock') === 'true');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'best_match');
  const [viewLayout, setViewLayout] = useState('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const currentCategory = categories.find((c) => c.slug === categorySlug) || {
    name: 'All Categories',
    slug: 'all',
    subcategories: []
  };

  const availableBrands = useMemo(() => {
    const matched = categorySlug && categorySlug !== 'all'
      ? products.filter((p) => p.categorySlug === categorySlug)
      : products;
    return Array.from(new Set(matched.map((p) => p.brand).filter(Boolean)));
  }, [products, categorySlug]);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (categorySlug && categorySlug !== 'all') {
      result = result.filter((p) => p.categorySlug === categorySlug);
    }

    if (subcategoryParam && subcategoryParam !== 'all') {
      result = result.filter((p) => p.subcategorySlug === subcategoryParam);
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (freeShippingOnly) {
      result = result.filter((p) => p.freeShipping);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    return [...result].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'orders') return (b.ordersCount || 0) - (a.ordersCount || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [
    products,
    categorySlug,
    subcategoryParam,
    minPrice,
    maxPrice,
    minRating,
    freeShippingOnly,
    inStockOnly,
    selectedBrands,
    sortBy
  ]);

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const clearAllFilters = () => {
    setMinPrice('');
    setMaxPrice('');
    setMinRating(0);
    setFreeShippingOnly(false);
    setInStockOnly(false);
    setSelectedBrands([]);
    setSortBy('best_match');
  };

  const hasActiveFilters =
    minPrice || maxPrice || minRating > 0 || freeShippingOnly || inStockOnly || selectedBrands.length > 0;

  const FilterContent = (
    <div className="space-y-6">
      {/* Price Range (PKR) */}
      <div className="border-b border-[#ebebeb] pb-5">
        <h4 className="text-xs font-semibold uppercase tracking-[-0.017em] text-[#787574] mb-3">
          Price Range (PKR)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min Rs"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white text-center font-medium"
          />
          <span className="text-[#787574] text-xs">-</span>
          <input
            type="number"
            placeholder="Max Rs"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white text-center font-medium"
          />
        </div>
      </div>

      {/* Delivery & Stock */}
      <div className="border-b border-[#ebebeb] pb-5 space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-[-0.017em] text-[#787574]">
          Delivery & Stock
        </h4>
        <label className="flex items-center gap-2.5 text-xs font-medium text-black cursor-pointer">
          <input
            type="checkbox"
            checked={freeShippingOnly}
            onChange={(e) => setFreeShippingOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#5433eb] focus:ring-[#5433eb]"
          />
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-emerald-600" /> Free Delivery
          </span>
        </label>
        <label className="flex items-center gap-2.5 text-xs font-medium text-black cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="w-4 h-4 rounded text-[#5433eb] focus:ring-[#5433eb]"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Customer Rating */}
      <div className="border-b border-[#ebebeb] pb-5">
        <h4 className="text-xs font-semibold uppercase tracking-[-0.017em] text-[#787574] mb-3">
          Customer Rating
        </h4>
        <div className="space-y-1.5">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => setMinRating(minRating === stars ? 0 : stars)}
              className={`w-full flex items-center justify-between p-2.5 rounded-full text-xs font-medium transition-all ${
                minRating === stars ? 'bg-[#5433eb] text-white shadow-violet-glow' : 'hover:bg-[#f2f4f5] text-black'
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
                <span className={`text-xs ml-1.5 font-semibold ${minRating === stars ? 'text-white' : 'text-black'}`}>& Up</span>
              </div>
              {minRating === stars && <Check className="w-3.5 h-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[-0.017em] text-[#787574] mb-3">
            Brands ({availableBrands.length})
          </h4>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {availableBrands.map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-black cursor-pointer hover:text-[#5433eb]"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded text-[#5433eb]"
                />
                <span className="truncate">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full py-2.5 bg-[#f2f4f5] hover:bg-[#e4e7e9] text-black rounded-full text-xs font-semibold transition-colors"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-6 bg-[#f2f4f5]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-[#787574] tracking-tight-meta">
        <Link to="/" className="hover:text-black transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <Link to="/c/electronics" className="hover:text-black transition-colors">
          Categories
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#acb0aa]" />
        <span className="font-semibold text-black">{currentCategory.name}</span>
      </nav>

      {/* Category Header Hero */}
      <div className="bg-white rounded-[28px] p-8 shadow-pillow border border-[#ebebeb]/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#787574] font-semibold">
            Collection Catalogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight-display mt-1">
            {currentCategory.name}
          </h1>
          <p className="text-xs text-[#787574] mt-1 tracking-tight-body">
            Showing {filteredProducts.length} items with Cash on Delivery in Pakistan
          </p>
        </div>

        {/* Subcategories Chips */}
        {currentCategory.subcategories?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchParams({})}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                subcategoryParam === 'all'
                  ? 'bg-black text-white shadow-pill'
                  : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
              }`}
            >
              All
            </button>
            {currentCategory.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSearchParams({ sub: sub.slug })}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  subcategoryParam === sub.slug
                    ? 'bg-[#5433eb] text-white shadow-violet-glow'
                    : 'bg-[#f2f4f5] text-black hover:bg-[#e4e7e9]'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60 sticky top-36">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3 mb-4">
              <h3 className="font-semibold text-sm text-black flex items-center gap-1.5 tracking-tight-body">
                <SlidersHorizontal className="w-4 h-4 text-[#5433eb]" /> Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-semibold text-red-600 hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            {FilterContent}
          </div>
        </div>

        {/* Right Products Feed */}
        <div className="lg:col-span-9 space-y-4">
          {/* Top Sort & Layout Controls */}
          <div className="bg-white rounded-[28px] p-4 shadow-pillow border border-[#ebebeb]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-[#f2f4f5] text-black rounded-full text-xs font-semibold"
              >
                <Filter className="w-3.5 h-3.5" /> Filters
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#5433eb]" />}
              </button>

              <span className="text-xs font-medium text-[#787574] tracking-tight-meta">
                <strong className="text-black font-semibold">{filteredProducts.length}</strong> products found
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#787574] hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-xs font-semibold text-black bg-[#f2f4f5] rounded-full px-4 py-2 focus:outline-none cursor-pointer tracking-tight-meta"
                >
                  <option value="best_match">Best Match</option>
                  <option value="orders">Most Orders (Top Selling)</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center bg-[#f2f4f5] p-1 rounded-full">
                <button
                  onClick={() => setViewLayout('grid')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewLayout === 'grid' ? 'bg-white shadow-pill text-black' : 'text-[#787574]'
                  }`}
                  title="Grid"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewLayout('list')}
                  className={`p-1.5 rounded-full transition-colors ${
                    viewLayout === 'list' ? 'bg-white shadow-pill text-black' : 'text-[#787574]'
                  }`}
                  title="List"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 bg-white p-3 rounded-full shadow-pillow border border-[#ebebeb]/60">
              <span className="text-xs font-semibold text-black pl-2">Filters:</span>
              {minPrice && (
                <span className="bg-[#f2f4f5] text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  Min: Rs {minPrice}
                  <button onClick={() => setMinPrice('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {maxPrice && (
                <span className="bg-[#f2f4f5] text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  Max: Rs {maxPrice}
                  <button onClick={() => setMaxPrice('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {minRating > 0 && (
                <span className="bg-[#f2f4f5] text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  {minRating}★ & Up
                  <button onClick={() => setMinRating(0)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {freeShippingOnly && (
                <span className="bg-[#f2f4f5] text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  Free Delivery
                  <button onClick={() => setFreeShippingOnly(false)}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedBrands.map((b) => (
                <span key={b} className="bg-[#f2f4f5] text-black px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  {b}
                  <button onClick={() => toggleBrand(b)}><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}

          {/* Products Grid / List */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-[28px] p-12 shadow-pillow text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#f2f4f5] text-[#787574] flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-base font-bold text-black tracking-tight-display">No items found</h3>
              <p className="text-xs text-[#787574]">Try clearing some filters to expand your search.</p>
              <button
                onClick={clearAllFilters}
                className="px-6 py-2.5 bg-black text-white rounded-full text-xs font-semibold shadow-pill"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewLayout === 'grid'
                  ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4'
                  : 'space-y-3'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout={viewLayout} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        title="Filter Products"
        side="left"
      >
        <div className="pb-8">
          {FilterContent}
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full mt-6 py-3 bg-[#5433eb] text-white rounded-full font-semibold text-xs shadow-violet-glow"
          >
            Apply Filters ({filteredProducts.length})
          </button>
        </div>
      </Drawer>
    </div>
  );
};
