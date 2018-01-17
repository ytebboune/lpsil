const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    protocol: 'postgres',
    database: 'dacpbufuo93isb',
    username: 'kmupkwyciyrfjk',
    password: '50798bea3445d6a28d8d3303b7996573de881118dc48a82f7945845c9ca69ee7',
    host: 'ec2-54-217-243-160.eu-west-1.compute.amazonaws.com',
    port : 5432,
    logging:  true //false
});
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     database: 'localhost',
//     username: 'root',
//     password: 'root'
// });

module.exports = sequelize;