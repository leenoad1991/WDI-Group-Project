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

// // products routes
// router.route('/wine')
//   .get(products.index);
// router.route('/wine/:id')
//   .get(products.show)
//   .put(products.update);
//   // .get(product.show) //not sure if we are doing a delete;
//
// module.exports = router;
