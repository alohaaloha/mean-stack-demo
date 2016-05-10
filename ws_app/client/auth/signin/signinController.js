'use strict';

angular.module('wsapp')
    .controller('SigninController', function ($scope, authService, $location, $state) {

		//button clicked
	    $scope.signin = function(){

		   authService.signin(
			   $scope.username, 
			   $scope.password, 
			   function(response){
				  
				   console.log(response.data);	
				   if(response.data.success==true){
				   	alertify.success("WELCOME!");
				   	$state.go('home');
				   }else{
				   	alertify.error("ERROR");
				   }

			   }
			   ,function(response){

					console.log(response.data);
					alertify.error("ERROR");									   

			   });
  		};



    });
