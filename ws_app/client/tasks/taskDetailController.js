'use strict';

angular.module('wsapp')
    .controller('TaskDetailController', function ($scope, $state, authService, projectService, taskService, $stateParams, commentService) {

    authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


    console.log('PARAM:'+$stateParams.id);


    taskService.getById(
            $stateParams.id,
            function(response){
                    console.log(response.data.data);
                    $scope.task=response.data.data[0];
                    console.log("TASKKKKK:")
                    console.log($scope.task);

                    //GET COMMENTS FOT THIS TASK

                     getComments();



            },
            function(response){

            }
     );


    function getComments(){

                          commentService.get(
                                {id:$scope.task._id},
                                function(response){
                                        console.log(response.data);
                                        $scope.comments=response.data.data;
                                },
                                function(response){

                                });
    }


    $scope.comment={};
    //creator se popuni na serverskoj strani
    //text se popuni sa inputa
    //task popunim dole, da ne bi bilo undefined odma

    $scope.addComment=function(){

        //alert($scope.comment);
        $scope.comment.task=$scope.task._id;

        commentService.save(
            $scope.comment,
            function(response){

            console.log(response.data);
            if(response.data.success){
                //dodato je u fulu sve
                // kako da ne $scope.comments.push($scope.comment);
                console.log(response.data.data);
                $scope.comments.push(response.data.data);
                //getComments();
            }

            },
            function(response){

            }
        );


    }



















    });
