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
  const [error, setError] = useState<string | null>(null);
  
  const contactHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

  const fetchCategoryPlaces = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_ENDPOINTS.places}?category=${category}`);
      if (!res.ok) {
        if (res.status === 503) throw new Error("Server is connecting to database. Please wait...");
        throw new Error("Failed to fetch places");
      }
      
      const data = await res.json();
      setPlaces(data);
      if (data.length > 0) {
        setSelected(data[0].idKey);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Connection Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchCategoryPlaces();
    }
  }, [category]);

  const place = places.find(p => p.idKey === selected);

  const generatePDF = (placeData: PlaceInfo) => {
    const doc = new jsPDF();
    const pageW = 210;
    const gold = [212, 175, 55] as [number, number, number];
    const navy = [15, 30, 80] as [number, number, number];
    const darkGray = [45, 45, 60] as [number, number, number];
    const lightGray = [248, 248, 252] as [number, number, number];
    const white = [255, 255, 255] as [number, number, number];

    // ── COVER HEADER ──────────────────────────────────────────────
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 55, 'F');

    // Gold accent bar
    doc.setFillColor(...gold);
    doc.rect(0, 52, pageW, 3, 'F');

    // Brand name
    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setCharSpace(3);
    doc.text("MUHURTA YATRA", 15, 16);
    doc.setCharSpace(0);

    // Tagline
    doc.setTextColor(200, 210, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("HANDCRAFTED JOURNEYS ACROSS INDIA", 15, 22);

    // Destination name (large)
    doc.setTextColor(...white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(placeData.name, 15, 42);

    // Document label (top right)
    doc.setTextColor(...gold);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("SAMPLE ITINERARY", pageW - 15, 16, { align: "right" });
    doc.setTextColor(180, 190, 220);
    doc.setFontSize(7);
    doc.text(new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }), pageW - 15, 22, { align: "right" });

    let y = 66;

    // ── DESCRIPTION ───────────────────────────────────────────────
    doc.setTextColor(...darkGray);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const desc = doc.splitTextToSize(placeData.desc, pageW - 30);
    doc.text(desc, 15, y);
    y += desc.length * 5.5 + 8;

    // ── QUICK STATS ────────────────────────────────────────────────
    const stats = [
      { label: "PRICE / PERSON", value: `₹${placeData.pricePerPerson.toLocaleString()}` },
      { label: "MAX CAPACITY", value: `${placeData.maxCapacity} Guests` },
      { label: "BEST TIME", value: placeData.bestTime },
    ];
    const cardW = (pageW - 30 - 8) / 3;
    stats.forEach((s, i) => {
      const x = 15 + i * (cardW + 4);
      doc.setFillColor(...lightGray);
      doc.roundedRect(x, y, cardW, 20, 2, 2, 'F');
      doc.setDrawColor(...gold);
      doc.setLineWidth(0.5);
      doc.roundedRect(x, y, cardW, 20, 2, 2, 'S');

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...gold);
      doc.text(s.label, x + cardW / 2, y + 8, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...navy);
      doc.text(s.value, x + cardW / 2, y + 16, { align: "center" });
    });
    y += 28;

    // ── SECTION HELPER ─────────────────────────────────────────────
    const sectionHeader = (title: string) => {
      doc.setFillColor(...navy);
      doc.rect(15, y, 3, 8, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...navy);
      doc.text(title, 22, y + 6);
      doc.setDrawColor(220, 220, 235);
      doc.setLineWidth(0.3);
      doc.line(15, y + 10, pageW - 15, y + 10);
      y += 15;
    };

    // ── TRIP LOGISTICS ─────────────────────────────────────────────
    sectionHeader("TRIP LOGISTICS");
    const logistics = [
      ["🚌  Transport", placeData.travelDetails],
      ["🍽️  Food", placeData.food],
      ["📍  Departure", placeData.departureInfo],
    ];

    logistics.forEach(([label, value]) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(...darkGray);
      doc.text(label, 18, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 120);
      const valLines = doc.splitTextToSize(value, pageW - 80);
      doc.text(valLines, 75, y);
      y += Math.max(valLines.length * 5.5, 7) + 2;
    });
    y += 3;

    // ── HIGHLIGHTS ─────────────────────────────────────────────────
    sectionHeader("HIGHLIGHTS");
    const cols = 2;
    const colW = (pageW - 30) / cols;
    placeData.highlights.forEach((h, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const hx = 15 + col * colW;
      const hy = y + row * 10;
      doc.setFillColor(...gold);
      doc.circle(hx + 3, hy - 1.5, 1.5, 'F');
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...darkGray);
      doc.text(h, hx + 8, hy);
    });
    y += Math.ceil(placeData.highlights.length / cols) * 10 + 5;

    // ── ITINERARY ──────────────────────────────────────────────────
    sectionHeader("DAY-WISE ITINERARY");

    placeData.itinerary.forEach((day, i) => {
      const parts = day.split(':');
      const dayLabel = parts.length > 1 ? parts[0].trim() : `Day ${i + 1}`;
      const dayDesc = parts.length > 1 ? parts.slice(1).join(':').trim() : day;

      // Check page space
      if (y > 265) {
        doc.addPage();
        y = 20;
      }

      // Day circle + label
      doc.setFillColor(...navy);
      doc.circle(20, y + 3, 5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...white);
      doc.text(`${i + 1}`, 20, y + 5, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(...navy);
      doc.text(dayLabel, 30, y + 3);

      const descLines = doc.splitTextToSize(dayDesc, pageW - 45);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(100, 110, 130);
      doc.text(descLines, 30, y + 9);

      // Connector line
      if (i < placeData.itinerary.length - 1) {
        doc.setDrawColor(200, 210, 220);
        doc.setLineWidth(0.4);
        doc.setLineDashPattern([1, 1], 0);
        doc.line(20, y + 8, 20, y + 9 + descLines.length * 5.5 + 4);
        doc.setLineDashPattern([], 0);
      }

      y += 9 + descLines.length * 5.5 + 6;
    });

    // ── FOOTER ─────────────────────────────────────────────────────
    if (y > 260) { doc.addPage(); y = 20; }
    y = Math.max(y + 6, 265);
    doc.setFillColor(...navy);
    doc.rect(0, y, pageW, 32, 'F');
    doc.setFillColor(...gold);
    doc.rect(0, y, pageW, 1.5, 'F');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...gold);
    doc.text("Muhurta Yatra", 15, y + 10);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(190, 200, 225);
    doc.text("info@muhurtayatra.com  |  Handcrafted Journeys Across India", 15, y + 18);
    doc.setFontSize(7);
    doc.setTextColor(140, 155, 190);
    doc.text("This is a sample itinerary. Prices and schedules are subject to change.", 15, y + 26);

    doc.save(`${placeData.name.replace(/\s+/g, '_')}_Muhurta_Yatra_Itinerary.pdf`);
  };

  // Determine title from URL param for breadcrumb mapping
  const titles: Record<string, string> = { forts: "Forts", hills: "Hill Stations", beaches: "Beaches", pilgrim: "Pilgrim Sites" };
  const currentTitle = category ? titles[category] : "Places";

  if (!loading && (error || places.length === 0)) {
    return (
      <main className="section-padding bg-background min-h-screen flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-6 p-6 bg-muted rounded-2xl border border-border">
            <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
              {error ? "Backend Connection Issue" : "Category Empty"}
            </h1>
            <p className="text-muted-foreground mb-6">
              {error 
                ? "The server is currently offline or connecting to the database. We're working on it!" 
                : "We haven't added destinations to this category yet. Check back soon!"}
            </p>
            <div className="flex flex-col gap-3">
              {error && (
                <Button variant="hero" onClick={fetchCategoryPlaces}>
                  Try Again
                </Button>
              )}
              <Button variant="outline" asChild>
                <Link to="/places">Explore Other Places</Link>
              </Button>
            </div>
          </div>
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
          {loading && <div className="flex-1 min-w-0 p-10 animate-pulse bg-muted rounded-2xl h-[500px]"></div>}
          
          {!loading && place && (
            <div className="flex-1 min-w-0">
              <ScrollReveal key={selected}>
                {/* Hero image */}
                <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8">
                  <img 
                    src={place.img} 
                    alt={place.name} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />
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
