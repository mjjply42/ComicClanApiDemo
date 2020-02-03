const express = require('express')
const cors = require('cors')
const whiteist = require('./utils/whitelist.js')
const app = express()
const apiRoute = require('./api/routes')

var options = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1)
            callback(null, true)
        else
            callback(new Error('Not allowed by CORS'))
        }
}  

app.use(express.json())
app.use(cors(options))
app.use('/api/', apiRoute)

app.get("/", (req, res) => {
    res.send("Greetings!")
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))