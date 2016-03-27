/*global angular*/
/*global Snap*/
/*global _*/

'use strict';

angular.module('myApp.view4', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/view4', {
            redirectTo: '/process/{D3417EFB-715A-440C-86A1-1AFBE76E6801}'
        })
        .when('/process/:guid', {
            templateUrl: 'view4/view4.html',
            controller: 'View4Ctrl'
        });
}])

.factory('gabiObject', ['$resource', function($resource) {
    return $resource('data/:guid.json', {
        guid: '@uuid'
    });
}])

.controller('View4Ctrl', ['$scope', '$http', '$routeParams', 'gabiObject', 'gemeinsamService', 'niceParserService',
    function($scope, $http, $routeParams, gabiObject, gemeinsamService, niceParserService) {

        $scope.gemeinsam = gemeinsamService;
        
        var addFlowName = function(io) {
            var guid = {
                guid: io['flow-ref']
            };
            gabiObject.get(guid).$promise.then(
                function(successData) {
                    io['resolvedFlowName'] = successData['name'];
                },
                function(failData) {
                    console.warn(failData);
                    io['resolvedFlowName'] = '?';
                });
        };

        var michelangelo = function(processJson) {
            var s = Snap('#owProcess');

            window.document.title = '[Process] ' + processJson['name'];
            // var strProcessName = 
            s.text(15, 20, processJson['@objectType'] + ' - ' + processJson['name']).attr({
                'font-size': '16pt',
                'font-style': 'normal',
                'font-weight': 'normal',
                'text-anchor': 'start',
                'fill': '#000000',
                'font-family': 'Segoe UI'
            });
            _.map(processJson.inputFlows, addFlowName);
            _.map(processJson.outputFlows, addFlowName);
        };
        
        var autsch = function(failData) {
            var s = Snap('#owProcess');
            var txt = failData.status + ' ' + failData.statusText;
            s.text(30, 52, txt).attr({
                'font-size': '48pt',
                'fill': 'rgb(200,200,200)'
            });
        };

        var fetch = function($scope) {

            var rp = $routeParams;

            var guid = {
                guid: rp.guid
            };

            gabiObject.get(guid).$promise.then(
                function(responseOK) {
                    $scope.gemeinsam.message = responseOK['name'];
                    $scope.aProcess = responseOK;
                    michelangelo($scope.aProcess);
                },
                function(responseFail) {
                    $scope.gemeinsam.message = 'ups, fetching process ' + guid + ' failed ...';
                    $scope.failData = responseFail;
                    autsch(responseFail);
                }
            );
        };
        fetch($scope);
    }
]);