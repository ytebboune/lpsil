var db = require("db.js");
const user = db.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});
module.exports = user;