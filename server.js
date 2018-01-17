var cookieParser = require('cookie-parser');
// var session = require('cookie-session'); // Charge le middleware de sessions

var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var session = require('express-session');

var userController = require("./controller/user.js");
var produitController = require("./controller/produit.js");

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/index');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/index', produitController.getProducts);

app.get('/profile', function(req, res){
    res.render('profile');
});

app.get('/admin', function(req, res){
    res.render('admin');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.get('/ping', function(req, res){
    res.send('Salut tout le monde !');
});

app.get('/disconnect', userController.disconnect);

app.post('/create', userController.inscription);
app.post('/loginVerif', userController.login);
app.post('/adminVerif1', userController.admin);
app.post('/adminVerif2', userController.adminUser);
app.post('/pannelModifyUser', userController.modifierUser);
/*app.post('/pannelDelUser', userController.supprimerUser);*/
app.post('/pannelAddProduct', produitController.ajouterProduit);
app.post('/pannelDelProduct', produitController.supprimerProduit);
app.post('/modifProfil', userController.modif);

app.listen(process.env.PORT||1313);