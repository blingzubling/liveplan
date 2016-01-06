/*global angular*/

'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}])

.service('gemeinsamService', function Gemeinsam() {
    var gemeinsam = this;
    
    gemeinsam.message = 'Default';
})

.controller('View1Ctrl', ['$scope', 'gemeinsamService', function($scope, gemeinsamService) {
    $scope.gemeinsam = gemeinsamService;
}]);