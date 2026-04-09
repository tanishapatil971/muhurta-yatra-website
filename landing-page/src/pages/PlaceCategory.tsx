import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronRight, Download, MapPin, Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT } from "@/config/contact";
import { API_ENDPOINTS } from "@/config/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface PlaceInfo {
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
}

export default function PlaceCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const [places, setPlaces] = useState<PlaceInfo[]>([]);
  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(true);
  
  const contactHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  useEffect(() => {
    const fetchCategoryPlaces = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_ENDPOINTS.places}?category=${category}`);
        if (!res.ok) throw new Error("Failed to fetch places");
        
        const data = await res.json();
        setPlaces(data);
        if (data.length > 0) {
          setSelected(data[0].idKey);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (category) {
      fetchCategoryPlaces();
    }
  }, [category]);

  const place = places.find(p => p.idKey === selected);

  const generatePDF = (placeData: PlaceInfo) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFillColor(30, 64, 175); // Brand Blue
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Muhurta Yatra", 15, 20);
    
    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(`Official Itinerary: ${placeData.name}`, 15, 45);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    const splitDesc = doc.splitTextToSize(placeData.desc, 180);
    doc.text(splitDesc, 15, 55);

    // Details Grid
    let currentY = 60 + (splitDesc.length * 6);
    
    doc.setFont("helvetica", "bold");
    doc.text("Trip Details", 15, currentY);
    currentY += 10;
    
    const detailsBody = [
      ["Best Time", placeData.bestTime, "Distance", placeData.distance],
      ["Departure", placeData.departureInfo, "Transport", placeData.travelDetails],
      ["Max Capacity", `${placeData.maxCapacity} People`, "Price / Person", `Rs. ${placeData.pricePerPerson}`],
      ["Food Included", placeData.food, "", ""]
    ];

    autoTable(doc, {
      startY: currentY,
      body: detailsBody,
      theme: 'grid',
      headStyles: { fillColor: [240, 240, 240] },
      styles: { fontSize: 10, cellPadding: 4 }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Highlights
    doc.setFont("helvetica", "bold");
    doc.text("Key Highlights", 15, currentY);
    currentY += 10;
    
    const highlightsBody = placeData.highlights.map(h => ["•", h]);
    autoTable(doc, {
      startY: currentY,
      body: highlightsBody,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2 },
      columnStyles: { 0: { cellWidth: 10 } }
    });

    currentY = (doc as any).lastAutoTable.finalY + 15;

    // Day-wise Itinerary
    doc.setFont("helvetica", "bold");
    doc.text("Day-wise Plan", 15, currentY);
    currentY += 10;

    const itineraryBody = placeData.itinerary.map(day => {
      const parts = day.split(':');
      if (parts.length > 1) {
        return [parts[0].trim(), parts.slice(1).join(':').trim()];
      }
      return ["*", day];
    });

    autoTable(doc, {
      startY: currentY,
      body: itineraryBody,
      theme: 'striped',
      head: [["Day", "Schedule"]],
      headStyles: { fillColor: [30, 64, 175], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: { 0: { cellWidth: 30, fontStyle: 'bold' } }
    });
    
    // Save
    doc.save(`${placeData.name.replace(/\s+/g, '_')}_Itinerary.pdf`);
  };

  // Determine title from URL param for breadcrumb mapping
  const titles: Record<string, string> = { forts: "Forts", hills: "Hill Stations", beaches: "Beaches", pilgrim: "Pilgrim Sites" };
  const currentTitle = category ? titles[category] : "Places";

  if (!loading && places.length === 0) {
    return (
      <main className="section-padding bg-background min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Category not found or empty</h1>
          <Button variant="hero" asChild><Link to="/places">← Back to Places</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/places" className="hover:text-primary transition-colors">Places</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{currentTitle}</span>
        </div>
      </div>

      <div className="container-wide px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24">
              <button onClick={() => navigate("/places")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                <ArrowLeft className="h-4 w-4" /> All Categories
              </button>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{currentTitle}</h2>
              <nav className="space-y-1" aria-label="Place list">
                {places.map((p) => (
                  <button
                    key={p.idKey}
                    onClick={() => { setSelected(p.idKey); }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      selected === p.idKey
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          {loading && <div className="flex-1 min-w-0 p-10 animate-pulse bg-gray-50 rounded-2xl h-[500px]"></div>}
          
          {!loading && place && (
            <div className="flex-1 min-w-0">
              <ScrollReveal key={selected}>
                {/* Hero image */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8">
                  <img src={place.img} alt={place.name} className="w-full h-full object-cover" loading="lazy" />
                </div>

                <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{place.name}</h1>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    {place.distance}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    {place.bestTime}
                  </div>
                </div>

                <p className="text-foreground/80 text-base leading-relaxed mb-8">{place.desc}</p>

                {/* Optional rendering of detailed features */}
                {(place.pricePerPerson > 0 || place.maxCapacity > 0) && (
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                     <div className="p-4 bg-muted rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Capacity</p>
                        <p className="text-sm font-bold">{place.maxCapacity} px</p>
                     </div>
                     <div className="p-4 bg-muted rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Price</p>
                        <p className="text-sm font-bold">₹{place.pricePerPerson}</p>
                     </div>
                     <div className="col-span-2 p-4 bg-muted rounded-xl">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Transport</p>
                        <p className="text-sm font-semibold truncate">{place.travelDetails}</p>
                     </div>
                   </div>
                )}

                {/* Highlights */}
                <div className="glass-card p-6 mb-8">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Highlights</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {place.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                        <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Itinerary */}
                <Button
                  variant="hero"
                  size="lg"
                  className="mb-6 cursor-pointer"
                  onClick={() => generatePDF(place)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Sample Itinerary
                </Button>

                {/* Book CTA */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Want to visit {place.name}?</h3>
                  <p className="text-muted-foreground text-sm mb-4">Let us plan the perfect trip for you.</p>
                  <Button variant="hero" size="lg" asChild>
                    <a href={contactHref}>Book This Trip</a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
