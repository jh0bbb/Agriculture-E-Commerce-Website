import { Link } from 'react-router-dom';
import { DashboardLayout } from './Dashboard';
import { useCart } from '../context/CartContext';
import { Stars } from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCart();

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl text-[#1b4332] mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-[#f0fdf4] flex items-center justify-center text-4xl mx-auto mb-4">
              ❤️
            </div>
            <h2 className="font-semibold text-gray-700 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 text-sm mb-5">Save products you love and come back later.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2d6a4f] text-white text-sm font-semibold rounded-xl hover:bg-[#1b4332]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {wishlist.map(({ product }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group"
              >
                <div className="flex">
                  <Link to={`/products/${product.id}`} className="w-32 h-32 shrink-0 bg-[#f0fdf4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </Link>
                  <div className="flex-1 p-4 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <Link to={`/products/${product.id}`} className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-[#2d6a4f]">
                        {product.name}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="shrink-0 p-1 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{product.farmer}</p>
                    <Stars rating={product.rating} />
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-[#1b4332]">₱{product.price}<span className="text-xs font-normal text-gray-400"> /{product.unit}</span></span>
                      <span className={`text-xs font-medium ${product.stock > 0 ? 'text-[#2d6a4f]' : 'text-red-500'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="mt-2 w-full py-1.5 bg-[#2d6a4f] text-white text-xs font-semibold rounded-lg hover:bg-[#1b4332] transition-colors disabled:opacity-50"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
