import { useState } from "react";

export default function Plan() {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [plan, setPlan] = useState<string[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const place = destination.toLowerCase().trim();
    let generatedPlan: string[] = [];

    if (place.includes("ujjain")) {
      generatedPlan = [
        "Day 1: Arrival + Mahakaleshwar Darshan",
        "Day 2: Kal Bhairav + Harsiddhi Temple",
        "Day 3: Omkareshwar Visit + Return",
      ];
    } else if (place.includes("goa")) {
      generatedPlan = [
        "Day 1: Arrival + Beach Relax",
        "Day 2: North Goa Tour",
        "Day 3: South Goa + Churches",
        "Day 4: Water Sports + Return",
      ];
    } else if (place.includes("kedarnath") || place.includes("kedar")) {
      generatedPlan = [
        "Day 1: Arrival Haridwar",
        "Day 2: Travel to Kedarnath Base",
        "Day 3: Kedarnath Darshan",
        "Day 4: Return Journey",
      ];
    } else {
      for (let i = 1; i <= Number(days); i++) {
        if (i === 1) {
          generatedPlan.push(`Day ${i}: Arrival at ${destination}`);
        } else if (i === Number(days)) {
          generatedPlan.push(`Day ${i}: Return Journey`);
        } else {
          generatedPlan.push(`Day ${i}: Explore ${destination}`);
        }
      }
    }

    setPlan(generatedPlan);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4 py-20">
    <h1 className="text-3xl font-bold mb-2 text-center text-foreground">
  Smart Yatra Planner
</h1>
<p className="text-muted-foreground mb-6 text-center max-w-md">
  AI-powered itinerary generator for spiritual and travel planning
</p>
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground border border-border p-8 rounded-xl shadow-sm w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">
          Plan Your Yatra
        </h1>

        <input
          type="text"
          placeholder="Enter Destination (Ujjain, Goa, Kedarnath...)"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full mb-4 p-3 border border-border bg-background text-foreground rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
        />

        <input
          type="number"
          placeholder="Number of Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="w-full mb-4 p-3 border border-border bg-background text-foreground rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
        />

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition"
        >
          Generate Plan
        </button>
      </form>

      {/* OUTPUT */}
      {plan.length > 0 && (
        <div className="mt-8 bg-card text-card-foreground border border-border p-6 rounded-xl shadow-sm w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Your Itinerary
          </h2>

          {/* PREMIUM CARDS */}
          <div className="space-y-4">
            {plan.map((day, index) => {
              let icon = "🧭";
              let color = "bg-muted/50 text-foreground";

              if (
                day.toLowerCase().includes("temple") ||
                day.toLowerCase().includes("darshan")
              ) {
                icon = "🛕";
                color = "bg-amber-900/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400";
              } else if (
                day.toLowerCase().includes("arrival") ||
                day.toLowerCase().includes("travel")
              ) {
                icon = "🚗";
                color = "bg-blue-900/10 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400";
              } else if (day.toLowerCase().includes("return")) {
                icon = "🔄";
                color = "bg-emerald-900/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400";
              }

              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-sm flex items-start gap-4 ${color}`}
                >
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg flex items-center gap-2 text-foreground">
                      {icon} Day {index + 1}
                    </h3>
                    <p className="text-foreground/80 mt-1 leading-relaxed whitespace-pre-wrap">
                      {day.replace(`Day ${index + 1}: `, "")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BOOK BUTTON */}
          <button
            className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            onClick={() => alert("Booking feature coming soon!")}
          >
            Book This Plan
          </button>
        </div>
      )}
    </div>
  );
}