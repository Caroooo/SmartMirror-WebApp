var Sequelize = require("sequelize");
var passportLocalSequelize = require("passport-local-sequelize");
var smartMirrorDatabase  = require('./db');

var User = passportLocalSequelize.defineUser(smartMirrorDatabase, {
    fullName: Sequelize.STRING,
    gender: Sequelize.STRING,
    year: Sequelize.INTEGER,
    email: Sequelize.STRING,
    height: Sequelize.INTEGER,
    weight: Sequelize.INTEGER
}, {
    freezeTableName: true
});

User.sync();

module.exports = User;
