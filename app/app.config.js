/**
 * Personal Finance Management - Configuration & Routing
 * 
 * This file configures ui-router routes and defines the application states.
 * Protected routes check authentication status via AuthService.
 * 
 * TODO: Integrate backend authentication when API is ready.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .config(routeConfig)
    .run(runBlock);
  
  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
  
  function routeConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    // Use HTML5 mode for cleaner URLs (no #)
    $locationProvider.html5Mode(false).hashPrefix('');
    
    // Default route
    $urlRouterProvider.otherwise('/login');
    
    // Define application states
    $stateProvider
      // Authentication routes (public)
      .state('login', {
        url: '/login',
        template: '<pf-login></pf-login>'
      })
      .state('signup', {
        url: '/signup',
        template: '<pf-signup></pf-signup>'
      })
      
      // Main app layout (protected)
      .state('app', {
        abstract: true,
        template: '<div class="pfm-app-layout">' +
                  '  <pf-header></pf-header>' +
                  '  <div class="pfm-content-wrapper">' +
                  '    <pf-sidebar></pf-sidebar>' +
                  '    <main class="pfm-main-content" ui-view></main>' +
                  '  </div>' +
                  '</div>',
        resolve: {
          auth: ['AuthService', function(AuthService) {
            return AuthService.requireAuth();
          }]
        }
      })
      
      // Dashboard (protected)
      .state('app.dashboard', {
        url: '/dashboard',
        template: '<pf-dashboard></pf-dashboard>'
      })
      
      // Transactions (protected)
      .state('app.transactions', {
        url: '/transactions',
        template: '<pf-transactions></pf-transactions>'
      })
      
      // Categories (protected)
      .state('app.categories', {
        url: '/categories',
        template: '<pf-categories></pf-categories>'
      });
  }
  
  runBlock.$inject = ['$rootScope', '$state', 'AuthService'];
  
  function runBlock($rootScope, $state, AuthService) {
    // Listen for state change errors (e.g., authentication failures)
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      if (error === 'AUTH_REQUIRED') {
        event.preventDefault();
        $state.go('login');
      }
    });
    
    // Check authentication on state change start
    $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.name !== 'login' && toState.name !== 'signup') {
        if (!AuthService.isAuthenticated()) {
          event.preventDefault();
          $state.go('login');
        }
      }
    });
  }
  
})();
