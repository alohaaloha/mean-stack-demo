var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/webproject');

/* parser */
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* klijentsku angular aplikaciju serviramo iz direktorijuma client */
app.use('/', express.static(__dirname + '/client'));

/* routers - api */
var signUp=require('./server/api/auth/signUp');
app.use('/api', signUp);



/* start server */
app.listen(port);
console.log('Server is running on port: ' + port);
