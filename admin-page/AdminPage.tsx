import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";
import EnquiriesPage from "./EnquiriesPage";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("manage-packages");

  return (
    <div className="flex min-h-screen font-sans text-gray-900 bg-gray-50">
      {/* Sidebar on left */}
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* Content on right */}
      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {activeTab === "manage-packages" && (
            <ManagePackages setActiveTab={setActiveTab} />
          )}

          {activeTab === "add-package" && (
            <AddPackage />
          )}

          {activeTab === "enquiries" && (
            <EnquiriesPage />
          )}
        </div>
      </main>
    </div>
  );
}
