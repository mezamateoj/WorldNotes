const Tour = require('../models/tourModel')


// body middleware
const checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'missing name or price'
        })
    }
    next()
}

// get all tours controller
const getAllTours = async (req, res) => {
    try {
        const tours = await Tour.find()
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// get tour by id controller
const getTourById = async (req, res) => {
    const { id } = req.params
    try {
        // same as Tour.findOne{{_id: id}}
        const tour = await Tour.findById(id)
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// create tour controller
const createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// update tour using id controller
const updateTour = async (req, res) => {
    const { id } = req.params
    try {
        const tour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// delete tour controller
const deleteTour = async (req, res) => {
    const { id } = req.params
    try {
        await Tour.findByIdAndDelete(id)
        res.status(204).json({
            status: 'success',
            message: `User ${id} deleted`
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}




module.exports = {
    getAllTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
    checkBody
};