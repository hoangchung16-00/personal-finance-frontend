/**
 * Modal Component
 * 
 * Reusable modal/dialog component for overlays.
 * Listens for modal events from UiService.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfModal', {
      template: '<div class="pfm-modal-overlay" ng-if="vm.isOpen" ng-click="vm.close()">' +
                '  <div class="pfm-modal-container" ng-click="$event.stopPropagation()">' +
                '    <div class="pfm-modal-header">' +
                '      <h3 class="pfm-modal-title">{{vm.title}}</h3>' +
                '      <button class="pfm-modal-close" ng-click="vm.close()">' +
                '        <span class="material-symbols-outlined">close</span>' +
                '      </button>' +
                '    </div>' +
                '    <div class="pfm-modal-body" ng-transclude></div>' +
                '  </div>' +
                '</div>',
      bindings: {
        modalId: '@',
        title: '@'
      },
      transclude: true,
      controller: ModalController,
      controllerAs: 'vm'
    });
  
  ModalController.$inject = ['$scope', '$rootScope'];
  
  function ModalController($scope, $rootScope) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.close = close;
    vm.isOpen = false;
    vm.data = null;
    
    ////////////
    
    function onInit() {
      // Listen for modal open events
      $rootScope.$on('modal:open', function(event, args) {
        if (args.id === vm.modalId) {
          vm.isOpen = true;
          vm.data = args.data;
        }
      });
      
      // Listen for modal close events
      $rootScope.$on('modal:close', function(event, args) {
        if (args.id === vm.modalId) {
          vm.isOpen = false;
          vm.data = null;
        }
      });
    }
    
    function close() {
      vm.isOpen = false;
      vm.data = null;
    }
  }
  
})();
