import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, RotateCcw, Headphones, MessageCircle, Heart, Phone, Mail, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-24 md:pb-12 border-t border-[#332f2d]">
      {/* 4 Pakistani Trust Badges in Pillow Cards */}
      <div className="max-w-[1200px] mx-auto px-4 pb-12 border-b border-[#332f2d]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3.5 bg-[#332f2d]/50 p-4 rounded-[28px] border border-white/5">
            <div className="w-11 h-11 rounded-full bg-[#5433eb] text-white flex items-center justify-center flex-shrink-0 shadow-violet-glow">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white tracking-tight-body">Free Delivery in Pakistan</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">On all orders above Rs 2,500</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#332f2d]/50 p-4 rounded-[28px] border border-white/5">
            <div className="w-11 h-11 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white tracking-tight-body">Cash on Delivery (COD)</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Pay in PKR at your doorstep</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#332f2d]/50 p-4 rounded-[28px] border border-white/5">
            <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white tracking-tight-body">7-Day Replacement</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">Hassle-free return policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 bg-[#332f2d]/50 p-4 rounded-[28px] border border-white/5">
            <div className="w-11 h-11 rounded-full bg-sky-500 text-white flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white tracking-tight-body">WhatsApp Support</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">+92 321 4892104 (7 Days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="FTH Mart"
                className="h-10 w-auto object-contain rounded-xl bg-white p-0.5"
              />
              <span className="text-xl font-bold text-white tracking-tight-display">
                FTH<span className="text-emerald-400">Mart</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed tracking-tight-body">
              Pakistan's trusted dropshipping marketplace offering thousands of factory-direct items with fast nationwide TCS delivery and Cash on Delivery.
            </p>
            <div className="pt-2 text-xs text-slate-300 space-y-1.5 font-mono">
              <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +92 321 4892104</p>
              <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-sky-400" /> support@fthmart.pk</p>
              <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-400" /> DHA Phase 5, Lahore, Pakistan</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Popular Collections
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/c/electronics" className="hover:text-white transition-colors">Smart Electronics</Link></li>
              <li><Link to="/c/home-kitchen" className="hover:text-white transition-colors">Home &amp; Kitchen</Link></li>
              <li><Link to="/c/fashion-apparel" className="hover:text-white transition-colors">Men &amp; Women Fashion</Link></li>
              <li><Link to="/c/beauty-personal-care" className="hover:text-white transition-colors">Beauty &amp; Care</Link></li>
              <li><Link to="/c/automotive-accessories" className="hover:text-white transition-colors">Car &amp; Bike Accessories</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Customer Support
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/track" className="hover:text-white transition-colors">Track Your Parcel</Link></li>
              <li><Link to="/help" className="hover:text-white transition-colors">Help Center &amp; FAQs</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping &amp; Delivery</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">7-Day Return Policy</Link></li>
              <li><Link to="/payment-methods" className="hover:text-white transition-colors">Payment Methods</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Logistics & Admin */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Couriers &amp; Portal
            </h5>
            <div className="space-y-2 text-xs text-slate-400">
              <p>🚚 TCS Express Pakistan</p>
              <p>🐆 Leopards Courier</p>
              <p>⚡ Trax Logistics</p>
              <p>📦 PostEx COD</p>
              <div className="pt-2">
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full text-[11px] font-semibold transition-all shadow-violet-glow"
                >
                  ⚡ Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-[1200px] mx-auto px-4 pt-6 border-t border-[#332f2d] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
        <p>© 2026 FTH Mart Pakistan. All Rights Reserved. (Fresh • Trust • Home)</p>
        <div className="flex items-center gap-4">
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};
