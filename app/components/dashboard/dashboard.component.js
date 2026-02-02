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
              console.error('Failed to load statistics:', error);
              UiService.error('Failed to load statistics');
            });
          
          // Load recent transactions
          ApiService.getRecentTransactions(5)
            .then(function(response) {
              // Transform transactions to match UI expectations
              ctrl.recentTransactions = (response.data || []).map(function(t) {
                return {
                  id: t.id,
                  date: t.date,
                  category: t.category ? t.category.name : 'Uncategorized',
                  description: t.description,
                  amount: parseFloat(t.amount),
                  type: t.transaction_type
                };
              });
            })
            .catch(function(error) {
              console.error('Failed to load recent transactions:', error);
              UiService.error('Failed to load recent transactions');
            });
          
          // Mock budget data (TODO: integrate with backend when available)
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
