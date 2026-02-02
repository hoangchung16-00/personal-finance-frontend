// API Configuration
// This file contains configuration for the API integration
// Update these values based on your environment

(function() {
  'use strict';
  
  angular.module('pfmApp')
    .constant('API_CONFIG', {
      // Base URL for the backend API
      // Development: 'http://localhost:3000/api/v1'
      // Production: 'https://your-api-domain.com/api/v1'
      // Relative (same domain): '/api/v1'
      BASE_URL: '/api/v1',
      
      // Request timeout in milliseconds
      TIMEOUT: 30000,
      
      // Enable debug logging
      DEBUG: true,
      
      // API version
      VERSION: 'v1'
    });
})();
