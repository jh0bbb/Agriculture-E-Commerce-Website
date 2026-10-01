import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#f0fdf4] py-16 border-b border-[#d8f3dc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl text-[#1b4332] mb-4">Contact Us</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have questions about our products or platform? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-[#1b4332] mb-6">Send a Message</h2>

            {submitted ? (
              <div className="bg-[#f0fdf4] rounded-2xl border border-[#d8f3dc] p-10 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-semibold text-[#1b4332] text-lg mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-4">We've received your message and will get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                  className="px-5 py-2.5 bg-[#2d6a4f] text-white text-sm font-semibold rounded-xl hover:bg-[#1b4332]"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Name', field: 'name' as const, type: 'text', placeholder: 'Your full name' },
                    { label: 'Email', field: 'email' as const, type: 'email', placeholder: 'your@email.com' },
                    { label: 'Phone', field: 'phone' as const, type: 'tel', placeholder: '+63 9XX XXX XXXX' },
                    { label: 'Subject', field: 'subject' as const, type: 'text', placeholder: 'How can we help?' },
                  ].map(f => (
                    <div key={f.field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{f.label}</label>
                      <input
                        type={f.type}
                        value={form[f.field]}
                        onChange={handleChange(f.field)}
                        placeholder={f.placeholder}
                        required={f.field === 'name' || f.field === 'email'}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788]"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Tell us how we can help you..."
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#52b788] resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#2d6a4f] text-white font-semibold rounded-xl hover:bg-[#1b4332] transition-colors"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Contact info */}
          <div>
            <h2 className="font-display text-2xl text-[#1b4332] mb-6">Get in Touch</h2>

            <div className="space-y-4 mb-8">
              {[
                { icon: '📞', label: 'Phone', value: '+63 (02) 8123-4567', sub: 'Mon–Fri, 8am–6pm' },
                { icon: '📧', label: 'Email', value: 'hello@agrisales.ph', sub: 'We respond within 24 hours' },
                { icon: '📍', label: 'Address', value: '5F Agri Tower, Elliptical Road', sub: 'Quezon City, Metro Manila 1101' },
                { icon: '⏰', label: 'Business Hours', value: 'Monday to Saturday', sub: '8:00 AM – 6:00 PM' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 p-4 bg-[#f0fdf4] rounded-xl border border-[#d8f3dc]">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#d8f3dc] flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium text-gray-800 mt-0.5">{item.value}</div>
                    <div className="text-xs text-gray-500">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', color: 'bg-blue-100 text-blue-700', icon: 'f' },
                  { name: 'Instagram', color: 'bg-pink-100 text-pink-700', icon: '▣' },
                  { name: 'Twitter', color: 'bg-sky-100 text-sky-700', icon: '𝕏' },
                  { name: 'YouTube', color: 'bg-red-100 text-red-700', icon: '▶' },
                ].map(s => (
                  <button
                    key={s.name}
                    className={`w-11 h-11 rounded-xl ${s.color} flex items-center justify-center font-bold text-lg hover:opacity-80 transition-opacity`}
                    aria-label={s.name}
                  >
                    {s.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-6 bg-[#fefae0] rounded-2xl p-5 border border-amber-100">
              <h3 className="font-semibold text-gray-800 mb-3">Frequently Asked</h3>
              <div className="space-y-2 text-sm">
                {[
                  'How long does delivery take?',
                  'Can I cancel or modify my order?',
                  'What if my product arrives damaged?',
                ].map(q => (
                  <div key={q} className="flex items-start gap-2 text-gray-600">
                    <span className="text-[#2d6a4f] font-bold shrink-0">Q:</span>
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
