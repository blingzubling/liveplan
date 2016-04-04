 (function() {

     angular.module('myApp.tab', [])

     .service('tabService', [function() {

         function newTab() {
             var selected;

             function select(tab) {
                 selected = tab;
             }

             function isSelected(value) {
                 return (value === selected);
             }

             return {
                 select: select,
                 isSelected: isSelected
             };
         }

         return {
             newTab: newTab
         };
     }]);

 })();