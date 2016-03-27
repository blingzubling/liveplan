'use strict';

describe('myApp.math.nice module', function() {

    beforeEach(module('myApp.math.nice'));

    var niceParserService;

    beforeEach(inject(function(_niceParserService_) {
        niceParserService = _niceParserService_;
    }));

    describe('nice parser service', function() {
        it('should exist', function() {
            expect(niceParserService).toBeDefined();
            expect(niceParserService.parse).toBeDefined();
        });

        it('should display multiply, add and parantheses', function() {
            var result = niceParserService.parse('B 3|E@ 5| 4||||');
            expect(result).toEqual('3*(5+4)');
        });
    });
});