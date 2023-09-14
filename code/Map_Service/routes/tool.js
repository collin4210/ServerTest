var express = require('express');
var router = express.Router();
const axios = require('axios');

const config = require('config');

axios.default.baseUrl = ''
const url = 'http://fddwvs07.gm.fh-koeln.de/tool';
let axiosConfig = {
  headers: {
      'Content-Type' : 'application/json; charset=UTF-8',
      'Accept': 'Token',
      "Access-Control-Allow-Origin": "*",

  }
};



router.post('/', async function(req, res, next) {
  const response = await axios.post(url, {
         
    bezeichnung: req.body.Bezeichnung,
    Owner: req.cookies.Username
    

  } , axiosConfig) 

    res.redirect('/Map/')
    
  });


 
  
  


module.exports = router;
