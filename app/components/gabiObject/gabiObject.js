 /*global angular*/
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

             function failParameters(responseFail) {
                 return responseFail;
             }

             function resolveFlows(aProcess) {

                 function getFlow(io) {
                     var guidParam = {
                         guid: io['flow-ref']
                     };
                     var prom = gabiObject.get(guidParam).$promise;
                     prom.then(
                         function(flowResponse) {
                             io['resolvedFlow'] = flowResponse;
                             aProcess.usedQuantities = aProcess.usedQuantities || [];
                             aProcess.usedQuantities.push(flowResponse['referenceQuantity-ref']);
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
                                 aProcess.usedQuantities = aProcess.usedQuantities || [];
                                 aProcess.usedQuantities.sort();
                                 aProcess.usedQuantities = _.uniq(aProcess.usedQuantities, true);
                                 sigma.resolve(aProcess.$promise);
                             });
                     });
                 return sigma.promise;
             }

             function resolveQuantities(aProcess) {

                 function getQuantity(guid) {
                     var guidParam = {
                         guid: guid
                     };
                     var prom = gabiObject.get(guidParam).$promise;
                     prom.then(function(responseQnt) {
                         aProcess.resolvedQuantities = aProcess.resolvedQuantities || [];
                         aProcess.resolvedQuantities.push(responseQnt);
                     });

                     return prom;
                 }

                 aProcess.usedQuantities = aProcess.usedQuantities || [];

                 var sigma = $q.defer();

                 $q.all(_.map(aProcess.usedQuantities, getQuantity))
                     .then(function() {
                         sigma.resolve(aProcess.$promise);
                     });

                 return sigma.promise;
             }

             function get(guid) {
                 var guidParam = {
                     guid: guid
                 };

                 return gabiObject.get(guidParam).$promise
                     .then(resolveFlows)
                     .then(resolveQuantities)
                     .then(addReadableParameters, failParameters);
             }

             return {
                 get: get
             };
         }
     ]);
 })();