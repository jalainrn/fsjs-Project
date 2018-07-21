const path  = require('path');
const express = require('express');
const bodyParser = require('body-parser').json();
const config = require('./config');
const routes = require("./routes/api.js");
// const routeViews = require("./routes/views.js");
const mongoose = require('mongoose');
const wwRoles = require('../public/js/wwRoles');
const roleController = require('./Controllers/role');
const Role = require("./model/role.model.js");

const app = express();

mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// parse incoming requests
app.use(bodyParser);

// view engine setup
app.set('view engine', 'pug');

// serve static files from /public
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//include api routes
app.use('/api', routes);

// route localhost:port/
app.get('/', function (req, res) {  
  res.render('index.pug')
})

// route localhost:port/roles
app.get('/roles', function (req, res) {
  roleController.getRolesJSON()
    .then(
      (roles) => {
        res.render('roles.pug', {roles: roles})
      }
  )
})

// route localhost:port/roles/roleId
app.get('/roles/:roleId', function (req, res) {
    let { roleId } = req.params;
  res.render('roleAddEdit.pug', {roleId: roleId})
})

// route localhost:port/roles/add
app.get('/roles/add', function (req, res) {
  let { roleId } = req.params;
res.render('roleAddEdit.pug')
})


app.listen(config.port, () => {
  console.log(`${config.appName} is listening on port ${config.port}`);
});