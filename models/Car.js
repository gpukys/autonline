var mongoose = require('mongoose');

var CarSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    fuelType: Number,
    transmissionType: Number,
    chassisType: Number,
    description: String,
    telephone: String,
    picture: Array,
    city: String,
    price: Number,
    updatedDate: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Car', CarSchema);