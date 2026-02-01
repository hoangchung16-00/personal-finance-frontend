// app/components/dashboard/dashboard.component.js
// Purpose: Main dashboard view component
// Displays summary cards, recent transactions, and financial overview
// TODO: Integrate real-time data updates when API is available

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('dashboardComponent', {
      templateUrl: 'app/components/dashboard/dashboard.template.html',
      controller: DashboardController
    });

  DashboardController.$inject = ['ApiService', 'AuthService', 'UiService'];

  function DashboardController(ApiService, AuthService, UiService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.isLoading = true;
      ctrl.user = AuthService.getUser();
      loadDashboardData();
    };

    function loadDashboardData() {
      // Load summary data
      ApiService.getSummary()
        .then(function(summary) {
          ctrl.summary = summary;
        })
        .catch(function(error) {
          UiService.error('Failed to load summary data');
        });

      // Load recent transactions
      ApiService.getRecentTransactions(5)
        .then(function(transactions) {
          ctrl.recentTransactions = transactions;
        })
        .catch(function(error) {
          UiService.error('Failed to load recent transactions');
        })
        .finally(function() {
          ctrl.isLoading = false;
        });
    }

    ctrl.refresh = function() {
      ctrl.isLoading = true;
      loadDashboardData();
    };

    ctrl.addTransaction = function() {
      UiService.openModal('addTransaction');
    };
  }
})();
