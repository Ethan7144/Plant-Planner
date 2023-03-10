const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  plant: {
    type: String,
    ref: 'plant'
  },
  date: Date,
  eventType: String,
  description: String
});

module.exports = mongoose.model('Event', eventSchema);
