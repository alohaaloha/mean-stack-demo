'use strict';

angular.module('wsapp')
    .controller('MyProjectsController', function ($scope, $state, authService) {


	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            }, 
                            function(response){
                               $state.go('home'); 
                            });


	$scope.collection=[{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'} ];
	//TODO - ucitaj iz baze sve myProjects

    });
