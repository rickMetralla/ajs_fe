'use strict';

/**
 * @ngdoc function
 * @name aPpApp.controller:DrawCtrl
 * @description
 * # DrawCtrl
 * Controller of the aPpApp
 */
angular.module('aPpApp')
  .controller('DrawCtrl', ['PurchaseService', 'UtilService', 'DrawService', 'UserService', '$uibModal',
  function (PurchaseService, UtilService, DrawService, UserService, $uibModal) {

    initController();

    var dr = this;
    dr.create = false;
    dr.activePromotion = {};
    dr.promotionToPost = {};
    dr.newLottery = {};
    dr.promotions = [];
    dr.promoStatus = [];
    dr.getActivePromotion = getActivePromotion;
    dr.createPromotionSeason = createPromotionSeason;
    dr.loadPromotions = loadPromotions;
    dr.cancel = cancel;
    dr.openCreateOption = openCreateOption;
    dr.drawPrizeLottery = drawPrizeLottery;
    dr.draw = false;
    dr.availableCustomers = [];
    dr.executeDrawPrize = executeDrawPrize;
    dr.complete = complete;
    dr.showDate = showDate;
    dr.getPromoStatusName = getPromoStatusName;
    dr.showDetails = showDetails;
    dr.activePromotionById = activePromotionById;
    dr.deletePromo = deletePromo;
    dr.availablePrizes = [];
    dr.availablePrizeDraws = [];
    dr.availableWinners = [];
    dr.getCustomerName = getCustomerName;
    dr.customers = [];
    dr.completed = false;

    function initController() {
      loadPromotions();
      getActivePromotion();
      UserService.GetAll().then(function(customers){
        dr.customers = customers;
      });
    }

    function openCreateOption(){
      dr.create = true;
    }
    function cancel(){
      dr.create = false;
    }

    function createPromotionSeason(lot){
      if(lot === undefined){
        alert('Lottery form needs correct values.');
        return;
      }
      if(!(lot.end >= lot.start)){
        console.log(lot);
        alert('End date is before than start date.');
        return;
      }
      dr.promotionToPost.season = lot.season;
      dr.promotionToPost.description = lot.description;
      dr.promotionToPost.startAt = UtilService.fixDate(lot.start);
      dr.promotionToPost.endAt = UtilService.fixDate(lot.end);
      dr.promotionToPost.active = false;
      // console.log(dr.promotionToPost);
      DrawService.createPromotionSeason(dr.promotionToPost).then(function(response){
        dr.create = false;
        loadPromotions();
      });
    }

    function loadPromotions(){
      DrawService.getSeasons().then(function(promotions){
        dr.promotions = promotions;
      });
      DrawService.getPromoStatus().then(function(promoStatus){
        dr.promoStatus = promoStatus;
      });
    }

    function getActivePromotion(){
      DrawService.getSeasons().then(function(seasons){
        for (var i = 0; i < seasons.length; i++) {
          if(seasons[i].status === 1){
            dr.activePromotion = seasons[i];
            getAvailableCustomers(dr.activePromotion.id);
            getPrizesByPromoId(dr.activePromotion.id);
            getPrizesDrawsByPromoId(dr.activePromotion.id);
            getWinnersByPromoId(dr.activePromotion.id);
            return;
          }
        }
      });
    }

    function getAvailableCustomers(promoId){
      DrawService.getAvailablesCustomersAfterActivate(promoId)
        .then(function(customers){
          dr.availableCustomers = customers;
      });
    }
    function getPrizesByPromoId(promoId){
      DrawService.getPrizeByPromoId(promoId)
        .then(function(prizes){
          dr.availablePrizes = prizes;
          console.log(dr.availablePrizes);
      });
    }
    function getPrizesDrawsByPromoId(promoId){
      DrawService.getPrizeDrawByPromoId(promoId).then(function(prizeDraws){
        dr.availablePrizeDraws = prizeDraws;
      });
    }
    function getWinnersByPromoId(promoId){
      DrawService.getAllWinnersByPromoId(promoId, true)
        .then(function(winners){
          dr.availableWinners = winners;
      });
    }

    function getPrizeNameById(id){
      for (var i = 0; i < pdc.availablePrizes.length; i++) {
        if(pdc.availablePrizes[i].id === id){
          return pdc.availablePrizes[i].name;
        }
      }
    }

    function getCustomerName(dni){
      for (var i = 0; i < dr.customers.length; i++) {
        if(dr.customers[i].dni === dni){
          return dr.customers[i].name;
        }
      }
    }

    function activePromotionById(promo){
      if(dr.activePromotion.season){
        alert("Currently there is active promotion running.");
        return;
      }

      var modalInstance = $uibModal.open({
        templateUrl: "views/activatepromo.html",
        controller: "ActivatepromoCtrl",
        controllerAs: 'apc',
        size: "md",
        resolve: {
          params: function () {
            return {
              promo : promo
            };
          }
        }
      });

      modalInstance.result.then(function (result){
        // console.log(result);
        dr.activePromotion = result;
        loadPromotions();
      }, function () {
        // console.log("Dialog dismissed");
      });

    }

    function drawPrizeLottery(){
      dr.draw = true;
    }

    function executeDrawPrize(){
      DrawService.makeDrawPrizeProcess(dr.activePromotion.id).then(function(res){
        console.log(res);
        getActivePromotion();
        dr.completed = true;
      });
    }

    function showDetails(promoId){
      DrawService.getPrizeDrawByPromoId(promoId).then(function(prizeDraws){
        openDetailPromoDialog(prizeDraws);
      });
    }

    function complete(){
      DrawService.completePromo(dr.activePromotion.id).then(function(){
        dr.draw = false;
        dr.completed = false;
        loadPromotions();
      });
    }

    function showDate(oldDate){
      return oldDate.split("@")[0];
    }

    function getPromoStatusName(promoStatusId){
      for (var i = 0; i < dr.promoStatus.length; i++) {
        if(dr.promoStatus[i].id === promoStatusId){
          return dr.promoStatus[i].status;
        }
      }
    }

    function openDetailPromoDialog(prizeDraws){
      var modalInstance = $uibModal.open({
        templateUrl: "views/showdetailpromo.html",
        controller: "PromodetailCtrl",
        controllerAs: 'pdc',
        size: "md",
        resolve: {
          params: function () {
            return {
              prizes : prizeDraws
            };
          }
        }
      });

      modalInstance.result.then(function (result){
        console.log(result);
      }, function () {
        // console.log("Dialog dismissed");
      });
    }

    function deletePromo(promoId){
      // console.log(promoId);
      if(confirm("Are you sure to remove?")){
        DrawService.deletePromoById(promoId).then(function(res){
          if(res.success === false){
            alert("Something went wrong deleting promo with id: " + promoId)
          } else {
            for (var i = 0; i < dr.promotions.length; i++) {
              if(dr.promotions[i].id === promoId){
                dr.promotions.splice(i, 1);
              }
            }
          }
        })
      } else {
        console.log("not removed: " + promoId);
      }
    }

  }]);
