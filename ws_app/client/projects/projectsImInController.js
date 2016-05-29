'use strict';

angular.module('wsapp')
    .controller('ProjectsImInController', function ($scope, $state, authService,projectService) {

authService.authenticate(
                            function(response){
                              if(!response.data.success){
                                $state.go('home');
                              }
                              $scope.role=response.data.user.role;
                            },
                            function(response){
                               $state.go('home');
                            });

projectService.getAllProjectWhereIam(function(response){
                                if(!response.data.success){
                                    $state.go('home');
                                    return;
                                }
                                console.log(response.data.projectsImIn);
                                $scope.collection = response.data.projectsImIn;
                            },
                            function(response){
                               console.log("LOGUJEM RESPONSE");

                               console.log(response.data);
                            });

//$scope.collection=[{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'},{name:'lala'} ];


    });
