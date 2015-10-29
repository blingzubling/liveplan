'use strict';

angular.module('myApp.view3', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view3', {
    templateUrl: 'view3/view3.html',
    controller: 'View3Ctrl'
  });
}])

.controller('View3Ctrl', ['$scope', '$http', function($scope, $http) {
  // var s = Snap("#blackboard"); 
  //lets draw 2 rects at position 100,100 and then reposition them
  // var r = s.rect(100,100,100,100,20,20).attr({ stroke: '#123456', 'strokeWidth': 20, fill: 'red', 'opacity': 0.2 });
  // var t = s.text(100,50,'Snap("#svg") should reference an svg element, not a div. Or create it by supplying width,height Snap(100,100)');

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
    var si = Snap("#svgout");    
    var tux = Snap.load("data/map.svg", function ( loadedFragment ) {
                                                si.append( loadedFragment );
                                        } );
  }
  second(); 

  var michelangelo = function(planJson){
      var s = Snap("#owPlan");
      
  }
  
  var fetch = function($scope, $http){
    $http.get('data/{D57CCB0C-9E31-44BD-9A3C-F729891B56DF}.json').success(
      function(data) {
        $scope.phones = data;
        michelangelo(data);
      }
    );
  }
  fetch($scope, $http);
}]);