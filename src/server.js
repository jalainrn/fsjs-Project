const path  = require('path');
const express = require('express');
const bodyParser = require('body-parser').json();
const config = require('./config');
const routes = require("./routes/index.js");
// const routeViews = require("./routes/views.js");
const mongoose = require('mongoose');
const wwRoles = require('../public/js/wwRoles');
const roleController = require('./Controllers/role');
const Role = require("./model/role.model.js");




// var roles = [
//   {
//       "_id": "5b4213bcf2929050fc569c03",
//       "name": "Guest",
//       "created_at": "2018-07-08T13:38:04.567Z",
//       "updated_at": "2018-07-08T13:38:04.567Z"
//   },
//   {
//       "_id": "5b4213bcf2929050fc569c02",
//       "name": "Administrator",
//       "created_at": "2018-07-08T13:38:04.547Z",
//       "updated_at": "2018-07-08T13:38:04.547Z"
//   },
//   {
//       "_id": "5b4213bcf2929050fc569c04",
//       "name": "Accountant",
//       "created_at": "2018-07-08T13:38:04.568Z",
//       "updated_at": "2018-07-08T13:38:04.568Z"
//   }];



const app = express();

mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// parse incoming requests
app.use(bodyParser);

// view engine setup
app.set('view engine', 'pug');

// serve static files from /public
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// include routes
app.use('/api', routes);

//app.use('/views', routeViews);
app.get('/', function (req, res) {  
  res.render(
      'index.pug')
})

app.get('/roles', function (req, res) {
  roleController.getRolesJSON()
    .then(
      (roles) => {
        console.log('ok ok ok ok', roles);
        res.render('roles.pug', {roles: roles})
      }
  );
})

app.get('/roles/:roleId', function (req, res) {
    console.log('server redirect ');
    let { roleId } = req.params;
  
    // let role = Role.findById(roleId, (err, role) => {
    //   if(err) return ({message: `Request error: ${err}`})
    //   if(!role) return ({message: `Could not find role '${roleId}'`})

    //   return role;
    // });

  // let roles = wwRoles.getRoles;
  // console.log(role);
  res.render('roleAddEdit.pug', {roleId: roleId})
})


app.listen(config.port, () => {
  console.log(`${config.appName} is listening on port ${config.port}`);
});