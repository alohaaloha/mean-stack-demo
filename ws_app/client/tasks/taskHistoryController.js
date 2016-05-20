'use strict';

angular.module('wsapp')
    .controller('TaskHistoryController', function ($scope, $state, authService, projectService, taskService, $stateParams, commentService) {

    authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


    taskService.getById(
            $stateParams.id,
            function(response){
                    console.log(response.data.data);
                    $scope.task=response.data.data;
                    console.log("TASKKKKK:")
                    console.log($scope.task);
            },
            function(response){

            }
     );






    });
