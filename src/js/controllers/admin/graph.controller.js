angular
.module('wineApp')
.controller('LineCtrl', ['$scope', '$timeout', function ($scope) {
  $scope.labels = [];
  $scope.series = ['Price'];
  $scope.data = [];
}]);
