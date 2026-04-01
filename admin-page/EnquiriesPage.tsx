import { useEffect, useState } from "react";

// API_ENDPOINTS lives in the landing-page src since the admin panel is built
// inside the same Vite project (admins access /admin route in the landing app).
import { API_ENDPOINTS } from "../landing-page/src/config/api";

interface Enquiry {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  status: "new" | "contacted" | "converted";
  createdAt: string;
}

type EnquiryStatus = Enquiry["status"];

const STATUS_OPTIONS: EnquiryStatus[] = ["new", "contacted", "converted"];

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  converted: "bg-green-100 text-green-800",
};

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ENDPOINTS.enquiries);
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data: Enquiry[] = await res.json();
      setEnquiries(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`${API_ENDPOINTS.enquiries}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      await fetchEnquiries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#C75B2A] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-[#8A7E74]">Loading enquiries…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={fetchEnquiries}
          className="px-5 py-2 bg-[#C75B2A] text-white rounded-xl text-sm hover:bg-[#b04d24] transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-serif font-semibold text-[#1A1714]">Lead Enquiries</h2>
          <p className="text-sm text-[#8A7E74] mt-1">
            {enquiries.length} enquir{enquiries.length === 1 ? "y" : "ies"} total
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-4 py-2 text-sm bg-[#EDE6D6] text-[#3D3630] rounded-xl hover:bg-[#e0d5c0] transition font-medium"
        >
          ↻ Refresh
        </button>
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-20 text-[#8A7E74]">
          <p className="text-4xl mb-3">📬</p>
          <p className="font-medium">No enquiries yet</p>
          <p className="text-sm mt-1">
            New leads will appear here once visitors submit the contact form.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-[#EDE6D6] shadow-sm bg-[#FFFCF7]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#EDE6D6] text-[#3D3630] text-left">
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold hidden sm:table-cell">Email</th>
                <th className="px-5 py-3 font-semibold hidden md:table-cell">Message</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold hidden lg:table-cell">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE6D6]">
              {enquiries.map((enq: Enquiry) => (
                <tr key={enq._id} className="hover:bg-[#FAF7F0] transition-colors">
                  <td className="px-5 py-4 font-medium text-[#1A1714]">{enq.name}</td>
                  <td className="px-5 py-4 text-[#3D3630]">
                    <a href={`tel:${enq.phone}`} className="hover:text-[#C75B2A] transition-colors">
                      {enq.phone}
                    </a>
                  </td>
                  <td className="px-5 py-4 text-[#3D3630] hidden sm:table-cell">
                    {enq.email ? (
                      <a
                        href={`mailto:${enq.email}`}
                        className="hover:text-[#C75B2A] transition-colors"
                      >
                        {enq.email}
                      </a>
                    ) : (
                      <span className="text-[#8A7E74] italic">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-[#8A7E74] hidden md:table-cell max-w-xs truncate">
                    {enq.message ? enq.message : <span className="italic">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <select
                      value={enq.status}
                      disabled={updatingId === enq._id}
                      onChange={(e) =>
                        handleStatusChange(enq._id, e.target.value as EnquiryStatus)
                      }
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-wait ${STATUS_STYLES[enq.status]}`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-[#8A7E74] hidden lg:table-cell whitespace-nowrap">
                    {new Date(enq.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
