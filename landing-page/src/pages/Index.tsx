import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Compass, Heart, Mountain, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import heroPawna from "@/assets/hero-pawna.jpg";
import heroRaigad from "@/assets/hero-raigad.jpg";
import beachImg from "@/assets/beach-harihareshwar.jpg";
import fortImg from "@/assets/fort-lohagad.jpg";
import pilgrimImg from "@/assets/pilgrim-temple.jpg";

const heroSlides = [
  { img: heroSinhagad, title: "Handcrafted Journeys Across India", sub: "Discover Spiritual, Adventure & Cultural Escapes from Pimpri" },
  { img: heroPawna, title: "Serene Lakes & Hill Retreats", sub: "Escape to Nature's Finest Near Pune" },
  { img: heroRaigad, title: "Walk the Forts of Legends", sub: "Experience the Maratha Heritage Trail" },
];

const services = [
  { icon: Compass, title: "Spiritual Tours", desc: "Sacred pilgrimages to temples, jyotirlingas & spiritual retreats across Maharashtra and India.", color: "bg-primary" },
  { icon: Heart, title: "Honeymoon Packages", desc: "Romantic getaways to hill stations, beaches & exotic destinations for newlyweds.", color: "bg-sunset" },
  { icon: Mountain, title: "Hill Station Retreats", desc: "Cool escapes to Lonavala, Mahabaleshwar, Matheran & the Sahyadri ranges.", color: "bg-secondary" },
  { icon: Shield, title: "Fort Treks", desc: "Guided treks to iconic Maratha forts – Sinhagad, Raigad, Lohagad & more.", color: "bg-accent" },
];

const testimonials = [
  { name: "Priya Kulkarni", text: "The Vaishno Devi yatra organized by Muhurta Yatra was life-changing. Every detail was perfectly managed.", location: "Pimpri" },
  { name: "Rajesh Patil", text: "Our honeymoon to Goa was magical! Muhurta Yatra made it stress-free and unforgettable.", location: "Chinchwad" },
  { name: "Sneha Deshmukh", text: "The Sinhagad trek with my family was amazing. Great guides, great food, great memories!", location: "Pune" },
  { name: "Amit Joshi", text: "Best travel agency in PCMC. They planned our Konkan beach trip perfectly. Highly recommend!", location: "Nigdi" },
];

const destinations = [
  { img: heroSinhagad, title: "Forts", desc: "Maratha heritage trails", to: "/places/forts" },
  { img: fortImg, title: "Hill Stations", desc: "Cool Sahyadri retreats", to: "/places/hills" },
  { img: beachImg, title: "Beaches", desc: "Konkan coastal escapes", to: "/places/beaches" },
  { img: pilgrimImg, title: "Pilgrim Sites", desc: "Sacred spiritual journeys", to: "/places/pilgrim" },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [message, setMessage] = useState("");

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="relative h-screen overflow-hidden" aria-label="Hero slideshow">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-up max-w-4xl text-balance">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-primary-foreground/80 text-base md:text-lg max-w-2xl mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
            {heroSlides[currentSlide].sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
            <Button variant="hero" size="lg" asChild>
              <Link to="/plan">Start Planning</Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/places">Explore Destinations</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href="tel:+919876543210">Book Your Yatra</a>
            </Button>
            <Button variant="hero" size="lg" className="bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)]" asChild>
              <a href="https://wa.me/919876543210?text=Hi%20Muhurta%20Yatra!%20I%27d%20like%20to%20know%20more%20about%20your%20tours." target="_blank" rel="noopener noreferrer">
                💬 Chat on WhatsApp
              </a>
            </Button>
          </div>
          {/* Slide indicators */}
          <div className="flex gap-2 mt-8">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-primary w-8" : "bg-primary-foreground/40"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground animate-bounce-arrow"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">What We Offer</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Our Signature Experiences</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                From sacred pilgrimages to romantic getaways, we craft every journey with love and local expertise.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="glass-card p-6 text-center hover-lift group cursor-pointer h-full">
                  <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <s.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Top Picks</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Featured Destinations</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((d, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <Link to={d.to} className="group block rounded-2xl overflow-hidden hover-lift relative aspect-[3/4]">
                  <img src={d.img} alt={d.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-2xl font-bold text-primary-foreground">{d.title}</h3>
                    <p className="text-primary-foreground/70 text-sm mt-1">{d.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-secondary">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "1000+", label: "Happy Travelers" },
            { num: "50+", label: "Destinations" },
            { num: "15+", label: "Years Experience" },
            { num: "100%", label: "Satisfaction" },
          ].map((s, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div>
                <div className="font-heading text-3xl md:text-4xl font-bold text-secondary-foreground">{s.num}</div>
                <div className="text-secondary-foreground/70 text-sm mt-1">{s.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Voices of Joy</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">What Our Travelers Say</h2>
            </div>
          </ScrollReveal>
          <div className="max-w-2xl mx-auto text-center relative min-h-[180px]">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-500 ${i === testimonialIdx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
              >
                <div className="glass-card p-8">
                  <p className="text-foreground text-lg italic leading-relaxed mb-4">"{t.text}"</p>
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-muted-foreground text-sm">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonialIdx(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-6" : "bg-border"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section-padding bg-muted/50" id="contact">
        <div className="container-wide max-w-2xl">
          <ScrollReveal>
            <div className="text-center mb-8">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Get In Touch</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Plan Your Yatra</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <form className="glass-card p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Your name" />
                <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Phone number" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Email" />
              <select className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Tour type">
                <option>Select Tour Type</option>
                <option>Spiritual Tour</option>
                <option>Honeymoon Package</option>
                <option>Fort Trek</option>
                <option>Hill Station Retreat</option>
                <option>Beach Getaway</option>
                <option>Custom Yatra</option>
              </select>
              <div className="relative">
                <textarea placeholder="Tell us about your dream trip..." rows={4} maxLength={2000} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none" aria-label="Message" />
                <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">{message.length}/2000</span>
              </div>
              <Button variant="hero" size="lg" className="w-full">
                Send Inquiry
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
