const mongoose = require('mongoose')


const noteSchema = new mongoose.Schema({
    cityName: {
        type: String,
        required: [true, 'A tour must have a city name!'],
    },
    country: {
        type: String,
    },
    countryCode: {
        type: String,
    },
    date: {
        type: String,
        required: [true, 'A tour must have a date!'],
    },
    notes: {
        type: String,
    },
    position: {
        type: Object,
        required: [true, 'A tour must have a position!'],
    },

})


noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// convert schema to model (modelName, schema)
const Note = mongoose.model('Notes', noteSchema)


// // create a new tour 
// const tour = new Note({
//     cityName: 'Madrid',
//     date: '023-09-14T23:35:41.933Z',
//     note: 'This is a note'
// })

// // save the tour to the db
// tour.save().then(result => {
//     console.log(result)
//     console.log('City saved!')
//     mongoose.connection.close()
// })

module.exports = Note;