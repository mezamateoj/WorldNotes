const Note = require('../models/notesModel')


// body middleware
const checkBody = (req, res, next) => {
    if (!req.body.cityName || !req.body.notes) {
        return res.status(400).json({
            status: 'fail',
            message: 'missing city or note'
        })
    }
    next()
}

// get all Notes controller
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// get Note by id controller
const getNoteById = async (req, res) => {
    const { id } = req.params

    try {
        // same as Note.findOne{{_id: id}}
        const note = await Note.findById(id)
        res.status(200).json(note)
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// create Note controller
const createNote = async (req, res) => {
    try {
        const newNote = await Note.create(req.body)
        res.status(201).json(newNote)

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// update Note using id controller
const updateNote = async (req, res) => {
    const { id } = req.params
    console.log(req.body)
    try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json(note)

    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: `Something went wrong: ${error.message}`
        })
    }
}

// delete Note controller
const deleteNote = async (req, res) => {
    const { id } = req.params
    try {
        await Note.findByIdAndDelete(id)
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
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    checkBody
};