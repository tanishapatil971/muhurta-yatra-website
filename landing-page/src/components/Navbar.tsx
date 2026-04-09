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
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";


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
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
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
          : "bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Muhurta Yatra Home">
          <img src={logo} alt="Muhurta Yatra Logo" className="h-10 w-10 md:h-12 md:w-12" loading="lazy" />
          <div className="flex flex-col">
            <span className={`font-heading text-2xl md:text-3xl font-bold leading-tight transition-colors duration-500 ${transparentAtTop ? "text-white" : "text-gray-900"}`}>
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
                    : "text-gray-800 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`p-2 rounded-full transition-all duration-300 ${
              transparentAtTop
                ? "text-white hover:bg-white/15"
                : "text-gray-800 hover:bg-gray-100"
            }`}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <Button
            variant="hero"
            size="lg"
            className="ml-4"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
            transparentAtTop ? "text-white hover:bg-white/15" : "text-gray-800 hover:text-gray-900 hover:bg-gray-100"
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
                      : "text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </button>
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
