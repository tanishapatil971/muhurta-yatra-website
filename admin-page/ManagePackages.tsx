import { useState, useEffect } from "react";
import { Search, Plus, Package } from "lucide-react";
import { API_ENDPOINTS } from "../landing-page/src/config/api";

interface TravelPackage {
  _id: string;
  destination: string;
  price: number;
  maxPeople: number;
  transport?: string;
  status?: string;
  emoji?: string;
}

export default function ManagePackages({
  setActiveTab,
}: {
  setActiveTab: (tab: 'dashboard' | 'add-package' | 'manage-packages' | 'enquiries') => void;
}) {
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.packages)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#C75B2A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#8A7E74] animate-pulse">Loading packages...</p>
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
          View, edit, or remove existing travel packages.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#FFFCF7] border-[1.5px] border-[#EDE6D6] rounded-xl focus-within:border-[#C75B2A] transition-colors min-w-[280px]">
          <Search className="w-4 h-4 text-[#8A7E74]" />
          <input
            type="text"
            placeholder="Search destination..."
            className="w-full bg-transparent outline-none text-[15px]"
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
            {packages.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-[#8A7E74]">
                  <div className="flex flex-col items-center gap-2">
                    <Package className="w-8 h-8 opacity-20" />
                    <p>No packages found in database.</p>
                  </div>
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
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
                      {pkg.destination}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">
                  ₹{(pkg.price || 0).toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">{pkg.maxPeople} pax</td>
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
                    <button className="px-3 py-1.5 text-xs font-semibold text-[#2A7AC7] bg-[#2A7AC7]/10 rounded-lg hover:bg-[#2A7AC7] hover:text-white transition-colors">
                      Edit
                    </button>
                    <button className="px-3 py-1.5 text-xs font-semibold text-[#C75B2A] bg-[#C75B2A]/10 rounded-lg hover:bg-[#C75B2A] hover:text-white transition-colors">
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
