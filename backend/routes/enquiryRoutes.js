const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST /api/enquiries - save new enquiry
router.post('/', async (req, res) => {
  try {
    const newEnquiry = new Enquiry(req.body);
    const savedEnquiry = await newEnquiry.save();
    res.status(201).json(savedEnquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error creating enquiry', error: error.message });
  }
});

// GET /api/enquiries - return all enquiries sorted by newest first
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching enquiries', error: error.message });
  }
});

// PATCH /api/enquiries/:id - update enquiry status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status must be provided' });
    }
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!updatedEnquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }
    res.status(200).json(updatedEnquiry);
  } catch (error) {
    res.status(400).json({ message: 'Error updating enquiry status', error: error.message });
  }
});

module.exports = router;
