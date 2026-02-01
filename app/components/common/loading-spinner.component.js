/**
 * Loading Spinner Component
 * 
 * Simple loading spinner for async operations.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfLoadingSpinner', {
      template: '<div class="pfm-spinner">' +
                '  <div class="pfm-spinner-circle"></div>' +
                '  <p ng-if="vm.message" class="pfm-spinner-message">{{vm.message}}</p>' +
                '</div>',
      bindings: {
        message: '@'
      },
      controllerAs: 'vm'
    });
  
})();
