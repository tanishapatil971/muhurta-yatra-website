import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { Sun, Moon, Database, ShieldAlert, CheckCircle2, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { API_ENDPOINTS } from "@/config/api";
import { CONTACT } from "@/config/contact";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Places", to: "/places" },
  { label: "FAQs", to: "/faqs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'reconnecting' | 'offline'>('reconnecting');
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  // Heartbeat Check
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.health || API_ENDPOINTS.places.replace('/places', '/health'));
        const data = await res.json();
        if (data.status === 'UP' && data.database === 'CONNECTED') {
          setBackendStatus('connected');
        } else {
          setBackendStatus('reconnecting');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);
  
  // Hero routes logic: checks if the current path starts with specific prefixes
  const isHeroRoute = ["/", "/about", "/places", "/faqs", "/booking"].some(path => location.pathname === path || location.pathname.startsWith("/places/"));
  
  const transparentAtTop = isHeroRoute && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparentAtTop
          ? "bg-transparent border-transparent shadow-none"
          : "bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-white/10"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Muhurta Yatra Home">
          <img src={logo} alt="Muhurta Yatra Logo" className="h-10 w-10 md:h-12 md:w-12" loading="lazy" />
          <div className="flex flex-col">
            <span className={`font-heading text-2xl md:text-3xl font-bold leading-tight transition-colors duration-500 ${transparentAtTop ? "text-white" : "text-slate-900 dark:text-white"}`}>
              Muhurta Yatra
            </span>
            <span className={`text-[10px] tracking-widest uppercase transition-colors duration-500 ${transparentAtTop ? "text-white/80" : "text-gray-600"}`}>
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
                  ? transparentAtTop
                    ? "bg-white/20 text-white"
                    : "bg-primary/10 text-primary"
                  : transparentAtTop
                    ? "text-white hover:bg-white/15"
                    : "text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
            {link.label}
          </Link>
        ))}

        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className={`rounded-full transition-all duration-300 ${
            transparentAtTop
              ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
              : "border-gray-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

          <Button
            variant="hero"
            size="lg"
            className="ml-2"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            transparentAtTop ? "text-white hover:bg-white/15" : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
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
            className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => { toggleTheme(); setMobileOpen(false); }}
                  className="w-full justify-start gap-3 rounded-lg border-gray-200"
                >
                  {theme === "light" ? (
                    <>
                      <Moon className="h-4 w-4" /> Dark Mode
                    </>
                  ) : (
                    <>
                      <Sun className="h-4 w-4" /> Light Mode
                    </>
                  )}
                </Button>
                <Button variant="hero" className="w-full mt-2" onClick={() => { navigate("/login"); setMobileOpen(false); }}>
                  Login
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
