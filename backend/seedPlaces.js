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
    desc: "Sinhagad, the 'Lion's Fort', stands at 4,300 ft in the Sahyadri range. Famous for the Battle of Sinhagad led by Tanaji Malusare, it offers breathtaking views of Pune and the Western Ghats.",
    highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Panoramic valley views", "Ancient Devtak Temple"],
    bestTime: 'October – March',
    distance: '35 km from Pune',
    itinerary: [
      "Day 1: Morning pickup → Drive to Sinhagad base → Trek to fort → Explore ruins & temples → Sunset viewpoint",
      "Day 2: Early morning sunrise trek → Khadakwasla Dam visit → Return journey"
    ],
    food: "Local Maharashtrian snacks like Pithla Bhakri and Kanda Bhaji at the fort base. Packed lunch arranged on request.",
    maxCapacity: 25,
    pricePerPerson: 1200,
    departureInfo: "Hotel / designated pickup points across Pune & PCMC.",
    travelDetails: "Non-AC or AC mini-bus depending on group size."
  },
  {
    idKey: 'raigad',
    categoryKey: 'forts',
    name: 'Raigad Fort',
    img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2671',
    desc: "The capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. Raigad stands at 2,700 ft above sea level and features the majestic Maha Darwaja, Hirakani Bastion, and the famous coronation throne. A ropeway makes it accessible to all.",
    highlights: ["Coronation throne", "Hirakani Bastion", "Maha Darwaja", "Ropeway ride"],
    bestTime: "November – February",
    distance: "120 km from Pune",
    itinerary: [
      "Day 1: Pickup → Drive to Raigad base → Ropeway or trek → Fort exploration → Local overnight stay",
      "Day 2: Sunrise at the fort → Pachad village → Return journey"
    ],
    food: "Breakfast and dinner included. Local Maharashtrian thali meals.",
    maxCapacity: 20,
    pricePerPerson: 2500,
    departureInfo: "Pickup from major points across Pune, Navi Mumbai, and Thane.",
    travelDetails: "AC pushback seating. Ropeway tickets included."
  },
  {
    idKey: 'lohagad',
    categoryKey: 'forts',
    name: "Lohagad Fort",
    img: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=2673',
    desc: "The 'Iron Fort' near Lonavala, standing at 3,450 ft. Renowned for its dramatic Vinchukata (Scorpion's tail) formation and four magnificent gates. An ideal beginner-friendly trek with stunning monsoon waterfall views.",
    highlights: ["Vinchukata formation", "Four grand gates", "Bhaja Caves nearby", "Monsoon waterfalls"],
    bestTime: "July – September (monsoons)",
    distance: "65 km from Pune",
    itinerary: [
      "Day 1: Morning pickup → Malavli trailhead → Lohagad trek → Bhaja Caves exploration → Lonavala check-in",
      "Day 2: Local sightseeing (Tiger's Leap, Bhushi Dam) → Return journey"
    ],
    food: "Light snacks & packed lunch.",
    maxCapacity: 30,
    pricePerPerson: 1500,
    departureInfo: "Hotel or central pickup in Pune / Lonavala.",
    travelDetails: "Private tempo traveller or mini-bus."
  },
  {
    idKey: 'lonavala',
    categoryKey: 'hills',
    name: "Lonavala",
    img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2670',
    desc: "A beloved hill station in the Sahyadri range, celebrated for its lush monsoon greenery, cascading waterfalls, and the iconic chikki. Lonavala and its twin Khandala offer spectacular valley viewpoints, ancient Buddhist caves, and serene lakeside camping.",
    highlights: ["Tiger's Leap viewpoint", "Bhushi Dam", "Karla & Bhaja Caves", "Pawna Lake camping"],
    bestTime: "June – September",
    distance: "65 km from Pune",
    itinerary: [
      "Day 1: Morning pickup → Tiger's Leap → Bhushi Dam → Resort check-in",
      "Day 2: Pawna Lake sunrise → Karla Caves → Return journey"
    ],
    food: "All meals included. Lakeside BBQ dinner on Day 1.",
    maxCapacity: 15,
    pricePerPerson: 3000,
    departureInfo: "Flexible morning pickup from Pune, Mumbai, or Navi Mumbai.",
    travelDetails: "AC Sedan or Innova Crysta."
  },
  {
    idKey: 'mahabaleshwar',
    categoryKey: 'hills',
    name: "Mahabaleshwar",
    img: 'https://images.unsplash.com/photo-1608221245388-6ab68e552ddf?q=80&w=2670',
    desc: "The 'Strawberry Capital of India'. A premier hill station perched at 4,500 ft with sweeping viewpoints, an ancient Shiva temple, and vibrant strawberry farms. Year-round cool weather makes it ideal for honeymoons and family holidays alike.",
    highlights: ["Arthur's Seat viewpoint", "Venna Lake boating", "Mapro Garden", "Strawberry picking"],
    bestTime: "October – June",
    distance: "120 km from Pune",
    itinerary: [
      "Day 1: Morning pickup → Panchgani Table Land → Mapro Garden → Mahabaleshwar hotel check-in",
      "Day 2: Viewpoints tour (Arthur's Seat, Wilson, Kate's Point) → Venna Lake → Return journey"
    ],
    food: "Breakfast and premium hotel dining.",
    maxCapacity: 12,
    pricePerPerson: 4500,
    departureInfo: "Early morning pickup from Pune city.",
    travelDetails: "Luxury AC vehicle."
  },
  {
    idKey: 'harihareshwar',
    categoryKey: 'beaches',
    name: "Harihareshwar Beach",
    img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673',
    desc: "Known as the 'Devghar of the South', Harihareshwar is a sacred Konkan beach town with an ancient Shiva temple set amidst four mystical hills — Harihareshwar, Harshinachal, Pushpadri, and Bramhadri. The secluded beach is pristine and peaceful.",
    highlights: ["Ancient Shiva temple", "Pristine black-sand beach", "Four surrounding hills", "Spectacular sunsets"],
    bestTime: "October – March",
    distance: "190 km from Pune",
    itinerary: [
      "Day 1: Morning pickup → Drive via Tamini Ghat → Harihareshwar beach → Temple darshan → Sunset",
      "Day 2: Hill trek → Bankot Fort → Return journey"
    ],
    food: "Fresh Konkan seafood & vegetarian thali options.",
    maxCapacity: 20,
    pricePerPerson: 3200,
    departureInfo: "Overnight journey departing in the evening from Pune.",
    travelDetails: "AC pushback coach."
  },
  {
    idKey: 'ganpatipule',
    categoryKey: 'beaches',
    name: "Ganpatipule Beach",
    img: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?q=80&w=2670',
    desc: "A serene Konkan coastline gem with crystal-clear turquoise waters and the revered Swayambhu Ganesh temple — one of India's eight sacred Ganapathi shrines. The beach stretches for kilometers of golden sand, perfect for a soulful coastal getaway.",
    highlights: ["Swayambhu Ganesh Temple", "Golden-sand beach", "Jaigad Fort nearby", "Authentic Konkan cuisine"],
    bestTime: "October – February",
    distance: "340 km from Pune",
    itinerary: [
      "Day 1: Evening departure → Overnight journey → Arrival at Ganpatipule → Temple darshan → Beach relaxation",
      "Day 2: Jaigad Fort → Guhagar beach → Return journey via coastal road"
    ],
    food: "Authentic Konkani meals including Sol Kadhi, Modak, and fresh fish.",
    maxCapacity: 15,
    pricePerPerson: 4000,
    departureInfo: "Overnight departure from Pune, Mumbai, or Navi Mumbai.",
    travelDetails: "Spacious AC sleeper coach."
  },
  {
    idKey: 'ashtavinayak',
    categoryKey: 'pilgrim',
    name: "Ashtavinayak Circuit",
    img: 'https://images.unsplash.com/photo-1551649001-7a2d36de3a2d?q=80&w=2670',
    desc: "A divine yatra covering the eight sacred Ganesh temples of Maharashtra — Morgaon, Siddhatek, Pali, Mahad, Thevur, Lenyadri, Ozar, and Ranjangaon. Each temple houses a self-manifested (swayambhu) Ganesh idol, making this circuit profoundly spiritual.",
    highlights: ["8 sacred temples", "Swayambhu idols", "2-day circuit route", "Deeply spiritual atmosphere"],
    bestTime: "Year-round (Ganesh Chaturthi special)",
    distance: "Varies (90–220 km from Pune)",
    itinerary: [
      "Day 1: Pickup → Morgaon → Siddhatek → Pali → Mahad → Overnight stay",
      "Day 2: Thevur → Lenyadri → Ozar → Ranjangaon → Return journey"
    ],
    food: "Pure vegetarian Sattvic meals throughout.",
    maxCapacity: 35,
    pricePerPerson: 5500,
    departureInfo: "5:00 AM sharp from designated pickup points.",
    travelDetails: "Comfortable AC luxury bus."
  },
  {
    idKey: 'jyotirlinga',
    categoryKey: 'pilgrim',
    name: "Jyotirlinga Yatra",
    img: 'https://images.unsplash.com/photo-1544015759-111fb4372986?q=80&w=2670',
    desc: "A sacred multi-day journey to the revered 12 Jyotirlinga temples of Lord Shiva, spread across India. We craft a practical, spiritually enriching route with comfortable accommodation, early morning darshans, and flexible pacing for devotees.",
    highlights: ["Temple circuit planning", "Flexible & comfortable pace", "Curated daily schedules", "Custom route options"],
    bestTime: "October – March",
    distance: "Train or flight from Pune / Mumbai",
    itinerary: [
      "Day 1: Travel & check-in → Evening temple visit (if time permits)",
      "Day 2: Early morning darshan → Local ghats & temple sightseeing",
      "Day 3: Return journey"
    ],
    food: "Pure veg hotel catering and prasad meals.",
    maxCapacity: 40,
    pricePerPerson: 7500,
    departureInfo: "Train and flight bookings customized per group.",
    travelDetails: "Train (2AC/3AC) + local cab transfers."
  },
  {
    idKey: 'ujjain',
    categoryKey: 'pilgrim',
    name: "Ujjain",
    img: 'https://images.unsplash.com/photo-1616520058226-c96d1f34feba?q=80&w=2670',
    desc: "An ancient holy city on the banks of the sacred Kshipra River, home to the Mahakaleshwar Jyotirlinga — one of the 12 divine Jyotirlingas of Lord Shiva. Ujjain is also the site of the legendary Kumbh Mela and significant to Hindu astronomy.",
    highlights: ["Mahakaleshwar Jyotirlinga", "Bhasma Aarti (cremation ash ritual)", "Kshipra River Ghats", "Kal Bhairav Temple"],
    bestTime: "October – March",
    distance: "Train / Flight from Pune or Mumbai",
    itinerary: [
      "Day 1: Overnight train departure → Arrive Ujjain → Hotel check-in → Evening Aarti at Mahakaleshwar",
      "Day 2: Pre-dawn Bhasma Aarti → Kal Bhairav Temple → Harsiddhi Temple → Kshipra Ghat → Return journey"
    ],
    food: "High quality pure vegetarian meals. Hotel breakfast & dinner included.",
    maxCapacity: 25,
    pricePerPerson: 6500,
    departureInfo: "Overnight train from Pune or Mumbai (booking included).",
    travelDetails: "Train (2AC/3AC) + local cab in Ujjain."
  }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found in environment variables.");
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');
    await Place.deleteMany({});
    console.log('Cleared existing places.');
    await Place.insertMany(placesData);
    console.log('✅ Successfully seeded ' + placesData.length + ' places to MongoDB (Pimpri-Chinchwad references removed).');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
