import React, { useState } from 'react';
import { useStore } from '../../lib/store';
import { RotateCcw, ShieldCheck, AlertCircle, Plus, Package } from 'lucide-react';
import { Modal } from '../../components/ui/Modal';
import { formatPKR } from '../../lib/formatters';

export const AccountReturns = () => {
  const orders = useStore((state) => state.orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [reason, setReason] = useState('defective');
  const [comments, setComments] = useState('');

  const [returnRequests, setReturnRequests] = useState([
    {
      id: 'RET-2026-081',
      orderId: 'FTH-2026-001280',
      reason: 'Size exchange for Ivory Handbag',
      status: 'approved',
      date: '2026-08-16',
      refundAmount: 2610
    }
  ]);

  const handleSubmitReturn = (e) => {
    e.preventDefault();
    if (!selectedOrder) {
      alert('Please select an order');
      return;
    }
    const newReq = {
      id: `RET-2026-0${Math.floor(100 + Math.random() * 900)}`,
      orderId: selectedOrder,
      reason: `${reason}: ${comments}`,
      status: 'under_review',
      date: new Date().toISOString().split('T')[0],
      refundAmount: 2500
    };
    setReturnRequests([newReq, ...returnRequests]);
    setIsModalOpen(false);
    setComments('');
    alert('Return request submitted. Our team will verify and contact you via WhatsApp.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-900">7-Day Returns & Refunds</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Hassle-free replacement policy for Pakistani customers
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4" /> Request Return / Refund
        </button>
      </div>

      <div className="space-y-4">
        {returnRequests.map((ret) => (
          <div
            key={ret.id}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-mono font-black text-xs text-slate-900">{ret.id}</span>
                <p className="text-xs text-slate-500 mt-0.5">For Order #{ret.orderId} • {ret.date}</p>
              </div>
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-md ${
                ret.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {ret.status.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-700 font-medium">
              Reason: {ret.reason}
            </p>
            <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>Estimated Refund: <strong>{formatPKR(ret.refundAmount)}</strong></span>
              <span className="text-emerald-700 font-semibold">TCS Return Pickup Available</span>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit 7-Day Return / Refund Request"
      >
        <form onSubmit={handleSubmitReturn} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Select Order *</label>
            <select
              value={selectedOrder}
              onChange={(e) => setSelectedOrder(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
              required
            >
              <option value="">-- Choose Delivered Order --</option>
              {orders.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.id} — {formatPKR(o.total)} ({o.items.length} items)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Reason for Return *</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
            >
              <option value="defective">Defective / Damaged Item</option>
              <option value="wrong_item">Received Wrong Color or Variant</option>
              <option value="not_as_described">Item not as described on store</option>
              <option value="size_issue">Size does not fit</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Description & Issue Details</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
              placeholder="Describe the issue with the item..."
              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-none"
              required
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
              Submit Request
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
