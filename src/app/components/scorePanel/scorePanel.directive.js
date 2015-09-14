(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .directive('odScorePanel', odScorePanel);

  function odScorePanel() {
    var directive = {
      restrict: 'AE',
      templateUrl: 'app/components/scorePanel/scorePanel.html',

      // score & multiplier values are given to attributes in od-score directive element
      scope: {
        'playerScore': '@score',
        'playerMultiplier': '@multiplier'
      }
    };

    return directive;
  }
})();
