// Personal Finance Management - HTTP Interceptor
// Handles API errors globally
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .factory('HttpInterceptor', ['$q', '$injector', function($q, $injector) {
      return {
        responseError: function(rejection) {
          var UIService = $injector.get('UIService');
          
          // Handle different error status codes
          if (rejection.status === 401) {
            // Unauthorized - invalid or missing API key
            UIService.showNotification('Authentication failed. Please login again.', 'error');
            
            // Redirect to login
            var $state = $injector.get('$state');
            var AuthService = $injector.get('AuthService');
            AuthService.logout();
            $state.go('login');
          } else if (rejection.status === 404) {
            // Not Found
            UIService.showNotification('Resource not found.', 'error');
          } else if (rejection.status === 422) {
            // Validation Error
            var errorMsg = 'Validation error.';
            if (rejection.data && rejection.data.error) {
              errorMsg = rejection.data.error;
            }
            UIService.showNotification(errorMsg, 'error');
          } else if (rejection.status === 400) {
            // Bad Request
            var badReqMsg = 'Invalid request.';
            if (rejection.data && rejection.data.error) {
              badReqMsg = rejection.data.error;
            }
            UIService.showNotification(badReqMsg, 'error');
          } else if (rejection.status >= 500) {
            // Server Error
            UIService.showNotification('Server error. Please try again later.', 'error');
          } else if (rejection.status === -1) {
            // Network Error (API not reachable)
            UIService.showNotification('Cannot connect to server. Please check your connection.', 'error');
          }
          
          return $q.reject(rejection);
        }
      };
    }])
    .config(['$httpProvider', function($httpProvider) {
      $httpProvider.interceptors.push('HttpInterceptor');
    }]);
})();
