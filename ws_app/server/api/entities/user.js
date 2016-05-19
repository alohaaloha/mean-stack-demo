var express = require('express');
var router = express.Router();


/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*Returns collection of users that word on project with this id*/ 
router.get('/project/:id',function (req,res,next){
    Project.findOne({_id :req.params.id},
        function(err,doc){
            if(err){
                 res.send({success:false, msg:'Error with datebase, couldnt find project.'});
                 return;
            }
       }).populate('usersOnProject').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with users.'});
                 return;
            }
             res.json({success:true, msg:"USERS",data:entry});
        });
}).get('/',function(req,res,next){
     User.find({},
                function(err,doc){
                    if(err){
                            res.send({success:false, msg:'Error with datebase.'});
                            return;
                    }
                    
                    res.json({success:true, msg:"USERS",users:doc})
                    
                 })
}).post('/project',function(req,res,next){
    
       //console.log("PROJEKAT NA KOJI DODAJEM USER-a"+doc);
       console.log("User kojeg dodajem:",req.body.user);
       console.log("ID PROJEKTA",req.body.project);
    Project.findOne({"_id":req.body.project},function (err, entry) {
    if(err){ 
        res.send({success:false, msg:'Project does not exist.'});
                            return;
    }
      Project.findByIdAndUpdate(entry._id, {$push:{"usersOnProject":req.body.user._id}}, function (err, entry) {
        if(err) {
        res.send({success:false, msg:'Update user failed.'});
                            return;           
    };
        res.json({success:true,msg:"USER SUCCESSFULLY ADDED TO PROJECT"});
        
      });
    
    });
}).delete('/',function(req,res,next){
    Project.findOne({"_id":req.body.project},function (err, entry) {
    if(err){ 
        res.send({success:false, msg:'Project does not exist.'});
                            return;
    }
      var index = entry.usersOnProject.indexOf(req.body.user._id);
     if (index > -1) {
                entry.usersOnProject.splice(index, 1);
     }
      Project.findByIdAndUpdate(entry._id, {"usersOnProject":entry.usersOnProject}, function (err, entry) {
        if(err) {
        res.send({success:false, msg:'Update user failed.'});
                            return;           
        };
        res.json({success:true,msg:"USER SUCCESSFULLY ADDED TO PROJECT"});
        
      });
    
    });
    
})



 module.exports = router;