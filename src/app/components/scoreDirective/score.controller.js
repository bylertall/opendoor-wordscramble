(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('ScoreController', ScoreController);

  /** @ngInject */
  function ScoreController(wordService) {
    var vm = this;

    vm.wordService = wordService;
  }
})();
