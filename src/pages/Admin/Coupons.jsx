import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { Tag, Plus, Trash2, CheckCircle2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { formatPKR } from '../../lib/formatters';

export const AdminCoupons = () => {
  const coupons = useStore((state) => state.coupons);
  const addCoupon = useStore((state) => state.addCoupon);
  const deleteCoupon = useStore((state) => state.deleteCoupon);
  const toggleCouponStatus = useStore((state) => state.toggleCouponStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [fixedDiscount, setFixedDiscount] = useState(0);
  const [minSpend, setMinSpend] = useState(2000);
  const [description, setDescription] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!code.trim()) return;
    addCoupon({
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      fixedDiscount: Number(fixedDiscount),
      minSpend: Number(minSpend),
      description: description || `${discountPercent > 0 ? `${discountPercent}%` : `Rs ${fixedDiscount}`} Discount Voucher`,
      expiry: '2026-12-31'
    });
    setIsModalOpen(false);
    setCode('');
    setDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Coupons & Promotions ({coupons.length})</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Create discount promo codes for flash sales, TikTok influencers & new users
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Create Coupon
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.code}
            className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-base text-white">{coupon.code}</span>
                <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {coupon.discountPercent > 0 ? `${coupon.discountPercent}% OFF` : `Rs ${coupon.fixedDiscount} OFF`}
                </span>
              </div>
              <p className="text-xs text-slate-300">{coupon.description}</p>
              <p className="text-xs text-slate-400">Min. Spend: {formatPKR(coupon.minSpend)}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => toggleCouponStatus(coupon.code)}
                className={`text-xs font-bold flex items-center gap-1 ${
                  coupon.active ? 'text-emerald-400' : 'text-slate-500'
                }`}
              >
                {coupon.active ? 'Active' : 'Disabled'}
              </button>

              <button
                onClick={() => deleteCoupon(coupon.code)}
                className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Promotional Coupon"
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Coupon Code *</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. FLASH20"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl uppercase font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Discount %</label>
              <input
                type="number"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Fixed Flat Rs Discount</label>
              <input
                type="number"
                value={fixedDiscount}
                onChange={(e) => setFixedDiscount(Number(e.target.value))}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Minimum Spend (PKR)</label>
            <input
              type="number"
              value={minSpend}
              onChange={(e) => setMinSpend(Number(e.target.value))}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. 15% OFF for TikTok Flash Sale"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
            >
              Create Coupon
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
