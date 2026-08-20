import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../lib/store';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Upload,
  FolderTree,
  ShoppingBag,
  Users,
  Star,
  Tag,
  Truck,
  FileText,
  BarChart3,
  Settings,
  Store,
  Bell,
  ExternalLink,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useStore((state) => state.user);
  const switchRole = useStore((state) => state.switchRole);
  const orders = useStore((state) => state.orders);
  const products = useStore((state) => state.products);

  const pendingOrdersCount = orders.filter((o) => ['placed', 'confirmed'].includes(o.status)).length;
  const lowStockCount = products.filter((p) => p.stock <= (p.lowStockThreshold || 15)).length;

  const navLinks = [
    { to: '/admin', end: true, label: 'Dashboard Overview', icon: LayoutDashboard },
    { to: '/admin/products', end: true, label: 'Product Inventory', icon: Package, badge: lowStockCount ? `${lowStockCount} Low` : null, badgeColor: 'bg-amber-500' },
    { to: '/admin/products/new', label: 'Add New Product', icon: PlusCircle },
    { to: '/admin/products/import', label: 'Bulk CSV Import', icon: Upload },
    { to: '/admin/categories', label: 'Category Hierarchy', icon: FolderTree },
    { to: '/admin/orders', label: 'Orders Dispatch Hub', icon: ShoppingBag, badge: pendingOrdersCount ? `${pendingOrdersCount} New` : null, badgeColor: 'bg-red-500' },
    { to: '/admin/customers', label: 'Customer CRM', icon: Users },
    { to: '/admin/reviews', label: 'Review Moderation', icon: Star },
    { to: '/admin/coupons', label: 'Coupons & Promos', icon: Tag },
    { to: '/admin/shipping', label: 'Shipping & Couriers', icon: Truck },
    { to: '/admin/content', label: 'Flash Sales & CMS', icon: FileText },
    { to: '/admin/reports', label: 'Gross Margin Reports', icon: BarChart3 },
    { to: '/admin/settings', label: 'Store Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Sidebar Navigation */}
      <aside className="lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between flex-shrink-0">
        <div>
          {/* Admin Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <img
                src="/logo.jpg"
                alt="FTH Mart Admin"
                className="h-9 w-auto rounded-lg object-contain bg-white p-0.5"
              />
              <div>
                <span className="font-black text-base text-white tracking-tight">
                  FTH<span className="text-emerald-400">Admin</span>
                </span>
                <span className="text-[9px] uppercase font-bold text-amber-400 block tracking-widest">
                  Dropship Back-Office
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`text-[9px] font-black text-white px-1.5 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Switcher */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-between transition-colors"
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5 text-emerald-400" /> View Storefront
            </span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900/60">
        {/* Top Navbar */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400">
              🇵🇰 Pakistan Operations • PKR Sourced
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300 font-medium">Logged as:</span>
              <strong className="text-white">Admin (Owner)</strong>
            </div>

            <button
              onClick={() => {
                switchRole('customer');
                navigate('/');
              }}
              className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              Exit to Customer Mode →
            </button>
          </div>
        </header>

        {/* Main Routed Content Stage */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
