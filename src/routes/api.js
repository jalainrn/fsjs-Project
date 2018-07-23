'use restrict';

const router = require('express').Router();
const roleController = require('../controllers/role.js');
const userController = require('../controllers/user.js');

//------------------------------------------------------
//                      API
//------------------------------------------------------

//Roles
router.get('/roles', roleController.getRoles);
router.get('/roles/:roleId', roleController.getRole);
router.post('/roles', roleController.insRole);
router.put('/roles/:roleId', roleController.updRole);
router.delete('/roles/:roleId', roleController.delRole);

//Users
router.get('/users', userController.getUsers);
router.get('/users/:userId', userController.getUser);
router.post('/users', userController.insUser);
router.put('/users/:userId', userController.updUser);
router.delete('/users/:userId', userController.delUser);


module.exports = router;