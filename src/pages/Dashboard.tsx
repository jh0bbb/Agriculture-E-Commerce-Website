import { type ReactNode } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: '📊', exact: true },
  { to: '/dashboard/orders', label: 'My Orders', icon: '📦' },
  { to: '/dashboard/wishlist', label: 'Wishlist', icon: '❤️' },
  { to: '/dashboard/messages', label: 'Messages', icon: '💬' },
  { to: '/dashboard/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { to: '/dashboard/reviews', label: 'Reviews', icon: '⭐' },
];

export function DashboardLayout({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const { setIsLoggedIn, wishlist } = useCart();

  const isActive = (to: string, exact = false) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          {/* Profile snippet */}
          <div className="bg-[#f0fdf4] rounded-2xl p-4 mb-4 border border-[#d8f3dc]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#2d6a4f] flex items-center justify-center text-white font-bold text-lg">
                JD
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-[#1b4332] truncate text-sm">Juan dela Cruz</div>
                <div className="text-xs text-gray-500">Customer</div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="space-y-1">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(item.to, item.exact)
                    ? 'bg-[#2d6a4f] text-white'
                    : 'text-gray-600 hover:bg-[#f0fdf4] hover:text-[#1b4332]'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
                {item.label === 'Wishlist' && wishlist.length > 0 && (
                  <span className="ml-auto bg-[#95d5b2] text-[#1b4332] text-xs rounded-full px-1.5 py-0.5 font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>
            ))}

            <div className="pt-2 border-t border-gray-100 mt-2">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 w-full"
              >
                <span>🚪</span>
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Mobile nav tabs */}
        <div className="lg:hidden w-full">
          <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
            {navItems.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors shrink-0 ${
                  isActive(item.to, item.exact)
                    ? 'bg-[#2d6a4f] text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            ))}
          </div>
          <div>{children ?? <Outlet />}</div>
        </div>

        {/* Main Content Desktop */}
        <div className="hidden lg:block flex-1 min-w-0">
          {children ?? <Outlet />}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label, color }: { icon: string; value: string | number; label: string; color: string }) {
  return (
    <div className={`rounded-2xl p-5 border ${color}`}>
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-display text-2xl text-[#1b4332] mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

export default function DashboardOverview() {
  return (
    <DashboardLayout>
      <div>
        <div className="mb-8">
          <h1 className="font-display text-3xl text-[#1b4332] mb-1">My Dashboard</h1>
          <p className="text-gray-500">Welcome back, Juan! Here's what's happening with your orders.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="📦" value={1} label="Active Orders" color="bg-blue-50 border-blue-100" />
          <StatCard icon="✅" value={2} label="Completed Orders" color="bg-[#f0fdf4] border-[#d8f3dc]" />
          <StatCard icon="❤️" value={0} label="Wishlist Items" color="bg-red-50 border-red-100" />
          <StatCard icon="💰" value="₱1,045" label="Total Spending" color="bg-amber-50 border-amber-100" />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-800">Recent Orders</h2>
            <Link to="/dashboard/orders" className="text-sm text-[#2d6a4f] font-medium hover:text-[#1b4332]">View all</Link>
          </div>
          <div className="space-y-3">
            {[
              { id: 'AG-2026-00125', product: 'Premium Sinandomeng Rice ×10kg', date: 'Sep 28', total: '₱550', status: 'Processing' },
              { id: 'AG-2026-00098', product: 'Mountain Cabbage + Tomatoes', date: 'Sep 15', total: '₱255', status: 'Delivered' },
            ].map(order => (
              <div key={order.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#f0fdf4] transition-colors">
                <div className="w-10 h-10 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-lg shrink-0">📦</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-800 text-sm">#{order.id}</div>
                  <div className="text-xs text-gray-500 truncate">{order.product}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-semibold text-gray-800 text-sm">{order.total}</div>
                  <span className={`text-xs font-medium ${
                    order.status === 'Delivered' ? 'text-[#2d6a4f]' : 'text-blue-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { label: 'Browse Products', to: '/products', icon: '🌾', desc: 'Discover fresh produce' },
            { label: 'Track Orders', to: '/dashboard/orders', icon: '🚚', desc: 'Check delivery status' },
            { label: 'My Wishlist', to: '/dashboard/wishlist', icon: '❤️', desc: 'View saved items' },
          ].map(action => (
            <Link
              key={action.to}
              to={action.to}
              className="bg-[#f0fdf4] rounded-2xl p-5 border border-[#d8f3dc] hover:border-[#95d5b2] hover:shadow-md transition-all group"
            >
              <div className="text-3xl mb-2">{action.icon}</div>
              <div className="font-semibold text-[#1b4332] mb-1">{action.label}</div>
              <div className="text-sm text-gray-500">{action.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
