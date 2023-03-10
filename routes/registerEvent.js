const express = require('express');
const Plant = require('../models/plant');
const Event = require('../models/event');
const router = express.Router({ mergeParams: true });

router.post('/:id', async (req, res) => {
  try {
    // find the plant by id
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // create a new event
    const event = new Event({
      plant: plant._id,
      date: req.body.date,
      eventType: req.body.eventType,
      description: req.body.description
    });
    // save the event
    await event.save();
    // redirect to the events page
    return res.status(201).redirect(`/plants/${plant._id}/events`);
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
    res.render('newEvent', { plant });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
