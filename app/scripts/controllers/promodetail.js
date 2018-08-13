'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:PromodetailCtrl
 * @description
 * # PromodetailCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('PromodetailCtrl', ['UserService', '$uibModalInstance', 'params', 'DrawService',
  function (UserService, $uibModalInstance, params, DrawService) {
    var pdc = this;
    pdc.prizes = params.prizes;
    pdc.customers = [];
    pdc.prizeToAward = [];
    // pdc.getRanks = getRanks;
    // console.log(pdc.prizes);
    // console.log(pdc.prizes);

    initPromoDetail();

    function initPromoDetail(){
      UserService.GetAll().then(function(customers){
        pdc.customers = customers;
      });
      DrawService.getPrizeByPromoId(pdc.prizes[0].promoId).then(function(prizeToAward){
        pdc.prizeToAward = prizeToAward;
        // console.log(pdc.prizeToAward);
      });
    }

    pdc.getCustomerName = function(dni){
      for (var i = 0; i < pdc.customers.length; i++) {
        if(pdc.customers[i].dni === dni){
          return pdc.customers[i].name;
        }
      }
    }

    pdc.getPrizeToWinName = function(id){
      for (var i = 0; i < pdc.prizeToAward.length; i++) {
        if(pdc.prizeToAward[i].id === id){
          return pdc.prizeToAward[i].name;
        }
      }
    }

    pdc.cancel = function () {
       $uibModalInstance.dismiss('cancel');
    };

    // pdc.ok = function () {
    //    $uibModalInstance.close();
    // };
  }]);
