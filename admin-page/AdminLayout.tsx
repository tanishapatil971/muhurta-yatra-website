import React from "react";
import { LogOut, User, Bell, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

interface AdminLayoutProps {
  title: string;
  adminName: string;
  adminEmail: string;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
}

export default function AdminLayout({
  title,
  adminName,
  adminEmail,
  onLogout,
  activeTab,
  setActiveTab,
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          adminName={adminName} 
          adminEmail={adminEmail} 
        />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">{title}</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-slate-100 border-transparent rounded-lg text-sm focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
              />
            </div>

            <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
              <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>

              <div className="flex items-center gap-3 ml-2">
                <div className="flex flex-col text-right hidden lg:flex">
                  <span className="text-xs font-bold text-slate-900 leading-none">{adminName}</span>
                  <span className="text-[10px] text-slate-500 mt-1">{adminEmail}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group relative">
                  <User className="w-5 h-5 text-primary" />
                </div>
                
                <button 
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all ml-2 group"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
