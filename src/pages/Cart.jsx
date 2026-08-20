import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';

export const Cart = () => {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const toggleCartItemSelection = useStore((state) => state.toggleCartItemSelection);
  const selectAllCartItems = useStore((state) => state.selectAllCartItems);
  const appliedCoupon = useStore((state) => state.appliedCoupon);
  const applyCoupon = useStore((state) => state.applyCoupon);
  const removeCoupon = useStore((state) => state.removeCoupon);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const getCartShipping = useStore((state) => state.getCartShipping);
  const getCartDiscount = useStore((state) => state.getCartDiscount);
  const getCartTotal = useStore((state) => state.getCartTotal);

  const [couponInput, setCouponInput] = useState('');

  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const discount = getCartDiscount();
  const total = getCartTotal();

  const allSelected = cart.length > 0 && cart.every((item) => item.selected);
  const selectedCount = cart.filter((item) => item.selected).length;

  const freeShippingThreshold = 2500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 bg-[#f2f4f5]">
        <div className="bg-white rounded-[28px] p-12 shadow-pillow text-center max-w-md mx-auto space-y-4 border border-[#ebebeb]/60">
          <div className="w-16 h-16 rounded-full bg-[#f2f4f5] text-black flex items-center justify-center mx-auto shadow-pill">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-black tracking-tight-display">Your Cart is Empty</h2>
          <p className="text-xs text-[#787574] leading-relaxed">
            Discover thousands of hot Pakistani dropshipping deals with free nationwide delivery.
          </p>
          <Link
            to="/c/electronics"
            className="inline-flex items-center gap-2 px-7 py-3 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full text-xs font-semibold transition-all shadow-violet-glow"
          >
            <span>Start Shopping Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-6 bg-[#f2f4f5] pb-24">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight-display">
          Shopping Cart ({cart.length} items)
        </h1>
        <p className="text-xs text-[#787574] mt-1 tracking-tight-body">
          Review your items, apply promo codes, and proceed to Cash on Delivery checkout.
        </p>
      </div>

      {/* Free Delivery Meter Banner with 28px Radius */}
      <div className="bg-white rounded-[28px] p-5 sm:p-6 shadow-pillow border border-[#ebebeb]/60 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#5433eb]" />
            <span className="font-semibold text-xs sm:text-sm text-black tracking-tight-body">
              {amountToFreeShipping === 0
                ? '🎉 Congratulations! You qualify for FREE Nationwide Delivery'
                : `Add ${formatPKR(amountToFreeShipping)} more to unlock FREE Delivery in Pakistan!`}
            </span>
          </div>
          <span className="text-xs font-semibold text-[#5433eb]">
            {progressPercent}% unlocked
          </span>
        </div>
        <div className="w-full h-2 bg-[#f2f4f5] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#5433eb] rounded-full transition-all duration-500 shadow-violet-glow"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cart Items List */}
        <div className="lg:col-span-8 space-y-4">
          {/* Select All Bar */}
          <div className="bg-white rounded-[28px] p-4 shadow-pillow border border-[#ebebeb]/60 flex items-center justify-between">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-black cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => selectAllCartItems(e.target.checked)}
                className="w-4 h-4 rounded text-[#5433eb] focus:ring-[#5433eb]"
              />
              <span>Select All ({cart.length} items)</span>
            </label>

            <span className="text-xs text-[#787574]">
              {selectedCount} of {cart.length} selected
            </span>
          </div>

          {/* Items Container */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-[28px] p-4 sm:p-5 shadow-pillow border border-[#ebebeb]/60 flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => toggleCartItemSelection(item.id)}
                  className="w-4 h-4 rounded text-[#5433eb] focus:ring-[#5433eb] mt-1 sm:mt-0"
                />

                {/* Product Thumbnail with 20px inner radius */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-[20px] object-cover bg-[#f2f4f5] border border-[#ebebeb]/60 flex-shrink-0"
                />

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-semibold text-[#787574] uppercase tracking-wider">
                    {item.sellerName || 'FTH Verified Store'}
                  </div>
                  <Link
                    to={`/p/${item.productId}`}
                    className="text-xs sm:text-sm font-semibold text-black hover:text-[#5433eb] line-clamp-2 transition-colors mt-0.5 tracking-tight-body"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-[#787574] mt-1">
                    Option: <span className="text-black font-medium">{item.variantTitle}</span>
                  </p>
                  <p className="text-[11px] font-mono text-[#acb0aa]">
                    SKU: {item.sku}
                  </p>
                </div>

                {/* Price and Quantity Stepper */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#ebebeb]">
                  <div className="text-right">
                    <span className="text-base font-bold text-black block tracking-tight-display">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-[10px] text-[#787574]">
                        {formatPKR(item.price)} each
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Stepper with Pill Shape */}
                    <div className="flex items-center border border-[#ebebeb] rounded-full bg-[#f2f4f5] p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 text-black flex items-center justify-center shadow-pill"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-bold text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-full bg-white hover:bg-slate-100 text-black flex items-center justify-center shadow-pill"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-[#787574] hover:text-red-600 rounded-full hover:bg-red-50 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary & Coupon */}
        <div className="lg:col-span-4 space-y-4">
          {/* Coupon / Voucher Box */}
          <div className="bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60 space-y-3">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-black flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#5433eb]" /> Apply Promo Voucher
            </h3>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-[20px]">
                <div>
                  <span className="font-bold text-xs text-emerald-950 block">{appliedCoupon.code}</span>
                  <span className="text-[11px] text-emerald-800">{appliedCoupon.description}</span>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs font-bold text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="e.g. AZADI500"
                  className="text-xs p-3 bg-[#f2f4f5] rounded-full focus:outline-none uppercase font-mono flex-1 pl-4"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-black hover:bg-[#222222] text-white rounded-full text-xs font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>
            )}

            <div className="text-[10px] text-[#787574]">
              Available vouchers: <code className="font-bold text-black">AZADI500</code> (Rs 500 OFF) or <code className="font-bold text-black">WELCOME10</code>
            </div>
          </div>

          {/* Order Summary Box */}
          <div className="bg-white rounded-[28px] p-6 shadow-pillow border border-[#ebebeb]/60 space-y-4">
            <h3 className="font-bold text-sm text-black border-b border-[#ebebeb] pb-3 tracking-tight-display">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-[#787574]">
              <div className="flex justify-between">
                <span>Subtotal ({selectedCount} items)</span>
                <span className="font-bold text-black">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>TCS Courier Delivery</span>
                <span className="font-bold text-black">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    formatPKR(shipping)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="border-t border-[#ebebeb] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-black">Total Amount</span>
                <span className="text-xl font-extrabold text-black tracking-tight-display">{formatPKR(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              disabled={selectedCount === 0}
              className="w-full py-4 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full font-semibold text-xs sm:text-sm shadow-violet-glow transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <span>Proceed to Checkout ({selectedCount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="space-y-2 pt-2 border-t border-[#ebebeb] text-[11px] text-[#787574]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Cash on Delivery pre-selected at next step</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-sky-600" />
                <span>7 Days Hassle-Free Replacement in Pakistan</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
