'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:DrawCtrl
 * @description
 * # DrawCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('DrawCtrl', ['DrawService', 'UserService', function (DrawService, UserService) {

    initController();

    function initController() {
      loadAvailableBuyers();
      loadAllBuyers();
    }

    var dr = this;
dr.allPurchasers = [];
    dr.allAvailableBuyers = [];
    dr.selectOne = selectOne;
    dr.loadAvailableBuyers = loadAvailableBuyers;
    dr.loadAllBuyers = loadAllBuyers;
    dr.winners = [];
    dr.winner = '';
    dr.getWinners = getWinners;
    dr.products = [];

    function loadAvailableBuyers() {
      DrawService.GetAvailableBuyers()
          .then(function (buyers) {
              dr.allAvailableBuyers = buyers;
          });
    }

    function selectOne(dni) {
      UserService.GetByDni(dni).then(function(buyer) {
        dr.allPurchasers = [buyer];
        dr.products = buyer.products;
      });
    }

    function loadAllBuyers() {
      DrawService.GetAllBuyers().then(function(buyers){
        for (var i = 0; i < buyers.length; i++) {
          if(buyers[i].winner){
            dr.winners.push(buyers[i]);
          }
        }
        console.log(buyers);
        dr.allPurchasers = buyers;
      });
    }

    function getWinners(){
      DrawService.GetLuckyCustomer().then(function(winner){
        dr.winner = winner;
        loadAvailableBuyers();
      });
    }

  }]);
