 (function() {

     angular.module('myApp.tab', [])

     .service('tabService', [function() {

         function newTab() {
             return {
                 select: '',
                 isSelected: ''
             };
         }

         return {
             newTab: newTab
         };
     }]);

 })();