const Place = require('../models/Place');
const mongoose = require('mongoose');

// @desc Get all places or categorized places
// @route GET /api/places
exports.getPlaces = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;

    if (!isDbConnected) {
      console.warn("⚠️  [DATABASE] MongoDB is not connected. API will return 503.");
      return res.status(503).json({ message: "Database not connected" });
    }

    const { category } = req.query;
    let query = {};
    if (category) {
      query.categoryKey = category;
    }

    const places = await Place.find(query).sort({ createdAt: -1 });
    res.status(200).json(places);
  } catch (error) {
    console.error("❌ [ERROR] Error fetching places:", error.message);
    res.status(500).json({ message: 'Server error fetching places', error: error.message });
  }
};

// @desc Get single place by idKey
// @route GET /api/places/:idKey
exports.getPlaceByIdKey = async (req, res) => {
  try {
    const place = await Place.findOne({ idKey: req.params.idKey });
    if (!place) return res.status(404).json({ message: 'Place not found' });
    res.status(200).json(place);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Create a new place
// @route POST /api/places
exports.createPlace = async (req, res) => {
  try {
    const newPlace = new Place(req.body);
    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A place with this ID Key already exists.', error: error.message });
    }
    res.status(500).json({ message: 'Error creating place', error: error.message });
  }
};

// @desc Update a place
// @route PATCH /api/places/:id
exports.updatePlace = async (req, res) => {
  try {
    const updatedPlace = await Place.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPlace) return res.status(404).json({ message: 'Place not found' });
    res.json(updatedPlace);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A place with this ID Key already exists.', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc Delete a place
// @route DELETE /api/places/:id
exports.deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);
    if (!deletedPlace) return res.status(404).json({ message: 'Place not found' });
    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
