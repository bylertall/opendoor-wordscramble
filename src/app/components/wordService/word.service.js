(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .factory('wordService', wordService);

  /** @ngInject */
  function wordService($http) {
    var apiBase = 'http://api.wordnik.com:80/v4/words.json/',
        apiWordEnd = 'randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        factory = {
          word: '',
          wordArray: [],
          scrambledArray: [],
          userInput: [],
          getNewWord: getNewWord,
          checkUserInput: checkUserInput
        };

    function getNewWord() {
      return $http.get(apiBase + apiWordEnd)
        .success(getWordComplete)
        .error(getWordError);


      function getWordComplete(data) {
        factory.word = data.word;
        factory.wordArray = factory.word.toUpperCase().split('');
        factory.scrambledArray = scramble(factory.wordArray);

        console.log(data);
        console.log(factory);
        return;
      }

      function getWordError(data) {
        console.log('A random word could not be retrieved!');
        console.log(data);
        return;
      }
    }

    function scramble(array) {
      var counter = array.length,
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

    function checkUserInput(keyEvent) {
      var char,
        charIndex,
        temp;

      // if delete was pressed & userInput is not empty
      // remove last item in userInput and return new userInput array
      // otherwise set index of character that was pressed
      if (keyEvent.which === 8 && factory.userInput.length) {

        // remove last element from userInput, push into scrambledArray
        factory.scrambledArray.push(factory.userInput.pop());


        //angular.copy(factory.userInput);
        //angular.copy(factory.scrambledArray);

        return;

      } else {
        // string character of key that was pressed (returns in uppercase)
        char = String.fromCharCode(keyEvent.keyCode);

        // index of char in scrambledArray
        charIndex = factory.scrambledArray.indexOf(char);

        // if char is found, splice out of scramble array and add to userInput array
        if (charIndex !== -1) {

          temp = factory.scrambledArray.splice(charIndex, 1);
          factory.userInput.push(temp[0]);

          //angular.copy(factory.userInput);
          //angular.copy(factory.scrambledArray);

          console.log(factory.userInput);
          console.log(factory.scrambledArray);
          console.log(factory);
        }
      }
    }

    return factory;
  }
})();
