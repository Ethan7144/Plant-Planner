const express = require('express');
const Plant = require('../models/plant');
const Event = require('../models/event');
const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
  try {
    // find the plant
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // grabbing the start and end date from the search form
    let startDate = req.query.startDate ? new Date(req.query.startDate) : null;
    let endDate = req.query.endDate ? new Date(req.query.endDate) : null;

    let events;
    // if both dates are provided
    if (startDate && endDate) {
      events = await Event.find({
        plant: plant._id,
        // greater than start date and less than end date
        date: { $gte: startDate, $lte: endDate },
      });
      // only start date is provided
    } else if (startDate) {
      events = await Event.find({
        plant: plant._id,
        date: { $gte: startDate },
      });
      // only end date is provided
    } else if (endDate) {
      events = await Event.find({
        plant: plant._id,
        date: { $lte: endDate },
      });
      // no dates are provided
    } else {
      events = await Event.find({ plant: plant._id });
    }
    // render the events page
    res.render('events', { plant, events });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

// Delete Event
router.post('/:eventId', async (req, res) => {
  try {
    // find the plant
    const plant = await Plant.findById(req.params.id);
    if (!plant) {
      return res.status(404).send({ message: 'Plant not found' });
    }
    // find the event
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).send({ message: 'Event not found' });
    }
    // delete the event
    await event.deleteOne({ _id: req.params.eventId });

    // redirect to the events page
    res.redirect(`/plants/${plant._id}/events`);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Server error' });
  }
});

// Export the router
module.exports = router;
