// Personal Finance Management - Authentication Service
// NOTE: This is UI-level authentication for testing routes only
// TODO: Integrate with real backend authentication when API is ready
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .service('AuthService', ['$q', function($q) {
      var service = this;
      var currentUser = null;
      var isLoggedIn = false;
      
      // Mock user data for testing
      var mockUsers = [
        {
          id: 1,
          email: 'demo@example.com',
          password: 'demo123', // NOTE: In production, never store passwords like this!
          name: 'Alex Johnson',
          avatar: 'https://i.pravatar.cc/150?img=1'
        }
      ];
      
      // Check if user is authenticated
      service.isAuthenticated = function() {
        // Check localStorage for persisted session
        if (!isLoggedIn) {
          var stored = localStorage.getItem('pfm_user');
          if (stored) {
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
      
      // Login (mocked)
      // TODO: Replace with real API call - POST /api/auth/login
      service.login = function(email, password) {
        // Simulate API delay
        return $q(function(resolve, reject) {
          setTimeout(function() {
            var user = mockUsers.find(function(u) {
              return u.email === email && u.password === password;
            });
            
            if (user) {
              // Remove password from user object
              currentUser = {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar
              };
              isLoggedIn = true;
              
              // Persist to localStorage
              localStorage.setItem('pfm_user', JSON.stringify(currentUser));
              
              resolve({ success: true, user: currentUser });
            } else {
              reject({ error: 'Invalid email or password' });
            }
          }, 500); // Simulate network delay
        });
      };
      
      // Signup (mocked)
      // TODO: Replace with real API call - POST /api/auth/signup
      service.signup = function(userData) {
        return $q(function(resolve, reject) {
          setTimeout(function() {
            // Check if user already exists
            var exists = mockUsers.find(function(u) {
              return u.email === userData.email;
            });
            
            if (exists) {
              reject({ error: 'Email already registered' });
            } else {
              // Create new user
              var newUser = {
                id: mockUsers.length + 1,
                email: userData.email,
                password: userData.password,
                name: userData.name || 'User',
                avatar: 'https://i.pravatar.cc/150?img=' + (mockUsers.length + 1)
              };
              
              mockUsers.push(newUser);
              
              // Auto-login after signup
              currentUser = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                avatar: newUser.avatar
              };
              isLoggedIn = true;
              
              localStorage.setItem('pfm_user', JSON.stringify(currentUser));
              
              resolve({ success: true, user: currentUser });
            }
          }, 500);
        });
      };
      
      // Logout
      service.logout = function() {
        currentUser = null;
        isLoggedIn = false;
        localStorage.removeItem('pfm_user');
        return $q.resolve({ success: true });
      };
      
      // Helper to accept any login for demo purposes
      service.quickLogin = function() {
        currentUser = {
          id: 1,
          email: 'demo@example.com',
          name: 'Demo User',
          avatar: 'https://i.pravatar.cc/150?img=1'
        };
        isLoggedIn = true;
        localStorage.setItem('pfm_user', JSON.stringify(currentUser));
        return $q.resolve({ success: true, user: currentUser });
      };
    }]);
})();
