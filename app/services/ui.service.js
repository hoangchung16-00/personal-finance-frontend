/**
 * UI Service
 * 
 * Provides UI utilities for modals, notifications, and other UI interactions.
 * Simple implementation for component communication.
 * 
 * TODO: Consider using a more robust notification library if needed.
 */
(function(){
  'use strict';
  
  angular
    .module('pfmApp')
    .factory('UiService', UiService);
  
  UiService.$inject = ['$rootScope'];
  
  function UiService($rootScope) {
    var service = {
      openModal: openModal,
      closeModal: closeModal,
      showNotification: showNotification,
      confirm: confirm
    };
    
    return service;
    
    ////////////
    
    function openModal(modalId, data) {
      $rootScope.$broadcast('modal:open', {
        id: modalId,
        data: data
      });
    }
    
    function closeModal(modalId) {
      $rootScope.$broadcast('modal:close', {
        id: modalId
      });
    }
    
    function showNotification(message, type) {
      // type: 'success', 'error', 'warning', 'info'
      $rootScope.$broadcast('notification:show', {
        message: message,
        type: type || 'info'
      });
    }
    
    function confirm(message, callback) {
      // Simple confirm dialog
      var result = window.confirm(message);
      if (callback) {
        callback(result);
      }
      return result;
    }
  }
  
})();
