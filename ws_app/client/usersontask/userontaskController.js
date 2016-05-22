'use strict';

angular.module('wsapp')
    .controller('userontaskController', function ($scope, projectService,userontaskService,userService,taskService, $state, authService, $stateParams) {


authService.authenticate(
                          function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });

taskService.getById(
            $stateParams.id,
            function(response){
                    console.log(response.data.data);
                    $scope.task=response.data.data;
                    console.log("TASKKKKK:")
                    console.log($scope.task);
            },
            function(response){
                       
            }
     );
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
                                     
//$scope.collection = response.data.projectsImIn

userontaskService.get($stateParams.id,function(response){
                        if(!response.data.success){
                                           $state.go('home');
                                       
                                        }else{
                                            
                                            console.log(response.data);
                                            $scope.collectionUsersOnTask = response.data.collectionUsersOnTask; 
                                        }
    
},function (response) {
                       $state.go('home');
    
}
);
$scope.addUserToTaskController = function(user){
    
     for(var i = 0;i<$scope.collectionUsersOnTask.length;i++){
                if($scope.collectionUsersOnTask[i]._id == user._id){
                   alertify.error("USER ALREADY EXIST IN TASK!");
                   return; 
                }
            }
    
    userontaskService.addUserOnTask($stateParams.id, user._id,function (response) {
                        if(!response.data.success){
                                           $state.go('home');
                                       
                                        }else{
                                            //console.log(response.data);
                                            $scope.collectionUsersOnTask.push(user); 
                                        }
    },function (response) {
                 $state.go('home');
    });
}   

 $scope.removeUserFromTaskController = function(user){
     console.log("OKINUO SE DOGADJAAAAAAAAAAAAAAAAAAAAAAJ ZA REMOVE USER")
     console.log("OKINUO SE DOGADJAAAAAAAAAAAAAAAAAAAAAAJ ZA REMOVE USER")
     console.log("OKINUO SE DOGADJAAAAAAAAAAAAAAAAAAAAAAJ ZA REMOVE USER")
     console.log("OKINUO SE DOGADJAAAAAAAAAAAAAAAAAAAAAAJ ZA REMOVE USER")
            userontaskService.removeUserTask($stateParams.id,user._id,
                                     function(response){
                                        if(!response.data.success){
                                           $state.go('home');
                                           console.log("1");
                                           console.log(response.data);    
                                    }else{
                                            console.log("2");
                                            alertify.success("REMOVED USER FROM TASK!");
                                            //$scope.collection.push(user);
                                            var index = $scope.collectionUsersOnTask.indexOf(user);
                                            //$scope.collection.remove(index);
                                            if (index > -1) {
                                                    $scope.collectionUsersOnTask.splice(index, 1);
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
