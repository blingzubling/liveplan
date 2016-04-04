 (function() {
     angular.module('myApp.gabiObject', [])

     .factory('gabiObject', ['$resource', function($resource) {
         return $resource('data/:guid.json', {
             guid: '@uuid'
         });
     }])

     .factory('gabiProcess', ['$resource', 'gabiObject', 'paramsService',
         function($resource, gabiObject, paramsService) {

             function addReadableParameters(responseProcess) {
                 paramsService.extendParameterArrayWithReadableToken(responseProcess.parameters);
                 return responseProcess.$promise;
             }

             function failOne(responseFail) {
                 return responseFail;
             }

             function collectFlowGuids(aProcess) {
                 return '';
             }

             function get(guid) {
                 var guidParam = {
                     guid: guid
                 };

                 return gabiObject.get(guidParam).$promise
                     .then(addReadableParameters, failOne);
             }

             return {
                 get: get
             };
         }
     ]);
 })();