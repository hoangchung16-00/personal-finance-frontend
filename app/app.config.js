// Personal Finance Management - Route Configuration
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
      function($stateProvider, $urlRouterProvider, $locationProvider) {
      
      // Enable HTML5 mode (remove hash from URLs)
      $locationProvider.html5Mode({
        enabled: false, // Set to false for simpler setup without server rewrite rules
        requireBase: false
      });
      
      // Default route
      $urlRouterProvider.otherwise('/login');
      
      // Define application states/routes
      $stateProvider
        // Authentication routes (no auth required)
        .state('login', {
          url: '/login',
          template: '<pfm-login></pfm-login>',
          data: { requiresAuth: false }
        })
        .state('signup', {
          url: '/signup',
          template: '<pfm-signup></pfm-signup>',
          data: { requiresAuth: false }
        })
        
        // Main app routes (auth required)
        .state('app', {
          abstract: true,
          template: '<div class="pfm-layout">' +
                    '  <pfm-sidebar></pfm-sidebar>' +
                    '  <div class="pfm-main">' +
                    '    <pfm-header></pfm-header>' +
                    '    <div ui-view></div>' +
                    '  </div>' +
                    '</div>',
          data: { requiresAuth: true }
        })
        .state('app.dashboard', {
          url: '/dashboard',
          template: '<pfm-dashboard></pfm-dashboard>',
          data: { requiresAuth: true }
        })
        .state('app.transactions', {
          url: '/transactions',
          template: '<pfm-transactions></pfm-transactions>',
          data: { requiresAuth: true }
        })
        .state('app.categories', {
          url: '/categories',
          template: '<pfm-categories></pfm-categories>',
          data: { requiresAuth: true }
        });
    }]);
})();
