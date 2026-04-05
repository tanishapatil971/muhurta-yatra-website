import React, { ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

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
import BookingPage from "./pages/BookingPage";

// USER PAGES
import Dashboard from "./user/Dashboard";
import MyTrips from "./user/MyTrips";
import Explore from "./user/Explore";
import Personalized from "./user/Personalized";

const queryClient = new QueryClient();

// 🚨 Simplified Error Boundary for Debugging
function GlobalErrorBoundary({ children }: { children: ReactNode }) {
  const [error, setError] = React.useState<null | Error>(null);

  React.useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      console.error("💥 TRACING CRASH:", event.error);
      setError(event.error);
    };
    window.addEventListener("error", errorHandler);
    return () => window.removeEventListener("error", errorHandler);
  }, []);

  if (error) {
    return (
      <div style={{ 
        padding: "40px", 
        backgroundColor: "#fff5f5", 
        color: "#c53030", 
        minHeight: "100vh", 
        fontFamily: "system-ui, sans-serif" 
      }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Runtime Error Detected</h1>
        <div style={{ 
          backgroundColor: "#fff", 
          padding: "20px", 
          borderRadius: "8px", 
          border: "2px solid #feb2b2", 
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
        }}>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", fontSize: "0.9rem" }}>
            {error.stack || error.message}
          </pre>
        </div>
        <p style={{ marginTop: "1rem", color: "#4a5568" }}>
          The app crashed during render. See the error above or the console for details.
        </p>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: "10px 20px", background: "#c53030", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" }}
        >
          Reload App
        </button>
      </div>
    );
  }

  return <>{children}</>;
}

function AppContent() {
  const location = useLocation();
  console.log("TRACING: Rendering AppContent for path:", location?.pathname);

  // 🔥 Hide Layout logic
  const path = location?.pathname || "/";
  const hideLayout =
    path.startsWith("/admin") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/my-trips") ||
    path.startsWith("/explore") ||
    path.startsWith("/personalized");

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
        <Route path="/booking" element={<BookingPage />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/personalized" element={<Personalized />} />

        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!hideLayout && <Footer />}
      <ChatWidget />
    </>
  );
}

export default function App() {
  console.log("TRACING: App Bootstrapping");
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
}