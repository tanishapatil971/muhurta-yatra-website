import { Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import appMockup from "@/assets/app-mockup.png";

const AppDownload = () => (
  <section className="section-padding overflow-hidden">
    <div className="container mx-auto">
      <div className="hero-gradient rounded-3xl p-8 md:p-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4" style={{ color: "white" }}>
            Travel Smarter with the <span className="text-gradient-gold">TravelEase App</span>
          </h2>
          <p className="text-lg mb-8" style={{ color: "hsla(0,0%,100%,0.75)" }}>
            Get exclusive app-only deals, instant notifications, and manage your bookings on the go.
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            <Button size="lg" className="bg-primary hover:bg-primary/90 btn-primary-glow gap-2">
              <Smartphone className="h-5 w-5" />
              Download for iOS
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-primary-foreground/30 hover:bg-primary-foreground/10" style={{ color: "white" }}>
              <Smartphone className="h-5 w-5" />
              Download for Android
            </Button>
          </div>
        </div>
        <div className="flex-shrink-0 animate-float">
          <img src={appMockup} alt="TravelEase mobile app" className="w-60 md:w-72 drop-shadow-2xl" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
);

export default AppDownload;
