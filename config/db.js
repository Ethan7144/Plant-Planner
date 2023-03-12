const mongoose = require('mongoose');
const { token }= require('../config.json');
const connectDB = async () => {
  try {
    await mongoose.connect(token, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to database!');
  } catch (error) {
    console.log('Error connecting to database:', error);
  }
};
module.exports = connectDB;
