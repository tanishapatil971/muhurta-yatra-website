import { useEffect, useState, useMemo } from "react";
import { Search, Filter, Phone, Mail, Clock, Inbox, ChevronDown, AlertCircle } from "lucide-react";
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
type FilterStatus = "all" | EnquiryStatus;

const STATUS_OPTIONS: EnquiryStatus[] = ["new", "contacted", "converted"];

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20",
  contacted: "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20",
  converted: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20",
};

// Fallback dummy data if backend is disconnected or auth fails
const DUMMY_ENQUIRIES: Enquiry[] = [
  {
    _id: "demo_1",
    name: "Aarav Sharma",
    phone: "+91 9876543210",
    email: "aarav.sharma@example.com",
    message: "I am looking for a 3-night package to Mahabaleshwar next week for my family.",
    status: "new",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "demo_2",
    name: "Priya Patel",
    phone: "+91 8765432109",
    status: "contacted",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    _id: "demo_3",
    name: "Rohan Deshmukh",
    phone: "+91 7654321098",
    email: "rohan.d@example.com",
    message: "Booking confirmed! Please send the itinerary details to my email.",
    status: "converted",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  }
];

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Filters state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    setIsDemoMode(false);
    try {
      const res = await fetch(API_ENDPOINTS.enquiries, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("Unauthorized: Please log in to view real enquiries.");
        }
        throw new Error("Backend connection failed: Loading mock data.");
      }
      const data: Enquiry[] = await res.json();
      setEnquiries(data);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errMsg);
      // Fallback to demo data
      setEnquiries(DUMMY_ENQUIRIES);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    if (isDemoMode) {
      // Optimistic update for demo mode
      setEnquiries((prev: Enquiry[]) => prev.map((e: Enquiry) => e._id === id ? { ...e, status: newStatus } : e));
      return;
    }

    setUpdatingId(id);
    try {
      const res = await fetch(`${API_ENDPOINTS.enquiries}/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      // Refresh UI after update
      await fetchEnquiries();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq: Enquiry) => {
      const matchName = (enq.name || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === "all" || enq.status === statusFilter;
      return matchName && matchStatus;
    });
  }, [enquiries, searchTerm, statusFilter]);

  const handleAutoLogin = async () => {
    // @ts-ignore
    if (window.tempLogin) {
      // @ts-ignore
      await window.tempLogin();
      fetchEnquiries();
    } else {
      alert("tempLogin utility not loaded.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading enquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 tracking-tight">Leads Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="inline-flex items-center justify-center bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-medium">
              {enquiries.length} Total
            </span>
            <span>managing all customer enquiries</span>
          </p>
        </div>
        <button
          onClick={fetchEnquiries}
          className="px-4 py-2.5 text-sm bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition shadow-sm font-medium inline-flex items-center gap-2"
        >
          <Clock className="w-4 h-4 text-gray-400" />
          Refresh Data
        </button>
      </div>

      {isDemoMode && error && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-amber-800">Showing Demo Data ({error})</h3>
              <p className="text-xs text-amber-700 mt-1">If you are seeing this, either your backend MongoDB is offline or you are not logged in. Demo leads are shown below.</p>
            </div>
          </div>
          {error.includes("Unauthorized") && (
            <button
              onClick={handleAutoLogin}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              Auto-login as Admin
            </button>
          )}
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col md:flex-row gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative z-10 w-full overflow-visible">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search leads by name..." 
            className="pl-10 pr-4 py-2.5 w-full border border-gray-200 rounded-xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm bg-gray-50/50 hover:bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-56">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select 
            className="pl-10 pr-10 py-2.5 w-full border border-gray-200 rounded-xl appearance-none focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm bg-gray-50/50 hover:bg-white cursor-pointer font-medium text-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
          >
            <option value="all">All Statuses</option>
            <option value="new">New Leads</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table Area */}
      {enquiries.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
            <Inbox className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">No enquiries database</h3>
          <p className="text-gray-500 mt-2 max-w-sm">
            When users submit the contact form, their leads will appear here.
          </p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-gray-500 font-medium">No results found matching your filters.</p>
          <button 
            onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}
            className="mt-4 text-primary hover:underline font-medium text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto pb-2">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 border-b border-gray-200">
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Lead Info</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 font-semibold text-xs uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredEnquiries.map((enq: Enquiry) => (
                  <tr key={enq._id} className="hover:bg-gray-50/50 transition-colors group">
                    {/* Name & Date Area */}
                    <td className="px-6 py-5 align-top min-w-[200px]">
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray-900">{enq.name || "Anonymous"}</span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" />
                          {enq.createdAt && !isNaN(new Date(enq.createdAt).getTime()) 
                            ? new Date(enq.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
                              })
                            : "Unknown time"}
                        </div>
                        {enq.message && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                            {enq.message}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Contact Methods */}
                    <td className="px-6 py-5 align-top min-w-[180px]">
                      <div className="flex flex-col gap-2.5 text-sm">
                        {enq.phone ? (
                          <a 
                            href={`tel:${enq.phone}`} 
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-primary font-medium transition-colors w-max"
                          >
                            <Phone className="w-4 h-4 text-gray-400" />
                            {enq.phone}
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-gray-400 italic">
                            <Phone className="w-4 h-4 text-gray-200" />
                            No phone
                          </span>
                        )}
                        {enq.email ? (
                          <a 
                            href={`mailto:${enq.email}`}
                            className="inline-flex items-center gap-2 text-gray-700 hover:text-primary transition-colors flex-wrap break-all"
                          >
                            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <span className="break-all truncate max-w-[150px]">{enq.email}</span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-gray-400 italic">
                            <Mail className="w-4 h-4 opacity-50" />
                            No email
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-5 align-top min-w-[120px]">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ring-4 border-transparent uppercase tracking-wide ${STATUS_STYLES[enq.status] || "bg-gray-100 text-gray-600"}`}>
                        {enq.status}
                      </span>
                    </td>

                    {/* Actions / Status Update Dropdown */}
                    <td className="px-6 py-5 align-top text-right min-w-[150px]">
                      <div className="inline-flex relative">
                        <select
                          value={enq.status}
                          disabled={updatingId === enq._id}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value as EnquiryStatus)}
                          className="pl-4 pr-9 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 appearance-none outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-wait"
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>
                              Mark {s}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                      {updatingId === enq._id && (
                        <p className="text-xs text-primary font-medium mt-2 animate-pulse">Updating...</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
