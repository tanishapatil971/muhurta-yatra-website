import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";
import EnquiriesPage from "./EnquiriesPage";
import { API_ENDPOINTS } from "../landing-page/src/config/api";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("manage-packages");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  // Central Package State
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API_ENDPOINTS.packages);
      if (!res.ok) throw new Error("Failed to fetch packages");
      const data = await res.json();
      setPackages(data);
    } catch (err: any) {
      console.error("Error fetching packages:", err);
      setError("Unable to load travel packages. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleEdit = (pkg: any) => {
    setIsEditing(true);
    setEditData(pkg);
    setActiveTab("add-package");
  };

  const handleDone = () => {
    setIsEditing(false);
    setEditData(null);
    setActiveTab("manage-packages");
    fetchPackages(); // Ensure we get fresh data after any Add/Edit
  };

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
            <ManagePackages 
              packages={packages}
              loading={loading}
              error={error}
              fetchPackages={fetchPackages}
              setActiveTab={setActiveTab} 
              onEdit={handleEdit} 
            />
          )}

          {activeTab === "add-package" && (
            <AddPackage 
              isEditing={isEditing} 
              editData={editData} 
              onDone={handleDone} 
            />
          )}

          {activeTab === "enquiries" && (
            <EnquiriesPage />
          )}
        </div>
      </main>
    </div>
  );
}
