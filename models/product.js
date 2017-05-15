const mongoose  = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  info: {
    type: { type: String, trim: true },
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
    min: { type: Number },
    max: { type: Number },
    livePrice: { type: Number, default: this.retail},
    retail: { type: Number }
  },
  watchedBy: [{type: Schema.Types.ObjectId, ref: 'watchedBy' }]
});

module.exports = mongoose.model('Product', productSchema);
