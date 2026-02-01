// Personal Finance Management - Transaction Item Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmTransactionItem', {
      bindings: {
        transaction: '<',
        onEdit: '&',
        onDelete: '&'
      },
      template:
        '<tr style="cursor: pointer;" ng-class="{\'pfm-hover\': $ctrl.hovered}">' +
        '  <td style="white-space: nowrap; font-size: 0.875rem;">{{ $ctrl.formatDate($ctrl.transaction.date) }}</td>' +
        '  <td>' +
        '    <span class="pfm-badge" ng-class="{\'pfm-badge-success\': $ctrl.transaction.type === \'income\', \'pfm-badge-primary\': $ctrl.transaction.type === \'expense\'}\">' +
        '      {{ $ctrl.transaction.category }}' +
        '    </span>' +
        '  </td>' +
        '  <td class="pfm-text-muted" style="font-size: 0.875rem;">{{ $ctrl.transaction.description }}</td>' +
        '  <td style="text-align: right; white-space: nowrap;">' +
        '    <span style="font-size: 0.875rem; font-weight: 700;" ng-class="{\'pfm-text-success\': $ctrl.transaction.type === \'income\', \'pfm-text-error\': $ctrl.transaction.type === \'expense\'}\">' +
        '      {{ $ctrl.transaction.amount > 0 ? "+" : "" }}{{ $ctrl.formatCurrency($ctrl.transaction.amount) }}' +
        '    </span>' +
        '  </td>' +
        '  <td style="text-align: center; white-space: nowrap;">' +
        '    <div class="pfm-flex" style="justify-content: center; gap: 0.25rem;">' +
        '      <button class="pfm-btn pfm-btn-secondary pfm-btn-sm" style="padding: 0.25rem 0.5rem;" ng-click="$ctrl.handleEdit()">' +
        '        ✏️' +
        '      </button>' +
        '      <button class="pfm-btn pfm-btn-secondary pfm-btn-sm" style="padding: 0.25rem 0.5rem;" ng-click="$ctrl.handleDelete()">' +
        '        🗑️' +
        '      </button>' +
        '    </div>' +
        '  </td>' +
        '</tr>',
      controller: ['UiService', function(UiService) {
        var ctrl = this;
        
        ctrl.handleEdit = function() {
          if (ctrl.onEdit) {
            ctrl.onEdit({ transaction: ctrl.transaction });
          }
        };
        
        ctrl.handleDelete = function() {
          if (ctrl.onDelete) {
            ctrl.onDelete({ transaction: ctrl.transaction });
          }
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
