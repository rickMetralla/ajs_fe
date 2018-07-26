'use strict';

/**
 * @ngdoc service
 * @name aPpApp.util.service
 * @description
 * # util.service
 * Factory in the aPpApp.
 */
angular.module('aPpApp')
  .factory('UtilService', function () {
    // Service logic
    // ...


    // Public API here
    return {
      currentDate: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd = '0'+dd
        }

        if(mm<10) {
            mm = '0'+mm
        }

        today = yyyy + '-' + mm + '-' + dd;
        return today;
      },
      
      fixedDate: function() {
        let date = new Date();
        date.setHours(date.getHours() - date.getTimezoneOffset() / 60);
        let fixDate = date.toISOString();
        fixDate = fixDate.replace("T", "@").replace("Z","");
        return fixDate;

      }
    };
  });
