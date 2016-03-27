angular.module('myApp.math.nice', [])

.factory('niceParserService', function() {

    var parse = function(input) {
        return input;
    };

    return {
        parse: parse
    };
});