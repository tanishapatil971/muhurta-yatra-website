const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const Place = require('../models/Place');
const Enquiry = require('../models/Enquiry');

const professionalPackages = [
  {
    idKey: 'ashtavinayak-premium',
    categoryKey: 'pilgrim',
    name: 'Ashtavinayak Darshan - Premium Circuit',
    img: 'https://images.unsplash.com/photo-1620311756555-520e5889fc6f?q=80&w=1200&auto=format&fit=crop',
    desc: 'A divine 2-day soul-stirring yatra covering the eight sacred Ganesha temples with premium AC travel and Sattvic stay.',
    highlights: ['Pali -> Mahad -> Thevur -> Ranjangaon', 'Ozar -> Lenyadri -> Siddhatek -> Morgaon', 'Pure Veg Sattvic Meals', 'Luxury AC Coach'],
    bestTime: 'Year-round',
    distance: 'Flexible (Starts from Mumbai/Pune)',
    itinerary: [
      'Day 1: 5 AM Pickup -> Visit Pali & Mahad -> Lunch -> Thevur & Ranjangaon -> Overnight at Hotel',
      'Day 2: Morning Aarti -> Ozar & Lenyadri -> Siddhatek & Morgaon -> Return by 10 PM'
    ],
    food: 'Premium Sattvic (No Onion/Garlic) pure vegetarian meals included.',
    maxCapacity: 35,
    pricePerPerson: 6500,
    departureInfo: 'Pickups from Dadar, Thane, Vashi, and Hinjewadi (Pune).'
  },
  {
    idKey: 'konkan-coastal-escape',
    categoryKey: 'beaches',
    name: 'Konkan Coastal Bliss: Ganpatipule & Jaigad',
    img: 'https://images.unsplash.com/photo-1590523741477-24a9a01669d2?q=80&w=1200&auto=format&fit=crop',
    desc: 'Unwind at the pristine black-sand beaches of the Konkan coast. Visit the ancient Swayambhu Ganesh Temple and explore Jaigad Fort.',
    highlights: ['Shoreline Temple Visit', 'Jaigad Lighthouse Sunset', 'Authentic Malvani Cuisine', 'Water Sports at Malgund'],
    bestTime: 'October – February',
    distance: '330 km from Pune/Mumbai',
    itinerary: [
      'Day 1: Coastal drive -> Check-in at Beach Resort -> Temple Darshan -> Beach Relaxation',
      'Day 2: Jaigad Fort trip -> Lighthouse view -> Local shopping -> Evening Sol Kadhi & Sea Breeze',
      'Day 3: Sunrise Beach walk -> Breakfast -> Return Journey'
    ],
    food: 'Fresh seafood specialized Konkani Thali and vegetarian options available.',
    maxCapacity: 12,
    pricePerPerson: 8500,
    departureInfo: 'Private AC SUV pickup from your doorstep.'
  },
  {
    idKey: 'sahyadri-monsoon-magic',
    categoryKey: 'forts',
    name: 'Sahyadri Fort Trail: Lohagad & Visapur',
    img: 'https://images.unsplash.com/photo-1621516709895-356619623136?q=80&w=1200&auto=format&fit=crop',
    desc: 'Experience the thunderous monsoons of Maharashtra. A perfect blend of heritage and adventure through the misty Iron Fort.',
    highlights: ["Vinchukata (Scorpion's Tail)", "Ancient Buddhist Caves", "Cascading Waterfalls", "Historical Military Architecture"],
    bestTime: 'July – September',
    distance: '65 km from Pune / 95 km from Mumbai',
    itinerary: [
      'Day 1: Morning gathering -> Base village breakfast -> Guided trek to Lohagad -> Explore Vinchukata -> Return via Bhaja Caves'
    ],
    food: 'Traditional Pithla-Bhakri and Thecha lunch at the base village.',
    maxCapacity: 25,
    pricePerPerson: 1800,
    departureInfo: 'Pickups from Shivajinagar (Pune) and Navi Mumbai.'
  },
  {
    idKey: 'mahabaleshwar-retreat',
    categoryKey: 'hills',
    name: 'Strawberry Fields: Mahabaleshwar & Panchgani',
    img: 'https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1200&auto=format&fit=crop',
    desc: 'A premium long weekend getaway to the queen of hill stations. Enjoy panoramic valley views, lake boating, and visits to exclusive strawberry farms.',
    highlights: ["Arthur's Seat Point", "Venna Lake Boating", "Mapro Garden Visit", "Premium Resort Stay"],
    bestTime: 'November – March',
    distance: '120 km from Pune / 260 km from Mumbai',
    itinerary: [
      'Day 1: Drive to Panchgani -> Table Land sunset -> Resort Check-in',
      'Day 2: Mahabaleshwar Sightseeing -> Old Temple Darshan -> Evening at Venna Lake',
      'Day 3: Mapro Garden Breakfast -> Strawberry Farm Visit -> Return Journey'
    ],
    food: 'Luxury buffet with local specialties and strawberry delicacies.',
    maxCapacity: 12,
    pricePerPerson: 10500,
    departureInfo: 'Private AC Cab pickup from Pune/Mumbai.'
  },
  {
    idKey: 'raigad-heritage',
    categoryKey: 'forts',
    name: 'Raigad: The Royal Maratha Capital',
    img: 'https://images.unsplash.com/photo-1621516709895-356619623136?q=80&w=1200&auto=format&fit=crop',
    desc: 'Pay homage to the capital of the Maratha Empire. Experience the thrill of the ropeway and the majesty of the throne room.',
    highlights: ['Nagarkhana & Throne Room', 'Hirakani Cliff', 'Aerial Ropeway Ride', 'Fort Heritage Walk'],
    bestTime: 'July – February',
    distance: '130 km from Pune',
    itinerary: [
      'Day 1: Scenic drive -> Base village -> Ropeway to Fort -> Guided Heritage Tour -> Sunset at Takmak Tok -> Return'
    ],
    food: 'Authentic Maharashtrian lunch (Pithla-Bhakri) at the fort top.',
    maxCapacity: 30,
    pricePerPerson: 2200,
    departureInfo: 'Pickups from Deccan and Swargate (Pune).'
  },
  {
    idKey: 'alibaug-weekend',
    categoryKey: 'beaches',
    name: 'Alibaug: Coastal Comfort & Water Sports',
    img: 'https://images.unsplash.com/photo-1590523741477-24a9a01669d2?q=80&w=1200&auto=format&fit=crop',
    desc: 'The perfect quick getaway from Mumbai. Enjoy ferry rides, historical sea forts, and adrenaline-pumping water sports.',
    highlights: ['Kolaba Sea Fort', 'Varsoli Beach Jet Ski', 'Seafood Feast', 'Ferry from Gateway of India'],
    bestTime: 'November – April',
    distance: '100 km from Mumbai',
    itinerary: [
      'Day 1: Ferry to Mandwa -> Transfer to Alibaug -> Beach Water Sports -> Poolside Dinner',
      'Day 2: Visit Kolaba Fort -> Revdanda heritage -> Departure'
    ],
    food: 'Premium seafood and coastal delicacies included.',
    maxCapacity: 15,
    pricePerPerson: 5500,
    departureInfo: 'Gateway of India / Ferry Terminal pickup.'
  },
  {
    idKey: 'shirdi-divine',
    categoryKey: 'pilgrim',
    name: 'Shirdi Sai Baba: Spiritual Yatra',
    img: 'https://images.unsplash.com/photo-1620311756555-520e5889fc6f?q=80&w=1200&auto=format&fit=crop',
    desc: 'Perform the divine darshan of Sai Baba. A soulful journey to one of the most revered spiritual sites in India.',
    highlights: ['VIP Darshan Access', 'Visit Shani Shingnapur', 'Sai Museum Tour', 'Peaceful Dwarkamai'],
    bestTime: 'Year-round',
    distance: '200 km from Pune',
    itinerary: [
      'Day 1: Early morning departure -> Arrival Shirdi -> Evening Aarti -> Overnight Stay',
      'Day 2: Morning Darshan -> Shani Shingnapur Visit -> Return'
    ],
    food: 'Pure vegetarian Sattvic meals at premium hotels.',
    maxCapacity: 40,
    pricePerPerson: 4800,
    departureInfo: 'AC Private Coach pickup from Mumbai/Pune.'
  },
  {
    idKey: 'panchgani-hills',
    categoryKey: 'hills',
    name: 'Panchgani: Table Land & Valley View',
    img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    desc: 'Famous for its boarding schools and the massive Table Land volcanic plateau. Experience the charm of Parsi houses and local markets.',
    highlights: ['Table Land Horse Riding', 'Parsi Point Sunset', 'Organic Farm Visit', 'Historical Caves'],
    bestTime: 'September – May',
    distance: '100 km from Pune',
    itinerary: [
      'Day 1: Arrival -> Table Land exploration -> Parsi Point -> Local market visit -> Return'
    ],
    food: 'Continental and Local cuisines provided.',
    maxCapacity: 20,
    pricePerPerson: 3200,
    departureInfo: 'Private AC Cars from Pune.'
  },
  {
    idKey: 'tarkarli-scuba',
    categoryKey: 'beaches',
    name: 'Tarkarli: Scuba Adventure & Backwaters',
    img: 'https://images.unsplash.com/photo-1544257740-97597f805903?q=80&w=1200&auto=format&fit=crop',
    desc: 'Known for its crystal clear waters and Karli river backwaters. Experience the thrill of scuba diving and snorkeling.',
    highlights: ['Scuba Diving Session', 'Sindhudurg Sea Fort', 'Dolphin Spotting', 'Malvani Food Experience'],
    bestTime: 'October – May',
    distance: '500 km from Mumbai',
    itinerary: [
      'Day 1: Arrival -> Sindhudurg Fort -> Malvani Dinner',
      'Day 2: Scuba Diving -> Backwater Boat Ride -> Beach Bonfire',
      'Day 3: Sunrise Relax -> Return'
    ],
    food: 'Authentic Malvani seafood and vegetarian dishes.',
    maxCapacity: 10,
    pricePerPerson: 12500,
    departureInfo: 'Luxury Sleeper Coach / Private SUV.'
  },
  {
    idKey: 'lonavala-luxury',
    categoryKey: 'hills',
    name: 'Lonavala Luxury: Mists & Mountains',
    img: 'https://images.unsplash.com/photo-1626014303757-646c21dc90b3?q=80&w=1200&auto=format&fit=crop',
    desc: 'The ultimate getaway to the mist-covered peaks of Lonavala. Stay at a 5-star resort and explore the ancient Karla Caves and Bhushi Dam.',
    highlights: ['Karla & Bhaja Caves', 'Luxury Resort Experience', 'Sunset at Tiger Point', 'Private Guided Tour'],
    bestTime: 'June – October',
    distance: '65 km from Pune',
    itinerary: [
      'Day 1: Morning pickup -> Caves exploration -> Resort Check-in -> Evening at Tiger Point',
      'Day 2: Bhushi Dam -> Local Chikki shopping -> Luxury Lunch -> Return'
    ],
    food: 'Gourmet buffet and local Maharashtrian delicacies.',
    maxCapacity: 8,
    pricePerPerson: 14500,
    departureInfo: 'Premium AC SUV Pickup.'
  },
  {
    idKey: 'matheran-eco',
    categoryKey: 'hills',
    name: 'Matheran: The Eco-Friendly Escape',
    img: 'https://images.unsplash.com/photo-1626014303757-646c21dc90b3?q=80&w=1200&auto=format&fit=crop',
    desc: 'Step back in time at Asia\'s only automobile-free hill station. Enjoy horseback rides and colonial-era architecture in a forest setting.',
    highlights: ['Automobile-Free Zone', 'Horseback Excursions', 'Valley View Point', 'Toy Train Experience'],
    bestTime: 'September – March',
    distance: '80 km from Mumbai',
    itinerary: [
      'Day 1: Drive to Neral -> Toy Train / Horse ride to Entry -> Check-in -> Sunset at Panorama Point',
      'Day 2: Echo Point -> Charlotte Lake walk -> Local Handicrafts -> Departure'
    ],
    food: 'Authentic forest-view dining with organic ingredients.',
    maxCapacity: 15,
    pricePerPerson: 7200,
    departureInfo: 'Pickup from Neral Station.'
  }
];

const sampleEnquiries = [
  {
    name: "Aditya Deshmukh",
    phone: "9823456789",
    email: "aditya.d@gmail.com",
    message: "I am interested in the Ashtavinayak tour for my parents. Please share the hotel details.",
    status: "pending"
  },
  {
    name: "Snehal Patil",
    phone: "8888776655",
    email: "snehal.p@outlook.com",
    message: "Do you have any customized honeymoon packages for Konkan?",
    status: "contacted"
  },
  {
    name: "Vikram Joshi",
    phone: "7766554433",
    email: "vikram.j@company.com",
    message: "Group booking enquiry for Sahyadri trek - 15 people.",
    status: "pending"
  }
];

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("MONGO_URI not found in environment variables.");

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for professional seeding...");

    // Clear existing
    await Place.deleteMany({});
    await Enquiry.deleteMany({});
    console.log("Cleared existing places and enquiries.");

    // Insert new
    await Place.insertMany(professionalPackages);
    await Enquiry.insertMany(sampleEnquiries);

    console.log(`✅ Successfully seeded ${professionalPackages.length} professional packages.`);
    console.log(`✅ Successfully seeded ${sampleEnquiries.length} test enquiries.`);
    
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
