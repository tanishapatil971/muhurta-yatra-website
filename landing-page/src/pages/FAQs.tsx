import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroSinhagad from "@/assets/hero-sinhagad.jpg";
import { CONTACT } from "@/config/contact";

const faqs = [
  {
    q: "What are the best forts near Mumbai?",
    a: "Some of the best forts near Mumbai include Sinhagad Fort (180 km), Lohagad Fort (100 km), Torna Fort (210 km), and Raigad Fort (170 km). We organize guided treks to all of these with transport, meals, and expert guides."
  },
  {
    q: "How do I book a custom yatra?",
    a: `Simply call us at ${CONTACT.phone} or fill out the contact form on our homepage. Share your preferred destinations, dates, group size, and budget — our team will craft a personalized itinerary within 24 hours.`
  },
  {
    q: "Is it safe to trek during monsoons?",
    a: "Monsoon treks are beautiful but require caution. We only organize monsoon treks to forts rated safe with proper gear, experienced guides, and first-aid kits. We cancel treks during extreme weather warnings. Lohagad and Tikona are popular monsoon-safe choices."
  },
  {
    q: "Do you offer group tour discounts?",
    a: "Yes! We offer attractive discounts for groups of 10+ people. Corporate groups, college trips, and large family gatherings get special packages. Contact us for a custom group quote."
  },
  {
    q: "What's included in your honeymoon packages?",
    a: "Our honeymoon packages include round-trip transport, premium hotel/resort accommodation, sightseeing, candlelight dinner, spa/wellness activities, and a dedicated travel coordinator. We cover destinations like Mahabaleshwar, Goa, Udaipur, and Kerala."
  },
  {
    q: "Can I customize the itinerary?",
    a: "Absolutely! Every yatra we craft is 100% customizable. You can choose your destinations, accommodation type, travel dates, activities, and dietary preferences. We tailor everything to make your trip perfect."
  },
  {
    q: "What should I carry for a fort trek?",
    a: "We recommend comfortable trekking shoes, 2 liters of water, rain gear (during monsoons), sunscreen, a cap, energy snacks, a first-aid kit, and a fully charged phone. We provide a detailed checklist before every trek."
  },
  {
    q: "Do you arrange spiritual/religious tours?",
    a: "Yes, spiritual tours are our specialty! We organize Ashtavinayak Darshan, Jyotirlinga Yatra, Char Dham, and various local temple circuits. All arrangements include comfortable transport, accommodation, and guided darshan."
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellations made 7+ days before the trip get a full refund minus processing fees. Cancellations 3-7 days before get a 50% refund. Less than 3 days notice is non-refundable. We also offer trip date changes subject to availability."
  },
  {
    q: "How experienced is the Muhurta Yatra team?",
    a: "Our core team has extensive experience in specialized tourism across Maharashtra. Our trek leaders are certified mountaineers, our drivers know every route, and our planning team focuses on high-quality, perfectly timed yatras. We're a trusted name in Mumbai, serving travellers from all across the MMR region."
  },
];

export default function FAQs() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={heroSinhagad} alt="FAQs" className="w-full h-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Everything you need to know about traveling with Muhurta Yatra.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-wide max-w-3xl">
          {/* Search */}
          <ScrollReveal>
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                aria-label="Search frequently asked questions"
              />
            </div>
          </ScrollReveal>

          {/* FAQs */}
          <div className="space-y-3">
            {filtered.map((faq, i) => {
              const isOpen = openIdx === i;
              return (
                <ScrollReveal key={i} delay={i * 50}>
                  <div className="glass-card overflow-hidden">
                    <button
                      onClick={() => setOpenIdx(isOpen ? null : i)}
                      className="w-full flex items-center justify-between p-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-heading text-base md:text-lg font-semibold text-foreground pr-4">{faq.q}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5 px-5" : "max-h-0"}`}>
                      <p className="text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">{faq.a}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No FAQs found for "{search}"</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
