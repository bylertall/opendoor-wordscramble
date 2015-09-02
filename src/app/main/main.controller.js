(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($document, $timeout, wordService) {
    var vm = this;

    vm.word = wordService.word;
    vm.scrambledArray = wordService.scrambledArray;
    vm.userInput = wordService.userInput;

    // bind keydown event and check if character has a match in scramble array
    $document.bind('keydown', function(keyEvent) {
      var timer;

      $timeout(function() {
        wordService.checkUserInput(keyEvent);
      });
    });
  }
})();
