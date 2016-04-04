 /*global _*/
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

             function resolveFlows(aProcess) {

                 function getFlow(io) {
                     console.log('getFlow(io) ' + io['flow-ref']);
                     var guidParam = {
                         guid: io['flow-ref']
                     };
                     var prom = gabiObject.get(guidParam).$promise;
                     prom.then(
                         function(flowResponse) {
                             io['resolvedFlow'] = flowResponse;
                         },
                         function(failReponse) {
                             io['resolvedFlow'] = {
                                 error: failReponse
                             };
                         }
                     );
                     return prom;
                 }

                 var sigma = $q.defer();

                 $q.all(_.map(aProcess['inputFlows'], getFlow))
                     .then(function outputFlows() {
                         $q.all(_.map(aProcess['outputFlows'], getFlow))
                             .then(function() {
                                 sigma.resolve(aProcess.$promise);
                             });
                     });
                 return sigma.promise;
             }

             function get(guid) {
                 var guidParam = {
                     guid: guid
                 };

                 return gabiObject.get(guidParam).$promise
                     .then(addReadableParameters, failOne)
                     .then(resolveFlows);
             }

             return {
                 get: get
             };
         }
     ]);
 })();