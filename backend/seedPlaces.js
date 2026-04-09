const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');

dotenv.config();

const placesData = [
  {
    idKey: 'sinhagad',
    categoryKey: 'forts',
    name: 'Sinhagad Fort',
    img: '/src/assets/sinhagad-real.jpg', // Path approximation, assuming frontend manages assets
    desc: "Sinhagad, the 'Lion's Fort', stands at 4,300 ft in the Sahyadri range. Famous for the Battle of Sinhagad led by Tanaji Malusare, it offers breathtaking views of Pune. The fort has ancient temples, military fortifications, and is a popular weekend trek.",
    highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Pune panoramic views", "Devtak temple"],
    bestTime: 'October – March',
    distance: '165 km from Mumbai',
    itinerary: ["Day 1: Pimpri → Sinhagad base → Trek to fort → Explore ruins → Sunset views", "Day 2: Sunrise trek → Khadakwasla Dam → Return to Pimpri"],
    food: "Local Maharashtrian quick bites like Pithla Bhakri and Kanda Bhaji available at fort base.",
    maxCapacity: 25,
    pricePerPerson: 1200,
    departureInfo: "Early morning 5:00 AM from Pimpri.",
    travelDetails: "Non-AC / AC Mini Bus depending on group size."
  },
  {
    idKey: 'raigad',
    categoryKey: 'forts',
    name: 'Raigad Fort',
    img: '/src/assets/raigad-real.jpg',
    desc: "The capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Raigad stands at 2,700 ft and features the famous Hirakani Bastion, Maha Darwaja, and the coronation throne. A ropeway makes it accessible.",
    highlights: ["Coronation throne", "Hirakani Bastion", "Maha Darwaja", "Ropeway ride"],
    bestTime: "November – February",
    distance: "170 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Raigad → Ropeway/trek → Fort exploration → Local stay", "Day 2: Sunrise → Pachad village → Return via Mahad"],
    food: "Breakfast and Dinner included. Local Thali.",
    maxCapacity: 20,
    pricePerPerson: 2500,
    departureInfo: "Departure at 6:00 AM from Nigdi.",
    travelDetails: "AC Pushback seating. Ropeway tickets extra but guided."
  },
  {
    idKey: 'lohagad',
    categoryKey: 'forts',
    name: "Lohagad Fort",
    img: "/src/assets/lohagad-real.jpg",
    desc: "The 'Iron Fort' near Lonavala, standing at 3,450 ft. Known for its four large gates and the Vinchukata (Scorpion's tail) formation. A relatively easy trek perfect for beginners with stunning monsoon views.",
    highlights: ["Vinchukata formation", "Four grand gates", "Bhaja Caves nearby", "Monsoon waterfalls"],
    bestTime: "July – September (monsoons)",
    distance: "105 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Malavli → Lohagad trek → Bhaja Caves → Lonavala stay", "Day 2: Lonavala sightseeing → Return"],
    food: "Light snacks & Lunch.",
    maxCapacity: 30,
    pricePerPerson: 1500,
    departureInfo: "7:00 AM from Wakad bridge.",
    travelDetails: "Private tempo traveler."
  },
  {
    idKey: 'lonavala',
    categoryKey: 'hills',
    name: "Lonavala",
    img: "/src/assets/hero-pawna.jpg",
    desc: "A popular hill station in the Sahyadri range, known for its lush greenery, waterfalls, and the famous chikki. Lonavala and its twin Khandala offer stunning valley views, ancient caves, and serene lakes.",
    highlights: ["Tiger's Leap viewpoint", "Bhushi Dam", "Karla & Bhaja Caves", "Pawna Lake camping"],
    bestTime: "June – September",
    distance: "85 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Lonavala → Tiger's Leap → Bhushi Dam → Resort stay", "Day 2: Pawna Lake → Karla Caves → Return"],
    food: "All meals included with Pawna Lake BBQ dinner.",
    maxCapacity: 15,
    pricePerPerson: 3000,
    departureInfo: "Flexible morning departures.",
    travelDetails: "AC Sedan/SUV."
  },
  {
    idKey: 'mahabaleshwar',
    categoryKey: 'hills',
    name: "Mahabaleshwar",
    img: "/src/assets/hero-pawna.jpg",
    desc: "The 'strawberry capital' of India. A charming hill station at 4,500 ft with viewpoints, ancient temples, and strawberry farms. Cool weather year-round makes it perfect for honeymoons and family trips.",
    highlights: ["Arthur's Seat viewpoint", "Venna Lake boating", "Mapro Garden", "Strawberry picking"],
    bestTime: "October – June",
    distance: "260 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Panchgani → Table Land → Mahabaleshwar check-in", "Day 2: Viewpoints tour → Mapro Garden → Venna Lake → Return"],
    food: "Breakfast and Premium hotel dining.",
    maxCapacity: 12,
    pricePerPerson: 4500,
    departureInfo: "6:00 AM from Pimpri.",
    travelDetails: "Luxury AC sleeper."
  },
  {
    idKey: 'harihareshwar',
    categoryKey: 'beaches',
    name: "Harihareshwar Beach",
    img: "/src/assets/beach-harihareshwar.jpg",
    desc: "Known as the 'Devghar of the South', Harihareshwar is a sacred beach town with an ancient Shiva temple, surrounded by four hills — Harihareshwar, Harshinachal, Pushpadri, and Bramhadri.",
    highlights: ["Ancient Shiva temple", "Pristine beach", "Four surrounding hills", "Sunset views"],
    bestTime: "October – March",
    distance: "190 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Harihareshwar → Beach → Temple visit → Sunset", "Day 2: Harihareshwar hill trek → Bankot Fort → Return"],
    food: "Seafood & vegetarian thali options.",
    maxCapacity: 20,
    pricePerPerson: 3200,
    departureInfo: "Overnight journey starting 10:00 PM.",
    travelDetails: "AC pushback buses."
  },
  {
    idKey: 'ganpatipule',
    categoryKey: 'beaches',
    name: "Ganpatipule Beach",
    img: "/src/assets/beach-harihareshwar.jpg",
    desc: "A serene Konkan beach with crystal-clear waters and the famous Swayambhu Ganesh temple. The beach stretches for kilometers with golden sand and is perfect for a peaceful getaway.",
    highlights: ["Swayambhu Ganesh Temple", "Pristine white sand", "Jaigad Fort nearby", "Konkan cuisine"],
    bestTime: "October – February",
    distance: "340 km from Mumbai",
    itinerary: ["Day 1: Pimpri → Ganpatipule → Temple darshan → Beach relaxation", "Day 2: Jaigad Fort → Guhagar → Return via coastal road"],
    food: "Authentic Konkani Modak and meals.",
    maxCapacity: 15,
    pricePerPerson: 4000,
    departureInfo: "Late night 9:00 PM.",
    travelDetails: "Spacious AC seating."
  },
  {
    idKey: 'ashtavinayak',
    categoryKey: 'pilgrim',
    name: "Ashtavinayak Circuit",
    img: "/src/assets/pilgrim-temple.jpg",
    desc: "The sacred circuit of eight Ganesh temples in Maharashtra — Morgaon, Siddhatek, Pali, Mahad, Thevur, Lenyadri, Ozar, and Ranjangaon. A divine yatra covering all eight self-manifested Ganesh idols.",
    highlights: ["8 sacred temples", "Self-manifested idols", "Circuit route", "Spiritual significance"],
    bestTime: "Year-round (Ganesh Chaturthi special)",
    distance: "Varies (90–220 km from Mumbai)",
    itinerary: ["Day 1: Pimpri → Morgaon → Siddhatek → Pali → Mahad → Night stay", "Day 2: Thevur → Lenyadri → Ozar → Ranjangaon → Return to Pimpri"],
    food: "Pure vegetarian Sattvic food.",
    maxCapacity: 35,
    pricePerPerson: 5500,
    departureInfo: "5:00 AM sharp from designated spots.",
    travelDetails: "Comfortable AC luxury bus."
  },
  {
    idKey: 'jyotirlinga',
    categoryKey: 'pilgrim',
    name: "Jyotirlinga Yatra",
    img: "/src/assets/pilgrim-temple.jpg",
    desc: "A sacred journey to the revered Jyotirlinga temples. We help you plan a smooth route, realistic timings, and practical stops based on your travel style.",
    highlights: ["Temple circuit planning", "Flexible pace", "Practical daily schedules", "Custom route options"],
    bestTime: "October – March",
    distance: "Train/Flight from Mumbai",
    itinerary: [
      "Day 1: Travel + check-in + evening darshan (if time permits)",
      "Day 2: Early morning darshan + local temple/ghat visits",
      "Day 3: Return journey",
    ],
    food: "Pure veg hotel catering.",
    maxCapacity: 40,
    pricePerPerson: 7500,
    departureInfo: "Customized per booking.",
    travelDetails: "Train tickets & local cab integration."
  },
  {
    idKey: 'ujjain',
    categoryKey: 'pilgrim',
    name: "Ujjain",
    img: "/src/assets/pilgrim-temple.jpg",
    desc: "An ancient city situated on the banks of the Kshipra River, Ujjain is home to the Mahakaleshwar Jyotirlinga, one of the twelve Jyotirlingas of Lord Shiva. It's also famous for the Kumbh Mela.",
    highlights: ["Mahakaleshwar Jyotirlinga", "Bhasma Aarti", "Kshipra River Ghats", "Kal Bhairav Temple"],
    bestTime: "October – March",
    distance: "Train/Flight from Mumbai",
    itinerary: ["Day 1: Pimpri → Indore → Ujjain → Evening Aarti at Mahakaleshwar", "Day 2: Early morning Bhasma Aarti → Kal Bhairav Temple → Harsiddhi Temple → Return"],
    food: "High quality vegetarian banquets.",
    maxCapacity: 25,
    pricePerPerson: 6500,
    departureInfo: "Pre-booked train out of Pune/Mumbai.",
    travelDetails: "Train tier options available (3AC/2AC)."
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found in environment variables.");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected correctly for seeding Place data.');

    // Remove existing places matching these ID Keys to avoid duplicate errors, or just clear them
    // Let's clear all places to ensure a clean slate, or we can use upsert. We'll simply delete them and re-insert.
    await Place.deleteMany({});
    console.log('Cleared existing places from database');

    await Place.insertMany(placesData);
    console.log('✅ Successfully seeded ' + placesData.length + ' places to MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
