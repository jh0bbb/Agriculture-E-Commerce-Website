import { useState } from 'react';
import { DashboardLayout } from './Dashboard';

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Juan',
    lastName: 'dela Cruz',
    email: 'juan.delacruz@email.com',
    phone: '+63 917 123 4567',
    province: 'Metro Manila',
    city: 'Quezon City',
    street: '123 Magsaysay St., Brgy. San Jose',
  });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="font-display text-2xl text-[#1b4332] mb-6">My Profile</h1>

        {/* Profile header */}
        <div className="bg-gradient-to-r from-[#1b4332] to-[#2d6a4f] rounded-2xl p-6 mb-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#52b788] flex items-center justify-center text-white text-3xl font-bold border-4 border-white/20">
            JD
          </div>
          <div className="flex-1">
            <h2 className="font-display text-xl text-white">{form.firstName} {form.lastName}</h2>
            <p className="text-[#95d5b2] text-sm">{form.email}</p>
            <p className="text-[#95d5b2] text-xs mt-1">Member since January 2025</p>
          </div>
          <button
            onClick={() => setEditing(v => !v)}
            className="px-4 py-2 bg-white/15 hover:bg-white/25 text-white text-sm font-medium rounded-xl transition-colors"
          >
            {editing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <h3 className="font-semibold text-gray-800 mb-5">Personal Information</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: 'First Name', field: 'firstName' as const },
              { label: 'Last Name', field: 'lastName' as const },
              { label: 'Email Address', field: 'email' as const },
              { label: 'Phone Number', field: 'phone' as const },
              { label: 'Province', field: 'province' as const },
              { label: 'City/Municipality', field: 'city' as const },
            ].map(item => (
              <div key={item.field}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {item.label}
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={form[item.field]}
                    onChange={handleChange(item.field)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                  />
                ) : (
                  <p className="text-sm text-gray-800 py-2.5">{form[item.field]}</p>
                )}
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Street Address
              </label>
              {editing ? (
                <input
                  type="text"
                  value={form.street}
                  onChange={handleChange('street')}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                />
              ) : (
                <p className="text-sm text-gray-800 py-2.5">{form.street}</p>
              )}
            </div>
          </div>

          {editing && (
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-3 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Change password */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-5">Security</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {['Current Password', 'New Password', 'Confirm New Password'].map(label => (
              <div key={label} className={label === 'Confirm New Password' ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 px-6 py-2.5 bg-[#f0fdf4] text-[#2d6a4f] font-semibold text-sm rounded-xl hover:bg-[#d8f3dc] transition-colors border border-[#d8f3dc]">
            Change Password
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
