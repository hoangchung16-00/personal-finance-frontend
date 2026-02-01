/**
 * Authentication Service
 * 
 * Manages UI-level authentication state.
 * Currently simulates login/logout for testing routes without backend.
 * 
 * TODO: Integrate with backend authentication API.
 * TODO: Add token management and refresh logic.
 * TODO: Add session storage/local storage for persistence.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .factory('AuthService', AuthService);
  
  AuthService.$inject = ['$q', '$timeout', 'ApiService'];
  
  function AuthService($q, $timeout, ApiService) {
    var currentUser = null;
    var authToken = null;
    
    var service = {
      login: login,
      logout: logout,
      signup: signup,
      isAuthenticated: isAuthenticated,
      getCurrentUser: getCurrentUser,
      requireAuth: requireAuth
    };
    
    // Check for existing session on init
    _init();
    
    return service;
    
    ////////////
    
    function _init() {
      // Check localStorage for saved session
      var savedToken = localStorage.getItem('pfm_auth_token');
      var savedUser = localStorage.getItem('pfm_user');
      
      if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
      }
    }
    
    function login(credentials) {
      return ApiService.login(credentials)
        .then(function(response) {
          authToken = response.data.token;
          currentUser = response.data.user;
          
          // Save to localStorage
          localStorage.setItem('pfm_auth_token', authToken);
          localStorage.setItem('pfm_user', JSON.stringify(currentUser));
          
          return currentUser;
        });
    }
    
    function logout() {
      return ApiService.logout()
        .then(function() {
          authToken = null;
          currentUser = null;
          
          // Clear localStorage
          localStorage.removeItem('pfm_auth_token');
          localStorage.removeItem('pfm_user');
          
          return true;
        });
    }
    
    function signup(userData) {
      return ApiService.signup(userData)
        .then(function(response) {
          // After signup, automatically log in
          return login({
            email: userData.email,
            password: userData.password
          });
        });
    }
    
    function isAuthenticated() {
      return !!authToken && !!currentUser;
    }
    
    function getCurrentUser() {
      return currentUser;
    }
    
    function requireAuth() {
      if (isAuthenticated()) {
        return $q.resolve(currentUser);
      } else {
        return $q.reject('AUTH_REQUIRED');
      }
    }
  }
  
})();
