var express = require('express');
var router = express.Router();


/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*Returns collection of users that word on project with this id*/ 
//'/api/user/project/task'+taskID,
router
.get('/project/task/:id',function(req,res,next){
   Project.find({},
                function(err,entry){
                    if(err){
                            res.send({success:false, msg:'Error with datebase.'});
                            return;
                    }
                    //nadji kom projektu pripada task
                    var project;
                    
                    for(var i =0;i<entry.length;i++){
                        for(var j = 0;j<entry[i].tasks.length;j++){
                            if(entry[i].tasks[j]==req.params.id){
                                   project = entry[i];
                                   console.log("POGODIO JE :")
                                   console.log(entry[i].tasks[j])
                                   break;   
                            }
                        }
                    }
                   
                    // nadji projekat  po ID
                    Project.findOne({_id :project._id},function(err,doc){
                        if(err){
                            res.send({success:false, msg:'Error with datebase.'});
                            return;
                        }
                    }).populate('usersOnProject').exec(function(err, entry1) {
                                    if (err){
                                             res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                                             return;
                                             }
                                 res.json({success:true, msg:"USERS CAPABLE FOR ADDING TASKS",data:entry1});
                    });
                     //res.json({success:true, msg:"PROJECTS",projectsImIn:projects});
                 })
})
.get('/project/iamin',function(req,res,next){
   Project.find({},
                function(err,entry){
                    if(err){
                            res.send({success:false, msg:'Error with datebase.'});
                            return;
                    }
                    // console.log("projekti:");
                    // console.log(entry);
                    // console.log("user:");
                    // console.log(req.session.user);
                    //res.json({success:true, msg:"PROJECTS"})
                    var projects = [];
                    for(var i =0;i<entry.length;i++){
                        for(var j = 0;j<entry[i].usersOnProject.length;j++){
                            if(entry[i].usersOnProject[j]==req.session.user._id){
                                projects.push(entry[i]);
                            }
                        }
                    }
                     res.json({success:true, msg:"PROJECTS",projectsImIn:projects});
                 })
})
.get('/project/:id',function (req,res,next){
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
}).get('/task/:id',function (req,res,next){
    User.find({},
        function(err,doc){
            if(err){
                 res.send({success:false, msg:'Error with datebase, couldnt find TASK.'});
                 return;
            }
            var collectionUsersOnThisTask = [];
            for(var i =0;i<doc.length;i++){
                        for(var j = 0;j<doc[i].tasksImOn.length;j++){
                            if(doc[i].tasksImOn[j]==req.params.id){
                                collectionUsersOnThisTask.push(doc[i]);
                            }
                        }
                    }
             res.json({success:true, msg:"USERSONTASK",collectionUsersOnTask:collectionUsersOnThisTask});
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
}).post('/task',function(req,res,next){
    
     
    User.findOne({"_id":req.body.user},function (err, entry) {
    if(err){ 
        res.send({success:false, msg:'User does not exist.'});
                            return;
    }
      User.findByIdAndUpdate(entry._id, {$push:{"tasksImOn":req.body.task}}, function (err, entry) {
        if(err) {
        res.send({success:false, msg:'Update user failed.'});
                            return;           
    };
        res.json({success:true,msg:"USER SUCCESSFULLY ADDED TO TASK"});
        
      });
    
    });
})
.delete('/',function(req,res,next){
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
    
}).delete('/task',function(req,res,next){
    
 
    User.findOne({"_id":req.body.user},function (err, entry) {
    if(err){ 
        res.send({success:false, msg:'User does not exist on session.'});
                            return;
    }
      var index = entry.tasksImOn.indexOf(req.body.task);
     if (index > -1) {
                entry.tasksImOn.splice(index, 1);
     }
     
      User.findByIdAndUpdate(entry._id, {"tasksImOn":entry.tasksImOn}, function (err, entry) {
        if(err) {
        res.send({success:false, msg:'Update user failed.'});
                            return;           
        };
        
        res.json({success:true,msg:"USER SUCCESSFULLY REMOVED FROM TASK"});
        
      });
    
    });
})



 module.exports = router;