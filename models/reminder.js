var Sequelize = require("sequelize");
var smartMirrorDatabase  = require('./db');
var User  = require('./user');

var Reminder = smartMirrorDatabase.define('reminder', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        field: 'user_id'
    },
    title: {
        type: Sequelize.STRING,
        field: 'title'
    },
    recurrence: {
        type: Sequelize.STRING,
        field: 'recurrence'
    },
    day: {
        type: Sequelize.STRING,
        field: 'day'
    },
    date: {
        type: Sequelize.STRING,
        field: 'date'
    },
    description: {
        type: Sequelize.STRING,
        field: 'description'
    }
}, {
    freezeTableName: true
});

Reminder.sync();

module.exports = Reminder;
