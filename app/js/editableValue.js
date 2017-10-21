(function() {
  'use strict';

  angular
    .module('rpdApp')
    .directive('contenteditable', ['$sce', function($sce) {
      return {
        restrict: 'A', // only activate on element attribute
        require: '?ngModel', // get a hold of NgModelController
        link: function(scope, element, attrs, ngModel) {
          if (!ngModel) return; // do nothing if no ng-model

          // Specify how UI should be updated
          ngModel.$render = function() {
            element.html($sce.getTrustedHtml(ngModel.$viewValue || ''));
          };

          // Listen for change events to enable binding
          element.on('blur keyup change', function() {
            scope.$evalAsync(read);
          });
          // read(); // initialize

          // Write data to the model
          function read() {
            var html = element.html();
            html = html.replace(/&nbsp;/g,' ');
            html = html.replace(/<br>/g,' ');
            html = html.replace(/<\/div><div>/g,' ');
            html = html.replace(/<\/div>/g,' ');
            html = html.replace(/<div>/g,' ');
            html = html.replace(/\s\s/g,'');
            // console.log(element);
            // console.log(ngModel);
            // console.log(html);
            // When we clear the content editable the browser leaves a <br> behind
            // If strip-br attribute is provided then we strip this out
            // if (attrs.stripBr && html === '<br>') {
            //   html = '';
            // }
            if (html == ' ') {
              html = '';
            }
            if (html == '')
              element[0].style.background = '#ffcccc';
            else
              element[0].style.background = 'white';
              // element[0].style.background = 'lightgreen';
            // console.log(html);
            ngModel.$setViewValue(html);
          }
        }
      };
    }]);

})();
