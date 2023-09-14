var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const axios = require('axios');
const config = require('config');
const port = config.get('server.port');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

axios.default.baseUrl = ''
const url = 'http://fddwvs07.gm.fh-koeln.de/';
let axiosConfig = {
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept': 'Token',
    "Access-Control-Allow-Origin": "*",

  }
};


var http = require("http");
var express = require('express');



var app = express();
var server = http.createServer(app);

// set middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



async function fetchData() {

  var markers = []

  const user = await axios.get(url+'/user') 
  const tools = await axios.get(url+'/tool')
  
  await user.data.forEach((data) => {

    var thisObj = [
       data.username,
       data.Stadt+','+data.Adresse,
      []

    ]

    tools.data.forEach( (tool) => {
        if (tool.OwnerUsername == data.username) thisObj[2].push("<br>"+tool.bezeichnung)

    })

    markers.push(thisObj)


  })

  return markers

}



app.get("/", async function (req, res) {

  var cookie = req.cookies.Username;
  console.log(req.cookies.Username)
  if (cookie === undefined) { res.redirect('/Auth') }
 
  var markers =  await fetchData()
  console.log(markers)

  res.render('index', { markers })

});


app.get("/aboutus", function (req, res) {
  res.render('aboutus', { title: "About Us" })
});

app.get("/imprint", function (req, res) {
  res.render('imprint', { title: "Imprint" })
});

// app.js
var userRouter = require("./routes/user");
var toolRouter = require("./routes/tool")
// set controllers
app.use("/tool", toolRouter);
app.use("/user", userRouter);
//app.use("/register",loginRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(port);
console.log(`Server listen to port ${port}`);
