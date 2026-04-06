import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronRight, Download, MapPin, Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { CONTACT } from "@/config/contact";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import heroRaigad from "@/assets/hero-raigad.jpg";
import fortLohagad from "@/assets/fort-lohagad.jpg";
import sinhagadReal from "@/assets/sinhagad-real.jpg";
import raigadReal from "@/assets/raigad-real.jpg";
import lohagadReal from "@/assets/lohagad-real.jpg";
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
  itineraryPdf?: string;
}

const placeData: Record<string, { title: string; places: Record<string, PlaceInfo> }> = {
  forts: {
    title: "Forts",
    places: {
      sinhagad: {
        name: "Sinhagad Fort",
        img: sinhagadReal,
        desc: "Sinhagad, the 'Lion's Fort', stands at 4,300 ft in the Sahyadri range. Famous for the Battle of Sinhagad led by Tanaji Malusare, it offers breathtaking views of Pune. The fort has ancient temples, military fortifications, and is a popular weekend trek.",
        highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Pune panoramic views", "Devtak temple"],
        bestTime: "October – March",
        distance: "165 km from Mumbai",
        itinerary: ["Day 1: Pimpri → Sinhagad base → Trek to fort → Explore ruins → Sunset views", "Day 2: Sunrise trek → Khadakwasla Dam → Return to Pimpri"],
      },
      raigad: {
        name: "Raigad Fort",
        img: raigadReal,
        desc: "The capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Raigad stands at 2,700 ft and features the famous Hirakani Bastion, Maha Darwaja, and the coronation throne. A ropeway makes it accessible.",
        highlights: ["Coronation throne", "Hirakani Bastion", "Maha Darwaja", "Ropeway ride"],
        bestTime: "November – February",
        distance: "170 km from Mumbai",
        itinerary: ["Day 1: Pimpri → Raigad → Ropeway/trek → Fort exploration → Local stay", "Day 2: Sunrise → Pachad village → Return via Mahad"],
      },
      lohagad: {
        name: "Lohagad Fort",
        img: lohagadReal,
        desc: "The 'Iron Fort' near Lonavala, standing at 3,450 ft. Known for its four large gates and the Vinchukata (Scorpion's tail) formation. A relatively easy trek perfect for beginners with stunning monsoon views.",
        highlights: ["Vinchukata formation", "Four grand gates", "Bhaja Caves nearby", "Monsoon waterfalls"],
        bestTime: "July – September (monsoons)",
        distance: "105 km from Mumbai",
        itinerary: ["Day 1: Pimpri → Malavli → Lohagad trek → Bhaja Caves → Lonavala stay", "Day 2: Lonavala sightseeing → Return"],
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
        distance: "85 km from Mumbai",
        itinerary: ["Day 1: Pimpri → Lonavala → Tiger's Leap → Bhushi Dam → Resort stay", "Day 2: Pawna Lake → Karla Caves → Return"],
      },
      mahabaleshwar: {
        name: "Mahabaleshwar",
        img: heroPawna,
        desc: "The 'strawberry capital' of India. A charming hill station at 4,500 ft with viewpoints, ancient temples, and strawberry farms. Cool weather year-round makes it perfect for honeymoons and family trips.",
        highlights: ["Arthur's Seat viewpoint", "Venna Lake boating", "Mapro Garden", "Strawberry picking"],
        bestTime: "October – June",
        distance: "260 km from Mumbai",
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
        distance: "190 km from Mumbai",
        itinerary: ["Day 1: Pimpri → Harihareshwar → Beach → Temple visit → Sunset", "Day 2: Harihareshwar hill trek → Bankot Fort → Return"],
      },
      ganpatipule: {
        name: "Ganpatipule Beach",
        img: beachImg,
        desc: "A serene Konkan beach with crystal-clear waters and the famous Swayambhu Ganesh temple. The beach stretches for kilometers with golden sand and is perfect for a peaceful getaway.",
        highlights: ["Swayambhu Ganesh Temple", "Pristine white sand", "Jaigad Fort nearby", "Konkan cuisine"],
        bestTime: "October – February",
        distance: "340 km from Mumbai",
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
        distance: "Varies (90–220 km from Mumbai)",
        itinerary: ["Day 1: Pimpri → Morgaon → Siddhatek → Pali → Mahad → Night stay", "Day 2: Thevur → Lenyadri → Ozar → Ranjangaon → Return to Pimpri"],
      },
      jyotirlinga: {
        name: "Jyotirlinga Yatra",
        img: pilgrimImg,
        desc: "A sacred journey to the revered Jyotirlinga temples. We help you plan a smooth route, realistic timings, and practical stops based on your travel style.",
        highlights: ["Temple circuit planning", "Flexible pace", "Practical daily schedules", "Custom route options"],
        bestTime: "October – March",
        distance: "Train/Flight from Mumbai",
        itinerary: [
          "Day 1: Travel + check-in + evening darshan (if time permits)",
          "Day 2: Early morning darshan + local temple/ghat visits",
          "Day 3: Return journey",
        ],
      },
      ujjain: {
        name: "Ujjain",
        img: pilgrimImg,
        desc: "An ancient city situated on the banks of the Kshipra River, Ujjain is home to the Mahakaleshwar Jyotirlinga, one of the twelve Jyotirlingas of Lord Shiva. It's also famous for the Kumbh Mela.",
        highlights: ["Mahakaleshwar Jyotirlinga", "Bhasma Aarti", "Kshipra River Ghats", "Kal Bhairav Temple"],
        bestTime: "October – March",
        distance: "Train/Flight from Mumbai",
        itinerary: ["Day 1: Pimpri → Indore → Ujjain → Evening Aarti at Mahakaleshwar", "Day 2: Early morning Bhasma Aarti → Kal Bhairav Temple → Harsiddhi Temple → Return"],
        itineraryPdf: "/ujjain_itinerary.pdf",
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
  const contactHref = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;

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
                    onClick={() => { setSelected(key); }}
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
                  asChild
                  className="mb-6"
                >
                  <a href={place.itineraryPdf || "/itinerary.pdf"} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download Itinerary
                  </a>
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
