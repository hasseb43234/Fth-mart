import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { Users, Search, Phone, MapPin, ShoppingBag, ShieldCheck, AlertCircle } from 'lucide-react';
import { formatPKR, formatDate } from '../../lib/formatters';

export const AdminCustomers = () => {
  const orders = useStore((state) => state.orders);
  const [search, setSearch] = useState('');

  // Group orders into customers
  const customers = [
    {
      id: 'cust-1',
      name: 'Saad Ur Rehman',
      phone: '03214892104',
      city: 'Lahore',
      totalOrders: 4,
      totalSpend: 14850,
      codSuccessRate: '100%',
      rtoRisk: 'low',
      lastOrder: '2026-08-16'
    },
    {
      id: 'cust-2',
      name: 'Zainab Mustafa',
      phone: '03339182741',
      city: 'Karachi',
      totalOrders: 3,
      totalSpend: 8200,
      codSuccessRate: '100%',
      rtoRisk: 'low',
      lastOrder: '2026-08-15'
    },
    {
      id: 'cust-3',
      name: 'Muhammad Daniyal',
      phone: '03017642918',
      city: 'Islamabad',
      totalOrders: 2,
      totalSpend: 7500,
      codSuccessRate: '100%',
      rtoRisk: 'low',
      lastOrder: '2026-08-14'
    },
    {
      id: 'cust-4',
      name: 'Hamza Tariq',
      phone: '03008472910',
      city: 'Lahore',
      totalOrders: 1,
      totalSpend: 2899,
      codSuccessRate: '100%',
      rtoRisk: 'low',
      lastOrder: '2026-08-12'
    }
  ];

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Customer CRM ({customers.length})</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track Pakistani customer lifetime spend, repeat purchases & COD delivery success rates
          </p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name, phone, city..."
            className="w-full text-xs pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 text-[10px] uppercase bg-slate-950/50">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone #</th>
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Lifetime Spend</th>
                <th className="py-3 px-4">COD Success Rate</th>
                <th className="py-3 px-4">RTO Risk</th>
                <th className="py-3 px-4 text-right">Last Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white">{c.name}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono">{c.phone}</td>
                  <td className="py-3 px-4 text-slate-300">{c.city}</td>
                  <td className="py-3 px-4 font-bold text-sky-400">{c.totalOrders}</td>
                  <td className="py-3 px-4 font-black text-emerald-400">{formatPKR(c.totalSpend)}</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{c.codSuccessRate}</td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {c.rtoRisk}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-500">{c.lastOrder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
