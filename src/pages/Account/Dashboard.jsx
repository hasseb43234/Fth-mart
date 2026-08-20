import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Clock,
  Package,
  Truck,
  Star,
  RotateCcw,
  ChevronRight,
  ShieldCheck,
  MapPin,
  Tag
} from 'lucide-react';
import { formatPKR, formatDate } from '../../lib/formatters';

export const AccountDashboard = () => {
  const orders = useStore((state) => state.orders);
  const user = useStore((state) => state.user);
  const wishlist = useStore((state) => state.wishlist);
  const coupons = useStore((state) => state.coupons);

  const toPayCount = orders.filter((o) => o.paymentStatus === 'pending_cod' && o.status === 'placed').length;
  const toShipCount = orders.filter((o) => ['confirmed', 'packed'].includes(o.status)).length;
  const toReceiveCount = orders.filter((o) => ['shipped', 'in_transit'].includes(o.status)).length;
  const toReviewCount = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div className="space-y-6">
      {/* AliExpress Order Status Summary Tiles */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900">My Orders Summary</h3>
          <Link to="/account/orders" className="text-xs font-bold text-sky-600 hover:underline">
            View All ({orders.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/account/orders?tab=unpaid"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-base font-black text-slate-900 group-hover:text-sky-600">
              {toPayCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">To Pay (COD)</span>
          </Link>

          <Link
            to="/account/orders?tab=to_ship"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-base font-black text-slate-900 group-hover:text-sky-600">
              {toShipCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">To Ship</span>
          </Link>

          <Link
            to="/account/orders?tab=shipped"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
              <Truck className="w-5 h-5" />
            </div>
            <span className="text-base font-black text-slate-900 group-hover:text-sky-600">
              {toReceiveCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">To Receive</span>
          </Link>

          <Link
            to="/account/orders?tab=to_review"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-100 hover:border-sky-200 transition-all flex flex-col items-center text-center group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2">
              <Star className="w-5 h-5" />
            </div>
            <span className="text-base font-black text-slate-900 group-hover:text-sky-600">
              {toReviewCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">To Review</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
          Recent Orders
        </h3>

        {orders.length === 0 ? (
          <p className="text-xs text-slate-500 py-6 text-center">No orders placed yet.</p>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">{order.id}</span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {order.items.length} items • Total: <strong className="text-red-600">{formatPKR(order.total)}</strong> • {formatDate(order.createdAt)}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/track/${order.id}`}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Track
                  </Link>
                  <Link
                    to={`/account/orders/${order.id}`}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Saved Wishlist</h4>
            <p className="text-xs text-slate-500 mt-0.5">{wishlist.length} saved products</p>
          </div>
          <Link
            to="/account/wishlist"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
          >
            Open Wishlist →
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-slate-900">Available Coupons</h4>
            <p className="text-xs text-slate-500 mt-0.5">{coupons.filter(c => c.active).length} active vouchers</p>
          </div>
          <Link
            to="/account/coupons"
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
          >
            View Vouchers →
          </Link>
        </div>
      </div>
    </div>
  );
};
