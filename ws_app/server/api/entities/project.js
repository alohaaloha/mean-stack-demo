var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model


/*API for entity A*/
router
  .get('/:id', function(req, res, next) {
    /*GET PROJECT WITH ID*/
    // http://stackoverflow.com/questions/13077609/mongoose-populate-embedded
    //uz projekat vracam i taskove koji idu za njega - i sve popunjeno
      Project.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
              if (err) {
                //res.send({success:false, msg:'U bazi sjeb'});
                return;
              }
               //res.json({success:true, msg:"PROJECT DATA ", data:doc});

            }).populate('creator')
              .populate({path: 'tasks',
                         model: 'Task',
                           populate: {
                             path: 'creator',
                             model:'User'
                           }}).exec(function(err, entry) {
                    // ako se desila greska predjemo na sledeci middleware (za rukovanje greskama)
                    if (err) next(err);
                    res.json({success:true, msg:"PROJECT DATA WITH ALL CRAP", data:entry});
                  });

  })
  .get('/', function(req, res) {
    /*GET PROJECT FOR LOGED USER*/

      Project.find(
            { creator: req.session.user._id },
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
                    res.json({success:true, msg:"PROJECT DATA ", data:entry});
                  });

  })

  .post('/', function(req, res, next) {
    /*CREATE NEW PROJECT*/
    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {

            var body=req.body;
            body.creator=req.session.user._id; //DODAT USER KAO CREATOR PROJEKTA

            var newProject = new Project(body);
            /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
            newProject.save(function(err, project) {
              if (err) {
                return res.json({success: false, msg: 'Error', err:err});
              }
              res.json({success: true, msg: 'Successful created', data:project});
            });
      }

  })
  .put('/:id', function(req, res, next) {

    //todo

  })
  .delete('/', function(req, res, next) {
         
         Project.remove({"_id":req.body._id},function (err, successIndicator) {
                    if(err) next(err);
                                        
                     res.json({success: true, msg: 'Successful deleted!'});
                    
               });
  });


  module.exports = router;