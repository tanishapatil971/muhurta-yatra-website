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
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdQs-hd8H-DUNVtJM1MgNN8uOabqQWtcdb5_c6NcxLk7zqU0Q/viewform?usp=publish-editor"; // 👈 Replace with your actual Google Form URL

  const [showBookingModal, setShowBookingModal] = useState(false);

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
    const pageH = 297;
    const margin = 15;
    const contentW = pageW - margin * 2;

    // ── Color Palette ───────────────────────────────────────────
    const navy = [12, 25, 65] as [number, number, number];
    const gold = [200, 160, 40] as [number, number, number];
    const goldLight = [245, 235, 200] as [number, number, number];
    const darkText = [30, 30, 45] as [number, number, number];
    const medText = [80, 85, 100] as [number, number, number];
    const lightText = [130, 135, 155] as [number, number, number];
    const white = [255, 255, 255] as [number, number, number];
    const cream = [252, 250, 245] as [number, number, number];
    const softBg = [245, 246, 250] as [number, number, number];
    const accentGreen = [34, 120, 90] as [number, number, number];

    // ── Helper: Check & add new page if needed ──────────────────
    const ensureSpace = (needed: number) => {
      if (y + needed > pageH - 45) {
        // Page footer line
        doc.setDrawColor(...gold);
        doc.setLineWidth(0.5);
        doc.line(margin, pageH - 15, pageW - margin, pageH - 15);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(...lightText);
        doc.text("Muhurta Yatra  |  Handcrafted Journeys Across India", margin, pageH - 10);
        doc.text(`Page ${doc.getNumberOfPages()}`, pageW - margin, pageH - 10, { align: "right" });

        doc.addPage();
        y = 20;
      }
    };

    // ════════════════════════════════════════════════════════════════
    // ██  PAGE 1: COVER HEADER
    // ════════════════════════════════════════════════════════════════

    // Navy header block
    doc.setFillColor(...navy);
    doc.rect(0, 0, pageW, 60, 'F');

    // Decorative gold accent stripe
    doc.setFillColor(...gold);
    doc.rect(0, 57, pageW, 3, 'F');

    // Brand name — top left
    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setCharSpace(4);
    doc.text("MUHURTA YATRA", margin, 17);
    doc.setCharSpace(0);

    // Tagline
    doc.setTextColor(180, 195, 230);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.text("HANDCRAFTED JOURNEYS ACROSS INDIA", margin, 24);

    // Destination name — large and prominent
    doc.setTextColor(...white);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    const destName = placeData.name.toUpperCase();
    doc.text(destName, margin, 46);

    // Document type label — top right
    doc.setTextColor(...gold);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setCharSpace(1);
    doc.text("SAMPLE ITINERARY", pageW - margin, 17, { align: "right" });
    doc.setCharSpace(0);

    // Date — top right below label
    doc.setTextColor(160, 175, 210);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text(
      new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
      pageW - margin, 24, { align: "right" }
    );

    // Decorative diamond pattern below header
    doc.setFillColor(...goldLight);
    for (let dx = 0; dx < pageW; dx += 6) {
      doc.setFillColor(240, 230, 200);
      doc.rect(dx, 60, 3, 2, 'F');
    }

    let y = 72;

    // ── DESCRIPTION ─────────────────────────────────────────────
    doc.setTextColor(...darkText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const descLines = doc.splitTextToSize(placeData.desc, contentW);
    doc.text(descLines, margin, y);
    y += descLines.length * 5.5 + 10;

    // ── QUICK INFO CARDS (3 columns) ────────────────────────────
    const stats = [
      { label: "PRICE / PERSON", value: `Rs. ${placeData.pricePerPerson.toLocaleString()}` },
      { label: "GROUP CAPACITY", value: `${placeData.maxCapacity} Guests` },
      { label: "BEST TIME TO VISIT", value: placeData.bestTime },
    ];
    const cardW = (contentW - 10) / 3;
    const cardH = 24;

    stats.forEach((s, i) => {
      const x = margin + i * (cardW + 5);

      // Card background
      doc.setFillColor(...cream);
      doc.roundedRect(x, y, cardW, cardH, 3, 3, 'F');

      // Left gold accent border on card
      doc.setFillColor(...gold);
      doc.roundedRect(x, y, 2.5, cardH, 1, 1, 'F');

      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(...gold);
      doc.text(s.label, x + 8, y + 9);

      // Value
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...navy);
      doc.text(s.value, x + 8, y + 18);
    });
    y += cardH + 12;

    // ── SECTION HEADER HELPER ───────────────────────────────────
    const sectionHeader = (title: string) => {
      ensureSpace(20);
      // Navy left bar
      doc.setFillColor(...navy);
      doc.roundedRect(margin, y, 3, 10, 1, 1, 'F');
      // Title text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(...navy);
      doc.text(title, margin + 7, y + 7);
      // Underline
      doc.setDrawColor(220, 220, 235);
      doc.setLineWidth(0.3);
      doc.line(margin, y + 12, pageW - margin, y + 12);
      y += 18;
    };

    // ── TRIP LOGISTICS ──────────────────────────────────────────
    sectionHeader("TRIP LOGISTICS");

    const logistics = [
      { icon: "TRANSPORT", value: placeData.travelDetails },
      { icon: "FOOD", value: placeData.food },
      { icon: "DEPARTURE", value: placeData.departureInfo },
    ];

    logistics.forEach((item, i) => {
      ensureSpace(14);
      // Alternating row background
      if (i % 2 === 0) {
        doc.setFillColor(...softBg);
        doc.roundedRect(margin, y - 4, contentW, 12, 2, 2, 'F');
      }

      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...navy);
      doc.text(item.icon, margin + 4, y + 2);

      // Value
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...medText);
      const valLines = doc.splitTextToSize(item.value, contentW - 55);
      doc.text(valLines, margin + 50, y + 2);
      y += Math.max(valLines.length * 5, 8) + 4;
    });
    y += 6;

    // ── HIGHLIGHTS (2-column grid) ──────────────────────────────
    sectionHeader("HIGHLIGHTS");

    const hCols = 2;
    const hColW = contentW / hCols;
    placeData.highlights.forEach((h, i) => {
      const col = i % hCols;
      const row = Math.floor(i / hCols);
      if (col === 0) ensureSpace(10);
      const hx = margin + col * hColW;
      const hy = y + row * 9;

      // Gold bullet dot
      doc.setFillColor(...gold);
      doc.circle(hx + 3, hy - 1, 1.5, 'F');

      // Highlight text
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(...darkText);
      const hText = doc.splitTextToSize(h, hColW - 12);
      doc.text(hText, hx + 8, hy);
    });
    y += Math.ceil(placeData.highlights.length / hCols) * 9 + 8;

    // ── DAY-WISE ITINERARY ──────────────────────────────────────
    sectionHeader("DAY-WISE ITINERARY");

    placeData.itinerary.forEach((day, i) => {
      const parts = day.split(":");
      const dayLabel = parts.length > 1 ? parts[0].trim() : `Day ${i + 1}`;
      const dayDesc = parts.length > 1 ? parts.slice(1).join(":").trim() : day;
      const dayDescLines = doc.splitTextToSize(dayDesc, contentW - 28);
      const blockH = 10 + dayDescLines.length * 5;

      ensureSpace(blockH + 10);

      // Alternating card background for each day
      if (i % 2 === 0) {
        doc.setFillColor(...cream);
      } else {
        doc.setFillColor(...softBg);
      }
      doc.roundedRect(margin, y - 3, contentW, blockH + 4, 3, 3, 'F');

      // Day number circle
      doc.setFillColor(...navy);
      doc.circle(margin + 8, y + 4, 5.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(...white);
      doc.text(`${i + 1}`, margin + 8, y + 6, { align: "center" });

      // Day label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(...navy);
      doc.text(dayLabel, margin + 18, y + 5);

      // Day description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...medText);
      doc.text(dayDescLines, margin + 18, y + 12);

      // Connector line between days
      if (i < placeData.itinerary.length - 1) {
        const lineEnd = y + blockH + 4;
        doc.setDrawColor(210, 215, 225);
        doc.setLineWidth(0.4);
        doc.setLineDashPattern([1.5, 1.5], 0);
        doc.line(margin + 8, y + 10, margin + 8, lineEnd);
        doc.setLineDashPattern([], 0);
      }

      y += blockH + 8;
    });

    // ── FOOTER ──────────────────────────────────────────────────
    ensureSpace(40);
    y = Math.max(y + 8, pageH - 42);

    // Gold top border for footer
    doc.setFillColor(...gold);
    doc.rect(0, y, pageW, 2, 'F');

    // Navy footer block
    doc.setFillColor(...navy);
    doc.rect(0, y + 2, pageW, 40, 'F');

    // Brand
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(...gold);
    doc.setCharSpace(2);
    doc.text("MUHURTA YATRA", margin, y + 14);
    doc.setCharSpace(0);

    // Contact details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(190, 200, 225);
    doc.text("Phone: +91 93266 10388   |   Email: info@muhurtayatra.com", margin, y + 22);

    // Tagline
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(160, 170, 200);
    doc.text("Handcrafted Journeys Across India", margin, y + 29);

    // Disclaimer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(6.5);
    doc.setTextColor(120, 130, 165);
    doc.text("This is a sample itinerary for reference only. Final prices, schedules, and inclusions may vary.", margin, y + 36);

    // Right side — website
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...gold);
    doc.text("www.muhurtayatra.com", pageW - margin, y + 14, { align: "right" });

    doc.save(`${placeData.name.replace(/\s+/g, "_")}_Muhurta_Yatra_Itinerary.pdf`);
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
                  <Button variant="hero" size="lg" onClick={() => setShowBookingModal(true)}>
                    Book This Trip
                  </Button>
                </div>
                
                {/* Booking Confirmation Modal */}
                {showBookingModal && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
                    <div className="bg-background rounded-2xl shadow-xl max-w-md w-full p-8 text-center border border-border">
                      <div className="text-4xl mb-3">🧳</div>
                      <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Ready for the Trip?</h2>
                      <p className="text-muted-foreground text-sm mb-4">
                        You're about to be redirected to our booking confirmation form for{" "}
                        <span className="font-semibold text-foreground">{place.name}</span>.
                      </p>
                
                      {/* Disclaimer */}
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 mb-6 text-xs text-muted-foreground text-left">
                        ⚠️ <strong>Disclaimer:</strong> Submitting the form is not a final booking.
                        Our team will contact you within 24 hours to confirm availability, pricing,
                        and trip details before any payment is collected.
                      </div>
                
                      <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => setShowBookingModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="hero"
                          onClick={() => {
                            setShowBookingModal(false);
                            window.open(GOOGLE_FORM_URL, "_blank");
                          }}
                        >
                          Proceed to Form →
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </ScrollReveal>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
