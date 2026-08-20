import React from 'react';
import { useStore } from '../../lib/store';
import { Tag, Copy, Check, Clock } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const AccountCoupons = () => {
  const coupons = useStore((state) => state.coupons);
  const applyCoupon = useStore((state) => state.applyCoupon);

  const handleCopy = (code) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-xl font-black text-slate-900">My Coupons & Vouchers</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Available discount vouchers for Pakistani dropshipping orders
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-lg font-black text-slate-900 font-mono tracking-tight">
                  {coupon.code}
                </span>
                <p className="text-xs text-slate-600 mt-1">{coupon.description}</p>
              </div>
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded-xl">
                {coupon.discountPercent > 0 ? `${coupon.discountPercent}% OFF` : `Rs ${coupon.fixedDiscount} OFF`}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                Min. Spend: <strong>{formatPKR(coupon.minSpend)}</strong>
              </span>
              <button
                onClick={() => handleCopy(coupon.code)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" /> Apply Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
