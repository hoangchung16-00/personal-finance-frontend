/**
 * Sidebar Component
 * 
 * Navigation sidebar with links to main application sections.
 * Shows active state for current route.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfSidebar', {
      templateUrl: 'app/components/sidebar/sidebar.template.html',
      controller: SidebarController,
      controllerAs: 'vm'
    });
  
  SidebarController.$inject = ['$state'];
  
  function SidebarController($state) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.isActive = isActive;
    vm.goToState = goToState;
    
    vm.navItems = [];
    
    ////////////
    
    function onInit() {
      vm.navItems = [
        {
          name: 'Dashboard',
          state: 'app.dashboard',
          icon: 'dashboard'
        },
        {
          name: 'Transactions',
          state: 'app.transactions',
          icon: 'receipt_long'
        },
        {
          name: 'Categories',
          state: 'app.categories',
          icon: 'category'
        }
      ];
    }
    
    function isActive(state) {
      return $state.includes(state);
    }
    
    function goToState(state) {
      $state.go(state);
    }
  }
  
})();
