const express = require('express')
const app = express()
const morgan = require('morgan')
const tourRouter = require('./routes/tourRoutes')


// 1) MIDDLEWARES
app.use(morgan('dev'))
// middleware to use body data as js object
app.use(express.json())

// mounting the routers
app.use('/tours', tourRouter);



module.exports = app;
