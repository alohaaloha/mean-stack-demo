'use strict';

angular.module('wsapp')
    .controller('ProjectDetailController', function ($scope, $state, authService, projectService, taskService, $stateParams) {

    authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });

      $scope.taskinfo='ALL TASKS';
      $scope.taskfilterByStatus='NO FILTER';
      $scope.taskfilterByPriority='NO FILTER';
      
      
      //$scope.tasks; // <---- OVDE DODAJ TASKOVE I SVE RADI NAD OVOM PROMENJIVOM - OVA IDE NA VIEW 
   
      
      //F
      $scope.allTasks=function(){

          projectService.getById(
                                  $stateParams.id,
                                  function(response){
                                      if(!response.data.success){
                                          $state.go('home');
                                      }else{
                                          console.log(response.data);
                                          $scope.project=response.data.data;
                                          $scope.tasks=$scope.project.tasks;
                                      }
                                  },
                                  function(response){
                                     $state.go('home');
                                  });
      }
      //F
      $scope.myTasks=function(){
          $scope.taskinfo='MY TASKS';

        taskService.getTasksForUser(function (response) {
                     if(!response.data.success)
                                	$state.go('home');
                     
                     $scope.tasks = response.data.data.tasksImOn;
      },function (response) {
                     $state.go('home');  
      }); 


      }

      //CALL ME BABY : CALLING ALL TASKS [INIT]
      $scope.allTasks();

      //F
      $scope.deleteProject = function(project){
          console.log("PROJEKAT KOJI SE BRISE")
          console.log(project);
          projectService.delete(project,function(response){
              if(!response.data.success){
                                          $state.go('home');
                                      }else{
                                          console.log(response.data);
                                          //$scope.project=response.data.data;
                                          $state.go('myprojects');
                                      }
          },function(response){
               $state.go('home');
          })
          
      }

      //F
      $scope.filterByStatus=function(param){
        $scope.taskfilterByStatus=param;
        srcuj();
      }

      //F
      $scope.filterByPriority=function(param){
        $scope.taskfilterByPriority=param;
        srcuj();
      }


       var srcuj=function(){

            $scope.tasks=[];
                if($scope.taskfilterByPriority==='NO FILTER' && $scope.taskfilterByStatus==='NO FILTER'){
                $scope.tasks=$scope.project.tasks;
                }else
                if($scope.taskfilterByPriority==='NO FILTER'){
                    for(var i=0; i<$scope.project.tasks.length; i++){

                        if($scope.project.tasks[i].status===$scope.taskfilterByStatus){
                                                               $scope.tasks.push($scope.project.tasks[i]);
                         }

                    }
                }else
                if($scope.taskfilterByStatus==='NO FILTER'){
                        for(var i=0; i<$scope.project.tasks.length; i++){

                            if($scope.project.tasks[i].priority===$scope.taskfilterByPriority){
                                                                   $scope.tasks.push($scope.project.tasks[i]);
                             }

                         }
                }else{
                    for(var i=0; i<$scope.project.tasks.length; i++){
                        if($scope.project.tasks[i].status===$scope.taskfilterByStatus || $scope.project.tasks[i].priority===$scope.taskfilterByPriority){
                                           $scope.tasks.push($scope.project.tasks[i]);
                         }
                     }
                }
       }




















    });
