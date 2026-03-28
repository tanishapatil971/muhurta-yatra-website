import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plane, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    const ok = signup(name, email, password);
    if (ok) {
      navigate("/");
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <Plane className="h-8 w-8 text-primary" />
          <span className="font-display text-2xl font-bold text-primary">TravelEase</span>
        </div>

        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Create account</h1>
          <p className="text-muted-foreground text-sm mb-6">Start your journey with TravelEase</p>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Full Name</label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 bg-muted border border-border">
                <User className="h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  required
                  placeholder="Sumaira Mulla"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Email</label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 bg-muted border border-border">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Password</label>
              <div className="flex items-center gap-2 rounded-lg px-3 py-2.5 bg-muted border border-border">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <input
                  type={showPass ? "text" : "password"}
                  required
                  placeholder="Min. 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full text-foreground placeholder:text-muted-foreground/50"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-6 font-semibold">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-medium hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;