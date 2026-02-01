// app/services/api.service.js
// Purpose: Provides mocked API responses for frontend development without backend
// TODO: Replace mocked $q.resolve calls with real $http calls when backend is available

(function() {
  'use strict';

  angular.module('pfmApp')
    .service('ApiService', ['$q', '$timeout', ApiService]);

  function ApiService($q, $timeout) {
    var service = this;

    // Mock data
    var mockUser = { id: 1, name: 'Demo User', email: 'demo@example.com' };
    
    var mockCategories = [
      { id: 1, name: 'Groceries', type: 'expense', icon: 'shopping_cart', color: '#FF9800' },
      { id: 2, name: 'Rent', type: 'expense', icon: 'home', color: '#FF5252' },
      { id: 3, name: 'Salary', type: 'income', icon: 'payments', color: '#13ec6d' },
      { id: 4, name: 'Transport', type: 'expense', icon: 'directions_car', color: '#2196F3' },
      { id: 5, name: 'Entertainment', type: 'expense', icon: 'theater_comedy', color: '#9C27B0' }
    ];
    
    var mockTransactions = [
      { id: 1, amount: 45.50, date: '2026-01-15', category: 'Groceries', description: 'Supermarket', type: 'expense' },
      { id: 2, amount: 1299.00, date: '2026-01-24', category: 'Electronics', description: 'Apple Store', type: 'expense' },
      { id: 3, amount: 5200.00, date: '2026-01-20', category: 'Salary', description: 'Tech Corp Salary', type: 'income' },
      { id: 4, amount: 42.50, date: '2026-01-18', category: 'Food', description: 'The Green Cafe', type: 'expense' },
      { id: 5, amount: 65.00, date: '2026-01-22', category: 'Transport', description: 'Shell Gas Station', type: 'expense' }
    ];
    
    var mockSummary = {
      income: 5000,
      expenses: 1234.56,
      balance: 3765.44,
      totalBalance: 24560.00,
      monthlyIncome: 5200.00,
      monthlyExpenses: 3120.00
    };

    // Service methods
    service.getCurrentUser = function() {
      // TODO: Replace with real API call
      // return $http.get('/api/user/current');
      return $q.resolve(mockUser);
    };

    service.getSummary = function() {
      // TODO: Replace with real API call
      // return $http.get('/api/summary');
      return $q.resolve(mockSummary);
    };

    service.getRecentTransactions = function(limit) {
      // TODO: Replace with real API call
      // return $http.get('/api/transactions/recent', { params: { limit: limit } });
      var limitValue = limit || 5;
      return $q.resolve(mockTransactions.slice(0, limitValue));
    };

    service.getTransactions = function(params) {
      // TODO: Replace with real API call
      // return $http.get('/api/transactions', { params: params });
      return $timeout(function() {
        return mockTransactions;
      }, 300);
    };

    service.getCategories = function() {
      // TODO: Replace with real API call
      // return $http.get('/api/categories');
      return $q.resolve(mockCategories);
    };

    service.addTransaction = function(transaction) {
      // TODO: Replace with real API call
      // return $http.post('/api/transactions', transaction);
      var newTransaction = angular.extend({ id: Date.now() }, transaction);
      mockTransactions.unshift(newTransaction);
      return $q.resolve(newTransaction);
    };

    service.updateTransaction = function(id, transaction) {
      // TODO: Replace with real API call
      // return $http.put('/api/transactions/' + id, transaction);
      return $q.resolve(transaction);
    };

    service.deleteTransaction = function(id) {
      // TODO: Replace with real API call
      // return $http.delete('/api/transactions/' + id);
      var index = mockTransactions.findIndex(function(t) { return t.id === id; });
      if (index !== -1) {
        mockTransactions.splice(index, 1);
      }
      return $q.resolve({ success: true });
    };

    return service;
  }
})();
