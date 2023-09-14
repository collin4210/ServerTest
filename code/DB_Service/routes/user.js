var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');
var Tool = require('../models/tool.js');
var bodyParser = require('body-parser')


//Alle Benutzer mit allen Daten ausgeben
router.get('/', (req, res) => {

    User.find({}).then((result) =>
        res.json(result).sendStatus(200)

    ).catch((err) => {
    

    })


});


//Einen bestimmten Nutzer mit einem bestimmten Username ausgeben
router.get('/:uName', function (req, res, next) {
    User.find({ username: req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

//Alle Werkzeuge von einem bestimmten Username ausgeben
router.get('/:uName/tools', function (req, res, next) {
    Tool.find({ OwnerUsername: req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

//Ein bestimmtes Werkzeug mit einer Bezeichnung von einem bestimmten Username ausgeben
router.get('/:uName/tools/:bezeichnung', function (req, res, next) {
    Tool.find({ bezeichnung : req.params.bezeichnung , OwnerUsername : req.params.uName }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});


//Einen bestimmten User nach ID finden
router.get('/byID/:id', function (req, res, next) {
    User.findById({ _id: req.params.id }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});


//neuen User anlegen
router.post('/',bodyParser.json(), function (req, res, next) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        nachname: req.body.nachname,
        PLZ: req.body.plz,
        Adresse: req.body.adresse,
        Stadt: req.body.stadt,
        Email: req.body.emai}).then((result) =>
    res.json(result).sendStatus(201)

    ).catch((err) => {
    

    })

});

//User mit ID löschen
router.delete('/:id', function (req, res, next) {
    User.findByIdAndRemove(req.params.id).then((result) =>
        res.sendStatus(200)
    ).catch((err) => {
     
    })
});

module.exports = router;