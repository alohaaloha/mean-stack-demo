var express = require('express');
var router = express.Router();

/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/signup', function(req, res) {

  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.', sent:req.body});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.', err:err});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }

  });


  module.exports = router;