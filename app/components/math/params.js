 (function() {
     angular.module('myApp.math.params', [])

     .factory('paramsService', ['niceParserService', function(niceParserService) {

         var internalFn = function(parameter) {
         	var humanReadable = niceParserService.parse(parameter.token);
             _.extend(parameter, {
                 tokenReadable: humanReadable
             });
         };

         var internalFnAry = function(parameters) {
         	_.each(parameters, internalFn);
         };

         return {
             extendParameterArrayWithReadableToken: internalFnAry,
             extendParameterWithReadableToken: internalFn
         };

     }])

 })();