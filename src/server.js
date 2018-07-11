const path  = require('path');
const express = require('express');
const bodyParser = require('body-parser').json();
const config = require('./config');
const routes = require("./routes/api.js");
const routeViews = require("./routes/views.js");
const mongoose = require('mongoose');

const app = express();

mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// parse incoming requests
app.use(bodyParser);

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
app.use('/api', routes);
app.use('/views', routeViews);


app.listen(config.port, () => {
  console.log(`${config.appName} is listening on port ${config.port}`);
});