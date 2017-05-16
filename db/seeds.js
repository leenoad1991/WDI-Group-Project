const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const env        = require('../config/env');

mongoose.connect(env.db.development);

const User = require('../models/user');
const Product = require('../models/product');
const Prices = require('../models/prices');

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
  },
  orders: {
    past: [
      {
        orderRef: '#1DADSD334', quanity: '4', product: 'Moet Champange', date: '14/05/2017', status: 'Delivered'
      }, {
        orderRef: '#1DADSD334', quanity: '4', product: 'Moet Champange', date: '14/05/2017', status: 'Delivered'
      }, {
        orderRef: '#1DADSD334', quanity: '4', product: 'Moet Champange', date: '14/05/2017', status: 'Delivered'
      }],
      current: [{
        orderRef: '#1DADSD334', quanity: '4', product: 'Moet Champange', date: '14/05/2017', status: 'Out for delivery'
      }, {
        orderRef: '#1DADSD334', quanity: '4', product: 'Moet Champange', date: '14/05/2017', status: 'Out for delivery'
      }]}
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
      // console.log(users);
    }).catch(err => {
      if (err) console.log(err);
    }).finally(() => {
      mongoose.connection.close();
    });


Prices.collection.drop();

Prices
.create({

}).then(prices => {
  console.log(prices);
}).catch(err => {
  if (err) console.log(err);
}).finally(() => {
  mongoose.connection.close();
});

    // Product.collection.drop();
    // Product
    // .create([{
    //   name: `Paumanok 2013 Limited Edition Apollo Drive Vineyard Petit Verdot (North Fork of Long Island)`,
    //   info: {
    //     type: 'Red',
    //     grape: 'Petit Verdot',
    //     year: 2013
    //   },
    //   description: `Superripe blackberries and cherries are cloaked in a haze of vanilla, cardamom and leather on the nose of this inky perfumed Petit Verdot. Black fruit flavors are unctuously ripe and penetrating, yet maintain a four-square balance of acidity and elegance. Fringed in fine firm tannins, it's delicious now but should only improve from 2020 through 2030.`,
    //   labelImage: `http://www.astorwines.com/images/items/85001_hr.jpg`,
    //   location: {
    //     country: 'United States',
    //     region: 'New York, US',
    //     lat: 40.9490789,
    //     lng: -73.7154198
    //   },
    //   price: {
    //     min: 50.00,
    //     max: 100.00,
    //     livePrice: 0.00,
    //     retail: 75.00
    //   }
    // },
    // {
    //   name: `Tignanello 2013 P. Antinori`,
    //   info: {
    //     type: 'Red',
    //     grape: 'Cabernet Sauvignon, Sangiovese',
    //     year: 2013
    //   },
    //   description: `Very intense ruby red colour. Nicely expressed varietal aromas with hints of black berry fruit. The palate is weighty, dense and vibrant with complex structure thanks to support of the acidity. Long and lingering with hints of chocolate, coffee and marmalade in the aftertaste. The beautifully handled tannin from the wine and wood blend making Tignanello a very complex, stylish and sophisticated wine.`,
    //   labelImage: `http://www.astorwines.com/images/items/85001_hr.jpg`,
    //   location: {
    //     country: 'Italy',
    //     region: 'Tuscany, Italy',
    //     lat: 43.3160031,
    //     lng: 11.2926298
    //   },
    //   price: {
    //     min: 50.00,
    //     max: 95.00,
    //     livePrice: 0.00,
    //     retail: 85.00
    //   }
    // }, {
    //   name: `Cheval des Andes 2011 Argentina`,
    //   info: {
    //     type: 'Red',
    //     grape: 'Cabernet Sauvignon, Malbec, Petit Verdot',
    //     year: 2011
    //   },
    //   description: `A project between Las Terrazas and famous Bordeaux ‘first growth’ Cheval Blanc, this wine combines spectacular New World terroir with Old World know-how. Matured in new French oak and made from ungrafted Malbec vines up to 80 years in age. Truly a wine to savour. Inky black and opulent, this ultra-powerful wine offers concentrated violets, brooding dark fruit and vanilla on the nose and a huge, yet supple full finish and long length. Immensely powerful and rich now, this wine will really develop into a smoky, leathery beast over the next 5-10 years.`,
    //   labelImage: `http://www.astorwines.com/images/items/85001_hr.jpg`,
    //   location: {
    //     country: 'Argentina',
    //     region: 'Mendoza Province',
    //     lat: -33.033771,
    //     lng: -68.9546397
    //   },
    //   price: {
    //     min: 50.00,
    //     max: 70.00,
    //     livePrice: 0.00,
    //     retail: 59.99
    //   }
    // },{
    //   name: `Starvedog Lane Cabernet Merlot 2014 Adelaide Hills`,
    //   info: {
    //     type: 'Red',
    //     grape: 'Cabernet Sauvignon, Merlot',
    //     year: 2014
    //   },
    //   description: `Starvedog Lane produces wines from the Adelaide Hills in South Australia. The combination of cool Mediterranean climate, meticulous site selection and free drainingsoils produce wines of opulence and style. Deep aromas of blackcurrant and dark berry fruit intermingled with tea leaf and earthy complexities. On the palate an abundance of fruit, plum and dark cherries, with black pepper and vanilla spice. Superb with toad in the hole, red onions and fresh herbs.`,
    //   labelImage: `http://www.astorwines.com/images/items/85001_hr.jpg`,
    //   location: {
    //     country: 'Australia',
    //     region: 'Adelaide Hills',
    //     lat: -34.9001402,
    //     lng: 138.574404
    //   },
    //   price: {
    //     min: 50.00,
    //     max: 75.00,
    //     livePrice: 0.00,
    //     retail: 67.50
    //   }
    // }, {
    //   name: `Blasson D'Issan 1998 150cl Magnum`,
    //   info: {
    //     type: 'Red',
    //     grape: 'Cabernet Sauvignon, Merlot',
    //     year: 1998
    //   },
    //   description: `This is the second wine of the famous Chateau D'Issan, offering super-ripe black fruit flavours with a bouquet of flowers and liquorice`,
    //   labelImage: `http://www.astorwines.com/images/items/85001_hr.jpg`,
    //   location: {
    //     country: 'France',
    //     region: `Chateau D'Issan`,
    //     lat: 45.0313527,
    //     lng: -0.655076
    //   },
    //   price: {
    //     min: 62.00,
    //     max: 75.00,
    //     livePrice: 0.00,
    //     retail: 67.50
    //   }
    // }]).then(products => {
    //   console.log(`${products.length} products were created`);
    // }).catch(err => {
    //   if (err) console.log(err);
    // }).finally(() => {
    //   mongoose.connection.close();
    // });
