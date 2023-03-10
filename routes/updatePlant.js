const express = require('express');
const Plant = require('../models/plant');

const router = express.Router();

router.get('/:id/name', (req, res) => {
  const plantId = req.params.id;
  
  Plant.findById(plantId)
    .then((plant) => {
      if (!plant) {
        res.status(404).send('Plant not found');
      } else {
        res.render('updateplant', { title: 'Update Plant Name', plant: plant });
      }
    })
    .catch((error) => {
      console.log('Error fetching plant:', error);
      res.status(500).send('Server error');
    });
});

router.post('/:id/name', (req, res) => {
  const plantId = req.params.id;
  const plantName = req.body.name;

  Plant.findById(plantId)
    .then((plant) => {
      if (!plant) {
        res.status(404).send('Plant not found');
      } else if (plant.isAlive === false) {
        console.log('Plant name cannot be updated as it is already dead');
        res.redirect('/plants');
      } else{

        Plant.findByIdAndUpdate(plantId, { name: plantName })
    .then(() => {
      console.log('Plant name updated!');
      res.redirect('/plants');
    })
    .catch((error) => {
      console.log('Error updating plant name:', error);
    });

    }
  });
  
});

module.exports = router;
