var client = require("../model/user.js");

module.exports.inscription = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.create({
        email: email,
        password: password
    }).then(function (clients) {
        if (email == '' || password == '')
            throw new Error('Veuillez renseigner une e-mail');
        console.log('Data successfully inserted', clients);
        res.render('index', {title: 'index', name: email});

    }).catch(function (error) {
        console.log('Error in Inserting Record', error);
        res.render('error', {title: 'error', error: error});
    });
};
module.exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(function (client) {
        console.log('', client);
        if(!client){
            res.render('error', {title: 'error', error: 'Mauvais login/mdp'});
        } else {
            res.render('index', {title: 'index', name: email});
        }
        req.session.client=req.body.email;
        res.cookie( "email" ,req.session.client ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        if (email == 'yacine.tebboune83@gmail.com'){
            res.cookie( "admin" ,req.session.client ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        }
    }).catch(function (error) {
        console.log(error);
        res.render('error', {title: 'error', error: 'Mauvais login/mdp'});
    });
};
