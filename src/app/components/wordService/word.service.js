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
          word: ''
    };

    factory.getNewWord = function() {
      return $http.get(apiBase + apiWordEnd)
    };

    return factory;
  }
})();
