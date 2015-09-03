(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .factory('wordService', wordService);

  /** @ngInject */
  function wordService($http, $timeout) {
    var apiBase = 'http://api.wordnik.com:80/v4/words.json/',
        apiWordEnd = 'randomWord?hasDictionaryDef=true&includePartOfSpeech=noun&excludePartOfSpeech=proper-noun,noun-posessive&minCorpusCount=10000&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=6&maxLength=6&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        apiDictionaryStart = 'reverseDictionary?query=',
        apiDictionaryEnd = '&minCorpusCount=5&maxCorpusCount=-1&minLength=1&maxLength=-1&includeTags=false&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        factory = {
          word: '',
          wordArray: [],
          scrambledArray: [],
          userInput: [],
          getNewWord: getNewWord,
          checkUserInput: checkUserInput,
          isWinner: false,
          score: 0,
          multiplier: 1
        };

    function getNewWord() {
      return $http.get(apiBase + apiWordEnd)
        .success(getWordComplete)
        .error(getWordError);


      function getWordComplete(data) {
        var elGuessChars = angular.element(document.querySelector('.user-input'));

        // reset isWinner and userInput to start new game, also remove win class
        factory.isWinner = false;
        angular.copy([], factory.userInput);

        factory.word = data.word.toLowerCase();
        angular.copy(factory.word.toUpperCase().split(''), factory.wordArray);
        angular.copy(scramble(factory.wordArray), factory.scrambledArray);

        elGuessChars.removeClass('win');
      }

      function getWordError(data) {
        console.log('A random word could not be retrieved!');
        console.log(data);
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

      // string character of key that was pressed
      // returns in lowercase, need uppercase to match scrambledArray
      char = String.fromCharCode(keyEvent.charCode).toUpperCase();

      // index of char in scrambledArray
      charIndex = factory.scrambledArray.indexOf(char);

      // if char is found, splice out of scramble array and add to userInput array
      if (charIndex !== -1) {

        temp = factory.scrambledArray.splice(charIndex, 1);
        factory.userInput.push(temp[0]);
      }

      // when scrambledArray is empty, check user guess
      if (!factory.scrambledArray.length) {
        checkGuess(factory.userInput.join('').toLowerCase());
      }
    }

    function checkGuess(userGuess) {
      // check if userGuess matches factory.word
      // if yes, user wins
      // if not, check dictionary
      if (userGuess === factory.word) {
        correctGuessHandler();
      } else {
        checkDictionary(userGuess);
      }
    }

    function checkDictionary(word) {
      return $http.get(apiBase + apiDictionaryStart + word + apiDictionaryEnd)
        .success(checkDictionarySuccess)
        .error(checkDictionaryError);

      function checkDictionarySuccess(data) {
        // if dictionary check returns results, user wins
        // otherwise user loses
        if (data.totalResults) {
          correctGuessHandler();
        } else {
          incorrectGuessHandler();
        }
      }

      function checkDictionaryError(data) {
        console.log('Error! Couldn\'t check the dictionary');
        console.log(data);
      }
    }

    function correctGuessHandler() {
      var elGuessChars = angular.element(document.querySelector('.user-input'));
      // add 'win' class to show user they won
      elGuessChars.addClass('win');
      factory.isWinner = true;
      factory.score += 5 * factory.multiplier;
      factory.multiplier += 1;

      return true;
    }

    function incorrectGuessHandler() {
      var elGuessChars = angular.element(document.querySelector('.user-input'));
      // add 'lose' class to indicate wrong answer
      elGuessChars.addClass('lose');

      $timeout(function() {
        // scramble userInput array items then copy to scrambledArray (reset so user may guess again)
        angular.copy(scramble(factory.userInput), factory.scrambledArray);
        // empty userInput
        angular.copy([], factory.userInput);

        elGuessChars.removeClass('lose');
      }, 500);

      return false;
    }

    return factory;
  }
})();
