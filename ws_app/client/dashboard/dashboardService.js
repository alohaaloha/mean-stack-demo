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
					    url: '/api/dashboard/finished/'+proID,
					    headers: {
					        'Content-Type': 'application/x-www-form-urlencoded'
					    }
					}

					$http(req).then(onSuccess, onError);
		},
		dynamiccreation: function(proID,onSuccess,onError){

					var req = {
							method: 'GET',
							url: '/api/dashboard/dynamiccreation/'+proID,
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
							}
					}
					$http(req).then(onSuccess, onError);
		},
		dynamicfinishing: function(proID,onSuccess,onError){

					var req = {
							method: 'GET',
							url: '/api/dashboard/dynamicfinishing/'+proID,
							headers: {
									'Content-Type': 'application/x-www-form-urlencoded'
							}
					}
					$http(req).then(onSuccess, onError);
		}

	}
});
