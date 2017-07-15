var express = require('express')
var app = express();
var mongoose = require('mongoose')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var port = 3002 || proccess.env.PORT;
var path = require('path');
var dotenv = require('dotenv').config()
var userRoutes = require('./server/router/user_router.js');
var artRoutes = require('./server/router/art_router.js');
var http = require('http')
var fetch = require('node-fetch');

//authentication

mongoose.connect('mongodb://jayyhong:Cactus123@ds031792.mlab.com:31792/ghostwriters', function(err) {
  if (err) return console.log(err)
  console.log('connected to mongo shell');
})

// mongoose.connect(process.env.DB_URL, function (err) {
//   if (err){console.log('cant connect: ', err);}
//   console.log('connected to MLab')
// })

app.use('/', express.static(path.join(__dirname, 'src')));

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "Options") {
        res.send(200);
    } else {
        return next();
    }
})


// route middleware
app.use('api/users', userRoutes);
app.use('api/art', artRoutes);


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, function(err) {
  if (err) return console.log('err=', err)
  console.log('connected to server at port: ' + port);
})