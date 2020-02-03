const express = require('express')
const cors = require('cors')
const whitelist = require('./utils/whitelist.js')
const app = express()
const apiRoute = require('./api/routes')

const corsOptions = {
    origin: function (origin, callback) {
        if(!origin) 
            return callback(null, true)
        if (whitelist.indexOf(origin) !== -1)
            return callback(null, true)
        else
            return callback(new Error('Not allowed by CORS'))
    }
}  

app.use(express.json())
app.use(cors(corsOptions))
app.use('/api/', apiRoute)

app.get("/", (req, res) => {
    res.send("Greetings!")
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))

module.exports = app;