// app/services/auth.service.js
// Purpose: Manages UI authentication state for mock login/logout
// Uses localStorage to persist mock auth token across page refreshes

(function() {
  'use strict';

  angular.module('pfmApp')
    .service('AuthService', ['$q', '$window', '$timeout', AuthService]);

  function AuthService($q, $window, $timeout) {
    var service = this;
    var TOKEN_KEY = 'pfm_auth_token';
    var USER_KEY = 'pfm_user';

    // Mock user for demo
    var mockUser = { id: 1, name: 'Demo User', email: 'demo@example.com' };

    // Service methods
    service.login = function(credentials) {
      // Mock login: accepts any credentials
      // TODO: Replace with real API authentication when backend is available
      return $timeout(function() {
        var token = 'mock-token-' + Date.now();
        $window.localStorage.setItem(TOKEN_KEY, token);
        $window.localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
        return { user: mockUser, token: token };
      }, 500);
    };

    service.logout = function() {
      $window.localStorage.removeItem(TOKEN_KEY);
      $window.localStorage.removeItem(USER_KEY);
      return $q.resolve({ success: true });
    };

    service.isAuthenticated = function() {
      return !!$window.localStorage.getItem(TOKEN_KEY);
    };

    service.getUser = function() {
      var userJson = $window.localStorage.getItem(USER_KEY);
      if (userJson) {
        try {
          return JSON.parse(userJson);
        } catch (e) {
          return null;
        }
      }
      return null;
    };

    service.getToken = function() {
      return $window.localStorage.getItem(TOKEN_KEY);
    };

    return service;
  }
})();
