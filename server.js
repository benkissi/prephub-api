const express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
require("./db/mongoose");

const authRoutes = require('./routes/auth')

const app = express()
const PORT = 5000

app.use(cors())
app.use(bodyParser.json());
app.use(authRoutes)

app.get('/', (req, res) => {
    res.send('App is up')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})