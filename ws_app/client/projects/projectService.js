angular.module('wsapp')
.service('projectService', function($http){
	return{
		save: function(projectObj, onSuccess, onError){
		
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
		delete: function(){
			
		}
	}
});