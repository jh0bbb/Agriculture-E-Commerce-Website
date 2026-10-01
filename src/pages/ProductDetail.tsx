import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products, farmers } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { Stars } from '../components/ProductCard';

const reviews = [
  {
    id: 'r1',
    user: 'Maria Santos',
    avatar: 'MS',
    rating: 5,
    date: 'September 20, 2026',
    comment: 'Excellent quality rice! Very aromatic and cooked perfectly. Will definitely order again.',
    verified: true,
  },
  {
    id: 'r2',
    user: 'Juan dela Cruz',
    avatar: 'JC',
    rating: 5,
    date: 'September 10, 2026',
    comment: 'Fresh and well-packed. Delivered on time. Mang Rolando is a trusted farmer.',
    verified: true,
  },
  {
    id: 'r3',
    user: 'Ana Reyes',
    avatar: 'AR',
    rating: 4,
    date: 'August 28, 2026',
    comment: 'Great product, good packaging. Slightly delayed delivery but worth it.',
    verified: true,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');
  const [imgIndex, setImgIndex] = useState(0);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🌾</div>
        <h2 className="font-display text-2xl text-[#1b4332] mb-2">Product Not Found</h2>
        <Link to="/products" className="text-[#2d6a4f] underline">Browse Products</Link>
      </div>
    );
  }

  const farmer = farmers.find(f => f.id === product.farmerId);
  const images = [product.image, product.image, product.image];
  const related = products.filter(p => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-[#2d6a4f]">Home</Link>
        <span>›</span>
        <Link to="/products" className="hover:text-[#2d6a4f]">Products</Link>
        <span>›</span>
        <Link to={`/products?category=${product.categorySlug}`} className="hover:text-[#2d6a4f]">{product.category}</Link>
        <span>›</span>
        <span className="text-gray-800 truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-[#f0fdf4] mb-4 aspect-square">
            <img
              src={images[imgIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                  imgIndex === i ? 'border-[#2d6a4f]' : 'border-gray-100 hover:border-[#95d5b2]'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-[#d8f3dc] text-[#1b4332] text-xs font-semibold rounded-full">
              {product.category}
            </span>
            {product.featured && (
              <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full">
                ⭐ Featured
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-4">{product.name}</h1>

          <div className="flex items-center gap-3 mb-5">
            <Stars rating={product.rating} />
            <span className="font-semibold text-gray-800">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
          </div>

          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-display text-4xl text-[#1b4332]">₱{product.price}</span>
            <span className="text-gray-500 text-lg">/ {product.unit}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="bg-[#f0fdf4] rounded-xl p-3">
              <div className="text-gray-500 text-xs mb-1">Available Stock</div>
              <div className="font-semibold text-[#1b4332]">{product.stock} {product.unit}</div>
            </div>
            <div className="bg-[#f0fdf4] rounded-xl p-3">
              <div className="text-gray-500 text-xs mb-1">Supplier</div>
              <div className="font-semibold text-[#1b4332] truncate">{product.farmer}</div>
            </div>
            <div className="bg-[#f0fdf4] rounded-xl p-3 col-span-2">
              <div className="text-gray-500 text-xs mb-1">Location</div>
              <div className="font-semibold text-[#1b4332]">📍 {product.location}</div>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-[#f0fdf4] text-lg font-light"
              >
                −
              </button>
              <span className="w-12 h-10 flex items-center justify-center font-semibold text-gray-800 border-x border-gray-200">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-[#f0fdf4] text-lg font-light"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-400">
              Subtotal: <strong className="text-gray-700">₱{(product.price * quantity).toLocaleString()}</strong>
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3.5 border-2 border-[#2d6a4f] text-[#2d6a4f] font-semibold rounded-xl hover:bg-[#f0fdf4] transition-colors"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
            >
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3.5 rounded-xl border-2 transition-colors ${
                isInWishlist(product.id)
                  ? 'border-[#2d6a4f] bg-[#2d6a4f] text-white'
                  : 'border-gray-200 text-gray-400 hover:border-[#95d5b2]'
              }`}
              aria-label="Wishlist"
            >
              <svg className="w-5 h-5" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <button className="w-full py-3 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Message Seller
          </button>

          {/* Tags */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {product.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-100">
        <div className="flex gap-1">
          {(['description', 'reviews'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                selectedTab === tab
                  ? 'border-[#2d6a4f] text-[#2d6a4f]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} {tab === 'reviews' && `(${reviews.length})`}
            </button>
          ))}
        </div>
      </div>

      {selectedTab === 'description' ? (
        <div className="max-w-3xl">
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'Category', value: product.category },
              { label: 'Unit', value: product.unit },
              { label: 'Origin', value: product.location },
              { label: 'Stock', value: `${product.stock} ${product.unit}` },
            ].map(item => (
              <div key={item.label} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-sm font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-3xl space-y-5">
          {reviews.map(review => (
            <div key={review.id} className="bg-[#f0fdf4] rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#2d6a4f] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {review.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-gray-800">{review.user}</span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <Stars rating={review.rating} />
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{review.comment}</p>
                  {review.verified && (
                    <span className="text-xs text-[#2d6a4f] mt-2 inline-flex items-center gap-1">
                      ✓ Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Farmer Info */}
      {farmer && (
        <div className="mt-16 bg-[#f0fdf4] rounded-3xl p-8 border border-[#d8f3dc]">
          <h2 className="font-display text-2xl text-[#1b4332] mb-6">About the Farmer</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#2d6a4f] shrink-0">
              <img src={farmer.image} alt={farmer.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{farmer.name}</h3>
              <p className="text-sm text-gray-500 mb-3">📍 {farmer.location} · Member since {farmer.joinedDate}</p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{farmer.description}</p>
              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white rounded-xl p-3 text-center border border-[#d8f3dc]">
                  <div className="font-bold text-[#1b4332]">{farmer.productCount}</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-[#d8f3dc]">
                  <div className="font-bold text-[#1b4332]">{farmer.rating} ⭐</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="bg-white rounded-xl p-3 text-center border border-[#d8f3dc]">
                  <div className="font-bold text-[#1b4332]">{farmer.completedOrders}</div>
                  <div className="text-xs text-gray-500">Orders Done</div>
                </div>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2d6a4f] text-white text-sm font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
              >
                View Farmer Products
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="font-display text-2xl text-[#1b4332] mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(p => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="flex gap-3 bg-white rounded-2xl border border-gray-100 hover:border-[#95d5b2] hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="w-24 h-24 shrink-0 bg-[#f0fdf4] overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 p-3">
                  <div className="text-xs text-[#2d6a4f] font-semibold mb-1">{p.category}</div>
                  <h4 className="font-medium text-gray-800 text-sm line-clamp-2">{p.name}</h4>
                  <div className="font-bold text-[#1b4332] mt-1">₱{p.price}<span className="text-xs font-normal text-gray-400"> /{p.unit}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
