import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Users, CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';

interface PackageData {
  _id: string;
  destination: string;
  price: number;
  duration: string;
  image?: string;
}

const BookingPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use state package or fallback to a custom "Flexible" package
  const pkg = (location.state?.selectedPackage || {
    _id: "custom-yatra",
    destination: "Custom Yatra (Flexible Plan)",
    price: 0,
    duration: "Flexible",
    image: null
  }) as PackageData;

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    travelersCount: 1,
  });

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // No longer redirecting immediately to allow general inquiries

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'travelersCount' ? parseInt(value) || 0 : value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.phoneNumber) {
      setError("Please fill in all contact details.");
      return false;
    }
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (formData.travelersCount < 1) {
      setError("At least 1 traveler is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          packageId: pkg._id,
          packageName: pkg.destination,
          totalPrice: pkg.price * formData.travelersCount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setIsSuccess(true);
      toast.success("Booking successful!");
      
      // Auto-redirect after some time
      setTimeout(() => navigate('/'), 5000);

    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="max-w-md w-full bg-card border border-border p-10 rounded-[2.5rem] shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-heading font-black text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground">Thank you for choosing Muhurta Yatra. We have received your request for <strong>{pkg.destination}</strong> and will contact you shortly.</p>
          </div>
          <Button variant="hero" className="w-full" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Summary */}
        <div className="lg:col-span-5 space-y-8">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all mb-4 block">
            <ChevronLeft className="w-5 h-5" /> Back to Explorations
          </Link>
          
          <div className="bg-card border border-border rounded-[2rem] overflow-hidden shadow-xl">
            {pkg.image && (
              <img src={pkg.image} alt={pkg.destination} className="w-full h-48 object-cover" />
            )}
            <div className="p-8 space-y-6">
              <div>
                <h1 className="text-3xl font-heading font-black text-foreground">{pkg.destination}</h1>
                <p className="text-muted-foreground flex items-center gap-2 mt-1">
                  <Calendar className="w-4 h-4" /> {pkg.duration}
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-muted-foreground">Price per person</span>
                  <span className="text-foreground">₹{pkg.price.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-muted-foreground">Travelers</span>
                  <span className="text-foreground">{formData.travelersCount}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border font-black text-xl">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-primary text-2xl font-heading">₹{(pkg.price * formData.travelersCount).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="bg-primary/5 p-4 rounded-xl flex gap-3 items-start">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                <p className="text-xs text-primary/80 leading-relaxed font-medium">Price includes standard transport, premium accommodation, and curated daily itineraries.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-card border border-transparent shadow-[0_0_50px_rgba(0,0,0,0.05)] p-8 md:p-12 rounded-[2.5rem] space-y-10 border-l-4 border-l-primary">
            <div>
              <h2 className="text-4xl font-heading font-black text-foreground">Complete Your Booking</h2>
              <p className="text-muted-foreground mt-2">Almost there! Fill in your details to secure your spot.</p>
            </div>

            {error && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in-95 duration-300">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Tanisha Patil"
                  className="w-full h-14 px-6 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/40"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="tanisha@example.com"
                    className="w-full h-14 px-6 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/40"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="+91 98765 43210"
                    className="w-full h-14 px-6 rounded-xl bg-muted/50 border border-border/50 text-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/40"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 max-w-[200px]">
                <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Travelers
                </label>
                <input
                  type="number"
                  name="travelersCount"
                  min="1"
                  className="w-full h-14 px-6 rounded-xl bg-muted/50 border border-border/50 text-foreground font-black text-xl text-center focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  value={formData.travelersCount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="pt-6">
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full h-16 rounded-2xl shadow-2xl shadow-primary/30 text-lg flex items-center justify-center gap-2 group" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                    </>
                  ) : (
                    <>
                      Confirm Booking <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </Button>
              </div>

              <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium pt-4">
                Secure 256-bit SSL encrypted booking
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
