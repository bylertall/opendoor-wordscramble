(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($document, $timeout, wordService) {
    var vm = this;

    vm.wordService = wordService;
    vm.word = vm.wordService.word;
    vm.scrambledArray = vm.wordService.scrambledArray;
    vm.userInput = vm.wordService.userInput;

    // bind keydown event and check if character has a match in scramble array
    $document.bind('keydown', function(keyEvent) {
      var timer;

      $timeout(function() {
        vm.wordService.checkUserInput(keyEvent);
      });
    });
  }
})();
