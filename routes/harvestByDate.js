const express = require('express');
const Harvest = require('../models/harvest');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.render('harvestByDate');
});

// Handle the form submission and render the plant info page
router.post('/', async (req, res) => {
  try {
    const harvestDate = req.body.date;
    // Find the harvests by date
    const foundHarvests = await Harvest.find({ date: harvestDate }).exec();
    res.render('foundharvests', { harvests: foundHarvests });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal server error');
  }
});


module.exports = router;
