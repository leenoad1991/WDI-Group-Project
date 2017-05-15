const express = require('express');
const router  = express.Router();

const users   = require('../controllers/users');
const authentication   = require('../controllers/authentications');
const products   = require('../controllers/products');

router.route('/register')
  .post(authentication.register);
router.route('/login')
  .post(authentication.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// products routes
router.route('/wines')
  .get(products.index);
router.route('/wines/:id')
  .get(products.show)
  .put(products.update)
  .delete(products.delete);

module.exports = router;
