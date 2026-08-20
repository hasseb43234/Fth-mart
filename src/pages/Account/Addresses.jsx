import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { PAKISTAN_LOCATIONS } from '../../data/pk-locations';
import { MapPin, Plus, Trash2, CheckCircle2, Home, Building2, Phone, User } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';

export const AccountAddresses = () => {
  const user = useStore((state) => state.user);
  const addUserAddress = useStore((state) => state.addUserAddress);
  const deleteUserAddress = useStore((state) => state.deleteUserAddress);
  const setDefaultAddress = useStore((state) => state.setDefaultAddress);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipientName, setRecipientName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [province, setProvince] = useState('Punjab');
  const [city, setCity] = useState('Lahore');
  const [area, setArea] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');

  const provinceObj = PAKISTAN_LOCATIONS.provinces.find((p) => p.name === province);
  const cities = provinceObj ? PAKISTAN_LOCATIONS.cities[provinceObj.id] : PAKISTAN_LOCATIONS.cities.punjab;

  const handleProvinceChange = (e) => {
    const p = e.target.value;
    setProvince(p);
    const obj = PAKISTAN_LOCATIONS.provinces.find((prov) => prov.name === p);
    const cList = obj ? PAKISTAN_LOCATIONS.cities[obj.id] : PAKISTAN_LOCATIONS.cities.punjab;
    if (cList && cList.length > 0) setCity(cList[0].name);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!recipientName || !phone || !street || !area) {
      alert('Please fill all required fields');
      return;
    }
    addUserAddress({
      recipientName,
      phone,
      province,
      city,
      area,
      street,
      landmark
    });
    setIsModalOpen(false);
    setArea('');
    setStreet('');
    setLandmark('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">Delivery Addresses</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your saved delivery destinations in Pakistan
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user?.addresses?.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 rounded-3xl border-2 transition-all space-y-3 bg-white flex flex-col justify-between ${
              addr.isDefault ? 'border-sky-600 shadow-xs' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" /> {addr.recipientName}
                </span>
                {addr.isDefault ? (
                  <span className="text-[10px] bg-sky-100 text-sky-800 font-extrabold px-2 py-0.5 rounded-full">
                    Default
                  </span>
                ) : (
                  <button
                    onClick={() => setDefaultAddress(addr.id)}
                    className="text-[11px] font-bold text-sky-600 hover:underline"
                  >
                    Set as Default
                  </button>
                )}
              </div>

              <p className="text-xs text-slate-700 font-medium leading-relaxed">
                {addr.street}, {addr.area}
              </p>
              <p className="text-xs text-slate-500">
                {addr.city}, {addr.province}, Pakistan
              </p>
              {addr.landmark && (
                <p className="text-[11px] text-slate-400">Landmark: {addr.landmark}</p>
              )}
              <p className="text-xs text-slate-600 font-mono">Phone: {addr.phone}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => deleteUserAddress(addr.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors text-xs flex items-center gap-1 font-bold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Delivery Address in Pakistan"
      >
        <form onSubmit={handleSaveAddress} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Receiver Name *</label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="e.g. Saad Ur Rehman"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03214892104"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Province *</label>
              <select
                value={province}
                onChange={handleProvinceChange}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
              >
                {PAKISTAN_LOCATIONS.provinces.map((p) => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">City *</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
              >
                {cities.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Area / Sector *</label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g. DHA Phase 5, Sector C"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Street Address *</label>
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="e.g. House 412, Street 8"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Landmark (Optional)</label>
            <input
              type="text"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              placeholder="e.g. Near Jalal Sons"
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
            >
              Save Address
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
