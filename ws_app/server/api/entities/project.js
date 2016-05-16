var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


/*API for entity A*/
router
  .get('/:id', function(req, res, next) {
    /*GET PROJECT WITH ID*/
       Project.find(
              { _id: req.params.id },
              function (err, doc) {
                if (err) {
                  res.send({success:false, msg:'U bazi sjeb'});
                  return;
                }
                res.json({success:true, msg:"DATA RESPONSE IS HERE :D ", data:doc});
              });

  })
  .get('/', function(req, res) {
    /*GET PROJECT FOR LOGED USER*/
    Project.find(
          { creator: req.session.user._id },
          function (err, doc) {
            if (err) {
              res.send({success:false, msg:'U bazi sjeb'});
              return;
            }
            res.json({success:true, msg:"PROJECT DATA ", data:doc});
          });

  })
  .post('/', function(req, res, next) {
    /*CREATE NEW PROJECT*/
    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

            //add user to project
            var body=req.body;
            body.creator=req.session.user._id;

            var newProject = new Project(body);
            /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
            newProject.save(function(err, project) {
              if (err) {
                return res.json({success: false, msg: 'Error', err:err});
              }
              res.json({success: true, msg: 'Successful created'});
            });
      }

  })
  .put('/:id', function(req, res, next) {

    //todo

  })
  .delete('/:id', function(req, res, next) {

    //TODO

  });


  module.exports = router;