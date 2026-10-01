export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-[#1b4332] py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1728895604559-a4e16081504e?w=1440&h=600&fit=crop&auto=format')] bg-cover bg-center opacity-10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🌾</div>
          <h1 className="font-display text-4xl sm:text-5xl text-white mb-4">About AgriSales</h1>
          <p className="text-[#95d5b2] text-lg max-w-2xl mx-auto leading-relaxed">
            We connect customers with agricultural products from local farmers and suppliers, making fresh, quality produce accessible to everyone.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#52b788] font-semibold text-sm uppercase tracking-wider mb-3">Our Story</p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1b4332] mb-5">
              Bridging Farmers and Customers Since 2022
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                AgriSales was founded in 2022 with a simple but powerful idea: Filipino farmers deserve better access to markets, and Filipino consumers deserve better access to fresh, locally-grown food.
              </p>
              <p>
                We saw that the agricultural supply chain had too many intermediaries — reducing the farmer's earnings while increasing the price customers paid. By building a direct digital marketplace, we eliminate that friction.
              </p>
              <p>
                Today, AgriSales connects over 380 farmers from across the Philippines with thousands of customers in cities and towns nationwide.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden h-56 bg-[#2d6a4f]">
              <img src="https://images.unsplash.com/photo-1743585497049-7f7cd13daf78?w=400&h=400&fit=crop&auto=format" alt="Farmer" className="w-full h-full object-cover object-top" />
            </div>
            <div className="rounded-2xl overflow-hidden h-56 bg-[#2d6a4f] mt-6">
              <img src="https://images.unsplash.com/photo-1591586116988-62fe65164f8d?w=400&h=400&fit=crop&auto=format" alt="Fresh vegetables" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-[#fefae0] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#d8f3dc]">
              <div className="w-12 h-12 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-2xl mb-5">🎯</div>
              <h3 className="font-display text-2xl text-[#1b4332] mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                "To make agricultural products easier to discover, purchase, and sell — empowering local farmers with digital tools and connecting them directly with customers who value fresh, quality produce."
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-[#d8f3dc]">
              <div className="w-12 h-12 rounded-xl bg-[#d8f3dc] flex items-center justify-center text-2xl mb-5">🔭</div>
              <h3 className="font-display text-2xl text-[#1b4332] mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                "To create a connected digital marketplace for farmers, suppliers, and customers — where every Filipino has access to fresh, affordable, locally-grown food, and every farmer can access a fair, transparent market."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#52b788] font-semibold text-sm uppercase tracking-wider mb-2">Impact</p>
          <h2 className="font-display text-3xl text-[#1b4332]">Growing Together</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { value: '380+', label: 'Registered Farmers', icon: '👨‍🌾' },
            { value: '2,400+', label: 'Products Listed', icon: '🌾' },
            { value: '18,000+', label: 'Happy Customers', icon: '😊' },
            { value: '76 Provinces', label: 'Coverage', icon: '🇵🇭' },
          ].map(stat => (
            <div key={stat.label} className="text-center p-6 bg-[#f0fdf4] rounded-2xl border border-[#d8f3dc]">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="font-display text-3xl text-[#1b4332] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1b4332] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-white mb-3">Our Values</h2>
            <p className="text-[#95d5b2] max-w-xl mx-auto">The principles that guide everything we do at AgriSales</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌱', title: 'Sustainability', desc: 'We promote sustainable farming practices that protect the land for future generations.' },
              { icon: '🤝', title: 'Fair Trade', desc: 'We ensure farmers receive fair prices for their hard work and dedication.' },
              { icon: '🔍', title: 'Transparency', desc: 'Customers know exactly where their food comes from and who grew it.' },
              { icon: '💚', title: 'Community', desc: 'We build lasting relationships between farmers, suppliers, and customers.' },
              { icon: '🌾', title: 'Quality', desc: 'Every product on our platform meets strict quality and freshness standards.' },
              { icon: '🚀', title: 'Innovation', desc: 'We constantly improve our technology to serve farmers and customers better.' },
            ].map(v => (
              <div key={v.title} className="bg-[#2d6a4f]/50 rounded-2xl p-5">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h4 className="font-semibold text-white mb-2">{v.title}</h4>
                <p className="text-[#95d5b2] text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
