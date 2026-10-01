import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import DashboardOverview from './pages/Dashboard';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-inset-bottom shadow-lg">
        <div className="flex">
          {[
            { to: '/', icon: '🏠', label: 'Home' },
            { to: '/products', icon: '🔎', label: 'Search' },
            { to: '/cart', icon: '🛒', label: 'Cart' },
            { to: '/dashboard/orders', icon: '📦', label: 'Orders' },
            { to: '/dashboard', icon: '👤', label: 'Account' },
          ].map(item => (
            <a
              key={item.to}
              href={item.to}
              className="flex-1 flex flex-col items-center py-2.5 text-gray-500 hover:text-[#2d6a4f] transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs mt-0.5 font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </nav>
      {/* Bottom padding for mobile nav */}
      <div className="lg:hidden h-16" />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/products" element={<Layout><Products /></Layout>} />
          <Route path="/products/:id" element={<Layout><ProductDetail /></Layout>} />
          <Route path="/cart" element={<Layout><Cart /></Layout>} />
          <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
          <Route path="/order-success" element={<Layout><OrderSuccess /></Layout>} />
          <Route path="/dashboard" element={<Layout><DashboardOverview /></Layout>} />
          <Route path="/dashboard/orders" element={<Layout><Orders /></Layout>} />
          <Route path="/dashboard/wishlist" element={<Layout><Wishlist /></Layout>} />
          <Route path="/dashboard/messages" element={<Layout><Messages /></Layout>} />
          <Route path="/dashboard/notifications" element={<Layout><Notifications /></Layout>} />
          <Route path="/dashboard/profile" element={<Layout><Profile /></Layout>} />
          <Route path="/dashboard/reviews" element={<Layout><Reviews /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
