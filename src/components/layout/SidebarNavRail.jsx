import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  Home,
  Search,
  Zap,
  Grid,
  Heart,
  ShoppingCart,
  User,
  Store,
  Truck
} from 'lucide-react';

export const SidebarNavRail = () => {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const user = useStore((state) => state.user);
  const setCartDrawerOpen = useStore((state) => state.setCartDrawerOpen);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/search', label: 'Search', icon: Search },
    { to: '/categories', label: 'Categories Hub', icon: Grid },
    { to: '/track', label: 'Track Parcel', icon: Truck },
    { to: '/account/wishlist', label: 'Wishlist', icon: Heart, badge: wishlist.length || null },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between items-center w-16 bg-white border-r border-[#ebebeb] py-5 sticky top-0 h-screen z-40 flex-shrink-0">
      {/* Top Logo Glyph */}
      <div className="flex flex-col items-center gap-6">
        <Link to="/" className="w-10 h-10 rounded-full bg-[#5433eb] text-white flex items-center justify-center font-black text-sm shadow-violet-glow hover:scale-105 transition-transform" title="FTH Mart">
          <span className="tracking-tighter">fth</span>
        </Link>

        {/* Navigation Icons */}
        <nav className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `w-11 h-11 rounded-[18px] flex items-center justify-center text-black relative transition-all duration-200 ${
                    isActive
                      ? 'bg-[#f2f4f5] text-black shadow-pill font-bold'
                      : 'text-[#787574] hover:bg-[#f2f4f5] hover:text-black'
                  }`
                }
                title={item.label}
              >
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions: Cart & Profile */}
      <div className="flex flex-col items-center gap-3">
        {/* Cart Trigger */}
        <button
          onClick={() => setCartDrawerOpen(true)}
          className="w-11 h-11 rounded-[18px] bg-black text-white hover:bg-[#222222] flex items-center justify-center relative transition-all shadow-sm active:scale-95"
          title="Open Cart"
        >
          <ShoppingCart className="w-4 h-4" />
          {totalCartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#5433eb] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-violet-glow">
              {totalCartCount}
            </span>
          )}
        </button>

        {/* User Profile Avatar with 1px border ring */}
        <Link
          to="/account"
          className="w-9 h-9 rounded-full bg-[#f2f4f5] border border-[#ebebeb] flex items-center justify-center text-black hover:scale-105 transition-transform"
          title="My Account"
        >
          <User className="w-4 h-4 text-black" />
        </Link>
      </div>
    </aside>
  );
};
