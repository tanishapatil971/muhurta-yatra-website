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
          <div className="w-10 h-10 border-4 border-[#C75B2A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#8A7E74] animate-pulse">Syncing package data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="max-w-md p-8 text-center bg-rose-50 border border-rose-100 rounded-2xl">
          <div className="text-3xl mb-4">🚫</div>
          <h3 className="text-lg font-bold text-rose-800 mb-2">Connection Error</h3>
          <p className="text-sm text-rose-600 mb-6">{error}</p>
          <button 
            onClick={fetchPackages}
            className="px-6 py-2 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">
          Manage Packages
        </h2>
        <p className="mt-1 text-sm text-[#8A7E74]">
          View, edit, or remove existing travel packages from your database.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFFCF7] border-[1.5px] border-[#EDE6D6] rounded-xl focus-within:border-[#C75B2A] transition-colors min-w-[280px]">
          <Search className="w-4 h-4 text-[#8A7E74]" />
          <input
            type="text"
            placeholder="Search destination..."
            className="w-full bg-transparent outline-none text-[15px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          onClick={() => setActiveTab("add-package")}
          className="flex items-center justify-center gap-2 px-5 py-2.5 font-bold text-white transition-all bg-[#C75B2A] rounded-xl shadow-[0_4px_14px_rgba(199,91,42,0.3)] hover:bg-[#B54E22] text-sm"
        >
          <Plus className="w-4 h-4" /> New Package
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
                      <button 
                        onClick={() => setActiveTab("add-package")}
                        className="mt-2 px-4 py-2 text-xs font-bold text-[#C75B2A] border border-[#C75B2A] rounded-lg hover:bg-[#C75B2A] hover:text-white transition-all"
                      >
                        + Add Your First Package
                      </button>
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
