// app/components/dashboard/recent-transactions.component.js
// Purpose: Display recent transactions list on dashboard
// TODO: Add click handlers to view transaction details when API is available

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('recentTransactionsComponent', {
      bindings: {
        transactions: '<',
        onRefresh: '&'
      },
      template: `
        <div class="bg-white dark:bg-background-dark rounded-xl border border-[#cfe7d9] dark:border-white/10 shadow-sm overflow-hidden">
          <div class="p-6 border-b border-[#cfe7d9] dark:border-white/10 flex justify-between items-center">
            <h3 class="text-[#0d1b13] dark:text-white text-lg font-bold">Recent Transactions</h3>
            <button 
              ui-sref="transactions"
              class="text-xs font-bold text-[#4c9a6c] border border-[#cfe7d9] px-3 py-1 rounded-lg hover:bg-[#e7f3ec] transition-colors"
            >
              View All
            </button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead class="bg-background-light dark:bg-white/5">
                <tr class="text-[#4c9a6c] text-[11px] uppercase tracking-wider font-bold">
                  <th class="px-6 py-3">Transaction</th>
                  <th class="px-6 py-3">Category</th>
                  <th class="px-6 py-3 text-right">Amount</th>
                  <th class="px-6 py-3 text-center">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#cfe7d9] dark:divide-white/10">
                <tr 
                  ng-repeat="transaction in $ctrl.transactions"
                  class="hover:bg-background-light dark:hover:bg-white/5 transition-colors group"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-3">
                      <div class="size-8 rounded bg-[#e7f3ec] flex items-center justify-center text-[#0d1b13]">
                        <span class="material-symbols-outlined text-sm">
                          {{ transaction.type === 'income' ? 'trending_up' : 'shopping_bag' }}
                        </span>
                      </div>
                      <div>
                        <p class="text-sm font-bold dark:text-white">{{ transaction.description }}</p>
                        <p class="text-[10px] text-[#4c9a6c]">{{ transaction.category }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span class="px-2 py-1 bg-[#e7f3ec] text-[#0d1b13] text-[10px] font-bold rounded">
                      {{ transaction.category }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right text-sm font-bold" 
                      ng-class="transaction.type === 'income' ? 'text-[#078829]' : 'text-[#e72a08]'">
                    {{ transaction.type === 'income' ? '+' : '-' }}{{ transaction.amount | currency }}
                  </td>
                  <td class="px-6 py-4 text-center text-[10px] text-[#4c9a6c]">
                    {{ transaction.date | date:'MMM dd, yyyy' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `
    });
})();
