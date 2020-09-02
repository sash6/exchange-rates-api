const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ratesSchema = new Schema({
    currencyFrom: {
        type: String,
        trim: true
    },
    currencyTo: {
        type: String,
        trim: true
    },
    rate: {
        type: Number,
        trim: true
    }
});

module.exports = mongoose.model('rates', ratesSchema)