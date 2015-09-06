(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('HelpController', HelpController);

  /** @ngInject */
  function HelpController($modalInstance) {
    var vm = this;

    vm.close = function() {
      $modalInstance.dismiss('Close');
    };
  }
})();
