import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-foreground text-background" role="contentinfo">
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
            <a href="tel:+919876543210">
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
            <p className="text-background/70 text-sm leading-relaxed">
              Handcrafted journeys across India – spiritual tours, honeymoon packages & cultural experiences from Pimpri-Chinchwad.
            </p>
            <div className="flex gap-3 mt-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-background/10 hover:bg-primary transition-colors" aria-label="Social link">
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
                  <Link to={l.to} className="text-background/70 hover:text-primary transition-colors">
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
                  <Link to={l.to} className="text-background/70 hover:text-primary transition-colors">
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
              <li className="flex items-start gap-2 text-background/70">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                Pimpri-Chinchwad, Pune, Maharashtra 411018
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a href="tel:+919876543210" className="hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2 text-background/70">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:info@muhurtayatra.com" className="hover:text-primary transition-colors">info@muhurtayatra.com</a>
              </li>
            </ul>
            <div className="mt-4 rounded-lg overflow-hidden">
              <iframe
                title="Muhurta Yatra Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60530.18799573845!2d73.7757778!3d18.6279395!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9f4039a5657%3A0x474519cee8f2ee52!2sPimpri-Chinchwad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="180"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 py-4 px-4">
        <div className="container-wide flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Muhurta Yatra. All rights reserved.</p>
          <button onClick={scrollToTop} className="p-2 rounded-full bg-primary hover:bg-primary/80 text-primary-foreground transition-colors" aria-label="Back to top">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
