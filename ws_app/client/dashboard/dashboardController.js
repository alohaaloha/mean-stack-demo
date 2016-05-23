'use strict';

angular.module('wsapp')
    .controller('DashboardController', function ($scope, $state, authService, projectService) {

	authService.authenticate(
                            function(response){
                                if(!response.data.success)
                                	$state.go('home');
                            },
                            function(response){
                               $state.go('home');
                            });

//http://angular-google-chart.github.io/angular-google-chart/docs/0.1.0/examples/

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
var Temp=function(param){
  this.v=param;
}
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












    });
