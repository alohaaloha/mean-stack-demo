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

   /* var resWannabe=[];
    var bla=999;

          User.findOne(

            {_id: req.session.user._id}, 
            
            function(err, user) {

                if (err){
                    res.send({success: false, msg: 'Error.'});
                    return;
                }
            
                if (!user) {
                    res.send({success: false, msg: 'User not found.'});
                } else {

                    bla=user;
                    for(i=0; i<user.myProjects.length; i++){
                          Project.findOne({ _id: user.myProjects[i] }, function (err, doc) {
                            if (err) {
                              res.send({success:false, msg:'U bazi sjeb'});
                              return;
                            }
                            resWannabe.push(doc);
                          });
                    }

                }//else
            }
          );
*/
    res.json({success:true, msg:"yeeeey", projects:resWannabe, usr:req.session, aaa:bla});

  })
  .post('/', function(req, res, next) {

    if (!req.body) {
        res.json({success: false, msg: 'You need to enter data!'});
      } else {
        var newProject = new Project(req.body);
        //save
        /* http://stackoverflow.com/questions/14481521/get-the-id-of-inserted-document-in-mongo-database-in-nodejs */
        newProject.save(function(err, project) {

          if (err) {
            return res.json({success: false, msg: 'Error', err:err});
          }
          

           User.findOne(

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
                }
            }
            );

          res.json({success: true, msg: 'Successful created', urs:req.session});

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