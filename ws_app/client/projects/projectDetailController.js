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


    projectService.getById(
                            $stateParams.id,
                            function(response){
                                if(!response.data.success){
                                    $state.go('home');
                                }else{
                                    console.log(response.data);
                                    $scope.project=response.data.data; //uvek vrati array al uvek 1(taj proj koji nadje)
                                }
                            },
                            function(response){
                               $state.go('home');
                            });












    });
