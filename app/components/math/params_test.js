'use strict';

describe('myApp.math.params module', function() {

    beforeEach(module('myApp.math.params'));

    describe('paramsService', function() {

        beforeEach(module('myApp.math.nice'));

        var paramsService;

        beforeEach(inject(function(_paramsService_) {
            paramsService = _paramsService_;
        }));

        it('should exist', function() {
            expect(paramsService).toBeDefined();
            expect(paramsService.extendParameterArrayWithReadableToken).toBeDefined();
            expect(paramsService.extendParameterWithReadableToken).toBeDefined();
        });

        it('should extend single parameter with readable token', function() {

            // arrange
            var aParametrizedObject = {
                'parameters': [{
                    'min': 0,
                    'max': 4,
                    'standardDeviation': 0,
                    'value': 1,
                    'token': 'B 3|DE@ 5| 4||| 0,7|||',  // = 3*(5+4)^0.7
                    'comment': 'first parameter',
                    'name': 'alpha'
                }]
            };

            // act
            paramsService.extendParameterWithReadableToken(aParametrizedObject.parameters[0]);
            
            // assert
            var newEntry = aParametrizedObject.parameters[0].tokenReadable;
            expect(newEntry).toBeDefined();
            expect(newEntry).toEqual('3*(5+4)^0.7');
        });

        it('should extend parameters array elements with readable token', function() {

            // arrange
            var aParametrizedObject = {
                'parameters': [{
                    'min': 0,
                    'max': 4,
                    'standardDeviation': 0,
                    'value': 1,
                    'token': 'B 3|DE@ 5| 4||| 0,7|||',  // = 3*(5+4)^0.7
                    'comment': 'first parameter',
                    'name': 'alpha'
                }]
            };

            // act
            paramsService.extendParameterArrayWithReadableToken(aParametrizedObject.parameters);
            
            // assert
            var newEntry = aParametrizedObject.parameters[0].tokenReadable;
            expect(newEntry).toBeDefined();
            expect(newEntry).toEqual('3*(5+4)^0.7');
        });

    });
});