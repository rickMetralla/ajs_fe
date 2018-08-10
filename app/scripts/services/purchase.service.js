'use strict';

/**
 * @ngdoc service
 * @name aPpApp.purchase.service
 * @description
 * # purchase.service
 * Factory in the aPpApp.
 */
angular.module('aPpApp')
  .factory('PurchaseService', ['$http' ,function ($http) {
    // console.log("load purchase services");

    var service = {};
    service.createTransaction = createTransaction;
    service.GetAllPurchaser = GetAllPurchaser;

    function GetAllPurchaser() {
      return $http.get('http://localhost:8080/purchases').then(function(response){
        if(response.status !== 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function createTransaction(transaction) {
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/purchases',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(transaction)
      };
      // console.log(req.data);
      return $http(req).then(handleSuccess, handleError('Error creating purchase transaction'));
    }

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }

    return service;
  }]);
