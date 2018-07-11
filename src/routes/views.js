'use restrict';

const router = require('express').Router();
const roles = require('../controllers/role.js').getRoles;
const Role = require("../model/role.model.js");

//Views
console.log('*** Views Router ***');
// GET /
router.get('/', (req, res, next) => {
    return res.render('../public/views/layout', { title: 'Index' });
});

//GET /roles
router.get('/roles', (req, res, next) => {
    //let roles = roleController.getRoles;
    console.log(roles);
    res.json(roles).status(200);

    // var roles = Role.find({}, (err, roles) => {
    //     if (err) return {message: `Request error: ${err}`}
        
    //     return roles;
    // });

    // return res.render('../public/views/roles', { roles: roles });
});

module.exports = router;