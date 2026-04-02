const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  maxPeople: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  itinerary: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
