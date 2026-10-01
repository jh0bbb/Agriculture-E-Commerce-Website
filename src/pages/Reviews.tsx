import { useState } from 'react';
import { DashboardLayout } from './Dashboard';
import { products } from '../data/mockData';

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(i)}
          className="text-2xl transition-transform hover:scale-110"
        >
          <span className={(hover || value) >= i ? 'text-amber-400' : 'text-gray-200'}>★</span>
        </button>
      ))}
    </div>
  );
}

const deliveredProducts = [products[1], products[3], products[2]];

export default function Reviews() {
  const [selected, setSelected] = useState(deliveredProducts[0].id);
  const [ratings, setRatings] = useState({ product: 0, seller: 0, delivery: 0 });
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = deliveredProducts.find(p => p.id === selected)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl text-[#1b4332] mb-2">Rate Your Purchase</h1>
        <p className="text-gray-500 text-sm mb-6">Share your experience with these products</p>

        {submitted ? (
          <div className="bg-[#f0fdf4] rounded-2xl border border-[#d8f3dc] p-10 text-center">
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="font-display text-2xl text-[#1b4332] mb-2">Review Submitted!</h2>
            <p className="text-gray-500 text-sm mb-4">Thank you for your feedback. It helps other customers make better decisions.</p>
            <button
              onClick={() => { setSubmitted(false); setRatings({ product: 0, seller: 0, delivery: 0 }); setComment(''); }}
              className="px-5 py-2.5 bg-[#2d6a4f] text-white text-sm font-semibold rounded-xl hover:bg-[#1b4332]"
            >
              Review Another Product
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Product selector */}
            <div>
              <h3 className="font-semibold text-gray-700 text-sm mb-3">Select Product to Review</h3>
              <div className="space-y-2">
                {deliveredProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={`w-full flex gap-3 p-3 rounded-xl border-2 text-left transition-colors ${
                      selected === p.id ? 'border-[#2d6a4f] bg-[#f0fdf4]' : 'border-gray-100 hover:border-[#95d5b2]'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#f0fdf4] shrink-0">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.farmer}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Review form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex gap-3 mb-6 items-center">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#f0fdf4]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedProduct.name}</h3>
                  <p className="text-sm text-gray-500">{selectedProduct.farmer}</p>
                </div>
              </div>

              <div className="space-y-5 mb-6">
                {[
                  { label: 'Product Quality', key: 'product' as const },
                  { label: 'Seller Rating', key: 'seller' as const },
                  { label: 'Delivery Rating', key: 'delivery' as const },
                ].map(item => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{item.label}</label>
                    <StarPicker
                      value={ratings[item.key]}
                      onChange={v => setRatings(prev => ({ ...prev, [item.key]: v }))}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                  <textarea
                    rows={4}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Tell us about your experience with this product..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photos <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#95d5b2] transition-colors cursor-pointer">
                    <div className="text-2xl mb-2">📷</div>
                    <p className="text-sm text-gray-500">Click to upload photos</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!ratings.product || !comment.trim()}
                className="w-full py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
