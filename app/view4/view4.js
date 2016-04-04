/*global angular*/
/*global Snap*/
/*global _*/

'use strict';

angular.module('myApp.view4', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'smart-table',
    'myApp.gabiObject',
    'myApp.math.params',
    'myApp.tab'
])

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

.filter('niceFormula', ['$sce', 'niceParserService', function($sce, niceParserService) {
    return function(token) {
        var result = niceParserService.parse(token);
        return $sce.trustAsHtml(result);
    };
}])

.filter('niceEmptyValue', [function() {
    return function(value) {
        if (value === -9999.125) {
            return '';
        } else {
            return value;
        }
    };
}])

.filter('niceClassification', [function() {
    return function(value) {
        if (value === 9) {
            return '*';
        } else if (value === 1) {
            return 'X';
        }
        return '';
    };
}])

.filter('niceVariation', [function() {
    return function(value) {
        return value + ' %';
    };
}])

.controller('View4Ctrl', ['$scope', '$http', '$routeParams', 'gabiObject', 'gabiProcess', 'gemeinsamService', 'paramsService', 'tabService',
    function($scope, $http, $routeParams, gabiObject, gabiProcess, gemeinsamService, paramsService, tabService) {

        $scope.gemeinsam = gemeinsamService;

        $scope.parametersTab = tabService.newTab('tbHide');
        $scope.tab = tabService.newTab('tbLCA');

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

            gabiProcess.get(rp.guid).then(
                function(responseProcess) {
                    $scope.gemeinsam.message = responseProcess['name'];
                    $scope.aProcess = responseProcess;
                    $scope.displayedParameters = [].concat($scope.aProcess.parameters);
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