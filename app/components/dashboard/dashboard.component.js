/**
 * Dashboard Component
 * 
 * Main dashboard view showing financial overview with summary cards,
 * recent transactions, and quick actions.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfDashboard', {
      templateUrl: 'app/components/dashboard/dashboard.template.html',
      controller: DashboardController,
      controllerAs: 'vm'
    });
  
  DashboardController.$inject = ['ApiService'];
  
  function DashboardController(ApiService) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.stats = null;
    vm.loading = true;
    
    ////////////
    
    function onInit() {
      loadDashboardData();
    }
    
    function loadDashboardData() {
      vm.loading = true;
      
      ApiService.getDashboardStats()
        .then(function(response) {
          vm.stats = response.data;
          vm.loading = false;
        })
        .catch(function(error) {
          console.error('Error loading dashboard data:', error);
          vm.loading = false;
        });
    }
  }
  
})();
