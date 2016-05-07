var express = require('express');
var router = express.Router();

/* https://www.npmjs.com/package/jwt-simple */
var jwt = require('jwt-simple');
var secret = 'xxx';
/* https://www.npmjs.com/package/bcryptjs */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
/* entities */
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


router
  .post('/signin', function(req, res) {

     User.findOne(

      {name: req.body.name}, 
      
      function(err, user) {

          if (err){
              res.send({success: false, msg: 'Error.'});
              return;
          }
      
          if (!user) {
              res.send({success: false, msg: 'Authentication failed. User not found.'});
          } else {

                  // check if password matches
                  if (bcrypt.compareSync(req.body.password, user.password)) {
                    //create a token
                    var token = jwt.encode(user, secret);
                    // token bude neka kobaja tipa: alkLWkjkettclhjHHHJ-UYFTFJG
                    //TODO - mozda ceo user da uzmem?!
                    res.json({success: true, msg:'Successfully signed in!', user:user.name, token: 'JWT ' + token});
                  } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                  }
          }
      }
      );

  });


  module.exports = router;