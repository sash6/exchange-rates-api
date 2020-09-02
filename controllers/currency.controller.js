const express = require('express')
const router = express.Router()
const axios = require('axios');

const currencyModal = require('../models/currency.model')
const exchangeRatesModal = require('../models/exchangeRates.models')

module.exports = router;

router.get('/getCurrencies', getCurrencies)
router.post('/saveCurrencies', saveCurrencies)
router.post('/saveExchangeRates', saveExchangeRates)
router.post('/getExchangeRates', getExchangeRates)


function getCurrencies(req, res, next) {
    currencyModal.find()
        .then((data, err) => {
            if (err) return res.status(500).send(err);
            return res.status(200).send(data);
        })
}

function saveCurrencies(req, res, next) {   
    currencyModal.create(req.body, function (err, data) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).send({ message: 'Successfully Created' });
    });
}

function getExchangeRates(req, res, next) {
    exchangeRatesModal.find({"currencyFrom": req.body.from, "currencyTo": req.body.to}).then((data, err) => {        
        if(err) return res.status(500).send(err)
        return res.status(200).send(data);
    })
}

async function saveExchangeRates(req, res, next) {

    currencyModal.find().then((data, err) => {
        data.map(async fromCurr => {
            data.map(toCurr => {
                const params = {
                    base: fromCurr.currencyValue,
                    symbols: toCurr.currencyValue,
                };
                if (fromCurr._id != toCurr._id) {                   
                    axios.get('https://api.exchangeratesapi.io/latest', { params }).then(async (response) => {
                        if (response.data) {
                            exchangeRatesModal.updateOne(
                                { currencyFrom: fromCurr.currencyValue, currencyTo: toCurr.currencyValue },
                                { $set: { currencyFrom: fromCurr.currencyValue, currencyTo: toCurr.currencyValue, rate: response.data.rates[toCurr.currencyValue] } },
                                { upsert: true }
                                , function (err, result) {
                                    if (err) return res.status(500).send(err)
                                })
                        }
                    })
                }
            })
        })        
        return res.status(200).send('success')
    })

}
