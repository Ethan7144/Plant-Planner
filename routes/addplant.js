const express = require('express');
const Plant = require('../models/plant');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('addPlant', { title: 'Add Plant' });
});

router.post('/', (req, res) => {
  // create a new plant
  const newPlant = new Plant({
    name: req.body.name,
    species: req.body.species,
    cultivar: req.body.cultivar,
  });

  // save the new plant
  newPlant.save()
    .then(() => {
      console.log('New Plant created!');
      res.redirect('/plants');
    })
    .catch((error) => {
      console.log('Error creating Plant:', error);
    });
});

module.exports = router;
