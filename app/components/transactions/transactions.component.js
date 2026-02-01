// app/components/transactions/transactions.component.js
// Purpose: Transactions list view with filtering and search
// TODO: Add pagination, sorting, and advanced filtering when API supports it

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('transactionsComponent', {
      templateUrl: 'app/components/transactions/transactions.template.html',
      controller: TransactionsController
    });

  TransactionsController.$inject = ['ApiService', 'AuthService', 'UiService'];

  function TransactionsController(ApiService, AuthService, UiService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.isLoading = true;
      ctrl.user = AuthService.getUser();
      ctrl.searchQuery = '';
      ctrl.filterCategory = '';
      loadTransactions();
    };

    function loadTransactions() {
      var params = {
        search: ctrl.searchQuery,
        category: ctrl.filterCategory
      };

      ApiService.getTransactions(params)
        .then(function(transactions) {
          ctrl.transactions = transactions;
        })
        .catch(function(error) {
          UiService.error('Failed to load transactions');
        })
        .finally(function() {
          ctrl.isLoading = false;
        });
    }

    ctrl.refresh = function() {
      ctrl.isLoading = true;
      loadTransactions();
    };

    ctrl.addTransaction = function() {
      UiService.openModal('addTransaction');
    };

    ctrl.editTransaction = function(transaction) {
      UiService.openModal('editTransaction', transaction);
    };

    ctrl.deleteTransaction = function(transaction) {
      if (confirm('Are you sure you want to delete this transaction?')) {
        ApiService.deleteTransaction(transaction.id)
          .then(function() {
            UiService.success('Transaction deleted successfully');
            ctrl.refresh();
          })
          .catch(function(error) {
            UiService.error('Failed to delete transaction');
          });
      }
    };
  }
})();
