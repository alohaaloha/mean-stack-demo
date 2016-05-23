angular.module('wsapp')
.service('dashboardService', function($http){
	return{
		tasksPerUser: function(proID, onSuccess, onError){

		var req = {
		    method: 'GET',
		    url: '/api/dashboard/'+proID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
		}

		$http(req).then(onSuccess, onError);

		},
		finishedTasksPerUser: function(proID,onSuccess,onError){
			var req = {
		    method: 'GET',
		    url: '/api/dashboard/'+proID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
			}
			$http(req).then(onSuccess, onError);
		}

	}
});
