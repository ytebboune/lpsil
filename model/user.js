var sequelize = require('../db.js');
const Sequelize = require('sequelize');

const User = sequelize.define('clients', {
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        nom : Sequelize.STRING,
        prenom : Sequelize.STRING,
        rank : Sequelize.INTEGER
    }
    , {
        tableName : 'clients',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

User.sync().then(function(){});

module.exports = User;