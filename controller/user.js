var user = require("../model/user.js");

module.exports = function(req, res){

    var email = req.body.email;
    var password = req.body.password;


    var client = user.build({
        email: email,
        password: password
    });

    client.save().complete(function (err) {
        if (err) {
            console.log('Error in Inserting Record');
        } else {
            console.log('Data successfully inserted');
        }
    });

//Other way: Immediate insertion of data into database
//     Sequelize.sync().success(function () {
//         user.create({
//             id: 2,
//             name:'Cell Phone',
//             description: 'Sony',
//             qty: 20
//         }).success(function (data) {
//             console.log(data.values)
//         })
//     });
};