const Product =  require('../models/product');

function productsIndex(req, res) {
  Product.find((err, products) => {
    if (err) res.status(500).json({ message: 'Something went wrong finding all products using productsIndex on the server side.'});
    console.log('hitting productIndex', products);
    return res.status(200).json(products);
  });
}

function productsShow(req, res) {
  Product.findById(req.params.id, (err, product) => {
    console.log('hitting productsShow', product);
    if (err) return res.status(500).json({message: 'Something went wrong using productsShow controller on the server side.'});
    if (!product) return res.status(404).json({message: 'No product was found using productsShow controller on the server side.'});
    return res.status(200).json(product);
  });
}

function productsUpdate(req, res) {
  Product.findByIdAndUpdate(req.params.id, req.body.product, { new: true },  (err, product) => {
    if (err) return res.status(500).json({ message: 'Something went wrong using productsUpdate on the server side.' });
    if (!product) return res.status(404).json({ message: 'Product not found using productsUpdate' });
    return res.status(200).json(product);
  });
}

function productsDelete(req, res) {
  Product.findByIdAndRemove(req.params.id, (err, product) => {
    if (err) return res.status(500).json({ message: 'Something went wrong with productsDelete on the server side.' });
    if (!product) return res.status(404).json({ message: 'Product not found using productsDelete on the server side.' });
    return res.sendStatus(204);
  });
}

module.exports = {
  index: productsIndex,
  show: productsShow,
  update: productsUpdate,
  delete: productsDelete
};
