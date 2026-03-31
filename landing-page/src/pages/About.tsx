import ScrollReveal from "@/components/ScrollReveal";
import heroRaigad from "@/assets/hero-raigad.jpg";

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={heroRaigad} alt="About Muhurta Yatra" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">Why Muhurta Yatra</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              A modern platform that helps you plan meaningful trips with clarity, confidence, and less effort.
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
              Better Travel Planning, Built for Real People
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Planning a meaningful trip is often overwhelming - too many options, scattered information, and unclear itineraries.
              Muhurta Yatra solves this with one platform for discovering destinations, organizing plans, and turning ideas into practical journeys.
              Our approach is modern and personalized, so every itinerary matches your interests, pace, and travel goals.
            </p>
          </ScrollReveal>
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
              { name: "Rohit Sharma", role: "Founder & Product Lead", desc: "Focused on building a simple product that helps people plan meaningful trips." },
              { name: "Anjali Deshmukh", role: "Operations Lead", desc: "Works on making itineraries practical, clear, and easy to follow." },
              { name: "Vikram Patil", role: "Experience Curator", desc: "Researches destinations and activities to keep recommendations relevant and useful." },
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
