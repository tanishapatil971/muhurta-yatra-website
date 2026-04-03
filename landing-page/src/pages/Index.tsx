import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [errorPackages, setErrorPackages] = useState("");
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

  const fetchPackages = useCallback(async () => {
    setLoadingPackages(true);
    setErrorPackages("");
    try {
      const res = await fetch(API_ENDPOINTS.packages);
      if (!res.ok) throw new Error("Could not fetch latest packages");
      const data = await res.json();
      setPackages(data.slice(0, 6)); // Limit to latest 6
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
            <div className="text-center py-24 bg-white/50 border-2 border-dashed border-border rounded-[2rem]">
              <div className="text-5xl mb-6 opacity-20 grayscale">🧳</div>
              <h3 className="text-xl font-bold text-foreground mb-2">No packages available</h3>
              <p className="text-muted-foreground italic max-w-md mx-auto mb-8">
                Our team is currently crafting new unforgettable journeys. Check back soon or contact us for a custom plan!
              </p>
              <Button variant="outline" asChild className="rounded-xl border-primary/20 text-primary font-bold">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer">Contact for Custom Trip</a>
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
                  <div className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-border/40 shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col">
                    {/* Image/Status Area */}
                    <div className="relative h-72 overflow-hidden bg-muted">
                      {pkg.image ? (
                        <img 
                          src={pkg.image} 
                          alt={pkg.destination || "Travel Package"} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[7rem] opacity-30 grayscale group-hover:grayscale-0 transition-all duration-500">
                          {pkg.emoji || "✈️"}
                        </div>
                      )}
                      
                      {/* Floating Badges */}
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <span className="bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase shadow-sm">
                          {pkg.duration || "Best Offer"}
                        </span>
                        {pkg.status && (
                          <span className="bg-primary/95 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.15em] uppercase shadow-lg shadow-primary/20">
                            {pkg.status}
                          </span>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="mb-6">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground leading-tight">{pkg.destination || "Unknown Destination"}</h3>
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-xs text-muted-foreground font-bold tracking-wider uppercase">Starts at</span>
                          <span className="text-2xl font-black text-primary">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground text-[15px] line-clamp-2 leading-relaxed mb-8 italic">
                        "{pkg.description || "Embark on an extraordinary journey with Muhurta Yatra."}"
                      </p>
                      
                      {/* Features Row */}
                      <div className="grid grid-cols-2 gap-4 mb-10 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-primary/5 rounded-2xl">
                            <Compass className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Transfer</span>
                            <span className="text-sm font-bold text-foreground truncate">{pkg.transport || "Inclusive"}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-sunset/5 rounded-2xl">
                            <Mountain className="w-5 h-5 text-sunset" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1">Capacity</span>
                            <span className="text-sm font-bold text-foreground truncate">{pkg.maxPeople || 1} Ppl Max</span>
                          </div>
                        </div>
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-4 mt-auto">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="lg" className="flex-1 rounded-2xl border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-bold transition-all duration-300">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto p-0 gap-0 border-none bg-background rounded-[3rem] shadow-2xl animate-in zoom-in-95 duration-300">
                            {pkg ? (
                              <>
                                {/* Modal Header/Image */}
                                <div className="relative h-[22rem] w-full">
                                  {pkg.image ? (
                                    <img 
                                      src={pkg.image} 
                                      alt={pkg.destination || "Destination"} 
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-[#f8f6f2] flex items-center justify-center text-[10rem] grayscale opacity-20">
                                      {pkg.emoji || "✈️"}
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />
                                  <div className="absolute bottom-10 left-10 right-10">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                      <span className="px-4 py-1.5 bg-primary text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-full shadow-xl shadow-primary/30">
                                        {pkg.duration || "Special Tour"}
                                      </span>
                                      {pkg.status && (
                                        <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-black tracking-[0.2em] uppercase rounded-full">
                                          {pkg.status}
                                        </span>
                                      )}
                                    </div>
                                    <h2 className="text-5xl font-heading font-black text-white drop-shadow-xl">
                                      {pkg.destination || "Your Next Destination"}
                                    </h2>
                                  </div>
                                </div>

                                {/* Modal Body */}
                                <div className="p-10 md:p-14">
                                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                                    <div className="lg:col-span-8 space-y-12">
                                      <section>
                                        <div className="flex items-center gap-3 mb-6">
                                          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                            <Info className="w-5 h-5 text-primary" />
                                          </div>
                                          <h3 className="text-2xl font-bold text-foreground font-heading">The Experience</h3>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed text-lg italic border-l-4 border-primary/20 pl-6 py-2">
                                          {pkg.description || `Experience the true essence of ${pkg.destination || "India"}. Our handcrafted itinerary is designed for maximum comfort and an authentic local experience.`}
                                        </p>
                                      </section>

                                      <section>
                                        <div className="flex items-center gap-3 mb-10">
                                          <div className="w-10 h-10 bg-sunset/10 rounded-xl flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-sunset" />
                                          </div>
                                          <h3 className="text-2xl font-bold text-foreground font-heading">Day-by-Day Journey</h3>
                                        </div>
                                        <div className="space-y-10 relative ml-6 border-l-2 border-primary/10 pl-12 pb-4">
                                          {(pkg.itinerary?.length || 0) > 0 ? (
                                            pkg.itinerary?.map((day: string, idx: number) => (
                                              <div key={idx} className="relative">
                                                <div className="absolute -left-[61px] top-1.5 w-6 h-6 rounded-full bg-white border-[6px] border-primary shadow-md z-10" />
                                                <div className="flex flex-col gap-2">
                                                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Day {idx + 1}</span>
                                                  <p className="text-foreground/90 font-medium leading-relaxed text-lg">{day}</p>
                                                </div>
                                              </div>
                                            ))
                                          ) : (
                                            <p className="text-muted-foreground italic">Standard tour itinerary applies. Specific daily details will be provided upon booking.</p>
                                          )}
                                        </div>
                                      </section>
                                    </div>

                                    {/* Sidebar Info */}
                                    <div className="lg:col-span-4">
                                      <div className="p-10 rounded-[2.5rem] bg-muted/30 border border-border/40 space-y-10 sticky top-10">
                                        <div className="pb-8 border-b border-border/50">
                                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-[0.2em] block mb-3">Package Value</span>
                                          <div className="flex flex-col">
                                            <span className="text-sm text-muted-foreground font-medium mb-1">Starting at</span>
                                            <div className="flex items-baseline gap-2">
                                              <span className="text-5xl font-black text-primary">₹{(pkg.price || 0).toLocaleString("en-IN")}</span>
                                              <span className="text-xs text-muted-foreground font-bold uppercase tracking-widest">/ Pax</span>
                                            </div>
                                          </div>
                                        </div>

                                        <div className="space-y-6">
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest underline decoration-primary/20 decoration-2 underline-offset-4">Duration</span>
                                            <span className="font-black text-foreground">{pkg.duration || "Special"}</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest underline decoration-primary/20 decoration-2 underline-offset-4">Max Capacity</span>
                                            <span className="font-black text-foreground underline decoration-sunset/20 decoration-4 underline-offset-2">{pkg.maxPeople || "Flexible"} travelers</span>
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest underline decoration-primary/20 decoration-2 underline-offset-4">Transport</span>
                                            <span className="font-black text-foreground">{pkg.transport || "All Inclusive"}</span>
                                          </div>
                                        </div>

                                        <Button variant="hero" size="lg" className="w-full h-16 rounded-2xl shadow-2xl shadow-primary/30 group" asChild>
                                          <a href={`https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(`Namaste! I would like to book the ${pkg.destination || "travel"} package (${pkg.duration || "limited offer"}) for ₹${pkg.price || "current price"}. Please guide me further.`)}`} target="_blank" rel="noopener noreferrer">
                                            Reserve Your Seat <ChevronDown className="w-4 h-4 ml-2 -rotate-90 group-hover:translate-x-1 transition-transform" />
                                          </a>
                                        </Button>
                                        
                                        <div className="flex items-center justify-center gap-3 pt-4 opacity-70">
                                          <div className="p-2 bg-[#25D366]/10 rounded-lg">
                                            <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                                          </div>
                                          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.1em]">Instant Check</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <div className="p-20 text-center text-muted-foreground italic">Package information unavailable. Please refresh or contact support.</div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button variant="hero" size="lg" className="flex-1 rounded-2xl group shadow-lg shadow-primary/20" asChild>
                          <a href={`https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(`Hi Muhurta Yatra, I'm interested in the ${pkg.destination || "package"}. Can you share more details?`)}`} target="_blank" rel="noopener noreferrer">
                            Book <ChevronDown className="w-4 h-4 ml-1 -rotate-90 group-hover:translate-x-1 transition-transform" />
                          </a>
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
