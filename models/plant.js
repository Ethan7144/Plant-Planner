const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: String,
  species: String,
  cultivar: String,
  isAlive: {
    type: Boolean,
    default: true // the default value for the plant being alive
  },
  
});

module.exports = mongoose.model('Plant', plantSchema);