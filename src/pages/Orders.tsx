import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from './Dashboard';
import StatusBadge from '../components/StatusBadge';
import { mockOrders } from '../data/mockData';

const tabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
type Tab = typeof tabs[number];

export function OrderTracking({ orderId }: { orderId: string }) {
  const order = mockOrders.find(o => o.id === orderId) ?? mockOrders[0];

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-800">Order Tracking</h2>
            <p className="text-sm text-gray-500">#{order.id}</p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {/* Timeline */}
        <div className="space-y-0 mb-6">
          {order.trackingSteps.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 text-sm font-bold shrink-0 ${
                  step.done ? 'border-[#2d6a4f] bg-[#2d6a4f] text-white' :
                  step.active ? 'border-[#52b788] bg-[#f0fdf4] text-[#2d6a4f] animate-pulse' :
                  'border-gray-200 bg-white text-gray-400'
                }`}>
                  {step.done ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : step.active ? '●' : '○'}
                </div>
                {i < order.trackingSteps.length - 1 && (
                  <div className={`w-0.5 h-10 ${step.done ? 'bg-[#2d6a4f]' : 'bg-gray-200'}`} />
                )}
              </div>
              <div className="pb-8">
                <div className={`font-medium text-sm ${step.done || step.active ? 'text-[#1b4332]' : 'text-gray-400'}`}>
                  {step.label}
                </div>
                {step.date && (
                  <div className="text-xs text-gray-500 mt-0.5">{step.date}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 p-4 bg-[#f0fdf4] rounded-xl text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Delivery Address</div>
            <div className="text-gray-800 font-medium text-xs leading-relaxed">{order.deliveryAddress}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Estimated Arrival</div>
            <div className="text-[#1b4332] font-semibold text-xs">{order.estimatedDelivery}</div>
            <div className="text-gray-500 text-xs mt-1">Payment: {order.payment}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState<Tab>('All');
  const [trackingOrder, setTrackingOrder] = useState<string | null>(null);

  const filtered = activeTab === 'All'
    ? mockOrders
    : mockOrders.filter(o => o.status === activeTab);

  if (trackingOrder) {
    return (
      <DashboardLayout>
        <div>
          <button
            onClick={() => setTrackingOrder(null)}
            className="flex items-center gap-2 text-sm text-[#2d6a4f] mb-6 hover:text-[#1b4332]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Orders
          </button>
          <h1 className="font-display text-2xl text-[#1b4332] mb-6">Order Tracking</h1>
          <OrderTracking orderId={trackingOrder} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl text-[#1b4332] mb-6">My Orders</h1>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'bg-[#2d6a4f] text-white'
                  : 'text-gray-500 hover:bg-[#f0fdf4]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-500">No {activeTab.toLowerCase()} orders</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="font-mono text-sm font-semibold text-gray-800">#{order.id}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{order.date}</div>
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex gap-3 items-center">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#f0fdf4] shrink-0">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-800 truncate">{item.product.name}</div>
                        <div className="text-xs text-gray-500">×{item.quantity} {item.product.unit} · ₱{item.product.price}/{item.product.unit}</div>
                      </div>
                      <div className="text-sm font-semibold text-gray-800 shrink-0">
                        ₱{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3 pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-gray-500">Total: </span>
                    <span className="font-bold text-[#1b4332]">₱{order.total.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 ml-2">via {order.payment}</span>
                  </div>
                  <div className="flex gap-2">
                    {order.status === 'Delivered' && (
                      <Link
                        to="/dashboard/reviews"
                        className="px-3 py-1.5 text-xs font-medium text-[#2d6a4f] border border-[#2d6a4f] rounded-lg hover:bg-[#f0fdf4]"
                      >
                        Rate Product
                      </Link>
                    )}
                    {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                      <button
                        onClick={() => setTrackingOrder(order.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2d6a4f] rounded-lg hover:bg-[#1b4332]"
                      >
                        Track Order
                      </button>
                    )}
                    {order.status === 'Delivered' && (
                      <button
                        onClick={() => setTrackingOrder(order.id)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#2d6a4f] rounded-lg hover:bg-[#1b4332]"
                      >
                        View Details
                      </button>
                    )}
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
