// Personal Finance Management - Categories Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmCategories', {
      templateUrl: 'app/components/categories/categories.template.html',
      controller: ['ApiService', 'UiService', function(ApiService, UiService) {
        var ctrl = this;
        
        var iconMap = {
          'payments': '💵',
          'restaurant': '🍔',
          'local_gas_station': '🚗',
          'movie': '🎬',
          'shopping_bag': '🛍️',
          'devices': '💻',
          'home': '🏠',
          'local_hospital': '🏥'
        };
        
        ctrl.$onInit = function() {
          ctrl.loading = true;
          ctrl.categories = [];
          ctrl.filteredCategories = [];
          ctrl.activeTab = 'all';
          
          loadCategories();
        };
        
        function loadCategories() {
          ApiService.getCategories()
            .then(function(response) {
              ctrl.categories = response.data;
              ctrl.filterCategories();
              ctrl.loading = false;
            })
            .catch(function(error) {
              UiService.error('Failed to load categories');
              ctrl.loading = false;
            });
        }
        
        ctrl.setActiveTab = function(tab) {
          ctrl.activeTab = tab;
          ctrl.filterCategories();
        };
        
        ctrl.filterCategories = function() {
          if (ctrl.activeTab === 'all') {
            ctrl.filteredCategories = ctrl.categories;
          } else {
            ctrl.filteredCategories = ctrl.categories.filter(function(cat) {
              return cat.type === ctrl.activeTab;
            });
          }
        };
        
        ctrl.getIncomeCount = function() {
          return ctrl.categories.filter(function(cat) {
            return cat.type === 'income';
          }).length;
        };
        
        ctrl.getExpenseCount = function() {
          return ctrl.categories.filter(function(cat) {
            return cat.type === 'expense';
          }).length;
        };
        
        ctrl.getCategoryIcon = function(icon) {
          return iconMap[icon] || '📝';
        };
        
        ctrl.addCategory = function() {
          UiService.info('Add category modal will open here');
          // TODO: Open add category modal
        };
        
        ctrl.editCategory = function(category) {
          UiService.info('Edit category: ' + category.name);
          // TODO: Open edit category modal
        };
        
        ctrl.deleteCategory = function(category) {
          if (UiService.confirm('Are you sure you want to delete category "' + category.name + '"?')) {
            ApiService.deleteCategory(category.id)
              .then(function() {
                UiService.success('Category deleted successfully');
                loadCategories();
              })
              .catch(function(error) {
                UiService.error('Failed to delete category');
              });
          }
        };
      }]
    });
})();
