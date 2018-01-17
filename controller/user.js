var client = require("../model/user.js");
var produit = require("../model/produit.js");
var sequelize = require('../db.js');

module.exports.inscription = function (req, res) {
    var alreadyUsed = false;
    var email = req.body.email;
    var password = req.body.password;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    if (req.body.email == 'yacine.tebboune@etu.unice.fr')
        var rank = 1;
    else
        var rank = 0;
    function isIdUnique (email) {
        return client.count({ where: { email: email } })
            .then(function(count){
            if (count != 0) {
            return false;
        }
        return true;
    });
    }
        isIdUnique(email).then(function(isUnique){
            if (isUnique) {
            client.create({
            email: email,
            nom: nom,
            prenom: prenom,
            password: password,
            rank: rank
        }).then(function (clients) {
            if (email == '' || password == '')
                throw new Error('Veuillez renseigner les informations');
            req.session.clientmail = email;
            req.session.clientnom = nom;
            req.session.clientprenom = prenom;
            req.session.clientrank = rank;

            console.log(req.session.client);
            res.cookie("rank", req.session.clientrank, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("prenom", req.session.clientnom, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("nom", req.session.clientprenom, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("mail", req.session.clientmail, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.redirect('index');

        }).catch(function (error) {
            console.log('Error in Inserting Record', error);
            res.render('error', {
                title: 'error',
                error: "Veuillez renseigner les informations d'inscriptions",
                error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
            });
        });
    }
    else
        res.render('error', {
            title: 'error',
            error: "Utilisateur déjà existant",
            error2: "Retournez vous inscrire pour saisir une bonne fois pour toute des identifiants corrects !"
        });
})};

module.exports.login = function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    client.findOne({
        where: {
            email: email,
            password: password
        }
    }).then(function (client) {
        if (!client) {
            res.render('error', {
                title: 'error',
                error: 'Mauvais login/mdp',
                error2: "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"
            });
        } else {
            console.log('', client);
            req.session.clientid = client.dataValues.id;
            req.session.clientmail = client.dataValues.email;
            req.session.clientnom = client.dataValues.nom;
            req.session.clientprenom = client.dataValues.prenom;
            req.session.clientrank = client.dataValues.rank;

            console.log(req.session.client);
            res.cookie("id", req.session.clientid, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("rank", req.session.clientrank, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("prenom", req.session.clientnom, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("nom", req.session.clientprenom, {maxAge: 1000 * 60 * 10, httpOnly: false});
            res.cookie("mail", req.session.clientmail, {maxAge: 1000 * 60 * 10, httpOnly: false});


            res.redirect('index');

        }
    }).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: 'Mauvais login/mdp',
            error2: "Reconnectez vous et saisissez une bonne fois pour toute des identifiants corrects !"
        });
    });
};

module.exports.admin = function (req, res) {
    sequelize.query("SELECT * FROM `produits`", {type: sequelize.QueryTypes.SELECT})
        .then(function (listeProduit) {
            res.render("pannel", {req: req, listeProduit: listeProduit});
        });

};

module.exports.modif = function (req, res) {
    var id = req.body.id;
    client.findOne({
        where: {
            id: id
        }
    }).then(function (client) {
        req.session.userid = client.dataValues.id;
        req.session.usermail = client.dataValues.email;
        req.session.usernom = client.dataValues.nom;
        req.session.userprenom = client.dataValues.prenom;
        req.session.userpassword = client.dataValues.password;

        req.session.userrank = client.dataValues.rank;
    });
    if (req.body.email == "")
        var email = req.session.usermail;
    else
        var email = req.body.email;
    if (req.body.nom == "")
        var nom = req.session.usernom;
    else
        var nom = req.body.nom;
    if (req.body.prenom == "")
        var prenom = req.session.userprenom;
    else
        var prenom = req.body.prenom;
    if (req.body.password == "")
        var password = req.session.userpassword;
    else
        var password = req.body.password;

    client.update({
            email: email,
            password: password,
            nom: nom,
            prenom: prenom
        },
        {
            where: {
                id: id
            }
        }).then(function (client) {
        res.render('profile');
    })
};

module.exports.adminUser = function (req, res) {
    sequelize.query("SELECT * FROM `clients`", {type: sequelize.QueryTypes.SELECT})
        .then(function (listeClients) {
            res.render("user", {req: req, listeClients: listeClients});
        })
};

module.exports.modifierUser = function (req, res) {
    var emailClient = req.body.emailClient;

    client.findOne({
        where: {
            email: email
        }
    }).then(function (client) {
        req.session.userid = client.dataValues.id;
        req.session.usermail = client.dataValues.email;
        req.session.usernom = client.dataValues.nom;
        req.session.userprenom = client.dataValues.prenom;
        req.session.userpassword = client.dataValues.password;

        req.session.userrank = client.dataValues.rank;
    });
    if (req.body.email == "")
        var email = req.session.usermail;
    else
        var email = req.body.email;
    if (req.body.nom == "")
        var nom = req.session.usernom;
    else
        var nom = req.body.nom;
    if (req.body.prenom == "")
        var prenom = req.session.userprenom;
    else
        var prenom = req.body.prenom;
    if (req.body.password == "")
        var password = req.session.userpassword;
    else
        var password = req.body.password;

    client.update({
            email: email,
            nom: nom,
            prenom: prenom,
            password: password
        },
        {
            where: {
                email: emailClient
            }
        }).then(function (client) {
        res.render("admin");
    });
};

module.exports.supprimerUser = function (req, res) {
    var emailClient = req.body.emailClient;

    client.destroy({
        where: {
            email: emailClient
        }
    }).then(function (client) {
        if (emailClient == null )
            throw new Error('Veuillez renseigner un client');
        console.log('Data successfully inserted', client);
        res.render('admin');
    }).catch(function (error) {
        res.render('error', {title: 'error', error: 'Erreur de suppression d\'utilisateur', error2: "Réessayez en ayant selectionner un client"});
    });
};

module.exports.disconnect = function (req, res) {
    res.clearCookie('id');
    res.clearCookie('rank');
    res.clearCookie('nom');
    res.clearCookie('prenom');
    res.clearCookie('mail');
    res.render('disconnect');
}