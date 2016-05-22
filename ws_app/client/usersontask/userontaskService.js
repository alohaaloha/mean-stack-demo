angular.module('wsapp')
.service('userontaskService', function($http){
	return{
		save: function(onSuccess, onError){

		
		},
		delete: function(){


		}, 
		get:function(taskID,onSuccess, onError){
			
			var req = {
		    method: 'GET',
		    url: '/api/user/task/'+taskID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    		 }
			}
			$http(req).then(onSuccess, onError);
	    
		},
        addUserOnTask : function (taskID,userID,onSuccess,onError) {
            var req = {
		    method: 'POST',
		    url: '/api/user/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({user:userID,task:taskID})
			}
			$http(req).then(onSuccess, onError);
        },
        removeUserTask : function(taskID,userID,onSuccess,onError){
            var req = {
		    method: 'DELETE',
		    url: '/api/user/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({task:taskID,user:userID})
			}
			$http(req).then(onSuccess, onError);
        },
		getAll:function(onSuccess,onError){
			
            
		},
		getById:function( onSuccess, onError){



		},
		update:function( onSuccess, onError){
			 
		}
	}
});