import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../landing-page/src/config/api";

type Place = {
  _id: string;
  idKey: string;
  categoryKey: string;
  name: string;
  img: string;
  desc: string;
  highlights: string[];
  bestTime: string;
  distance: string;
  itinerary: string[];
  food: string;
  maxCapacity: number;
  pricePerPerson: number;
  departureInfo: string;
  travelDetails: string;
};

interface AddPlaceProps {
  isEditing?: boolean;
  editData?: Place | null;
  onDone?: () => void;
}

export default function AddPlace({ 
  isEditing = false, 
  editData = null, 
  onDone = () => {} 
}: AddPlaceProps) {
  const [formData, setFormData] = useState({
    idKey: "",
    categoryKey: "forts",
    name: "",
    img: "",
    desc: "",
    highlights: "",
    bestTime: "",
    distance: "",
    itinerary: "",
    food: "",
    maxCapacity: "",
    pricePerPerson: "",
    departureInfo: "",
    travelDetails: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && editData) {
      setFormData({
        idKey: editData.idKey || "",
        categoryKey: editData.categoryKey || "forts",
        name: editData.name || "",
        img: editData.img || "",
        desc: editData.desc || "",
        highlights: Array.isArray(editData.highlights) ? editData.highlights.join(", ") : "",
        bestTime: editData.bestTime || "",
        distance: editData.distance || "",
        itinerary: Array.isArray(editData.itinerary) ? editData.itinerary.join("\n") : "",
        food: editData.food || "",
        maxCapacity: String(editData.maxCapacity || ""),
        pricePerPerson: String(editData.pricePerPerson || ""),
        departureInfo: editData.departureInfo || "",
        travelDetails: editData.travelDetails || ""
      });
    }
  }, [isEditing, editData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setError("");

    try {
      const url = isEditing && editData?._id 
        ? `${API_ENDPOINTS.places}/${editData._id}` 
        : API_ENDPOINTS.places;
      
      const method = isEditing ? "PATCH" : "POST";

      const res = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          pricePerPerson: Number(formData.pricePerPerson) || 0,
          maxCapacity: Number(formData.maxCapacity) || 0,
          highlights: formData.highlights.split(",").map(s => s.trim()).filter(Boolean),
          itinerary: formData.itinerary.split("\n").map(s => s.trim()).filter(Boolean)
        })
      });

      if (res.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          setSuccess(false);
          onDone();
        }, 1500);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to save destination.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-[#1A1714]">
            {isEditing ? "Edit Destination" : "Add New Destination"}
          </h2>
          <p className="mt-1 text-sm text-[#8A7E74]">Manage core destination details, logistics, and itineraries.</p>
        </div>
        <button onClick={onDone} className="text-sm font-bold text-[#8A7E74] uppercase tracking-wider hover:text-[#1A1714]">
          Cancel
        </button>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl font-bold text-sm uppercase tracking-wide">
          ✅ Destination saved successfully!
        </div>
      )}

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl font-bold text-sm uppercase tracking-wide">
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-8 bg-white border border-black/5 rounded-2xl shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Destination Name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="e.g. Sinhagad Fort" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">URL Slug / ID Key</label>
            <input name="idKey" value={formData.idKey} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="e.g. sinhagad-fort" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
            <select name="categoryKey" value={formData.categoryKey} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium">
              <option value="forts">Forts</option>
              <option value="hills">Hill Stations</option>
              <option value="beaches">Beaches</option>
              <option value="pilgrim">Pilgrim Sites</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Image URL</label>
            <input name="img" value={formData.img} onChange={handleChange} required className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="Unsplash URL preferred" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
          <textarea name="desc" value={formData.desc} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium" placeholder="Tell the story of this place..." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Price Per Person (₹)</label>
            <input name="pricePerPerson" type="number" value={formData.pricePerPerson} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Capacity</label>
            <input name="maxCapacity" type="number" value={formData.maxCapacity} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Best Time to Visit</label>
            <input name="bestTime" value={formData.bestTime} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="e.g. July - Sept" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Distance from City</label>
            <input name="distance" value={formData.distance} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="e.g. 50km from Pune" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Departure Point</label>
            <input name="departureInfo" value={formData.departureInfo} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all font-medium" placeholder="Pickup point" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Highlights (comma separated)</label>
            <textarea name="highlights" value={formData.highlights} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium" placeholder="Feature 1, Feature 2..." />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Itinerary (one per line)</label>
            <textarea name="itinerary" value={formData.itinerary} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-slate-50 border rounded-xl outline-none focus:ring-4 focus:ring-primary/10 transition-all resize-none font-medium" placeholder="Day 1: ...&#10;Day 2: ..." />
          </div>
        </div>

        <button type="submit" className="w-full py-4 bg-primary text-white font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20">
          {isEditing ? "🚀 Update Destination" : "✨ Save Destination"}
        </button>
      </form>
    </div>
  );
}
