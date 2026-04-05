import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { register } = useAuth();
  const roleVal = searchParams.get("role") === "admin" ? "admin" : "traveller";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await register(name, email, password, roleVal);
      navigate(`/login?role=${roleVal}`);
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/50 px-4 pt-24 pb-12">
      <div className="glass-card w-full max-w-md p-8 animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Create Account</h1>
          <p className="text-muted-foreground mt-2">Join us as a {roleVal === "admin" ? "Partner / Admin" : "Traveller"}</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              required 
              className="bg-background" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
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
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
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
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to={`/login?role=${roleVal}`} className="text-primary font-semibold hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
