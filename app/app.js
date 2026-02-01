// Personal Finance Management - Main App Module
(function(){
  'use strict';
  
  angular.module('pfmApp', [
    'ui.router'
  ])
  .run(['$rootScope', '$state', 'AuthService', function($rootScope, $state, AuthService) {
    // Route protection - check authentication on state change
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requiresAuth = toState.data && toState.data.requiresAuth;
      
      if (requiresAuth && !AuthService.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
    });
  }]);
})();