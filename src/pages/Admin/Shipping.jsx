import React, { useState } from 'react';
import { PAKISTAN_LOCATIONS } from '../../data/pk-locations';
import { Truck, MapPin, CheckCircle2, DollarSign, Settings, Save } from 'lucide-react';
import { formatPKR } from '../../lib/formatters';

export const AdminShipping = () => {
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(2500);
  const [standardTcsRate, setStandardTcsRate] = useState(180);
  const [leopardsRate, setLeopardsRate] = useState(160);
  const [traxRate, setTraxRate] = useState(170);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">Shipping Zones & Couriers</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure nationwide delivery rates, free shipping thresholds, and Pakistani courier API keys
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: General Rules */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
              Nationwide Delivery Thresholds
            </h3>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Free Shipping Cart Threshold (PKR)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                className="w-full text-xs p-3 bg-slate-800 border border-slate-700 rounded-xl text-white font-black"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Carts above {formatPKR(freeShippingThreshold)} automatically unlock FREE TCS Express shipping.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-500 text-white rounded-xl text-xs font-bold transition-all"
              >
                {isSaved ? 'Saved Settings!' : 'Update Shipping Rules'}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Courier Drivers Configuration */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-white border-b border-slate-800 pb-3">
              Pakistani Courier Drivers
            </h3>

            <div className="space-y-3">
              {PAKISTAN_LOCATIONS.couriers.map((courier) => (
                <div
                  key={courier.id}
                  className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{courier.name}</span>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                      API Driver Active
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{courier.description}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                    <span className="text-slate-400">Base Flat Rate:</span>
                    <strong className="text-white">{formatPKR(courier.baseRate)}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
