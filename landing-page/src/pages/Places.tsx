import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";

import fortImg from "@/assets/sinhagad-real.jpg";
import placesHero from "@/assets/places-hero.jpg";
import beachImg from "@/assets/beach-harihareshwar.jpg";
import pilgrimImg from "@/assets/pilgrim-temple.jpg";
import heroHills from "@/assets/hero-pawna.jpg";

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
          src={placesHero} 
          alt="Explore Destinations" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
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
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} via-transparent to-transparent opacity-60`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
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
