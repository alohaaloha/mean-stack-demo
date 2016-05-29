var express = require('express');
var router = express.Router();

/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/', function(req, res) {

      if(!req.session.user){
      	res.send({success: false});
      }else{
        var userDTO={};
        userDTO.username=req.session.user.username;
        userDTO.role=req.session.user.role;
      	res.send({success: true, user:userDTO});
      }
  });


  module.exports = router;
