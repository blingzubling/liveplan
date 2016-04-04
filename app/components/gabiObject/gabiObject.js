 (function() {
     angular.module('myApp.gabiObject', [])

     .factory('gabiObject', ['$resource', function($resource) {
         return $resource('data/:guid.json', {
             guid: '@uuid'
         });
     }])

     .factory('gabiProcess', ['$resource', 'gabiObject', 'paramsService',
         function($resource, gabiObject, paramsService) {

             function get(guid) {

                 var guidParam = {
                     guid: guid
                 };

                 return gabiObject.get(guidParam).$promise.then(
                     function(responseProcess) {
                         // paramsService.extendParameterArrayWithReadableToken(responseProcess.parameters);
                         return responseProcess.$promise;
                     },
                     function(responseFail) {
                         return responseFail;
                     }
                 );
             }

             return {
                 get: get
             };
         }
     ]);
 })();