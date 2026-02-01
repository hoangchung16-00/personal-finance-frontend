// Personal Finance Management - Loading Spinner Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmLoadingSpinner', {
      bindings: {
        size: '@',
        message: '@'
      },
      template:
        '<div class="pfm-loading">' +
        '  <div>' +
        '    <div class="pfm-spinner" ng-style="{width: $ctrl.spinnerSize, height: $ctrl.spinnerSize}"></div>' +
        '    <p ng-if="$ctrl.message" class="pfm-text-muted pfm-text-center pfm-mt-2">{{ $ctrl.message }}</p>' +
        '  </div>' +
        '</div>',
      controller: [function() {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          // Set default size
          var size = ctrl.size || 'md';
          var sizeMap = {
            'sm': '1.5rem',
            'md': '2rem',
            'lg': '3rem',
            'xl': '4rem'
          };
          ctrl.spinnerSize = sizeMap[size] || sizeMap['md'];
        };
      }]
    });
})();
