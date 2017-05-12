//getting to grip with Git!
module.exports = {
  env: process.env.NODE_ENV,
  db: {
    production: process.env.MONGODB_URI,
    development: `mongodb://localhost/stockmarket-products-${this.env}`,
    test: `mongodb://localhost/stockmarket-products-${this.env}`
  },
  secret: process.env.SECRET || 'wine-product-stock-market'
};
