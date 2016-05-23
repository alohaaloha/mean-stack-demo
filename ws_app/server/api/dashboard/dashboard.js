var express = require('express');
var router = express.Router();


/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*Returns list of pair {username: username, numberOfTasks: numberOfTasks}*/ 
router
.get('/:id',function(req,res,next){
    console.log("HADASHDHASHDAHSDHAHSD");
    Project.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
              if (err) {
                res.send({success:false, msg:'U bazi sjeb'});
                return;
              }
              // for(var i =0;i<doc.usersOnProject.length;i++){
                      
              // }
               //res.json({success:true, msg:"PROJECT DATA ", data:doc});

            }).populate('usersOnProject').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                 return;
            }
            //  res.json({success:true, msg:"TASKS",data:entry});
            
            //res.json({success:true, msg:"PROJECT WITH USERS ON TASK",data:entry});
            
                for(var i =0;i<entry.usersOnProject.length;i++){
                       entry.usersOnProject[i].brojPojavljivanjaTaskova = 0;
                           for(var j = 0;j<entry.usersOnProject[i].tasksImOn.length;j++){
                                for(var k = 0;k<entry.tasks.length;k++){
                                      console.log("Entry task")
                                      console.log(entry.tasks[k]);
                                      console.log("Project user task")
                                      console.log(entry.usersOnProject[i].tasksImOn[j]);
                                      if(entry.tasks[k].equals(entry.usersOnProject[i].tasksImOn[j])){
                                            entry.usersOnProject[i].brojPojavljivanjaTaskova++;
                                             console.log("POJAVIO SE!");
                                             console.log(entry.usersOnProject[i].brojPojavljivanjaTaskova);
                                      }
                                }                    
                           }
                }
                
                var returList = [];
                
                for(var i =0;i<entry.usersOnProject.length;i++){  
                    
                    if(entry.usersOnProject[i].brojPojavljivanjaTaskova>0){
                            returList.push({ "username":entry.usersOnProject[i].username, "numberOfTasks":entry.usersOnProject[i].brojPojavljivanjaTaskova})
                    }
                }
                res.json({success:true, msg:"USER AND TASKSSSSSSSSSSSS",data:returList});
        });     
})

 module.exports = router;