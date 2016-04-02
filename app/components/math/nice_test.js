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
            expect(niceParserService.uuid2name).toBeDefined();
        });

        it('should display multiply, add and parantheses', function() {
            var result = niceParserService.parse('B 3|E@ 5| 4||||');
            expect(result).toEqual('<span class="token_CONST">3</span>*(<span class="token_CONST">5</span>+<span class="token_CONST">4</span>)');
        });

        it('should return empty result string for empty input', function() {
            var result = niceParserService.parse('');
            expect(result).toEqual('');
        });
        
        it('should return info for unparsable input', function() {
            var result = niceParserService.parse('B 3|E@ 5|');
            expect(result).toEqual('(parse error)');
        });

        it('should replace uuids by object names', function () {
            var result = niceParserService.parse("N#{A09184C5-F724-4E87-AD93-5A80DBD4EABA}|4|#{7E18D0AD-E78E-47A0-8E96-1C0A581902E2}|5|#{B7CC6C77-D43E-4356-B48C-2704B41159BE}|5||");
            expect(result).toEqual("f_q_convert('Oil (unspecified)';'Mass';'CML2001 - Apr. 2013, Eutrophication Potential (EP)')");
        })        
    });
});