const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  message: { type: String },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  status: { type: String, enum: ['pending', 'contacted', 'closed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Enquiry', enquirySchema);
