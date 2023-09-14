var mongoose = require('mongoose');
const express = require('express');
const PORT = process.env.port || 5555;
const api = express();
var user = require('./routes/user');
api.use('/user', user);
var tool = require('./routes/tool');
api.use('/tool', tool);
var bodyParser = require('body-parser')

mongoose.Promise = global.Promise;


//connection established
mongoose.connect('mongodb://localhost/FDDW', {
    authSource: "admin",
    user: "ObiWan",
    pass: "HelloThere!",
    useNewUrlParser: true,
    useUnifiedTopology: true
   

})
   .then(() =>  console.log('connection successful'))
   .catch((err) => console.error(err));


//Server starten   
api.listen(PORT, () => {

    console.log("API läuft!", PORT)
  });