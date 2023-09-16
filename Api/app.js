const express = require('express')
const app = express()
const morgan = require('morgan')
const noteRouter = require('./routes/noteRoutes')


// 1) MIDDLEWARES
app.use(morgan('dev'))
// middleware to use body data as js object
app.use(express.json())

// mounting the routers
app.use('/notes', noteRouter);



module.exports = app;
