const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Place = require('./models/Place');

dotenv.config();

const placesData = [
  {
    idKey: 'sinhagad',
    categoryKey: 'forts',
    name: 'Sinhagad Fort',
    img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2670',
    desc: "Sinhagad, the 'Lion's Fort', stands at 4,300 ft in the Sahyadri range. Famous for the Battle of Sinhagad led by Tanaji Malusare, it offers breathtaking views of the Western Ghats.",
    highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Panoramic valley views", "Ancient Devtak Temple"],
    bestTime: 'October – March',
    distance: '180 km from Mumbai',
    itinerary: [
      "Day 1: Early morning pickup from Mumbai → Drive to Sinhagad base → Trek to fort → Explore ruins & temples → Sunset point",
      "Day 2: Morning visit to nearby Khadakwasla Dam → Return journey to Mumbai"
    ],
    food: "Local Maharashtrian snacks like Pithla Bhakri and Kanda Bhaji. Packed lunch arranged on request.",
    maxCapacity: 25,
    pricePerPerson: 1800,
    departureInfo: "Hotel / designated pickup points across Mumbai & Navi Mumbai.",
    travelDetails: "Private AC vehicle depending on group size."
  },
  {
    idKey: 'raigad',
    categoryKey: 'forts',
    name: 'Raigad Fort',
    img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2671',
    desc: "The capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Raigad stands at 2,700 ft above sea level and features the majestic Maha Darwaja, Hirakani Bastion, and the famous coronation throne. A ropeway makes it accessible to all.",
    highlights: ["Coronation throne", "Hirakani Bastion", "Maha Darwaja", "Ropeway ride"],
    bestTime: "November – February",
    distance: "170 km from Mumbai",
    itinerary: [
      "Day 1: Pickup from Mumbai → Scenic drive via Tamhini or Poladpur → Raigad base → Ropeway to Fort → Exploration → Overnight stay",
      "Day 2: Sunrise at the fort → Museum visit → Return journey to Mumbai"
    ],
    food: "Breakfast and dinner included. Authentic Konkani Thali meals.",
    maxCapacity: 20,
    pricePerPerson: 2800,
    departureInfo: "Early morning pickup from Dadar, Borivali, or Navi Mumbai.",
    travelDetails: "AC Pushback seating. Ropeway tickets included."
  },
  {
    idKey: 'lohagad',
    categoryKey: 'forts',
    name: "Lohagad Fort",
    img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2673',
    desc: "The 'Iron Fort' near Lonavala, standing at 3,450 ft. Renowned for its dramatic Vinchukata (Scorpion's tail) formation and four magnificent gates. An ideal beginner-friendly trek with stunning monsoon waterfall views.",
    highlights: ["Vinchukata formation", "Four grand gates", "Bhaja Caves nearby", "Monsoon waterfalls"],
    bestTime: "July – September (monsoons)",
    distance: "100 km from Mumbai",
    itinerary: [
      "Day 1: Pickup from Mumbai → Malavli trailhead → Lohagad trek → Bhaja Caves exploration → Return journey"
    ],
    food: "Light snacks & packed lunch included.",
    maxCapacity: 30,
    pricePerPerson: 1600,
    departureInfo: "Morning pickup from Mumbai / Navi Mumbai / Thane.",
    travelDetails: "Common AC Bus or Private Sedan."
  },
  {
    idKey: 'lonavala',
    categoryKey: 'hills',
    name: "Lonavala",
    img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2670',
    desc: "Mumbai's favorite weekend escape in the Sahyadri range, celebrated for its lush monsoon greenery, cascading waterfalls, and the iconic chikki. Lonavala and its twin Khandala offer spectacular valley viewpoints and ancient Buddhist caves.",
    highlights: ["Tiger's Leap viewpoint", "Bhushi Dam", "Karla & Bhaja Caves", "Pawna Lake camping"],
    bestTime: "June – September",
    distance: "85 km from Mumbai",
    itinerary: [
      "Day 1: Pickup from Mumbai → Tiger's Leap → Bhushi Dam → Lonavala hotel check-in",
      "Day 2: Morning at Pawna Lake → Karla Caves → Return journey to Mumbai"
    ],
    food: "Breakfast and premium resort dining.",
    maxCapacity: 15,
    pricePerPerson: 3200,
    departureInfo: "Flexible morning pickup from anywhere in Mumbai.",
    travelDetails: "AC Sedan or Innova Crysta."
  },
  {
    idKey: 'mahabaleshwar',
    categoryKey: 'hills',
    name: "Mahabaleshwar",
    img: 'https://images.unsplash.com/photo-1608221245388-6ab68e552ddf?q=80&w=2670',
    desc: "The 'Strawberry Capital' of Maharashtra. A premier hill station perched at 4,500 ft with sweeping viewpoints, an ancient Shiva temple, and vibrant strawberry farms. A perfect long-weekend retreat from Mumbai.",
    highlights: ["Arthur's Seat viewpoint", "Venna Lake boating", "Mapro Garden", "Strawberry picking"],
    bestTime: "October – June",
    distance: "260 km from Mumbai",
    itinerary: [
      "Day 1: Pickup from Mumbai → Scenic mountain drive → Panchgani visit → Mahabaleshwar check-in",
      "Day 2: Viewpoints tour → Old Mahabaleshwar Temple → Venna Lake → Strawberry farm visit",
      "Day 3: Sunrise at Wilson Point → Breakfast → Return journey to Mumbai"
    ],
    food: "Premium hotel dining with regional favorites.",
    maxCapacity: 12,
    pricePerPerson: 5500,
    departureInfo: "Early morning departure from Mumbai city.",
    travelDetails: "Luxury AC SUV (Innova/Crysta)."
  },
  {
    idKey: 'harihareshwar',
    categoryKey: 'beaches',
    name: "Harihareshwar Beach",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673',
    desc: "A sacred Konkan beach town with an ancient Shiva temple set amidst four mystical hills. The secluded beach is pristine and peaceful, offering a soulful coastal getaway from Mumbai.",
    highlights: ["Ancient Shiva temple", "Pristine black-sand beach", "Four surrounding hills", "Spectacular sunsets"],
    bestTime: "October – March",
    distance: "200 km from Mumbai",
    itinerary: [
      "Day 1: Morning pickup from Mumbai → Drive via Mangaon → Harihareshwar beach → Temple darshan → Sunset",
      "Day 2: Coastal walk → Bagmandla visit → Return journey to Mumbai"
    ],
    food: "Fresh Konkan seafood & vegetarian thali options.",
    maxCapacity: 20,
    pricePerPerson: 3500,
    departureInfo: "Early morning pickup from Mumbai / Thane.",
    travelDetails: "AC Tempo Traveller or Mini-bus."
  },
  {
    idKey: 'ganpatipule',
    categoryKey: 'beaches',
    name: "Ganpatipule Beach",
    img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2670',
    desc: "A serene coastal gem with the revered Swayambhu Ganesh temple. The beach stretches for kilometers of golden sand, perfect for a soulful Konkan getaway from the hustle of Mumbai.",
    highlights: ["Swayambhu Ganesh Temple", "Golden-sand beach", "Jaigad Fort nearby", "Authentic Konkan cuisine"],
    bestTime: "October – February",
    distance: "375 km from Mumbai",
    itinerary: [
      "Day 1: Evening departure from Mumbai → Overnight journey → Arrival at Ganpatipule → Temple darshan → Beach",
      "Day 2: Jaigad Fort & Lighthouse → Return journey via coastal scenic route"
    ],
    food: "Authentic Konkani meals including Sol Kadhi and Modak.",
    maxCapacity: 15,
    pricePerPerson: 4500,
    departureInfo: "Evening departure from Mumbai / Navi Mumbai / Thane.",
    travelDetails: "Comfortable AC Sleeper Coach."
  },
  {
    idKey: 'ashtavinayak',
    categoryKey: 'pilgrim',
    name: "Ashtavinayak Circuit",
    img: 'https://images.unsplash.com/photo-1551649001-7a2d36de3a2d?q=80&w=2670',
    desc: "A divine yatra covering the eight sacred Ganesh temples. We craft a practical, spiritual route with comfortable transitions for Mumbai devotees.",
    highlights: ["8 sacred temples", "Swayambhu idols", "2-day circuit route", "Sattvic meals"],
    bestTime: "Year-round",
    distance: "Varies (Starts/Ends in Mumbai)",
    itinerary: [
      "Day 1: Mumbai → Pali → Mahad → Thevur → Ranjangaon → Overnight Stay",
      "Day 2: Ozar → Lenyadri → Siddhatek → Morgaon → Return to Mumbai"
    ],
    food: "Pure vegetarian Sattvic meals throughout.",
    maxCapacity: 35,
    pricePerPerson: 5800,
    departureInfo: "5:30 AM departure from Central Mumbai pickup points.",
    travelDetails: "AC Luxury Bus with Pushback seating."
  },
  {
    idKey: 'ujjain',
    categoryKey: 'pilgrim',
    name: "Ujjain",
    img: 'https://images.unsplash.com/photo-1616520058226-c96d1f34feba?q=80&w=2670',
    desc: "The holy city of Mahakaleshwar Jyotirlinga. Experience the divine Bhasma Aarti and the spiritual energy of the Kshipra river with our curated Mumbai-to-Ujjain tours.",
    highlights: ["Mahakaleshwar Jyotirlinga", "Bhasma Aarti", "Kshipra River Ghats", "Kal Bhairav Temple"],
    bestTime: "October – March",
    distance: "Train from Mumbai (BCT/BDTS)",
    itinerary: [
      "Day 1: Evening train from Mumbai → Overnight journey",
      "Day 2: Arrival at Ujjain → Hotel check-in → Evening Aarti at Mahakaleshwar",
      "Day 3: Pre-dawn Bhasma Aarti → Sightseeing → Return train journey"
    ],
    food: "Pure vegetarian hotel catering and local specialties.",
    maxCapacity: 25,
    pricePerPerson: 6500,
    departureInfo: "Train bookings included from Mumbai Railway Stations.",
    travelDetails: "Train (3AC/2AC) + Local Cab in Ujjain."
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in environment variables.");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding (Mumbai Edition)...');
    await Place.deleteMany({});
    console.log('Cleared existing places.');
    await Place.insertMany(placesData);
    console.log('✅ Successfully seeded ' + placesData.length + ' places to MongoDB (Mumbai distances updated).');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
