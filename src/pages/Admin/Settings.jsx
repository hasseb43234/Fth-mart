import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, Building2, Phone, Mail, Globe } from 'lucide-react';

export const AdminSettings = () => {
  const [storeName, setStoreName] = useState('FTH Mart Pakistan');
  const [tagline, setTagline] = useState('Fresh • Trust • Home');
  const [supportPhone, setSupportPhone] = useState('03214892104');
  const [supportEmail, setSupportEmail] = useState('support@fthmart.pk');
  const [ntnNumber, setNtnNumber] = useState('7491823-9');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Store Settings</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure merchant identity, FBR NTN registration, and WhatsApp helpline
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-sky-400" /> Business Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-bold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Official WhatsApp Support Helpline</label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">FBR NTN / Tax ID</label>
              <input
                type="text"
                value={ntnNumber}
                onChange={(e) => setNtnNumber(e.target.value)}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-sky-600/30 flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>{isSaved ? 'Settings Saved!' : 'Save Store Configuration'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
