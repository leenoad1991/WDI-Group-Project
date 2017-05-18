angular
.module('wineApp')
.controller('LineCtrl', ['$scope', '$timeout', function ($scope, $timeout) {

  var d = new Date();
  var n = d.getHours();
  console.log(n);
  $scope.labels = [n+12, n];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    // [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  // $scope.onClick = function (points, evt) {
  //   console.log(points, evt);
  // };

  // Simulate async data update
  $timeout(function () {
    $scope.data = [
      // [28, 48, 40, 19, 86, 27, 90],
      [65, 59, 80, 81, 56, 55, 40]
    ];
  }, 3000);
}]);
