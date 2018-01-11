var db = require("../db.js");
const Sequelize = require('sequelize');
const User = db.define('clients', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});
module.exports = User;