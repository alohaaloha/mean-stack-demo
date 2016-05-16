'use strict';

angular.module('wsapp')
    .controller('TaskDetailController', function ($scope, $state, authService, projectService, taskService, $stateParams) {

    authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


    console.log('PARAM:'+$stateParams.id);


    taskService.getById(
            $stateParams.id,
            function(response){
                    console.log(response.data.data);
                    $scope.task=response.data.data[0];
                    console.log("TASKKKKK:")
                    console.log($scope.task);
            },
            function(response){

            }
     );


    $scope.addComment=function(){

    //alert($scope.comment);
    taskService.update();


    }



















    });
