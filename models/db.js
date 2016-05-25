var Sequelize = require("sequelize");

var SmartMirrorDatabase = new Sequelize("smart-mirror-database", 'user', 'pass', {
    dialect: "sqlite",
    storage: "local.db"
});

module.exports = SmartMirrorDatabase;
