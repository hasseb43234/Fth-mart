import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const AccountWishlist = () => {
  const wishlist = useStore((state) => state.wishlist);
  const products = useStore((state) => state.products);
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">Saved Wishlist</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {wishlistProducts.length} items saved for later purchase
          </p>
        </div>
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 shadow-xs">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
          <p className="text-xs text-slate-500">
            Explore hot dropshipping gadgets and save your favorite items by tapping the heart icon.
          </p>
          <Link
            to="/c/electronics"
            className="inline-block px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors mt-2"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 text-rose-600 hover:bg-rose-50 shadow-md"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-sky-700 uppercase">{product.brand}</span>
                  <Link to={`/p/${product.slug}`}>
                    <h4 className="text-xs font-bold text-slate-900 hover:text-sky-600 line-clamp-2 mt-0.5">
                      {product.title}
                    </h4>
                  </Link>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-base font-black text-red-600">
                      {formatPKR(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPKR(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-4 flex items-center gap-2">
                <button
                  onClick={() => addToCart(product, product.variants?.[0] || null, 1)}
                  className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
