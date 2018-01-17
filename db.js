const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    database: 'dacpbufuo93isb',
    username: 'kmupkwyciyrfjk',
    password: '50798bea3445d6a28d8d3303b7996573de881118dc48a82f7945845c9ca69ee7',
    host: 'localhost'
});

module.exports = sequelize;