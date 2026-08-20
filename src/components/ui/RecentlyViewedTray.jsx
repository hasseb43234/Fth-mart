import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { History, X, ChevronRight } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const RecentlyViewedTray = () => {
  const recentlyViewed = useStore((state) => state.recentlyViewed);
  const [isOpen, setIsOpen] = useState(false);

  if (!recentlyViewed || recentlyViewed.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-6 z-30 hidden lg:block">
      {isOpen ? (
        <div className="w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <History className="w-4 h-4 text-sky-600" />
              Recently Viewed ({recentlyViewed.length})
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {recentlyViewed.map((item) => (
              <Link
                key={item.id}
                to={`/p/${item.slug}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <img
                  src={item.images?.[0] || 'https://placehold.co/100'}
                  alt={item.title}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 border border-slate-100 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-slate-800 group-hover:text-sky-600 truncate">
                    {item.title}
                  </p>
                  <p className="text-xs font-bold text-red-600">
                    {formatPKR(item.price)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white text-slate-800 border border-slate-200 shadow-md hover:shadow-lg px-3 py-2 rounded-full text-xs font-semibold hover:border-sky-500 transition-all group"
        >
          <History className="w-4 h-4 text-sky-600 group-hover:rotate-45 transition-transform" />
          <span>Recently Viewed ({recentlyViewed.length})</span>
        </button>
      )}
    </div>
  );
};
