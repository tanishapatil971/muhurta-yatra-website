import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Navigation, MapPin, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/contact";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (action: string) => {
    setIsOpen(false);
    if (action === "plan") {
      navigate("/plan");
    } else if (action === "explore") {
      navigate("/places");
    } else if (action === "whatsapp") {
      const whatsappHref = `https://wa.me/91${CONTACT.phone.replace(/\s+/g, "")}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;
      window.open(whatsappHref, "_blank");
    }
  };

  return (
    <div ref={widgetRef} className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="bg-background rounded-2xl shadow-xl w-72 md:w-80 mb-4 border border-border overflow-hidden"
          >
            <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
              <div>
                <h3 className="font-heading font-semibold text-lg">Chat with us!</h3>
                <p className="text-xs opacity-90">How can we help you today?</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4 space-y-3 bg-muted/20">
              <Button 
                variant="outline" 
                className="w-full justify-start text-left bg-background hover:bg-muted font-normal h-auto py-3 whitespace-normal shadow-sm"
                onClick={() => handleAction("plan")}
              >
                <Navigation className="h-4 w-4 mr-3 shrink-0 text-primary" />
                <span>I want to Plan a Trip</span>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start text-left bg-background hover:bg-muted font-normal h-auto py-3 whitespace-normal shadow-sm"
                onClick={() => handleAction("explore")}
              >
                <MapPin className="h-4 w-4 mr-3 shrink-0 text-primary" />
                <span>Explore Destinations</span>
              </Button>
              <Button 
                variant="default"
                className="w-full justify-start text-left bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white font-normal h-auto py-3 whitespace-normal shadow-sm"
                onClick={() => handleAction("whatsapp")}
              >
                <MessageCircle className="h-4 w-4 mr-3 shrink-0" />
                <span>Contact on WhatsApp</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        {!isOpen && (
          <div className="absolute inset-0 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/30 z-10"
          aria-label="Open chat"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </button>
      </div>
    </div>
  );
}
