var sequelize = require('../db.js');
const Sequelize = require('sequelize');

const Produit = sequelize.define('produits', {
        nomProduit: Sequelize.STRING,
        prixProduit: Sequelize.INTEGER
    }
    , {
        tableName : 'produits',
        createdAt : 'sys_created',
        updatedAt : 'sys_modified',
        deletedAt : false,
        freezeTableName: true
    });

Produit.sync().then(function(){});

module.exports = Produit;