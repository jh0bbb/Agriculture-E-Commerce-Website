import { useState } from 'react';
import { DashboardLayout } from './Dashboard';
import { notifications as mockNotifications } from '../data/mockData';

export default function Notifications() {
  const [notifs, setNotifs] = useState(mockNotifications);

  const markAllRead = () =>
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  const markRead = (id: string) =>
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));

  const unreadCount = notifs.filter(n => !n.read).length;

  const bgColor = (type: string) => ({
    order: 'bg-blue-50',
    delivery: 'bg-[#f0fdf4]',
    wishlist: 'bg-amber-50',
    sale: 'bg-purple-50',
  }[type] ?? 'bg-gray-50');

  return (
    <DashboardLayout>
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl text-[#1b4332]">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="text-sm font-medium text-[#2d6a4f] hover:text-[#1b4332]"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map(notif => (
            <div
              key={notif.id}
              onClick={() => markRead(notif.id)}
              className={`flex gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white border-gray-100 hover:border-gray-200'
                  : `${bgColor(notif.type)} border-transparent`
              }`}
            >
              <div className="w-11 h-11 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-xl shrink-0 shadow-sm">
                {notif.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-800 font-medium'}`}>
                  {notif.message}
                </p>
                <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
              </div>
              {!notif.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-[#2d6a4f] mt-1.5 shrink-0" />
              )}
            </div>
          ))}
        </div>

        {notifs.every(n => n.read) && (
          <div className="text-center py-8 text-gray-400 text-sm">
            You're all caught up! ✓
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
