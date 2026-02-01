// app/components/transactions/transaction-item.component.js
// Purpose: Individual transaction row component
// Displays transaction details and action buttons

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('transactionItemComponent', {
      bindings: {
        transaction: '<',
        onEdit: '&',
        onDelete: '&'
      },
      template: `
        <td class="px-6 py-4 whitespace-nowrap text-sm">
          {{ $ctrl.transaction.date | date:'MMM dd, yyyy' }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
                ng-class="$ctrl.transaction.type === 'income' ? 'bg-primary/20 text-[#0d1b13]' : 'bg-orange-100 dark:bg-orange-900/30'">
            <span class="material-symbols-outlined text-[14px] mr-1.5">
              {{ $ctrl.transaction.type === 'income' ? 'payments' : 'shopping_bag' }}
            </span>
            {{ $ctrl.transaction.category }}
          </span>
        </td>
        <td class="px-6 py-4 text-sm text-[#4c9a6c]">
          {{ $ctrl.transaction.description }}
        </td>
        <td class="px-6 py-4 text-right whitespace-nowrap">
          <span class="text-sm font-bold" 
                ng-class="$ctrl.transaction.type === 'income' ? 'text-primary' : 'text-[#e72a08]'">
            {{ $ctrl.transaction.type === 'income' ? '+' : '-' }}{{ $ctrl.transaction.amount | currency }}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-center">
          <div class="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              ng-click="$ctrl.onEdit()"
              class="p-1.5 text-gray-400 hover:text-primary transition-colors"
              title="Edit"
            >
              <span class="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <button 
              ng-click="$ctrl.onDelete()"
              class="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
              title="Delete"
            >
              <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
        </td>
      `
    });
})();
