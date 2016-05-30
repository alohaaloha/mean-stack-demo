'use strict';

angular.module('wsapp')
    .controller('WelDashController', function ($scope, $state, authService,taskService, projectService) {


 
	authService.authenticate(
                            function(response){
                              if(!response.data.success){
                              //  $state.go('home');
                            }else {
                              $scope.role=response.data.user.role;
                            }

                            },
                            function(response){
                              // $state.go('home');
                            });
  $scope.filterByStatus = "NO FILTER";
  $scope.allTasks=function(){

          taskService.getAllTasks(function(response){
                                      if(!response.data.success){
                                          $state.go('home');
                                      }else{
                                        console.log("ALL TASKS RESPONSE ARRIVED!!!")
                                          console.log(response.data);
                                          // $scope.project=response.data.data;
                                           $scope.tasks=response.data.data;
                                      }
                                  },
                                  function(response){
                                     $state.go('home');
                                  });
      }
   $scope.allTasks();
   
   
   $scope.changeFilter= function(paramOfFiltering){
        
        if(paramOfFiltering==="NO FILTER"){
             taskService.getAllTasks(function(response){
                                      if(!response.data.success){
                                          $state.go('home');
                                      }else{
                                        console.log("ALL TASKS RESPONSE ARRIVED!!!")
                                          console.log(response.data);
                                          // $scope.project=response.data.data;
                                           $scope.tasks=response.data.data;
                                      }
                                  },
                                  function(response){
                                     $state.go('home');
                                  });
        }else{
               taskService.getTasksByStatus(paramOfFiltering,function (response) {
              $scope.tasks=response.data.data;
        },function (response) {
              $state.go('home');
        });
        }
     
       
   }  

    });
