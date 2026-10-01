import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const steps = [
  { id: 1, label: 'Delivery Info' },
  { id: 2, label: 'Delivery Method' },
  { id: 3, label: 'Payment' },
  { id: 4, label: 'Review Order' },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
              step.id < current ? 'bg-[#2d6a4f] text-white' :
              step.id === current ? 'bg-[#2d6a4f] text-white ring-4 ring-[#d8f3dc]' :
              'bg-gray-100 text-gray-400'
            }`}>
              {step.id < current ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : step.id}
            </div>
            <span className={`text-xs mt-1.5 whitespace-nowrap font-medium ${
              step.id === current ? 'text-[#1b4332]' : 'text-gray-400'
            }`}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-16 sm:w-24 h-0.5 mx-2 mb-5 ${step.id < current ? 'bg-[#2d6a4f]' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

interface DeliveryForm {
  fullName: string; phone: string; province: string;
  city: string; barangay: string; street: string; notes: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [deliveryForm, setDeliveryForm] = useState<DeliveryForm>({
    fullName: 'Juan dela Cruz', phone: '09171234567', province: 'Metro Manila',
    city: 'Quezon City', barangay: 'San Jose', street: '123 Magsaysay St.', notes: '',
  });
  const [deliveryMethod, setDeliveryMethod] = useState<'standard' | 'express' | 'pickup'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('gcash');

  const deliveryFee = deliveryMethod === 'express' ? 150 : deliveryMethod === 'pickup' ? 0 : 85;
  const discount = cartTotal >= 500 ? 50 : 0;
  const total = cartTotal + deliveryFee - discount;

  const handleFieldChange = (field: keyof DeliveryForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setDeliveryForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    clearCart();
    navigate('/order-success');
  };

  if (cart.length === 0 && step !== 4) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-[#1b4332] mb-8 text-center">Checkout</h1>
      <StepIndicator current={step} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">

          {/* Step 1 — Delivery Info */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-5">Delivery Information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Full Name', field: 'fullName' as const, type: 'text' },
                  { label: 'Phone Number', field: 'phone' as const, type: 'tel' },
                  { label: 'Province', field: 'province' as const, type: 'text' },
                  { label: 'Municipality/City', field: 'city' as const, type: 'text' },
                  { label: 'Barangay', field: 'barangay' as const, type: 'text' },
                  { label: 'Street Address', field: 'street' as const, type: 'text' },
                ].map(field => (
                  <div key={field.field} className={field.field === 'street' ? 'sm:col-span-2' : ''}>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      value={deliveryForm[field.field]}
                      onChange={handleFieldChange(field.field)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Additional Instructions <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={deliveryForm.notes}
                    onChange={handleFieldChange('notes')}
                    placeholder="Leave instructions for the delivery rider..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] resize-none"
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
              >
                Continue to Delivery Method
              </button>
            </div>
          )}

          {/* Step 2 — Delivery Method */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-5">Delivery Method</h2>
              <div className="space-y-3">
                {[
                  {
                    id: 'standard', icon: '🚚', label: 'Standard Delivery',
                    desc: 'Estimated 3–5 business days', fee: '₱85',
                    eta: 'Arrives Oct 5–7, 2026',
                  },
                  {
                    id: 'express', icon: '⚡', label: 'Express Delivery',
                    desc: 'Estimated 1–2 business days', fee: '₱150',
                    eta: 'Arrives Oct 3, 2026',
                  },
                  {
                    id: 'pickup', icon: '🏪', label: 'Pickup at Farmgate',
                    desc: 'Pick up from the farmer directly', fee: 'Free',
                    eta: 'Available Oct 2, 2026',
                  },
                ].map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      deliveryMethod === opt.id
                        ? 'border-[#2d6a4f] bg-[#f0fdf4]'
                        : 'border-gray-100 hover:border-[#95d5b2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value={opt.id}
                      checked={deliveryMethod === opt.id as typeof deliveryMethod}
                      onChange={() => setDeliveryMethod(opt.id as typeof deliveryMethod)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{opt.label}</div>
                      <div className="text-sm text-gray-500">{opt.desc}</div>
                      <div className="text-xs text-[#2d6a4f] mt-1">{opt.eta}</div>
                    </div>
                    <div className="font-bold text-[#1b4332]">{opt.fee}</div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      deliveryMethod === opt.id ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-gray-300'
                    }`}>
                      {deliveryMethod === opt.id && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(3)} className="flex-1 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332]">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step 3 — Payment */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-5">Payment Method</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
                  { id: 'gcash', icon: '📱', label: 'GCash', desc: 'Fast mobile payment' },
                  { id: 'maya', icon: '💳', label: 'Maya', desc: 'Digital wallet payment' },
                  { id: 'bank', icon: '🏦', label: 'Bank Transfer', desc: 'Direct bank deposit' },
                ].map(opt => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === opt.id
                        ? 'border-[#2d6a4f] bg-[#f0fdf4]'
                        : 'border-gray-100 hover:border-[#95d5b2]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={() => setPaymentMethod(opt.id)}
                      className="sr-only"
                    />
                    <span className="text-2xl">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 text-sm">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === opt.id ? 'border-[#2d6a4f] bg-[#2d6a4f]' : 'border-gray-300'
                    }`}>
                      {paymentMethod === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 bg-[#f0fdf4] rounded-xl p-3 text-sm text-[#2d6a4f]">
                <span>🔒</span>
                <span>Your payment information is encrypted and secure.</span>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(2)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50">Back</button>
                <button onClick={() => setStep(4)} className="flex-1 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332]">Review Order</button>
              </div>
            </div>
          )}

          {/* Step 4 — Review */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 text-lg mb-5">Review Your Order</h2>

              {/* Products */}
              <div className="space-y-3 mb-5">
                {cart.map(item => (
                  <div key={item.product.id} className="flex gap-3 items-center">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f0fdf4] shrink-0">
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₱{item.product.price}</p>
                    </div>
                    <span className="font-semibold text-[#1b4332] text-sm">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <div className="bg-[#f0fdf4] rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Delivery Address</div>
                  <p className="text-sm text-gray-700">
                    {deliveryForm.fullName}<br />
                    {deliveryForm.street}, Brgy. {deliveryForm.barangay}<br />
                    {deliveryForm.city}, {deliveryForm.province}<br />
                    📞 {deliveryForm.phone}
                  </p>
                </div>
                <div className="bg-[#f0fdf4] rounded-xl p-4">
                  <div className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Delivery & Payment</div>
                  <p className="text-sm text-gray-700 capitalize">{deliveryMethod} Delivery</p>
                  <p className="text-sm text-gray-700 capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'gcash' ? 'GCash' : paymentMethod === 'maya' ? 'Maya' : 'Bank Transfer'}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 py-3 border border-gray-200 text-gray-600 font-medium rounded-xl hover:bg-gray-50">Back</button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 py-3.5 bg-[#2d6a4f] text-white font-bold rounded-xl hover:bg-[#1b4332] transition-colors"
                >
                  Place Order — ₱{total.toLocaleString()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary Sidebar */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h3 className="font-semibold text-gray-800 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-gray-600">
                  <span className="truncate mr-2">{item.product.name} ×{item.quantity}</span>
                  <span className="shrink-0">₱{(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span><span>₱{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span><span>₱{deliveryFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#2d6a4f]">
                  <span>Discount</span><span>−₱{discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#1b4332] text-base pt-2 border-t border-gray-100">
                <span>Total</span><span>₱{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
