 (function() {
     angular.module('myApp.gabiObject', [])

     .factory('gabiObject', ['$resource', function($resource) {
         return $resource('data/:guid.json', {
             guid: '@uuid'
         });
     }])

     .factory('gabiProcess', ['$resource', '$q', 'gabiObject', 'paramsService',
         function($resource, $q, gabiObject, paramsService) {

             function addReadableParameters(responseProcess) {
                 paramsService.extendParameterArrayWithReadableToken(responseProcess.parameters);
                 return responseProcess.$promise;
             }

             function failOne(responseFail) {
                 return responseFail;
             }

             function collectFlowGuids(aProcess) {

                 var flowGuids = [];
                 function internalCollect(io) {
                     flowGuids.push(io['flow-ref']);
                 }

                 _.map(aProcess['inputFlows'], internalCollect);
                 _.map(aProcess['outputFlows'], internalCollect);

                 return aProcess.$promise;
             }

             function get(guid) {
                 var guidParam = {
                     guid: guid
                 };

                 return gabiObject.get(guidParam).$promise
                     .then(addReadableParameters, failOne)
                     .then(collectFlowGuids);
             }

             return {
                 get: get
             };
         }
     ]);
 })();