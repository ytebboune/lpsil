const Sequelize = require('sequelize');
// const sequelize = new Sequelize({
//     dialect: 'postgres',
//     protocol: 'postgres',
//     database: 'dacpbufuo93isb',
//     username: 'kmupkwyciyrfjk',
//     password: '50798bea3445d6a28d8d3303b7996573de881118dc48a82f7945845c9ca69ee7',
//     host: 'ec2-54-217-243-160.eu-west-1.compute.amazonaws.com',
//     port : 5432
// });
var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
const sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect:  'postgres',
    protocol: 'postgres',
    port:     match[4],
    host:     match[3],
    logging: false,
    dialectOptions: {
        ssl: true
    }
});
module.exports = sequelize;