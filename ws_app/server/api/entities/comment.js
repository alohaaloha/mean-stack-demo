var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Comment = require(__dirname+'/../../../models/comment'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*API for entity A */
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
  .post('/update', function(req, res) {
   ///api/comment/update

   Comment.findOne(
          {_id:req.body.comment._id},
          function (err, doc) {
            if (err) {
              res.send({success:false, msg:'U bazi sjeb'});
              return;
            }

            console.log("OBJ:"+doc);
            console.log("USER:"+req.session.user._id);

            if(doc.creator==req.session.user._id || req.session.user.role=="ROLE_ADMIN"){

                    //---------------------------------
                    Comment.findByIdAndUpdate(
                      req.body.comment._id,
                      {"text":req.body.comment.text}, function (err, entry) {
                                    if(err) next(err);
                                    //res.json(entry);
                                    //samo zbog return

                                    res.json({success: true, msg: 'Successful changed'});
                                  });
                    //---------------------------------
                  }else {
                    res.json({success:false, msg:"You can't edit other users' comments!"});
                  }

        });

  }).post('/task', function(req, res) {
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
  .delete('/', function(req, res, next) {
       console.log("entered delete of comments");
       console.log("SONETOV ID: "+req.body.comment);

       Comment.findOne(
              {_id:req.body.comment},
              function (err, doc) {
                if (err) {
                  res.send({success:false, msg:'U bazi sjeb'});
                  return;
                }

                console.log("OBJ:"+doc);
                console.log("USER:"+req.session.user._id);

                if(doc.creator==req.session.user._id || req.session.user.role=="ROLE_ADMIN"){

                //---------------------------------------------------------------
                Comment.remove(
                  {"_id":req.body.comment},
                  function (err, successIndicator) {
                           if(err) next(err);

                          Task.findOne(
                            {"_id":req.body.task},
                            function (err, entry) {

                                       var index = entry.comments.indexOf(req.body.comment);
                                       if (index > -1) {
                                           entry.comments.splice(index, 1);
                                       }
                                       var changelist = entry.comments;
                                       Task.findByIdAndUpdate(req.body.task, {"comments":changelist}, function (err, entry) {
                                           if(err) next(err);
                                               res.json({success: true, msg: 'Successful deleted comment from task.', task:req.body.task});
                                         });

                          })
                           //  res.json({success: true, msg: 'Successful deleted!'});
                  });
                  //------------------------------------------------------------
                }else {
                  res.json({success:false, msg:"You can't delete other users' comments!"});
                }



      });

  });


  module.exports = router;
