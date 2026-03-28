import { Bus, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const routes = [
  { from: "Mumbai", to: "Pune", duration: "3h 30m", price: 499, departures: 120 },
  { from: "Delhi", to: "Chandigarh", duration: "4h 45m", price: 599, departures: 85 },
  { from: "Bangalore", to: "Chennai", duration: "5h 30m", price: 699, departures: 95 },
  { from: "Hyderabad", to: "Vizag", duration: "8h 00m", price: 899, departures: 60 },
  { from: "Ahmedabad", to: "Udaipur", duration: "4h 15m", price: 549, departures: 45 },
  { from: "Kolkata", to: "Siliguri", duration: "10h 00m", price: 999, departures: 40 },
];

const BusRoutes = () => (
  <section id="buses" className="section-padding bg-muted/50">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Popular Bus Routes
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Thousands of daily departures across India's busiest routes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {routes.map((r, i) => (
          <div
            key={`${r.from}-${r.to}`}
            className="glass-card-light rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Bus className="h-5 w-5 text-secondary" />
              </div>
              <div className="flex items-center gap-2 font-semibold text-foreground">
                {r.from} <ArrowRight className="h-4 w-4 text-muted-foreground" /> {r.to}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {r.duration}
              </div>
              <span>{r.departures}+ daily buses</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xl font-bold text-foreground">
                ₹{r.price}
                <span className="text-xs font-normal text-muted-foreground ml-1">onwards</span>
              </div>
              <Button size="sm" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                View Buses
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BusRoutes;
