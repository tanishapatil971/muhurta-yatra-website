import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
const fortImg = "https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop";
const beachImg = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop";
const pilgrimImg = "https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop";
const heroHills = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop";

const categories = [
  {
    title: "Forts",
    desc: "Walk the legendary Maratha forts — from Sinhagad to Raigad, experience centuries of history.",
    img: fortImg,
    to: "/places/forts",
    color: "from-earth/80",
  },
  {
    title: "Hill Stations",
    desc: "Cool retreats in the Sahyadri ranges — Lonavala, Mahabaleshwar, Matheran & more.",
    img: heroHills,
    to: "/places/hills",
    color: "from-sahyadri/80",
  },
  {
    title: "Beaches",
    desc: "Sun-kissed Konkan coastline — Harihareshwar, Dapoli, Ganpatipule & hidden coves.",
    img: beachImg,
    to: "/places/beaches",
    color: "from-sky/80",
  },
  {
    title: "Pilgrim Sites",
    desc: "Sacred temples and spiritual destinations — Ashtavinayak, Jyotirlinga & divine yatras.",
    img: pilgrimImg,
    to: "/places/pilgrim",
    color: "from-sunset/80",
  },
];

export default function Places() {
  return (
    <main>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] overflow-hidden">
        <img 
          src={fortImg} 
          alt="Explore Destinations" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop";
          }}
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">Explore Destinations</h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Choose your adventure — forts, hills, beaches or spiritual escapes.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((cat, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <Link
                  to={cat.to}
                  className="group block rounded-2xl overflow-hidden hover-lift relative aspect-[16/10]"
                >
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent opacity-90`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{cat.title}</h2>
                    <p className="text-primary-foreground/80 text-sm md:text-base mt-2 max-w-md">{cat.desc}</p>
                    <span className="inline-block mt-3 text-primary-foreground font-semibold text-sm group-hover:translate-x-2 transition-transform">
                      Explore →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
