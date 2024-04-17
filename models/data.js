const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  travel_destination: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  airline: {
    type: String,
    required: true,
  },
});

const Travel = mongoose.model('Travel', travelSchema);

module.exports = Travel;
