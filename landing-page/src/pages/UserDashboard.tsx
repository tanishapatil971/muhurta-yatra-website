import { Compass } from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Traveller Dashboard</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Welcome to your personalized Muhurta Yatra portal.
          (You can overwrite this file with your own user page code later!)
        </p>
      </div>
    </div>
  );
}
