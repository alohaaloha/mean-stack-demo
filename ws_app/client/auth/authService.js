angular.module('wsapp')
.service('authService', function($http){
	return{
		signin: function(username, password, onSuccess, onError){
		
		var req = {
		    method: 'POST',
		    url: '/api/signin',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({ 
		    	username: username,
		    	password: password 
		    })
		}	

		$http(req).then(onSuccess, onError);
		
		},
		signup: function(username, email, password, onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/api/signup',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({ 
		    	username: username,
		    	email: email,
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

		var req = {
		    method: 'POST',
		    url: '/api/signout'
		}	

		$http(req).then(onSuccess, onError);

        },
        authenticate: function(onSuccess, onError){
        
        var req = {
		    method: 'POST',
		    url: '/api/authenticate'
		}	

		$http(req).then(onSuccess, onError);


        }
	}
});