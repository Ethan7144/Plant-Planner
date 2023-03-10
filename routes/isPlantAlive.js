const express = require('express');
const Plant = require('../models/plant');
const router = express.Router();

router.get('/:id/status', (req, res) => {
  const plantId = req.params.id;

  // Find the plant by ID
  Plant.findById(plantId)
    .then((plant) => {
      if (!plant) {
        res.status(404).send('Plant not found');
      } else {
        res.render('updateplantStatus', { title: 'Update Plant Status', plant: plant });
      }
    })
    .catch((error) => {
      console.log('Error fetching plant:', error);
      res.status(500).send('Server error');
    });
});

router.post('/:id/status', (req, res) => {
  const plantId = req.params.id;
  const plantStatus = req.body.isAlive;

  Plant.findById(plantId)
    .then((plant) => {
      if (!plant) {
        res.status(404).send('Plant not found');
        // If the plant is already dead, don't update the status
      } else if (plant.isAlive === false) {
        console.log('Plant status cannot be updated as it is already dead');
        res.redirect('/plants');
      } else {
        const newPlantStatus = plantStatus === 'on' ? true : false;
        // Update the plant status
        Plant.findByIdAndUpdate(plantId, { isAlive: newPlantStatus })
          .then(() => {
            console.log('Plant status updated!');
            res.redirect('/plants');
          })
          .catch((error) => {
            console.log('Error updating plant status:', error);
          });
      }
    })
    .catch((error) => {
      console.log('Error fetching plant:', error);
      res.status(500).send('Server error');
    });
});

module.exports = router;
