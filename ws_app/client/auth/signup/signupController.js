'use strict';

angular.module('wsapp')
    .controller('SignupController', function ($scope, authService, $location) {

 		//signup button clicked
	    $scope.signup = function(){

		   authService.signup(
			   $scope.name, 
			   $scope.password, 
			   function(response){
				  
				   console.log(response.data);	
				   if(response.data.success==true){
				   	alertify.success(response.data.msg);
				   	$location.path('/signin')
				   }else{
				   	alertify.error(response.data.msg);
				   }

			   }
			   ,function(response){

					console.log(response.data);
					alertify.error(response.data.msg);									   

			   });
  		};


    });
