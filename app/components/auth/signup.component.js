// Personal Finance Management - Signup Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmSignup', {
      template:
        '<div class="pfm-flex" style="min-height: 100vh; background: var(--pfm-bg-light);">' +
        '  <div class="pfm-flex" style="flex: 1; align-items: center; justify-content: center; padding: 2rem;">' +
        '    <div style="width: 100%; max-width: 460px;">' +
        '      <div class="pfm-card" style="padding: 2.5rem;">' +
        '        <div class="pfm-text-center pfm-mb-3">' +
        '          <h2 style="font-size: 1.5rem; font-weight: 700;">Create Account</h2>' +
        '          <p class="pfm-text-muted" style="font-size: 0.875rem;">Join Personal Finance Manager today</p>' +
        '        </div>' +
        '        <div ng-if="$ctrl.errorMessage" class="pfm-mb-3" style="padding: 0.75rem; background: rgba(231, 42, 8, 0.1); color: var(--pfm-error); border-radius: 0.5rem;">' +
        '          {{ $ctrl.errorMessage }}' +
        '        </div>' +
        '        <form ng-submit="$ctrl.handleSignup()" name="signupForm">' +
        '          <div class="pfm-form-group">' +
        '            <label class="pfm-form-label">Full Name</label>' +
        '            <input type="text" class="pfm-form-control" ng-model="$ctrl.userData.name" placeholder="Your name" required ng-disabled="$ctrl.loading">' +
        '          </div>' +
        '          <div class="pfm-form-group">' +
        '            <label class="pfm-form-label">Email Address</label>' +
        '            <input type="email" class="pfm-form-control" ng-model="$ctrl.userData.email" placeholder="your.email@example.com" required ng-disabled="$ctrl.loading">' +
        '          </div>' +
        '          <div class="pfm-form-group">' +
        '            <label class="pfm-form-label">Password</label>' +
        '            <input type="password" class="pfm-form-control" ng-model="$ctrl.userData.password" placeholder="Choose a secure password" required ng-disabled="$ctrl.loading">' +
        '          </div>' +
        '          <button type="submit" class="pfm-btn pfm-btn-primary pfm-btn-lg" style="width: 100%; margin-top: 0.5rem;" ng-disabled="$ctrl.loading || signupForm.$invalid">' +
        '            <span ng-if="!$ctrl.loading">Create Account</span>' +
        '            <span ng-if="$ctrl.loading">Creating account...</span>' +
        '          </button>' +
        '        </form>' +
        '        <div class="pfm-mt-4 pfm-text-center" style="padding-top: 1.5rem; border-top: 1px solid var(--pfm-border-light);">' +
        '          <p class="pfm-text-muted" style="font-size: 0.875rem;">' +
        '            Already have an account? ' +
        '            <a href="#!/login" style="color: var(--pfm-primary); font-weight: 600; text-decoration: none;">Sign in</a>' +
        '          </p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      controller: ['$state', 'AuthService', 'UiService', function($state, AuthService, UiService) {
        var ctrl = this;
        
        ctrl.$onInit = function() {
          ctrl.userData = {
            name: '',
            email: '',
            password: ''
          };
          ctrl.loading = false;
          ctrl.errorMessage = '';
        };
        
        ctrl.handleSignup = function() {
          ctrl.loading = true;
          ctrl.errorMessage = '';
          
          AuthService.signup(ctrl.userData)
            .then(function(response) {
              ctrl.loading = false;
              UiService.success('Account created successfully! Welcome, ' + response.user.name);
              $state.go('app.dashboard');
            })
            .catch(function(error) {
              ctrl.loading = false;
              ctrl.errorMessage = error.error || 'Signup failed. Please try again.';
              UiService.error(ctrl.errorMessage);
            });
        };
      }]
    });
})();
