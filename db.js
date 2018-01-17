const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgre',
    database: 'ecommerce',
    username: 'root',
    password: 'root',
    host: 'localhost'
});

module.exports = sequelize;