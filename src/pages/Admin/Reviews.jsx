import React from 'react';
import { useStore } from '../../lib/store';
import { Rating } from '../../components/ui/Rating';
import { Star, CheckCircle2, XCircle, Trash2, MessageSquare } from 'lucide-react';

export const AdminReviews = () => {
  const products = useStore((state) => state.products);
  const reviews = products.flatMap((p) => (p.reviews || []).map((r) => ({ ...r, productTitle: p.title, productId: p.id })));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Customer Reviews Moderation ({reviews.length})</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Approve, reply or flag buyer ratings & product photo uploads
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xs"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h4 className="text-xs font-bold text-white">{rev.productTitle}</h4>
                <p className="text-[11px] text-slate-400">By <strong>{rev.userName}</strong> on {rev.date}</p>
              </div>
              <Rating rating={rev.rating} size="sm" showValue={true} />
            </div>

            <p className="text-xs text-slate-300 bg-slate-800/80 p-3.5 rounded-2xl leading-relaxed">
              "{rev.comment}"
            </p>

            {rev.images?.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                {rev.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Review attachment"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-700"
                  />
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 flex justify-end gap-2">
              <button className="px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Approved
              </button>
              <button className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition-colors flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" /> Reply to Buyer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
