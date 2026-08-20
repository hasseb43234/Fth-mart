import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  ShoppingBag,
  Search,
  Truck,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Printer
} from 'lucide-react';
import { formatPKR, formatDate } from '../../lib/formatters';

export const AdminOrders = () => {
  const orders = useStore((state) => state.orders);
  const updateOrderStatus = useStore((state) => state.updateOrderStatus);

  const [activeStatus, setActiveStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedCourier, setSelectedCourier] = useState('all');

  const statusTabs = [
    { id: 'all', label: 'All Orders' },
    { id: 'placed', label: 'Pending WhatsApp' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'packed', label: 'Packed' },
    { id: 'shipped', label: 'Dispatched' },
    { id: 'in_transit', label: 'In Transit' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'rto', label: 'RTO Returned' }
  ];

  const filteredOrders = useMemo(() => {
    let list = orders;

    if (activeStatus !== 'all') {
      list = list.filter((o) => o.status === activeStatus);
    }
    if (selectedCourier !== 'all') {
      list = list.filter((o) => o.courier?.toLowerCase().includes(selectedCourier.toLowerCase()));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q) ||
          o.customer.phone.includes(q) ||
          o.shippingAddress.city.toLowerCase().includes(q)
      );
    }

    return list;
  }, [orders, activeStatus, selectedCourier, search]);

  const handleExportCSV = () => {
    const headers = 'Order ID,Customer Name,Phone,City,Total PKR,Status,Payment,Courier,Tracking #\n';
    const rows = filteredOrders
      .map(
        (o) =>
          `${o.id},"${o.customer.name}",${o.customer.phone},${o.shippingAddress.city},${o.total},${o.status},${o.paymentMethod},${o.courier},${o.trackingNumber}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fth_mart_orders_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Orders Dispatch Hub ({orders.length})</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage nationwide Cash on Delivery dropshipping fulfillments & TCS/Trax logistics
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {statusTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatus(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              activeStatus === tab.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Order #, phone, customer, city..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedCourier}
            onChange={(e) => setSelectedCourier(e.target.value)}
            className="text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200 rounded-xl px-3 py-2.5 focus:outline-none cursor-pointer w-full sm:w-auto"
          >
            <option value="all">All Couriers</option>
            <option value="tcs">TCS Express</option>
            <option value="leopards">Leopards Courier</option>
            <option value="trax">Trax Logistics</option>
            <option value="postex">PostEx</option>
          </select>
        </div>
      </div>

      {/* Orders Data Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase bg-slate-950/50">
                <th className="py-3 px-4">Order ID & Date</th>
                <th className="py-3 px-4">Customer & Phone</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Items Count</th>
                <th className="py-3 px-4">Order Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Courier Tracking</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <Link
                      to={`/admin/orders/${ord.id}`}
                      className="font-mono font-black text-sky-400 hover:underline block"
                    >
                      {ord.id}
                    </Link>
                    <span className="text-[10px] text-slate-500">{formatDate(ord.createdAt)}</span>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-bold text-white">{ord.customer.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{ord.customer.phone}</p>
                  </td>

                  <td className="py-3 px-4 text-slate-300">
                    {ord.shippingAddress.city}
                  </td>

                  <td className="py-3 px-4 text-slate-400">
                    {ord.items.length} items
                  </td>

                  <td className="py-3 px-4 font-black text-emerald-400">
                    {formatPKR(ord.total)}
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded">
                      {ord.paymentMethod === 'cod' ? 'COD' : 'Prepaid'}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-mono text-slate-300 text-[11px] block">{ord.trackingNumber}</span>
                    <span className="text-[10px] text-slate-500">{ord.courier}</span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <Link
                      to={`/admin/orders/${ord.id}`}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-400 rounded-lg text-xs font-bold transition-colors"
                    >
                      Dispatch →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
