// Personal Finance Management - Sidebar Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmSidebar', {
      templateUrl: 'app/components/sidebar/sidebar.template.html',
      controller: ['$state', '$scope', 'AuthService', 'UiService', function($state, $scope, AuthService, UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          ctrl.currentUser = AuthService.getCurrentUser();
          ctrl.currentState = $state.current.name;
          
          // Update state on state change
          $scope.$on('$stateChangeSuccess', function(event, toState) {
            ctrl.currentState = toState.name;
            ctrl.currentUser = AuthService.getCurrentUser();
          });
        };
        
        ctrl.isActive = function(stateName) {
          return ctrl.currentState === stateName || 
                 ($state.current.name && $state.current.name.indexOf(stateName) === 0);
        };
        
        ctrl.getUserInitials = function() {
          if (!ctrl.currentUser || !ctrl.currentUser.name) return '?';
          var names = ctrl.currentUser.name.split(' ');
          if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
          }
          return ctrl.currentUser.name.substring(0, 2).toUpperCase();
        };
        
        ctrl.comingSoon = function(feature) {
          UiService.info(feature + ' feature coming soon!');
        };
        
        ctrl.upgradeToPro = function() {
          UiService.info('Pro upgrade feature coming soon!');
        };
      }]
    });
})();
