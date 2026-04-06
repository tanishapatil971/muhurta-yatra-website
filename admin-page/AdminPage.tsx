import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";
import EnquiriesPage from "./EnquiriesPage";
import { API_ENDPOINTS } from "../landing-page/src/config/api";

// 🏆 Define strict types to prevent runtime errors
export interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  maxPeople: number;
  image?: string;
  duration?: string;
  description?: string;
  itinerary?: string[];
  status?: string;
  emoji?: string;
  transport?: string;
}

export type AdminTab = "manage-packages" | "add-package" | "enquiries";

export default function AdminPage() {
  console.log("TRACING: Rendering AdminPage");
  const [activeTab, setActiveTab] = useState<AdminTab>("manage-packages");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<TravelPackage | null>(null);
  
  // Central Package State - typed strictly
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPackages = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      if (!API_ENDPOINTS || !API_ENDPOINTS.packages) {
        throw new Error("API configuration is missing.");
      }
      
      const res = await fetch(API_ENDPOINTS.packages);
      if (!res.ok) throw new Error("Failed to fetch packages from server.");
      
      const data = await res.json();
      // Defensive check: ensure data is an array before setting state
      if (Array.isArray(data)) {
        setPackages(data);
      } else {
        console.error("API returned non-array data:", data);
        setPackages([]);
      }
    } catch (err: any) {
      console.error("Error fetching packages:", err);
      setError(err.message || "Unable to load travel packages. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleEdit = (pkg: TravelPackage) => {
    setIsEditing(true);
    setEditData(pkg);
    setActiveTab("add-package");
  };

  const handleDone = () => {
    setIsEditing(false);
    setEditData(null);
    setActiveTab("manage-packages");
    fetchPackages(); // Refresh data
  };

  return (
    <div className="flex min-h-screen font-sans text-gray-900 bg-gray-50">
      {/* Sidebar on left */}
      <aside className="w-64 bg-white border-r border-gray-200 shrink-0">
        <AdminSidebar 
          activeTab={activeTab} 
          setActiveTab={(tab) => setActiveTab(tab as AdminTab)} 
        />
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
              setActiveTab={(tab) => setActiveTab(tab as AdminTab)} 
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
