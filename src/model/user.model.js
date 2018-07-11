'use restrict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const roleSchema = require(".role.model.js");

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    created_at: { type: Date, default: Date.now },
    roles: [{
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Role'
        }
    }]
});

const User = mongoose.model("User", UserSchema);

User.count({}, (err, count) => {
    if(err)
    {
        throw err;
    }
    if(count > 0) return;

    const seedUsers = require("./user.seed.json");
    User.create(seedUsers, (err, newUsers) => {
        if(err)
        {
            throw err;
        }
        console.log("DB seeded (Users)");
    });
});

module.exports = User;