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

    });
});