'use strict';

angular.module('wsapp')
    .controller('MyProjectsController', function ($scope, $state, authService, projectService) {


	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
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
                                }

                            }, 
                            function(response){
                               $state.go('home'); 
                            });


	$scope.collection=[{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'} ];
	//TODO - ucitaj iz baze sve myProjects

    });
