'use strict';

angular.module('wsapp')
    .controller('SignoutController', function ($scope, authService, $location, $state) {

		//button clicked
	    $scope.signout = function(){

		   authService.signout(
			   function(response){
				   console.log(response.data.msg);	
			   }
			   ,function(response){
					console.log(response.data.msg);
			   });
  		};



    });
