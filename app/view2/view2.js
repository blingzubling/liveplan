'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', [function() {
  // var s = Snap("#blackboard"); 
  //lets draw 2 rects at position 100,100 and then reposition them
  // var r = s.rect(100,100,100,100,20,20).attr({ stroke: '#123456', 'strokeWidth': 20, fill: 'red', 'opacity': 0.2 });
  // var t = s.text(100,50,'Snap("#svg") should reference an svg element, not a div. Or create it by supplying width,height Snap(100,100)');

  var s = Snap("#blackboard"); // This will use an existing svg element (not a div)
  var r = s.rect(10,10,100,100);
  var c = s.circle(100,100,50);
  r.attr('fill', 'red');     //This is the elements area to fill
  c.attr({ 'fill': 'blue', 'stroke': 'black', 'strokeWidth': 10 });
  r.attr({ stroke: '#123456', 'strokeWidth': 20 }); //Or this does the same thing passing one object
  c.click( function() { this.attr('fill', 'green') } );   // using 'this'
  r.click( function() { r.attr('fill', 'yellow') } );     
  s.text(200,100, 'Click An Object').attr({'fill' : 'blue',  'stroke': 'blue', 'stroke-width': 0.2 });

}]);