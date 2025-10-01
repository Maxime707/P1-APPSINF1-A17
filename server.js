
//modules du serveur 
const graphql = require('graphql');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const express = require('express');

/*
* création de l'application et des configuration des vues
* jointure aux dossiers public et views pour avoir accès aux fichiers statics et ejs
*/
const dbName = 'ottignies_app';
const app = express();
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
let db;

/* 
*  fonction qui permet de se connecter une seule fois à la base de données
*  c'est une connexion qui se maintient
*/
async function initDB(){
    await client.connect();
    db = client.db(dbName);
    console.log('connexion réussie');
} initDB().catch(console.error);


/*
*   Ensemble des routes qui afficheront les pages ejs
*   le serveur est sur écoute sur le port 3000
*/
app.get('/data', (req, res) => {
    res.render('data');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/report', (req, res) => {
    res.render('report');
});

app.listen(3000, () => {
    console.log('en attente de réponses');
});
