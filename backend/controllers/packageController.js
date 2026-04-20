const mongoose = require('mongoose');
const Package = require('../models/Package');

// Dummy data for fallback if MongoDB is not connected
const DUMMY_PACKAGES = [
  {
    _id: 'dummy_1',
    destination: 'Ujjain & Omkareshwar',
    price: 15500,
    maxPeople: 12,
    image: 'https://images.unsplash.com/photo-1544015759-111fb4372986?q=80&w=2670',
    duration: '3 Days / 2 Nights',
    description: 'Experience the spiritual essence of Shipra river and the ancient Jyotirlingas.',
    itinerary: ['Arrival at Ujjain', 'Omkareshwar Visit', 'Departure'],
    emoji: '🕉️',
    status: 'Bookable'
  },
  {
    _id: 'dummy_2',
    destination: 'Maharashtra Forts Expedition',
    price: 8900,
    maxPeople: 20,
    image: 'https://images.unsplash.com/photo-1610448154563-7182962f074d?q=80&w=2670',
    duration: '4 Days / 3 Nights',
    description: 'A historical journey through Sinhagad, Raigad, and Lohagad.',
    itinerary: ['Sinhagad Trek', 'Raigad Exploration', 'Lohagad History', 'Return'],
    emoji: '🏰',
    status: 'Active'
  },
  {
    _id: 'dummy_3',
    destination: 'Goa Coastal Retreat',
    price: 22000,
    maxPeople: 8,
    image: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=2670',
    duration: '5 Days / 4 Nights',
    description: 'Relax on the pristine beaches and explore the Portuguese heritage.',
    itinerary: ['North Goa Beaches', 'South Goa Relaxation', 'Old Goa Tour', 'Departure'],
    emoji: '🏖️',
    status: 'Premium'
  }
];

const Place = require('../models/Place'); // Support fallback mapping

// @desc Get all packages (with fallback support)
// @route GET /api/packages
exports.getPackages = async (req, res) => {
  try {
    // Check if MongoDB is connected (readyState 1 = connected)
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      console.warn("⚠️  [FALLBACK] MongoDB is not connected. Returning dummy package data.");
      return res.status(200).json(DUMMY_PACKAGES);
    }

    let packages = await Package.find().lean().sort({ createdAt: -1 });
    
    // If database is empty, return dummy data as fallback.
    if (packages.length === 0) {
      console.warn("⚠️  [DATABASE] Empty packages collection, returning dummy data as fallback.");
      return res.status(200).json(DUMMY_PACKAGES);
    }

    // 🚀 DYNAMIC IMAGE FALLBACK LOGIC
    // If a package does not have an image, borrow it from its matching Place
    const places = await Place.find().lean();
    packages = packages.map(pkg => {
      if (!pkg.image || pkg.image === "") {
        // Try to match place.name to package.destination
        const matchingPlace = places.find(p => p.name.toLowerCase() === pkg.destination.toLowerCase());
        if (matchingPlace && matchingPlace.img) {
          pkg.image = matchingPlace.img;
        }
      }
      return pkg;
    });

    console.log(`✅ [DATABASE] Fetched ${packages.length} packages from MongoDB.`);
    res.status(200).json(packages);
  } catch (error) {
    console.error("❌ [ERROR] Error fetching packages:", error.message);
    // If some database error occurs but technically connected, we still provide fallback if DB is empty/fails
    console.warn("⚠️  [FALLBACK] Returning dummy data due to fetch error.");
    res.status(200).json(DUMMY_PACKAGES);
  }
};

// @desc Create a new package
exports.createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error: error.message });
  }
};

// @desc Update a package
exports.updatePackage = async (req, res) => {
  try {
    // 🧱 PREVENT UPDATING DUMMY DATA
    if (req.params.id && String(req.params.id).startsWith('dummy_')) {
      return res.status(403).json({ 
        message: 'Forbidden: Cannot update demo data. Please connect to MongoDB to manage real packages.' 
      });
    }

    const updateData = { ...req.body };
    const { removeImage } = updateData;
    delete updateData.removeImage; // Remove the custom flag from the pure data payload

    // 1. Strictly ignore empty image fields to preserve existing image
    if (!updateData.image || updateData.image === "") {
      delete updateData.image;
    }

    // 2. Build the MongoDB update operation using $set
    const dbUpdate = { $set: updateData };

    // 3. Explicitly handle 'removeImage = true'
    if (removeImage === true) {
      dbUpdate.$set.image = ""; // Or $unset, but the model uses default: '' so we set to empty string
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, 
      dbUpdate, 
      { new: true, runValidators: true } // Ensures new partial document is returned safely
    );
    
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Delete a package
exports.deletePackage = async (req, res) => {
  try {
    // 🧱 PREVENT DELETING DUMMY DATA
    if (req.params.id && String(req.params.id).startsWith('dummy_')) {
      return res.status(403).json({ 
        message: 'Forbidden: Cannot delete demo data.' 
      });
    }

    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
