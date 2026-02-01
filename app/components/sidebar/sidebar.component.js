// app/components/sidebar/sidebar.component.js
// Purpose: Sidebar navigation component
// Provides main navigation menu for the application

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('sidebarComponent', {
      templateUrl: 'app/components/sidebar/sidebar.template.html',
      controller: SidebarController
    });

  SidebarController.$inject = ['$state', 'AuthService'];

  function SidebarController($state, AuthService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.user = AuthService.getUser();
      ctrl.currentState = $state.current.name;
    };

    ctrl.isActive = function(stateName) {
      return $state.current.name === stateName;
    };

    ctrl.logout = function() {
      AuthService.logout();
      $state.go('login');
    };
  }
})();
