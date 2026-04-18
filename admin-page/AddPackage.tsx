import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../landing-page/src/config/api";
import { TravelPackage } from "./AdminPage";

interface AddPackageProps {
  isEditing?: boolean;
  editData?: TravelPackage | null;
  onDone?: () => void;
}

export default function AddPackage({ 
  isEditing = false, 
  editData = null, 
  onDone = () => {} 
}: AddPackageProps) {
  console.log("TRACING: Rendering AddPackage");
  const [formData, setFormData] = useState({
    destination: "",
    price: "",
    maxPeople: "",
    image: "",
    duration: "",
    description: "",
    itinerary: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [removeImage, setRemoveImage] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (isEditing && editData) {
      setFormData({
        destination: editData.destination || "",
        price: String(editData.price || ""),
        maxPeople: String(editData.maxPeople || ""),
        image: editData.image || "",
        duration: editData.duration || "",
        description: editData.description || "",
        itinerary: Array.isArray(editData.itinerary) ? editData.itinerary.join("\n") : ""
      });
      setRemoveImage(false);
    } else {
      // Reset form if not editing
      setFormData({
        destination: "",
        price: "",
        maxPeople: "",
        image: "",
        duration: "",
        description: "",
        itinerary: ""
      });
      setRemoveImage(false);
    }
  }, [isEditing, editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const uploadForm = new FormData();
      uploadForm.append("image", file);

      // Determine upload endpoint
      const uploadUrl = API_ENDPOINTS.packages.replace("/packages", "/upload"); 
      
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token") || ""}`
        },
        body: uploadForm
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Upload failed. Please check Cloudinary configuration.");
      }
      
      const data = await res.json();
      setFormData(prev => ({ ...prev, image: data.imageUrl }));
      setRemoveImage(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to upload image. Server may be unreachable.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    // Defensive check for missing API config
    if (!API_ENDPOINTS?.packages) {
      setError("API configuration error. Please contact support.");
      return;
    }

    try {
      const url = isEditing && editData?._id 
        ? `${API_ENDPOINTS.packages}/${editData._id}` 
        : API_ENDPOINTS.packages;
      
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price) || 0,
          maxPeople: Number(formData.maxPeople) || 1,
          itinerary: (formData.itinerary || "").split("\n").filter(line => line.trim() !== ""),
          removeImage: removeImage
        })
      });

      if (res.ok) {
        setSuccess(true);
        if (!isEditing) {
          setFormData({
            destination: "",
            price: "",
            maxPeople: "",
            image: "",
            duration: "",
            description: "",
            itinerary: ""
          });
        }
        
        // Auto hide success message and trigger completion
        setTimeout(() => {
          setSuccess(false);
          if (isEditing) onDone();
        }, 1500);

        // Scroll to top safely
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.message || "Failed to save package. Please try again.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Network error. Please check your connection and try again.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">
            {isEditing ? "Edit Package" : "Add Package"}
          </h2>
          <p className="mt-1 text-sm text-[#8A7E74]">
            {isEditing 
              ? "Update the details of the existing travel package." 
              : "Fill in the details below to list a new travel package."}
          </p>
        </div>
        {isEditing && (
          <button 
            onClick={onDone}
            className="px-4 py-2 text-sm font-bold text-[#8A7E74] uppercase tracking-wider hover:text-[#1A1714] transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="text-xl">✅</span>
            <p className="font-semibold text-sm uppercase tracking-wide">
              Package {isEditing ? "updated" : "added"} successfully!
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <p className="font-semibold text-sm uppercase tracking-wide">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 bg-[#FFFCF7] border border-black/5 rounded-2xl shadow-sm space-y-8">
        {/* Basic Info */}
        <div>
          <h3 className="flex items-center gap-2 pb-2 mb-6 text-lg font-serif font-bold border-b-2 border-[#EDE6D6]">
            <span>📍</span> Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1 md:col-span-2 space-y-2 mb-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Destination
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Manali, Himachal Pradesh"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Base Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 12000"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Max People
              </label>
              <input
                type="number"
                name="maxPeople"
                value={formData.maxPeople}
                onChange={handleChange}
                placeholder="e.g. 10"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
                required
              />
            </div>
          </div>
        </div>

        {/* Extended Info */}
        <div className="space-y-8">
          <h3 className="flex items-center gap-2 pb-2 mb-6 text-lg font-serif font-bold border-b-2 border-[#EDE6D6]">
            <span>✨</span> Extended Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Image URL
              </label>
              
              {/* Image Preview & Remove Logic */}
              {(formData.image || (isEditing && editData?.image && !removeImage)) && (
                <div className="relative w-full h-32 rounded-xl overflow-hidden border border-[#EDE6D6] group">
                  <img 
                    src={formData.image || editData?.image} 
                    alt="Package Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <button 
                      type="button"
                      onClick={() => {
                        setRemoveImage(true);
                        setFormData(prev => ({ ...prev, image: "" }));
                      }}
                      className="px-4 py-2 bg-rose-600 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:bg-rose-700 transition"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#C75B2A] file:text-white hover:file:bg-[#B54E22] cursor-pointer"
                />
                
                {uploading && (
                  <p className="text-xs text-[#C75B2A] font-bold animate-pulse mt-1 tracking-wider">
                    ☁️ Uploading securely to Cloudinary...
                  </p>
                )}

                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-400 font-medium">Or</span>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.value) setRemoveImage(false);
                    }}
                    placeholder="paste a URL directly as a fallback"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-[#EDE6D6] rounded-lg outline-none focus:border-gray-400 transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 5 Days 4 Nights"
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Brief summary of the package..."
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all resize-none"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold tracking-wider text-[#3D3630] uppercase">
                Itinerary (One day per line)
              </label>
              <textarea
                name="itinerary"
                value={formData.itinerary}
                onChange={handleChange}
                rows={5}
                placeholder="Day 1: Arrival & Sightseeing&#10;Day 2: Full day tour..."
                className="w-full px-4 py-3 bg-[#F5F0E8] border-[1.5px] border-[#EDE6D6] rounded-xl outline-none focus:border-[#C75B2A] focus:ring-4 focus:ring-[#C75B2A]/10 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 font-bold tracking-wide text-white uppercase transition-all bg-[#C75B2A] rounded-xl hover:bg-[#B54E22] hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(199,91,42,0.3)] hover:shadow-[0_6px_20px_rgba(199,91,42,0.4)] text-sm"
          >
            {isEditing ? "🚀 Update Package" : "✈️ Add Package"}
          </button>
          
          {isEditing && (
            <button 
              type="button"
              onClick={onDone}
              className="px-6 py-3 font-bold tracking-wide text-[#8A7E74] uppercase border-[1.5px] border-[#EDE6D6] rounded-xl hover:bg-[#EDE6D6] transition-all text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
