import { Home, Plus, Package } from "lucide-react";

interface AdminSidebarProps {
  activeTab: 'dashboard' | 'add-package' | 'manage-packages';
  setActiveTab: (tab: 'dashboard' | 'add-package' | 'manage-packages') => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  activeTab,
  setActiveTab,
  isSidebarOpen,
  setIsSidebarOpen,
}: AdminSidebarProps) {
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#1A1714] text-white transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex flex-col`}
      >
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#C75B2A] text-xl">
            ✈️
          </div>
          <div className="font-serif text-lg font-bold leading-tight">
            Travel
            <br />
            <span className="block text-[10px] uppercase tracking-widest text-white/50 font-sans mt-0.5">
              Admin Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 py-3 text-xs font-semibold tracking-widest uppercase text-[#8A7E74]">
            Main Menu
          </div>
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              activeTab === "dashboard"
                ? "bg-[#C75B2A] text-white font-medium"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Home className="w-5 h-5" /> Dashboard
          </button>
          <button
            onClick={() => {
              setActiveTab("add-package");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              activeTab === "add-package"
                ? "bg-[#C75B2A] text-white font-medium"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Plus className="w-5 h-5" /> Add Package
          </button>
          <button
            onClick={() => {
              setActiveTab("manage-packages");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
              activeTab === "manage-packages"
                ? "bg-[#C75B2A] text-white font-medium"
                : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Package className="w-5 h-5" /> Manage Packages
          </button>
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
