'use strict';

angular.module('wsapp')
    .controller('UsersListController', function ($scope, taskService, $state, authService, $stateParams) {


authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


$scope.collection=[{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'}];




    });
