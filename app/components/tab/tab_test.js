'use strict';

describe('tab service', function() {

    beforeEach(module('myApp.tab'));

    var tabService;

    beforeEach(inject(function(_tabService_) {
        tabService = _tabService_;
    }));

    it('should exist', function() {
        expect(tabService).toBeDefined();
        expect(tabService.newTab).toBeDefined();
    });

    it('should return a function', function() {
        var result = tabService.newTab();
        expect(result).toBeDefined();
        expect(result.select).toBeDefined();
        expect(result.isSelected).toBeDefined();
    });

    it('should select a given tab', function() {
    	var nt = tabService.newTab();
    	nt.select('tbOne');
    	expect(nt.isSelected('tbOne')).toBeTruthy();
    });
});