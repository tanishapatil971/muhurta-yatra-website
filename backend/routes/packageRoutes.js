const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// POST /api/packages - Create a new package
router.post('/', async (req, res) => {
  try {
    const { destination, price, maxPeople, image, duration, description, itinerary } = req.body;
    
    // Validation
    if (!destination || !price || !maxPeople) {
      return res.status(400).json({ message: 'All fields (destination, price, maxPeople) are required' });
    }

    const newPackage = new Package({
      destination,
      price,
      maxPeople,
      image,
      duration,
      description,
      itinerary
    });

    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating package', error: error.message });
  }
});

// GET /api/packages - Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error: error.message });
  }
});

module.exports = router;
