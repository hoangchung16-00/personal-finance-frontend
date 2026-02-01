// Personal Finance Management - UI Utilities Service
(function(){
  'use strict';
  
  angular.module('pfmApp')
    .service('UiService', ['$rootScope', '$timeout', function($rootScope, $timeout) {
      var service = this;
      
      // Modal state management
      var modals = {};
      
      // Open a modal
      service.openModal = function(modalId) {
        modals[modalId] = true;
        $rootScope.$broadcast('modal:opened', modalId);
      };
      
      // Close a modal
      service.closeModal = function(modalId) {
        modals[modalId] = false;
        $rootScope.$broadcast('modal:closed', modalId);
      };
      
      // Check if modal is open
      service.isModalOpen = function(modalId) {
        return !!modals[modalId];
      };
      
      // Toggle modal
      service.toggleModal = function(modalId) {
        if (service.isModalOpen(modalId)) {
          service.closeModal(modalId);
        } else {
          service.openModal(modalId);
        }
      };
      
      // Notification system
      var notifications = [];
      
      service.showNotification = function(message, type, duration) {
        var notification = {
          id: Date.now(),
          message: message,
          type: type || 'info', // info, success, error, warning
          timestamp: new Date()
        };
        
        notifications.push(notification);
        $rootScope.$broadcast('notification:new', notification);
        
        // Auto-remove after duration
        var timeout = duration || 3000;
        $timeout(function() {
          service.removeNotification(notification.id);
        }, timeout);
        
        return notification.id;
      };
      
      service.removeNotification = function(notificationId) {
        var index = notifications.findIndex(function(n) { 
          return n.id === notificationId; 
        });
        if (index !== -1) {
          notifications.splice(index, 1);
          $rootScope.$broadcast('notification:removed', notificationId);
        }
      };
      
      service.getNotifications = function() {
        return notifications;
      };
      
      // Convenience methods for different notification types
      service.success = function(message, duration) {
        return service.showNotification(message, 'success', duration);
      };
      
      service.error = function(message, duration) {
        return service.showNotification(message, 'error', duration);
      };
      
      service.info = function(message, duration) {
        return service.showNotification(message, 'info', duration);
      };
      
      service.warning = function(message, duration) {
        return service.showNotification(message, 'warning', duration);
      };
      
      // Loading state management
      var loadingState = {
        global: false,
        components: {}
      };
      
      service.showLoading = function(componentId) {
        if (componentId) {
          loadingState.components[componentId] = true;
        } else {
          loadingState.global = true;
        }
        $rootScope.$broadcast('loading:start', componentId);
      };
      
      service.hideLoading = function(componentId) {
        if (componentId) {
          loadingState.components[componentId] = false;
        } else {
          loadingState.global = false;
        }
        $rootScope.$broadcast('loading:end', componentId);
      };
      
      service.isLoading = function(componentId) {
        if (componentId) {
          return !!loadingState.components[componentId];
        }
        return loadingState.global;
      };
      
      // Confirmation dialog helper
      service.confirm = function(message, callback) {
        // For now, use native confirm - can be replaced with custom modal
        if (confirm(message)) {
          if (callback) callback();
          return true;
        }
        return false;
      };
      
      // Format currency
      service.formatCurrency = function(amount) {
        return '$' + parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      };
      
      // Format date
      service.formatDate = function(date) {
        if (!date) return '';
        var d = new Date(date);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
      };
    }]);
})();
