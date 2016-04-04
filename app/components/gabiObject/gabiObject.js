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
                 var sigma = $q.defer();

                 $q.all(_.map(aProcess['inputFlows']), function(io) {
                         return io;
                     })
                     .then(function(args) {
                         sigma.resolve(aProcess.$promise);
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