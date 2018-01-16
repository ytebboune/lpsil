
var produit = require("../model/produit.js")

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
        res.render('pannel', {title: '', name: 'Produit ajouté'});
    }).catch(function (error) {
        console.log('Error in Inserting Record', error);
        res.render('error', {title: 'error', error: error});
    });
};

module.exports.supprimerProduit = function (req, res) {
    var idProduit = req.body.idProduit;

    produit.destroy({
        where: {
            id: idProduit
        }
    }).then(function (produit) {
        if (idProduit == null )
            throw new Error('Veuillez renseigner un produit zfefiofgejiofgemjkorgergejiorgejiorgejjio');
        console.log('Data successfully inserted', produit);
        res.render('pannel', {title: '', name: 'Produit ajouté'});
    }).catch(function (error) {
        console.log('Error in Inserting Record', error);
        res.render('error', {title: 'error', error: error});
    });
};

