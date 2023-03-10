const express = require('express');
const Plant = require('../models/plant');

const router = express.Router();

router.get('/', (req, res) => {
  // find all plants
  Plant.find()
    .then((plants) => {
      res.render('plants', { title: 'All Plants', plants: plants });
    })
    .catch((error) => {
      console.log('Error fetching plants:', error);
    });
});

module.exports = router;