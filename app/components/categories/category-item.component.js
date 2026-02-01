/**
 * Category Item Component
 * 
 * Individual category card with icon, color, and actions.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .component('pfCategoryItem', {
      template: '<div class="pfm-category-item">' +
                '  <div class="pfm-category-header">' +
                '    <div class="pfm-category-icon" ng-style="{\'background-color\': vm.category.color + \'33\'}">' +
                '      <span class="material-symbols-outlined" ng-style="{\'color\': vm.category.color}">{{vm.category.icon}}</span>' +
                '    </div>' +
                '    <div class="pfm-category-actions">' +
                '      <button class="pfm-icon-btn" ng-click="vm.edit()">' +
                '        <span class="material-symbols-outlined">edit</span>' +
                '      </button>' +
                '      <button class="pfm-icon-btn pfm-icon-btn-danger" ng-click="vm.delete()">' +
                '        <span class="material-symbols-outlined">delete</span>' +
                '      </button>' +
                '    </div>' +
                '  </div>' +
                '  <div class="pfm-category-body">' +
                '    <h3 class="pfm-category-name">{{vm.category.name}}</h3>' +
                '    <div class="pfm-category-meta">' +
                '      <span class="pfm-badge" ng-class="{\'badge-income\': vm.category.type === \'income\', \'badge-expense\': vm.category.type === \'expense\'}">' +
                '        {{vm.category.type}}' +
                '      </span>' +
                '      <span class="pfm-category-color">{{vm.category.color}}</span>' +
                '    </div>' +
                '  </div>' +
                '</div>',
      bindings: {
        category: '<',
        onDelete: '&'
      },
      controller: CategoryItemController,
      controllerAs: 'vm'
    });
  
  function CategoryItemController() {
    var vm = this;
    
    vm.edit = edit;
    vm.delete = deleteCategory;
    
    ////////////
    
    function edit() {
      // TODO: Implement edit functionality
      console.log('Edit category:', vm.category.id);
    }
    
    function deleteCategory() {
      if (vm.onDelete) {
        vm.onDelete();
      }
    }
  }
  
})();
