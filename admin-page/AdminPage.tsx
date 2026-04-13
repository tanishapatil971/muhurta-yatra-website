import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "./AdminSidebar";
import AddPackage from "./AddPackage";
import ManagePackages from "./ManagePackages";
import EnquiriesPage from "./EnquiriesPage";
import ManagePlaces from "./ManagePlaces";
import AddPlace from "./AddPlace";
import AdminLayout from "./AdminLayout";
import { useAuth } from "../landing-page/src/context/AuthContext";
import { useNavigate } from "react-router-dom";
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

export type AdminTab = "manage-packages" | "add-package" | "enquiries" | "manage-places" | "add-place";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<AdminTab>("manage-packages");
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<TravelPackage | null>(null);
  
  const [isPlaceEditing, setIsPlaceEditing] = useState(false);
  const [placeEditData, setPlaceEditData] = useState<any | null>(null);
  
  // 🏷️ Page Title Mapping
  const TAB_TITLES: Record<AdminTab, string> = {
    "manage-packages": "Manage Packages",
    "add-package": isEditing ? "Edit Travel Package" : "Create New Package",
    "enquiries": "Enquiry Dashboard",
    "manage-places": "Explore Database",
    "add-place": isPlaceEditing ? "Edit Destination" : "Add New Destination",
  };

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

  const handlePlaceEdit = (place: any) => {
    setIsPlaceEditing(true);
    setPlaceEditData(place);
    setActiveTab("add-place");
  };

  const handlePlaceDone = () => {
    setIsPlaceEditing(false);
    setPlaceEditData(null);
    setActiveTab("manage-places");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AdminLayout
      title={TAB_TITLES[activeTab]}
      adminName={user?.name || "Administrator"}
      adminEmail={user?.email || "admin@yatra.com"}
      onLogout={handleLogout}
      activeTab={activeTab}
      setActiveTab={(tab) => {
        window.scrollTo(0, 0);
        setActiveTab(tab as AdminTab);
      }}
    >
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

      {activeTab === "manage-places" && (
        <ManagePlaces 
          onEdit={handlePlaceEdit}
          setActiveTab={(tab) => {
            setIsPlaceEditing(false);
            setPlaceEditData(null);
            setActiveTab(tab as AdminTab);
          }}
        />
      )}

      {activeTab === "add-place" && (
        <AddPlace 
          isEditing={isPlaceEditing}
          editData={placeEditData}
          onDone={handlePlaceDone}
        />
      )}
    </AdminLayout>
  );
}
