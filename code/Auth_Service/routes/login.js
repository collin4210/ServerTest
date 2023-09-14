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



router.get('/', async function(req, res, next) {
   
    res.render("login/login");
    
  });

  
router.post('/', async function(req, res, next) {


  const response = await axios.get(url+'/'+req.body.username);
  


  if (response.data == "" ) {
    res.render("login/login");
  } else {


  if(req.body.password == response.data[0].password) {
    
  
    
   // res.render('index',{title: "Start Page",name : req.body.username});
   //Redirect zur Map, wenn sie fertig ist 

   res.cookie('Username',req.body.username).redirect();


  }
 
}
  
});

  router.get('/register', async function(req, res, next) {
  
    res.render("login/register");
    
  });


module.exports = router;
