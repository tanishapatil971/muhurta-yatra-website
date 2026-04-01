import { Search, Plus } from "lucide-react";

export default function ManagePackages({
  setActiveTab,
}: {
  setActiveTab: (tab: 'dashboard' | 'add-package' | 'manage-packages' | 'enquiries') => void;
}) {
  // Dummy packages
  const packages = [
    { id: 1, destination: "Manali", price: 12000, maxPeople: 10, transport: "Bus", status: "Active", emoji: "🏔️" },
    { id: 2, destination: "Goa", price: 18000, maxPeople: 8, transport: "Flight", status: "Active", emoji: "🏖️" },
    { id: 3, destination: "Kerala", price: 15000, maxPeople: 12, transport: "Train", status: "Active", emoji: "🌴" },
    { id: 4, destination: "Ladakh", price: 22000, maxPeople: 6, transport: "Flight", status: "Inactive", emoji: "⛰️" },
  ];

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
            {packages.map((pkg) => (
              <tr
                key={pkg.id}
                className="transition-colors hover:bg-[#F5F0E8]/50"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 text-lg text-white rounded-lg bg-gradient-to-br from-[#C75B2A] to-[#E88040]">
                      {pkg.emoji}
                    </div>
                    <span className="font-medium text-[#1A1714]">
                      {pkg.destination}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">
                  ₹{pkg.price.toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">{pkg.maxPeople} pax</td>
                <td className="px-6 py-4">{pkg.transport}</td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-full ${
                      pkg.status === "Active"
                        ? "bg-[#27A66C]/10 text-[#27A66C]"
                        : "bg-[#C75B2A]/10 text-[#C75B2A]"
                    }`}
                  >
                    {pkg.status}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
