const express = require('express')
const app = express()
const morgan = require('morgan')
const noteRouter = require('./routes/noteRoutes')
const cors = require('cors')

// 1) MIDDLEWARES
app.use(morgan('dev'))
// middleware to use body data as js object
app.use(express.json())
app.use(cors())

// mounting the routers
app.use('/notes', noteRouter);



module.exports = app;
