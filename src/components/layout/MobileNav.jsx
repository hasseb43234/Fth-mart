import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../../lib/store';
import { Home, Grid, Zap, ShoppingCart, User } from 'lucide-react';

export const MobileNav = () => {
  const cart = useStore((state) => state.cart);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 md:hidden shadow-lg">
      <div className="flex items-center justify-around">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 ${
              isActive ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/c/electronics"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 ${
              isActive ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <Grid className="w-5 h-5" />
          <span>Categories</span>
        </NavLink>

        <NavLink
          to="/c/electronics?flash=true"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 ${
              isActive ? 'text-red-600' : 'text-slate-500 hover:text-red-500'
            }`
          }
        >
          <Zap className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="text-red-600">Flash Deals</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 relative ${
              isActive ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {totalCartCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </NavLink>

        <NavLink
          to="/account"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 text-[10px] font-bold p-1 ${
              isActive ? 'text-sky-600' : 'text-slate-500 hover:text-slate-800'
            }`
          }
        >
          <User className="w-5 h-5" />
          <span>Account</span>
        </NavLink>
      </div>
    </div>
  );
};
