var db = require("../db.js");
const Sequelize = require('sequelize');
const User = db.define('clients', {
    email: Sequelize.STRING,
    password: Sequelize.STRING
});

db.authenticate().then(function(){
    console.log("Connected"); })
    .catch(function(err){
        console.log("Unable to connec : " +err); }).done();

module.exports = User;