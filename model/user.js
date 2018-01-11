var sequelize = require('../db.js');
const Sequelize = require('sequelize');

const User = sequelize.define('clients', {
        email: Sequelize.STRING,
        password: Sequelize.STRING
    }
    , {
        tableName : 'clients',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

User.sync();

module.exports = User;