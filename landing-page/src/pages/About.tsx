import { Award, Users, MapPin, TrendingUp, Heart, Globe, ShieldCheck, Zap, Sparkles, Eye } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroRaigad from "@/assets/hero-raigad.jpg";
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
            <span className="text-primary-foreground/70 font-semibold text-sm tracking-[0.3em] uppercase mb-4 block">Est. 2025</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground mb-4">
              Our New Chapter
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              We are a young team of enthusiasts on a mission to redefine how India travels.
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
                <span className="text-primary font-semibold text-sm tracking-widest uppercase">The Vision</span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground mb-6">
                  Fresh Perspective, <br />Deep Roots.
                </h2>
                <div className="w-16 h-1 bg-primary mb-8" />
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
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16 px-4">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">The Difference</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Why Muhurta Yatra?</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-background border border-border/50 p-8 rounded-2xl hover-lift h-full transition-all hover:border-primary/20">
                  <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-primary" />
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

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">The Team</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Guided by Passion</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                We are a small, dedicated group of explorers who believe in the power of meaningful travel.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Rohit Sharma", role: "Co-Founder", desc: "Digital nomad and history buff who envisioned a more personal way to see India." },
              { name: "Anjali Deshmukh", role: "Head of Curation", desc: "Expert on regional cuisines and spiritual history of the Sahyadri range." },
              { name: "Vikram Patil Pat", role: "Logistics Lead", desc: "Ensures safety and comfort are never compromised, no matter how remote the trail." },
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="group glass-card p-8 text-center hover-lift relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  
                  <div className="w-24 h-24 rounded-full bg-primary/5 mx-auto mb-6 flex items-center justify-center ring-1 ring-primary/10 group-hover:bg-primary group-hover:ring-primary transition-all duration-300">
                    <span className="font-heading text-3xl font-bold text-primary group-hover:text-white transition-colors">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-bold tracking-widest uppercase mb-4">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.desc}</p>
                </div>
              </ScrollReveal>
            ))}
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
                <Button variant="outline" className="text-white hover:text-secondary border-white/20" size="lg" asChild>
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
