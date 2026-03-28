import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";
import hotel4 from "@/assets/hotel-4.jpg";
import hotel5 from "@/assets/hotel-5.jpg";
import hotel6 from "@/assets/hotel-6.jpg";

const hotels = [
  { img: hotel1, name: "The Grand Skyview", location: "Mumbai", rating: 4.8, price: 4999, original: 8999 },
  { img: hotel2, name: "Ocean Pearl Resort", location: "Goa", rating: 4.9, price: 6499, original: 11999 },
  { img: hotel3, name: "Urban Boutique Inn", location: "Bangalore", rating: 4.6, price: 3299, original: 5999 },
  { img: hotel4, name: "Alpine Lodge Retreat", location: "Manali", rating: 4.7, price: 5499, original: 9499 },
  { img: hotel5, name: "Heritage Palace Stay", location: "Jaipur", rating: 4.9, price: 7999, original: 14999 },
  { img: hotel6, name: "Coral Bay Resort", location: "Andaman", rating: 4.8, price: 8999, original: 15999 },
];

const HotelsShowcase = () => (
  <section id="hotels" className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Premium Hotel Picks
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Hand-picked stays with unbeatable prices and world-class amenities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((h, i) => (
          <div
            key={h.name}
            className="group glass-card-light rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="relative overflow-hidden h-48">
              <img src={h.img} alt={h.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
                {Math.round((1 - h.price / h.original) * 100)}% OFF
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-semibold text-lg text-foreground">{h.name}</h3>
                <div className="flex items-center gap-1 text-gold">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-sm font-semibold">{h.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                <MapPin className="h-3.5 w-3.5" />
                {h.location}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-foreground">₹{h.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through ml-2">₹{h.original.toLocaleString()}</span>
                  <span className="text-xs text-muted-foreground block">/night</span>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90 btn-primary-glow">
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HotelsShowcase;
