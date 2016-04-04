 (function() {
     angular.module('myApp.gabiObject', [])

     .factory('gabiObject', ['$resource', function($resource) {
         return $resource('data/:guid.json', {
             guid: '@uuid'
         });
     }]);

 })();