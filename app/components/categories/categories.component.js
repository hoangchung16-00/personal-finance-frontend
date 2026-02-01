/**
 * Categories Component
 * 
 * Category management view for creating, editing, and deleting categories.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfCategories', {
      template: '<div class="pfm-categories-page">' +
                '  <div class="pfm-page-header">' +
                '    <div class="pfm-page-title-wrapper">' +
                '      <h2 class="pfm-page-title">Category Customization</h2>' +
                '      <p class="pfm-page-subtitle">Manage icons, colors, and organization for your financial data</p>' +
                '    </div>' +
                '    <button class="pfm-btn pfm-btn-primary" ng-click="vm.openAddModal()">' +
                '      <span class="material-symbols-outlined">add_circle</span>' +
                '      <span>Add Category</span>' +
                '    </button>' +
                '  </div>' +
                '  <div ng-if="vm.loading" class="pfm-loading">' +
                '    <pf-loading-spinner></pf-loading-spinner>' +
                '  </div>' +
                '  <div ng-if="!vm.loading" class="pfm-categories-grid">' +
                '    <pf-category-item ng-repeat="category in vm.categories"' +
                '                      category="category"' +
                '                      on-delete="vm.deleteCategory(category.id)">' +
                '    </pf-category-item>' +
                '    <div class="pfm-category-add-placeholder" ng-click="vm.openAddModal()">' +
                '      <span class="material-symbols-outlined">add_circle</span>' +
                '      <span>Add Category</span>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      controller: CategoriesController,
      controllerAs: 'vm'
    });
  
  CategoriesController.$inject = ['ApiService', 'UiService'];
  
  function CategoriesController(ApiService, UiService) {
    var vm = this;
    
    vm.$onInit = onInit;
    vm.loadCategories = loadCategories;
    vm.deleteCategory = deleteCategory;
    vm.openAddModal = openAddModal;
    
    vm.categories = [];
    vm.loading = true;
    
    ////////////
    
    function onInit() {
      loadCategories();
    }
    
    function loadCategories() {
      vm.loading = true;
      
      ApiService.getCategories()
        .then(function(response) {
          vm.categories = response.data;
          vm.loading = false;
        })
        .catch(function(error) {
          console.error('Error loading categories:', error);
          vm.loading = false;
        });
    }
    
    function deleteCategory(id) {
      if (UiService.confirm('Are you sure you want to delete this category?')) {
        ApiService.deleteCategory(id)
          .then(function() {
            UiService.showNotification('Category deleted successfully', 'success');
            loadCategories();
          })
          .catch(function(error) {
            console.error('Error deleting category:', error);
            UiService.showNotification('Error deleting category', 'error');
          });
      }
    }
    
    function openAddModal() {
      UiService.openModal('addCategory');
    }
  }
  
})();
