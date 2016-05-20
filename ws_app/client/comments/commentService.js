angular.module('wsapp')
.service('commentService', function($http){
	return{
		save: function(obj, onSuccess, onError){

		var req = {
		    method: 'POST',
		    url: '/api/comment',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param(obj)
		}

		$http(req).then(onSuccess, onError);

		},
		delete: function(taskID,commentID,onSuccess,onError){
			var req = {
		    method: 'DELETE',
		    url: '/api/comment',
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    },
		    data: $.param({comment : commentID, task : taskID})
			}
			$http(req).then(onSuccess, onError);
		},
		get:function(obj, onSuccess, onError){
		  //get tasks for specific project
            var req = {
            method: 'POST',
            url: '/api/comment/task',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: $.param(obj)
            }

        $http(req).then(onSuccess, onError);

		},
		getById:function(projectID, onSuccess, onError){

			var req = {
		    method: 'GET',
		    url: '/api/project/'+projectID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
		}

		$http(req).then(onSuccess, onError);

		},
		update:function(projectID, onSuccess, onError){


         var req = {
		    method: 'GET',
		    url: '/api/project/'+projectID,
		    headers: {
		        'Content-Type': 'application/x-www-form-urlencoded'
		    }
		    }

		$http(req).then(onSuccess, onError);


		}
	}
});