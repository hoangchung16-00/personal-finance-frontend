// Personal Finance Management - API Service
// TODO: Replace mocked methods with real API calls when backend is ready
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .service('ApiService', ['$http', '$q', function($http, $q) {
      var service = this;
      var BASE_URL = '/api'; // TODO: Update with actual API base URL
      
      // Helper function to make HTTP requests (for future use)
      function request(method, endpoint, data) {
        return $http({
          method: method,
          url: BASE_URL + endpoint,
          data: data
        });
      }
      
      // ============ MOCKED DATA ============
      var mockTransactions = [
        {
          id: 1,
          date: '2024-05-24',
          category: 'Electronics',
          description: 'Apple Store - Electronic purchase',
          amount: -1299.00,
          type: 'expense'
        },
        {
          id: 2,
          date: '2024-05-20',
          category: 'Income',
          description: 'Tech Corp Salary - Monthly paycheck',
          amount: 5200.00,
          type: 'income'
        },
        {
          id: 3,
          date: '2024-05-18',
          category: 'Food',
          description: 'The Green Cafe - Lunch with client',
          amount: -42.50,
          type: 'expense'
        },
        {
          id: 4,
          date: '2024-05-15',
          category: 'Transport',
          description: 'Shell Gas Station',
          amount: -65.00,
          type: 'expense'
        },
        {
          id: 5,
          date: '2024-05-12',
          category: 'Entertainment',
          description: 'Netflix Monthly Subscription',
          amount: -15.99,
          type: 'expense'
        }
      ];
      
      var mockCategories = [
        { id: 1, name: 'Income', icon: 'payments', color: '#13ec6d', type: 'income' },
        { id: 2, name: 'Food', icon: 'restaurant', color: '#FF9800', type: 'expense' },
        { id: 3, name: 'Transport', icon: 'local_gas_station', color: '#2196F3', type: 'expense' },
        { id: 4, name: 'Entertainment', icon: 'movie', color: '#9C27B0', type: 'expense' },
        { id: 5, name: 'Shopping', icon: 'shopping_bag', color: '#E91E63', type: 'expense' },
        { id: 6, name: 'Electronics', icon: 'devices', color: '#607D8B', type: 'expense' },
        { id: 7, name: 'Housing', icon: 'home', color: '#795548', type: 'expense' },
        { id: 8, name: 'Healthcare', icon: 'local_hospital', color: '#F44336', type: 'expense' }
      ];
      
      var mockStats = {
        totalBalance: 24560.00,
        balanceChange: 2.5,
        monthlyIncome: 5200.00,
        incomeChange: -1.2,
        monthlyExpenses: 3120.00,
        expenseChange: 0.8
      };
      
      // ============ TRANSACTIONS API ============
      // TODO: Replace with real API call - GET /api/transactions
      service.getTransactions = function(filters) {
        return $q.resolve({
          data: mockTransactions.filter(function(t) {
            if (filters && filters.category && filters.category !== 'all') {
              return t.category.toLowerCase() === filters.category.toLowerCase();
            }
            return true;
          })
        });
      };
      
      // TODO: Replace with real API call - GET /api/transactions/:id
      service.getTransaction = function(id) {
        var transaction = mockTransactions.find(function(t) { return t.id === parseInt(id); });
        return $q.resolve({ data: transaction });
      };
      
      // TODO: Replace with real API call - POST /api/transactions
      service.createTransaction = function(transaction) {
        var newTransaction = angular.extend({}, transaction, {
          id: mockTransactions.length + 1,
          date: transaction.date || new Date().toISOString().split('T')[0]
        });
        mockTransactions.unshift(newTransaction);
        return $q.resolve({ data: newTransaction });
      };
      
      // TODO: Replace with real API call - PUT /api/transactions/:id
      service.updateTransaction = function(id, transaction) {
        var index = mockTransactions.findIndex(function(t) { return t.id === parseInt(id); });
        if (index !== -1) {
          mockTransactions[index] = angular.extend({}, mockTransactions[index], transaction);
          return $q.resolve({ data: mockTransactions[index] });
        }
        return $q.reject({ error: 'Transaction not found' });
      };
      
      // TODO: Replace with real API call - DELETE /api/transactions/:id
      service.deleteTransaction = function(id) {
        var index = mockTransactions.findIndex(function(t) { return t.id === parseInt(id); });
        if (index !== -1) {
          mockTransactions.splice(index, 1);
          return $q.resolve({ success: true });
        }
        return $q.reject({ error: 'Transaction not found' });
      };
      
      // ============ CATEGORIES API ============
      // TODO: Replace with real API call - GET /api/categories
      service.getCategories = function() {
        return $q.resolve({ data: mockCategories });
      };
      
      // TODO: Replace with real API call - POST /api/categories
      service.createCategory = function(category) {
        var newCategory = angular.extend({}, category, {
          id: mockCategories.length + 1
        });
        mockCategories.push(newCategory);
        return $q.resolve({ data: newCategory });
      };
      
      // TODO: Replace with real API call - PUT /api/categories/:id
      service.updateCategory = function(id, category) {
        var index = mockCategories.findIndex(function(c) { return c.id === parseInt(id); });
        if (index !== -1) {
          mockCategories[index] = angular.extend({}, mockCategories[index], category);
          return $q.resolve({ data: mockCategories[index] });
        }
        return $q.reject({ error: 'Category not found' });
      };
      
      // TODO: Replace with real API call - DELETE /api/categories/:id
      service.deleteCategory = function(id) {
        var index = mockCategories.findIndex(function(c) { return c.id === parseInt(id); });
        if (index !== -1) {
          mockCategories.splice(index, 1);
          return $q.resolve({ success: true });
        }
        return $q.reject({ error: 'Category not found' });
      };
      
      // ============ DASHBOARD/STATS API ============
      // TODO: Replace with real API call - GET /api/stats
      service.getStats = function() {
        return $q.resolve({ data: mockStats });
      };
      
      // TODO: Replace with real API call - GET /api/transactions/recent
      service.getRecentTransactions = function(limit) {
        var count = limit || 5;
        return $q.resolve({ 
          data: mockTransactions.slice(0, count) 
        });
      };
    }]);
})();
