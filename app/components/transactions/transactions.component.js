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
          'Healthcare': '🏥',
          'Groceries': '🛒',
          'Utilities': '💡'
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
              // Transform transactions to match UI expectations
              ctrl.transactions = (response.data || []).map(function(t) {
                return {
                  id: t.id,
                  date: t.date,
                  category: t.category ? t.category.name : 'Uncategorized',
                  categoryId: t.category_id,
                  description: t.description,
                  amount: parseFloat(t.amount),
                  type: t.transaction_type, // Map transaction_type to type
                  account: t.account,
                  notes: t.notes,
                  tags: t.tags
                };
              });
              ctrl.filteredTransactions = ctrl.transactions;
              ctrl.loading = false;
            })
            .catch(function(error) {
              console.error('Failed to load transactions:', error);
              UiService.error('Failed to load transactions');
              ctrl.loading = false;
            });
          
          // Load categories for filter
          ApiService.getCategories()
            .then(function(response) {
              ctrl.categories = response.data || [];
            })
            .catch(function(error) {
              console.error('Failed to load categories:', error);
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
          if (confirm('Are you sure you want to delete this transaction?')) {
            ApiService.deleteTransaction(transaction.id)
              .then(function() {
                UiService.success('Transaction deleted successfully');
                loadData();
              })
              .catch(function(error) {
                console.error('Failed to delete transaction:', error);
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
