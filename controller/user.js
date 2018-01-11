var user = require("model/user.js");

module.exports = function(req, res){

    var post = {
        email: req.body.email,
        password: req.body.password
    };

    user.query('INSERT INTO clients VALUES ?', post, function (error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
    });
};