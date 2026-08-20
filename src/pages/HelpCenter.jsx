import React, { useState } from 'react';
import {
  HelpCircle,
  Truck,
  RotateCcw,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  Search
} from 'lucide-react';

export const HelpCenter = () => {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      category: 'Shipping & Delivery in Pakistan',
      q: 'How long does delivery take in Pakistan?',
      a: 'Major cities (Karachi, Lahore, Rawalpindi, Islamabad, Faisalabad) receive orders within 24 to 48 business hours via TCS Express or Trax. Tier 2 and Tier 3 cities across Punjab, Sindh, KPK, Balochistan, AJK and Gilgit-Baltistan take 2 to 4 business days.'
    },
    {
      category: 'Shipping & Delivery in Pakistan',
      q: 'What are the delivery charges?',
      a: 'Delivery is completely FREE on all orders above Rs 2,500 nationwide. For orders below Rs 2,500, a flat nominal courier fee of Rs 180 (TCS Express COD) applies.'
    },
    {
      category: 'Payments & COD',
      q: 'Can I pay Cash on Delivery (COD)?',
      a: 'Yes! Cash on Delivery is preselected and available for all addresses across Pakistan. You pay in Pakistani Rupees directly to the courier rider upon delivery.'
    },
    {
      category: 'Payments & COD',
      q: 'Which online prepaid payment methods do you accept?',
      a: 'We accept 1Link Direct Bank Transfer (Meezan Bank, HBL, Bank Alfalah, Raast), JazzCash, and Easypaisa.'
    },
    {
      category: 'Returns & Replacement',
      q: 'What is the 7-Day Replacement Guarantee?',
      a: 'If your item arrives defective, damaged, or different from described, you can request an instant replacement within 7 days from the Account > Returns portal or via our WhatsApp support desk (+92 321 4892104).'
    },
    {
      category: 'Order Tracking',
      q: 'How do I track my parcel as a guest?',
      a: 'Visit the "Track Order" page in the header navigation and enter your FTH Mart Order Number (e.g. FTH-2026-001284) or your registered Pakistani phone number.'
    }
  ];

  const filteredFaqs = search.trim()
    ? faqs.filter(
        (f) =>
          f.q.toLowerCase().includes(search.toLowerCase()) ||
          f.a.toLowerCase().includes(search.toLowerCase()) ||
          f.category.toLowerCase().includes(search.toLowerCase())
      )
    : faqs;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Help Hero */}
      <div className="bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 rounded-3xl p-8 text-white text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black">FTH Mart Help Centre & FAQs</h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Have questions about shipping, courier tracking, Cash on Delivery, or returns in Pakistan?
        </p>

        <div className="max-w-md mx-auto relative pt-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs (e.g. Delivery, COD, Returns)..."
            className="w-full text-xs pl-9 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* WhatsApp Help CTA Card */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            💬
          </div>
          <div>
            <h3 className="font-bold text-sm text-emerald-950">Need Immediate Help?</h3>
            <p className="text-xs text-emerald-800">
              Speak directly with our Pakistani customer support desk on WhatsApp in Urdu or English.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/923214892104"
          target="_blank"
          rel="noreferrer"
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors shadow-xs whitespace-nowrap"
        >
          Chat on WhatsApp
        </a>
      </div>

      {/* Accordion FAQs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Frequently Asked Questions ({filteredFaqs.length})
        </h2>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-700 block mb-0.5">
                      {faq.category}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      isOpen ? 'rotate-180 text-sky-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
