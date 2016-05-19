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



      $scope.allTasks=function(){
          $scope.taskinfo='ALL TASKS';
          projectService.getById(
                                  $stateParams.id,
                                  function(response){
                                      if(!response.data.success){
                                          $state.go('home');
                                      }else{
                                          console.log(response.data);
                                          $scope.project=response.data.data;
                                      }
                                  },
                                  function(response){
                                     $state.go('home');
                                  });
      }

      $scope.myTasks=function(){
          $scope.taskinfo='MY TASKS';

/*            taskService.get(
                {$stateParams.id},
                function(response){


                },
                function(response){


                }
            );*/


      }



      //inicijalno prikazuje sve taskove
      $scope.allTasks();












    });
