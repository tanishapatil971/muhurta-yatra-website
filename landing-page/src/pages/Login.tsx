import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  // Get the redirect path from location state, or default to dashboard
  const from = location.state?.from?.pathname || "/dashboard";
  
  // Also check URL parameters for role-based explicit login requests
  const searchParams = new URLSearchParams(location.search);
  const requestedRole = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      
      // Determine redirect path based on role and request
      let targetPath = from;
      
      if (user.role === "admin") {
        targetPath = "/admin";
      } else if (user.role === "user") {
        targetPath = "/dashboard";
      }

      // If there was a specific role requested in URL but user has different role,
      // we still send them to their valid role dashboard (already handled above).
      // The explicit roleParam is mostly useful if you wanted to lock the form
      // or pre-fill, but strictly for redirect, their actual user.role takes precedence.

      navigate(targetPath, { replace: true });
    } catch (error) {
      console.error("Login component error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/50 px-4 pt-24 pb-12">
      <div className="glass-card w-full max-w-md p-8 animate-fade-up">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your dashboard and bookings
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              required
              className="bg-background"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              required
              className="bg-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <Button type="submit" variant="hero" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}