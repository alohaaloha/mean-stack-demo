'use strict';

angular.module('wsapp')
    .controller('NewTaskController', function ($scope, taskService, $state, authService, $stateParams) {


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
    			$state.go('myprojects');
    			//todo - da idem na project/id projecta - nzm kako da GO na bas taav state kao sa sref
            }else{
                alertify.success("FAIL!");
            }

    		},
    		function(response){
				alertify.success("FAIL!");

    		});

    };












    });
