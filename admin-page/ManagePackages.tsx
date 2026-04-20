import { useState } from "react";
import { Search, Plus, Package as PackageIcon } from "lucide-react";
import { API_ENDPOINTS } from "../landing-page/src/config/api";
import { TravelPackage, AdminTab } from "./AdminPage";

interface ManagePackagesProps {
  packages: TravelPackage[];
  loading: boolean;
  error: string;
  fetchPackages: () => void;
  setActiveTab: (tab: AdminTab) => void;
  onEdit: (pkg: TravelPackage) => void;
}

export default function ManagePackages({
  packages = [], // Default to empty array
  loading,
  error,
  fetchPackages,
  setActiveTab,
  onEdit,
}: ManagePackagesProps) {
  console.log("TRACING: Rendering ManagePackages");
  const [searchTerm, setSearchTerm] = useState("");
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (!window.confirm("This will populate your database with professional travel data. Proceed?")) return;
    
    setSeeding(true);
    try {
      const res = await fetch(`${API_ENDPOINTS.places.replace("/places", "/seed")}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`
        }
      });
      
      if (res.ok) {
        alert("✅ Database seeded successfully!");
        fetchPackages();
      } else {
        const data = await res.json();
        alert(`❌ Seed failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Seed error:", err);
      alert("❌ Server unreachable. Please check your connection.");
    } finally {
      setSeeding(false);
    }
  };

  const filteredPackages = (packages || []).filter(pkg => 
    (pkg.destination || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;

    try {
      const res = await fetch(`${API_ENDPOINTS.packages}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Package deleted successfully");
        fetchPackages(); // Trigger refresh in parent
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.message || "Failed to delete package"}`);
      }
    } catch (err) {
      console.error("Error deleting package:", err);
      alert("Server error. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Syncing Destinations...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="max-w-md p-10 text-center bg-rose-50 border border-rose-100 rounded-[2.5rem] shadow-xl shadow-rose-900/5">
          <div className="text-4xl mb-6">🚫</div>
          <h3 className="text-xl font-black text-rose-900 mb-2 tracking-tight">Access Denied / Error</h3>
          <p className="text-sm text-rose-600 mb-8 leading-relaxed font-medium">{error}</p>
          <button 
            onClick={fetchPackages}
            className="w-full py-3 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 uppercase text-xs tracking-widest"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 px-4 py-2 bg-white border border-slate-200 rounded-xl focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition-all min-w-[320px] shadow-sm">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by destination name..."
            className="w-full bg-transparent outline-none text-sm font-medium py-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setActiveTab("add-package")}
          className="flex items-center justify-center gap-2 px-6 py-3 font-black text-white transition-all bg-primary rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 active:translate-y-0 text-xs uppercase tracking-widest"
        >
          <Plus className="w-4 h-4" /> Create New Yatra
        </button>
      </div>

      <div className="bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-[#F5F0E8] text-[11px] uppercase tracking-wider text-[#8A7E74] font-semibold">
              <th className="px-6 py-4 rounded-tl-2xl">Destination</th>
              <th className="px-6 py-4">Base Price</th>
              <th className="px-6 py-4">Max People</th>
              <th className="px-6 py-4">Transport</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 rounded-tr-2xl">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDE6D6] text-sm text-[#3D3630]">
            {filteredPackages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-[#8A7E74]">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-gray-100 rounded-full">
                      <PackageIcon className="w-8 h-8 opacity-40 text-gray-400" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-gray-900">No packages found</p>
                      <p className="text-xs">
                        {searchTerm ? "Try a different search term" : "Your travel package database is currently empty."}
                      </p>
                    </div>
                    {!searchTerm && (
                      <div className="flex flex-col gap-2 mt-4">
                        <button 
                          onClick={() => setActiveTab("add-package")}
                          className="px-4 py-2 text-xs font-bold text-[#C75B2A] border border-[#C75B2A] rounded-lg hover:bg-[#C75B2A] hover:text-white transition-all shadow-sm"
                        >
                          + Add Your First Package
                        </button>
                        <button 
                          onClick={handleSeed}
                          disabled={seeding}
                          className="px-4 py-2 text-xs font-bold text-emerald-600 border border-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all shadow-sm disabled:opacity-50"
                        >
                          {seeding ? "🌱 Seeding..." : "✨ Seed Professional Data"}
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredPackages.map((pkg) => (
                <tr
                  key={pkg._id}
                  className="transition-colors hover:bg-[#F5F0E8]/50"
                >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-lg bg-gradient-to-br from-[#C75B2A] to-[#E88040]">
                      {pkg.emoji || "✈️"}
                    </div>
                    <span className="font-medium text-[#1A1714]">
                      {pkg.destination || "Unknown"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">
                  ₹{(pkg.price || 0).toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">{(pkg.maxPeople || 0)} pax</td>
                <td className="px-6 py-4">{pkg.transport || "General"}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full ${
                      (pkg.status || "Active") === "Active"
                        ? "bg-[#27A66C]/10 text-[#27A66C]"
                        : "bg-[#C75B2A]/10 text-[#C75B2A]"
                    }`}
                  >
                    {pkg.status || "Active"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onEdit(pkg)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#2A7AC7] bg-[#2A7AC7]/10 rounded-lg hover:bg-[#2A7AC7] hover:text-white transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(pkg._id)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#C75B2A] bg-[#C75B2A]/10 rounded-lg hover:bg-[#C75B2A] hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
