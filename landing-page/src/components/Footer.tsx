import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { CONTACT } from "@/config/contact";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const contactHref = `tel:+91${CONTACT.phone.replace(/\s+/g, "")}`;

  return (
    <footer className="bg-slate-950 text-slate-300 dark:bg-[#0f1115] dark:border-t dark:border-border" role="contentinfo">
      {/* CTA strip */}
      <div className="bg-primary section-padding !py-10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
              Ready for Your Next Adventure?
            </h3>
            <p className="text-primary-foreground/80 mt-1">
              Let us craft the perfect yatra for you.
            </p>
          </div>
          <Button variant="heroOutline" size="lg" asChild>
            <a href={contactHref}>
              <Phone className="h-4 w-4 mr-1" /> Call Us Now
            </a>
          </Button>
        </div>
      </div>

      <div className="section-padding !py-12">
        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Muhurta Yatra" className="h-10 w-10" loading="lazy" />
              <span className="font-heading text-xl font-bold">Muhurta Yatra</span>
            </div>
            <p className="text-slate-400 dark:text-muted-foreground text-sm leading-relaxed">
              Handcrafted journeys across India – spiritual tours, honeymoon packages & cultural experiences.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-white/5 hover:bg-primary transition-colors" aria-label="Social link">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Destinations", to: "/places" },
                { label: "FAQs", to: "/faqs" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Fort Treks", to: "/places/forts" },
                { label: "Hill Stations", to: "/places/hills" },
                { label: "Beaches", to: "/places/beaches" },
                { label: "Pilgrim Sites", to: "/places/pilgrim" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                Mumbai, Maharashtra, India
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href={contactHref} className="hover:text-primary transition-colors">{CONTACT.phone}</a>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@muhurtayatra.com" className="hover:text-primary transition-colors">info@muhurtayatra.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-4">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Muhurta Yatra. All rights reserved.</p>
            <Link to="/login?role=admin" className="hover:text-primary transition-colors hover:underline">
              Admin Portal
            </Link>
          </div>
          <button onClick={scrollToTop} className="p-2 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors" aria-label="Back to top">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
