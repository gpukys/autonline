var mongoose = require('mongoose');

var FuelSchema = new mongoose.Schema({
    id: Number,
    name: String
  });

  module.exports = mongoose.model('Fueltype', FuelSchema);