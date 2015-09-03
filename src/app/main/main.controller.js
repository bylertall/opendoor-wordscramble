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

    // block delete key from triggering browser back
    // keydown event needed
    $document.bind('keydown', function(keyEvent) {
      // if delete is pressed and user is not winner
      if (keyEvent.which === 8 && !vm.wordService.isWinner) {
        console.log(keyEvent);
        keyEvent.preventDefault();

        // timeout here triggers digest so that values from wordService update in controller
        $timeout(function() {
          vm.wordService.checkUserInput(keyEvent);
        });
      }
    });

    // bind keyup event and check if character has a match in scramble array
    // keypress used to capture charCode (unavailable from keydown)
    $document.bind('keypress', function(keyEvent) {
      console.log(keyEvent);

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
