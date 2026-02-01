// app/components/auth/login.component.js
// Purpose: Login component for user authentication
// Handles user login with mock credentials

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('loginComponent', {
      templateUrl: 'app/components/auth/login.template.html',
      controller: LoginController
    });

  LoginController.$inject = ['$state', 'AuthService', 'UiService'];

  function LoginController($state, AuthService, UiService) {
    var ctrl = this;

    // Initialize
    ctrl.$onInit = function() {
      ctrl.credentials = {
        email: '',
        password: ''
      };
      ctrl.isLoading = false;
    };

    // Methods
    ctrl.login = function() {
      if (!ctrl.credentials.email || !ctrl.credentials.password) {
        UiService.error('Please enter email and password');
        return;
      }

      ctrl.isLoading = true;

      AuthService.login(ctrl.credentials)
        .then(function(response) {
          UiService.success('Login successful! Welcome, ' + response.user.name);
          $state.go('dashboard');
        })
        .catch(function(error) {
          UiService.error('Login failed. Please try again.');
        })
        .finally(function() {
          ctrl.isLoading = false;
        });
    };

    ctrl.togglePasswordVisibility = function() {
      ctrl.showPassword = !ctrl.showPassword;
    };
  }
})();
