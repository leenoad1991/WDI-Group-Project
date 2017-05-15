const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

mongoose.connect(env.db.development);

const Product = require('../models/product');
Product.collection.drop();

var request = require('request');
request('http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=b5348a1d8014ddcd074d9de5dba1f688&size=100&filter=categories(7155+124)+price(400%7C600)', function (error, response, body) {
  body = JSON.parse(body);
  body = body.Products.List;
  body.forEach(function(x){
    console.log(x.Name);
    Product
    .create({
      name: x.Name,
      info: {
        type: x.Varietal.WineType.Name,
        grape: x.Varietal.Name,
        year: x.Vintage
      },
      description: x.Description,
      labelImage: x.Labels[0].Url,
      location: {
        country: x.Appellation.Region.Name,
        region: x.Appellation.Region.Name,
        lat: x.Vineyard.GeoLocation.Latitude,
        lng: x.Vineyard.GeoLocation.Longitude
      },
      price: {
        min: x.PriceMin,
        max: x.PriceMax,
        livePrice: 0.00,
        retail: x.PriceRetail
      }
    }).then(products => {
      console.log(`${products}`);
      // console.log(users);
    }).catch(err => {
      if (err) console.log(err);
    }).finally(() => {
      mongoose.connection.close();
    });
  });
  console.log(body.length);
});
