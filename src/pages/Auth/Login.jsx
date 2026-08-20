import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Phone, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const switchRole = useStore((state) => state.switchRole);

  const [phone, setPhone] = useState('03214892104');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({
      name: 'Saad Ur Rehman',
      phone: phone,
      email: 'saad.rehman@gmail.com',
      role: 'customer'
    });
    navigate('/account');
  };

  const handleAdminQuickLogin = () => {
    login({
      name: 'Admin FTH Mart',
      phone: '03001234567',
      email: 'admin@fthmart.pk',
      role: 'admin'
    });
    navigate('/admin');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
        <div className="text-center space-y-2">
          <img src="/logo.jpg" alt="FTH Mart" className="h-12 w-auto mx-auto rounded-lg object-contain" />
          <h1 className="text-2xl font-black text-slate-900">Sign in to FTH Mart</h1>
          <p className="text-xs text-slate-500">
            Phone-first login for Pakistani dropshipping marketplace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mobile Number (03XXXXXXXXX)
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="03214892104"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-sky-600 hover:underline">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-sky-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Autofill Buttons for Testing */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400 block text-center">
            One-Click Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleSubmit}
              className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-[11px] font-bold text-center"
            >
              Demo Customer
            </button>
            <button
              onClick={handleAdminQuickLogin}
              className="py-2 px-3 bg-amber-100 hover:bg-amber-200 text-amber-950 rounded-xl text-[11px] font-bold text-center"
            >
              ⚡ Admin Portal
            </button>
          </div>
        </div>

        <p className="text-xs text-center text-slate-500 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-sky-600 font-bold hover:underline">
            Register with Phone
          </Link>
        </p>
      </div>
    </div>
  );
};
