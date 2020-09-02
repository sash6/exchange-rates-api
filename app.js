require('./connections/db');
const express = require('express')
const app = express()
const port = 3000

var cors = require('cors');
app.use(cors());

//configuring body-parser middleware to our application
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(port, () => console.log(`App listening on port!!!! ${port}`))
app.use('/api/currencies', require('./controllers/currency.controller'));

module.exports = app;