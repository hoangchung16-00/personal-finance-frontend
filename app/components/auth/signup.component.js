/**
 * Signup Component
 * 
 * User signup/registration form with validation.
 * UI-only for now, integrates with mock AuthService.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfSignup', {
      template: '<div class="pfm-auth-page">' +
                '  <div class="pfm-auth-container">' +
                '    <div class="pfm-auth-card">' +
                '      <div class="pfm-auth-header">' +
                '        <div class="pfm-auth-icon">' +
                '          <span class="material-symbols-outlined">person_add</span>' +
                '        </div>' +
                '        <h1 class="pfm-auth-title">Create Account</h1>' +
                '        <p class="pfm-auth-subtitle">Start managing your finances today</p>' +
                '      </div>' +
                '      <form ng-submit="vm.signup()" class="pfm-auth-form">' +
                '        <div ng-if="vm.error" class="pfm-alert pfm-alert-error">{{vm.error}}</div>' +
                '        <div class="pfm-form-group">' +
                '          <label class="pfm-label">Full Name</label>' +
                '          <input type="text" ng-model="vm.userData.name" class="pfm-input" placeholder="John Doe" required />' +
                '        </div>' +
                '        <div class="pfm-form-group">' +
                '          <label class="pfm-label">Email Address</label>' +
                '          <input type="email" ng-model="vm.userData.email" class="pfm-input" placeholder="john@example.com" required />' +
                '        </div>' +
                '        <div class="pfm-form-group">' +
                '          <label class="pfm-label">Password</label>' +
                '          <input type="password" ng-model="vm.userData.password" class="pfm-input" placeholder="Create a password" required />' +
                '        </div>' +
                '        <button type="submit" class="pfm-btn pfm-btn-primary pfm-btn-block pfm-btn-lg" ng-disabled="vm.loading">' +
                '          <span ng-if="!vm.loading">Create Account</span>' +
                '          <span ng-if="vm.loading">Creating account...</span>' +
                '        </button>' +
                '      </form>' +
                '      <div class="pfm-auth-footer">' +
                '        <p class="pfm-auth-footer-text">Already have an account? <a ng-click="vm.goToLogin()" class="pfm-link">Sign in</a></p>' +
                '      </div>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      controller: SignupController,
      controllerAs: 'vm'
    });
  
  SignupController.$inject = ['AuthService', '$state'];
  
  function SignupController(AuthService, $state) {
    var vm = this;
    
    vm.signup = signup;
    vm.goToLogin = goToLogin;
    
    vm.userData = {
      name: '',
      email: '',
      password: ''
    };
    vm.loading = false;
    vm.error = null;
    
    ////////////
    
    function signup() {
      vm.error = null;
      vm.loading = true;
      
      AuthService.signup(vm.userData)
        .then(function(user) {
          vm.loading = false;
          $state.go('app.dashboard');
        })
        .catch(function(error) {
          vm.loading = false;
          vm.error = 'Error creating account. Please try again.';
          console.error('Signup error:', error);
        });
    }
    
    function goToLogin() {
      $state.go('login');
    }
  }
  
})();
