var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var logger = require('log4js').getLogger('Server');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'ecommerce'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
});

// config
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('combined')); // Active le middleware de logging

app.use(express.static(__dirname + '/public')); // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

logger.info('server start');

app.get('/', function(req, res){
    res.redirect('/login');
});

app.get('/login', function(req, res){
    res.render('login');
});

app.get('/register', function(req, res){
    res.render('register');
});

app.post("/registering", function(req, res) {
    var objBD = con;

    var post = {
        username: req.body.username,
        password: req.body.password
    };

    objBD.query('INSERT INTO clients VALUES ?', post, function (error) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('success');
        }
    });
});

app.get('/ping', function(req, res){
    res.send('Salut tout le monde !');
});


app.listen(process.env.PORT||1313);