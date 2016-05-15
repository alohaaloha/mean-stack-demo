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

    //click
    $scope.create=function(){

    	//alert($scope.project.title);
    	projectService.save(
    		$scope.project,
    		function(response){
                if(response.data.success==true){
    			alertify.success("CREATED!");
    			console.log(response.data);
    			$state.go('myprojects');
            }else{
                alertify.success("FAIL!");
            }

    		}, 
    		function(response){
				alertify.success("FAIL!");

    		});

    };












    });
