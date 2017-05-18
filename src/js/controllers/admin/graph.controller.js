angular
.module('wineApp')
.controller('LineCtrl', ['$scope', '$timeout', function ($scope) {
  $scope.labels = ['0:00am', '2:00am', '4:00am','6:00am', '8:00am', '10:00am', '12:00am'];
  $scope.series = ['Price'];
  $scope.data = [];
  // $scope.onClick = function (points) {
  //   console.log(points);
  // };
  // $scope.options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         id: 'y-axis-1',
  //         type: 'linear',
  //         display: true,
  //         position: 'left'
  //       },
  //       {
  //         id: 'y-axis-2',
  //         type: 'linear',
  //         display: true,
  //         position: 'right'
  //       }
  //     ]
  //   }
  // };
  // Simulate async data update
  // $timeout(function () {
  //   $scope.data = [
  //     // [28, 48, 40, 19, 86, 27, 90],
  //     [65, 59, 80, 81, 56, 55, 40]
  //   ];
  // }, 3000);
}]);
