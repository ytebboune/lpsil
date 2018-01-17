
var produit = require("../model/produit.js")
var sequelize = require('../db.js');

module.exports.ajouterProduit = function (req, res) {
    var nomProduit = req.body.nomProduit;
    var prixProduit = req.body.prixProduit;

    produit.create({
        nomProduit: nomProduit,
        prixProduit: prixProduit
    }).then(function (produits) {
        if (nomProduit == '' || prixProduit == null)
            throw new Error('Veuillez renseigner un produit.');
        console.log('Data successfully inserted', produits);
        res.redirect('admin');
    }).catch(function (error) {
        res.redirect('error');
    });
};

module.exports.supprimerProduit = function (req, res) {
        var nomProduit = req.body.nomProduit;

    produit.destroy({
        where: {
            nomProduit: nomProduit
        }
    }).then(function (produit) {
        if (nomProduit == null )
            throw new Error('Veuillez renseigner un produit');
        console.log('Data successfully inserted', produit);
        res.redirect('admin');
    }).catch(function (error) {
        res.render('error', {
            title: 'error',
            error: 'Mauvaise insertion de produit',
            error2: "Réessayez avec un nom de produit et un prix valide !"
        });    });
};



module.exports.getProducts = function(req,res) {

    sequelize.query("SELECT * FROM `produits`", {type: sequelize.QueryTypes.SELECT})
        .then(function(listeProduit) {
        res.render("index", {req: req, listeProduit: listeProduit});
});
}
