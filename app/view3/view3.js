'use strict';
	
angular.module('myApp.view3', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
	.when('/view3', {
		redirectTo: '/plan/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}'
	})
	.when('/plan/:guid', {
		templateUrl: 'view3/view3.html',
		controller: 'View3Ctrl'    
	});
}])

.factory('gabiObject', ['$resource', function($resource){
	return $resource( "data/:guid.json", { guid: '@uuid'} );
}])

.controller('View3Ctrl', ['$scope', '$http', '$routeParams', 'gabiObject', function($scope, $http, $routeParams, gabiObject) {

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
  
  var decimalToRGB = function(decimal){
    var R =  decimal % 256;
    var G = (decimal >> 8) % 256;
    var B = (decimal >> 16) % 256;
    return "rgb(" + R + "," + G + "," + B + ")" ;
  }
  
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
        fill: decimalToRGB(ciJson["color"])
      });
    var cmt = s.text( ciJson["left"]+5, ciJson["top"] + 15, ciJson["comment"] );
    applyStandardFont( cmt );
    var g = s.g(ci, cmt);
    g.drag();
  }  
  
  var painterFnTemplate = function(x, y, objectType){
	  return function(name, guid){
      var s = Snap("#owPlan");		
      var lnk = s.el("a").attr( { "xlink:href": "#/" + objectType + "/" + guid } );
      var textelem = s.text(x+5, y+15, name);
      applyStandardFont(textelem);		
      lnk.append(textelem);		
	  }  
  }  
  
  var resolveAndPaintProcessInst = function(piJson, painterFn){
	var guid = { guid: piJson["process-ref"] };
	
	var myProcess = gabiObject.get( guid ).$promise.then(
		function(responseOK){ 		
			var nation = ( responseOK["nation"] === "" || _.isUndefined(responseOK["nation"]) ) ? "" : responseOK["nation"] + ": ";
			painterFn( nation + responseOK["name"], piJson["process-ref"]);
		},
		function(responseFail){ 
			painterFn("?");
		}
	);
  }  
  
  var paintProcessInst = function(piJson){
    var s = Snap("#owPlan");
    var strokeWidth = 0.75468
    var pi = s.rect(		
          piJson["left"]   + strokeWidth,
          piJson["top"]    + strokeWidth,
          piJson["width"]  - strokeWidth,
          piJson["height"] - strokeWidth
      ).attr({
        stroke: "#e1e1e1",
        "stroke-width": strokeWidth,
        fill: "url(#linearGradient4156)"
      });
  
	var objectType = (piJson["plan"] === true) ? "plan" : "process";
	var newFn = painterFnTemplate( piJson["left"], piJson["top"], objectType );	
	resolveAndPaintProcessInst( piJson, newFn );
  }

  var calcVector = function(ptStart, ptEnd){
    return { 
      dirX: ptEnd.posX - ptStart.posX, 
      dirY: ptEnd.posY - ptStart.posY,
      isLeftToRight: function(){ return (this.dirX>0   && this.dirY===0); },
      isRightToLeft: function(){ return (this.dirX<0   && this.dirY===0); },
      isTopToBottom: function(){ return (this.dirX===0 && this.dirY>0); },
      isBottomToTop: function(){ return (this.dirX===0 && this.dirY<0); }
    }
  }
  
  var paintArrowAt = function(x,y,color){
    var s = Snap("#owPlan");
    var arrowPath = "M" + x + " " + y + " l" + "-5 -5 l0 10 z";
    var arrow = s.path(arrowPath).attr({ fill: decimalToRGB(color), stroke: decimalToRGB(color) });
    return arrow;
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
           
      // paint flow instance line
      s.polyline(pfad).attr( { fill: "none", stroke: decimalToRGB( fiJson["color"] ), "stroke-width": "3" });    
      
      var idx       = $scope.sorted.length;
      var lastPt    = $scope.sorted[idx-1];
      var butLastPt = $scope.sorted[idx-2];
      var arrowDirection = calcVector(butLastPt, lastPt);
      
      // paint arrow at end of line
      var arrow = paintArrowAt( lastPt.posX, lastPt.posY, fiJson["color"] );
      
      var adon = ","+lastPt.posX+","+lastPt.posY;
      if (arrowDirection.isLeftToRight()){
      } else if (arrowDirection.isRightToLeft()) {
        arrow.transform("r180"+adon);
      } else if (arrowDirection.isTopToBottom()) {
        arrow.transform("r90"+adon);
      } else if (arrowDirection.isBottomToTop()) {
        arrow.transform("r270"+adon);
      };
    }
  }
  
  var fetchAndPaintVisibleQuantity = function(planJson, painterFn){	  
	  var guid = { guid: planJson["visibleQuantity-ref"] };
	  var visQnt = gabiObject.get( guid ).$promise.then(
		function(resonseOK){
			painterFn( resonseOK["name"] );
		},
		function(responseFail){
			painterFn( "? (" + guid.guid + " not found)" );
		}
	  );
  }
  
  var michelangelo = function(planJson){
    var s = Snap("#owPlan");
    
    window.document.title = "[Plan] " + planJson["name"];
    var strPlanName = s.text( 15, 20, planJson["name"] ).attr({
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
	
    var paintVisibleQuantity = painterFnTemplate( 15, 20, "quantity" );
    fetchAndPaintVisibleQuantity(planJson, paintVisibleQuantity);
  }
  
  var autsch = function(failData){
	var s = Snap("#owPlan");
	var txt = failData.status + " " + failData.statusText;
	s.text( 30, 52, txt ).attr( { "font-size": "48pt", "fill": "rgb(200,200,200)" } );
  }
  
  var fetch = function($scope){
	
	var rp = $routeParams;
	
	var guid = { guid: rp.guid };
	
	gabiObject.get( guid ).$promise.then(
		function(responseOK){ 		
			$scope.aPlan = responseOK;
			michelangelo($scope.aPlan);
		},
		function(responseFail){ 
			$scope.failData = responseFail;
			autsch(responseFail);
		}
	);
  }
  fetch($scope);
}]);
