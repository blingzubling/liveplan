 (function() {

     angular.module('myApp.tab', [])

     .service('tabService', [function() {

         function newTab(preselected) {
             var selected = preselected;

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