import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Package,
  Truck,
  Search,
  RotateCcw,
  Star,
  Printer,
  ChevronRight,
  ShieldCheck,
  Clock,
  XCircle
} from 'lucide-react';
import { formatPKR, formatDate } from '../../lib/formatters';

export const AccountOrders = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'all';

  const orders = useStore((state) => state.orders);
  const cancelOrder = useStore((state) => state.cancelOrder);
  const addToCart = useStore((state) => state.addToCart);
  const products = useStore((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'unpaid', label: 'To Pay (COD)' },
    { id: 'to_ship', label: 'To Ship' },
    { id: 'shipped', label: 'To Receive' },
    { id: 'to_review', label: 'To Review' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = useMemo(() => {
    let list = orders;

    if (activeTab === 'unpaid') {
      list = list.filter((o) => o.paymentStatus === 'pending_cod' && o.status === 'placed');
    } else if (activeTab === 'to_ship') {
      list = list.filter((o) => ['confirmed', 'packed'].includes(o.status));
    } else if (activeTab === 'shipped') {
      list = list.filter((o) => ['shipped', 'in_transit'].includes(o.status));
    } else if (activeTab === 'to_review') {
      list = list.filter((o) => o.status === 'delivered');
    } else if (activeTab === 'cancelled') {
      list = list.filter((o) => ['cancelled', 'rto'].includes(o.status));
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.items.some((i) => i.title.toLowerCase().includes(q))
      );
    }

    return list;
  }, [orders, activeTab, searchTerm]);

  const handleBuyAgain = (order) => {
    order.items.forEach((item) => {
      const originalProduct = products.find((p) => p.id === item.productId) || {
        id: item.productId,
        title: item.title,
        price: item.price,
        images: [item.image]
      };
      addToCart(originalProduct, { id: item.sku, title: item.variantTitle, price: item.price }, item.quantity);
    });
  };

  return (
    <div className="space-y-6">
      {/* Search & Tabs Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-xl font-black text-slate-900">My Orders</h2>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by order ID or item..."
              className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* AliExpress Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSearchParams(tab.id === 'all' ? {} : { tab: tab.id })}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Stream */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-3 shadow-xs">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No orders in this tab</h3>
          <p className="text-xs text-slate-500">
            You don't have any orders matching the "{tabs.find((t) => t.id === activeTab)?.label}" criteria.
          </p>
          <Link
            to="/c/electronics"
            className="inline-block px-5 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-700 transition-colors mt-2"
          >
            Explore Hot Deals
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all"
            >
              {/* Order Meta Strip */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4 text-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="font-mono font-black text-slate-900">{order.id}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500">{formatDate(order.createdAt)}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-700 font-semibold">{order.customer.name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-md bg-sky-100 text-sky-800">
                    {order.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Variant: {item.variantTitle} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-black text-slate-900 whitespace-nowrap">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order Footer Actions & Totals */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs">
                  <span className="text-slate-500">Total Order Amount: </span>
                  <strong className="text-red-600 text-sm font-black">{formatPKR(order.total)}</strong>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                  <Link
                    to={`/track/${order.id}`}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                  >
                    <Truck className="w-3.5 h-3.5" /> Track
                  </Link>

                  <button
                    onClick={() => handleBuyAgain(order)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                  >
                    Buy Again
                  </button>

                  {['placed', 'confirmed'].includes(order.status) && (
                    <button
                      onClick={() => {
                        if (confirm(`Cancel order ${order.id}?`)) {
                          cancelOrder(order.id);
                        }
                      }}
                      className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-xs font-bold transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
