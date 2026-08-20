import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { PAKISTAN_LOCATIONS } from '../data/pk-locations';
import {
  Truck,
  ShieldCheck,
  CreditCard,
  Banknote,
  Building2,
  Phone,
  User,
  MapPin,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { formatPKR } from '../lib/formatters';

export const Checkout = () => {
  const navigate = useNavigate();
  const cart = useStore((state) => state.cart);
  const user = useStore((state) => state.user);
  const getCartSubtotal = useStore((state) => state.getCartSubtotal);
  const getCartShipping = useStore((state) => state.getCartShipping);
  const getCartDiscount = useStore((state) => state.getCartDiscount);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const createOrder = useStore((state) => state.createOrder);

  const selectedItems = cart.filter((i) => i.selected);

  // Address State with Pakistan Cascade
  const defaultAddr = user?.addresses?.find((a) => a.isDefault) || user?.addresses?.[0];

  const [province, setProvince] = useState(defaultAddr?.province || 'Punjab');
  const [city, setCity] = useState(defaultAddr?.city || 'Lahore');
  const [area, setArea] = useState(defaultAddr?.area || 'DHA Phase 5, Sector C');
  const [street, setStreet] = useState(defaultAddr?.street || 'House 412, Street 8');
  const [landmark, setLandmark] = useState(defaultAddr?.landmark || 'Near Jalal Sons');
  const [recipientName, setRecipientName] = useState(defaultAddr?.recipientName || user?.name || '');
  const [phone, setPhone] = useState(defaultAddr?.phone || user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [orderNotes, setOrderNotes] = useState('');

  // Shipping & Payment Method
  const [selectedCourier, setSelectedCourier] = useState('tcs');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  // Cities for the selected province
  const provinceObj = PAKISTAN_LOCATIONS.provinces.find(
    (p) => p.name.toLowerCase() === province.toLowerCase()
  );
  const provinceKey = provinceObj ? provinceObj.id : 'punjab';
  const availableCities = PAKISTAN_LOCATIONS.cities[provinceKey] || PAKISTAN_LOCATIONS.cities.punjab;

  const subtotal = getCartSubtotal();
  const shipping = getCartShipping();
  const discount = getCartDiscount();
  const total = getCartTotal();

  const handleProvinceChange = (e) => {
    const newProv = e.target.value;
    setProvince(newProv);
    const pObj = PAKISTAN_LOCATIONS.provinces.find((p) => p.name.toLowerCase() === newProv.toLowerCase());
    const citiesList = pObj ? PAKISTAN_LOCATIONS.cities[pObj.id] : PAKISTAN_LOCATIONS.cities.punjab;
    if (citiesList && citiesList.length > 0) {
      setCity(citiesList[0].name);
    }
  };

  const validatePakistaniPhone = (val) => {
    const clean = val.replace(/\D/g, '');
    if (clean.length === 11 && clean.startsWith('03')) {
      setPhoneError('');
      return true;
    }
    setPhoneError('Please enter a valid 11-digit Pakistani phone (e.g. 03214892104)');
    return false;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      alert('Please enter recipient full name.');
      return;
    }

    if (!validatePakistaniPhone(phone)) {
      return;
    }

    if (!street.trim()) {
      alert('Please enter your street / house address.');
      return;
    }

    setIsSubmitting(true);

    const courierObj = PAKISTAN_LOCATIONS.couriers.find((c) => c.id === selectedCourier);

    const orderPayload = {
      customer: {
        name: recipientName,
        phone: phone,
        email: email || `${phone}@fthmart.pk`
      },
      shippingAddress: {
        province,
        city,
        area,
        street,
        landmark,
        phone
      },
      items: selectedItems,
      subtotal,
      shippingFee: shipping,
      discount,
      total,
      paymentMethod,
      courier: courierObj?.name || 'TCS Express',
      courierPrefix: courierObj?.trackingPrefix || 'TCS',
      notes: orderNotes
    };

    setTimeout(() => {
      const placedOrder = createOrder(orderPayload);
      setIsSubmitting(false);
      navigate(`/order/success/${placedOrder.id}`);
    }, 600);
  };

  if (selectedItems.length === 0) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-16 text-center bg-[#f2f4f5]">
        <div className="bg-white rounded-[28px] p-12 shadow-pillow max-w-md mx-auto space-y-4">
          <h2 className="text-xl font-bold text-black tracking-tight-display">No items selected for checkout</h2>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-xs font-semibold"
          >
            Return to Cart →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8 space-y-8 bg-[#f2f4f5] pb-24">
      {/* Checkout Steps Indicator */}
      <div className="flex items-center justify-between border-b border-[#ebebeb] pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight-display">Checkout</h1>
          <p className="text-xs text-[#787574] mt-0.5 tracking-tight-body">
            Fast nationwide delivery with Cash on Delivery (COD) across Pakistan
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-black bg-white px-4 py-2 rounded-full shadow-pill border border-[#ebebeb]">
          <Lock className="w-3.5 h-3.5 text-[#5433eb]" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delivery Address & Payment */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Pakistan Delivery Address Cascade */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-5">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <h3 className="font-bold text-sm text-black flex items-center gap-2 tracking-tight-display">
                <span className="w-6 h-6 rounded-full bg-[#5433eb] text-white flex items-center justify-center text-xs font-black shadow-violet-glow">
                  1
                </span>
                <span>Delivery Address in Pakistan</span>
              </h3>
              <span className="text-[11px] text-[#787574]">Doorstep Delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Receiver Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#787574] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Saad Ur Rehman"
                    className="w-full text-xs pl-10 pr-3 py-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white focus:border-[#5433eb]"
                    required
                  />
                </div>
              </div>

              {/* Phone (03XXXXXXXXX) */}
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Mobile Number (03XXXXXXXXX) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#787574] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneError) validatePakistaniPhone(e.target.value);
                    }}
                    onBlur={() => validatePakistaniPhone(phone)}
                    placeholder="03214892104"
                    maxLength={11}
                    className={`w-full text-xs pl-10 pr-3 py-2.5 rounded-full border focus:outline-none font-mono ${
                      phoneError ? 'border-red-500 bg-red-50/30' : 'border-[#ebebeb] bg-[#f2f4f5] focus:bg-white focus:border-[#5433eb]'
                    }`}
                    required
                  />
                </div>
                {phoneError && (
                  <p className="text-[11px] text-red-600 font-medium mt-1">{phoneError}</p>
                )}
              </div>
            </div>

            {/* Cascading Location Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              {/* Province */}
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Province / Region *
                </label>
                <select
                  value={province}
                  onChange={handleProvinceChange}
                  className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white font-medium cursor-pointer"
                >
                  {PAKISTAN_LOCATIONS.provinces.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City (Cascaded) */}
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  City *
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white font-medium cursor-pointer"
                >
                  {availableCities.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Area / Sector */}
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Town / Area *
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. DHA Phase 5 / Gulberg"
                  className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white focus:border-[#5433eb]"
                  required
                />
              </div>
            </div>

            {/* Street Address & Landmark */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Street Address & House # *
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="e.g. House 412, Street 8, Block C"
                  className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white focus:border-[#5433eb]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-black block mb-1 tracking-tight-meta">
                  Famous Nearby Landmark
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Near Jalal Sons / Imtiaz"
                  className="w-full text-xs p-2.5 rounded-full border border-[#ebebeb] bg-[#f2f4f5] focus:outline-none focus:bg-white focus:border-[#5433eb]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Courier & Delivery Speed */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <h3 className="font-bold text-sm text-black flex items-center gap-2 tracking-tight-display">
                <span className="w-6 h-6 rounded-full bg-[#5433eb] text-white flex items-center justify-center text-xs font-black shadow-violet-glow">
                  2
                </span>
                <span>Select Courier & Shipping Speed</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAKISTAN_LOCATIONS.couriers.map((courier) => (
                <div
                  key={courier.id}
                  onClick={() => setSelectedCourier(courier.id)}
                  className={`p-4 rounded-[20px] border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    selectedCourier === courier.id
                      ? 'border-[#5433eb] bg-[#f2f4f5] shadow-violet-glow'
                      : 'border-[#ebebeb] hover:border-[#acb0aa] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-black">{courier.name}</span>
                    <span className="text-[10px] font-bold bg-white text-black px-2.5 py-0.5 rounded-full shadow-pill">
                      {courier.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#787574]">{courier.description}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ebebeb] text-xs font-semibold">
                    <span className="text-[#787574]">Fee:</span>
                    <span className="text-emerald-600 font-bold">
                      {shipping === 0 ? 'FREE' : formatPKR(courier.baseRate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Payment Method Selector */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <h3 className="font-bold text-sm text-black flex items-center gap-2 tracking-tight-display">
                <span className="w-6 h-6 rounded-full bg-[#5433eb] text-white flex items-center justify-center text-xs font-black shadow-violet-glow">
                  3
                </span>
                <span>Payment Method</span>
              </h3>
              <span className="text-[11px] text-emerald-600 font-bold">COD Pre-Selected</span>
            </div>

            <div className="space-y-3">
              {/* Cash on Delivery (Preselected Highlighted) */}
              <label
                className={`flex items-start gap-4 p-4 rounded-[20px] border-2 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-600 bg-emerald-50/40 shadow-pill ring-2 ring-emerald-500/20'
                    : 'border-[#ebebeb] hover:border-[#acb0aa] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-black flex items-center gap-2 tracking-tight-body">
                      <Banknote className="w-4 h-4 text-emerald-600" /> Cash on Delivery (COD)
                    </span>
                    <span className="text-[10px] bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                  <p className="text-xs text-[#787574] mt-1">
                    Pay in Pakistani Rupees directly to the TCS rider upon physical doorstep delivery.
                  </p>
                </div>
              </label>

              {/* Direct Bank Transfer (Meezan / HBL 1Link) */}
              <label
                className={`flex items-start gap-4 p-4 rounded-[20px] border-2 transition-all cursor-pointer ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#5433eb] bg-[#f2f4f5] shadow-violet-glow'
                    : 'border-[#ebebeb] hover:border-[#acb0aa] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank_transfer"
                  checked={paymentMethod === 'bank_transfer'}
                  onChange={() => setPaymentMethod('bank_transfer')}
                  className="w-4 h-4 text-[#5433eb] focus:ring-[#5433eb] mt-1"
                />
                <div className="flex-1">
                  <span className="font-bold text-xs sm:text-sm text-black flex items-center gap-2 tracking-tight-body">
                    <Building2 className="w-4 h-4 text-[#5433eb]" /> Direct Bank Transfer / 1Link
                  </span>
                  <p className="text-xs text-[#787574] mt-1">
                    Transfer via Meezan Bank, HBL, Bank Alfalah or Raast ID and WhatsApp receipt.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Confirmation Action */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-[28px] p-6 sm:p-8 shadow-pillow border border-[#ebebeb]/60 space-y-4 sticky top-36">
            <h3 className="font-bold text-sm text-black border-b border-[#ebebeb] pb-3 tracking-tight-display">
              Order Review ({selectedItems.length} items)
            </h3>

            {/* Mini Items Preview */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {selectedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 rounded-[14px] object-cover border border-[#ebebeb] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-black truncate tracking-tight-body">{item.title}</p>
                    <p className="text-[11px] text-[#787574]">
                      Qty: {item.quantity} × {formatPKR(item.price)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-black">
                    {formatPKR(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#ebebeb] text-xs text-[#787574]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-black">{formatPKR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping ({city})</span>
                <span className="font-bold text-black">
                  {shipping === 0 ? (
                    <span className="text-emerald-600 font-bold">FREE</span>
                  ) : (
                    formatPKR(shipping)
                  )}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Savings</span>
                  <span>-{formatPKR(discount)}</span>
                </div>
              )}
              <div className="border-t border-[#ebebeb] pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-black">Payable Total</span>
                <span className="text-2xl font-black text-black tracking-tight-display">{formatPKR(total)}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#5433eb] hover:bg-[#4524db] text-white rounded-full font-bold text-sm shadow-violet-glow transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Registering Order...</span>
              ) : (
                <>
                  <span>Place Order ({formatPKR(total)})</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[10px] text-[#787574] text-center leading-relaxed">
              By placing your order, you agree to FTH Mart's Terms of Service and 7-Day Replacement Policy.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
