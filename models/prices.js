const mongoose  = require('mongoose');

const pricesSchema = new mongoose.Schema({
  purchase: {
    live: { type: Number, default: 1.2 },
    demo: { type: Number, default: 2 }
  },
  watch: {
    live: { type: Number, default: 1.04 },
    demo: { type: Number, default: 1.2 }
  },
  view: {
    live: { type: Number, default: 1.004 },
    demo: { type: Number, default: 1.05 }
  },
  profit: {
    live: { type: Number, default: 1.1 },
    demo: { type: Number, default: 1 }
  }
});


module.exports = mongoose.model('Prices', pricesSchema);
