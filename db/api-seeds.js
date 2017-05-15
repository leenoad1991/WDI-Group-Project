const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

mongoose.connect(env.db.development);

const Product = require('../models/product');

var request = require('request');
request('http://services.wine.com/api/beta2/service.svc/json/catalog?apikey=b5348a1d8014ddcd074d9de5dba1f688&size=10&filter=categories(7155+124)+price(400%7C600)', function (error, response, body) {
  body = JSON.parse(body);
  body = body.Products.List;
  body.forEach(function(x){
    console.log(x.Name);

  });
  console.log(body.length);
});
