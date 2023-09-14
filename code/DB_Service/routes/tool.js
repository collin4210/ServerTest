var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tool = require('../models/tool.js');
var bodyParser = require('body-parser')


//Alle Werkzeuge mit allen Daten ausgeben
router.get('/', (req, res) => {

    Tool.find({}).then((result) =>
        res.json(result).sendStatus(200)

    ).catch((err) => {
    

    })


});


//Ein Werkzeug mit einer bestimmten ID ausgeben
router.get('/:tid', function (req, res, next) {
    Tool.find({ _id : req.params.tid }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

//Werkzeuge mit einer bestimmten Bezeichnung ausgeben
router.get('/search/:bezeichnung', function (req, res, next) {
    Tool.find({ bezeichnung : req.params.bezeichnung }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});

//Ein Werkzeug als ausgeliehen oder verfügbar flaggen
router.put('/:id/status', function (req, res, next) {
    Tool.findById({ _id: req.params.id }).then((result) => {
        var update = true
            if(result.ausgeliehen == true)    {

                update = false

    }
    result.updateOne({ausgeliehen : update})
    res.json(result).sendStatus(200)

    }).catch((err) => {
 

    })

});

//Ist ein werkzeug ausgeliehen?
router.get('/:id/status', function (req, res, next) {
    Tool.findById({ _id: req.params.id }).then((result) =>
    res.json(result).sendStatus(200)

    ).catch((err) => {
 

    })

});


//Ein Werkzeug hinzufügen
router.post('/',bodyParser.json(), function (req, res, next) {
    Tool.create({
        bezeichnung: req.body.bezeichnung,
        ausgeliehen: false,
        OwnerUsername: req.body.Owner

    }).then((result) =>
    res.json(result).sendStatus(201)

    ).catch((err) => {
    

    })

});

//Werkzeug mit ID löschen
router.delete('/:id', function (req, res, next) {
    Tool.findByIdAndRemove(req.params.id).then((result) =>
        res.sendStatus(200)
    ).catch((err) => {
     
    })
});

module.exports = router;