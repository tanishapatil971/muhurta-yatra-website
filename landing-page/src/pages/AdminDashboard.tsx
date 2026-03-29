import { useState } from 'react';
import { Home, Plus, Package, Search, Map, Ticket, IndianRupee, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add-package' | 'manage-packages'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Dummy packages
  const packages = [
    { id: 1, destination: "Manali", price: 12000, maxPeople: 10, transport: "Bus", status: "Active", emoji: "🏔️" },
    { id: 2, destination: "Goa", price: 18000, maxPeople: 8, transport: "Flight", status: "Active", emoji: "🏖️" },
    { id: 3, destination: "Kerala", price: 15000, maxPeople: 12, transport: "Train", status: "Active", emoji: "🌴" },
    { id: 4, destination: "Ladakh", price: 22000, maxPeople: 6, transport: "Flight", status: "Inactive", emoji: "⛰️" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F0E8] font-sans text-[#1A1714]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1714] text-white transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:flex flex-col`}>
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#C75B2A] text-xl">
            ✈️
          </div>
          <div className="font-serif text-lg font-bold leading-tight">
            Travel<br/>
            <span className="block text-[10px] uppercase tracking-widest text-white/50 font-sans mt-0.5">Admin Portal</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 py-3 text-xs font-semibold tracking-widest uppercase text-[#8A7E74]">Main Menu</div>
          <button 
            onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-[#C75B2A] text-white font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          >
            <Home className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => { setActiveTab('add-package'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'add-package' ? 'bg-[#C75B2A] text-white font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          >
            <Plus className="w-5 h-5" /> Add Package
          </button>
          <button 
            onClick={() => { setActiveTab('manage-packages'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'manage-packages' ? 'bg-[#C75B2A] text-white font-medium' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}
          >
            <Package className="w-5 h-5" /> Manage Packages
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FFFCF7] border-b border-[#EDE6D6]">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 bg-[#EDE6D6] rounded-lg" onClick={() => setIsSidebarOpen(true)}>
              ☰
            </button>
            <h1 className="text-xl font-serif font-semibold">
              {activeTab === 'dashboard' && 'Overview'}
              {activeTab === 'add-package' && 'Add Package'}
              {activeTab === 'manage-packages' && 'Manage Packages'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 text-sm font-medium bg-[#EDE6D6] rounded-full text-[#3D3630]">
              🌍 Admin
            </span>
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-[#C75B2A] to-[#E88040]">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">Overview</h2>
                <p className="mt-1 text-sm text-[#8A7E74]">Welcome back — here's what's happening today.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#C75B2A]" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#C75B2A]/10 text-2xl mb-4 text-[#C75B2A]">
                    <Map className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-serif font-semibold">48</div>
                  <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">Total Packages</div>
                  <div className="mt-2 text-xs font-semibold text-green-600">↑ 6 this month</div>
                </div>

                <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#2A7AC7]" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2A7AC7]/10 text-2xl mb-4 text-[#2A7AC7]">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-serif font-semibold">1,284</div>
                  <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">Total Bookings</div>
                  <div className="mt-2 text-xs font-semibold text-green-600">↑ 12% vs last month</div>
                </div>

                <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#27A66C]" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#27A66C]/10 text-2xl mb-4 text-[#27A66C]">
                    <IndianRupee className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-serif font-semibold">₹38.2L</div>
                  <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">Total Revenue</div>
                  <div className="mt-2 text-xs font-semibold text-green-600">↑ 8.4% vs last month</div>
                </div>

                <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#9B59B6]" />
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#9B59B6]/10 text-2xl mb-4 text-[#9B59B6]">
                    <Users className="w-6 h-6" />
                  </div>
                  <div className="text-3xl font-serif font-semibold">3,190</div>
                  <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">Travellers Served</div>
                  <div className="mt-2 text-xs font-semibold text-[#C75B2A]">↓ 2% vs last week</div>
                </div>
              </div>
            </div>
          )}

          {/* ADD PACKAGE TAB */}
          {activeTab === 'add-package' && (
            <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">Add Package</h2>
                <p className="mt-1 text-sm text-[#8A7E74]">Fill in the details below to list a new travel package.</p>
              </div>

              <div className="p-8 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm space-y-8">
                {/* Basic Info */}
                <div>
                  <h3 className="flex items-center gap-2 pb-2 mb-6 text-lg font-serif font-bold border-b-2 border-[#EDE6D6]">
                    <span>📍</span> Basic Information
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">Destination</label>
                      <input type="text" placeholder="e.g. Manali, Himachal Pradesh" className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">Base Price (₹)</label>
                      <input type="number" placeholder="e.g. 12000" className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">Max People</label>
                      <input type="number" placeholder="e.g. 10" className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all" />
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-6 py-3 font-bold tracking-wide text-white uppercase transition-all bg-[#C75B2A] rounded-xl hover:bg-[#B54E22] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(199,91,42,0.3)] hover:shadow-[0_6px_20px_rgba(199,91,42,0.4)] text-sm">
                  ✈️ Add Package
                </button>
              </div>
            </div>
          )}

          {/* MANAGE PACKAGES TAB */}
          {activeTab === 'manage-packages' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">Manage Packages</h2>
                <p className="mt-1 text-sm text-[#8A7E74]">View, edit, or remove existing travel packages.</p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFFCF7] border-[1.5px] border-[#EDE6D6] rounded-xl focus-within:border-[#C75B2A] transition-colors min-w-[280px]">
                  <Search className="w-4 h-4 text-[#8A7E74]" />
                  <input type="text" placeholder="Search destination..." className="w-full bg-transparent outline-none text-[15px]" />
                </div>
                <button 
                  onClick={() => setActiveTab('add-package')}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white transition-all bg-[#C75B2A] rounded-xl shadow-[0_4px_14px_rgba(199,91,42,0.3)] hover:bg-[#B54E22] text-sm"
                >
                  <Plus className="w-4 h-4" /> New Package
                </button>
              </div>

              <div className="bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-[#F5F0E8] text-[11px] uppercase tracking-wider text-[#8A7E74] font-semibold">
                      <th className="px-6 py-4 rounded-tl-2xl">Destination</th>
                      <th className="px-6 py-4">Base Price</th>
                      <th className="px-6 py-4">Max People</th>
                      <th className="px-6 py-4">Transport</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6D6] text-sm text-[#3D3630]">
                    {packages.map(pkg => (
                      <tr key={pkg.id} className="transition-colors hover:bg-[#F5F0E8]/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-lg bg-gradient-to-br from-[#C75B2A] to-[#E88040]">
                              {pkg.emoji}
                            </div>
                            <span className="font-medium text-[#1A1714]">{pkg.destination}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">₹{pkg.price.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4">{pkg.maxPeople} pax</td>
                        <td className="px-6 py-4">{pkg.transport}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full ${pkg.status === 'Active' ? 'bg-[#27A66C]/10 text-[#27A66C]' : 'bg-[#C75B2A]/10 text-[#C75B2A]'}`}>
                            {pkg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="px-3 py-1.5 text-xs font-semibold text-[#2A7AC7] bg-[#2A7AC7]/10 rounded-lg hover:bg-[#2A7AC7] hover:text-white transition-colors">
                              Edit
                            </button>
                            <button className="px-3 py-1.5 text-xs font-semibold text-[#C75B2A] bg-[#C75B2A]/10 rounded-lg hover:bg-[#C75B2A] hover:text-white transition-colors">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
