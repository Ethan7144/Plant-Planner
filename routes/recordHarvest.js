const express = require('express');
const Plant = require('../models/plant');
const Harvest = require('../models/harvest');
const router = express.Router({ mergeParams: true });

router.post('/', async (req, res) => {
  try {
    // find the plant by id
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // create a new harvest
    const harvest = new Harvest({
      plant: plant._id,
      date: req.body.date,
      weight: req.body.weight,
      quantity: req.body.quantity
    });
    // save the event
    await harvest.save();
    // redirect to the events page
    return res.status(201).redirect(`/plants/${plant._id}/harvests`);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // render the new event page
    res.render('newHarvest', { plant });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
