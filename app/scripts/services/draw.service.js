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

    service.createSeasonLottery = createSeasonLottery;
    service.getSeasons = getSeasons;
    service.getSeason = getSeason;
    service.getActiveSeason = getActiveSeason;
    service.makeDrawPrizeProcess = makeDrawPrizeProcess;
    service.getWinners = getWinners;
    service.setWinner = setWinner;

    function createSeasonLottery(lot){
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/lot',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(lot)
      }
      return $http(req).then(handleSuccess, handleError('Error creating lottery season'));
    }

    function getSeasons(){
      return $http.get('http://localhost:8080/lots').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function getSeason(id){
      return $http.get('http://localhost:8080/lot/' + id).then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function getActiveSeason(){
      return $http.get('http://localhost:8080/activeLot').then(handleSuccess, handleError("error"));
    }

    function makeDrawPrizeProcess(availables){
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/drawPrize',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(availables)
      }
      return $http(req).then(handleSuccess, handleError('Error creating lottery season'));
    }

    function getWinners(){
      return $http.get('http://localhost:8080/winners').then(function(response){
        if(response.status != 200){
          alert("something went wrong getting models");
        }else{
          return response.data;
        }
      });
    }

    function setWinner(winner){
      var req = {
        method: 'POST',
        url: 'http://localhost:8080/winner',
        headers: {
          'Content-Type':'application/json'
        },
        data: JSON.stringify(winner)
      }
      return $http(req).then(handleSuccess, handleError('Error creating lottery season'));
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
