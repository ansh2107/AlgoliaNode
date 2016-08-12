'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngSanitize'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', { templateUrl: 'template.html', controller: 'HomeCtrl' });
}])
.factory('Contacts', function() {
  return new AlgoliaSearch('GSLW7H4FX6', '6d38326fdc63c2715698c888b55eb2d2').initIndex('colorsArray');
})
.controller('HomeCtrl', function ($scope, Contacts) {
    $scope.hits = [];
    $scope.query = '';
    $scope.initRun = true;
    $scope.search = function() {
      Contacts.search($scope.query, function(success, content) {
        if (!success || $scope.query != content.query) {
          return;
        }
        $scope.hits = content.hits;
        if ($scope.initRun){
          $scope.$apply();
          $scope.initRun = false;
        }
      });
    };
    $scope.search();
});
