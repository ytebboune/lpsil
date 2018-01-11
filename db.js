const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'mysql',
    database: 'ecommerce',
    username: 'root',
    password: 'root',
    host: 'localhost'
});

// sequelize.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     sequelize.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Result: " + result);
//     });
// });
module.exports = sequelize;