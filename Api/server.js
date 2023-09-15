require('dotenv').config()
const app = require('./app')
const PORT = process.env.PORT || 3002
const mongoose = require('mongoose')

const URL = process.env.DB_URL

mongoose.set('strictQuery', false)
mongoose.connect(URL).then(() => {
    console.log('DB connection successful!')
}).catch(err => {
    console.log(err)
})



// 4) START SERVER
app.listen(PORT, () => {
    console.log(`Server Listening on port: ${PORT}`)
})
