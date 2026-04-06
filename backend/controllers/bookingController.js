const Booking = require('../models/Booking');

// @desc Create a new booking
// @route POST /api/bookings
exports.createBooking = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, travelersCount, packageId, packageName, totalPrice } = req.body;

    // 1. Basic validation
    if (!fullName || !email || !phoneNumber || !travelersCount || !packageId || !packageName || !totalPrice) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required. Please fill in all information.',
      });
    }

    // 2. Email format validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format. Please check your email.',
      });
    }

    // 3. Travelers count validation
    if (Number(travelersCount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Number of travelers must be at least 1.',
      });
    }

    // 4. Check for database connection
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️  [BOOKING FALLBACK] No MongoDB connection available. Booking cannot be saved.');
      return res.status(503).json({
        success: false,
        message: 'Our booking system is currently in maintenance mode (offline). Please contact us on WhatsApp directly for urgent reservations.',
      });
    }

    // 5. Save to database
    const newBooking = new Booking({
      fullName,
      email,
      phoneNumber,
      travelersCount,
      packageId,
      packageName,
      totalPrice,
    });

    const savedBooking = await newBooking.save();

    console.log(`✅ [BOOKING] Success: New booking created for ${fullName} (${packageName})`);
    res.status(201).json({
      success: true,
      message: 'Booking request submitted successfully!',
      booking: savedBooking,
    });
  } catch (error) {
    console.error('❌ [BOOKING ERROR]:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error while processing booking. Please try again later.',
      error: error.message,
    });
  }
};

// @desc Get all bookings
// @route GET /api/bookings
exports.getBookings = async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      console.warn('⚠️  [BOOKING FETCH FALLBACK] No MongoDB connection available.');
      return res.status(200).json({
        success: true,
        message: 'Currently in fallback mode (DB Offline). Showing 0 records.',
        count: 0,
        bookings: [],
      });
    }

    const bookings = await Booking.find().populate('packageId').sort({ createdAt: -1 });

    console.log(`✅ [BOOKING] Fetched ${bookings.length} bookings for analysis.`);
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error('❌ [BOOKING FETCH ERROR]:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching bookings.',
      error: error.message,
    });
  }
};
