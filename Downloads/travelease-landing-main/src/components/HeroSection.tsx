import { useState } from "react";
import { Search, Hotel, Bus, Shield, Headphones, CalendarDays, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-cityscape.jpg";

const HeroSection = () => {
  const [tab, setTab] = useState<"hotels" | "buses">("hotels");

  return (
    <>
      {/* Hero with background - only headline */}
      <section className="relative flex items-center justify-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="Cityscape skyline at night" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 hero-gradient opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/90 via-transparent to-deep-purple/60" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center opacity-0 animate-fade-in">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-4" style={{ color: "white" }}>
              Book Hotels & Buses Effortlessly —{" "}
              <span className="text-gradient-gold">Save Up to 50%</span> Today!
            </h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto" style={{ color: "hsla(0,0%,100%,0.8)" }}>
              Millions trust TravelEase for seamless stays and rides.
            </p>
          </div>
        </div>
      </section>

      {/* Search Card - below hero */}
      <section className="relative z-10 -mt-8 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <div className="bg-card rounded-2xl shadow-xl border border-border p-1">
              {/* Tabs */}
              <div className="flex">
                {(["hotels", "buses"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all ${
                      tab === t
                        ? "bg-primary text-primary-foreground btn-primary-glow"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t === "hotels" ? <Hotel className="h-4 w-4" /> : <Bus className="h-4 w-4" />}
                    {t === "hotels" ? "Hotels" : "Buses"}
                  </button>
                ))}
              </div>

              {/* Search Fields */}
              <div className="p-4 md:p-6">
                {tab === "hotels" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <SearchField icon={<MapPin className="h-4 w-4" />} label="Destination" placeholder="Where are you going?" />
                    <SearchField icon={<CalendarDays className="h-4 w-4" />} label="Check-in" placeholder="Add date" type="date" />
                    <SearchField icon={<CalendarDays className="h-4 w-4" />} label="Check-out" placeholder="Add date" type="date" />
                    <SearchField icon={<Users className="h-4 w-4" />} label="Guests / Rooms" placeholder="2 Adults, 1 Room" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <SearchField icon={<MapPin className="h-4 w-4" />} label="From" placeholder="Departure city" />
                    <SearchField icon={<MapPin className="h-4 w-4" />} label="To" placeholder="Arrival city" />
                    <SearchField icon={<CalendarDays className="h-4 w-4" />} label="Departure" placeholder="Add date" type="date" />
                    <SearchField icon={<Bus className="h-4 w-4" />} label="Seat Type" placeholder="AC / Sleeper" />
                  </div>
                )}

                <Button className="w-full mt-4 bg-primary hover:bg-primary/90 btn-primary-glow text-lg py-6 font-semibold gap-2 animate-pulse-glow">
                  <Search className="h-5 w-5" />
                  Search Now
                </Button>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            {[
              { icon: <Shield className="h-5 w-5" />, text: "Secure Payments" },
              { icon: <Headphones className="h-5 w-5" />, text: "24/7 Support" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 rounded-full px-5 py-2 bg-muted text-muted-foreground border border-border">
                {b.icon}
                <span className="text-sm font-medium">{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const SearchField = ({ icon, label, placeholder, type = "text" }: { icon: React.ReactNode; label: string; placeholder: string; type?: string }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs font-medium text-muted-foreground">{label}</label>
    <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 bg-muted border border-border">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground/50"
      />
    </div>
  </div>
);

export default HeroSection;
