var mongoose = require('mongoose');

var ChassisSchema = new mongoose.Schema({
    id: Number,
    name: String
  });

  module.exports = mongoose.model('Chassistype', ChassisSchema);