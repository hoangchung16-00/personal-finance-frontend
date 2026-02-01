/**
 * Summary Cards Component
 * 
 * Displays financial summary cards (balance, income, expenses) on the dashboard.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfSummaryCards', {
      template: '<div class="pfm-summary-cards">' +
                '  <div class="pfm-card pfm-summary-card">' +
                '    <div class="pfm-card-header">' +
                '      <p class="pfm-card-label">Total Balance</p>' +
                '      <span class="material-symbols-outlined pfm-card-icon">account_balance</span>' +
                '    </div>' +
                '    <p class="pfm-card-value">${{vm.stats.totalBalance | number:2}}</p>' +
                '    <div class="pfm-card-trend">' +
                '      <span class="material-symbols-outlined pfm-trend-icon" ng-class="{\'trend-up\': vm.stats.trend.balance > 0}">trending_{{vm.stats.trend.balance > 0 ? \'up\' : \'down\'}}</span>' +
                '      <p class="pfm-trend-text" ng-class="{\'trend-positive\': vm.stats.trend.balance > 0, \'trend-negative\': vm.stats.trend.balance < 0}">{{vm.stats.trend.balance > 0 ? \'+\' : \'\'}}{{vm.stats.trend.balance}}% from last month</p>' +
                '    </div>' +
                '  </div>' +
                '  <div class="pfm-card pfm-summary-card">' +
                '    <div class="pfm-card-header">' +
                '      <p class="pfm-card-label">Monthly Income</p>' +
                '      <span class="material-symbols-outlined pfm-card-icon">payments</span>' +
                '    </div>' +
                '    <p class="pfm-card-value">${{vm.stats.monthlyIncome | number:2}}</p>' +
                '    <div class="pfm-card-trend">' +
                '      <span class="material-symbols-outlined pfm-trend-icon" ng-class="{\'trend-up\': vm.stats.trend.income > 0}">trending_{{vm.stats.trend.income > 0 ? \'up\' : \'down\'}}</span>' +
                '      <p class="pfm-trend-text" ng-class="{\'trend-positive\': vm.stats.trend.income > 0, \'trend-negative\': vm.stats.trend.income < 0}">{{vm.stats.trend.income > 0 ? \'+\' : \'\'}}{{vm.stats.trend.income}}% from last month</p>' +
                '    </div>' +
                '  </div>' +
                '  <div class="pfm-card pfm-summary-card">' +
                '    <div class="pfm-card-header">' +
                '      <p class="pfm-card-label">Monthly Expenses</p>' +
                '      <span class="material-symbols-outlined pfm-card-icon">shopping_cart</span>' +
                '    </div>' +
                '    <p class="pfm-card-value">${{vm.stats.monthlyExpenses | number:2}}</p>' +
                '    <div class="pfm-card-trend">' +
                '      <span class="material-symbols-outlined pfm-trend-icon" ng-class="{\'trend-up\': vm.stats.trend.expenses > 0}">trending_{{vm.stats.trend.expenses > 0 ? \'up\' : \'down\'}}</span>' +
                '      <p class="pfm-trend-text" ng-class="{\'trend-positive\': vm.stats.trend.expenses > 0, \'trend-negative\': vm.stats.trend.expenses < 0}">{{vm.stats.trend.expenses > 0 ? \'+\' : \'\'}}{{vm.stats.trend.expenses}}% efficiency</p>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      bindings: {
        stats: '<'
      },
      controllerAs: 'vm'
    });
  
})();
