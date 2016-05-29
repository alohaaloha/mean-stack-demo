'use strict';

angular.module('wsapp')
    .controller('WelDashController', function ($scope, $state, authService, projectService) {

	authService.authenticate(
                            function(response){
                              if(!response.data.success){
                              //  $state.go('home');
                            }else {
                              $scope.role=response.data.user.role;
                            }

                            },
                            function(response){
                              // $state.go('home');
                            });


    });
