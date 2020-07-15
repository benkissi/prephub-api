const express = require('express')
const bodyParser = require('body-parser');
require("./db/mongoose");

const app = express()
const PORT = 5000

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');	
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-auth');	
    res.header('Access-Control-Expose-Headers', 'x-auth');	
    next();	
});

app.get('/', (req, res) => {
    res.send('App is up')
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})