const express = require('express');
const port    = process.env.PORT || 4000;
const app     = express();
const dest    = `${__dirname}/public`;

//Installed Dependencies
const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const cors       = require('cors');
const expressJWT = require('express-jwt');
const env        = require('./config/env');
const routes     = require('./config/routes');

//db connection
mongoose.connect(env.db[process.env.NODE_ENV]);

//middlewear
app.user(morgan('dev'));

if (app.get('env') !== 'production') app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(dest));

//Insert JWT exceptions upon completion of user routes and database
//JWT Error handler review here

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));

app.listen(port, () => console.log(`Express has started on port: ${port}`));
