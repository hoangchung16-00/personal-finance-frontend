// Personal Finance Management - API Service
// Integrated with backend API
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .service('ApiService', ['$http', '$q', 'API_CONFIG', function($http, $q, API_CONFIG) {
      var service = this;
      var BASE_URL = API_CONFIG.BASE_URL; // Backend API base URL from config
      
      // Get API key from localStorage
      function getApiKey() {
        return localStorage.getItem('pfm_api_key');
      }
      
      // Helper function to make authenticated HTTP requests
      function request(method, endpoint, data, params) {
        var apiKey = getApiKey();
        var config = {
          method: method,
          url: BASE_URL + endpoint,
          headers: {}
        };
        
        // Add Authorization header if API key exists
        if (apiKey) {
          config.headers['Authorization'] = 'Bearer ' + apiKey;
        }
        
        // Add data for POST/PATCH/PUT
        if (data) {
          config.data = data;
        }
        
        // Add query parameters
        if (params) {
          config.params = params;
        }
        
        return $http(config);
      }
      
      // ============ ACCOUNTS API ============
      
      // GET /api/v1/accounts - List all accounts
      service.getAccounts = function() {
        return request('GET', '/accounts');
      };
      
      // GET /api/v1/accounts/:id - Get account details
      service.getAccount = function(id) {
        return request('GET', '/accounts/' + id);
      };
      
      // POST /api/v1/accounts - Create account
      service.createAccount = function(accountData) {
        return request('POST', '/accounts', { account: accountData });
      };
      
      // PATCH /api/v1/accounts/:id - Update account
      service.updateAccount = function(id, accountData) {
        return request('PATCH', '/accounts/' + id, { account: accountData });
      };
      
      // DELETE /api/v1/accounts/:id - Delete account
      service.deleteAccount = function(id) {
        return request('DELETE', '/accounts/' + id);
      };
      
      // ============ TRANSACTIONS API ============
      
      // GET /api/v1/transactions - List all transactions with optional filters
      service.getTransactions = function(filters) {
        var params = {};
        if (filters) {
          if (filters.start_date) params.start_date = filters.start_date;
          if (filters.end_date) params.end_date = filters.end_date;
          if (filters.transaction_type) params.transaction_type = filters.transaction_type;
          if (filters.category_id) params.category_id = filters.category_id;
        }
        return request('GET', '/transactions', null, params);
      };
      
      // GET /api/v1/accounts/:account_id/transactions - List transactions for an account
      service.getAccountTransactions = function(accountId, filters) {
        var params = {};
        if (filters) {
          if (filters.start_date) params.start_date = filters.start_date;
          if (filters.end_date) params.end_date = filters.end_date;
          if (filters.transaction_type) params.transaction_type = filters.transaction_type;
          if (filters.category_id) params.category_id = filters.category_id;
        }
        return request('GET', '/accounts/' + accountId + '/transactions', null, params);
      };
      
      // GET /api/v1/transactions/:id - Get transaction details
      service.getTransaction = function(id) {
        return request('GET', '/transactions/' + id);
      };
      
      // POST /api/v1/accounts/:account_id/transactions - Create transaction
      service.createTransaction = function(accountId, transactionData) {
        return request('POST', '/accounts/' + accountId + '/transactions', { transaction: transactionData });
      };
      
      // PATCH /api/v1/transactions/:id - Update transaction
      service.updateTransaction = function(id, transactionData) {
        return request('PATCH', '/transactions/' + id, { transaction: transactionData });
      };
      
      // DELETE /api/v1/transactions/:id - Delete transaction
      service.deleteTransaction = function(id) {
        return request('DELETE', '/transactions/' + id);
      };
      
      // ============ CATEGORIES API ============
      
      // GET /api/v1/categories - List all categories
      service.getCategories = function() {
        return request('GET', '/categories');
      };
      
      // GET /api/v1/categories/:id - Get category details
      service.getCategory = function(id) {
        return request('GET', '/categories/' + id);
      };
      
      // POST /api/v1/categories - Create category
      service.createCategory = function(categoryData) {
        return request('POST', '/categories', { category: categoryData });
      };
      
      // PATCH /api/v1/categories/:id - Update category
      service.updateCategory = function(id, categoryData) {
        return request('PATCH', '/categories/' + id, { category: categoryData });
      };
      
      // DELETE /api/v1/categories/:id - Delete category
      service.deleteCategory = function(id) {
        return request('DELETE', '/categories/' + id);
      };
      
      // ============ DASHBOARD/STATS API ============
      // Note: Stats are calculated from transactions on the client side
      // since the backend doesn't have a dedicated stats endpoint
      
      service.getStats = function() {
        // Get all transactions and accounts to calculate stats
        var statsPromise = $q.all([
          service.getTransactions(),
          service.getAccounts()
        ]).then(function(results) {
          var transactions = results[0].data || [];
          var accounts = results[1].data || [];
          
          // Calculate total balance from all accounts
          var totalBalance = accounts.reduce(function(sum, account) {
            return sum + parseFloat(account.balance || 0);
          }, 0);
          
          // Get current month's transactions
          var now = new Date();
          var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
          var monthlyTransactions = transactions.filter(function(t) {
            var transactionDate = new Date(t.date);
            return transactionDate >= firstDayOfMonth;
          });
          
          // Calculate monthly income and expenses
          var monthlyIncome = monthlyTransactions
            .filter(function(t) { return t.transaction_type === 'income'; })
            .reduce(function(sum, t) { return sum + parseFloat(t.amount || 0); }, 0);
          
          var monthlyExpenses = monthlyTransactions
            .filter(function(t) { return t.transaction_type === 'expense'; })
            .reduce(function(sum, t) { return sum + parseFloat(t.amount || 0); }, 0);
          
          return {
            data: {
              totalBalance: totalBalance,
              balanceChange: 0, // Would need historical data to calculate
              monthlyIncome: monthlyIncome,
              incomeChange: 0, // Would need previous month data to calculate
              monthlyExpenses: monthlyExpenses,
              expenseChange: 0 // Would need previous month data to calculate
            }
          };
        });
        
        return statsPromise;
      };
      
      service.getRecentTransactions = function(limit) {
        var count = limit || 5;
        return service.getTransactions().then(function(response) {
          var transactions = response.data || [];
          return {
            data: transactions.slice(0, count)
          };
        });
      };
      
      // ============ HEALTH CHECK API ============
      
      // GET /up - Check API health
      service.checkHealth = function() {
        return $http.get('/up');
      };
    }]);
})();
