var express = require('express');
var router = express.Router();

/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model


/*API for entity A*/
router
  .get('/:id', function(req, res, next) {

    //TODO

  })
  .get('/', function(req, res) {

    Project.find(
          { creator: req.session.user._id },
          function (err, doc) {
            if (err) {
              res.send({success:false, msg:'U bazi sjeb'});
              return;
            }
            res.json({success:true, msg:"DATA RESPONSE IS HERE :D ", data:doc});
          });

  })
  .post('/', function(req, res, next) {

    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {
            var body=req.body;
            body.creator=req.session.user._id;
            var newProject = new Project(body);
            /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
            newProject.save(function(err, project) {
              if (err) {
                return res.json({success: false, msg: 'Error', err:err});
              }
/*              User.findOne(
                {_id: req.session.user._id},
                function(err, user) {
                    if (err){
                        res.send({success: false, msg: 'Error.'});
                        return;
                    }
                    if (!user) {
                        res.send({success: false, msg: 'User not found.'});
                    } else {
                      user.myProjects.push(project._id);
                      user.save();
                      //updatujem user obj iz sesije
                      req.session.user=user;
                      res.json({success: true, msg: 'Successful created', fullSession:req.session});
                    }
                }
               );*/
              res.json({success: true, msg: 'Successful created', fullSession:req.session, body:body});
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