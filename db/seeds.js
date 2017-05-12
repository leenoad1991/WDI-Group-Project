const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

mongoose.connect(env.db.development);

const User = require('../models/user');

//we may not want to drop the database every time we upload to heroku
User.collection.drop();
User
  .create([{
    firstName: 'Sam',
    lastName: 'Loyd',
    email: 'sam@sam.com',
    password: 'password',
    passwordConfirmation: 'password',
    privileges: {
      admin: true,
      stockView: true
    }
  }, {
    firstName: 'Lee',
    lastName: 'Noad',
    email: 'lee@lee.com',
    password: 'password',
    passwordConfirmation: 'password',
    privileges: {
      admin: true,
      stockView: true
    }
  }, {
    firstName: 'Sean',
    lastName: 'Gantly',
    email: 'sean@sean.com',
    password: 'password',
    passwordConfirmation: 'password',
    privileges: {
      admin: true,
      stockView: true
    }
  }]).then(users => {
    console.log(`${users.length} users were created`);
    console.log(users);
  }).catch(err => {
    if (err) console.log(err);
  }).finally(() => {
    mongoose.connection.close();
  });
