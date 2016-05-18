angular.module('wsapp')
.service('userService', function($http){
	return{
		save: function(onSuccess, onError){

		
		},
		delete: function(){


		}, 
		get:function(projectID,onSuccess, onError){
			var req = {
		    method: 'GET',
		    url: '/api/user/project/'+projectID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    		 }
			}
			$http(req).then(onSuccess, onError);
	
		},
		getAll:function(onSuccess,onError){
			var req = {
		    method: 'GET',
		    url: '/api/user',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    		 }
			}
			$http(req).then(onSuccess, onError);
		},
		getById:function( onSuccess, onError){



		},
		update:function( onSuccess, onError){
			 
		}
	}
});