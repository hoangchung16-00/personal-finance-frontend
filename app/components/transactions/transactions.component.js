/**
 * Transactions Component
 * 
 * Main transactions list view with filtering and sorting capabilities.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfTransactions', {
      templateUrl: 'app/components/transactions/transactions.template.html',
      controller: TransactionsController,
      controllerAs: 'vm'
    });
  
  TransactionsController.$inject = ['ApiService', 'UiService'];
  
  function TransactionsController(ApiService, UiService) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.loadTransactions = loadTransactions;
    vm.deleteTransaction = deleteTransaction;
    vm.openAddModal = openAddModal;
    
    vm.transactions = [];
    vm.loading = true;
    vm.filters = {
      search: '',
      category: null,
      dateFrom: null,
      dateTo: null
    };
    
    ////////////
    
    function onInit() {
      loadTransactions();
    }
    
    function loadTransactions() {
      vm.loading = true;
      
      ApiService.getTransactions(vm.filters)
        .then(function(response) {
          vm.transactions = response.data;
          vm.loading = false;
        })
        .catch(function(error) {
          console.error('Error loading transactions:', error);
          vm.loading = false;
        });
    }
    
    function deleteTransaction(id) {
      if (UiService.confirm('Are you sure you want to delete this transaction?')) {
        ApiService.deleteTransaction(id)
          .then(function() {
            UiService.showNotification('Transaction deleted successfully', 'success');
            loadTransactions();
          })
          .catch(function(error) {
            console.error('Error deleting transaction:', error);
            UiService.showNotification('Error deleting transaction', 'error');
          });
      }
    }
    
    function openAddModal() {
      UiService.openModal('addTransaction');
    }
  }
  
})();
