'use restrict';

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    name: String,
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});

// mongoose.model('Role', RoleSchema);
RoleSchema.method("update", function(updates, callback) {
    Object.assign(this, updates, {updatedAt: new Date()});
    console.log('I am trying to update the DATE');
    this.parent().save(callback);
});


const Role = mongoose.model("Role", RoleSchema);

Role.count({}, function (err, count) {
    if (err) {
        throw err;
    }
    if (count > 0) return;

    const seedRoles = require("./role.seed.json");
    Role.create(seedRoles, function (err, newRoles) {
        if (err) {
            throw err;
        }
        console.log("DB seeded (Roles)")
    });
});



module.exports = Role;