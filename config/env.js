//getting to grip with Git!
module.exports = {
  env: process.env.NODE_ENV,
  db: {
    production: process.env.MONGODB_URI,
    development: `mongodb://localhost/appointments-${this.env}`,
    test: `mongodb://localhost/appointments-${this.env}`
  }
};
