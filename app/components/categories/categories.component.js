// Personal Finance Management - Categories Component
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .component('pfmCategories', {
      templateUrl: 'app/components/categories/categories.template.html',
      controller: ['ApiService', 'UiService', function(ApiService, UiService) {
        var ctrl = this;
        
        // Default icon mappings for common categories
        var defaultIcons = {
          'Income': '💵',
          'Salary': '💵',
          'Food': '🍔',
          'Groceries': '🛒',
          'Transport': '🚗',
          'Entertainment': '🎬',
          'Shopping': '🛍️',
          'Electronics': '💻',
          'Housing': '🏠',
          'Healthcare': '🏥',
          'Utilities': '💡',
          'Dining': '🍽️'
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
              // Transform categories to add default icons and types
              ctrl.categories = (response.data || []).map(function(cat) {
                return {
                  id: cat.id,
                  name: cat.name,
                  icon: getDefaultIcon(cat.name),
                  color: getDefaultColor(cat.name),
                  type: guessType(cat.name),
                  user_id: cat.user_id,
                  created_at: cat.created_at,
                  updated_at: cat.updated_at
                };
              });
              ctrl.filterCategories();
              ctrl.loading = false;
            })
            .catch(function(error) {
              console.error('Failed to load categories:', error);
              UiService.error('Failed to load categories');
              ctrl.loading = false;
            });
        }
        
        function getDefaultIcon(categoryName) {
          return defaultIcons[categoryName] || '📝';
        }
        
        function getDefaultColor(categoryName) {
          var colors = {
            'Income': '#13ec6d',
            'Salary': '#13ec6d',
            'Food': '#FF9800',
            'Groceries': '#FF9800',
            'Transport': '#2196F3',
            'Entertainment': '#9C27B0',
            'Shopping': '#E91E63',
            'Electronics': '#607D8B',
            'Housing': '#795548',
            'Healthcare': '#F44336',
            'Utilities': '#FFC107'
          };
          return colors[categoryName] || '#9E9E9E';
        }
        
        function guessType(categoryName) {
          var incomeKeywords = ['income', 'salary', 'wage', 'bonus', 'refund'];
          var lowerName = categoryName.toLowerCase();
          for (var i = 0; i < incomeKeywords.length; i++) {
            if (lowerName.indexOf(incomeKeywords[i]) !== -1) {
              return 'income';
            }
          }
          return 'expense';
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
          return icon || '📝';
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
          if (confirm('Are you sure you want to delete category "' + category.name + '"?')) {
            ApiService.deleteCategory(category.id)
              .then(function() {
                UiService.success('Category deleted successfully');
                loadCategories();
              })
              .catch(function(error) {
                console.error('Failed to delete category:', error);
                UiService.error('Failed to delete category');
              });
          }
        };
      }]
    });
})();
