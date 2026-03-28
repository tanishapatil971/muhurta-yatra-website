import { BadgeCheck, Zap, Headphones, RotateCcw } from "lucide-react";

const features = [
  { icon: <BadgeCheck className="h-8 w-8" />, title: "Best Prices Guaranteed", desc: "We match or beat any competitor's price — always." },
  { icon: <Zap className="h-8 w-8" />, title: "Instant Confirmations", desc: "Get your booking confirmed in seconds, not hours." },
  { icon: <Headphones className="h-8 w-8" />, title: "24/7 Customer Care", desc: "Our support team is here for you around the clock." },
  { icon: <RotateCcw className="h-8 w-8" />, title: "Easy Cancellations", desc: "Plans changed? Cancel hassle-free with full refunds." },
];

const WhyChooseUs = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Why Choose TravelEase?
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Built for travelers who value reliability, speed, and value.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="text-center p-6 rounded-2xl glass-card-light hover:scale-105 transition-all duration-300 opacity-0 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
              {f.icon}
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
