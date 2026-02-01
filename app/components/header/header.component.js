// Personal Finance Management - Header Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmHeader', {
      templateUrl: 'app/components/header/header.template.html',
      controller: ['$state', '$scope', 'AuthService', 'UiService', function($state, $scope, AuthService, UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          ctrl.currentUser = AuthService.getCurrentUser();
          ctrl.searchQuery = '';
          ctrl.showSearch = false;
          ctrl.showUserMenu = false;
          ctrl.showUserName = true;
          ctrl.currentState = $state.current.name;
          
          // Update current user on state change
          $scope.$on('$stateChangeSuccess', function(event, toState) {
            ctrl.currentUser = AuthService.getCurrentUser();
            ctrl.currentState = toState.name;
          });
          
          // Close user menu when clicking outside
          angular.element(document).on('click', function(e) {
            if (ctrl.showUserMenu && !angular.element(e.target).closest('.pfm-header').length) {
              $scope.$apply(function() {
                ctrl.showUserMenu = false;
              });
            }
          });
        };
        
        ctrl.getUserInitials = function() {
          if (!ctrl.currentUser || !ctrl.currentUser.name) return '?';
          var names = ctrl.currentUser.name.split(' ');
          if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
          }
          return ctrl.currentUser.name.substring(0, 2).toUpperCase();
        };
        
        ctrl.toggleUserMenu = function() {
          ctrl.showUserMenu = !ctrl.showUserMenu;
        };
        
        ctrl.addTransaction = function() {
          UiService.info('Add transaction modal will open here');
          // TODO: Open transaction modal
        };
        
        ctrl.goToSettings = function() {
          ctrl.showUserMenu = false;
          UiService.info('Settings page coming soon');
        };
        
        ctrl.logout = function() {
          ctrl.showUserMenu = false;
          AuthService.logout().then(function() {
            UiService.success('Logged out successfully');
            $state.go('login');
          });
        };
        
        ctrl.$onDestroy = function() {
          angular.element(document).off('click');
        };
      }]
    });
})();
