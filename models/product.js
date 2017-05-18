const mongoose  = require('mongoose');
const User = require('../models/user');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  info: {
    color: { type: String, trim: true },
    grape: { type: String, trim: true },
    year: { type: Number, trim: true }
  },
  description: { type: String, trim: true},
  labelImage: { type: String, trim: true},
  location: {
    country: { type: String, trim: true },
    region: { type: String, trim: true },
    lat: { type: Number },
    lng: { type: Number }
  },
  price: {
    retail: { type: Number },
    livePrice: { type: Number},
    livePriceDisplay: [ { type: Number }],
    liveTime: [{ type: Number }]
  },
  views: {
    count: { type: Number, default: 1 },
    number: [{type: Number}],
    time: [{type: Number}]
  },
  watchedBy: [{type: Schema.Types.ObjectId, ref: 'User' }],
  stock: {
    original: { type: Number, default: 100},
    current: { type: Number, default: 100 }
  }
});

// productSchema.pre('save', done => {
//   this.model('Product').update({
//     _id: {
//       $ne: [this._id]
//     }
//   }, {
//     price: {
//       livePrice: {}
//     }
//   })
// })

module.exports = mongoose.model('Product', productSchema);
