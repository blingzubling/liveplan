/*global angular*/
/*global _*/
/*global Snap*/

'use strict';

angular.module('myApp.view5', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view5', {
            redirectTo: '/flow/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}'
        })
        .when('/flow/:guid', {
            templateUrl: 'view5/view5.html',
            controller: 'View5Ctrl'
        });
}])

.factory('gabiObject', ['$resource', function($resource) {
    return $resource('data/:guid.json', {
        guid: '@uuid'
    });
}])

.controller('View5Ctrl', ['$scope', '$http', '$routeParams', '$q', 'gabiObject', function($scope, $http, $routeParams, $q, gabiObject) {

}]);