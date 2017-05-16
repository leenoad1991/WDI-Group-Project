const Prices = require('../models/prices');

function getPrices(req, res) {
  Prices.find().exec().then((err, prices) => {
    if (err) console.log(err, {message: 'Failed to find prices - have you seeded them?'});
    return res.status(200).json(prices[0]);
  });
}

function updatePrices(req, res) {
  Prices.findByIdAndUpdate(req.params.id, req.body, { new: true },  (err, price) => {
    if (err) return res.status(500).json({ message: 'Something went wrong using pricesUpdate on the server side.' });
    if (!price) return res.status(404).json({ message: 'Product not found using pricesUpdate' });
    return res.status(200).json(price);
  });
}

module.exports = {
  get: getPrices,
  update: updatePrices
};
