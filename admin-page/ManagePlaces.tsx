import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Map } from "lucide-react";
import { API_ENDPOINTS } from "../landing-page/src/config/api";

type Place = {
  _id: string;
  idKey: string;
  categoryKey: string;
  name: string;
  img: string;
  desc: string;
  food: string;
  maxCapacity: number;
  pricePerPerson: number;
  departureInfo: string;
  travelDetails: string;
};

export default function ManagePlaces() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.places);
      if (res.ok) {
        const data = await res.json();
        setPlaces(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePlace = async (id: string) => {
    if (!confirm("Are you sure you want to delete this place?")) return;
    try {
      await fetch(`${API_ENDPOINTS.places}/${id}`, { method: 'DELETE' });
      fetchPlaces();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Manage Places</h2>
          <p className="text-sm text-gray-500 mt-1">
            Core destinations and sample itinerary configurations.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Place
        </button>
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500 animate-pulse">Loading places...</p>
      ) : (
        <div className="grid gap-4">
          {places.map((place) => (
            <div key={place._id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow">
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src={place.img} alt={place.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 truncate pr-4">{place.name}</h3>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-primary bg-gray-50 hover:bg-primary/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => deletePlace(place._id)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-500 font-medium mt-1 uppercase tracking-wider">{place.categoryKey}</p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-400">Price/Person</p>
                    <p className="text-sm font-semibold text-gray-900">₹{place.pricePerPerson}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Capacity</p>
                    <p className="text-sm font-semibold text-gray-900">{place.maxCapacity} px</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-400">Departure</p>
                    <p className="text-sm font-medium text-gray-700 truncate">{place.departureInfo}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {places.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
              <Map className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No core destinations available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
