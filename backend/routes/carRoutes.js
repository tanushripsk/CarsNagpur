const express = require('express');
const { getCars, getCarById, createCar, updateCar, deleteCar } = require('../controller/carController');
const  upload  = require('../middleware/multer');


const router = express.Router();

router.get('/cars', getCars);
router.get('/cars/:id', getCarById);

router.post('/newCar', upload.array('images'),createCar );
router.put('/cars/:id', updateCar);
router.delete('/cars/:id', deleteCar);

module.exports = router;
