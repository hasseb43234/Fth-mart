import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  ArrowLeft,
  Truck,
  Printer,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  XCircle,
  Package,
  MapPin,
  Phone,
  MessageCircle,
  Clock
} from 'lucide-react';
import { formatPKR, formatDate, formatDateTime } from '../../lib/formatters';

export const AdminOrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  const order = orders.find((o) => o.id === id) || orders[0];

  const [selectedCourier, setSelectedCourier] = useState(order?.courier || 'TCS Express');
  const [customTracking, setCustomTracking] = useState(order?.trackingNumber || '');
  const [statusNote, setStatusNote] = useState('');

  if (!order) {
    return (
      <div className="text-center py-16 text-slate-400">
        <h2 className="text-lg font-bold">Order not found</h2>
        <Link to="/admin/orders" className="text-sky-400 font-bold mt-2 inline-block">
          Return to Orders Hub
        </Link>
      </div>
    );
  }

  const handleStatusTransition = (newStatus) => {
    updateOrderStatus(
      order.id,
      newStatus,
      statusNote || `Admin moved status to ${newStatus.toUpperCase()}`,
      selectedCourier,
      customTracking || order.trackingNumber
    );
    setStatusNote('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white font-mono">{order.id}</h1>
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-900/60 text-sky-300 border border-sky-700">
                {order.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Placed on {formatDate(order.createdAt)} • {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Prepaid'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" /> Print Dispatch Slip
          </button>
        </div>
      </div>

      {/* Status Workflow Action Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
          Fulfillment & Status Transitions
        </h3>

        <div className="flex flex-wrap items-center gap-2.5">
          {order.status === 'placed' && (
            <button
              onClick={() => handleStatusTransition('confirmed')}
              className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-sky-600/30"
            >
              <CheckCircle2 className="w-4 h-4" /> 1. Confirm WhatsApp / Call
            </button>
          )}

          {['placed', 'confirmed'].includes(order.status) && (
            <button
              onClick={() => handleStatusTransition('packed')}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Package className="w-4 h-4" /> 2. Mark Packed & Labelled
            </button>
          )}

          {['confirmed', 'packed'].includes(order.status) && (
            <button
              onClick={() => handleStatusTransition('shipped')}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Truck className="w-4 h-4" /> 3. Dispatch to Courier (TCS/Trax)
            </button>
          )}

          {['shipped', 'in_transit'].includes(order.status) && (
            <button
              onClick={() => handleStatusTransition('delivered')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-600/30"
            >
              <CheckCircle2 className="w-4 h-4" /> 4. Mark Delivered & Cash Collected
            </button>
          )}

          {['shipped', 'in_transit'].includes(order.status) && (
            <button
              onClick={() => handleStatusTransition('rto')}
              className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" /> Mark RTO (Customer Refused)
            </button>
          )}

          {!['cancelled', 'delivered'].includes(order.status) && (
            <button
              onClick={() => handleStatusTransition('cancelled')}
              className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ml-auto"
            >
              <XCircle className="w-4 h-4" /> Cancel Order
            </button>
          )}
        </div>

        {/* Courier Re-assignment row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-800">
          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Assign Courier Partner</label>
            <select
              value={selectedCourier}
              onChange={(e) => setSelectedCourier(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none"
            >
              <option value="TCS Express">TCS Express</option>
              <option value="Leopards Courier">Leopards Courier</option>
              <option value="Trax Logistics">Trax Logistics</option>
              <option value="PostEx">PostEx</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Tracking Number / AWB</label>
            <input
              type="text"
              value={customTracking}
              onChange={(e) => setCustomTracking(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Internal Note (Optional)</label>
            <input
              type="text"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder="e.g. Verified by rider Tariq"
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white"
            />
          </div>
        </div>
      </div>

      {/* 2-Column Grid: Customer/Delivery Info & Items Margin Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Customer & Address */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
              Customer & Delivery Address
            </h3>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-white text-sm">{order.customer.name}</p>
              <p className="text-slate-400 flex items-center gap-1.5 font-mono">
                <Phone className="w-3.5 h-3.5 text-sky-400" /> {order.customer.phone}
              </p>
              <p className="text-slate-400">{order.customer.email}</p>

              <div className="pt-3 border-t border-slate-800 space-y-1 text-slate-300">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Delivery Address (Pakistan)
                </span>
                <p className="font-medium text-white">{order.shippingAddress.street}</p>
                <p>{order.shippingAddress.area}, {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.province}, Pakistan</p>
                {order.shippingAddress.landmark && (
                  <p className="text-slate-400 text-[11px]">Landmark: {order.shippingAddress.landmark}</p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">RTO Risk Score:</span>
              <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                LOW RISK (Verified)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Items Snapshot & Profit Margin Breakdown */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-white">
                Ordered Items Snapshot ({order.items.length})
              </h3>
              <span className="text-xs font-black text-emerald-400">
                Gross Profit: {formatPKR(order.grossProfit || order.total * 0.45)}
              </span>
            </div>

            <div className="space-y-3">
              {order.items.map((item, i) => {
                const itemCost = item.costPrice || item.price * 0.5;
                const itemProfit = item.price - itemCost;

                return (
                  <div
                    key={i}
                    className="p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white line-clamp-1">{item.title}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.variantTitle} • Qty: {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="text-right whitespace-nowrap">
                      <span className="text-xs font-black text-white block">
                        {formatPKR(item.price * item.quantity)}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        +{formatPKR(itemProfit * item.quantity)} profit
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Calculations Breakdown */}
            <div className="border-t border-slate-800 pt-3 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white">{formatPKR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Courier Shipping Fee ({order.courier}):</span>
                <span className="font-bold text-white">
                  {order.shippingFee === 0 ? 'FREE' : formatPKR(order.shippingFee)}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>Voucher Discount:</span>
                  <span>-{formatPKR(order.discount)}</span>
                </div>
              )}
              <div className="border-t border-slate-800 pt-2 flex justify-between text-sm font-black text-white">
                <span>Total Amount (PKR):</span>
                <span className="text-emerald-400 text-base">{formatPKR(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
