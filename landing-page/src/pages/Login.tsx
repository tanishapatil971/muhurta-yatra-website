import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Shield } from "lucide-react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialRole =
    searchParams.get("role") === "admin" ? "admin" : "traveller";
  const [role, setRole] = useState(initialRole);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ React routing (correct way)
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/50 px-4 pt-24 pb-12">
      <div className="glass-card w-full max-w-md p-8 animate-fade-up">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to your account
          </p>
        </div>

        <Tabs value={role} onValueChange={setRole} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="traveller">
              <Compass className="w-4 h-4 mr-2" />
              Traveller
            </TabsTrigger>
            <TabsTrigger value="admin">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label>Email Address</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              required
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              required
              className="bg-background"
            />
          </div>

          <Button type="submit" variant="hero" className="w-full mt-6">
            Sign In as {role === "admin" ? "Admin" : "Traveller"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link
            to={`/signup?role=${role}`}
            className="text-primary font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}