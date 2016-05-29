var express = require('express');
//var session = require('client-sessions');
var expressSession=require('express-session');
var cookieParser=require('cookie-parser');
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/webproject');
var app = express();


/*app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));*/

/* session */
app.use(cookieParser());
//app.use(expressSession({secret:'somesecrettokenherewtf'}));
//1min=60000ms
app.use(expressSession({ secret: 'keyboard_jdshfissd_cat', cookie: { maxAge: 1800000 }, resave: true, saveUninitialized: true }));

/* parser */
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/* klijentsku angular aplikaciju serviramo iz direktorijuma client */
app.use('/', express.static(__dirname + '/client'));
//TODO - pitati andjelica za drugi nacin za ovo - uvek redirect na index.html


/* routers - api */
var signUp=require('./server/api/auth/signUp');
app.use('/api/signup', signUp);
var signIn=require('./server/api/auth/signIn');
app.use('/api/signin', signIn);
var authenticate=require('./server/api/auth/authenticate');
app.use('/api/authenticate', authenticate);
var signout=require('./server/api/auth/signout');
app.use('/api/signout', signout);

/*NEED USER IN SESSION FOR APIs*/
app.use(function (req, res, next) {
  //console.log('Time:', Date.now());
  if(req.session.user==null){
    res.json({success:false, msg:"NE MOZE BRE"});
  }else {
    next();
  }
});

/* crud for 'project' */
var project=require('./server/api/entities/project');
app.use('/api/project', project);
/* crud for 'taks' */
var task=require('./server/api/entities/task');
app.use('/api/task', task);
/* crud comments*/
var comment=require('./server/api/entities/comment');
app.use('/api/comment', comment);
/* user api*/
var user = require('./server/api/entities/user')
app.use('/api/user/',user);
/* dashboard api*/
var dashboard = require('./server/api/dashboard/dashboard')
app.use('/api/dashboard/',dashboard);


/* start server */
app.listen(port);
console.log('Server is running on port: ' + port);
