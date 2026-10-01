import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1b4332] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
              <span className="font-display text-xl font-bold text-white">AgriSales</span>
            </div>
            <p className="text-[#95d5b2] text-sm leading-relaxed mb-6">
              Agriculture marketplace connecting customers directly with local farmers and trusted suppliers across the Philippines.
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Twitter'].map(social => (
                <a
                  key={social}
                  href="#"
                  aria-label={social}
                  className="w-9 h-9 rounded-lg bg-[#2d6a4f] hover:bg-[#52b788] transition-colors flex items-center justify-center"
                >
                  <span className="text-xs font-bold">
                    {social === 'Facebook' ? 'f' : social === 'Instagram' ? '▣' : '𝕏'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'All Products', to: '/products' },
                { label: 'Categories', to: '/products?view=categories' },
                { label: 'Featured Products', to: '/products?featured=true' },
                { label: 'Grains', to: '/products?category=grains' },
                { label: 'Vegetables', to: '/products?category=vegetables' },
                { label: 'Fruits', to: '/products?category=fruits' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#95d5b2] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Customer</h4>
            <ul className="space-y-3">
              {[
                { label: 'My Orders', to: '/dashboard/orders' },
                { label: 'Wishlist', to: '/dashboard/wishlist' },
                { label: 'My Account', to: '/dashboard' },
                { label: 'Messages', to: '/dashboard/messages' },
                { label: 'Help Center', to: '/contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#95d5b2] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Information</h4>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
                { label: 'Privacy Policy', to: '#' },
                { label: 'Terms & Conditions', to: '#' },
              ].map(link => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[#95d5b2] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-2 text-sm text-[#95d5b2]">
              <p>📞 +63 (02) 8123-4567</p>
              <p>📧 hello@agrisales.ph</p>
              <p>📍 Quezon City, Metro Manila</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#2d6a4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#95d5b2] text-sm">
            © 2026 AgriSales. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[#95d5b2] text-xs">🔒 Secured payments</span>
            <span className="text-[#2d6a4f]">|</span>
            <span className="text-[#95d5b2] text-xs">🇵🇭 Philippines</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
