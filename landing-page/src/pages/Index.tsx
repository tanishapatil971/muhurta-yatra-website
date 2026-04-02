import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Compass, Heart, Mountain, Shield, Clock, Info, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT } from "@/config/contact";
import { API_ENDPOINTS } from "@/config/api";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import heroPawna from "@/assets/hero-pawna.jpg";
import heroRaigad from "@/assets/hero-raigad.jpg";
import beachImg from "@/assets/beach-harihareshwar.jpg";
import fortImg from "@/assets/fort-lohagad.jpg";
import pilgrimImg from "@/assets/pilgrim-temple.jpg";
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

// Removed static destinations in favor of dynamic backend packages

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(true);
  const { toast } = useToast();
  const contactHref = `tel:+91${CONTACT.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  const nextSlide = useCallback(() => {
    setCurrentSlide((p) => (p + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(nextSlide, 5000);
    return () => clearInterval(t);
  }, [nextSlide]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.packages);
        if (res.ok) {
          const data = await res.json();
          setPackages(data.slice(0, 6)); // Limit to latest 6
        }
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

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
              <Link to="/places">Explore Destinations</Link>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <a href={contactHref}>Book Your Yatra</a>
            </Button>
            <Button variant="hero" size="lg" className="bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)]" asChild>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
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

      {/* LATEST TRAVEL PACKAGES (Replaces Featured Destinations) */}
      <section className="section-padding bg-muted/50">
        <div className="container-wide">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-primary font-semibold text-sm tracking-widest uppercase">Our Packages</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mt-2 text-foreground">Featured Travel Packages</h2>
              <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                Explore our current offerings, handcrafted for your next unforgettable yatra.
              </p>
            </div>
          </ScrollReveal>

          {loadingPackages ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : packages.length === 0 ? (
            <div className="text-center py-20 glass-card bg-background/50 border-dashed border-2 border-border">
              <p className="text-muted-foreground italic">No active packages found. Use the Admin Dashboard to add new trips!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg, i) => (
                <ScrollReveal key={pkg._id} delay={i * 100}>
                  <div className="glass-card overflow-hidden group hover-lift flex flex-col h-full bg-white border border-border/50 shadow-sm">
                    <div className="relative h-56 overflow-hidden bg-muted">
                      {pkg.image ? (
                        <img 
                          src={pkg.image} 
                          alt={pkg.destination} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 grayscale group-hover:grayscale-0 transition-all duration-500">
                          {pkg.emoji || "✈️"}
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase shadow-md">
                        {pkg.duration || pkg.status || "Special Offer"}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="mb-5">
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-1">{pkg.destination}</h3>
                        <div className="flex items-center gap-2 text-primary font-bold">
                          <span className="text-xl">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
                          <span className="text-xs text-muted-foreground font-medium">/ person</span>
                        </div>
                      </div>

                      {pkg.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {pkg.description}
                        </p>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="p-2 bg-primary/5 rounded-lg">
                            <Compass className="w-4 h-4 text-primary" />
                          </div>
                          <span>{pkg.transport || "Inclusive"}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="p-2 bg-primary/5 rounded-lg">
                            <Heart className="w-4 h-4 text-primary" />
                          </div>
                          <span>{pkg.maxPeople} Pax</span>
                        </div>
                      </div>

                      <div className="flex gap-3 mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="lg" className="flex-1 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-bold">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none bg-background rounded-3xl shadow-2xl">
                            <div className="relative h-64 sm:h-80 w-full">
                              {pkg.image ? (
                                <img 
                                  src={pkg.image} 
                                  alt={pkg.destination} 
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#F5F0E8] flex items-center justify-center text-8xl grayscale opacity-30">
                                  {pkg.emoji || "✈️"}
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                              <div className="absolute bottom-6 left-8 right-8">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                  <span className="px-3 py-1 bg-primary text-white text-[10px] font-black tracking-widest uppercase rounded-lg shadow-lg">
                                    {pkg.duration || "Best Value"}
                                  </span>
                                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary text-[10px] font-black tracking-widest uppercase rounded-lg shadow-sm">
                                    {pkg.status || "Popular Choice"}
                                  </span>
                                </div>
                                <h2 className="text-4xl font-heading font-bold text-foreground drop-shadow-sm">{pkg.destination}</h2>
                              </div>
                            </div>

                            <div className="p-8">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-8">
                                  <section>
                                    <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-4 font-heading">
                                      <Info className="w-5 h-5 text-primary" />
                                      About this Package
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed text-base">
                                      {pkg.description || `Embark on an extraordinary journey to ${pkg.destination}. Experience the perfect blend of comfort and exploration with our handcrafted itinerary, designed to give you the most authentic local experience.`}
                                    </p>
                                  </section>

                                  {pkg.itinerary && pkg.itinerary.length > 0 && (
                                    <section>
                                      <h3 className="flex items-center gap-2 text-lg font-bold text-foreground mb-6 font-heading">
                                        <Clock className="w-5 h-5 text-primary" />
                                        Day-by-Day Itinerary
                                      </h3>
                                      <div className="space-y-6 relative ml-4 border-l-2 border-primary/10 pl-8">
                                        {pkg.itinerary.map((day, idx) => (
                                          <div key={idx} className="relative">
                                            <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm" />
                                            <p className="text-foreground/90 font-medium leading-relaxed">{day}</p>
                                          </div>
                                        ))}
                                      </div>
                                    </section>
                                  )}
                                </div>

                                <div className="space-y-6">
                                  <div className="p-6 rounded-2xl bg-muted/30 border border-border/50 sticky top-4">
                                    <div className="mb-6 pb-6 border-b border-border">
                                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-widest block mb-1">Package Price</span>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-black text-primary">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
                                        <span className="text-sm text-muted-foreground">/ person</span>
                                      </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Duration:</span>
                                        <span className="font-bold text-foreground">{pkg.duration || "Custom"}</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Group Size:</span>
                                        <span className="font-bold text-foreground">Max {pkg.maxPeople} Pax</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Transport:</span>
                                        <span className="font-bold text-foreground">{pkg.transport || "All Inclusive"}</span>
                                      </div>
                                    </div>

                                    <Button variant="hero" size="lg" className="w-full shadow-xl" asChild>
                                      <a href={`https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(`Hi, I'm ready to book the ${pkg.destination} package for ₹${pkg.price}. Please let me know the nest steps.`)}`} target="_blank" rel="noopener noreferrer">
                                        Book Now
                                      </a>
                                    </Button>
                                    <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase font-bold tracking-widest flex items-center justify-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-primary" /> Instant Confirmation
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Button variant="hero" size="lg" className="flex-1 group" asChild>
                          <a href={`https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in the ${pkg.destination} package for ₹${pkg.price}. Please share more details.`)}`} target="_blank" rel="noopener noreferrer">
                            Book <ChevronDown className="w-4 h-4 ml-1 -rotate-90 group-hover:translate-x-1 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

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
            <form className="glass-card p-8 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Your name" required />
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Phone number" required />
              </div>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address (Optional)" className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" aria-label="Email" />
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
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Inquiry"}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
