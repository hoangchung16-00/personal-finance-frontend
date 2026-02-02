// Personal Finance Management - Authentication Service
// Integrated with backend API authentication
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .service('AuthService', ['$q', '$http', function($q, $http) {
      var service = this;
      var currentUser = null;
      var isLoggedIn = false;
      
      // Check if user is authenticated (has API key)
      service.isAuthenticated = function() {
        // Check localStorage for persisted API key
        if (!isLoggedIn) {
          var apiKey = localStorage.getItem('pfm_api_key');
          var stored = localStorage.getItem('pfm_user');
          if (apiKey && stored) {
            currentUser = JSON.parse(stored);
            isLoggedIn = true;
          }
        }
        return isLoggedIn;
      };
      
      // Get current user
      service.getCurrentUser = function() {
        return currentUser;
      };
      
      // Set API key and user session
      service.setSession = function(apiKey, user) {
        localStorage.setItem('pfm_api_key', apiKey);
        localStorage.setItem('pfm_user', JSON.stringify(user));
        currentUser = user;
        isLoggedIn = true;
      };
      
      // Get stored API key
      service.getApiKey = function() {
        return localStorage.getItem('pfm_api_key');
      };
      
      // Login with API key
      // Note: The backend API documentation doesn't specify a login endpoint
      // This assumes the user has an API key already generated via Rails console
      // In production, you would typically have a /auth/login endpoint
      service.loginWithApiKey = function(apiKey, userData) {
        // Store the API key and user data
        service.setSession(apiKey, userData);
        return $q.resolve({ success: true, user: userData });
      };
      
      // Mock login for demo purposes
      // TODO: Replace with actual authentication endpoint when available
      service.login = function(email, password) {
        // For now, this is a mock implementation
        // In production, this would call POST /api/auth/login
        return $q(function(resolve, reject) {
          setTimeout(function() {
            // Demo credentials check
            if (email === 'demo@example.com' && password === 'demo123') {
              var user = {
                id: 1,
                email: email,
                name: 'Demo User',
                avatar: 'https://i.pravatar.cc/150?img=1'
              };
              
              // Use a demo API key (in production, this would come from the server)
              var demoApiKey = 'demo_api_key_' + Date.now();
              service.setSession(demoApiKey, user);
              
              resolve({ success: true, user: user });
            } else {
              reject({ error: 'Invalid email or password' });
            }
          }, 500);
        });
      };
      
      // Signup
      // TODO: Replace with actual signup endpoint when available
      service.signup = function(userData) {
        // For now, this is a mock implementation
        return $q(function(resolve, reject) {
          setTimeout(function() {
            var user = {
              id: Date.now(),
              email: userData.email,
              name: userData.name || 'User',
              avatar: 'https://i.pravatar.cc/150?img=' + (Math.floor(Math.random() * 70) + 1)
            };
            
            // Generate a demo API key
            var apiKey = 'api_key_' + Date.now();
            service.setSession(apiKey, user);
            
            resolve({ success: true, user: user });
          }, 500);
        });
      };
      
      // Logout
      service.logout = function() {
        currentUser = null;
        isLoggedIn = false;
        localStorage.removeItem('pfm_api_key');
        localStorage.removeItem('pfm_user');
        return $q.resolve({ success: true });
      };
      
      // Helper to quickly set up a demo session
      service.quickLogin = function() {
        var user = {
          id: 1,
          email: 'demo@example.com',
          name: 'Demo User',
          avatar: 'https://i.pravatar.cc/150?img=1'
        };
        var apiKey = 'demo_api_key_' + Date.now();
        service.setSession(apiKey, user);
        return $q.resolve({ success: true, user: user });
      };
    }]);
})();
