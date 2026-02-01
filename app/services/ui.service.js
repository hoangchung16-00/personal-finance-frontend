// app/services/ui.service.js
// Purpose: UI helpers for notifications and modal control
// Provides simple notification and modal management for UI flow

(function() {
  'use strict';

  angular.module('pfmApp')
    .service('UiService', ['$rootScope', '$timeout', UiService]);

  function UiService($rootScope, $timeout) {
    var service = this;
    
    // Modal state
    var modalState = {
      isOpen: false,
      component: null,
      data: null
    };

    // Notification state
    service.notifications = [];

    // Modal methods
    service.openModal = function(component, data) {
      modalState.isOpen = true;
      modalState.component = component;
      modalState.data = data || {};
      $rootScope.$broadcast('modal:open', modalState);
    };

    service.closeModal = function() {
      modalState.isOpen = false;
      modalState.component = null;
      modalState.data = null;
      $rootScope.$broadcast('modal:close');
    };

    service.getModalState = function() {
      return modalState;
    };

    // Notification methods
    service.notify = function(message, type, duration) {
      var notification = {
        id: Date.now(),
        message: message,
        type: type || 'info', // info, success, error, warning
        duration: duration || 3000
      };
      
      service.notifications.push(notification);
      $rootScope.$broadcast('notification:new', notification);

      if (notification.duration > 0) {
        $timeout(function() {
          service.dismissNotification(notification.id);
        }, notification.duration);
      }

      return notification;
    };

    service.success = function(message, duration) {
      return service.notify(message, 'success', duration);
    };

    service.error = function(message, duration) {
      return service.notify(message, 'error', duration || 5000);
    };

    service.warning = function(message, duration) {
      return service.notify(message, 'warning', duration);
    };

    service.info = function(message, duration) {
      return service.notify(message, 'info', duration);
    };

    service.dismissNotification = function(id) {
      var index = service.notifications.findIndex(function(n) {
        return n.id === id;
      });
      if (index !== -1) {
        service.notifications.splice(index, 1);
        $rootScope.$broadcast('notification:dismissed', id);
      }
    };

    return service;
  }
})();
