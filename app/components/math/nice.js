(function() {

    var uuid2name = function(uuid) {
        switch (uuid) {
            case "{A09184C5-F724-4E87-AD93-5A80DBD4EABA}":
                return "Oil (unspecified)";
                break;
            case "{7E18D0AD-E78E-47A0-8E96-1C0A581902E2}":
                return "Mass";
                break;
            case "{B7CC6C77-D43E-4356-B48C-2704B41159BE}":
                return "CML2001 - Apr. 2013, Eutrophication Potential (EP)";
                break;
            default:
                return "unknown";
        }
    };

    angular.module('myApp.math.nice', [])

    .service('niceParserService', function() {

        var parse = function(input) {
            if (input === '') {
                return '';
            }

            var result = '(parse error)';
            try {
                result = niceParser.parse(input);
            } catch (err) {
                result = result;
            }
            return result;
        };

        return {
            parse: parse,
            uuid2name: uuid2name
        };
    });
})();