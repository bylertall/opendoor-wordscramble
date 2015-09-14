(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .directive('odWinPanel', odWinPanel);

  function odWinPanel() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/winPanel/winPanel.html',
      scope: {
        isWinner: '='
      }
    };

    return directive;
  }
})();
