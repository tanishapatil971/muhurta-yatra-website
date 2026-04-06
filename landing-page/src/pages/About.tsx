import { Award, Users, MapPin, TrendingUp, Heart, Globe } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroRaigad from "@/assets/hero-raigad.jpg";

const timeline = [
  { year: "2010", title: "Founded in Pune", desc: "Started as a small travel desk in Pimpri-Chinchwad with a vision to make travel accessible.", icon: MapPin },
  { year: "2015", title: "First Spiritual Yatra", desc: "Organized our first large-scale Vaishno Devi pilgrimage with 200+ devotees.", icon: Heart },
  { year: "2018", title: "Fort Trek Series", desc: "Launched weekend fort trek packages covering 20+ Sahyadri forts.", icon: TrendingUp },
  { year: "2020", title: "Honeymoon Packages", desc: "Expanded into curated honeymoon experiences across India.", icon: Heart },
  { year: "2023", title: "1000+ Happy Travelers", desc: "Crossed the milestone of 1000 satisfied travelers and growing.", icon: Users },
  { year: "2026", title: "Local Pimpri Tours", desc: "Launched hyperlocal heritage walks and weekend escapes from PCMC.", icon: Globe },
];

const stats = [
  { value: "1000+", label: "Happy Travelers", icon: Users },
  { value: "50+", label: "Destinations", icon: MapPin },
  { value: "15+", label: "Years of Trust", icon: Award },
  { value: "100%", label: "Handcrafted", icon: Heart },
];

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroRaigad} alt="About Muhurta Yatra" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">Our Story</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              From a small desk in Pimpri to crafting 1000+ journeys across India.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl text-center">
          <ScrollReveal>
            <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Mission</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground mb-6">
              Making Travel a Spiritual & Cultural Experience
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At Muhurta Yatra, we believe every journey should be more than just a trip — it should be a transformation. 
              We handcraft each yatra with deep knowledge of Maharashtra's hidden gems, spiritual sites, and cultural treasures. 
              Based in Pimpri-Chinchwad, we combine local expertise with heartfelt hospitality to create unforgettable experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Journey</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">A Legacy of Exploration</h2>
            </div>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-0.5" />

            {timeline.map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={`relative flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Icon dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary flex items-center justify-center z-10 shrink-0 shadow-lg">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  {/* Content */}
                  <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                    <span className="text-primary font-bold text-lg">{item.year}</span>
                    <h3 className="font-heading text-xl font-semibold text-foreground mt-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex flex-col items-center">
                <s.icon className="h-8 w-8 text-primary-foreground/70 mb-2" />
                <div className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{s.value}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Team</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">The People Behind Your Yatra</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: "Rohit Sharma", role: "Founder & CEO", desc: "A passionate traveler who turned his love for Maharashtra into a business." },
              { name: "Anjali Deshmukh", role: "Head of Operations", desc: "Ensures every yatra runs smoothly with meticulous planning." },
              { name: "Vikram Patil", role: "Trek Leader", desc: "Certified mountaineer with 10+ years of Sahyadri trekking experience." },
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card p-6 text-center hover-lift">
                  <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="font-heading text-2xl font-bold text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                  <p className="text-muted-foreground text-sm mt-2">{member.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
