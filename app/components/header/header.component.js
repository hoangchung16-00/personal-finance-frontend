/**
 * Header Component
 * 
 * Top navigation header with user info and quick actions.
 * Displays app branding and user profile.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfHeader', {
      templateUrl: 'app/components/header/header.template.html',
      controller: HeaderController,
      controllerAs: 'vm'
    });
  
  HeaderController.$inject = ['AuthService', '$state'];
  
  function HeaderController(AuthService, $state) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.logout = logout;
    vm.currentUser = null;
    
    ////////////
    
    function onInit() {
      vm.currentUser = AuthService.getCurrentUser();
    }
    
    function logout() {
      AuthService.logout()
        .then(function() {
          $state.go('login');
        });
    }
  }
  
})();
