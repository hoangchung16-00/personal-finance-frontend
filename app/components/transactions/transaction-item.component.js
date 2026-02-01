/**
 * Transaction Item Component
 * 
 * Individual transaction display component with edit/delete actions.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfTransactionItem', {
      template: '<div class="pfm-transaction-item">' +
                '  <div class="pfm-transaction-icon" ng-class="vm.getTypeClass()">' +
                '    <span class="material-symbols-outlined">{{vm.getIcon()}}</span>' +
                '  </div>' +
                '  <div class="pfm-transaction-details">' +
                '    <p class="pfm-transaction-description">{{vm.transaction.description}}</p>' +
                '    <p class="pfm-transaction-date">{{vm.transaction.date | date:\'MMM dd, yyyy\'}}</p>' +
                '  </div>' +
                '  <div class="pfm-transaction-category">' +
                '    <span class="pfm-badge">{{vm.transaction.category}}</span>' +
                '  </div>' +
                '  <div class="pfm-transaction-amount" ng-class="{\'amount-positive\': vm.transaction.amount > 0, \'amount-negative\': vm.transaction.amount < 0}">' +
                '    <span>{{vm.transaction.amount > 0 ? \'+\' : \'\'}}${{vm.transaction.amount | number:2}}</span>' +
                '  </div>' +
                '  <div class="pfm-transaction-actions" ng-if="vm.onDelete">' +
                '    <button class="pfm-icon-btn" ng-click="vm.edit()">' +
                '      <span class="material-symbols-outlined">edit</span>' +
                '    </button>' +
                '    <button class="pfm-icon-btn pfm-icon-btn-danger" ng-click="vm.delete()">' +
                '      <span class="material-symbols-outlined">delete</span>' +
                '    </button>' +
                '  </div>' +
                '</div>',
      bindings: {
        transaction: '<',
        onDelete: '&'
      },
      controller: TransactionItemController,
      controllerAs: 'vm'
    });
  
  function TransactionItemController() {
    var vm = this;
    
    vm.getIcon = getIcon;
    vm.getTypeClass = getTypeClass;
    vm.edit = edit;
    vm.delete = deleteTransaction;
    
    ////////////
    
    function getIcon() {
      if (vm.transaction.type === 'income') {
        return 'payments';
      }
      return 'shopping_bag';
    }
    
    function getTypeClass() {
      return vm.transaction.type === 'income' ? 'icon-income' : 'icon-expense';
    }
    
    function edit() {
      // TODO: Implement edit functionality
      console.log('Edit transaction:', vm.transaction.id);
    }
    
    function deleteTransaction() {
      if (vm.onDelete) {
        vm.onDelete();
      }
    }
  }
  
})();
