'use strict';

angular.module('wsapp')
    .controller('ProjectDetailController', function ($scope, $state, authService, projectService, taskService, $stateParams) {

    authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


    console.log('PARAM:'+$stateParams.id);

    projectService.getById(
                                $stateParams.id,
                                function(response){
                                    if(!response.data.success){
                                        $state.go('home');
                                    }else{
                                        console.log(response.data);
                                        $scope.project=response.data.data[0]; //uvek vrati array al uvek 1(taj proj koji nadje)

                                        //GET TASKS FOR THIS PROJECT

                                        taskService.get(
                                        {id:$scope.project._id},
                                        function(response){
                                                console.log(response.data);
                                             $scope.tasks=response.data.data;
                                        },
                                        function(response){



                                        });




                                    }

                                },
                                function(response){
                                   $state.go('home');
                                });












    });
