(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .directive('odScore', odScore);

  function odScore() {
    var directive = {
      restrict: 'AE',
      replace: true,
      templateUrl: 'app/components/scoreDirective/score.html',
      scope: {},
      controller: 'ScoreController as score'
    };

    return directive;
  }
})();
