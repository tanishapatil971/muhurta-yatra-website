const express = require('express');
const router = express.Router();
const placeController = require('../controllers/placeController');

// GET /api/places - Get all places (can filter by ?category=forts)
router.get('/', placeController.getPlaces);

// GET /api/places/:idKey - Get single place by idKey
router.get('/:idKey', placeController.getPlaceByIdKey);

// POST /api/places - Create a new place
router.post('/', placeController.createPlace);

// PATCH /api/places/:id - Update a place
router.patch('/:id', placeController.updatePlace);

// DELETE /api/places/:id - Delete a place
router.delete('/:id', placeController.deletePlace);

module.exports = router;
