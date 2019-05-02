var mongoose = require('mongoose');

var CarBrandSchema = new mongoose.Schema({
    brand: String,
    models: Array
  });

  module.exports = mongoose.model('Carbrand', CarBrandSchema);