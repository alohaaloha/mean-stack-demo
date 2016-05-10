var express = require('express');
var router = express.Router();

/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/', function(req, res) {

  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.', BODY:req.body});
  } else {
    var newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    //in 'pre' we transform password (hashcode)
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username or email already exists.', err:err});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }

  });


  module.exports = router;