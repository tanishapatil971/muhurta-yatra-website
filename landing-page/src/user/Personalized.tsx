import React from "react";
import { Star, Sparkles, Wand2, Calendar } from "lucide-react";
import UserLayout from "./UserLayout";

export default function Personalized() {
  return (
    <UserLayout>
       <div className="p-8 lg:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
             <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest pl-1">Personalized Selection</span>
             </div>
            <h2 className="text-3xl font-heading font-black text-foreground tracking-tight">Your Dream Yatras</h2>
            <p className="text-sm text-muted-foreground mt-1">AI-curated recommendations based on your preferences</p>
          </div>

          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-2xl hover:shadow-primary/20 transition-all flex items-center gap-2 group">
             <Wand2 className="w-4 h-4 group-hover:rotate-45 transition-transform" /> Re-generate Plan
          </button>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {[1, 2].map(i => (
             <div key={i} className="group relative bg-card rounded-[3rem] p-1 shadow-shadow-premium overflow-hidden border border-border">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />
                <div className="bg-card rounded-[2.8rem] p-10 h-full relative z-10 border border-transparent">
                   <div className="flex justify-between items-start mb-10">
                      <div className="w-16 h-16 bg-muted rounded-3xl flex items-center justify-center backdrop-blur">
                         <Star className={`w-8 h-8 ${i === 1 ? 'text-amber-500 fill-amber-500' : 'text-primary fill-primary'}`} />
                      </div>
                      <div className="text-right">
                         <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-1">Match Score</span>
                         <span className="text-3xl font-black text-foreground italic">9{i * 4}%</span>
                      </div>
                   </div>

                   <h3 className="text-2xl font-bold text-foreground mb-4">Curated Journey {i}: The Mystic Sahyadris</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed mb-8">Based on your interest in fort trekking and photography, we recommend this 3-day spiritual circuit starting from Mumbai.</p>
                   
                   <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="bg-muted p-4 rounded-3xl">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Duration</span>
                         <span className="text-foreground font-bold flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> 3 Days</span>
                      </div>
                      <div className="bg-muted p-4 rounded-3xl">
                         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1">Vibe</span>
                         <span className="text-foreground font-bold">✨ Spiritual</span>
                      </div>
                   </div>

                   <button className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-primary/90 transition-all shadow-xl shadow-black/10">
                      View Personalized Itinerary
                   </button>
                </div>
             </div>
           ))}
        </div>

        {/* WISHLIST SECTION */}
        <div className="pt-10">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1 mb-6 flex items-center gap-3">
              <Star className="w-4 h-4" /> Save For Later
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none filter blur-[1px]">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-card p-6 rounded-3xl border border-border h-24" />
               ))}
           </div>
        </div>

      </div>
    </UserLayout>
  );
}