'use strict';

/**
 * @ngdoc service
 * @name aPpApp.draw.service
 * @description
 * # draw.service
 * Factory in the aPpApp.
 */
angular.module('aPpApp')
  .factory('DrawService', ['$http', function ($http) {
    var service = {};

    service.GetAvailableBuyers = GetAvailableBuyers;
    service.GetAllBuyers = GetAllBuyers;
    service.GetLuckyCustomer = GetLuckyCustomer;

    function GetAvailableBuyers() {
      return $http.get('http://localhost:8080/abuyers').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function GetAllBuyers() {
      return $http.get('http://localhost:8080/buyers').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function GetLuckyCustomer() {
      return $http.get('http://localhost:8080/prize').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    return service;
  }]);
