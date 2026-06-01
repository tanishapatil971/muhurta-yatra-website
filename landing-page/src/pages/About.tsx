import { Award, Users, MapPin, TrendingUp, Heart, Globe, ShieldCheck, Zap, Sparkles, Eye } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroRaigad from "@/assets/hero-raigad.jpg";
import prajakta from "@/assets/prajakta.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { value: "250+", label: "Happy Travelers", icon: Users },
  { value: "20+", label: "Destinations", icon: MapPin },
  { value: "1st Year", label: "of Excellence", icon: Award },
  { value: "100%", label: "Handcrafted", icon: Heart },
];

const whyChooseUs = [
  {
    title: "The 'Muhurta' Concept",
    desc: "We don't just pick dates; we find the perfect window (Muhurta) for your trip, considering weather, local festivals, and crowd patterns.",
    icon: Sparkles
  },
  {
    title: "Personalized Curation",
    desc: "Every traveler is unique. We move away from generic mass-produced packages to create itineraries that reflect your style and pace.",
    icon: Zap
  },
  {
    title: "Authentic Local Depth",
    desc: "Born and raised in Mumbai, our team explores every spot personally before recommending it. We know the secrets Google doesn't.",
    icon: Eye
  },
  {
    title: "Safety & Transparency",
    desc: "Clear pricing, verified transport, and 24/7 support. We manage the details so you can focus entirely on the experience.",
    icon: ShieldCheck
  }
];

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroRaigad} alt="About Muhurta Yatra" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div className="animate-fade-up">
            <span className="text-white/80 font-bold text-xs tracking-widest uppercase mb-3 block">Est. 2025</span>
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4">
              Our Journey
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Redefining how India travels with a focus on local depth and personal timing.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Subtle background element */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-wide max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <span className="text-primary font-black text-xs tracking-[0.3em] uppercase block mb-3 opacity-80 luxury-text-shadow">The Vision</span>
                <h2 className="font-heading text-4xl md:text-5xl font-black mt-2 text-foreground luxury-text-shadow leading-tight">
                  Fresh Perspectives. <br />Deep Conviction.
                </h2>
                <div className="w-20 h-1.5 bg-primary mt-6 rounded-full opacity-20" />
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Muhurta Yatra was born last year from a simple observation: travel has become too transactional. We wanted to bring back the "Soul" in local exploration.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                As a young startup, we aren't bound by old ways of operating. We leverage modern planning with a traditional heart to ensure your journey is perfectly timed and deeply personal.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12 px-4">
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">The Difference</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Why Muhurta Yatra?</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="clean-card p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                    <item.icon className="w-6 h-6" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Background texture icon */}
        <Globe className="absolute -bottom-10 -left-10 h-64 w-64 text-white/5 rotate-12" />
        
        <div className="container-wide relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4">
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">{s.value}</div>
                <div className="text-white/70 text-sm font-medium tracking-wider uppercase">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Founder Spotlight */}
      <section className="section-padding bg-background relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container-wide">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Photo Column */}
              <ScrollReveal>
                <div className="relative group">
                  <div className="absolute -inset-4 bg-primary/10 rounded-[3rem] rotate-3 transition-transform group-hover:rotate-6 duration-700" />
                  <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-primary/10">
                    <img 
                      src={prajakta} 
                      alt="Prajakta Patil - Founder of Muhurta Yatra" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Heart className="w-5 h-5 fill-current" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Visionary</p>
                        <p className="font-heading font-bold text-foreground">Prajakta Patil</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Story Column */}
              <div className="space-y-8">
                <ScrollReveal delay={200}>
                  <div>
                    <span className="text-primary font-black text-xs tracking-[0.3em] uppercase block mb-3 opacity-80 luxury-text-shadow">The Founder</span>
                    <h2 className="font-heading text-4xl md:text-5xl font-black text-foreground luxury-text-shadow leading-tight mb-2">
                      Prajakta Patil
                    </h2>
                    <p className="text-primary text-sm font-bold tracking-widest uppercase mb-8">Founder & Managing Director</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={400}>
                  <div className="space-y-6">
                    <p className="text-xl text-foreground font-medium leading-relaxed italic border-l-4 border-primary pl-6">
                      "I didn't just build a website; I built a home for the stories that every destination is waiting to tell."
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      As the Founder of Muhurta Yatra, Prajakta Patil leads with a vision to redefine how India travels. An accomplished trekker and influential blogger, she built this platform to bring handcrafted, soul-stirring journeys to fellow explorers.
                    </p>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Under her leadership, every Muhurta Yatra experience is personally curated to ensure it reflects the passion and depth of a true traveler’s heart. When she isn't scale Sahyadri forts or documenting her journeys, Prajakta is hands-on in crafting personalized 'Muhurta' windows for every traveler, ensuring every trip is as unique as the person taking it.
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Ready to start? */}
      <section className="section-padding pt-0 pb-24">
        <div className="container-wide">
          <div className="bg-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/10" />
            <ScrollReveal>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 relative z-10">Start Your Story With Us</h2>
              <p className="text-white/70 max-w-xl mx-auto mb-10 relative z-10">
                You don't need a legacy to find a great adventure. You just need a partner who cares about the journey as much as you do.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/places">Explore Places</Link>
                </Button>
                <Button variant="heroOutline" size="lg" asChild>
                  <Link to="/booking">Book a Call</Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
