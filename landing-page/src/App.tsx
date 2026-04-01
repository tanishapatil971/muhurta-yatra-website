import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

import Index from "./pages/Index";
import About from "./pages/About";
import Plan from "./pages/Plan";
import Places from "./pages/Places";
import PlaceCategory from "./pages/PlaceCategory";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AdminPage from "../../admin-page/AdminPage";

// USER PAGES
import Dashboard from "./user/Dashboard";
import MyTrips from "./user/MyTrips";
import Explore from "./user/Explore";
import Personalized from "./user/Personalized";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();

  // 🔥 Hide Navbar/Footer for dashboard pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/my-trips") ||
    location.pathname.startsWith("/explore") ||
    location.pathname.startsWith("/personalized");

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/places" element={<Places />} />
        <Route path="/places/:category" element={<PlaceCategory />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER MODULE */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/personalized" element={<Personalized />} />

        {/* ADMIN MODULE */}
        <Route path="/admin" element={<AdminPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ChatWidget />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <AppContent />
        </BrowserRouter>

      </TooltipProvider>
    </QueryClientProvider>
  );
}