import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Places", to: "/places" },
  { label: "FAQs", to: "/faqs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Muhurta Yatra Home">
          <img src={logo} alt="Muhurta Yatra Logo" className="h-10 w-10 md:h-12 md:w-12" loading="lazy" />
          <div className="flex flex-col">
            <span className={`font-heading text-lg md:text-xl font-bold leading-tight transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
              Muhurta Yatra
            </span>
            <span className={`text-[10px] tracking-widest uppercase transition-colors ${scrolled ? "text-muted-foreground" : "text-primary-foreground/70"}`}>
              Handcrafted Journeys
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                location.pathname === link.to
                  ? scrolled
                    ? "bg-primary/10 text-primary"
                    : "bg-primary-foreground/20 text-primary-foreground"
                  : scrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="hero" size="lg" className="ml-4" asChild>
            <a href="tel:+919876543210" aria-label="Call to book">
              <Phone className="h-4 w-4 mr-1" /> Book Now
            </a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-lg border-b border-border overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="hero" size="lg" className="mt-2" asChild>
                <a href="tel:+919876543210">
                  <Phone className="h-4 w-4 mr-1" /> Book Now
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
