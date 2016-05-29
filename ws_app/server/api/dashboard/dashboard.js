var express = require('express');
var router = express.Router();


/* entities */
var Project = require(__dirname+'/../../../models/project'); // get the mongoose model
var User = require(__dirname+'/../../../models/user'); // get the mongoose model
var Task = require(__dirname+'/../../../models/task'); // get the mongoose model

/*Returns list of pair {username: username, numberOfTasks: numberOfTasks}*/
router.get('/dynamicfinishingperuser',function(req,res,next){
    // req.session.user._id
  
    User.findOne(
            { _id: req.session.user._id }
            ,
            function (err, doc) {
              if (err) {
                res.send({success:false, msg:'Cannot read from database.'});
                return;
              }


            }).populate('tasksImOn').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                 return;
            }
            
            var mapOfPairs = {};   // map that contains key:value pair  {date - numberOfTasks}
            
             for(var i =0;i<entry.tasksImOn.length;i++){
                if(entry.tasksImOn[i].status==="DONE"){
                var splited = []
                splited = entry.tasksImOn[i].updatedAt.toString().split(" ");
                var dateString =""+splited[0]+" "+splited[1]+" "+splited[2]+" "+splited[3];
                 console.log(dateString);
                 if(!(dateString in mapOfPairs)){
                      mapOfPairs[dateString.toString()]=1;
                 }else{
                      mapOfPairs[dateString.toString()]++;
                 }
                }
            }
            
            res.json({success:true, msg:"DATE AND NUMBER OF FINISHED TASKS PER USER",data:mapOfPairs});
        });
})
.get('/:id',function(req,res,next){

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
}).get('/finished/:id',function(req,res,next){
  /*Returns list of pair {username: username, numberOfDoneTasks: numberOfDoneTasks} and number of not finished tasks */
    Project.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
              if (err) {
                res.send({success:false, msg:'U bazi sjeb'});
                return;
              }


            }).populate('usersOnProject').populate('tasks').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                 return;
            }

                var neuradjeniZadaci = 0;
                for(var i =0;i<entry.usersOnProject.length;i++){
                       entry.usersOnProject[i].brojPojavljivanjaTaskova = 0;
                       entry.usersOnProject[i].brojUradjenihTaskova = 0;
                       entry.usersOnProject[i].brojNeuradjenihTaskova = 0;
                           for(var j = 0;j<entry.usersOnProject[i].tasksImOn.length;j++){
                                for(var k = 0;k<entry.tasks.length;k++){
                                      console.log("Entry task")
                                      console.log(entry.tasks[k]);
                                      console.log("Project user task")
                                      console.log(entry.usersOnProject[i].tasksImOn[j]);
                                      if(entry.tasks[k]._id.equals(entry.usersOnProject[i].tasksImOn[j])){
                                            entry.usersOnProject[i].brojPojavljivanjaTaskova++;
                                             console.log("POJAVIO SE!");
                                             if(entry.tasks[k].status==="DONE"){

                                                  entry.usersOnProject[i].brojUradjenihTaskova++;
                                             }else{
                                                  entry.usersOnProject[i].brojNeuradjenihTaskova++;
                                                  neuradjeniZadaci++;
                                             }
                                      }
                                }
                           }
                }

                var returList = [];

                for(var i =0;i<entry.usersOnProject.length;i++){

                    if(entry.usersOnProject[i].brojPojavljivanjaTaskova>0){

                      //if(entry.usersOnProject[i].brojUradjenihTaskova>0){
                            returList.push({ "username":entry.usersOnProject[i].username, "numberOfDoneTasks": entry.usersOnProject[i].brojUradjenihTaskova})
                      //}

                    }
                }
                var returnJSON = {list:returList,"notFinishedTasks":neuradjeniZadaci};
                res.json({success:true, msg:"USER AND TASKSSSSSSSSSSSS",data:returnJSON});
        });
}).get('/dynamiccreation/:id',function(req,res,next){
  /*Returns list of pair {day: day, numberOfTasks: numberOfTasks}  */
    Project.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
              if (err) {
                res.send({success:false, msg:'Cannot read from database.'});
                return;
              }


            }).populate('tasks').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                 return;
            }

            var mapOfPairs = {};   // map that contains key:value pair  {date - numberOfTasks}

            for(var i =0;i<entry.tasks.length;i++){
                var splited = []
                splited = entry.tasks[i].createdAt.toString().split(" ");
                var dateString =""+splited[0]+" "+splited[1]+" "+splited[2]+" "+splited[3];
                 console.log(dateString);
                 if(!(dateString in mapOfPairs)){
                      mapOfPairs[dateString.toString()]=1;
                 }else{
                      mapOfPairs[dateString.toString()]++;
                 }
            }
            res.json({success:true, msg:"DATE AND NUMBER OF TASKS",data:mapOfPairs});
        });
}).get('/dynamicfinishing/:id',function(req,res,next){
  /*Returns list of pair {day: day, numberOfDoneTasks: numberOfDoneTasks}  */
    Project.findOne(
            { _id: req.params.id }
            ,
            function (err, doc) {
              if (err) {
                res.send({success:false, msg:'Cannot read from database.'});
                return;
              }


            }).populate('tasks').exec(function(err, entry) {
            if (err){
                 res.send({success:false, msg:'Error, couldnt populate with tasks.'});
                 return;
            }


            var mapOfPairs = {};   // map that contains key:value pair  {date - numberOfTasks}

            for(var i =0;i<entry.tasks.length;i++){
                if(entry.tasks[i].status==="DONE"){
                var splited = []
                splited = entry.tasks[i].updatedAt.toString().split(" ");
                var dateString =""+splited[0]+" "+splited[1]+" "+splited[2]+" "+splited[3];
                 console.log(dateString);
                 if(!(dateString in mapOfPairs)){
                      mapOfPairs[dateString.toString()]=1;
                 }else{
                      mapOfPairs[dateString.toString()]++;
                 }
                }
            }
            res.json({success:true, msg:"DATE AND NUMBER OF FINISHED TASKS",data:mapOfPairs});
        });
})

 module.exports = router;
