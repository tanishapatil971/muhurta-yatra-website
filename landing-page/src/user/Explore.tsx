import { useState, useEffect, useMemo } from "react";
import { Compass, Filter, Grid, List as ListIcon, MapPin, ArrowRight } from "lucide-react";
import UserLayout from "./UserLayout";
import { API_ENDPOINTS } from "../config/api";

interface Package {
  _id: string;
  name: string;
  img: string;
  desc: string;
  categoryKey: string;
  pricePerPerson: number;
  bestTime: string;
}

export default function Explore() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.places);
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const filteredPackages = useMemo(() => {
    if (selectedCategory === "All") return packages;
    return packages.filter(p => p.categoryKey.toLowerCase() === selectedCategory.toLowerCase());
  }, [packages, selectedCategory]);

  const categories = ["All", "Pilgrim", "Beaches", "Forts", "Hills", "Cultural"];

  return (
    <UserLayout>
       <div className="p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-heading font-black text-foreground tracking-tight">Handcrafted Trails</h2>
            <p className="text-sm text-muted-foreground mt-1">Discover spiritual, cultural, and adventure yatras</p>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl text-sm font-bold text-muted-foreground hover:bg-muted transition-all">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="flex bg-card border border-border rounded-xl p-1">
               <button className="p-1.5 bg-primary text-primary-foreground rounded-lg shadow-sm shadow-primary/20"><Grid className="w-4 h-4" /></button>
               <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors"><ListIcon className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${selectedCategory === cat ? "bg-foreground text-background shadow-lg" : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-[2.5rem]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => (
              <div key={pkg._id} className="group clean-card p-0 rounded-[2.5rem] border border-border shadow-sm overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="h-48 relative overflow-hidden bg-muted">
                    <img 
                      src={pkg.img} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop`;
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-background/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-sm">
                      {pkg.categoryKey}
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{pkg.bestTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">{pkg.desc}</p>
                    
                    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                        <div>
                          <span className="text-xs text-muted-foreground font-bold block uppercase tracking-tighter">Starts From</span>
                          <span className="text-lg font-black text-foreground">₹{pkg.pricePerPerson.toLocaleString('en-IN')}</span>
                        </div>
                        <button 
                          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all shadow-sm"
                        >
                           <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                  </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && filteredPackages.length === 0 && (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl">
            <Compass className="w-16 h-16 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 dark:text-slate-400 font-bold">No packages found in this category.</p>
          </div>
        )}

      </div>
    </UserLayout>
  );
}