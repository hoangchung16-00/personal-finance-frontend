// app/app.config.js
// Purpose: Configure ui-router states and implement route protection
// Defines all application routes and checks authentication for protected routes

(function() {
  'use strict';

  angular.module('pfmApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', configureRoutes])
    .run(['$rootScope', '$state', 'AuthService', runBlock]);

  function configureRoutes($stateProvider, $urlRouterProvider, $locationProvider) {
    // Configure HTML5 mode (optional - can be disabled for simpler setup)
    $locationProvider.hashPrefix('');

    // Default route
    $urlRouterProvider.otherwise('/login');

    // Define states
    $stateProvider
      // Login state (public)
      .state('login', {
        url: '/login',
        component: 'loginComponent',
        data: {
          requiresAuth: false
        }
      })
      // Dashboard state (protected)
      .state('dashboard', {
        url: '/dashboard',
        component: 'dashboardComponent',
        data: {
          requiresAuth: true
        }
      })
      // Transactions state (protected)
      .state('transactions', {
        url: '/transactions',
        component: 'transactionsComponent',
        data: {
          requiresAuth: true
        }
      })
      // Categories state (protected)
      .state('categories', {
        url: '/categories',
        component: 'categoriesComponent',
        data: {
          requiresAuth: true
        }
      });
  }

  function runBlock($rootScope, $state, AuthService) {
    // Check authentication on state change
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      var requiresAuth = toState.data && toState.data.requiresAuth;
      
      if (requiresAuth && !AuthService.isAuthenticated()) {
        event.preventDefault();
        $state.go('login');
      }
      
      // If authenticated and trying to access login, redirect to dashboard
      if (toState.name === 'login' && AuthService.isAuthenticated()) {
        event.preventDefault();
        $state.go('dashboard');
      }
    });
  }
})();
