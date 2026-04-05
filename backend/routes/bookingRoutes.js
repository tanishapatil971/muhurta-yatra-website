const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /api/bookings - Create booking
router.post('/', bookingController.createBooking);

// GET /api/bookings - List all bookings
router.get('/', bookingController.getBookings);

module.exports = router;
