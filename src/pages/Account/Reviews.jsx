import React from 'react';
import { useStore } from '../../lib/store';
import { Rating } from '../../components/ui/Rating';
import { Star, MessageSquare } from 'lucide-react';

export const AccountReviews = () => {
  const products = useStore((state) => state.products);
  const allReviews = products.flatMap((p) => (p.reviews || []).map((r) => ({ ...r, productTitle: p.title, productSlug: p.slug })));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-black text-slate-900">My Product Reviews</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Reviews you've shared with the FTH Mart community
        </p>
      </div>

      <div className="space-y-4">
        {allReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900">{rev.productTitle}</h4>
                <span className="text-[11px] text-slate-500">{rev.date} • {rev.userName}</span>
              </div>
              <Rating rating={rev.rating} size="sm" showValue={false} />
            </div>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl">
              "{rev.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
