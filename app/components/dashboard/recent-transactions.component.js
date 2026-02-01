// Personal Finance Management - Recent Transactions Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmRecentTransactions', {
      bindings: {
        transactions: '<'
      },
      template:
        '<div class="pfm-card" style="overflow: hidden; padding: 0;">' +
        '  <div class="pfm-flex" style="justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid var(--pfm-border-light);">' +
        '    <h3 class="pfm-card-header" style="margin: 0;">Recent Transactions</h3>' +
        '    <button class="pfm-btn pfm-btn-secondary pfm-btn-sm" ng-click="$ctrl.viewAllTransactions()">See Statements</button>' +
        '  </div>' +
        '  <div style="overflow-x: auto;">' +
        '    <table class="pfm-table" style="border: none;">' +
        '      <thead>' +
        '        <tr>' +
        '          <th>Transaction</th>' +
        '          <th>Category</th>' +
        '          <th style="text-align: right;">Amount</th>' +
        '          <th style="text-align: center;">Date</th>' +
        '        </tr>' +
        '      </thead>' +
        '      <tbody>' +
        '        <tr ng-repeat="transaction in $ctrl.transactions">' +
        '          <td>' +
        '            <div class="pfm-flex" style="align-items: center; gap: 0.75rem;">' +
        '              <div style="width: 2rem; height: 2rem; border-radius: 0.375rem; background: rgba(19, 236, 109, 0.1); display: flex; align-items: center; justify-content: center; font-size: 1rem;">' +
        '                {{ $ctrl.getCategoryIcon(transaction.category) }}' +
        '              </div>' +
        '              <div>' +
        '                <p style="font-size: 0.875rem; font-weight: 600;">{{ transaction.description }}</p>' +
        '                <p class="pfm-text-muted" style="font-size: 0.625rem;">{{ transaction.category }}</p>' +
        '              </div>' +
        '            </div>' +
        '          </td>' +
        '          <td>' +
        '            <span class="pfm-badge" ng-class="{&quot;pfm-badge-success&quot;: transaction.type === &quot;income&quot;, &quot;pfm-badge-danger&quot;: transaction.type === &quot;expense&quot;}">' +
        '              {{ transaction.category }}' +
        '            </span>' +
        '          </td>' +
        '          <td style="text-align: right;">' +
        '            <span style="font-size: 0.875rem; font-weight: 700;" ng-class="{&quot;pfm-text-success&quot;: transaction.amount > 0, &quot;pfm-text-error&quot;: transaction.amount < 0}">' +
        '              {{ transaction.amount > 0 ? "+" : "" }}{{ $ctrl.formatCurrency(transaction.amount) }}' +
        '            </span>' +
        '          </td>' +
        '          <td style="text-align: center;">' +
        '            <span class="pfm-text-muted" style="font-size: 0.625rem;">{{ $ctrl.formatDate(transaction.date) }}</span>' +
        '          </td>' +
        '        </tr>' +
        '        <tr ng-if="!$ctrl.transactions || $ctrl.transactions.length === 0">' +
        '          <td colspan="4" class="pfm-text-center pfm-text-muted" style="padding: 2rem;">No transactions found</td>' +
        '        </tr>' +
        '      </tbody>' +
        '    </table>' +
        '  </div>' +
        '</div>',
      controller: ['$state', 'UiService', function($state, UiService) {
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
        
        ctrl.getCategoryIcon = function(category) {
          return categoryIcons[category] || '📝';
        };
        
        ctrl.formatCurrency = function(amount) {
          return UiService.formatCurrency(amount);
        };
        
        ctrl.formatDate = function(date) {
          return UiService.formatDate(date);
        };
        
        ctrl.viewAllTransactions = function() {
          $state.go('app.transactions');
        };
      }]
    });
})();
