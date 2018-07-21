'use restrict';
const Role = require("../model/role.model.js");

//GET Roles
function getRoles (req, res) {
    Role.find({}, (err, roles) => {
        if (err) return res.status(500).send({message: `Request error: ${err}`})
        console.log('here controller');
        res.json(roles).status(200);
    });
};
function getRolesJSON () {
    return Role.find({}, (err, roles) => {
        //if (err) return {message: `Request error: ${err}`}
        if (err) return {message: `Request error: ${err}`}
        // console.log(`This is from getRolesJSON - ${roles}`);
        return roles;
    });
};

//GET Single Role
function getRole (req, res) {
    let { roleId } = req.params;
  
    Role.findById(roleId, (err, role) => {
      if(err) return res.status(500).send({message: `Request error: ${err}`})
      if(!role) return res.status(404).end({message: `Could not find role '${roleId}'`})

      console.log(role);
      res.json(role).status(200);
    });
};

//POST Role
function insRole (req, res) {
    let role = new Role(req.body);
    // role._id = null;
    role.save((err, role) => {
        if (err) {
            console.error(err)
            return res.status(500).json(err)
        }
        // if(err) return res.send(err);
        
        res.json(role).status(201);
    });
};

//PUT Single Role
function updRole (req, res) {
    let { roleId } = req.params;
    let update = req.body;
    Role.findByIdAndUpdate(roleId, update, (err, role) => {
      if(err) return res.status(500).send({message: `Error when updating. Error: ${err}.`})
  
      res.status(200).send({ role: role });
    });
};

//DELETE Single Role
function delRole (req, res) {
    let { roleId } = req.params;

    Role.findById(roleId, (err, role) => {
      if(err) return res.status(500).send({message: `Error when deleting. Error: ${err}.`})
  
      role.remove((err) => {
        if(err) return res.status(500).send({message: 'Error when deleting'})
        res.status(200).send({message: `Role ${roleId} has been removed.`});
      });
    });
};

module.exports = {
    getRoles,
    getRole,
    insRole,
    updRole,
    delRole,
    getRolesJSON
}