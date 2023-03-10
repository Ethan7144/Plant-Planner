const express = require('express');
const Plant = require('../models/plant');
const Harvest = require('../models/harvest');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    // find the plant
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // grabbing the start and end date from the search form
    let harvests;
    // if both dates are provided
      harvests = await Harvest.find({ plant: plant._id });
    // render the events page
    res.render('harvest', { plant, harvests });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});


// Export the router
module.exports = router;