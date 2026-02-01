// Personal Finance Management - Dashboard Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmDashboard', {
      templateUrl: 'app/components/dashboard/dashboard.template.html',
      controller: ['ApiService', 'UiService', function(ApiService, UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          ctrl.loading = true;
          ctrl.stats = {};
          ctrl.recentTransactions = [];
          ctrl.budgets = [];
          
          loadDashboardData();
        };
        
        function loadDashboardData() {
          // Load stats
          ApiService.getStats()
            .then(function(response) {
              ctrl.stats = response.data;
            })
            .catch(function(error) {
              UiService.error('Failed to load statistics');
            });
          
          // Load recent transactions
          ApiService.getRecentTransactions(5)
            .then(function(response) {
              ctrl.recentTransactions = response.data;
            })
            .catch(function(error) {
              UiService.error('Failed to load recent transactions');
            });
          
          // Mock budget data
          ctrl.budgets = [
            { name: 'Housing', spent: 1200, limit: 1500, percentage: 80 },
            { name: 'Food & Dining', spent: 450, limit: 600, percentage: 75 },
            { name: 'Entertainment', spent: 280, limit: 200, percentage: 140 },
            { name: 'Transportation', spent: 150, limit: 300, percentage: 50 }
          ];
          
          ctrl.loading = false;
        }
        
        ctrl.addTransaction = function() {
          UiService.info('Add transaction modal will open here');
          // TODO: Open transaction modal
        };
        
        ctrl.viewAllBudgets = function() {
          UiService.info('Budget management coming soon');
        };
      }]
    });
})();
