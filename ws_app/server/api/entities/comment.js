var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Comment = require(__dirname+'/../../../models/comment'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*API for entity A*/
router
  .get('/:id', function(req, res, next) {
    /*GET COMMENT WITH ID*/
       Comment.findOne(
              { _id: req.params.id },
              function (err, doc) {
                if (err) {
                  res.send({success:false, msg:'U bazi sjeb'});
                  return;
                }
                res.json({success:true, msg:"DATA RESPONSE IS HERE :D ", data:doc});
              });

  })
  .post('/task', function(req, res) {
    /*GET COMMENTS FOR TASK ID*/
    //dobija se kad se get sam task - komentari idu uz task kome pripadaju

  })
  .post('/', function(req, res, next) {
    /*CREATE NEW COMMENT*/
    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

              //u body obj koji predstavlja COMMENT
              //cuvam ID od TASKA na koji treba da ga stavim
              //prvo nadjem taj TASK, savuvam COMMET, i updatujem TASK
              var taskID=req.body.task;
              var body=req.body;
              delete body.task;
              body.creator=req.session.user._id;
              var comment = new Comment(body);
              Task.findOne({"_id":taskID},function (err, entry) {
                if(err) next(err);
                comment.save(function (err, comment) {
                  if(err) next(err);
                  Task.findByIdAndUpdate(entry._id, {$push:{"comments":comment._id}}, function (err, entry) {
                    if(err) next(err);
                    //res.json(entry);
                    //samo zbog return
                    
                    res.json({success: true, msg: 'Successful created', data:comment});
                  });
                });
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