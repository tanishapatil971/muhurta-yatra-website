import { Link } from "react-router-dom";
import { Search, Map as MapIcon, Calendar, ArrowRight } from "lucide-react";
import UserLayout from "./UserLayout";

export default function MyTrips() {
  return (
    <UserLayout>
       <div className="p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-heading font-black text-foreground tracking-tight">My Bookings</h2>
            <p className="text-sm text-muted-foreground mt-1">Manage your upcoming and past yatras</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="pl-10 pr-4 py-2 bg-background border border-border rounded-xl text-sm focus:ring-4 focus:ring-primary/10 transition-all outline-none w-64 text-foreground"
              />
            </div>
          </div>
        </div>

        {/* EMPTY STATE (Since real data is fetched later) */}
        <div className="clean-card p-16 text-center max-w-2xl mx-auto flex flex-col items-center rounded-[2.5rem]">
          <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-6">
            <MapIcon className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-8 leading-relaxed">It looks like you haven't booked any yatras yet. Start exploring our handcrafted packages to begin your journey.</p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/places"
              className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              Explore Packages <ArrowRight className="w-4 h-4" />
            </Link>
            <button className="bg-card border border-border text-foreground px-8 py-3 rounded-xl font-bold hover:bg-muted transition-all">
              Track Offline Booking
            </button>
          </div>
        </div>

        {/* PLACEHOLDER FOR COMPLETED TRIPS */}
        <div className="pt-10">
           <div className="flex items-center gap-3 mb-6 px-1">
             <Calendar className="w-5 h-5 text-slate-400" />
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">History</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-40 grayscale pointer-events-none">
              {[1, 2].map(i => (
                <div key={i} className="bg-card p-6 rounded-3xl border border-border shadow-sm">
                   <div className="h-32 bg-muted rounded-2xl mb-4" />
                   <div className="h-4 w-32 bg-muted-foreground/30 rounded-full mb-2" />
                   <div className="h-3 w-48 bg-muted rounded-full" />
                </div>
              ))}
           </div>
        </div>

      </div>
    </UserLayout>
  );
}