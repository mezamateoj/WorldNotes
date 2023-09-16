const express = require('express')
const router = express.Router()
const { getAllNotes, getNoteById, deleteNote, updateNote, createNote, checkBody } = require('../controllers/noteControllers')


router
    .route('/')
    .get(getAllNotes)
    .post(checkBody, createNote)

router
    .route('/:id')
    .get(getNoteById)
    .patch(updateNote)
    .delete(deleteNote)

module.exports = router;