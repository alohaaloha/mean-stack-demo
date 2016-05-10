var express = require('express');
var router = express.Router();

/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/', function(req, res) {

      if(!req.session.user){
      	res.send({success: false});
      }else{
      	res.send({success: true});
      }
  });


  module.exports = router;