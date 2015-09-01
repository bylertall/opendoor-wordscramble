(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(wordService) {
    var vm = this;

    function getWord() {
      wordService.getNewWord()
        .success(
        function(data) {
          vm.word = data.word;
          vm.scrambledWord = scramble(vm.word);
        }).error(
        function(data) {
          console.log('An error occurred when getting the word');
          console.log(data);
        }
      );
    }

    function scramble(word) {
      var array = word.toUpperCase().split(''),
        counter = array.length,
        temp,
        i;

      // scramble letters (REMEMBER CONCEPT: Fisher-Yates shuffle)
      while (counter) {

        // integer to select random array index
        i = Math.floor(Math.random() * counter--);

        // item at end of initial array is set to temp
        temp = array[counter];

        // random array item is set at current counter position of array
        array[counter] = array[i];

        //  move temp to the random array index
        array[i] = temp;
      }

      return array;
    }

    getWord();
  }
})();
