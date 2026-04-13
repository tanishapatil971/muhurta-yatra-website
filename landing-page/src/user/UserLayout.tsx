import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Map, 
  Compass, 
  Star, 
  LogOut, 
  User as UserIcon,
  Search,
  LayoutDashboard
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", path: "/my-trips", icon: Map },
    { name: "Explore New", path: "/explore", icon: Compass },
    { name: "Wishlist", path: "/personalized", icon: Star },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-background font-sans text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 text-white p-6 flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.05)] border-r border-slate-900/50 fixed inset-y-0 left-0 z-20">
        <div className="flex items-center gap-3 mb-10 px-2 transition-transform hover:scale-105">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-primary/20">M</div>
          <h2 className="text-xl font-heading font-black tracking-tight text-white">Muhurta Yatra</h2>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-2 px-2">Traveller Menu</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : "group-hover:scale-110 transition-transform"}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
           <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-rose-400 transition-colors uppercase text-xs font-bold tracking-widest group"
          >
            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Logout Account
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pl-64">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shadow-sm sticky top-0 z-10 box-border">
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Find destinations, bookings..." 
                className="pl-11 pr-4 py-2.5 bg-slate-100/50 border border-transparent focus:border-primary/20 rounded-xl text-sm w-full focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="flex flex-col text-right">
                <h1 className="text-sm font-black text-slate-900 leading-tight">Welcome, {user?.name || 'Traveller'}</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-200 shadow-sm group cursor-pointer hover:border-primary transition-colors">
                 <UserIcon className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
              </div>
            </div>
            
            <Link to="/" className="text-xs font-black text-primary hover:text-primary/80 transition-colors uppercase tracking-[0.2em] border-b-2 border-primary/20 hover:border-primary pb-0.5">Website</Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
