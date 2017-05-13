const Product =  require('../models/product');

function productsIndex(req, res) {
  Product.find((err, products) => {
    if (err) res.status(500).json({ message: 'Something went wrong finding all products on the server side.'});
    console.log('hitting productIndex', products);
    return res.status(200).json(products);
  });
}



module.exports = {
  // show: productsShow,
  index: productsIndex
  // update: productsUpdate
};
