var mongoose = require('mongoose');

var TransmissionSchema = new mongoose.Schema({
    id: Number,
    name: String
  });

  module.exports = mongoose.model('Transmissiontype', TransmissionSchema);