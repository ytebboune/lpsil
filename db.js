const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'ecommerce',
    username: 'root',
    password: 'root',
    host: 'localhost'
});

module.exports = sequelize;