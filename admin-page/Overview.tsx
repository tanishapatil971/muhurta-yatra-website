import { Map, Ticket, IndianRupee, Users } from "lucide-react";

export default function Overview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">
          Overview
        </h2>
        <p className="mt-1 text-sm text-[#8A7E74]">
          Welcome back — here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#C75B2A]" />
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#C75B2A]/10 text-2xl mb-4 text-[#C75B2A]">
            <Map className="w-6 h-6" />
          </div>
          <div className="text-3xl font-serif font-semibold">48</div>
          <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">
            Total Packages
          </div>
          <div className="mt-2 text-xs font-semibold text-green-600">
            ↑ 6 this month
          </div>
        </div>

        <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#2A7AC7]" />
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#2A7AC7]/10 text-2xl mb-4 text-[#2A7AC7]">
            <Ticket className="w-6 h-6" />
          </div>
          <div className="text-3xl font-serif font-semibold">1,284</div>
          <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">
            Total Bookings
          </div>
          <div className="mt-2 text-xs font-semibold text-green-600">
            ↑ 12% vs last month
          </div>
        </div>

        <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#27A66C]" />
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#27A66C]/10 text-2xl mb-4 text-[#27A66C]">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div className="text-3xl font-serif font-semibold">₹38.2L</div>
          <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">
            Total Revenue
          </div>
          <div className="mt-2 text-xs font-semibold text-green-600">
            ↑ 8.4% vs last month
          </div>
        </div>

        <div className="relative p-6 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#9B59B6]" />
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#9B59B6]/10 text-2xl mb-4 text-[#9B59B6]">
            <Users className="w-6 h-6" />
          </div>
          <div className="text-3xl font-serif font-semibold">3,190</div>
          <div className="text-xs font-bold tracking-wider text-[#8A7E74] uppercase mt-1">
            Travellers Served
          </div>
          <div className="mt-2 text-xs font-semibold text-[#C75B2A]">
            ↓ 2% vs last week
          </div>
        </div>
      </div>
    </div>
  );
}
