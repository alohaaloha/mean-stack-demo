angular.module('wsapp')
.service('dashboardService', function($http){
	return{
		tasksPerUser: function(projectObj, onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/api/project',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param(projectObj)
		}

		$http(req).then(onSuccess, onError);

		},
		finishedTasksPerUser: function(project,onSuccess,onError){
			var req = {
		    method: 'DELETE',
		    url: '/api/project',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param(project)
			}
			$http(req).then(onSuccess, onError);
		}

	}
});