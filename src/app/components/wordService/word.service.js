(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .factory('wordService', wordService);

  /** @ngInject */
  function wordService($http) {
    var apiBase = 'http://api.wordnik.com:80/v4/words.json/',
        apiWordEnd = 'randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        factory = {
          word: '',
          wordArray: [],
          scrambledArray: [],
          userInput: []
        };

    factory.getNewWord = function() {
      return $http.get(apiBase + apiWordEnd)
        .success(function(data) {
          factory.word = data.word;
          factory.wordArray = factory.word.toUpperCase().split('');
          factory.scrambledArray = _scramble(factory.wordArray);

          console.log(factory);
          return factory.word;
        })
        .error(function(data) {
          console.log('A random word could not be retrieved!');
          console.log(data);
        })
    };

    factory.checkUserInput = function(keyEvent) {
      var char,
          charIndex,
          copyScrambledArray = factory.scrambledArray.slice(0),
          copyInputArray = factory.userInput.slice(0),
          temp;

      // if delete was pressed, remove last item in userInput and return new userInput array
      // otherwise set index of character that was pressed
      if (keyEvent.which === 8) {
        console.log('You pressed delete!');

        copyScrambledArray.push(copyInputArray.pop());

        angular.copy(copyInputArray, factory.userInput);
        angular.copy(copyScrambledArray, factory.scrambledArray);

        return;

      } else {
        // string character of key that was pressed (returns in uppercase)
        char = String.fromCharCode(keyEvent.keyCode);

        // index of char in
        charIndex = copyScrambledArray.indexOf(char);

        // if char is found, splice out of scramble array and add to userInput array
        if (charIndex !== -1) {

          temp = copyScrambledArray.splice(charIndex, 1);

          copyInputArray.push(temp[0]);

          angular.copy(copyInputArray, factory.userInput);
          angular.copy(copyScrambledArray, factory.scrambledArray);

          console.log(factory.userInput);
          console.log(factory.scrambledArray);
          console.log(factory);

        }
      }
    };

    return factory;
  }

  // Private methods
  function _scramble(array) {
    var array = array.slice(0),
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
})();
