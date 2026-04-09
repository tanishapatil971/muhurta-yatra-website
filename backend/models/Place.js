const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  idKey: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  categoryKey: {
    type: String,
    required: true,
    enum: ['forts', 'hills', 'beaches', 'pilgrim'],
  },
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  highlights: [
    {
      type: String,
    }
  ],
  bestTime: {
    type: String,
    required: true,
  },
  distance: {
    type: String,
    required: true,
  },
  itinerary: [
    {
      type: String,
    }
  ],
  // Dynamic Itinerary / PDF Fields
  food: {
    type: String,
    default: 'Meals included as per local availability. Vegetarian options preferred.',
  },
  maxCapacity: {
    type: Number,
    default: 15,
  },
  pricePerPerson: {
    type: Number,
    default: 0,
  },
  departureInfo: {
    type: String,
    default: 'Pimpri-Chinchwad pickup points available.',
  },
  travelDetails: {
    type: String,
    default: 'Travel by AC bus/traveler. Rest stops will be provided.',
  },
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);
