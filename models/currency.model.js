const mongoose = require('mongoose')
const Schema = mongoose.Schema

const currencySchema = new Schema({
    currencyValue: {
        type: String,
        trim: true
    },
    currencyDescription: {
        type: String,
        trim: true
    }
});

module.exports = mongoose.model('currencies', currencySchema)