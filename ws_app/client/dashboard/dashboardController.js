'use strict';

angular.module('wsapp')
    .controller('DashboardController', function ($scope, $state, $stateParams, authService, projectService, dashboardService) {

	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });

//http://angular-google-chart.github.io/angular-google-chart/docs/0.1.0/examples/

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
  //----------------------------------------------------------------------------






/*  EXAMPLE OF DATA FOR GRAPH - DO NOT DELETE
var t1={c:[]};
var t2={};
t1.c.push()
$scope.myChartObject.data.rows=[
  {c: [
      {v: "Mushrooms"},
      {v: 3},
  ]},
  {c: [
      {v: "Olives"},
      {v: 31}
  ]},
  {c: [
      {v: "Zucchini"},
      {v: 1},
  ]},
  {c: [
      {v: "Pepperoni"},
      {v: 2},
  ]}];
*/


    });
