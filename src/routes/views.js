'use restrict';

const router = require('express').Router();
const rolesController = require('../controllers/role.js').getRoles;
const Role = require("../model/role.model.js");

//Views
console.log('*** Views Router ***');
// GET /
router.get('/', (req, res, next) => {
    return res.render('../public/views/layout', { title: 'Index' });
});

//GET /roles
router.get('/roles', (req, res) => {
    // let roles = rolesController();
    // console.log(`view - ${roles}`);
    // res.json(roles).status(200);

    var roles = [
        {
            "_id": "5b4213bcf2929050fc569c03",
            "name": "Guest",
            "created_at": "2018-07-08T13:38:04.567Z",
            "updated_at": "2018-07-08T13:38:04.567Z"
        },
        {
            "_id": "5b4213bcf2929050fc569c02",
            "name": "Administrator",
            "created_at": "2018-07-08T13:38:04.547Z",
            "updated_at": "2018-07-08T13:38:04.547Z"
        },
        {
            "_id": "5b4213bcf2929050fc569c04",
            "name": "Accountant",
            "created_at": "2018-07-08T13:38:04.568Z",
            "updated_at": "2018-07-08T13:38:04.568Z"
        }];

    //getRoles();
    //console.log(roles);
    return res.render('../public/views/roles', { roles: roles });
});

module.exports = router;


function getRoles () {
    Role.find({}, (err, roles) => {
        if (err) {
            console.log({message: `Request error: ${err}`})
            return
        } 

        console.log(`Function Result - ${roles}`);
        return roles;
    });
};