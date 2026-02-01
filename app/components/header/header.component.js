// app/components/header/header.component.js
// Purpose: Top header navigation component
// Displays app branding, navigation links, and user profile

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('headerComponent', {
      templateUrl: 'app/components/header/header.template.html',
      controller: HeaderController
    });

  HeaderController.$inject = ['$state', 'AuthService'];

  function HeaderController($state, AuthService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.user = AuthService.getUser();
    };

    ctrl.logout = function() {
      AuthService.logout();
      $state.go('login');
    };
  }
})();
