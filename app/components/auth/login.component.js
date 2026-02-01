// Personal Finance Management - Login Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmLogin', {
      templateUrl: 'app/components/auth/login.template.html',
      controller: ['$state', 'AuthService', 'UiService', function($state, AuthService, UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          ctrl.credentials = {
            email: '',
            password: ''
          };
          ctrl.rememberMe = false;
          ctrl.loading = false;
          ctrl.errorMessage = '';
          
          // If already logged in, redirect to dashboard
          if (AuthService.isAuthenticated()) {
            $state.go('app.dashboard');
          }
        };
        
        ctrl.handleLogin = function() {
          ctrl.loading = true;
          ctrl.errorMessage = '';
          
          AuthService.login(ctrl.credentials.email, ctrl.credentials.password)
            .then(function(response) {
              ctrl.loading = false;
              UiService.success('Welcome back, ' + response.user.name + '!');
              $state.go('app.dashboard');
            })
            .catch(function(error) {
              ctrl.loading = false;
              ctrl.errorMessage = error.error || 'Login failed. Please try again.';
              UiService.error(ctrl.errorMessage);
            });
        };
        
        ctrl.forgotPassword = function() {
          UiService.info('Password reset functionality will be available soon.');
        };
      }]
    });
})();
