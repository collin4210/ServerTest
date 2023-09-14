var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const axios = require('axios');
const config = require('config');

axios.default.baseUrl = ''
const url = 'http://fddwvs07.gm.fh-koeln.de/user';
let axiosConfig = {
  headers: {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*",

  }
};


/*
router.get('/', async function (req, res, next) {
  var users = await usersDB.list({ include_docs: true })
  res.render("users/users", { title: "User list", users: users.rows });

});
*/
router.post("/", async function (req, res) {


  //var id = crypto.randomUUID();

  console.log(req.body);
  var thisUsername = req.body.username;
  var thisVorname = req.body.vorname;
  var thisNachname = req.body.nachname;
  var thisPassword = req.body.password;
  var thisEmail =  req.body.Email;
  var thisPlz = req.body.plz;
  var thisCity = req.body.Stadt;
  var thisAdress = req.body.Adresse;

  console.log(axios.get(url+'/'+thisUsername,{ }))
  const checkDoubles = await axios.get(url+'/'+thisUsername);

    console.log(checkDoubles.data)
  if (checkDoubles.data != "") {
     res.render('login/register');
 } else {

    const response = await axios.post(url, {
         
      username: thisUsername,
      password: thisPassword,
      name: thisVorname,
      nachname: thisNachname,
      plz: thisPlz,
      adresse: thisAdress,
      stadt: thisCity,
      email: thisEmail
      
  
    } , axiosConfig) 

  

  //  res.writeHead(201);
    res.render('login/login');
  }

});




module.exports = router;
