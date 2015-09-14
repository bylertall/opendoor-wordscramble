(function() {
  'use strict';

  angular
    .module('opendoorWordScramble')
    .directive('odWinPanel', odWinPanel);

  function odWinPanel() {
    var directive = {
      templateUrl: 'app/components/winPanel/winPanel.html'
    };

    return directive;
  }
})();
