import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import {
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Phone,
  AlertCircle
} from 'lucide-react';
import { formatPKR, formatDateTime } from '../lib/formatters';

export const OrderTracking = () => {
  const { orderNo } = useParams();
  const orders = useStore((state) => state.orders);

  const [searchInput, setSearchInput] = useState(orderNo || '');
  const [selectedOrder, setSelectedOrder] = useState(
    orders.find((o) => o.id === orderNo || o.trackingNumber === orderNo) || orders[0]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const clean = searchInput.trim().toUpperCase();
    const found = orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.trackingNumber?.toUpperCase() === clean ||
        o.customer.phone === searchInput.trim()
    );

    if (found) {
      setSelectedOrder(found);
    } else {
      alert(`No order found matching "${searchInput}". Please check your order ID or phone number.`);
    }
  };

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', desc: 'Registered in system' },
    { key: 'confirmed', label: 'Confirmed', desc: 'Verified by WhatsApp/Call' },
    { key: 'packed', label: 'Packed & Barcoded', desc: 'Ready for dispatch' },
    { key: 'shipped', label: 'Dispatched', desc: 'Handed to courier partner' },
    { key: 'in_transit', label: 'In Transit', desc: 'Out for local delivery' },
    { key: 'delivered', label: 'Delivered', desc: 'Completed & cash collected' }
  ];

  const getStepStatus = (stepKey, currentStatus) => {
    const orderProgression = ['placed', 'confirmed', 'packed', 'shipped', 'in_transit', 'delivered'];
    const currentIndex = orderProgression.indexOf(currentStatus);
    const stepIndex = orderProgression.indexOf(stepKey);

    if (currentStatus === 'cancelled') return 'cancelled';
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Tracking Search Hero Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white text-center space-y-4 shadow-md">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
          <Truck className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black">Track Your Order in Pakistan</h1>
          <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
            Enter your FTH Mart Order Number (e.g. FTH-2026-001284) or registered phone number.
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-md mx-auto flex gap-2 pt-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="FTH-2026-XXXXXX or 03XXXXXXXXX"
            className="flex-1 text-xs px-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 font-mono uppercase"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Search className="w-4 h-4" /> Track
          </button>
        </form>
      </div>

      {selectedOrder ? (
        <div className="space-y-6">
          {/* Order Meta Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase text-slate-500">Order ID:</span>
                <span className="text-base font-black text-slate-900">{selectedOrder.id}</span>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  {selectedOrder.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Courier: <strong className="text-slate-800">{selectedOrder.courier}</strong> • Tracking #: <strong className="text-slate-800 font-mono">{selectedOrder.trackingNumber}</strong>
              </p>
            </div>

            <a
              href={`https://wa.me/923214892104?text=${encodeURIComponent(`Assalam-o-Alaikum! Please share live update for order #${selectedOrder.id}`)}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>

          {/* Horizontal / Stepper Milestone Bar */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Delivery Progress
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {statusSteps.map((step) => {
                const state = getStepStatus(step.key, selectedOrder.status);

                return (
                  <div
                    key={step.key}
                    className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-between gap-2 transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-50/50 border-emerald-300 text-emerald-950'
                        : state === 'current'
                        ? 'bg-sky-50 border-sky-500 text-sky-950 shadow-sm ring-2 ring-sky-500/20'
                        : 'bg-slate-50/50 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${
                        state === 'completed'
                          ? 'bg-emerald-600 text-white'
                          : state === 'current'
                          ? 'bg-sky-600 text-white animate-pulse'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {state === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : '•'}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold leading-tight">{step.label}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vertical Detailed Timeline Events */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
            <h3 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-3">
              Live Activity Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {selectedOrder.timeline?.map((evt, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full bg-sky-600 ring-4 ring-white border-2 border-sky-400" />
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <h4 className="font-bold text-slate-900">{evt.title}</h4>
                      <span className="text-[11px] text-slate-500 font-mono">{formatDateTime(evt.time)}</span>
                    </div>
                    <p className="text-xs text-slate-600">{evt.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3 shadow-xs">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No order selected</h3>
          <p className="text-xs text-slate-500">
            Please search with a valid Order ID or Mobile Number above.
          </p>
        </div>
      )}
    </div>
  );
};
