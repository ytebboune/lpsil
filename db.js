var pg = require('pg');
delete pg.native;
const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     protocol: 'postgres',
//     database: 'dacpbufuo93isb',
//     username: 'kmupkwyciyrfjk',
//     password: '50798bea3445d6a28d8d3303b7996573de881118dc48a82f7945845c9ca69ee7',
//     host: 'ec2-54-217-243-160.eu-west-1.compute.amazonaws.com',
//     port : '5432'
// });
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'ecommerce',
    username: 'root',
    password: ''
});

module.exports = sequelize;