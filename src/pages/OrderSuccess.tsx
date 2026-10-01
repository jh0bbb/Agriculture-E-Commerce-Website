import { Link } from 'react-router-dom';

export default function OrderSuccess() {
  const orderNumber = 'AG-2026-00' + Math.floor(100 + Math.random() * 900);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-[#d8f3dc] flex items-center justify-center text-5xl mx-auto mb-6 animate-bounce">
          ✅
        </div>

        <h1 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-3">
          Order Successfully Placed!
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Thank you for your order. Your agricultural products are being prepared by the farmer and will be on their way soon.
        </p>

        {/* Order details */}
        <div className="bg-[#f0fdf4] rounded-2xl p-6 border border-[#d8f3dc] mb-8 text-left space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Order Number</span>
            <span className="font-mono font-bold text-[#1b4332] bg-white px-3 py-1 rounded-lg border border-[#d8f3dc] text-sm">
              #{orderNumber}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Estimated Delivery</span>
            <span className="font-semibold text-gray-800 text-sm">October 5–7, 2026</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">Payment Method</span>
            <span className="font-semibold text-gray-800 text-sm">GCash</span>
          </div>
          <div className="border-t border-[#d8f3dc] pt-4 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total Amount</span>
            <span className="font-bold text-[#1b4332] text-xl">₱550</span>
          </div>
        </div>

        {/* What's next */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-8 text-left">
          <h3 className="font-semibold text-gray-800 mb-4 text-sm">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: '1', text: 'Farmer prepares your order for shipment' },
              { step: '2', text: 'You\'ll receive a tracking number via SMS' },
              { step: '3', text: 'Courier picks up and delivers your order' },
              { step: '4', text: 'Rate your purchase after delivery' },
            ].map(item => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#d8f3dc] text-[#1b4332] text-xs font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/dashboard/orders"
            className="flex-1 py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Track Order
          </Link>
          <Link
            to="/products"
            className="flex-1 py-3.5 border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold rounded-xl hover:bg-[#f0fdf4] transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
