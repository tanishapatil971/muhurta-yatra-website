import { Link, useLocation } from "react-router-dom";
import { Home, Map, Compass, Star } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "My Trips", path: "/my-trips", icon: Map },
    { name: "Explore", path: "/explore", icon: Compass },
    { name: "Personalized", path: "/personalized", icon: Star },
  ];

  return (
    <div className="min-h-screen flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Muhurta Yatra</h2>

        <nav className="flex flex-col gap-4 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 bg-gray-50">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome, Traveller 👋</h1>
            <p className="text-gray-600">Here’s your travel overview</p>
          </div>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            onClick={() => window.location.href = "/"}
          >
            Logout
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold">My Trips</h2>
            <p className="text-gray-600">View your planned journeys</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold">Explore</h2>
            <p className="text-gray-600">Discover new destinations</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold">Personalized</h2>
            <p className="text-gray-600">AI-based recommendations</p>
          </div>

        </div>

      </div>
    </div>
  );
}