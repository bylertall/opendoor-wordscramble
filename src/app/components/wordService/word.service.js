(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .factory('wordService', wordService);

  /** @ngInject */
  function wordService($http) {
    var apiBase = 'http://api.wordnik.com:80/v4/words.json/',
        apiWordEnd = 'randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        apiDictionaryStart = 'reverseDictionary?query=',
        apiDictionaryEnd = '&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        factory = {
          word: '',
          wordArray: [],
          scrambledArray: [],
          userInput: [],
          getNewWord: getNewWord,
          checkUserInput: checkUserInput,
          winner: false
        };

    function getNewWord() {
      return $http.get(apiBase + apiWordEnd)
        .success(getWordComplete)
        .error(getWordError);


      function getWordComplete(data) {
        factory.word = data.word.toLowerCase();
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
        return;
      }

      // string character of key that was pressed (returns in uppercase)
      char = String.fromCharCode(keyEvent.keyCode);

      // index of char in scrambledArray
      charIndex = factory.scrambledArray.indexOf(char);

      // if char is found, splice out of scramble array and add to userInput array
      if (charIndex !== -1) {

        temp = factory.scrambledArray.splice(charIndex, 1);
        factory.userInput.push(temp[0]);

        console.log(factory.userInput);
        console.log(factory.scrambledArray);
        console.log(factory);
      }

      // check user guess when scrambledArray is empty
      if (!factory.scrambledArray.length) {
        checkGuess(factory.userInput);
      }
    }

    function checkGuess(array) {
      var userGuess = array.join('').toLowerCase();

      // check if userGuess matches word
      // if yes, user wins
      // if not, check dictionary
      if (userGuess === factory.word) {
        factory.winner = true;
        correctGuess();

      } else {
        checkDictionary(userGuess);
      }
    }

    function checkDictionary(word) {
      return $http.get(apiBase + apiDictionaryStart + word + apiDictionaryEnd)
        .success(checkDictionarySuccess)
        .error(checkDictionaryError);

      function checkDictionarySuccess(data) {
        console.log(data);
        // if dictionary check returns results, user wins
        // otherwise user loses
        if (data.totalResults) {
          return correctGuess();
        }

        incorrectGuess();
      }

      function checkDictionaryError(data) {
        console.log('Error! Couldn\'t check the dictionary');
        console.log(data);
      }
    }

    function correctGuess() {
      // add 'win' class to show user they won
      var elGuessChars = angular.element(document.querySelector('.user-input'));
      elGuessChars.addClass('win');
    }

    function incorrectGuess() {
      // userInput array items moved to scrambledArray (reset so user may guess again)
      angular.copy(factory.userInput, factory.scrambledArray);
      // empty userInput
      angular.copy([], factory.userInput);
    }

    return factory;
  }
})();
