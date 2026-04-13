import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Compass, 
  Map, 
  Star, 
  MapPin, 
  TrendingUp,
  Heart,
  ChevronRight
} from "lucide-react";
import UserLayout from "./UserLayout";
import { API_ENDPOINTS } from "../config/api";

interface SimplePackage {
  _id: string;
  destination?: string;
  name?: string;
}

export default function Dashboard() {
  const [trending, setTrending] = useState<SimplePackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.packages);
        const data = await res.json();
        setTrending(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch trending packages", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);
  return (
    <UserLayout>
      <div className="p-10 max-w-6xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* STATS STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: "Booked Trips", val: "0", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Points Earned", val: "250", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
            { label: "Wishlist", val: "4", icon: Heart, color: "text-rose-600", bg: "bg-rose-50" },
          ].map((stat, i) => (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 hover:shadow-md transition-shadow cursor-default group">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                 <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LARGE ACTIONS */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/explore" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <Compass className="w-10 h-10 text-primary mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Explore New Places</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Discover handcrafted spiritual and cultural trails across India.</p>
              </Link>

              <Link to="/my-trips" className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <Map className="w-10 h-10 text-secondary mb-6 group-hover:rotate-12 transition-transform" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">My Itineraries</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Access your downloaded PDFs and upcoming journey details.</p>
              </Link>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl text-white relative overflow-hidden group shadow-2xl shadow-slate-900/20 border border-white/5">
               <div className="relative z-10">
                 <h3 className="text-2xl font-bold mb-2">Ready for a custom yatra?</h3>
                 <p className="text-slate-300 text-sm mb-6 max-w-md">Our experts can curate a personalized spiritual or honeymoon package just for you.</p>
                 <Link to="/personalized" className="inline-flex items-center gap-2 bg-primary px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all hover:gap-3">
                    Begin Personalization <Star className="w-4 h-4 fill-white" />
                 </Link>
               </div>
               <Compass className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5 group-hover:rotate-45 transition-transform duration-1000" />
            </div>
          </div>

          {/* SIDEBAR NEWS/ALERTS */}
          <div className="space-y-6">
             <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] px-1 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Trending Now
             </h2>
             <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group/sidebar">
                <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                   <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Latest Handcrafted Yatras</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {loading ? (
                    [1, 2, 3].map(i => (
                      <div key={i} className="p-4 animate-pulse">
                        <div className="w-full h-12 bg-slate-100 rounded-2xl" />
                      </div>
                    ))
                  ) : trending.length > 0 ? (
                    trending.map((pkg, i) => (
                      <Link 
                        key={pkg._id} 
                        to="/explore"
                        className="p-5 hover:bg-slate-50 transition-all flex items-center gap-4 cursor-pointer group/item"
                      >
                         <div className="w-12 h-12 rounded-2xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-400 group-hover/item:bg-primary group-hover/item:text-white transition-all transform group-hover/item:scale-110">
                            <MapPin className="w-5 h-5" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <span className="text-sm font-bold text-slate-700 group-hover/item:text-primary transition-colors truncate block">{pkg.destination || pkg.name}</span>
                            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">View Details</span>
                         </div>
                         <ChevronRight className="w-4 h-4 text-slate-300 transform group-hover/item:translate-x-1 transition-transform" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-10 text-center">
                       <p className="text-xs text-slate-400 italic">No packages found.</p>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-slate-50/50 text-center border-t border-slate-50">
                   <Link to="/explore" className="text-[10px] font-black text-primary hover:text-primary/80 uppercase tracking-[0.2em] transition-all">Explore All Packages</Link>
                </div>
             </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}