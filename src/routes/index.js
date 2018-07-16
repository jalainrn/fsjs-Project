'use restrict';

const router = require('express').Router();
const roleController = require('../controllers/role.js');
const userController = require('../controllers/user.js');
/*
router.param("roleId", (req, res, next, id) => {
  Role.findById(id, (err, doc) => {
      if(err) return next(err);
      if(!doc) {
          err = new Error ("Not Found");
          err.status = 404;
          return next(err);
      }
      req.role = doc;
      return next();
  });
});
*/

//------------------------------------------------------
//                      API
//------------------------------------------------------

//Roles
router.get('/roles', roleController.getRoles);
// router.get('/roles', function(req, res, err) {
//     if (err) return res.status(500).send({message: `Request error: ${err}`})
    
//     res.json(roleController.getRoles).status(200);
// });

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