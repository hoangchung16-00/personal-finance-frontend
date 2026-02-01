/**
 * Recent Transactions Component
 * 
 * Displays a list of recent transactions on the dashboard.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfRecentTransactions', {
      template: '<div class="pfm-recent-transactions">' +
                '  <div class="pfm-card">' +
                '    <div class="pfm-card-header-row">' +
                '      <h3 class="pfm-card-title">Recent Transactions</h3>' +
                '      <button class="pfm-btn pfm-btn-secondary" ng-click="vm.goToTransactions()">See All</button>' +
                '    </div>' +
                '    <div class="pfm-transactions-list">' +
                '      <div ng-if="vm.loading" class="pfm-loading-small">Loading...</div>' +
                '      <pf-transaction-item ng-repeat="transaction in vm.transactions" ' +
                '                           transaction="transaction">' +
                '      </pf-transaction-item>' +
                '      <div ng-if="!vm.loading && vm.transactions.length === 0" class="pfm-empty-state">' +
                '        <p>No transactions yet</p>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      controller: RecentTransactionsController,
      controllerAs: 'vm'
    });
  
  RecentTransactionsController.$inject = ['ApiService', '$state'];
  
  function RecentTransactionsController(ApiService, $state) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.goToTransactions = goToTransactions;
    vm.transactions = [];
    vm.loading = true;
    
    ////////////
    
    function onInit() {
      loadTransactions();
    }
    
    function loadTransactions() {
      vm.loading = true;
      
      ApiService.getTransactions({ limit: 5 })
        .then(function(response) {
          vm.transactions = response.data;
          vm.loading = false;
        })
        .catch(function(error) {
          console.error('Error loading transactions:', error);
          vm.loading = false;
        });
    }
    
    function goToTransactions() {
      $state.go('app.transactions');
    }
  }
  
})();
