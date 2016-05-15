var express = require('express');
var session = require('client-sessions');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/webproject');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

/* parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* klijentsku angular aplikaciju serviramo iz direktorijuma client */
app.use('/', express.static(__dirname + '/client'));
//treba ovako nekako al nece TODO - pitati andjelica
//app.get('*', function(req, res) {
//        res.sendFile(__dirname + '/client/index.html'); // load the single view file (angular will handle the page changes on the front-end)
//    });


/* routers - api */
var signUp=require('./server/api/auth/signUp');
app.use('/api/signup', signUp);
var signIn=require('./server/api/auth/signIn');
app.use('/api/signin', signIn);
var authenticate=require('./server/api/auth/authenticate');
app.use('/api/authenticate', authenticate);
var signout=require('./server/api/auth/signout');
app.use('/api/signout', signout);
/* crud for 'project' */
var project=require('./server/api/entities/project');
app.use('/api/project', project);
/* crud for 'comment' */
//var comment=re...


/* start server */
app.listen(port);
console.log('Server is running on port: ' + port);
