import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Layout Components
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { SidebarNavRail } from './components/layout/SidebarNavRail';
import { CartDrawer } from './components/cart/CartDrawer';
import { ToastContainer } from './components/ui/Toast';
import { WhatsAppButton } from './components/ui/WhatsAppButton';
import { RecentlyViewedTray } from './components/ui/RecentlyViewedTray';

// Storefront Pages
import { Home } from './pages/Home';
import { CategoriesHub } from './pages/CategoriesHub';
import { CategoryPage } from './pages/CategoryPage';
import { SearchPage } from './pages/SearchPage';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { OrderTracking } from './pages/OrderTracking';
import { HelpCenter } from './pages/HelpCenter';
import {
  ShippingPolicy,
  ReturnsPolicy,
  TermsOfService,
  PrivacyPolicy,
  PaymentMethods,
  ContactUs
} from './pages/StaticPages';

// Auth Pages
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// Account Pages
import { AccountLayout } from './pages/Account/AccountLayout';
import { AccountDashboard } from './pages/Account/Dashboard';
import { AccountOrders } from './pages/Account/Orders';
import { AccountWishlist } from './pages/Account/Wishlist';
import { AccountAddresses } from './pages/Account/Addresses';
import { AccountCoupons } from './pages/Account/Coupons';
import { AccountReviews } from './pages/Account/Reviews';
import { AccountReturns } from './pages/Account/Returns';
import { AccountProfile } from './pages/Account/Profile';

// Admin Pages
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/Dashboard';
import { AdminProducts } from './pages/Admin/Products';
import { ProductForm } from './pages/Admin/ProductForm';
import { AdminBulkImport } from './pages/Admin/BulkImport';
import { AdminCategories } from './pages/Admin/Categories';
import { AdminOrders } from './pages/Admin/Orders';
import { AdminOrderDetail } from './pages/Admin/OrderDetail';
import { AdminCustomers } from './pages/Admin/Customers';
import { AdminReviews } from './pages/Admin/Reviews';
import { AdminCoupons } from './pages/Admin/Coupons';
import { AdminShipping } from './pages/Admin/Shipping';
import { AdminContentCMS } from './pages/Admin/ContentCMS';
import { AdminReports } from './pages/Admin/Reports';
import { AdminSettings } from './pages/Admin/Settings';

// Public Customer Shell Wrapper with Refero Left Nav Rail
const CustomerLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f2f4f5]">
      {/* Refero Persistent 64px Left Nav Rail */}
      <SidebarNavRail />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <MobileNav />
        <CartDrawer />
        <WhatsAppButton />
        <RecentlyViewedTray />
        <ToastContainer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer Storefront Routes */}
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoriesHub />} />
          <Route path="/c" element={<CategoriesHub />} />
          <Route path="/c/:categorySlug" element={<CategoryPage />} />
          <Route path="/products" element={<CategoryPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/p/:productSlug" element={<ProductDetail />} />
          <Route path="/product/:productSlug" element={<ProductDetail />} />
          <Route path="/item/:productSlug" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/success/:orderId" element={<OrderConfirmation />} />
          <Route path="/track" element={<OrderTracking />} />
          <Route path="/track/:orderNo" element={<OrderTracking />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/shipping" element={<ShippingPolicy />} />
          <Route path="/returns" element={<ReturnsPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/payment-methods" element={<PaymentMethods />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<Login />} />

          {/* Account Portal Routes */}
          <Route path="/account" element={<AccountLayout />}>
            <Route index element={<AccountDashboard />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="orders/:id" element={<OrderConfirmation />} />
            <Route path="wishlist" element={<AccountWishlist />} />
            <Route path="addresses" element={<AccountAddresses />} />
            <Route path="coupons" element={<AccountCoupons />} />
            <Route path="reviews" element={<AccountReviews />} />
            <Route path="returns" element={<AccountReturns />} />
            <Route path="profile" element={<AccountProfile />} />
          </Route>
        </Route>

        {/* Admin Management Back-Office Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />
          <Route path="products/import" element={<AdminBulkImport />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="orders/:id" element={<AdminOrderDetail />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="shipping" element={<AdminShipping />} />
          <Route path="content" element={<AdminContentCMS />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
