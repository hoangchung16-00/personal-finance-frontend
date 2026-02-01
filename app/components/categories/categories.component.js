// app/components/categories/categories.component.js
// Purpose: Categories management view
// TODO: Add CRUD operations for categories when API is available

(function() {
  'use strict';

  angular.module('pfmApp')
    .component('categoriesComponent', {
      templateUrl: 'app/components/categories/categories.template.html',
      controller: CategoriesController
    });

  CategoriesController.$inject = ['ApiService', 'AuthService', 'UiService'];

  function CategoriesController(ApiService, AuthService, UiService) {
    var ctrl = this;

    ctrl.$onInit = function() {
      ctrl.isLoading = true;
      ctrl.user = AuthService.getUser();
      loadCategories();
    };

    function loadCategories() {
      ApiService.getCategories()
        .then(function(categories) {
          ctrl.categories = categories;
        })
        .catch(function(error) {
          UiService.error('Failed to load categories');
        })
        .finally(function() {
          ctrl.isLoading = false;
        });
    }

    ctrl.addCategory = function() {
      UiService.openModal('addCategory');
    };

    ctrl.editCategory = function(category) {
      UiService.openModal('editCategory', category);
    };

    ctrl.deleteCategory = function(category) {
      if (confirm('Are you sure you want to delete this category?')) {
        UiService.success('Category deleted (mock)');
      }
    };
  }
})();
