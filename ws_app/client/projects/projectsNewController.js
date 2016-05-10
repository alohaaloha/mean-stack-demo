'use strict';

angular.module('wsapp')
    .controller('ProjectNewController', function ($scope, projectService, $state, authService) {


	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            }, 
                            function(response){
                               $state.go('home'); 
                            });



    $scope.project={};

    $scope.create=function(){

    	//alert($scope.project.title);
    	projectService.save(
    		$scope.project,
    		function(response){
    			alertify.success("CREATED!");
    			console.log(response.data);

    		}, 
    		function(response){
				alertify.success("FAIL!");

    		});

    };












    });
