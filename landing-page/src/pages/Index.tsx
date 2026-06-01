import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Compass, Heart, Mountain, Shield, Clock, Info, CheckCircle2, Star, Send, Users, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT } from "@/config/contact";
import { API_ENDPOINTS } from "@/config/api";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import heroPawna from "@/assets/hero-pawna.jpg";
import heroRaigad from "@/assets/hero-raigad.jpg";
const beachImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop";
const fortImg = "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop";
const pilgrimImg = "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop";
import { useToast } from "@/hooks/use-toast";

interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  maxPeople: number;
  transport?: string;
  status?: string;
  emoji?: string;
  image?: string;
  duration?: string;
  description?: string;
  itinerary?: string[];
}

const heroSlides = [
  { img: heroRaigad, title: "Walk the Forts of Legends", sub: "Experience the Maratha Heritage Trail" },
  { img: heroPawna, title: "Serene Lakes & Hill Retreats", sub: "Escape to Nature's Finest Pursuits" },
  { img: heroSinhagad, title: "Handcrafted Journeys Across India", sub: "Modern Travel Curation with a Traditional Heart" },
];

const services = [
  { icon: Mountain, title: "Spiritual Tours", desc: "Soul-stirring pilgrimages to temples, jyotirlingas & spiritual retreats across India.", color: "bg-amber-50 text-amber-600" },
  { icon: Heart, title: "Exclusive Escapes", desc: "Romantic, private getaways to hill stations and beaches for your new beginning.", color: "bg-rose-50 text-rose-600" },
  { icon: Compass, title: "Adventure Trails", desc: "Exciting treks and expeditions across the Sahyadris for thrill-seekers.", color: "bg-emerald-50 text-emerald-600" },
  { icon: Shield, title: "Heritage Treks", desc: "Guided expeditions to iconic Maratha forts with deep historical insights.", color: "bg-blue-50 text-blue-600" },
];

const testimonials = [
  { name: "Priya Kulkarni", text: "The Vaishno Devi yatra organized by Muhurta Yatra was life-changing. Every detail was perfectly managed.", location: "Mumbai" },
  { name: "Rajesh Patil", text: "Our honeymoon to Goa was magical! Muhurta Yatra made it stress-free and unforgettable.", location: "Thane" },
  { name: "Sneha Deshmukh", text: "The Sinhagad trek with my family was amazing. Great guides, great food, great memories!", location: "Mumbai" },
  { name: "Amit Joshi", text: "Best travel agency. They planned our Konkan beach trip perfectly. Highly recommend!", location: "Navi Mumbai" },
];

// Removed static destinations in favor of dynamic backend packages

export default function Index() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const [errorPackages, setErrorPackages] = useState("");
  const { toast } = useToast();
  const contactHref = `tel:+91${CONTACT.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  const handleWhatsApp = useCallback((pkg?: TravelPackage) => {
    const phoneNumber = "91" + CONTACT.phone.replace(/\s+/g, "");
    const message = pkg
      ? `Hi Muhurta Yatra, I'm interested in the ${pkg.destination} package (${pkg.duration || "Special"}). Can you share more details?`
      : CONTACT.whatsappMessage || "Hi Muhurta Yatra, I'd like to plan a trip. Can you help me?";

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  const fetchPackages = useCallback(async () => {
    setLoadingPackages(true);
    setErrorPackages("");
    try {
      const res = await fetch(API_ENDPOINTS.packages);
      if (!res.ok) throw new Error("Could not fetch latest packages");
      const data = await res.json();
      if (Array.isArray(data)) {
        setPackages(data.slice(0, 6)); // Limit to latest 6
      } else {
        console.error("API returned non-array data for packages:", data);
        setPackages([]);
      }
    } catch (err: any) {
      console.error("Error fetching packages:", err);
      setErrorPackages("We're having trouble loading our latest tours. Please try again in a moment.");
    } finally {
      setLoadingPackages(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      toast({ title: "Validation Error", description: "Name and Phone are required.", variant: "destructive" });
      return;
    }

    // Basic email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "Validation Error", description: "Please enter a valid email address.", variant: "destructive" });
      return;
    }

    // Phone validation (7-15 digits)
    if (!/^\+?[\d\s-]{7,15}$/.test(phone)) {
      toast({ title: "Validation Error", description: "Please enter a valid phone number.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      console.log("API URL:", import.meta.env.VITE_API_URL);
      const response = await fetch(API_ENDPOINTS.enquiries, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      if (response.ok) {
        toast({ title: "Success", description: "Your inquiry has been sent! We will contact you soon." });
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        toast({ title: "Error", description: "Failed to send inquiry. Please try again later.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Something went wrong. Please check your connection.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <section className="relative h-screen min-h-[600px] overflow-hidden" aria-label="Hero slideshow">
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
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-up max-w-4xl tracking-tight">
            {heroSlides[currentSlide].title}
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-2xl mb-8 animate-fade-up leading-relaxed" style={{ animationDelay: "200ms" }}>
            {heroSlides[currentSlide].sub}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up" style={{ animationDelay: "400ms" }}>
            <Button
              variant="hero"
              size="lg"
              className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold px-8"
              asChild
            >
              <Link to="/places">
                Explore Destinations
              </Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="rounded-xl border-white bg-white text-slate-900 font-bold hover:bg-white/90 transition-all shadow-md px-8"
              onClick={() => {
                navigate('/booking');
              }}
            >
              Book Now
            </Button>

            <Button
              type="button"
              variant="hero"
              size="lg"
              className="rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold shadow-md px-8 border-none"
              onClick={() => handleWhatsApp()}
            >
              Chat on WhatsApp
            </Button>
          </div>
          {/* Slide indicators */}
          <div className="flex gap-2 mt-12">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-primary w-6" : "bg-white/40"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <button
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-6 w-6" />
        </button>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-padding bg-muted">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">What We Offer</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Our Signature Experiences</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Carefully crafted journeys across India – spiritual, traditional, and memorable.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="clean-card p-8 text-center h-full flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl ${s.color} flex items-center justify-center mb-6 shadow-sm ring-1 ring-border shadow-black/10`}>
                    <s.icon className="w-7 h-7" strokeWidth={2} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST TRAVEL PACKAGES (Replaces Featured Destinations) */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-xs tracking-[0.2em] uppercase mb-4 block"
            >
              Handcrafted Journeys
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Featured Travel Packages
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg"
            >
              Discover our most popular yatras, designed for comfort and spiritual discovery.
            </motion.p>
          </div>

          {loadingPackages ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-[3px] border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-sm font-medium text-muted-foreground animate-pulse uppercase tracking-widest">Loading latest packages...</p>
            </div>
          ) : errorPackages ? (
            <div className="text-center py-16 bg-rose-50/50 border-2 border-dashed border-rose-100 rounded-[2rem] max-w-2xl mx-auto">
              <div className="text-5xl mb-6 grayscale opacity-50">🧭</div>
              <h3 className="text-xl font-bold text-rose-900 mb-2">Connection Interrupted</h3>
              <p className="text-rose-700/80 mb-8 max-w-md mx-auto">{errorPackages || "Something went wrong while fetching packages."}</p>
              <Button
                variant="outline"
                onClick={() => fetchPackages()}
                className="border-rose-200 text-rose-700 hover:bg-rose-100/50 rounded-xl px-8"
              >
                Try Refreshing
              </Button>
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-24 bg-card border-2 border-dashed border-border rounded-[2rem]">
              <div className="text-5xl mb-6 opacity-20 grayscale">🧳</div>
              <h3 className="text-xl font-bold text-foreground mb-2">No packages available</h3>
              <p className="text-muted-foreground italic max-w-md mx-auto mb-8">
                Our team is currently crafting new unforgettable journeys. Check back soon or contact us for a custom plan!
              </p>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-primary/20 text-primary font-bold"
                onClick={() => handleWhatsApp()}
              >
                Contact for Custom Trip
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {packages.map((pkg, i) => (
                <motion.div
                  key={pkg._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="clean-card overflow-hidden h-full flex flex-col group transition-all duration-300">
                    {/* Image Area */}
                    <div className="relative h-60 overflow-hidden bg-muted">
                      <img
                        src={pkg.image || "/placeholder.svg"}
                        alt={pkg.destination}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop`;
                        }}
                      />

                      {/* Floating Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <span className="bg-background/90 backdrop-blur-sm text-primary px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-sm border border-border">
                          {pkg.duration || "Best Deal"}
                        </span>
                        {pkg.status && (
                          <span className="bg-primary text-white px-3 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase shadow-md">
                            {pkg.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <div className="flex items-center justify-between gap-4 mb-1">
                          <h3 className="font-heading text-xl font-bold text-foreground leading-tight">{pkg.destination}</h3>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Starting from</span>
                          <span className="text-xl font-bold text-primary">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-6">
                        {pkg.description || "Embark on an extraordinary journey with Muhurta Yatra."}
                      </p>

                      {/* Features Row */}
                      <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          <Compass className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-bold text-foreground truncate">{pkg.transport || "Inclusive"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-xs font-bold text-foreground truncate">{pkg.maxPeople || 1} Guests</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <Button
                          type="button"
                          variant="hero"
                          size="lg"
                          className="flex-1 rounded-2xl group shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate('/booking', { state: { selectedPackage: pkg } });
                          }}
                        >
                          Book Now
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          className="flex-1 rounded-2xl group border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all flex items-center justify-center gap-2"
                          onClick={(e) => {
                            e.preventDefault();
                            handleWhatsApp(pkg);
                          }}
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container-wide grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "500+", label: "Happy Travelers" },
            { num: "20+", label: "Destinations" },
            { num: "Est. 2025", label: "Young & Energetic" },
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
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">Testimonials</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">What Our Travelers Say</h2>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto px-4">
            <div className="relative min-h-[300px]">
              {testimonials.map((t, i) => {
                const isActive = i === testimonialIdx;
                return (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out px-4 ${isActive
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                      }`}
                  >
                    <div className="clean-card p-8 md:p-12 text-center flex flex-col items-center">
                      <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-8 italic">
                        "{t.text}"
                      </p>

                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {t.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-foreground">{t.name}</div>
                          <div className="text-muted-foreground text-xs uppercase tracking-wider">{t.location}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === testimonialIdx ? "bg-primary w-6" : "bg-slate-300"
                    }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="section-padding bg-background" id="contact">
        <div className="container-wide max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-10">
              <span className="text-primary font-bold text-sm tracking-widest uppercase block mb-2">Get In Touch</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">Plan Your Journey</h2>
              <p className="text-muted-foreground mt-2">Fill in your details and we'll get back to you soon.</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="clean-card p-8 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Your Name</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter name"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase">Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="tel"
                      placeholder="+91..."
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-muted-foreground"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Message</label>
                  <textarea
                    placeholder="Tell us about your trip..."
                    rows={4}
                    value={message}
                    maxLength={500}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none placeholder:text-muted-foreground"
                  />
                  <div className="flex justify-end">
                    <span
                      className={`text-xs font-medium transition-colors ${
                        message.length >= 500
                          ? "text-red-500 font-bold"
                          : message.length >= 400
                          ? "text-amber-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {message.length} / 500
                    </span>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full rounded-lg bg-primary text-white font-bold h-12 relative overflow-hidden group shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Inquiry...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Send Inquiry</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
