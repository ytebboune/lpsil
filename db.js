const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'postgres',
    uri: 'postgres://kmupkwyciyrfjk:50798bea3445d6a28d8d3303b7996573de881118dc48a82f7945845c9ca69ee7@ec2-54-217-243-160.eu-west-1.compute.amazonaws.com:5432/dacpbufuo93isb\n',
    options: {
        native: true,
        ssl: true
    }
});
// const sequelize = new Sequelize({
//     dialect: 'mysql',
//     database: 'localhost',
//     username: 'root',
//     password: 'root'
// });

module.exports = sequelize;