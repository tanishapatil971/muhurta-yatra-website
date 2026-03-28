import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", role: "Frequent Traveler", quote: "TravelEase made my Goa trip absolutely seamless. The hotel deals were unbeatable and check-in was instant!", rating: 5 },
  { name: "Rahul Verma", role: "Business Traveler", quote: "I use TravelEase for all my Mumbai-Pune bus trips. Always on time, great prices, and the AC sleeper buses are top-notch.", rating: 5 },
  { name: "Anita Desai", role: "Family Vacationer", quote: "Booked a family package — hotel + bus — and saved over ₹8,000. Customer support was incredibly helpful!", rating: 5 },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            What Travelers Say
          </h2>
        </div>

        <div className="glass-card-light rounded-3xl p-8 md:p-12 text-center relative">
          <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
          <p className="text-lg md:text-xl text-foreground/90 font-medium leading-relaxed mb-6 italic">
            "{t.quote}"
          </p>
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: t.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <p className="font-display font-semibold text-foreground">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>

          <div className="flex justify-center gap-3 mt-6">
            <button onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setIdx((idx + 1) % testimonials.length)} className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === idx ? "bg-primary w-6" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
