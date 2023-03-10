const express = require('express');
const Plant = require('../models/plant');
const router = express.Router();

// Render the search page
router.get('/', (req, res) => {
  res.render('plantbyname');
});

// Handle the form submission and render the plant info page
router.post('/', async (req, res) => {
  try {
    const plantName = req.body.name;
    // Find the plant by name
    const foundPlant = await Plant.findOne({ name: plantName }).exec();
    res.render('foundplant', { plant: foundPlant });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
