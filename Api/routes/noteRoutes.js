const express = require('express')
const router = express.Router()
const { getAllTours, getTourById, deleteTour, updateTour, createTour, checkBody } = require('../controllers/noteControllers')


router
    .route('/')
    .get(getAllTours)
    .post(checkBody, createTour)

router
    .route('/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour)

module.exports = router;