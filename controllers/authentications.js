const User       = require('../models/user');
const jwt        = require('jsonwebtoken');
const env     = require('../config/env');

function authRegister(req, res) {
  User.create(req.body, (err, user) => {
    console.log(req.body);
    if (err) return res.status(500).json({ message: 'Something went wrong with the registration on the server side.'});
    //creating the initial registration token..
    const token = jwt.sign({ id: user.id, email: user.email, privileges: user.privileges}, env.secret, {expiresIn: 60*60*24});

    //sending back the json of the user and the token
    return res.status(201).json({
      message: `Welcome! You made it... AMAZING.`,
      user,
      token
    });
  });
}

function authLogin(req, res) {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) res.status(500).json({ message: 'Something went wrong with the login on the server side.'});
    if (!user || !user.validatePassword(req.body.password)) {
      return res.status(401).json({ message: 'Unauthorised, you provided the wrong details, try again.'});
    }

    const token = jwt.sign({ id: user.id, email: user.email, privileges: user.privileges}, env.secret, {expiresIn: 60*60*24});
    return res.status(200).json({
      message: `Welcome! You made it... BACK.`,
      user,
      token
    });
  });
}



module.exports = {
  register: authRegister,
  login: authLogin
};
