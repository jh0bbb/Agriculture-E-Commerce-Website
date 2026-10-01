import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, isLoggedIn, setIsLoggedIn } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/products?view=categories', label: 'Categories' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const isActive = (to: string) => location.pathname === to.split('?')[0];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌾</span>
            <span className="font-display text-xl font-bold text-[#1b4332]">AgriSales</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.to)
                    ? 'bg-[#d8f3dc] text-[#1b4332]'
                    : 'text-gray-600 hover:text-[#2d6a4f] hover:bg-[#f0fdf4]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(v => !v)}
              className="p-2 rounded-lg text-gray-500 hover:text-[#2d6a4f] hover:bg-[#f0fdf4] transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-lg text-gray-500 hover:text-[#2d6a4f] hover:bg-[#f0fdf4] transition-colors"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#2d6a4f] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* Notifications */}
            {isLoggedIn && (
              <Link
                to="/dashboard/notifications"
                className="relative p-2 rounded-lg text-gray-500 hover:text-[#2d6a4f] hover:bg-[#f0fdf4] transition-colors"
                aria-label="Notifications"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-2 h-2" />
              </Link>
            )}

            {/* Auth */}
            {isLoggedIn ? (
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#f0fdf4] hover:bg-[#d8f3dc] transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-xs font-semibold">
                  JD
                </div>
                <span className="text-sm font-medium text-[#1b4332]">My Account</span>
              </Link>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-1.5 text-sm font-medium text-[#2d6a4f] border border-[#2d6a4f] rounded-lg hover:bg-[#f0fdf4] transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLoggedIn(true)}
                  className="px-4 py-1.5 text-sm font-medium text-white bg-[#2d6a4f] rounded-lg hover:bg-[#1b4332] transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-[#f0fdf4]"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        {searchOpen && (
          <div className="py-3 border-t border-gray-100">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search rice, vegetables, seeds, fertilizer..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-5 py-2 bg-[#2d6a4f] text-white text-sm font-medium rounded-lg hover:bg-[#1b4332] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-[#f0fdf4] hover:text-[#2d6a4f]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              {isLoggedIn ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-[#2d6a4f] hover:bg-[#f0fdf4]"
                >
                  My Account
                </Link>
              ) : (
                <div className="flex gap-2 px-4">
                  <button
                    onClick={() => { setIsLoggedIn(true); setMobileOpen(false); }}
                    className="flex-1 py-2 text-sm font-medium text-[#2d6a4f] border border-[#2d6a4f] rounded-lg"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { setIsLoggedIn(true); setMobileOpen(false); }}
                    className="flex-1 py-2 text-sm font-medium text-white bg-[#2d6a4f] rounded-lg"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
