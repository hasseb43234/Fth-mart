import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Drawer } from '../ui/Drawer';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const CartDrawer = () => {
  const navigate = useNavigate();
  const isCartDrawerOpen = useStore((state) => state.isCartDrawerOpen);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);
  const cart = useStore((state) => state.cart);
  const updateCartQuantity = useStore((state) => state.updateCartQuantity);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const getCartShipping = useStore((state) => state.getCartShipping);
  const getCartTotal = useStore((state) => state.getCartTotal);

  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const total = getCartTotal();

  const freeShippingThreshold = 2500;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    setCartDrawerOpen(false);
    navigate('/checkout');
  };

  return (
    <Drawer
      isOpen={isCartDrawerOpen}
      onClose={() => setCartDrawerOpen(false)}
      title={`Shopping Cart (${cart.length})`}
      side="right"
    >
      <div className="flex flex-col h-full">
        {/* Free Delivery Meter */}
        <div className="mb-4 p-3 bg-sky-50 rounded-2xl border border-sky-100">
          <div className="flex items-center justify-between text-xs font-bold text-sky-900 mb-1.5">
            <span>
              {amountToFreeShipping === 0
                ? '🎉 You have unlocked FREE TCS Express Shipping!'
                : `Add ${formatPKR(amountToFreeShipping)} more for FREE Shipping`}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-sky-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800">Your cart is empty</h4>
              <p className="text-xs text-slate-500 mt-1">
                Explore hot AliExpress dropshipping deals and trending tech gadgets!
              </p>
            </div>
            <button
              onClick={() => {
                setCartDrawerOpen(false);
                navigate('/c/electronics');
              }}
              className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Start Shopping Now
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 rounded-xl object-cover bg-white border border-slate-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/p/${item.productSlug || item.productId}`}
                    onClick={() => setCartDrawerOpen(false)}
                    className="text-xs font-bold text-slate-900 hover:text-sky-600 line-clamp-1"
                  >
                    {item.title}
                  </Link>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Variant: {item.variantTitle}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-black text-red-600">
                      {formatPKR(item.price)}
                    </span>
                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg p-0.5">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-800"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-800"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 pt-4 mt-auto space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Shipping (TCS)</span>
                <span className="font-semibold text-slate-900">
                  {shipping === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatPKR(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 border-t border-slate-100 pt-1.5">
                <span>Total (PKR)</span>
                <span className="text-red-600">{formatPKR(total)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/cart');
                }}
                className="py-2.5 px-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold transition-colors text-center"
              >
                View Full Cart
              </button>
              <button
                onClick={handleCheckout}
                className="py-2.5 px-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-sm"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Cash on Delivery available at checkout
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};
