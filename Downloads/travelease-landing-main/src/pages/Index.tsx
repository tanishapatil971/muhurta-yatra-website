import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import QuickStats from "@/components/QuickStats";
import HotelsShowcase from "@/components/HotelsShowcase";
import BusRoutes from "@/components/BusRoutes";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedDeals from "@/components/FeaturedDeals";
import Testimonials from "@/components/Testimonials";
import AppDownload from "@/components/AppDownload";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <QuickStats />
    <HotelsShowcase />
    <BusRoutes />
    <WhyChooseUs />
    <FeaturedDeals />
    <Testimonials />
    <AppDownload />
    <Footer />
  </div>
);

export default Index;
