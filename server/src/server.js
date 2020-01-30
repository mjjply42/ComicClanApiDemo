const express = require('express')
const app = express()
const apiRoute = require('./api/routes')

app.use(express.json())
app.use('/api/', apiRoute)

app.get("/", (req, res) => {
    res.send("Greetings!")
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on port ${port}`))