import { useState } from "react";
import { Plane, Send, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-bold">TravelEase</span>
            </div>
            <p className="text-sm text-background/60 mb-4">
              Your trusted partner for hotel stays and bus rides across India.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            {["About Us", "Careers", "Blog", "Press"].map((l) => (
              <a key={l} href="#" className="block text-sm text-background/60 hover:text-primary transition-colors mb-2">{l}</a>
            ))}
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            {["Help Center", "Privacy Policy", "Terms of Service", "Cancellation Policy"].map((l) => (
              <a key={l} href="#" className="block text-sm text-background/60 hover:text-primary transition-colors mb-2">{l}</a>
            ))}
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-display font-semibold mb-4">Stay Updated</h4>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-background/10 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-background/40 focus:ring-1 focus:ring-primary"
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <h4 className="font-display font-semibold mb-3">Contact Us</h4>
            <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Name"
                value={contactForm.name}
                onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                className="w-full bg-background/10 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-background/40"
              />
              <input
                type="email"
                placeholder="Email"
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full bg-background/10 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-background/40"
              />
              <textarea
                placeholder="Message"
                rows={2}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                className="w-full bg-background/10 rounded-lg px-3 py-2 text-sm outline-none placeholder:text-background/40 resize-none"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90 w-full">Send Message</Button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 text-center text-sm text-background/40">
          © {new Date().getFullYear()} TravelEase. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
