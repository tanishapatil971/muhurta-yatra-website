import { Shield } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto glass-card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-full text-primary">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Admin Dashboard</h1>
        </div>
        <p className="text-muted-foreground text-lg mb-8">
          Welcome back, Admin. You can manage bookings, users, and edit the Muhurta Yatra catalog from here.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Bookings</h3>
            <p className="text-sm text-muted-foreground">Manage active yatra bookings.</p>
          </div>
          <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Destinations</h3>
            <p className="text-sm text-muted-foreground">Add or edit places & packages.</p>
          </div>
          <div className="p-6 border border-border rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="font-semibold text-lg mb-2">Travelers</h3>
            <p className="text-sm text-muted-foreground">View user accounts & queries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
