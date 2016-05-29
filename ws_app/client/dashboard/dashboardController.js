'use strict';

angular.module('wsapp')
    .controller('DashboardController', function ($scope, $state, $stateParams, authService, userService,projectService, dashboardService) {

	authService.authenticate(
                            function(response){
                                if(!response.data.success){
                                	$state.go('home');
                                }else {
                                  $scope.role=response.data.user.role;
                                  if($scope.role=='ROLE_USER'){
                                    $state.go('home');
                                  }
                                }

                            },
                            function(response){
                               $state.go('home');
                            });

//http://angular-google-chart.github.io/angular-google-chart/docs/0.1.0/examples/

//TIMELINE FINISHINIG PER USER-------------------------------------------------------------

$scope.myChartObject5 = {};
$scope.myChartObject5.type = "ColumnChart";
$scope.myChartObject5.data = {
  "cols": [
        {id: "t", label: "DAY", type: "string"},
        {id: "s", label: "COUNT", type: "number"}
    ],
    "rows": []
  };
$scope.myChartObject5.options = {
        'title': ' '
    };



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

$scope.updateGraph = function () {
        
        dashboardService.dynamicfinishingperUser($scope.selectedItem,$stateParams.id,
function(res){
  console.log("Stigao je odgovor za peti dijagram");
  console.log(res.data);
  $scope.myChartObject5 = {};
  $scope.myChartObject5.type = "ColumnChart";
  $scope.myChartObject5.data = {
  "cols": [
        {id: "t", label: "DAY", type: "string"},
        {id: "s", label: "COUNT", type: "number"}
    ],
    "rows": []
  };
$scope.myChartObject5.options = {
        'title': ' '
    };
//  for(var i=0;i<res.data.data.length;i++){
var obj=res.data.data;
for (var property in obj) {
  if (obj.hasOwnProperty(property)) {
      // do stuff
      var o1={c:[]};
      var o2={v:property};
      var o3={v:obj[property]};
      o1.c.push(o2); o1.c.push(o3);
      $scope.myChartObject5.data.rows.push(o1);
  }
}
   
},
function(res){
    console.log("ERRROOORRR RESPONSE!")
    console.log(res);
}
);
}

// TASKS PER USER --------------------------------------------------------------
$scope.myChartObject = {};
$scope.myChartObject.type = "PieChart";
$scope.myChartObject.options = {
  'title': '  '
};
$scope.myChartObject.data = {
"cols": [
  {id: "t", label: "USER", type: "string"},
  {id: "s", label: "COUNT", type: "number"}
  ],
"rows": []
};
dashboardService.tasksPerUser(
  $stateParams.id,
  function(res){
    //console.log("stigo jej");
    //console.log(res.data);
    for(var i=0;i<res.data.data.length;i++){
      var o1={c:[]};
      var o2={v:res.data.data[i].username};
      var o3={v:res.data.data[i].numberOfTasks};
      o1.c.push(o2); o1.c.push(o3);
      $scope.myChartObject.data.rows.push(o1);
    }
  },
  function(res){

  });
//FINISHED TASKS PER USER-------------------------------------------------------
$scope.myChartObject2 = {};
$scope.myChartObject2.type = "PieChart";
$scope.myChartObject2.options = {
  'title': '  '
};
$scope.myChartObject2.data = {
"cols": [
  {id: "t", label: "USER", type: "string"},
  {id: "s", label: "COUNT", type: "number"}
  ],
"rows": []
};
dashboardService.finishedTasksPerUser(
  $stateParams.id,
  function(res){
    console.log("stigo jej2");
    console.log(res.data);
    for(var i=0;i<res.data.data.list.length;i++){
      var o1={c:[]};
      var o2={v:res.data.data.list[i].username};
      var o3={v:res.data.data.list[i].numberOfDoneTasks};
      o1.c.push(o2); o1.c.push(o3);
      $scope.myChartObject2.data.rows.push(o1);
    }
    var o1={c:[]};
    var o2={v:'NOT FINISHED'};
    var o3={v:res.data.data.notFinishedTasks};
    o1.c.push(o2); o1.c.push(o3);
    $scope.myChartObject2.data.rows.push(o1);
  },
  function(res){

  });
  //TASKS IN MOMENT-------------------------------------------------------------

  $scope.myChartObject3 = {};
  $scope.myChartObject3.type = "ColumnChart";
  $scope.myChartObject3.data = {
    "cols": [
          {id: "t", label: "DAY", type: "string"},
          {id: "s", label: "COUNT", type: "number"}
      ],
      "rows": []
    };
  $scope.myChartObject3.options = {
          'title': ' '
      };

dashboardService.dynamiccreation(
  $stateParams.id,
  function(res){
    console.log("stigo jej3");
    console.log(res.data);

  //  for(var i=0;i<res.data.data.length;i++){
  var obj=res.data.data;
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
        // do stuff
        var o1={c:[]};
        var o2={v:property};
        var o3={v:obj[property]};
        o1.c.push(o2); o1.c.push(o3);
        $scope.myChartObject3.data.rows.push(o1);
    }
  }
      //var o1={c:[]};
    ///  var o2={v:res.data.data.tasks[i].username};
    //  var o3={v:res.data.data.tasks[i].numberOfDoneTasks};
  //    o1.c.push(o2); o1.c.push(o3);
  //    $scope.myChartObject3.data.rows.push(o1);
    //}

  },
  function(res){

  }
);

//FINISHINIG-------------------------------------------------------------

$scope.myChartObject4 = {};
$scope.myChartObject4.type = "ColumnChart";
$scope.myChartObject4.data = {
  "cols": [
        {id: "t", label: "DAY", type: "string"},
        {id: "s", label: "COUNT", type: "number"}
    ],
    "rows": []
  };
$scope.myChartObject4.options = {
        'title': ' '
    };

dashboardService.dynamicfinishing(
$stateParams.id,
function(res){
  console.log("stigo jej3");
  console.log(res.data);

//  for(var i=0;i<res.data.data.length;i++){
var obj=res.data.data;
for (var property in obj) {
  if (obj.hasOwnProperty(property)) {
      // do stuff
      var o1={c:[]};
      var o2={v:property};
      var o3={v:obj[property]};
      o1.c.push(o2); o1.c.push(o3);
      $scope.myChartObject4.data.rows.push(o1);
  }
}
    //var o1={c:[]};
  ///  var o2={v:res.data.data.tasks[i].username};
  //  var o3={v:res.data.data.tasks[i].numberOfDoneTasks};
//    o1.c.push(o2); o1.c.push(o3);
//    $scope.myChartObject3.data.rows.push(o1);
  //}

},
function(res){

}
);












    });
