// Personal Finance Management - Modal Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmModal', {
      bindings: {
        modalId: '@',
        title: '@',
        onClose: '&'
      },
      transclude: {
        'body': '?modalBody',
        'footer': '?modalFooter'
      },
      template: 
        '<div class="pfm-modal-overlay" ng-show="$ctrl.isOpen" ng-click="$ctrl.handleOverlayClick($event)">' +
        '  <div class="pfm-modal">' +
        '    <div class="pfm-modal-header">' +
        '      <h3 class="pfm-modal-title">{{ $ctrl.title }}</h3>' +
        '      <button class="pfm-btn pfm-btn-sm" ng-click="$ctrl.close()" aria-label="Close">' +
        '        <span aria-hidden="true">&times;</span>' +
        '      </button>' +
        '    </div>' +
        '    <div class="pfm-modal-body" ng-transclude="body"></div>' +
        '    <div class="pfm-modal-footer" ng-transclude="footer"></div>' +
        '  </div>' +
        '</div>',
      controller: ['UiService', function(UiService) {
        var ctrl = this;
        ctrl.isOpen = false;
        
        ctrl.$onInit = function() {
          // Listen for modal events
          ctrl.modalId = ctrl.modalId || 'default';
        };
        
        ctrl.open = function() {
          ctrl.isOpen = true;
          UiService.openModal(ctrl.modalId);
        };
        
        ctrl.close = function() {
          ctrl.isOpen = false;
          UiService.closeModal(ctrl.modalId);
          if (ctrl.onClose) {
            ctrl.onClose();
          }
        };
        
        ctrl.handleOverlayClick = function(event) {
          // Close modal if clicking outside the modal content
          if (event.target.classList.contains('pfm-modal-overlay')) {
            ctrl.close();
          }
        };
      }]
    });
})();
