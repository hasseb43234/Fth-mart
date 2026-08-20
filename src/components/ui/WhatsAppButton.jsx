import React, { useState } from 'react';
import { MessageCircle, Send, X, PhoneCall, ShieldCheck } from 'lucide-react';

export const WhatsAppButton = ({ prefilledMessage = 'Hello FTH Mart! I have an inquiry about my order / product.' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const whatsappNumber = '923214892104'; // Official FTH Mart Pakistan WhatsApp Line

  const handleSend = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(customMsg || prefilledMessage);
    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-sm leading-tight">FTH Mart WhatsApp Help</h4>
                  <span className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    Support Desk Online (Urdu / English)
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-700 shadow-xs">
              <p className="font-medium text-slate-900 mb-1">Assalam-o-Alaikum! 👋</p>
              How can we assist you today with order confirmation, tracking, or bulk dropshipping inquiries in Pakistan?
            </div>

            <form onSubmit={handleSend} className="space-y-2">
              <textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Type your message or Order # here..."
                rows={2}
                className="w-full text-xs p-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-3.5 h-3.5" /> Start WhatsApp Chat
              </button>
            </form>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Official Verified FTH Mart Line (+92 321 4892104)
            </div>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-full shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          WhatsApp Help
        </span>
      </button>
    </div>
  );
};
