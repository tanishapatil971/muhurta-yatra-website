import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Overview from "./Overview";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";

export default function AdminLayout() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add-package' | 'manage-packages'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F5F0E8] font-sans text-[#1A1714]">
      {/* Sidebar Component */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#FFFCF7] border-b border-[#EDE6D6]">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 bg-[#EDE6D6] rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              ☰
            </button>
            <h1 className="text-xl font-serif font-semibold">
              {activeTab === "dashboard" && "Overview"}
              {activeTab === "add-package" && "Add Package"}
              {activeTab === "manage-packages" && "Manage Packages"}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-1.5 text-sm font-medium bg-[#EDE6D6] rounded-full text-[#3D3630]">
              🌍 Admin
            </span>
            <div className="flex items-center justify-center w-10 h-10 font-bold text-white rounded-full bg-gradient-to-br from-[#C75B2A] to-[#E88040]">
              A
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 p-6 md:p-8">
          {activeTab === "dashboard" && <Overview />}
          {activeTab === "add-package" && <AddPackage />}
          {activeTab === "manage-packages" && (
            <ManagePackages setActiveTab={setActiveTab} />
          )}
        </div>
      </main>
    </div>
  );
}
