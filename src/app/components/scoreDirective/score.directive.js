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

      // score & multiplier values are given to attributes in od-score directive element
      scope: {
        'playerScore': '@',
        'playerMultiplier': '@'
      }
    };

    return directive;
  }
})();
