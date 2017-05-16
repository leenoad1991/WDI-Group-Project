const Prices = require('../models/prices');

function getPrices(req, res) {
  console.log('HITTING PRICES');
  Prices.find().exec().then((prices, err) => {
    if (err) console.log(err, {message: 'Failed to find prices - have you seeded them?'});
    return res.status(200).json(prices);
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
