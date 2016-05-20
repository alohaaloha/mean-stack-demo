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

    /*GET TASKS FOR PROJECT ID that belongs to logged user*/
    //TODO aaaaaaaaaaa

      Project.find(
            { _id: req.body.id },
            function (err, doc) {
              if (err) {
                //res.send({success:false, msg:'U bazi sjeb'});
                return;
              }
               //res.json({success:true, msg:"PROJECT DATA ", data:doc});
            }).populate('creator')
            .exec(function(err, entry) {
                    // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
                    if (err) next(err);
                    //res.json({success:true, msg:"PROJECT DATA ", data:entry});

                           //entry - ima sve taskove
                           //nalazim one koji pripadaju useruy
                        /*  Task.find(
                          { project: req.body.id },
                          function (err, doc) {
                            if (err) {
                              res.send({success:false, msg:'U bazi sjeb'});
                              return;
                            }
                            res.json({success:true, msg:"TASK DATA ", data:doc, body:req.body});
                          });*/


             });

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
    //v01 - see v02 (findoneandupdate)
  /*      Task.findOne(
        {"_id": req.body._id},
         function(err, taskEntry) {
          if (err)
            next(err);

          var newEntry = req.body;
          taskEntry.title = newEntry.title;
          taskEntry.description = newEntry.description;
          taskEntry.creator = newEntry.creator;
          taskEntry.status = newEntry.status;
          taskEntry.deadline = newEntry.deadline;
          taskEntry.createdAt = newEntry.createdAt;
          taskEntry.updatedAt = newEntry.updatedAt;
          taskEntry.priority=newEntry.priority;
          taskEntry.save(function(err, taskEntry) {
            if (err)
                next(err);

            res.json({success: true, msg: 'Successful created', data:taskEntry});
          });
        });
*/

        //v02
        Task.findOne(
          {"_id":req.body._id},
          function (err, entry) {
              if(err) next(err);


              delete req.body.comments;
              delete req.body.taskHistory;
              

              console.log('BODY:');
              console.log(req.body);
                Task.findByIdAndUpdate(
                  entry._id,
                  {$push:{"taskHistory":req.body},
                  'title':req.body.title,
                  'description':req.body.description,
                  'creator': req.session.user._id,
                  'status': req.body.status,
                  'priority':req.body.priority,
                  'deadline': req.body.deadline,
                  'createdAt': req.body.createdAt,
                  'updatedAt': req.body.updatedAt
                  },
                  function (err, entryT) {
                  if(err) next(err);
                  //res.json(entry);
                  res.json({success: true, msg: 'Successful edited', data:entryT});
                });
          });




  })
  .delete('/', function(req, res, next) {
                console.log(req.body._id);
                
                Task.remove({"_id":req.body._id},function (err, successIndicator) {
                    if(err) next(err);
                                        
                    Project.find({},function(err,entry){
                            if(err)next(err);
                            
                            var idetificator; 
                            var changedList;
                            for(var i =0;i<entry.length;i++){
                                var index = entry[i].tasks.indexOf(req.body._id);
                                if (index > -1) {
                                    entry[i].tasks.splice(index, 1);
                                    idetificator = entry[i]._id; 
                                    changedList = entry[i].tasks;
                                    break;
                                }
                            }
                            
                            
                            Project.findByIdAndUpdate(idetificator, {"tasks":changedList}, function (err, entry1) {
                                      if(err) next(err);
                                                  //res.json(entry);
                                        res.json({success: true, msg: 'Successful deleted!', project:entry1._id});
                            });
                            
                            
                            

                    })
                    
                     
               });
           

  });


  module.exports = router;
