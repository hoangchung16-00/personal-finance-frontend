// Personal Finance Management - Summary Cards Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmSummaryCards', {
      bindings: {
        stats: '<'
      },
      template:
        '<div class="pfm-grid pfm-grid-cols-3">' +
        '  <!-- Total Balance -->' +
        '  <div class="pfm-stat-card">' +
        '    <div class="pfm-flex" style="justify-content: space-between; align-items: flex-start;">' +
        '      <p class="pfm-stat-label">Total Balance</p>' +
        '      <span style="font-size: 1.5rem;">💰</span>' +
        '    </div>' +
        '    <p class="pfm-stat-value">{{ $ctrl.formatCurrency($ctrl.stats.totalBalance) }}</p>' +
        '    <div class="pfm-flex" style="align-items: center; gap: 0.25rem;">' +
        '      <span ng-if="$ctrl.stats.balanceChange >= 0" style="color: var(--pfm-success); font-size: 0.875rem;">↗</span>' +
        '      <span ng-if="$ctrl.stats.balanceChange < 0" style="color: var(--pfm-error); font-size: 0.875rem;">↘</span>' +
        '      <p class="pfm-stat-change" ng-class="{positive: $ctrl.stats.balanceChange >= 0, negative: $ctrl.stats.balanceChange < 0}">' +
        '        {{ $ctrl.stats.balanceChange >= 0 ? "+" : "" }}{{ $ctrl.stats.balanceChange }}% from last month' +
        '      </p>' +
        '    </div>' +
        '  </div>' +
        '  <!-- Monthly Income -->' +
        '  <div class="pfm-stat-card">' +
        '    <div class="pfm-flex" style="justify-content: space-between; align-items: flex-start;">' +
        '      <p class="pfm-stat-label">Monthly Income</p>' +
        '      <span style="font-size: 1.5rem;">💵</span>' +
        '    </div>' +
        '    <p class="pfm-stat-value">{{ $ctrl.formatCurrency($ctrl.stats.monthlyIncome) }}</p>' +
        '    <div class="pfm-flex" style="align-items: center; gap: 0.25rem;">' +
        '      <span ng-if="$ctrl.stats.incomeChange >= 0" style="color: var(--pfm-success); font-size: 0.875rem;">↗</span>' +
        '      <span ng-if="$ctrl.stats.incomeChange < 0" style="color: var(--pfm-error); font-size: 0.875rem;">↘</span>' +
        '      <p class="pfm-stat-change" ng-class="{positive: $ctrl.stats.incomeChange >= 0, negative: $ctrl.stats.incomeChange < 0}">' +
        '        {{ $ctrl.stats.incomeChange >= 0 ? "+" : "" }}{{ $ctrl.stats.incomeChange }}% from last month' +
        '      </p>' +
        '    </div>' +
        '  </div>' +
        '  <!-- Monthly Expenses -->' +
        '  <div class="pfm-stat-card">' +
        '    <div class="pfm-flex" style="justify-content: space-between; align-items: flex-start;">' +
        '      <p class="pfm-stat-label">Monthly Expenses</p>' +
        '      <span style="font-size: 1.5rem;">🛒</span>' +
        '    </div>' +
        '    <p class="pfm-stat-value">{{ $ctrl.formatCurrency($ctrl.stats.monthlyExpenses) }}</p>' +
        '    <div class="pfm-flex" style="align-items: center; gap: 0.25rem;">' +
        '      <span ng-if="$ctrl.stats.expenseChange >= 0" style="color: var(--pfm-success); font-size: 0.875rem;">↗</span>' +
        '      <span ng-if="$ctrl.stats.expenseChange < 0" style="color: var(--pfm-error); font-size: 0.875rem;">↘</span>' +
        '      <p class="pfm-stat-change" ng-class="{positive: $ctrl.stats.expenseChange >= 0, negative: $ctrl.stats.expenseChange < 0}">' +
        '        +{{ $ctrl.stats.expenseChange }}% efficiency' +
        '      </p>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      controller: ['UiService', function(UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          if (!ctrl.stats) {
            ctrl.stats = {
              totalBalance: 0,
              balanceChange: 0,
              monthlyIncome: 0,
              incomeChange: 0,
              monthlyExpenses: 0,
              expenseChange: 0
            };
          }
        };
        
        ctrl.formatCurrency = function(amount) {
          return UiService.formatCurrency(amount || 0);
        };
      }]
    });
})();
