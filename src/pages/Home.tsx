import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories, farmers } from '../data/mockData';

function HeroSection() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#1b4332] via-[#2d6a4f] to-[#52b788] min-h-[600px] flex items-center">
      {/* Decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#52b788]/20 blur-3xl" />
        <div className="absolute bottom-0 -left-12 w-72 h-72 rounded-full bg-[#95d5b2]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://images.unsplash.com/photo-1557844352-761f2565b576?w=1440&h=800&fit=crop&auto=format')] bg-cover bg-center opacity-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-[#d8f3dc] text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#95d5b2] animate-pulse" />
            🇵🇭 Proudly Filipino Agricultural Marketplace
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
            Fresh Agriculture Products, Directly From Local Farmers
          </h1>
          <p className="text-[#b7e4c7] text-lg leading-relaxed mb-8 max-w-xl">
            Discover quality agricultural products from trusted farmers and suppliers. Support local farming communities while getting the freshest produce delivered to your door.
          </p>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <div className="flex-1 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-lg">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search rice, vegetables, seeds, fertilizer..."
                className="flex-1 text-gray-800 placeholder-gray-400 bg-transparent focus:outline-none text-sm"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#95d5b2] text-[#1b4332] font-semibold rounded-xl hover:bg-white transition-colors shrink-0"
            >
              Search
            </button>
          </form>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/products"
              className="px-6 py-3 bg-white text-[#1b4332] font-semibold rounded-xl hover:bg-[#d8f3dc] transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/products?view=categories"
              className="px-6 py-3 border-2 border-white/50 text-white font-semibold rounded-xl hover:border-white hover:bg-white/10 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Hero Image Collage */}
        <div className="hidden lg:grid grid-cols-2 gap-3 relative">
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden h-48 bg-[#2d6a4f]">
              <img
                src="https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=400&h=300&fit=crop&auto=format"
                alt="Fresh vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-36 bg-[#2d6a4f]">
              <img
                src="https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=400&h=250&fit=crop&auto=format"
                alt="Rice field"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-3 mt-6">
            <div className="rounded-2xl overflow-hidden h-36 bg-[#2d6a4f]">
              <img
                src="https://images.unsplash.com/photo-1757281096599-b9165ba74008?w=400&h=250&fit=crop&auto=format"
                alt="Mangoes"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden h-48 bg-[#2d6a4f]">
              <img
                src="https://images.unsplash.com/photo-1485637701894-09ad422f6de6?w=400&h=300&fit=crop&auto=format"
                alt="Tomatoes"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Stats chip */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl px-6 py-3 flex items-center gap-6 whitespace-nowrap">
            <div className="text-center">
              <div className="font-bold text-[#1b4332] text-lg">2,400+</div>
              <div className="text-xs text-gray-500">Products</div>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <div className="font-bold text-[#1b4332] text-lg">380+</div>
              <div className="text-xs text-gray-500">Farmers</div>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <div className="font-bold text-[#1b4332] text-lg">18K+</div>
              <div className="text-xs text-gray-500">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    { icon: '🌱', label: 'Organically Grown', desc: 'Direct from certified farmers' },
    { icon: '🚚', label: 'Fast Delivery', desc: '2–5 days nationwide' },
    { icon: '🔒', label: 'Secure Payment', desc: 'GCash, Maya & COD accepted' },
    { icon: '⭐', label: 'Quality Guaranteed', desc: 'Fresh or money back' },
  ];
  return (
    <section className="bg-[#f0fdf4] border-y border-[#d8f3dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="text-sm font-semibold text-[#1b4332]">{item.label}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[#52b788] font-semibold text-sm uppercase tracking-wider mb-2">Browse</p>
          <h2 className="font-display text-3xl sm:text-4xl text-[#1b4332]">Shop by Category</h2>
        </div>
        <Link
          to="/products?view=categories"
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#2d6a4f] hover:text-[#1b4332]"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map(cat => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            className="group flex flex-col items-center p-4 rounded-2xl bg-white border border-gray-100 hover:border-[#95d5b2] hover:shadow-md transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#f0fdf4] flex items-center justify-center text-3xl mb-3 group-hover:bg-[#d8f3dc] transition-colors">
              {cat.icon}
            </div>
            <span className="text-sm font-semibold text-gray-800 text-center">{cat.name}</span>
            <span className="text-xs text-gray-400 mt-0.5">{cat.count} products</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedProductsSection() {
  const featured = products.filter(p => p.featured);
  return (
    <section className="bg-[#fefae0] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#52b788] font-semibold text-sm uppercase tracking-wider mb-2">Handpicked</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1b4332]">Featured Agricultural Products</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#2d6a4f] hover:text-[#1b4332]"
          >
            View all products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featured.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
          >
            Browse All Products
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function FarmersSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-[#52b788] font-semibold text-sm uppercase tracking-wider mb-2">Our People</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-4">Meet the Farmers</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Every product has a story. Behind each harvest are dedicated farmers who have spent generations mastering their craft.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        {farmers.map(farmer => (
          <div
            key={farmer.id}
            className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="h-40 overflow-hidden bg-[#f0fdf4] relative">
              <img
                src={farmer.image}
                alt={farmer.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <div className="text-xs opacity-80">📍 {farmer.location}</div>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-900 mb-1">{farmer.name}</h3>
              <p className="text-sm text-gray-500 mb-3 line-clamp-2">{farmer.description}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-2 bg-[#f0fdf4] rounded-lg">
                  <div className="text-sm font-bold text-[#1b4332]">{farmer.productCount}</div>
                  <div className="text-xs text-gray-500">Products</div>
                </div>
                <div className="text-center p-2 bg-[#f0fdf4] rounded-lg">
                  <div className="text-sm font-bold text-[#1b4332]">{farmer.rating}</div>
                  <div className="text-xs text-gray-500">Rating</div>
                </div>
                <div className="text-center p-2 bg-[#f0fdf4] rounded-lg">
                  <div className="text-sm font-bold text-[#1b4332]">{farmer.completedOrders}</div>
                  <div className="text-xs text-gray-500">Orders</div>
                </div>
              </div>
              <Link
                to="/products"
                className="w-full py-2 text-center text-sm font-semibold text-[#2d6a4f] border border-[#2d6a4f] rounded-xl hover:bg-[#f0fdf4] transition-colors block"
              >
                View Products
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="bg-[#1b4332] py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-[#2d6a4f]/50 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#52b788]/20 translate-x-1/3 translate-y-1/3" />
      </div>
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-5">
          Fresh from the Farm to Your Table
        </h2>
        <p className="text-[#95d5b2] text-lg mb-10 leading-relaxed">
          Join thousands of customers who trust AgriSales for fresh, locally-sourced agricultural products. Sign up today and get ₱100 off your first order.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/products"
            className="px-8 py-4 bg-[#95d5b2] text-[#1b4332] font-bold rounded-xl hover:bg-white transition-colors text-sm"
          >
            Start Shopping
          </Link>
          <Link
            to="/about"
            className="px-8 py-4 border-2 border-[#95d5b2]/50 text-[#95d5b2] font-bold rounded-xl hover:border-[#95d5b2] hover:bg-[#95d5b2]/10 transition-colors text-sm"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div>
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <FeaturedProductsSection />
      <FarmersSection />
      <CtaBanner />
    </div>
  );
}
