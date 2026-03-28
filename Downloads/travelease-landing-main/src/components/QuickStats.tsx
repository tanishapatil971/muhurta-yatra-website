import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 10, suffix: "M+", label: "Bookings" },
  { value: 50, suffix: "K+", label: "Hotels" },
  { value: 20, suffix: "K+", label: "Bus Routes" },
  { value: 4.9, suffix: "/5", label: "Rating", decimal: true },
];

const useCountUp = (end: number, duration = 2000, decimal = false) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(decimal ? parseFloat((eased * end).toFixed(1)) : Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, decimal]);

  return { count, ref };
};

const QuickStats = () => (
  <section className="relative -mt-12 z-20 section-padding !pt-0">
    <div className="container mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </div>
  </section>
);

const StatCard = ({ value, suffix, label, decimal }: typeof stats[number]) => {
  const { count, ref } = useCountUp(value, 2000, decimal);
  return (
    <div ref={ref} className="glass-card-light rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
      <div className="text-3xl md:text-4xl font-display font-bold text-primary">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1 font-medium">{label}</div>
    </div>
  );
};

export default QuickStats;
