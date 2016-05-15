var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model


/*API for entity A*/
router
  .get('/:id', function(req, res, next) {



  })
  .post('/project/', function(req, res) {
    //getting tasks for specific project
        Task.find(
          { project: req.body.id },
          function (err, doc) {
            if (err) {
              res.send({success:false, msg:'U bazi sjeb'});
              return;
            }
            res.json({success:true, msg:"TASK DATA ", data:doc, body:req.body});
          });

  })
  .post('/', function(req, res, next) {

    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

            //add user to task
            var body=req.body;
            body.creator=req.session.user._id;

            var newTask = new Task(req.body);
            /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
            newTask.save(function(err, task) {
              if (err) {
                return res.json({success: false, msg: 'Error', err:err});
              }
              res.json({success: true, msg: 'Successful created', body:body});
            });
      }

  })
  .put('/:id', function(req, res, next) {

    //update existing

  })
  .delete('/:id', function(req, res, next) {

    //TODO

  });


  module.exports = router;