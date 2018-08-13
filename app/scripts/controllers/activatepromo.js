'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:ActivatepromoCtrl
 * @description
 * # ActivatepromoCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('ActivatepromoCtrl', ['UserService', 'DrawService', '$uibModalInstance', 'params',
  function (UserService, DrawService, $uibModalInstance, params) {
    var apc = this;
    apc.promo = params.promo;
    apc.availableCustomers = [];
    apc.availablePrizes = [];
    apc.customers = [];
    apc.ranks = [];
    apc.prize = {};
    // apc.editModalFlag = false;
    // apc.createPrize = false;

    initActivatePromo();

    function initActivatePromo(){
      apc.editModalFlag = false;
      apc.createPrize = false;
      UserService.GetAll().then(function(customers){
        apc.customers = customers;
      });
      DrawService.getAvailablesCustomersBeforeActivate(apc.promo.id)
        .then(function(availableCustomers){
          apc.availableCustomers = availableCustomers;
      });
      DrawService.getPrizeByPromoId(apc.promo.id).then(function(prizes){
        apc.availablePrizes = prizes;
        // console.log(apc.availablePrizes);
      });
      DrawService.getRankPrizes().then(function(ranks){
        apc.ranks = ranks;
      });
    }

    apc.getCustomerName = function(dni){
      for (var i = 0; i < apc.customers.length; i++) {
        if(apc.customers[i].dni == dni){
          return apc.customers[i].name;
        }
      }
    }

    apc.getRankName = function(rankId){
      for (var i = 0; i < apc.ranks.length; i++) {
        if(apc.ranks[i].id === rankId){
          return apc.ranks[i].name;
        }
      }
    }

    apc.addPrizes = function(){
      apc.createPrize = true;
    }

    apc.savePrize = function(prize){
      apc.createPrize = false;
      prize.promoId = apc.promo.id;
      // console.log(prize);
      DrawService.registerPrize(prize).then(function(newPrize){
        apc.availablePrizes.push(newPrize);
      });
    }

    apc.cancelPrize = function(){
      apc.createPrize = false;
    }

    apc.updatePrize = function(prize){
      console.log("should update");
      console.log(prize);
    }

    apc.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

    apc.confirm = function () {
      console.log(apc.availablePrizes.length);
      if(apc.availablePrizes.length === 0){
        alert("Need more Prizes. Not possible to confirm.");
        return;
      }
      DrawService.activatePromo(apc.promo.id).then(function(res){
        // console.log(res);
      });
      $uibModalInstance.close(apc.promo);
    };

  }]);
