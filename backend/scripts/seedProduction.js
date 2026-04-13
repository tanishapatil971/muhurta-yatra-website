const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const Place = require('../models/Place');
const Enquiry = require('../models/Enquiry');

const samplePlaces = [
  {
    idKey: 'sinhagad',
    categoryKey: 'forts',
    name: 'Sinhagad Fort',
    img: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=2670',
    desc: "A majestic hill fortress known for its historical significance and breathtaking panoramic views of the Sahyadris.",
    highlights: ["Tanaji Memorial", "Konde Dwar entrance", "Breathtaking Valley Views"],
    bestTime: 'October – March',
    distance: '180 km from Mumbai',
    itinerary: ["Early morning pickup", "Fort trek & explanation", "Local Pithla Bhakri lunch", "Sunset at base"],
    food: "Authentic Maharashtrian meals",
    maxCapacity: 30,
    pricePerPerson: 1200,
    departureInfo: "Pickup from major hubs in Mumbai & Navi Mumbai."
  },
  {
    idKey: 'lonavala',
    categoryKey: 'hills',
    name: 'Lonavala & Khandala',
    img: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2670',
    desc: "The quintessential weekend retreat, famous for its lush landscapes, waterfalls, and the iconic chikki.",
    highlights: ["Tiger's Point", "Bhushi Dam", "Rajmachi Garden"],
    bestTime: 'June – September',
    distance: '85 km from Mumbai',
    itinerary: ["Morning drive from Mumbai", "Viewpoint tours", "Waterfall exploration", "Evening return"],
    food: "Resort buffet & local snacks",
    maxCapacity: 15,
    pricePerPerson: 2500,
    departureInfo: "Flexible home pickup available for small groups."
  }
];

const sampleEnquiries = [
  {
    name: "Rahul Verma",
    phone: "9876543210",
    email: "rahul@example.com",
    message: "Interested in the Sinhagad trek for a group of 10 people.",
    status: "pending"
  },
  {
    name: "Sneha Kapoor",
    phone: "8765432109",
    email: "sneha@example.com",
    message: "Looking for honeymoon packages in Mahabaleshwar.",
    status: "contacted"
  }
];

async function seed() {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("MONGO_URI not found");

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for production seeding...");

    // Clear existing
    await Place.deleteMany({});
    await Enquiry.deleteMany({});

    // Insert new
    await Place.insertMany(samplePlaces);
    await Enquiry.insertMany(sampleEnquiries);

    console.log("✅ Production seed data inserted successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
