import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Tag,
  Star,
  RotateCcw,
  Shield,
  LogOut,
  Layers,
  ChevronRight
} from 'lucide-react';

export const AccountLayout = () => {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const switchRole = useStore((state) => state.switchRole);
  const wishlist = useStore((state) => state.wishlist);
  const orders = useStore((state) => state.orders);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/account', end: true, label: 'Overview Dashboard', icon: User },
    { to: '/account/orders', label: `My Orders (${orders.length})`, icon: ShoppingBag },
    { to: '/account/wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
    { to: '/account/addresses', label: 'Delivery Addresses', icon: MapPin },
    { to: '/account/coupons', label: 'Coupons & Vouchers', icon: Tag },
    { to: '/account/reviews', label: 'My Product Reviews', icon: Star },
    { to: '/account/returns', label: 'Returns & Refunds', icon: RotateCcw },
    { to: '/account/profile', label: 'Profile & Security', icon: Shield }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 rounded-3xl p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-bold text-2xl">
            👤
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{user?.name || 'Saad Ur Rehman'}</h1>
              <span className="bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                FTH VIP Member
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Phone: {user?.phone || '03214892104'} • {user?.email || 'saad.rehman@gmail.com'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              switchRole('admin');
              navigate('/admin');
            }}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Layers className="w-4 h-4" /> Admin Portal
          </button>
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1 sticky top-36">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-sky-600'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                </NavLink>
              );
            })}

            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-600 hover:bg-red-50 rounded-2xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Outlet View */}
        <div className="lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
