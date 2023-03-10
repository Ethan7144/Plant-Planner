const mongoose = require('mongoose');

const harvestSchema = new mongoose.Schema({
  plant: {
    type: String,
    ref: 'Plant'
  },
  date: Date,
  weight: Number,
  quantity: Number
});

module.exports = mongoose.model('Harvest', harvestSchema);
