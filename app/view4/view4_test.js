'use strict';

describe('myApp.view4 module', function() {

    beforeEach(module('myApp.math.params'));

    describe('process parameter appender service', function() {

        var addNiceToParamsService;

        beforeEach(inject(function(_addNiceToParamsService_) {
            addNiceToParamsService = _addNiceToParamsService_;
        }));

        it('should exist', function() {
        	expect(addNiceToParamsService).toBeDefined();
        	expect(addNiceToParamsService.add).toBeDefined();
        });
    });
});