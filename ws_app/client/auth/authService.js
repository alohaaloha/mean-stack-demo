angular.module('wsapp')
.service('authService', function($http){
	return{
		signin: function(username, password, onSuccess, onError){
		//TODO
		},
		signup: function(username, password, onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/api/signup',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({ 
		    	name: username,
		    	password: password 
		    })
		}
		// ODE MI 5 SATI NA OVO
		// UVEK PRAZAN BODY KAD JE SLAO ZAHTEV
		// MORA DA SE STAVI '$.param({foo:bar, ...})' za 'data'
		// http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data
		
		$http(req).then(onSuccess, onError);

		},
        signout: function(onSuccess, onError){
        //TODO  
        }
	}
});