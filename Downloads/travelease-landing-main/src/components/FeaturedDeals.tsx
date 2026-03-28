import { useState } from "react";
import { Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";

const hotelDeals = [
  { img: hotel1, title: "Skyview Suite — 45% Off", location: "Mumbai", price: 4999, urgency: "Only 2 rooms left!", timer: "2h 15m" },
  { img: hotel2, title: "Beach Paradise — 40% Off", location: "Goa", price: 5999, urgency: "Selling fast!", timer: "4h 30m" },
  { img: hotel3, title: "City Escape — 35% Off", location: "Delhi", price: 3499, urgency: "Limited time!", timer: "1h 45m" },
];

const busDeals = [
  { title: "Mumbai → Pune AC Sleeper", price: 399, urgency: "Only 3 seats left!", timer: "3h 00m", operator: "VRL Travels" },
  { title: "Delhi → Jaipur Volvo", price: 549, urgency: "5 seats left!", timer: "5h 10m", operator: "RedBus Select" },
  { title: "Bangalore → Hyderabad", price: 699, urgency: "Flash deal!", timer: "2h 45m", operator: "SRS Travels" },
];

const FeaturedDeals = () => {
  const [tab, setTab] = useState<"hotels" | "buses">("hotels");

  return (
    <section id="deals" className="section-padding bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            <Flame className="inline h-8 w-8 text-primary mr-2" />
            Featured Deals
          </h2>
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {(["hotels", "buses"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                tab === t
                  ? "bg-primary text-primary-foreground btn-primary-glow"
                  : "bg-card text-muted-foreground hover:bg-muted"
              }`}
            >
              {t === "hotels" ? "Hotels" : "Buses"}
            </button>
          ))}
        </div>

        {tab === "hotels" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {hotelDeals.map((d) => (
              <div key={d.title} className="glass-card-light rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300">
                <div className="relative h-40">
                  <img src={d.img} alt={d.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute bottom-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {d.timer}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground">{d.title}</h3>
                  <p className="text-sm text-muted-foreground">{d.location}</p>
                  <p className="text-xs text-primary font-semibold mt-1">{d.urgency}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xl font-bold text-foreground">₹{d.price.toLocaleString()}</span>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">Grab Deal</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {busDeals.map((d) => (
              <div key={d.title} className="glass-card-light rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300">
                <h3 className="font-display font-semibold text-foreground mb-1">{d.title}</h3>
                <p className="text-sm text-muted-foreground">{d.operator}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-primary font-semibold">{d.urgency}</span>
                  <span className="text-xs text-destructive flex items-center gap-1"><Clock className="h-3 w-3" />{d.timer}</span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-foreground">₹{d.price}</span>
                  <Button size="sm" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDeals;
