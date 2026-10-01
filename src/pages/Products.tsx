import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/mockData';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const categoryFilter = searchParams.get('category') || '';
  const searchFilter = searchParams.get('search') || '';
  const viewMode = searchParams.get('view') || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (categoryFilter) {
      result = result.filter(p => p.categorySlug === categoryFilter);
    }

    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.farmer.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    result = result.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'featured': result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return result;
  }, [categoryFilter, searchFilter, priceRange, sortBy]);

  const handleCategoryChange = (slug: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (slug) newParams.set('category', slug);
    else newParams.delete('category');
    setSearchParams(newParams);
  };

  if (viewMode === 'categories') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-2">Browse Categories</h1>
          <p className="text-gray-500">Find fresh produce organized by type</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              to={`/products?category=${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl bg-[#f0fdf4] border border-[#d8f3dc] hover:shadow-lg transition-all"
            >
              <div className="h-52 overflow-hidden bg-[#2d6a4f]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b4332]/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="text-3xl mb-1">{cat.icon}</div>
                <h3 className="font-display text-xl text-white">{cat.name}</h3>
                <p className="text-[#95d5b2] text-sm">{cat.count} products available</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-1">
          {searchFilter ? `Results for "${searchFilter}"` : categoryFilter
            ? `${categories.find(c => c.slug === categoryFilter)?.name ?? 'Products'}`
            : 'All Products'}
        </h1>
        <p className="text-gray-500">{filteredProducts.length} products found</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Category</h3>
            <div className="space-y-1">
              <button
                onClick={() => handleCategoryChange('')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  !categoryFilter ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold' : 'text-gray-600 hover:bg-[#f0fdf4]'
                }`}
              >
                All Products
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                    categoryFilter === cat.slug
                      ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold'
                      : 'text-gray-600 hover:bg-[#f0fdf4]'
                  }`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className="text-xs text-gray-400">{cat.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wider">Price Range</h3>
            <div className="space-y-2">
              {[
                { label: 'All Prices', range: [0, 1000] as [number, number] },
                { label: 'Under ₱50', range: [0, 50] as [number, number] },
                { label: '₱50 – ₱100', range: [50, 100] as [number, number] },
                { label: '₱100 – ₱300', range: [100, 300] as [number, number] },
                { label: '₱300+', range: [300, 1000] as [number, number] },
              ].map(opt => (
                <button
                  key={opt.label}
                  onClick={() => setPriceRange(opt.range)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    priceRange[0] === opt.range[0] && priceRange[1] === opt.range[1]
                      ? 'bg-[#d8f3dc] text-[#1b4332] font-semibold'
                      : 'text-gray-600 hover:bg-[#f0fdf4]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            {/* Mobile filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  !categoryFilter ? 'bg-[#2d6a4f] text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                All
              </button>
              {categories.map(cat => (
                <button
                  key={cat.slug}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                    categoryFilter === cat.slug ? 'bg-[#2d6a4f] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#52b788]"
              >
                <option value="featured">Featured</option>
                <option value="rating">Top Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 ${view === 'grid' ? 'bg-[#2d6a4f] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 ${view === 'list' ? 'bg-[#2d6a4f] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 4h18v2H3V4zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🌾</div>
              <h3 className="font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your search or category filter</p>
              <button
                onClick={() => { handleCategoryChange(''); }}
                className="px-5 py-2.5 bg-[#2d6a4f] text-white text-sm font-medium rounded-xl hover:bg-[#1b4332]"
              >
                Clear Filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="flex gap-4 bg-white rounded-2xl border border-gray-100 hover:border-[#95d5b2] hover:shadow-md transition-all overflow-hidden group"
                >
                  <div className="w-40 h-32 shrink-0 bg-[#f0fdf4] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs text-[#2d6a4f] font-semibold">{product.category}</span>
                      <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-xs text-gray-500">{product.farmer} · {product.location}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#1b4332] text-lg">₱{product.price}<span className="text-sm font-normal text-gray-400"> /{product.unit}</span></div>
                      <div className="text-xs text-gray-500">{product.stock} {product.unit} available</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
