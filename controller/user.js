var client = require("../model/user.js");
module.exports.inscription = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    if (req.body.email == 'yacine.tebboune@etu.unice.fr')
        var rank = 1;
    else
        var rank = 0;
    if (email != null && password != null) {
        client.create({
            email: email,
            nom: nom,
            prenom: prenom,
            password: password,
            rank: rank
        }).then(function (clients) {
            if (email == '' || password == '')
                throw new Error('Veuillez renseigner les informations');
            console.log('Data successfully inserted', clients);
            res.render('index', {title: 'index', name: email});

        }).catch(function (error) {
            console.log('Error in Inserting Record', error);
            res.render('error', {
                title: 'error',
                error: "Veuillez renseigner les informations d'inscriptions",
                error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
            });
        });
    }
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
        req.session.clientid=client.dataValues.id;
        req.session.clientmail=client.dataValues.email;
        req.session.clientnom=client.dataValues.nom;
        req.session.clientprenom=client.dataValues.prenom;
        req.session.clientrank = client.dataValues.rank;
        console.log(req.session.client);
        res.cookie( "id",req.session.clientid ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        res.cookie( "rank",req.session.clientrank ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        res.cookie( "prenom",req.session.clientnom ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        res.cookie( "nom",req.session.clientprenom ,{ maxAge: 1000 * 60 * 10, httpOnly: false });
        res.cookie( "mail",req.session.clientmail ,{ maxAge: 1000 * 60 * 10, httpOnly: false });

        if(!client){
            res.render('error', {title: 'error', error: 'Mauvais login/mdp', error2 : "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"});
        } else {
            res.render('index', {title: 'index', name: email});
        }
    }).catch(function (error) {
        res.render('error', {title: 'error', error: 'Mauvais login/mdp', error2 : "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"});
    });
};

module.exports.admin = function (req, res) {
    res.render('pannel');
};

module.exports.modif = function(req, res){
    var email = req.body.email;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var password = req.body.password;
    var id = req.body.id;

    client.update({
        email : email,
        password : password,
        nom : nom,
        prenom : prenom
    },
        {
        where : {
            id : id
        }}).then(function(client){
            res.render('profile');
        })
    };

module.exports.adminUser = function(req, res){
    var email = req.body.email;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var password = req.body.password;
    var id = req.body.id;

    client.update({
            email : email,
            password : password,
            nom : nom,
            prenom : prenom
        },
        {
            where : {
                id : id
            }}).then(function(client){
        res.render('user');
    })
};

module.exports.modifierUser = function (req, res) {
    var email = req.body.email;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var password = req.body.password;

    client.update({
        email: email,
        nom: nom,
        prenom: prenom,
        password: password
/*    }).then(function (clients) {
        if (nomProduit == '' || prixProduit == null)
            throw new Error('Veuillez renseigner un produit.');
        console.log('Data successfully inserted', produits);
        res.render('pannel', {title: '', name: 'Produit ajouté'});
    }).catch(function (error) {
        console.log('Error in Inserting Record', error);
        res.render('error', {title: 'error', error: error});*/
    })
};
