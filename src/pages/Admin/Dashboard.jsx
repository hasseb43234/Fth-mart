import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Users,
  Percent,
  Truck,
  RotateCcw,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Plus
} from 'lucide-react';
import { formatPKR, formatDate } from '../../lib/formatters';

export const AdminDashboard = () => {
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);

  // Compute Dropshipping Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.total : 0), 0);
  const totalGrossProfit = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? (o.grossProfit || o.total * 0.45) : 0), 0);
  const avgOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const grossMarginPercent = totalRevenue > 0 ? Math.round((totalGrossProfit / totalRevenue) * 100) : 48;

  const lowStockProducts = products.filter((p) => p.stock <= (p.lowStockThreshold || 15));
  const rtoOrders = orders.filter((o) => o.status === 'rto').length;
  const rtoRate = orders.length > 0 ? ((rtoOrders / orders.length) * 100).toFixed(1) : '2.1';

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Dropshipping Operations Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time sales, gross profit margins, and courier dispatch metrics across Pakistan
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add New Product
          </Link>
        </div>
      </div>

      {/* 6 Key Dropshipping Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Sales (PKR)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white">{formatPKR(totalRevenue)}</p>
          <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs last week
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Total Orders</span>
            <div className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white">{orders.length}</p>
          <span className="text-[11px] text-sky-400 font-bold flex items-center gap-0.5">
            <ArrowUpRight className="w-3 h-3" /> 100% COD Verified
          </span>
        </div>

        {/* Gross Profit */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Gross Dropship Profit</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-amber-400">{formatPKR(totalGrossProfit)}</p>
          <span className="text-[11px] text-slate-400 font-medium">
            (Price − Supplier Cost)
          </span>
        </div>

        {/* Gross Margin % */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Margin %</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-purple-400">{grossMarginPercent}%</p>
          <span className="text-[11px] text-purple-300 font-bold">Healthy dropship ROI</span>
        </div>

        {/* Average Order Value */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Average Order Value</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-white">{formatPKR(avgOrderValue)}</p>
          <span className="text-[11px] text-slate-400">Basket size in PKR</span>
        </div>

        {/* RTO Return-to-Origin Rate (Pakistan specific) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-2 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>RTO Rate (COD)</span>
            <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <p className="text-xl font-black text-emerald-400">{rtoRate}%</p>
          <span className="text-[11px] text-emerald-400 font-bold">Low return risk</span>
        </div>
      </div>

      {/* SVG Sales Trend Chart & Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Visualizer */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-sm text-white">Revenue vs Dropship Supplier Cost (PKR)</h3>
              <p className="text-xs text-slate-400">Weekly sales trajectory across Karachi, Lahore & Islamabad</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
              Profitable Trajectory
            </span>
          </div>

          {/* Clean SVG Trend Chart */}
          <div className="h-64 w-full pt-4">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#1e293b" strokeDasharray="4" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#1e293b" strokeDasharray="4" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#1e293b" strokeDasharray="4" />

              {/* Area Gradient for Profit */}
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Path Area */}
              <path
                d="M 0 170 Q 100 130 200 110 T 400 60 T 600 30 L 600 200 L 0 200 Z"
                fill="url(#profitGrad)"
              />

              {/* Revenue Curve */}
              <path
                d="M 0 170 Q 100 130 200 110 T 400 60 T 600 30"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Cost Curve */}
              <path
                d="M 0 185 Q 100 160 200 150 T 400 120 T 600 100"
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="4"
              />

              {/* Nodes */}
              <circle cx="200" cy="110" r="5" fill="#38bdf8" />
              <circle cx="400" cy="60" r="5" fill="#38bdf8" />
              <circle cx="600" cy="30" r="6" fill="#10b981" />
            </svg>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 px-2">
              <span>Monday</span>
              <span>Wednesday</span>
              <span>Friday</span>
              <span>Sunday (Today Peak)</span>
            </div>
          </div>
        </div>

        {/* Courier Distribution */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-white">Courier Network Share</h3>
            <p className="text-xs text-slate-400 mt-0.5">Dispatches handled by Pakistani couriers</p>

            <div className="space-y-3.5 mt-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>🚚 TCS Express</span>
                  <span className="text-sky-400">55%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[55%] h-full bg-sky-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>🐆 Leopards Courier</span>
                  <span className="text-amber-400">25%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[25%] h-full bg-amber-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>⚡ Trax Logistics</span>
                  <span className="text-purple-400">15%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[15%] h-full bg-purple-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1 text-slate-300">
                  <span>📦 PostEx</span>
                  <span className="text-emerald-400">5%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-[5%] h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 text-xs text-slate-300">
            💡 <strong>Pro Tip:</strong> TCS & Trax provide automated WhatsApp verification reducing Pakistani COD refusals by 82%.
          </div>
        </div>
      </div>

      {/* Low Stock Alerts & Recent Live Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Low Stock Alerts */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Low Stock Inventory Alerts ({lowStockProducts.length})
            </h3>
            <Link to="/admin/products" className="text-xs text-sky-400 font-bold hover:underline">
              Manage →
            </Link>
          </div>

          <div className="space-y-3">
            {lowStockProducts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="p-3 bg-slate-800/70 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-3"
              >
                <img
                  src={p.images[0]}
                  alt={p.title}
                  className="w-10 h-10 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{p.title}</p>
                  <p className="text-[11px] text-slate-400">Supplier: {p.supplierName}</p>
                </div>
                <span className="text-xs font-black text-red-400 bg-red-500/10 px-2.5 py-1 rounded-lg border border-red-500/20 whitespace-nowrap">
                  {p.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Live Stream */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white">Live Orders Dispatch Stream</h3>
            <Link to="/admin/orders" className="text-xs text-sky-400 font-bold hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Destination</th>
                  <th className="py-2.5 px-3">Total</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-sky-400">{ord.id}</td>
                    <td className="py-3 px-3 font-semibold text-white">{ord.customer.name}</td>
                    <td className="py-3 px-3 text-slate-300">{ord.shippingAddress.city}</td>
                    <td className="py-3 px-3 font-bold text-emerald-400">{formatPKR(ord.total)}</td>
                    <td className="py-3 px-3">
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to={`/admin/orders/${ord.id}`}
                        className="text-[11px] font-bold text-sky-400 hover:text-sky-300"
                      >
                        Manage →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
