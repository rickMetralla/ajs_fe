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
      },
      convertToDate: function(stringDate){
        let newDate = stringDate.split("@")[0];
        return new Date(newDate);
      },
      fixDate: function(failDate){
        // let date = new Date();
        failDate.setHours(failDate.getHours() - failDate.getTimezoneOffset() / 60);
        let fixDate = failDate.toISOString();
        fixDate = fixDate.replace("T", "@").replace("Z","");
        return fixDate;
      },
      validateCustomerFields: function(customer){
        // console.log("validating fields...");
        let regex = new RegExp("[a-zA-Z ]+")
        let message = "";
        if(customer.name === ""){
          message = "Name field cannot be empty";
        }else if(!regex.test(customer.name)){
          message = "Name field just allow alphabetic characters";
        }else if (customer.dni === ""){
            message = "Dni field cannot be empty";
        }else if (customer.address === ""){
          message = "Address field cannot be empty";
        }else if (customer.email === ""){
          message = "Email field cannot be empty";
        }else if(customer.phone === ""){
          message = "Phone field cannot be empty";
        }
        return message;
      },
      validateProductFields: function(product){

      }
    };
  });
