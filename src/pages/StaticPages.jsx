import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, RotateCcw, ShieldCheck, CreditCard, Mail, Phone, MapPin } from 'lucide-react';

export const ShippingPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <Truck className="w-8 h-8 text-sky-600" />
        <div>
          <h1 className="text-2xl font-black text-slate-900">Shipping & Delivery Policy</h1>
          <p className="text-xs text-slate-500">Nationwide Cash on Delivery coverage in Pakistan</p>
        </div>
      </div>

      <div className="prose prose-slate text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          At <strong>FTH Mart</strong>, we pride ourselves on providing lightning-fast, reliable dropshipping deliveries across all 4 provinces (Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan), Islamabad Capital Territory, Azad Jammu & Kashmir (AJK), and Gilgit-Baltistan.
        </p>
        <h3 className="text-sm font-bold text-slate-900">1. Delivery Timelines</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Tier 1 Cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad):</strong> 24 to 48 business hours.</li>
          <li><strong>Tier 2 & 3 Cities / Secondary Towns:</strong> 2 to 4 business days via TCS Express or Leopards.</li>
        </ul>
        <h3 className="text-sm font-bold text-slate-900">2. Free Shipping Eligibility</h3>
        <p>
          All shopping carts above <strong>Rs 2,500</strong> automatically qualify for <strong>100% Free Express Delivery</strong> anywhere in Pakistan. Standard orders below Rs 2,500 incur a flat rate of Rs 180.
        </p>
      </div>
    </div>
  </div>
);

export const ReturnsPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <RotateCcw className="w-8 h-8 text-amber-500" />
        <div>
          <h1 className="text-2xl font-black text-slate-900">7-Day Replacement Guarantee</h1>
          <p className="text-xs text-slate-500">Shop with complete peace of mind on FTH Mart</p>
        </div>
      </div>

      <div className="prose prose-slate text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          We want you to love your order! If you receive a product that is defective, damaged in transit, or different from described on our store, you are eligible for an instant hassle-free replacement or refund within <strong>7 days of delivery</strong>.
        </p>
        <h3 className="text-sm font-bold text-slate-900">How to request a return:</h3>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Open your <strong>Account &gt; Returns &amp; Refunds</strong> tab.</li>
          <li>Select the order, describe the issue, and attach photo proof.</li>
          <li>Our courier partner will arrange doorstep pickup or exchange.</li>
        </ol>
      </div>
    </div>
  </div>
);

export const TermsOfService = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
      <h1 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
        Terms of Service
      </h1>
      <div className="prose prose-slate text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          Welcome to FTH Mart (Fresh • Trust • Home). By accessing or purchasing from our platform, you agree to comply with Pakistani Electronic Transactions Ordinance and our marketplace terms.
        </p>
        <p>
          All pricing is displayed in Pakistani Rupees (PKR) and includes applicable taxes. Invoices with NTN registration are generated upon order dispatch.
        </p>
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
      <h1 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
        Privacy & Data Protection Policy
      </h1>
      <div className="prose prose-slate text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
        <p>
          FTH Mart values your privacy. We only collect essential Pakistani delivery information (Name, Mobile Phone, Street Address) to process courier bookings and send tracking SMS updates.
        </p>
        <p>
          We never share or sell customer contact information with third-party advertisers.
        </p>
      </div>
    </div>
  </div>
);

export const PaymentMethods = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-4">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <CreditCard className="w-8 h-8 text-emerald-600" />
        <div>
          <h1 className="text-2xl font-black text-slate-900">Supported Payment Methods</h1>
          <p className="text-xs text-slate-500">100% Secure Pakistani Payment Gateways</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
          <h3 className="font-bold text-sm text-emerald-950">1. Cash on Delivery (COD)</h3>
          <p className="text-xs text-emerald-800">
            Pay physical cash in PKR to the TCS or Leopards rider at your doorstep.
          </p>
        </div>

        <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 space-y-1">
          <h3 className="font-bold text-sm text-sky-950">2. 1Link Direct Bank Transfer</h3>
          <p className="text-xs text-sky-800">
            Transfer directly to our Meezan Bank / HBL business accounts via online banking or Raast.
          </p>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-1">
          <h3 className="font-bold text-sm text-amber-950">3. JazzCash &amp; Easypaisa</h3>
          <p className="text-xs text-amber-800">
            Instant wallet-to-wallet transfer with fast confirmation.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const ContactUs = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 space-y-6">
    <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-black text-slate-900">Contact FTH Mart Pakistan</h1>
        <p className="text-xs text-slate-500 mt-1">
          Our Lahore and Karachi support desks are available 7 days a week
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <Phone className="w-5 h-5 text-sky-600" />
          <h4 className="font-bold text-xs text-slate-900">WhatsApp &amp; Phone</h4>
          <p className="text-xs text-slate-600 font-mono">+92 321 4892104</p>
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <Mail className="w-5 h-5 text-emerald-600" />
          <h4 className="font-bold text-xs text-slate-900">Email Support</h4>
          <p className="text-xs text-slate-600">support@fthmart.pk</p>
        </div>

        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <MapPin className="w-5 h-5 text-red-500" />
          <h4 className="font-bold text-xs text-slate-900">Fulfillment Center</h4>
          <p className="text-xs text-slate-600">DHA Phase 5, Lahore, Pakistan</p>
        </div>
      </div>
    </div>
  </div>
);
