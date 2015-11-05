'use strict';
	
angular.module('myApp.view4', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/view4', {
		redirectTo: '/process/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}'
	})
	.when('/process/:guid', {
		templateUrl: 'view4/view4.html',
		controller: 'View4Ctrl'    
	});
}])

.factory('gabiObject', ['$resource', function($resource){
	return $resource( "data/:guid.json", { guid: '@uuid'} );
}])

.controller('View4Ctrl', ['$scope', '$http', '$routeParams', 'gabiObject', function($scope, $http, $routeParams, gabiObject) { 
  
  var addFlowName = function(io){    
    var guid = { guid: io["flow-ref"] };
    gabiObject.get( guid ).$promise.then(
      function(successData){
        io["resolvedFlowName"] = successData["name"];
      },
      function(successData){
        io["resolvedFlowName"] = "?";
      });     
  }
  
  var decimalToRGB = function(decimal){
    var R =  decimal % 256;
    var G = (decimal >> 8) % 256;
    var B = (decimal >> 16) % 256;
    return "rgb(" + R + "," + G + "," + B + ")" ;
  }
  
  var applyStandardFont = function(textelem){
		textelem.attr( { "font-size": "8pt" } );
  }
  
  var painterFnTemplate = function(x, y){
	  return function(name, guid){
      var s = Snap("#owProcess");		
      var lnk = s.el("a").attr( { "xlink:href": "#/plan/" + guid } );
      var textelem = s.text(x+5, y+15, name);
      applyStandardFont(textelem);		
      lnk.append(textelem);		
	  }  
  }  
 
  var michelangelo = function(processJson){
    var s = Snap("#owProcess");
    
    window.document.title = "[Process] " + processJson["name"];
    var strProcessName = s.text( 15, 20, processJson["@objectType"] + " - " + processJson["name"] ).attr({
        "font-size": "16pt",
        "font-style": "normal",
        "font-weight": "normal",
        "text-anchor": "start",
        "fill": "#000000",
        "font-family": "Segoe UI"			
        });
    _.map(processJson.inputFlows, addFlowName);
    _.map(processJson.outputFlows, addFlowName);
  }
  
  var autsch = function(failData){
	var s = Snap("#owProcess");
	var txt = failData.status + " " + failData.statusText;
	s.text( 30, 52, txt ).attr( { "font-size": "48pt", "fill": "rgb(200,200,200)" } );
  }
  
  var fetch = function($scope){
	
	var rp = $routeParams;
	
	var guid = { guid: rp.guid };
	
	gabiObject.get( guid ).$promise.then(
		function(responseOK){ 		
			$scope.aProcess = responseOK;
			michelangelo($scope.aProcess);
		},
		function(responseFail){ 
			$scope.failData = responseFail;
			autsch(responseFail);
		}
	);
  }
  fetch($scope);
}]);
