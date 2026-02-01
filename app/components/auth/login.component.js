/**
 * Login Component
 * 
 * User login form with validation.
 * UI-only for now, integrates with mock AuthService.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfLogin', {
      templateUrl: 'app/components/auth/login.template.html',
      controller: LoginController,
      controllerAs: 'vm'
    });
  
  LoginController.$inject = ['AuthService', '$state'];
  
  function LoginController(AuthService, $state) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.login = login;
    vm.goToSignup = goToSignup;
    
    vm.credentials = {
      email: '',
      password: ''
    };
    vm.loading = false;
    vm.error = null;
    
    ////////////
    
    function onInit() {
      // Check if already logged in
      if (AuthService.isAuthenticated()) {
        $state.go('app.dashboard');
      }
    }
    
    function login() {
      vm.error = null;
      vm.loading = true;
      
      AuthService.login(vm.credentials)
        .then(function(user) {
          vm.loading = false;
          $state.go('app.dashboard');
        })
        .catch(function(error) {
          vm.loading = false;
          vm.error = 'Invalid credentials. Please try again.';
          console.error('Login error:', error);
        });
    }
    
    function goToSignup() {
      $state.go('signup');
    }
  }
  
})();
