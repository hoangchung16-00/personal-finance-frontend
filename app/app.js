// save as app/app.js
(function(){
  'use strict';
  angular.module('pfmApp', [])
    .controller('MainCtrl', [function(){
      var vm = this;
      vm.message = "App initialized.";
    }]);
})();