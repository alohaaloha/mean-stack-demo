'use strict';

angular.module('wsapp')
    .controller('MyProjectsController', function ($scope, $state, authService, projectService) {

	authService.authenticate(
                            function(response){
                              if(!response.data.success){
                                $state.go('home');
                              }
                              $scope.role=response.data.user.role;
                            },
                            function(response){
                               $state.go('home');
                            });


	projectService.get(
                            function(response){
                                if(!response.data.success){
                                	$state.go('home');
                                }else{
                                	console.log(response.data);
                                	$scope.collection=response.data.data;
                                }
                            },
                            function(response){
                               $state.go('home');
                            });












    });
