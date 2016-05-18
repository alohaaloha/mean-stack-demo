var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model
var Comment = require(__dirname+'/../../../models/comment'); // get the mongoose model

/*API for entity A*/
router
  .get('/:id', function(req, res, next) {
    /*GET TASK WITH ID*/

            Task.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
            if (err) {
              //res.send({success:false, msg:'U bazi sjeb'});
              return;
            }
             //res.json({success:true, msg:"PROJECT DATA ", data:doc});
            }).populate('creator')
            .populate({path: 'comments',
                       model: 'Comment',
                         populate: {
                           path: 'creator',
                           model:'User'
                         }}).exec(function(err, entry) {
                  // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
                  if (err) next(err);
                  res.json({success:true, msg:"TASK DATA WITH ALL CRAP", data:entry});
                });

  })
  .post('/project/', function(req, res) {

    /*GET TASKS FOR PROJECT ID*/

/*
          Task.find(
          { project: req.body.id },
          function (err, doc) {
            if (err) {
              res.send({success:false, msg:'U bazi sjeb'});
              return;
            }
            res.json({success:true, msg:"TASK DATA ", data:doc, body:req.body});
          });
*/


          

  })
  .post('/', function(req, res, next) {

    /*CREATING NEW TASK*/
    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

          //VIDETI KOMENTARISANO DODAVANJE NOVOG 'COMMENT' - ista stvar
          var pID=req.body.project;
          var body=req.body;
          delete body.project;
          body.creator=req.session.user._id;
          var task = new Task(body);
          Project.findOne({"_id":pID},function (err, entry) {
            if(err) next(err);
            task.save(function (err, task) {
              if(err) next(err);
              Project.findByIdAndUpdate(entry._id, {$push:{"tasks":task._id}}, function (err, entry) {
                if(err) next(err);
                //res.json(entry);
                res.json({success: true, msg: 'Successful created', data:task});
              });
            });
          });

      }

  })
  .put('/', function(req, res, next) {

    /*UPDATE TASK*/
        Task.findOne(
        {"_id": req.body._id},
         function(err, taskEntry) {
          if (err)
            next(err);
            //todo - ima findoneandupdate funkcija
          var newEntry = req.body;
          taskEntry.title = newEntry.title;
          taskEntry.description = newEntry.description;
          taskEntry.creator = newEntry.creator;
          taskEntry.project = newEntry.project;
          taskEntry.status = newEntry.status;
          taskEntry.deadline = newEntry.deadline;
          taskEntry.createdAt = newEntry.createdAt;
          taskEntry.updatedAt = newEntry.updatedAt;
          taskEntry.save(function(err, taskEntry) {
            if (err)
                next(err);

            res.json({success: true, msg: 'Successful created', data:taskEntry});
          });
        });


  })
  .delete('/:id', function(req, res, next) {

    //TODO

  });


  module.exports = router;