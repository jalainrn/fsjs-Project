'use restrict';
const User = require("../model/user.model.js");

//GET Users
function getUsers (req, res) {
    User.find({}, (err, users) => {
        if(err) return res.status(500).send({message: `Request error: ${err}`})

        res.json(users);
    });
};

//GET User
function getUser (req, res) {
    let { userId } = req.params;
    
    User.findById(userId, (err, user) => {
        if(err) return res.status(500).send({message: `Request error: ${err}`})
        if(!user) return res.status(404).end({message: `Could not find user '${userId}'`})

        res.json(user).status(200);
    });
};

//POST User
function insUser (req, res) {
    let user = new User(req.body);
    user.save((err, user) => {
        if(err) return next(err);

        res.json(user).status(201);
    });
};

//PUT Single User
function updUser (req, res) {
    let { userId } = req.params;
    let update = req.body
    User.findByIdAndUpdate(userId, update, (err, user) => {
        if(err) return res.status(500).send({message: `Error when updating. Error: ${err}.`});

        res.status(200).send({user: user});
    });
}

//DELETE Single User
function delUser (req, res) {
    let { userId } = req.params;
    User.findById(userId, (err, user) => {
        if(err) return res.return(500).send({message: `Error when deleting. Error: ${err}.`})

        user.remove((err) => {
        if(err) return res.status(500).send({message: 'Error when deleting'})
        res.status(200).send({message: `User ${userId} has been removed.`});
      });
    });
}

module.exports = {
    getUsers,
    getUser,
    insUser,
    updUser,
    delUser
}