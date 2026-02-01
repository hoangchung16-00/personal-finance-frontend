// app/components/common/modal.component.js
// Purpose: Generic modal component for dialogs and forms
// Listens to UiService modal events

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('modalComponent', {
      template: `
        <div 
          ng-if="$ctrl.modalState.isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          ng-click="$ctrl.closeModal()"
        >
          <div 
            class="w-full max-w-[500px] bg-white dark:bg-[#102218] rounded-2xl shadow-2xl overflow-hidden"
            ng-click="$event.stopPropagation()"
          >
            <!-- Modal Header -->
            <div class="px-6 py-4 border-b border-[#cfe7d9] dark:border-[#1e3a2a] flex items-center justify-between">
              <h3 class="text-xl font-bold">{{ $ctrl.getModalTitle() }}</h3>
              <button 
                ng-click="$ctrl.closeModal()"
                class="text-gray-400 hover:text-gray-600 dark:hover:text-white"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <!-- Modal Body -->
            <div class="p-6">
              <p class="text-sm text-[#4c9a6c]">
                Modal functionality coming soon. Use this component to display forms and dialogs.
              </p>
              <p class="text-xs text-[#4c9a6c] mt-2">
                Component: {{ $ctrl.modalState.component }}
              </p>
            </div>
            
            <!-- Modal Footer -->
            <div class="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-t border-[#cfe7d9] dark:border-[#1e3a2a] flex gap-3">
              <button 
                ng-click="$ctrl.closeModal()"
                class="flex-1 py-3 border border-[#cfe7d9] dark:border-[#2d4a3a] rounded-xl text-sm font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                class="flex-[2] py-3 bg-primary text-[#0d1b13] rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      `,
      controller: ModalController
    });

  ModalController.$inject = ['$scope', 'UiService'];

  function ModalController($scope, UiService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.modalState = UiService.getModalState();

      // Listen for modal events
      $scope.$on('modal:open', function(event, state) {
        ctrl.modalState = state;
      });

      $scope.$on('modal:close', function() {
        ctrl.modalState = UiService.getModalState();
      });
    };

    ctrl.closeModal = function() {
      UiService.closeModal();
    };

    ctrl.getModalTitle = function() {
      var titles = {
        'addTransaction': 'Add Transaction',
        'editTransaction': 'Edit Transaction',
        'addCategory': 'Add Category',
        'editCategory': 'Edit Category'
      };
      return titles[ctrl.modalState.component] || 'Modal';
    };
  }
})();
