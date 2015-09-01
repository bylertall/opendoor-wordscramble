(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController as main',
        resolve: {
          wordPrep: wordPrep
        }
      });

    $urlRouterProvider.otherwise('/');
  }

  /** @ngInject */
  function wordPrep(wordService) {
    return wordService.getNewWord();
  }

})();
