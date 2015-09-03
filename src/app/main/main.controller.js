(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($document, $timeout, wordService) {
    var vm = this;

    vm.wordService = wordService;

    // use timeout to delay init
    // privdes nicer animation on start
    $timeout(function() {
      vm.wordService.getNewWord();
    }, 1000);

    // bind keyup event and check if character has a match in scramble array
    $document.bind('keydown', function(keyEvent) {
      keyEvent.preventDefault();
      // timeout here triggers digest so that values from wordService update in controller
      $timeout(function() {
        // only check result if user has NOT won
        if (!vm.wordService.isWinner) {
          vm.wordService.checkUserInput(keyEvent);
        } else if (keyEvent.which === 13) {
          // if user has won and hits enter, start new game
          vm.wordService.getNewWord();
        }
      });
    });
  }
})();
