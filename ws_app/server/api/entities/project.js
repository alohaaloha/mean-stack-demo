var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model


/*API for entity A*/
router
  .get('/:id', function(req, res, next) {

    //TODO

  })
  .get('/', function(req, res) {

    //TODO
    

  })
  .post('/', function(req, res, next) {

  //save entity
  //return res.json({success: false, msg: 'Username or email already exists.', data:req.body});

    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {
        var newProject = new Project(req.body);
        //save
        newProject.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Error', err:err});
          }
          res.json({success: true, msg: 'Successful created'});
        });
      }





  })
  .put('/:id', function(req, res, next) {

    //TODO

  })
  .delete('/:id', function(req, res, next) {

    //TODO

  });


  module.exports = router;