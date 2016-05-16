'use strict';

angular.module('wsapp')
    .controller('NewTaskController', function ($scope, $location, taskService, $state, authService, $stateParams) {


	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });



    $scope.task={};
    $scope.task.project=$stateParams.id;

    //click
    $scope.create=function(){

    	//alert($scope.task.title);
    	taskService.save(
    		$scope.task,
    		function(response){
                if(response.data.success==true){
    			alertify.success("CREATED!");
    			console.log(response.data);
    			$location.path('/project/'+$stateParams.id);
    			//todo lepse

            }else{
                alertify.success("FAIL!");
            }

    		},
    		function(response){
				alertify.success("FAIL!");

    		});

    };












    });
