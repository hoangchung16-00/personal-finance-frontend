// app/components/dashboard/summary-cards.component.js
// Purpose: Display financial summary cards (balance, income, expenses)
// TODO: Add real-time updates and trend indicators when API is available

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('summaryCardsComponent', {
      bindings: {
        summary: '<'
      },
      template: `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Total Balance Card -->
          <div class="bg-white dark:bg-background-dark flex flex-col gap-2 rounded-xl p-6 border border-[#cfe7d9] dark:border-white/10 shadow-sm">
            <div class="flex justify-between items-start">
              <p class="text-[#4c9a6c] dark:text-white/60 text-sm font-medium">Total Balance</p>
              <span class="material-symbols-outlined text-primary">account_balance</span>
            </div>
            <p class="text-[#0d1b13] dark:text-white text-3xl font-bold leading-tight">
              {{ $ctrl.summary.totalBalance | currency }}
            </p>
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[#078829] text-sm">trending_up</span>
              <p class="text-[#078829] text-xs font-bold">+2.5% from last month</p>
            </div>
          </div>

          <!-- Monthly Income Card -->
          <div class="bg-white dark:bg-background-dark flex flex-col gap-2 rounded-xl p-6 border border-[#cfe7d9] dark:border-white/10 shadow-sm">
            <div class="flex justify-between items-start">
              <p class="text-[#4c9a6c] dark:text-white/60 text-sm font-medium">Monthly Income</p>
              <span class="material-symbols-outlined text-primary">payments</span>
            </div>
            <p class="text-[#0d1b13] dark:text-white text-3xl font-bold leading-tight">
              {{ $ctrl.summary.monthlyIncome | currency }}
            </p>
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[#078829] text-sm">trending_up</span>
              <p class="text-[#078829] text-xs font-bold">Steady income</p>
            </div>
          </div>

          <!-- Monthly Expenses Card -->
          <div class="bg-white dark:bg-background-dark flex flex-col gap-2 rounded-xl p-6 border border-[#cfe7d9] dark:border-white/10 shadow-sm">
            <div class="flex justify-between items-start">
              <p class="text-[#4c9a6c] dark:text-white/60 text-sm font-medium">Monthly Expenses</p>
              <span class="material-symbols-outlined text-primary">shopping_cart</span>
            </div>
            <p class="text-[#0d1b13] dark:text-white text-3xl font-bold leading-tight">
              {{ $ctrl.summary.monthlyExpenses | currency }}
            </p>
            <div class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[#e72a08] text-sm">trending_down</span>
              <p class="text-[#078829] text-xs font-bold">Good control</p>
            </div>
          </div>
        </div>
      `
    });
})();
