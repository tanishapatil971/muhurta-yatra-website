import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Download, MapPin, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import heroRaigad from "@/assets/hero-raigad.jpg";
import fortLohagad from "@/assets/fort-lohagad.jpg";
import heroPawna from "@/assets/hero-pawna.jpg";
import beachImg from "@/assets/beach-harihareshwar.jpg";
import pilgrimImg from "@/assets/pilgrim-temple.jpg";

interface PlaceInfo {
  name: string;
  img: string;
  desc: string;
  highlights: string[];
  bestTime: string;
  distance: string;
  itinerary: string[];
}

const placeData: Record<string, { title: string; places: Record<string, PlaceInfo> }> = {
  forts: {
    title: "Forts",
    places: {
      sinhagad: {
        name: "Sinhagad Fort",
        img: heroSinhagad,
        desc: "Sinhagad, the 'Lion's Fort', stands at 4,300 ft in the Sahyadri range. Famous for the Battle of Sinhagad led by Tanaji Malusare, it offers breathtaking views of Pune. The fort has ancient temples, military fortifications, and is a popular weekend trek.",
        highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Pune panoramic views", "Devtak temple"],
        bestTime: "October – March",
        distance: "50 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Sinhagad base → Trek to fort → Explore ruins → Sunset views", "Day 2: Sunrise trek → Khadakwasla Dam → Return to Pimpri"],
      },
      raigad: {
        name: "Raigad Fort",
        img: heroRaigad,
        desc: "The capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Raigad stands at 2,700 ft and features the famous Hirakani Bastion, Maha Darwaja, and the coronation throne. A ropeway makes it accessible.",
        highlights: ["Coronation throne", "Hirakani Bastion", "Maha Darwaja", "Ropeway ride"],
        bestTime: "November – February",
        distance: "165 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Raigad → Ropeway/trek → Fort exploration → Local stay", "Day 2: Sunrise → Pachad village → Return via Mahad"],
      },
      lohagad: {
        name: "Lohagad Fort",
        img: fortLohagad,
        desc: "The 'Iron Fort' near Lonavala, standing at 3,450 ft. Known for its four large gates and the Vinchukata (Scorpion's tail) formation. A relatively easy trek perfect for beginners with stunning monsoon views.",
        highlights: ["Vinchukata formation", "Four grand gates", "Bhaja Caves nearby", "Monsoon waterfalls"],
        bestTime: "July – September (monsoons)",
        distance: "65 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Malavli → Lohagad trek → Bhaja Caves → Lonavala stay", "Day 2: Lonavala sightseeing → Return"],
      },
      shaniwarwada: {
        name: "Shaniwar Wada",
        img: heroSinhagad,
        desc: "The iconic 18th-century fortified palace in Pune, built by Bajirao I. Once the seat of Peshwa rulers, it now stands as a monument of Maratha grandeur with its massive gates, fountains, and the famous lotus-shaped fountain.",
        highlights: ["Massive Delhi Darwaja", "Light & Sound show", "Lotus fountain", "Peshwa history"],
        bestTime: "Year-round",
        distance: "20 km from Pimpri",
        itinerary: ["Day 1: Half-day heritage walk — Shaniwar Wada → Lal Mahal → Kasba Ganpati → Local cuisine"],
      },
    },
  },
  hills: {
    title: "Hill Stations",
    places: {
      lonavala: {
        name: "Lonavala",
        img: heroPawna,
        desc: "A popular hill station in the Sahyadri range, known for its lush greenery, waterfalls, and the famous chikki. Lonavala and its twin Khandala offer stunning valley views, ancient caves, and serene lakes.",
        highlights: ["Tiger's Leap viewpoint", "Bhushi Dam", "Karla & Bhaja Caves", "Pawna Lake camping"],
        bestTime: "June – September",
        distance: "65 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Lonavala → Tiger's Leap → Bhushi Dam → Resort stay", "Day 2: Pawna Lake → Karla Caves → Return"],
      },
      mahabaleshwar: {
        name: "Mahabaleshwar",
        img: heroPawna,
        desc: "The 'strawberry capital' of India. A charming hill station at 4,500 ft with viewpoints, ancient temples, and strawberry farms. Cool weather year-round makes it perfect for honeymoons and family trips.",
        highlights: ["Arthur's Seat viewpoint", "Venna Lake boating", "Mapro Garden", "Strawberry picking"],
        bestTime: "October – June",
        distance: "130 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Panchgani → Table Land → Mahabaleshwar check-in", "Day 2: Viewpoints tour → Mapro Garden → Venna Lake → Return"],
      },
    },
  },
  beaches: {
    title: "Beaches",
    places: {
      harihareshwar: {
        name: "Harihareshwar Beach",
        img: beachImg,
        desc: "Known as the 'Devghar of the South', Harihareshwar is a sacred beach town with an ancient Shiva temple, surrounded by four hills — Harihareshwar, Harshinachal, Pushpadri, and Bramhadri.",
        highlights: ["Ancient Shiva temple", "Pristine beach", "Four surrounding hills", "Sunset views"],
        bestTime: "October – March",
        distance: "200 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Harihareshwar → Beach → Temple visit → Sunset", "Day 2: Harihareshwar hill trek → Bankot Fort → Return"],
      },
      ganpatipule: {
        name: "Ganpatipule Beach",
        img: beachImg,
        desc: "A serene Konkan beach with crystal-clear waters and the famous Swayambhu Ganesh temple. The beach stretches for kilometers with golden sand and is perfect for a peaceful getaway.",
        highlights: ["Swayambhu Ganesh Temple", "Pristine white sand", "Jaigad Fort nearby", "Konkan cuisine"],
        bestTime: "October – February",
        distance: "330 km from Pimpri",
        itinerary: ["Day 1: Pimpri → Ganpatipule → Temple darshan → Beach relaxation", "Day 2: Jaigad Fort → Guhagar → Return via coastal road"],
      },
    },
  },
  pilgrim: {
    title: "Pilgrim Sites",
    places: {
      ashtavinayak: {
        name: "Ashtavinayak Circuit",
        img: pilgrimImg,
        desc: "The sacred circuit of eight Ganesh temples in Maharashtra — Morgaon, Siddhatek, Pali, Mahad, Thevur, Lenyadri, Ozar, and Ranjangaon. A divine yatra covering all eight self-manifested Ganesh idols.",
        highlights: ["8 sacred temples", "Self-manifested idols", "Circuit route", "Spiritual significance"],
        bestTime: "Year-round (Ganesh Chaturthi special)",
        distance: "Varies (40–200 km from Pimpri)",
        itinerary: ["Day 1: Pimpri → Morgaon → Siddhatek → Pali → Mahad → Night stay", "Day 2: Thevur → Lenyadri → Ozar → Ranjangaon → Return to Pimpri"],
      },
      vaishnodevi: {
        name: "Vaishno Devi Temple",
        img: pilgrimImg,
        desc: "One of the most revered Hindu temples, located in the Trikuta Mountains of Jammu & Kashmir. Our organized yatra includes comfortable transport, accommodation, and guided darshan.",
        highlights: ["Trikuta Mountain trek", "Holy cave darshan", "Bhairavnath temple", "Helicopter option"],
        bestTime: "March – October",
        distance: "Flight + road from Pimpri",
        itinerary: ["Day 1: Pimpri → Pune Airport → Jammu → Katra → Night rest", "Day 2: Early morning trek → Darshan → Return to Katra", "Day 3: Katra sightseeing → Return flight"],
      },
    },
  },
};

export default function PlaceCategory() {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const data = category ? placeData[category] : null;
  const placeKeys = data ? Object.keys(data.places) : [];
  const [selected, setSelected] = useState(placeKeys[0] || "");
  const [showItinerary, setShowItinerary] = useState(false);

  if (!data) {
    return (
      <main className="section-padding bg-background min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Category not found</h1>
          <Button variant="hero" asChild><Link to="/places">← Back to Places</Link></Button>
        </div>
      </main>
    );
  }

  const place = data.places[selected];

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="container-wide px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/places" className="hover:text-primary transition-colors">Places</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-medium">{data.title}</span>
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
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">{data.title}</h2>
              <nav className="space-y-1" aria-label="Place list">
                {placeKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => { setSelected(key); setShowItinerary(false); }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      selected === key
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {data.places[key].name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main content */}
          {place && (
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
                  onClick={() => setShowItinerary(!showItinerary)}
                  className="mb-6"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {showItinerary ? "Hide Itinerary" : "View Sample Itinerary"}
                </Button>

                {showItinerary && (
                  <div className="glass-card p-6 mb-8 animate-fade-up">
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Sample Itinerary
                    </h3>
                    <div className="space-y-3">
                      {place.itinerary.map((step, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-semibold text-xs">
                            {i + 1}
                          </div>
                          <p className="text-foreground/80 leading-relaxed">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Book CTA */}
                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Want to visit {place.name}?</h3>
                  <p className="text-muted-foreground text-sm mb-4">Let us plan the perfect trip for you.</p>
                  <Button variant="hero" size="lg" asChild>
                    <a href="tel:+919876543210">Book This Trip</a>
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
