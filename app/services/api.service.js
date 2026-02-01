/**
 * API Service
 * 
 * Wrapper for $http with base URL configuration and placeholder methods.
 * Currently returns mock data for development without backend.
 * 
 * TODO: Replace mock responses with actual API calls when backend is ready.
 * TODO: Add error handling and request interceptors.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .factory('ApiService', ApiService);
  
  ApiService.$inject = ['$http', '$q'];
  
  function ApiService($http, $q) {
    var baseUrl = '/api'; // Configure this when backend is ready
    
    var service = {
      // Transactions
      getTransactions: getTransactions,
      getTransaction: getTransaction,
      createTransaction: createTransaction,
      updateTransaction: updateTransaction,
      deleteTransaction: deleteTransaction,
      
      // Categories
      getCategories: getCategories,
      createCategory: createCategory,
      updateCategory: updateCategory,
      deleteCategory: deleteCategory,
      
      // Dashboard stats
      getDashboardStats: getDashboardStats,
      
      // User/Auth (placeholder)
      login: login,
      signup: signup,
      logout: logout
    };
    
    return service;
    
    ////////////
    
    // Transaction methods
    function getTransactions(params) {
      // Mock data for now
      var mockTransactions = [
        {
          id: 1,
          date: '2024-05-24',
          description: 'Apple Store',
          category: 'Electronics',
          amount: -1299.00,
          type: 'expense'
        },
        {
          id: 2,
          date: '2024-05-20',
          description: 'Tech Corp Salary',
          category: 'Income',
          amount: 5200.00,
          type: 'income'
        },
        {
          id: 3,
          date: '2024-05-18',
          description: 'The Green Cafe',
          category: 'Food',
          amount: -42.50,
          type: 'expense'
        }
      ];
      return $q.resolve({ data: mockTransactions });
    }
    
    function getTransaction(id) {
      return $q.reject('Not implemented yet');
    }
    
    function createTransaction(transaction) {
      return $q.resolve({ data: transaction });
    }
    
    function updateTransaction(id, transaction) {
      return $q.resolve({ data: transaction });
    }
    
    function deleteTransaction(id) {
      return $q.resolve({ success: true });
    }
    
    // Category methods
    function getCategories() {
      var mockCategories = [
        { id: 1, name: 'Salary', type: 'income', color: '#13ec6d', icon: 'payments' },
        { id: 2, name: 'Housing', type: 'expense', color: '#FF5252', icon: 'home' },
        { id: 3, name: 'Groceries', type: 'expense', color: '#FF9800', icon: 'shopping_cart' },
        { id: 4, name: 'Transport', type: 'expense', color: '#2196F3', icon: 'directions_car' },
        { id: 5, name: 'Entertainment', type: 'expense', color: '#9C27B0', icon: 'theater_comedy' },
        { id: 6, name: 'Health', type: 'expense', color: '#009688', icon: 'medical_services' }
      ];
      return $q.resolve({ data: mockCategories });
    }
    
    function createCategory(category) {
      return $q.resolve({ data: category });
    }
    
    function updateCategory(id, category) {
      return $q.resolve({ data: category });
    }
    
    function deleteCategory(id) {
      return $q.resolve({ success: true });
    }
    
    // Dashboard methods
    function getDashboardStats() {
      var mockStats = {
        totalBalance: 24560.00,
        monthlyIncome: 5200.00,
        monthlyExpenses: 3120.00,
        trend: {
          balance: 2.5,
          income: -1.2,
          expenses: 0.8
        }
      };
      return $q.resolve({ data: mockStats });
    }
    
    // Auth methods (mock)
    function login(credentials) {
      // Mock successful login
      return $q.resolve({ 
        data: { 
          token: 'mock-jwt-token',
          user: { 
            id: 1, 
            name: 'Alex Johnson', 
            email: credentials.email 
          } 
        }
      });
    }
    
    function signup(userData) {
      return $q.resolve({ data: { success: true } });
    }
    
    function logout() {
      return $q.resolve({ data: { success: true } });
    }
  }
  
})();
