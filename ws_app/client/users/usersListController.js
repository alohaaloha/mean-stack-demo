'use strict';

angular.module('wsapp')
    .controller('UsersListController', function ($scope, projectService,userService,taskService, $state, authService, $stateParams) {


authService.authenticate(
                          function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });


userService.get($stateParams.id,
                                function(response){
                                    if(!response.data.success){
                                        $state.go('home');
                                    }else{
                                       $scope.collectionUsersOnProject = response.data.data.usersOnProject;
                                       //response.data.data.usersOnProject
                                       console.log(response);                             
                                    }
                                },
                                function(response){
                                   $state.go('home');
                                });

userService.getAll(function(response){
                                        if(!response.data.success){
                                           $state.go('home');
                                       
                                        }else{
                                            //console.log(response.data);
                                            $scope.collection = response.data.users;
                                            
                                               
                                        }
                                     },
                                     function(response){
                                              $state.go('home');
                                     }       
                                     );

    $scope.addUserToProjectController = function (user){
            
            for(var i = 0;i<$scope.collectionUsersOnProject.length;i++){
                if($scope.collectionUsersOnProject[i]._id == user._id){
                   alertify.error("USER ALREADY EXIST IN PROJECT!");
                   return; 
                }
            }
            
            projectService.addUserToProject($stateParams.id,user,
                                     function(response){
                                        if(!response.data.success){
                                           $state.go('home');
                                           console.log("1");
                                           console.log(response.data);    
                                    }else{
                                            console.log("2");
                                            alertify.success("ADDED USER TO PROJECT!");
                                            $scope.collectionUsersOnProject.push(user);
                                            
                                            
                                        }
                                     },
                                     function(response){
                                          
                                            $state.go('home');
                                            console.log("1");
                                            console.log(response.data); 
                                    } 
            );
    }
    
    $scope.removeUserFromProjectController = function(user){
            projectService.removeUserFromProjectController($stateParams.id,user,
                                     function(response){
                                        if(!response.data.success){
                                           $state.go('home');
                                           console.log("1");
                                           console.log(response.data);    
                                    }else{
                                            console.log("2");
                                            alertify.success("REMOVED USER FROM PROJECT!");
                                            //$scope.collection.push(user);
                                            var index = $scope.collectionUsersOnProject.indexOf(user);
                                            //$scope.collection.remove(index);
                                            if (index > -1) {
                                                    $scope.collectionUsersOnProject.splice(index, 1);
                                            }
                                            
                                        }
                                     },
                                     function(response){
                                          
                                            $state.go('home');
                                            console.log("1");
                                            console.log(response.data); 
                                    } 
            );
        
    }

    });
