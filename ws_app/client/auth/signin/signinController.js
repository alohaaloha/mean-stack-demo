'use strict';

angular.module('wsapp')
    .controller('SigninController', function ($scope, authService, $location, $state) {

		//button clicked
	    $scope.signin = function(){

		   authService.signin(
			   $scope.name, 
			   $scope.password, 
			   function(response){
				  
				   console.log(response.data);	
				   if(response.data.success==true){
				   	alertify.success("WELCOME "+response.data.user);
				   	$state.go('home');
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
