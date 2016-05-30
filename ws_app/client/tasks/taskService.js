angular.module('wsapp')
.service('taskService', function($http){
	return{
		save: function(taskObj, onSuccess, onError){
		
		var req = {
		    method: 'POST',
		    url: '/api/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param(taskObj)
		}	

		$http(req).then(onSuccess, onError);
		
		},
		delete: function(taskObj, onSuccess, onError){
			 var req = {
		    method: 'DELETE',
		    url: '/api/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data:$.param(taskObj)
		 }

		$http(req).then(onSuccess, onError);
		}, 
		get:function(projectObj, onSuccess, onError){
		    //get tasks for specific project
			var req = {
		    method: 'POST',
		    url: '/api/task/project',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param(projectObj)
		}	

		$http(req).then(onSuccess, onError);

		},
		getById:function(taskID, onSuccess, onError){

			var req = {
		    method: 'GET',
		    url: '/api/task/'+taskID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
		}

		$http(req).then(onSuccess, onError);

		},
		update:function(taskObj, onSuccess, onError){


         var req = {
		    method: 'PUT',
		    url: '/api/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data:$.param(taskObj)
		 }

		$http(req).then(onSuccess, onError);


		},
		addTaskForUser : function(onSuccess,onError){
			var req = {
		    method: 'PUT',
		    url: '/api/user/task',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data:$.param(taskObj)
		 }
		 $http(req).then(onSuccess, onError);
		},
		getTasksForUser : function(onSuccess,onError){
			var req = {
		    method: 'GET',
		    url: '/api/task/user',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
		}
		 $http(req).then(onSuccess, onError);
		},
		getAllTasks : function(onSuccess,onError){
			var req = {
		    method: 'GET',
		    url: '/api/task/all',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    	}
			}
		 $http(req).then(onSuccess, onError);
		},
		getTasksByStatus : function(status,onSuccess,onError){
			var req = {
		    method: 'GET',
		    url: '/api/task/filterbystatus/'+status,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    	}
			}
		 $http(req).then(onSuccess, onError);
		}
	}
});