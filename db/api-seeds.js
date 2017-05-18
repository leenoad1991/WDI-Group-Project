const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

mongoose.connect(env.db.development);

const Product = require('../models/product');
Product.collection.drop();

var time = new Date();
time = time.getTime();

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
        color: x.Varietal.WineType.Name,
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
        livePrice: x.PriceRetail,
        retail: x.PriceRetail,
        livePriceDisplay: [ 200.00, 150.00, 170.00, 200.00, 220.00, 240.00, 160.00, 140.00, 280.00, 300.00, 400.00, 700.00],
        liveTime: [ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      },
      views: {
        count: 4,
        number: [100, 120, 140, 180, 200, 130, 100, 89, 90, 100, 121, 130],
        time: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        lastTime: time
      }
    }).then(products => {
      console.log(`${products}`);
    }).catch(err => {
      if (err) console.log(err);
    }).finally(() => {
      mongoose.connection.close();
    });
  });
  console.log(body.length);
});
