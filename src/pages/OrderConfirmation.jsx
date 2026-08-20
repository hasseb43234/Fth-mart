import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  Printer,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  Clock
} from 'lucide-react';
import { formatPKR, formatDate } from '../lib/formatters';

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const orders = useStore((state) => state.orders);

  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Trigger celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {
      console.log('Confetti error:', err);
    }
  }, []);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Order not found</h2>
        <Link to="/" className="text-sky-600 font-bold mt-2 inline-block">
          Return to Home →
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Assalam-o-Alaikum FTH Mart! I placed Order #${order.id} for ${formatPKR(order.total)} to ${order.shippingAddress.city}. Please confirm dispatch.`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Success Hero Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="text-xs font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Placed Successfully
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Thank you, {order.customer.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
            Your order <strong className="text-slate-900">{order.id}</strong> has been registered and sent to our dropship fulfillment hub.
          </p>
        </div>

        {/* WhatsApp Verification Banner (Key Pakistani RTO Reducer) */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 max-w-lg mx-auto text-left flex items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-emerald-600" /> Instant WhatsApp Confirmation
            </h4>
            <p className="text-[11px] text-emerald-800 mt-0.5">
              Speed up courier dispatch by verifying your address with our team.
            </p>
          </div>
          <a
            href={`https://wa.me/923214892104?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
          >
            Confirm on WhatsApp
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to={`/track/${order.id}`}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Truck className="w-4 h-4" />
            <span>Track Order Timeline</span>
          </Link>

          <button
            onClick={handlePrint}
            className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>
      </div>

      {/* Printable Receipt & Order Summary Box */}
      <div id="printable-receipt" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="FTH Mart" className="h-10 w-auto rounded-lg object-contain" />
            <div>
              <h3 className="font-black text-lg text-slate-900">FTH Mart Invoice</h3>
              <p className="text-[11px] text-slate-500">Order ID: {order.id}</p>
            </div>
          </div>
          <div className="text-right text-xs text-slate-600">
            <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
            <p><strong>Payment:</strong> {order.paymentMethod === 'cod' ? 'Cash on Delivery (PKR)' : 'Prepaid Transfer'}</p>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-2xl border border-slate-100 text-xs">
          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 text-[10px]">
              Customer Details
            </h4>
            <p className="font-bold text-slate-900">{order.customer.name}</p>
            <p className="text-slate-600 flex items-center gap-1 mt-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" /> {order.customer.phone}
            </p>
            <p className="text-slate-600">{order.customer.email}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-2 text-[10px]">
              Delivery Destination
            </h4>
            <p className="text-slate-900 font-medium">{order.shippingAddress.street}</p>
            <p className="text-slate-600">{order.shippingAddress.area}, {order.shippingAddress.city}</p>
            <p className="text-slate-600">{order.shippingAddress.province}, Pakistan</p>
            {order.shippingAddress.landmark && (
              <p className="text-slate-500 text-[11px] mt-1">Landmark: {order.shippingAddress.landmark}</p>
            )}
          </div>
        </div>

        {/* Ordered Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-2">Item Description</th>
                <th className="py-2.5 px-2 text-center">Qty</th>
                <th className="py-2.5 px-2 text-right">Unit Price</th>
                <th className="py-2.5 px-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, i) => (
                <tr key={i}>
                  <td className="py-3 px-2 flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <p className="font-bold text-slate-900 line-clamp-1">{item.title}</p>
                      <p className="text-[10px] text-slate-500">Variant: {item.variantTitle}</p>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-center font-bold">{item.quantity}</td>
                  <td className="py-3 px-2 text-right text-slate-600">{formatPKR(item.price)}</td>
                  <td className="py-3 px-2 text-right font-black text-slate-900">
                    {formatPKR(item.price * item.quantity)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="border-t border-slate-200 pt-4 flex justify-end">
          <div className="w-64 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-slate-900">{formatPKR(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Courier Delivery ({order.courier}):</span>
              <span className="font-bold text-slate-900">
                {order.shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : formatPKR(order.shippingFee)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Voucher Discount:</span>
                <span>-{formatPKR(order.discount)}</span>
              </div>
            )}
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-black text-slate-900">
              <span>Total Payable:</span>
              <span className="text-red-600 text-base">{formatPKR(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
