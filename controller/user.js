var client = require("../model/user.js");

module.exports = function (req, res) {
        var email = req.body.email;
        var password = req.body.password;

    client.create({
        email: email,
        password: password
    }).then(function (clients) {
        if(email == '' || password == '' )
            throw new Error('Veuillez renseigner une e-mail');
        console.log('Data successfully inserted', clients);
        res.render('index', {title: 'index', name:email});

    }).catch(function (error) {
        console.log('Error in Inserting Record', error);
        res.render('error', {title:'error', error: error});
    });



};