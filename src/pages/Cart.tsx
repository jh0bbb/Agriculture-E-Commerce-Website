import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const deliveryFee = cartTotal > 0 ? 85 : 0;
  const discount = cartTotal >= 500 ? 50 : 0;
  const total = cartTotal + deliveryFee - discount;

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-24 h-24 rounded-full bg-[#f0fdf4] flex items-center justify-center text-5xl mx-auto mb-6">
            🛒
          </div>
          <h2 className="font-display text-2xl text-[#1b4332] mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Browse our fresh agricultural products and add them to your cart.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-display text-3xl text-[#1b4332] mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-start"
            >
              {/* Image */}
              <Link to={`/products/${item.product.id}`} className="w-24 h-24 rounded-xl overflow-hidden bg-[#f0fdf4] shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                />
              </Link>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <Link to={`/products/${item.product.id}`} className="font-semibold text-gray-900 hover:text-[#2d6a4f] transition-colors leading-tight">
                    {item.product.name}
                  </Link>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    aria-label="Remove"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-1">From: {item.product.farmer}</p>
                <p className="text-sm text-gray-400 mb-3">₱{item.product.price} / {item.product.unit}</p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  {/* Quantity */}
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-[#f0fdf4]"
                    >
                      −
                    </button>
                    <span className="w-10 h-8 flex items-center justify-center font-semibold text-gray-800 border-x border-gray-200 text-sm">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-[#f0fdf4]"
                    >
                      +
                    </button>
                  </div>
                  {/* Subtotal */}
                  <div className="font-bold text-[#1b4332] text-lg">
                    ₱{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Continue Shopping */}
          <Link
            to="/products"
            className="flex items-center gap-2 text-sm font-medium text-[#2d6a4f] hover:text-[#1b4332] mt-4"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-semibold text-gray-800 text-lg mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal ({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
                <span className="font-medium">₱{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="font-medium">₱{deliveryFee}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-[#2d6a4f]">
                  <span>Discount (order ≥ ₱500)</span>
                  <span>−₱{discount}</span>
                </div>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-[#1b4332] text-xl">₱{total.toLocaleString()}</span>
              </div>
            </div>

            {cartTotal < 500 && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-5 text-xs text-amber-700">
                Add ₱{(500 - cartTotal).toLocaleString()} more to get ₱50 discount!
              </div>
            )}

            <Link
              to="/checkout"
              className="block w-full py-3.5 bg-[#2d6a4f] text-white text-center font-semibold rounded-xl hover:bg-[#1b4332] transition-colors mb-3"
            >
              Proceed to Checkout
            </Link>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-400 mt-4">
              <span>🔒 Secure checkout</span>
              <span>·</span>
              <span>🇵🇭 COD available</span>
            </div>

            {/* Payment icons */}
            <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
              {['GCash', 'Maya', 'Bank', 'COD'].map(method => (
                <span key={method} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-md text-xs text-gray-500">
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
