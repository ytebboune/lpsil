var client = require("../model/user.js");
module.exports.inscription = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    if(req.body.email == 'yacine.tebboune@etu.unice.fr')
        var rank = 1;
    else
        var rank = 0;

    client.create({
        email: email,
        nom : nom,
        prenom : prenom,
        password: password,
        rank: rank
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
        // req.session.client=client[0].dataValues.id;
        // res.cookie( "id",req.session.client ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

    }).catch(function (error) {
        console.log(error);
        res.render('error', {title: 'error', error: 'Mauvais login/mdp'});
    });
};

module.exports.admin = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.findOne({
        where: {
            email: email,
            password: password,
            rank : 1
        }
    }).then(function (adm) {
        console.log('', adm);
        if(!adm){
            res.render('error', {title: 'error', error: 'Mauvais login/mdp'});
        } else {
            res.render('pannel', {title: 'index', name: email});
        }

    }).catch(function (error) {
        console.log(error);
        res.render('error', {title: 'error', error: 'Vous êtes pas administrateur ou avez entré un mauvais login/mdp'});
    });
};

