// Personal Finance Management - Transactions Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmTransactions', {
      templateUrl: 'app/components/transactions/transactions.template.html',
      controller: ['ApiService', 'UiService', function(ApiService, UiService) {
        var ctrl = this;
        
        var categoryIcons = {
          'Income': '💵',
          'Food': '🍔',
          'Transport': '🚗',
          'Entertainment': '🎬',
          'Shopping': '🛍️',
          'Electronics': '💻',
          'Housing': '🏠',
          'Healthcare': '🏥'
        };
        
        ctrl.$onInit = function() {
          ctrl.loading = true;
          ctrl.transactions = [];
          ctrl.filteredTransactions = [];
          ctrl.categories = [];
          ctrl.selectedCategory = '';
          ctrl.selectedType = '';
          
          loadData();
        };
        
        function loadData() {
          // Load all transactions
          ApiService.getTransactions()
            .then(function(response) {
              ctrl.transactions = response.data;
              ctrl.filteredTransactions = ctrl.transactions;
              ctrl.loading = false;
            })
            .catch(function(error) {
              UiService.error('Failed to load transactions');
              ctrl.loading = false;
            });
          
          // Load categories for filter
          ApiService.getCategories()
            .then(function(response) {
              ctrl.categories = response.data;
            });
        }
        
        ctrl.filterTransactions = function() {
          ctrl.filteredTransactions = ctrl.transactions.filter(function(t) {
            var categoryMatch = !ctrl.selectedCategory || t.category === ctrl.selectedCategory;
            var typeMatch = !ctrl.selectedType || t.type === ctrl.selectedType;
            return categoryMatch && typeMatch;
          });
        };
        
        ctrl.addTransaction = function() {
          UiService.info('Add transaction modal will open here');
          // TODO: Open add transaction modal
        };
        
        ctrl.editTransaction = function(transaction) {
          UiService.info('Edit transaction: ' + transaction.description);
          // TODO: Open edit transaction modal
        };
        
        ctrl.deleteTransaction = function(transaction) {
          if (UiService.confirm('Are you sure you want to delete this transaction?')) {
            ApiService.deleteTransaction(transaction.id)
              .then(function() {
                UiService.success('Transaction deleted successfully');
                loadData();
              })
              .catch(function(error) {
                UiService.error('Failed to delete transaction');
              });
          }
        };
        
        ctrl.exportTransactions = function() {
          UiService.info('Export functionality coming soon');
        };
        
        ctrl.printTransactions = function() {
          window.print();
        };
        
        ctrl.getCategoryIcon = function(category) {
          return categoryIcons[category] || '📝';
        };
        
        ctrl.formatCurrency = function(amount) {
          return UiService.formatCurrency(amount);
        };
        
        ctrl.formatDate = function(date) {
          return UiService.formatDate(date);
        };
      }]
    });
})();
