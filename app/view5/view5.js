/*global angular*/
/*global _*/
/*global Snap*/

'use strict';

angular.module('myApp.view5', ['ngRoute', 'ngResource', 'smart-table'])

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

.controller('View5Ctrl', ['$scope', '$http', '$routeParams', '$q', '$filter', 'gabiObject',
    function($scope, $http, $routeParams, $q, $filter, gabiObject) {

        var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
        var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
        var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
        var id = 1;

        function generateRandomItem(id) {

            var firstname = firstnames[Math.floor(Math.random() * 3)];
            var lastname = lastnames[Math.floor(Math.random() * 3)];
            var birthdate = dates[Math.floor(Math.random() * 3)];
            var balance = Math.floor(Math.random() * 2000);

            return {
                id: id,
                firstName: firstname,
                lastName: lastname,
                birthDate: new Date(birthdate),
                balance: balance
            };
        }

        $scope.rowCollection = [];
        //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
        $scope.displayedCollection = [].concat($scope.rowCollection);

        for (id; id < 5; id++) {
            $scope.rowCollection.push(generateRandomItem(id));
        }

        //add to the real data holder
        $scope.addRandomItem = function addRandomItem() {
            $scope.rowCollection.push(generateRandomItem(id));
            id++;
        };

        //remove to the real data holder
        $scope.removeItem = function removeItem(row) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        }
    }
]);