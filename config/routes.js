const express = require('express');
const router  = express.Router();

const users   = require('../controllers/users');
const authentication   = require('../controllers/authentications');
const products   = require('../controllers/products');
const prices   = require('../controllers/prices');

router.route('/prices')
  .get(prices.get);

router.route('/prices/id')
  .put(prices.update);

router.route('/register')
  .post(authentication.register);
router.route('/login')
  .post(authentication.login);

router.route('/userswatching/:id')
  .get(users.watching);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .get(users.show)
  .put(users.update)
  .delete(users.delete);

// products routes
router.route('/wines')
  .get(products.index)
  .post(products.create);

router.route('/wines/:id')
  .get(products.show)
  .put(products.update)
  .delete(products.delete);



module.exports = router;
