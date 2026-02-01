// Personal Finance Management - Category Item Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmCategoryItem', {
      bindings: {
        category: '<',
        onEdit: '&',
        onDelete: '&'
      },
      template:
        '<div class="pfm-card" style="position: relative; transition: all 0.2s ease; cursor: pointer;">' +
        '  <div class="pfm-flex pfm-flex-col" style="gap: 1rem;">' +
        '    <div class="pfm-flex" style="justify-content: space-between; align-items: flex-start;">' +
        '      <div style="width: 3rem; height: 3rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;" ng-style="{background: $ctrl.category.color + \'20\'}">' +
        '        <span>{{ $ctrl.getIcon() }}</span>' +
        '      </div>' +
        '      <div class="pfm-flex" style="gap: 0.25rem;">' +
        '        <button class="pfm-btn pfm-btn-secondary pfm-btn-sm" style="padding: 0.25rem 0.5rem;" ng-click="$ctrl.handleEdit()">' +
        '          ✏️' +
        '        </button>' +
        '        <button class="pfm-btn pfm-btn-secondary pfm-btn-sm" style="padding: 0.25rem 0.5rem;" ng-click="$ctrl.handleDelete()">' +
        '          🗑️' +
        '        </button>' +
        '      </div>' +
        '    </div>' +
        '    <div>' +
        '      <h3 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem;">{{ $ctrl.category.name }}</h3>' +
        '      <p class="pfm-text-muted" style="font-size: 0.75rem; text-transform: capitalize;">{{ $ctrl.category.type }}</p>' +
        '    </div>' +
        '    <div class="pfm-flex" style="align-items: center; gap: 0.5rem;">' +
        '      <div style="width: 1rem; height: 1rem; border-radius: 0.25rem;" ng-style="{background: $ctrl.category.color}"></div>' +
        '      <span class="pfm-text-muted" style="font-size: 0.75rem; font-weight: 600;">{{ $ctrl.category.color }}</span>' +
        '    </div>' +
        '  </div>' +
        '</div>',
      controller: [function() {
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
        
        ctrl.getIcon = function() {
          return iconMap[ctrl.category.icon] || '📝';
        };
        
        ctrl.handleEdit = function() {
          if (ctrl.onEdit) {
            ctrl.onEdit({ category: ctrl.category });
          }
        };
        
        ctrl.handleDelete = function() {
          if (ctrl.onDelete) {
            ctrl.onDelete({ category: ctrl.category });
          }
        };
      }]
    });
})();
