'use strict';
	
angular.module('myApp.view3', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.factory('gabiObject', ['$resource', function($resource){
	return $resource( "data/:guid.json", { guid: '@uuid'} );
}])

.controller('View3Ctrl', ['$scope', '$http', 'gabiObject', function($scope, $http, gabiObject) {

  var first = function(){
    var s = Snap("#blackboard"); // This will use an existing svg element (not a div)

    var c = s.circle( 200,200,10 );
    var r = s.rect(200,100,100,100,20,20).attr({ stroke: '#123456', 'strokeWidth': 20, fill: 'red', 'opacity': 0.3 });

    var rclone = r.clone();
    var rclone2 = r.clone();
    var rclone3 = r.clone();
    var rclone4 = r.clone();
    var rclone5 = r.clone();

    //t=relative transform, T=absolute transform, s=relative scale, S=absolute Scale
    //r=relative rotate, R=relative rotate
    //relative means it takes into account previous transforms to accumulate
    //here it doesn't make much difference, until we combine later


    rclone.transform( 't100,100');
    rclone2.transform( 'r20,200,200' );
    rclone3.transform( 'r40,200,200' );

    s.text(350,150,"rotate around 200,200");

    rclone4.transform( 't100,100r20,200,200' );
    rclone5.transform( 't100,100r40,200,200' );

    s.text(450,250,"combined translate of 100,100 and rotate around 200,200");
  }
  first();
  
  var second = function(){
    var s = Snap("#svgout");    
    var mapSvg = Snap.load("data/map.svg", function ( loadedFragment ) {
                                                s.append( loadedFragment );
                                        } );
  }
  second();
  
  var applyStandardFont = function(textelem){
		textelem.attr( { "font-size": "8pt" } );
  }
  
  var paintCommentInst = function(ciJson){
    var s = Snap("#owPlan");
    
    var ci = s.rect(
      ciJson["left"],
      ciJson["top"],
      ciJson["width"],
      ciJson["height"]).attr({
        stroke: "rgb(0,0,0)",
        "stroke-width": "0.5",			
        fill: "rgb(255,255,128)"
      });
    var cmt = s.text( ciJson["left"]+5, ciJson["top"] + 15, ciJson["comment"] );
	applyStandardFont( cmt );
    var g = s.g(ci, cmt);
    g.drag();
  }  
  
  var painterFnTemplate = function(x, y){
	  return function(name){
		var s = Snap("#owPlan");
		var textelem = s.text(x+5, y+15, name);
		applyStandardFont(textelem);
	  }  
  }  
  
  var resolveAndPaintProcessInst = function(piJson, painterFn){
	var guid = { guid: piJson["process-ref"] };
	
	var myProcess = gabiObject.get( guid ).$promise.then(
		function(responseOK){ 		
			painterFn( responseOK["name"] );
		},
		function(responseFail){ 
			painterFn("?");
		}
	);
  }  
  
  var paintProcessInst = function(piJson){
    var s = Snap("#owPlan");
	
    var pi = s.rect(		
      piJson["left"],
      piJson["top"],
      piJson["width"],
      piJson["height"]).attr( {
        stroke: "#e1e1e1",
        "stroke-width": "0.75468",			
        fill: "url(#linearGradient4156)"
      } );
    
	var newFn = painterFnTemplate( piJson["left"], piJson["top"] );	
	resolveAndPaintProcessInst( piJson, newFn );
  }

  var paintFlowInst = function(fiJson){
    var s = Snap("#owPlan");
    
    $scope.sorted = fiJson["points"].sort(function(left,right){
                                            var sortOrder = [0,2,1];
                                            return sortOrder[left.pointType] - sortOrder[right.pointType];
                                          });
    
    if ($scope.sorted.length > 0) {    
      
      var pfad = [];       
      
      for (var i = 0; i < $scope.sorted.length; i++) { 
        var pt = $scope.sorted[i];
        pfad.push( pt.posX );
        pfad.push( pt.posY );
      }
      
      s.polyline(pfad).attr( { fill: "none", stroke: "rgb(0,0,255)", "stroke-width": "3" });      
    }
  }
  
  var michelangelo = function(planJson){
      var s = Snap("#owPlan");
      
      var strPlanName = s.text( 15, 15, planJson["name"] ).attr({
        "font-size": "16pt",
        "font-style": "normal",
        "font-weight": "normal",
        "text-anchor": "start",
        "fill": "#000000",
        "font-family": "Segoe UI"			
        });
      
    _.map( planJson["flowInstances"], paintFlowInst );
	_.map( planJson["processInstances"], paintProcessInst );
    _.map( planJson["commentInstances"], paintCommentInst );
  }
  
  var autsch = function(failData){
	var s = Snap("#owPlan");
	var txt = failData.status + " " + failData.statusText;
	s.text( 30, 52, txt).attr( { "font-size": "48pt", "fill": "rgb(200,200,200)" } );
  }
  
  var fetch = function($scope, $http){
	$http.get('data/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}.json').then(
		function(successData){			
					$scope.aPlan = successData.data;
					michelangelo($scope.aPlan);				  
		},
		function(failData){
			$scope.failData = failData;
			autsch( failData );
		}
	);
  }
  fetch($scope, $http);
}]);
