import React, { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { ProductCard } from '../components/product/ProductCard';
import { Search, SlidersHorizontal, Grid, List, Sparkles, TrendingUp } from 'lucide-react';
import { formatPKR } from '../lib/formatters';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const products = useStore((state) => state.products);
  const categories = useStore((state) => state.categories);

  const [sortBy, setSortBy] = useState('best_match');
  const [viewLayout, setViewLayout] = useState('grid');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const searchResults = useMemo(() => {
    if (!query.trim()) return products;
    const lower = query.toLowerCase();

    return products.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(lower);
      const matchBrand = p.brand?.toLowerCase().includes(lower);
      const matchCat = p.categorySlug?.toLowerCase().includes(lower);
      const matchDesc = p.description?.toLowerCase().includes(lower);
      const matchSku = p.sku?.toLowerCase().includes(lower);
      return matchTitle || matchBrand || matchCat || matchDesc || matchSku;
    });
  }, [products, query]);

  const filteredResults = useMemo(() => {
    let list = searchResults;

    if (categoryParam !== 'all') {
      list = list.filter((p) => p.categorySlug === categoryParam);
    }
    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }
    if (freeShippingOnly) {
      list = list.filter((p) => p.freeShipping);
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'orders') return (b.ordersCount || 0) - (a.ordersCount || 0);
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [searchResults, categoryParam, minPrice, maxPrice, freeShippingOnly, sortBy]);

  const popularSearches = [
    'Wireless Earbuds',
    'AMOLED Smart Watch',
    'Electric Chopper',
    'Men Luxury Watch',
    'Designer Handbag',
    'Hot Air Styler',
    'Dash Cam 4K'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Search Header Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
            <Search className="w-4 h-4 text-sky-600" /> Search Results
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {query ? `Results for "${query}"` : 'All Products'}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Found {filteredResults.length} matching items across Pakistan
          </p>
        </div>

        {/* Filter Quick Pills */}
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={freeShippingOnly}
              onChange={(e) => setFreeShippingOnly(e.target.checked)}
              className="w-4 h-4 text-sky-600 rounded"
            />
            <span>Free Delivery Only</span>
          </label>
        </div>
      </div>

      {/* Sort & Grid Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 flex items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none cursor-pointer"
          >
            <option value="best_match">Relevance / Best Match</option>
            <option value="orders">Orders (Best Selling)</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewLayout('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewLayout === 'grid' ? 'bg-white shadow-xs text-sky-600' : 'text-slate-500'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewLayout('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewLayout === 'list' ? 'bg-white shadow-xs text-sky-600' : 'text-slate-500'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results or Empty State Recovery */}
      {filteredResults.length === 0 ? (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-6 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-bold">
            💡
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              No direct matches found for "{query}"
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              We couldn't find an exact item matching your query. Check for typos or try one of these trending dropshipping items:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setSearchParams({ q: term })}
                className="text-xs bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 px-3.5 py-1.5 rounded-full font-medium transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Trending Best Sellers in Pakistan
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            viewLayout === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4'
              : 'space-y-3'
          }
        >
          {filteredResults.map((product) => (
            <ProductCard key={product.id} product={product} layout={viewLayout} />
          ))}
        </div>
      )}
    </div>
  );
};
